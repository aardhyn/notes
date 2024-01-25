import {
  DndContext,
  DragEndEvent,
  pointerWithin,
  useDraggable,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ReaderIcon, FileIcon } from "@radix-ui/react-icons";
import { TreeNode } from "algorithm";
import { useNoteMutation, useDirectoryMutation } from "api";
import { invariant } from "exception/invariant";
import { ReactNode, HTMLAttributes, useCallback } from "react";
import { s, CSS } from "style/stitches.config";

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
