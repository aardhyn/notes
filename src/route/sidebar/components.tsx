import { useDroppable } from "@dnd-kit/core";
import { PlusIcon, TrashIcon } from "@radix-ui/react-icons";
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
import { TreeNode } from "api/tree";
import { Button, IconButton } from "component/ui/Button";
import { Field } from "component/ui/Field";
import { ReactNode, useEffect, useRef, useState } from "react";
import { styled, CSS } from "style/stitches.config";
import { useNodeCreate, useNodeRename } from "./hooks";

export function NodeName({
  renaming,
  onRenamingChange,
  node,
}: {
  renaming: boolean;
  onRenamingChange: (renaming: boolean) => void;
  node: TreeNode;
}) {
  const { name, setName, rename } = useNodeRename(node);
  const handleRename = () => {
    onRenamingChange(false);
    rename();
  };

  // focus and select input when renaming
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (renaming) {
      ref.current?.focus();
      ref.current?.select();
    }
  }, [renaming]);

  if (!renaming) {
    return <span onDoubleClick={() => onRenamingChange(true)}>{name}</span>;
  }

  return (
    <NodeNameRoot
      ref={ref}
      variant="stealth"
      value={name}
      onValueChange={setName}
      onBlur={handleRename}
      onKeyDown={(key) => {
        if (key === "Enter") {
          handleRename();
        }
      }}
    />
  );
}

const NodeNameRoot = styled(Field, {
  flex: 1,
  p: "unset",
  h: "unset",
});

export function CreateNoteButton({
  onSuccess,
}: {
  onSuccess: (noteKey: string) => void;
}) {
  const handleCreate = useNodeCreate("note", onSuccess);
  return (
    <Button leadingIcon={<PlusIcon />} color="neutral" onClick={handleCreate}>
      Note
    </Button>
  );
}

export function CreateDirectoryButton() {
  const handleCreate = useNodeCreate("directory");
  return (
    <Button leadingIcon={<PlusIcon />} color="neutral" onClick={handleCreate}>
      Folder
    </Button>
  );
}

export function DirectoryDropzone({
  children,
  directoryKey,
  css,
}: {
  children: ReactNode;
  directoryKey: string | null;
  css?: CSS;
}) {
  const { isOver, setNodeRef } = useDroppable({
    id: directoryKey ?? "",
    data: { type: "directory" },
  });

  return (
    <DirectoryDropzoneRoot hovered={isOver} ref={setNodeRef} css={css}>
      {children}
    </DirectoryDropzoneRoot>
  );
}
const DirectoryDropzoneRoot = styled("div", {
  variants: {
    hovered: { true: { r: 8, backgroundColor: "$background3" } },
  },
});
