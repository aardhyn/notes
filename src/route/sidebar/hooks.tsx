import { ReactNode, useCallback, useState } from "react";
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
import { NodeType, TreeNode } from "api/tree";

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

  const handle = ({ children }: { children: ReactNode; css?: CSS }) => (
    <s.div {...listeners} {...attributes}>
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

      const selfDrag = event.active.data.current?.parentKey === event.over?.id;

      if (dropType === "directory" && !selfDrag) {
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

export function useNodeCopy(node: TreeNode) {
  throw new Error("Not implemented");
}

export function useNodeMove(node: TreeNode) {
  throw new Error("Not implemented");
}

export function useNodeCreate(
  type: NodeType,
  onSuccess?: (key: string) => void
) {
  const { mutate: createDirectory } = useDirectoryCreateMutation();
  const { mutate: createNote } = useNoteCreateMutation();

  return () => {
    if (type === "directory") {
      createDirectory({ name: "folder" }, { onSuccess });
    } else {
      createNote({ name: "new note" }, { onSuccess });
    }
  };
}
