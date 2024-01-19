import { useDroppable } from "@dnd-kit/core";
import { Field } from "component/ui/Field";
import { ReactNode, useEffect, useRef } from "react";
import { styled, CSS } from "style/stitches.config";
import { useNodeRename } from "./hooks";
import { TreeNode } from "algorithm/tree";

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
    return <span>{name}</span>;
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
        } else if (key === "Escape") {
          // revert name and close
          setName(node.name);
          onRenamingChange(false);
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
