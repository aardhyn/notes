import { HTMLAttributes, ReactNode, useCallback, useState } from "react";
import {
  DndContext,
  DragEndEvent,
  pointerWithin,
  useDraggable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { FileIcon, ReaderIcon } from "@radix-ui/react-icons";
import { s, CSS } from "style/stitches.config";

import { invariant } from "exception/invariant";
import {
  useDirectoryCreateMutation,
  useDirectoryDeleteMutation,
  useDirectoryMutation,
} from "api/directory";
import {
  useNoteCreateMutation,
  useNoteDeleteMutation,
  useNoteMutation,
} from "api/note";
import { NodeType, TreeNode } from "algorithm/tree";
import { useShortcut } from "api/shortcut";
import { useTreeStore } from "./store";
import { useNavigate } from "react-router-dom";
type HandleProps = {
  children: ReactNode;
  css?: CSS;
} & HTMLAttributes<HTMLDivElement>;
/**
 * Create a draggable wrapper for a node
 * @param node node to wrap in a draggable
 */
export function useDraggableNode({ key, name, type, parentKey }: TreeNode) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: key,
    data: {
      type,
      icon: type === "directory" ? <ReaderIcon /> : <FileIcon />,
      parentKey,
      name,
    },
  });

  const handle = ({ children, ...props }: HandleProps) => (
    <s.div {...listeners} {...attributes} {...props}>
      {children}
    </s.div>
  );

  return {
    handle,
    isDragging,
    ref: setNodeRef,
  };
}

/**
 * Create a context provider for dragging and dropping tree nodes
 * @returns a context provider for drag and drop
 */
export function useNoteTreeDrag() {
  const { mutate: mutateNote } = useNoteMutation();
  const { mutate: mutateDirectory } = useDirectoryMutation();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const dropType = event?.over?.data.current?.type;
      invariant(dropType, `Unknown drop type for node: ${event.over}`);

      const selfDrag = event.active.id === event.over?.id; // user dragged a node into itself
      const dumbDrag = event.active.data.current?.parentKey === event.over?.id; // user dragged a node into its own parent
      const badDrag = dropType !== "directory"; // user dragged a node onto a note
      if (badDrag || selfDrag || dumbDrag) return;

      const dragType = event.active.data.current?.type;
      invariant(dragType, `Unknown drag type for node: ${event.active}`);

      const keyToMove = event.active.id.toString();
      const newParent = event.over?.id.toString() || null;

      if (dragType === "directory") {
        // move directory
        mutateDirectory({
          directory_key: keyToMove,
          parent_key: newParent,
        });
      } else {
        // move note
        mutateNote({
          note_key: keyToMove,
          directory_key: newParent,
        });
      }
    },
    [mutateDirectory, mutateNote]
  );

  const context = useCallback(
    ({ children }: { children: ReactNode }) => (
      <DndContext
        onDragEnd={handleDragEnd}
        collisionDetection={pointerWithin}
        modifiers={[restrictToWindowEdges]}
      >
        {children}
      </DndContext>
    ),
    [handleDragEnd]
  );

  return context;
}

export function useNodeDelete(node: TreeNode) {
  const isDirectory = node.type === "directory";

  const { mutate: deleteNote } = useNoteDeleteMutation();
  const { mutate: deleteDirectory } = useDirectoryDeleteMutation();
  const handleDelete = () => {
    if (isDirectory && confirm(`Delete folder "${node.name}"?`)) {
      deleteDirectory(node.key);
    } else if (confirm(`Delete note "${node.name}"?`)) {
      deleteNote(node.key);
    }
  };

  return handleDelete;
}

export function useNodeRename(node: TreeNode) {
  const isDirectory = node.type === "directory";

  const [name, setName] = useState(node.name);
  const { mutate: mutateNote } = useNoteMutation();
  const { mutate: mutateDirectory } = useDirectoryMutation();

  const rename = () => {
    if (name === node.name) {
      return; // no change
    }

    const processed = name; // processNoteName(name, usedNames);
    setName(processed);

    if (isDirectory) {
      mutateDirectory({ directory_key: node.key, name: processed });
    } else {
      mutateNote({ note_key: node.key, name: processed });
    }
  };

  return {
    name,
    setName,
    rename,
  };
}

export function useNodeCreate(
  type: NodeType,
  options?: { parentKey?: string | null; onSuccess?: (key: string) => void }
) {
  const { parentKey, onSuccess } = options || {};
  const { mutate: createDirectory } = useDirectoryCreateMutation();
  const { mutate: createNote } = useNoteCreateMutation();

  return () => {
    if (type === "directory") {
      createDirectory({ name: "folder", parent_key: parentKey }, { onSuccess });
    } else {
      createNote({ name: "new note", directory_key: parentKey }, { onSuccess });
    }
  };
}

/**
 * bind keyboard shortcuts for tree navigation to a reference of T
 * @param enabled whether or not to enable shortcuts
 * @returns reference with bound keyboard shortcuts for tree navigation
 */
export function useTreeShortcuts() {
  const {
    toggleExpansion,
    selectChild,
    selected,
    selectNext,
    selectPrevious,
    selectParent,
  } = useTreeStore();

  // only enable shortcuts when a tree node is selected and not renaming
  const focusedElement = document.activeElement;
  const selectedTreeNode = !!selected.node;
  const renaming = focusedElement?.tagName === "INPUT";
  const enabled = selectedTreeNode && !renaming;

  useShortcut(selectNext, "ArrowDown", { enabled });
  useShortcut(selectPrevious, "ArrowUp", { enabled });

  useShortcut(selectChild, "ArrowRight", { enabled });
  useShortcut(selectParent, "ArrowLeft", { enabled });

  const navigate = useNavigate();
  useShortcut(
    () => {
      const { node } = selected;
      if (!node) {
        return;
      }

      if (node?.type === "directory") {
        toggleExpansion(node);
      } else {
        navigate(node.key);
      }
    },
    "enter",
    { enabled }
  );
}
