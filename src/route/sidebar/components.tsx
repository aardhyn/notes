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
import Field from "component/ui/Field";
import { ReactNode, useState } from "react";
import { styled, CSS } from "style/stitches.config";

export function NodeName({
  renaming,
  onRenamingChange,
  node,
}: {
  renaming: boolean;
  onRenamingChange: (renaming: boolean) => void;
  node: TreeNode;
}) {
  const [name, setName] = useState(node.name);
  const { mutate: mutateNote } = useNoteMutation();
  const { mutate: mutateDirectory } = useDirectoryMutation();

  if (!renaming) {
    return <span onDoubleClick={() => onRenamingChange(true)}>{name}</span>;
  }

  const isDirectory = node.type === "directory";

  const handleRename = () => {
    onRenamingChange(false);

    if (name === node.name) {
      return;
    }

    const processed = name; // processNoteName(name, usedNames);
    setName(processed);

    if (isDirectory) {
      mutateDirectory({ directory_key: node.key, name: processed });
    } else {
      mutateNote({ note_key: node.key, name: processed });
    }
  };

  return (
    <NodeNameRoot
      variant="stealth"
      autoFocus
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

export function NodeDelete({ node }: { node: TreeNode }) {
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

  return (
    <IconButton color="error" onClick={handleDelete}>
      <TrashIcon />
    </IconButton>
  );
}

export function CreateNoteButton({
  onSuccess,
}: {
  onSuccess: (noteKey: string) => void;
}) {
  const { mutate: createNote } = useNoteCreateMutation();
  const handleCreateNote = () => {
    createNote({ name: "new note" }, { onSuccess });
  };

  return (
    <Button
      leadingIcon={<PlusIcon />}
      color="neutral"
      onClick={handleCreateNote}
    >
      Note
    </Button>
  );
}

export function CreateDirectoryButton() {
  const { mutate: createDirectory } = useDirectoryCreateMutation();
  const handleCreateDirectory = () => {
    createDirectory({ name: "folder" });
  };

  return (
    <Button
      leadingIcon={<PlusIcon />}
      color="neutral"
      onClick={handleCreateDirectory}
    >
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
