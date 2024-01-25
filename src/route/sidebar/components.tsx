import { useDroppable } from "@dnd-kit/core";
import { ReactNode, useEffect, useRef } from "react";
import { styled, CSS } from "style/stitches.config";
import { useNodeCreate, useNodeRename } from "./hooks";
import { TreeNode } from "algorithm";
import { Button, Field } from "component";

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

  // focus and select input when renaming
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (!renaming) return;
    ref.current?.focus();
    ref.current?.select();
  }, [renaming]);

  if (!renaming) {
    return <NodeNameReadonly>{name}</NodeNameReadonly>;
  }

  const handleRename = () => {
    onRenamingChange(false);
    rename();
  };

  const handleKeyDown = (key: string) => {
    if (key === "Enter") {
      handleRename();
    } else if (key === "Escape") {
      // revert name and close
      setName(node.name);
      onRenamingChange(false);
    }
  };

  return (
    <NodeNameEditable
      ref={ref}
      variant="stealth"
      value={name}
      onBlur={handleRename}
      onValueChange={setName}
      onKeyDown={handleKeyDown}
    />
  );
}
const NodeNameEditable = styled(Field, {
  d: "flex",
  p: "unset",
  h: "unset",
});
const NodeNameReadonly = styled("span", {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
  pr: 4,
});

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

export function AddNodeButtons({
  parentKey,
  css,
}: {
  parentKey: string | null;
  css?: CSS;
}) {
  const createNote = useNodeCreate("note", { parentKey });
  const createDirectory = useNodeCreate("directory", { parentKey });

  return (
    <ButtonsRoot css={css}>
      <Button size="small" color="transparent" onClick={createNote}>
        Add note
      </Button>
      |
      <Button size="small" color="transparent" onClick={createDirectory}>
        Add directory
      </Button>
    </ButtonsRoot>
  );
}
const ButtonsRoot = styled("div", {
  p: 2,
  c: "$text3",
  d: "flex",
  items: "center",
});
