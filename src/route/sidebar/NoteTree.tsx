import {
  useCreateNoteMutation,
  useNoteMutation,
  useDeleteNoteMutation,
} from "api/note";
import { Button, IconButton } from "component/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { CSS, s, styled } from "style/stitches.config";
import {
  PlusIcon,
  TrashIcon,
  FilePlusIcon,
  FileMinusIcon,
  ReaderIcon,
} from "@radix-ui/react-icons";
import { useNoteParams } from "route/notes/note/params";
import { useState } from "react";
import Field from "component/ui/Field";
import { LoadingShim } from "component/ui/LoadingShim";
import {
  useDirectoryCreateMutation,
  useDirectoryDeleteMutation,
  useDirectoryMutation,
} from "api/directory";
import { TreeNode, useNoteTreeQuery } from "api/tree";
import { invariant } from "exception/invariant";

export function NoteTree({ editing }: { editing: boolean }) {
  const { data: tree, error, isLoading } = useNoteTreeQuery();

  const navigate = useNavigate();
  const { mutate: createNote } = useCreateNoteMutation();
  const handleCreateNote = () => {
    createNote(
      { name: "new note" },
      {
        onSuccess: (noteKey) => {
          navigate(`/${noteKey}`);
        },
      }
    );
  };

  const { mutate: createDirectory } = useDirectoryCreateMutation();
  const handleCreateDirectory = () => {
    createDirectory({ name: "folder" });
  };

  if (isLoading) {
    return <LoadingShim />;
  }

  if (error) {
    return <s.div css={{ flex: 1 }}>Error: {error.message}</s.div>;
  }

  return (
    <NoteNodes css={{ flex: 1 }}>
      <Head>
        <Button
          leadingIcon={<PlusIcon />}
          color="neutral"
          onClick={handleCreateNote}
        >
          Note
        </Button>
        <Button
          leadingIcon={<PlusIcon />}
          color="neutral"
          onClick={handleCreateDirectory}
        >
          Folder
        </Button>
      </Head>
      {tree?.map((node) => (
        <NoteTreeNode key={node.key} node={node} editing={editing} />
      ))}
    </NoteNodes>
  );
}
const Head = styled("div", {
  d: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 8,
  pb: 8,
});
const NoteNodes = styled("ul", {
  m: 0,
  p: 8,
  d: "flex",
  direction: "column",
});

const NODE_INDENT = 16;

function NoteTreeNode({
  node,
  editing,
  indent = 0,
}: {
  node: TreeNode;
  editing: boolean;
  indent?: number;
}) {
  const { noteKey } = useNoteParams({ noexcept: true });

  const isNote = node.type === "note";
  const isDirectory = node.type === "directory";
  invariant(!isNote || !isDirectory, `Unknown node type: ${node}`);

  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(node.name);
  const { mutate: mutateNote } = useNoteMutation();
  const { mutate: mutateDirectory } = useDirectoryMutation();
  const handleRename = () => {
    setRenaming(false);

    if (name === node.name) return;

    const processed = name; // processNoteName(name, usedNames);
    setName(processed);

    if (isDirectory) {
      mutateDirectory({ directory_key: node.key, name: processed });
    } else {
      mutateNote({ note_key: node.key, name: processed });
    }
  };

  const { mutate: deleteNote } = useDeleteNoteMutation();
  const { mutate: deleteDirectory } = useDirectoryDeleteMutation();
  const handleDelete = () => {
    if (isDirectory && confirm(`Delete folder "${node.name}"?`)) {
      deleteDirectory(node.key);
    } else if (confirm(`Delete note "${node.name}"?`)) {
      deleteNote(node.key);
    }
  };

  const [expanded, setExpanded] = useState(false);
  const Icon =
    node.type === "note" ? ReaderIcon : expanded ? FileMinusIcon : FilePlusIcon;

  const selected = noteKey === node.key;
  const indentation: CSS = { pl: NODE_INDENT * indent };

  return (
    <>
      <NoteNodeRoot css={indentation}>
        <NoteName
          selected={selected}
          expanded={expanded}
          onDoubleClick={() => setRenaming(true)}
          {...(isNote
            ? { as: Link, to: node.key }
            : { as: s.button, onClick: () => setExpanded(!expanded) })}
        >
          <Icon />
          {renaming ? (
            <NameField
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
          ) : (
            name
          )}
        </NoteName>
        {editing && (
          <IconButton css={{ ml: 8 }} color="error" onClick={handleDelete}>
            <TrashIcon />
          </IconButton>
        )}
      </NoteNodeRoot>
      {isDirectory &&
        expanded &&
        node.children?.map((child) => (
          <NoteTreeNode
            key={child.key}
            node={child}
            editing={editing}
            indent={indent + 1}
          />
        ))}
    </>
  );
}

const NameField = styled(Field, {
  flex: 1,
  p: "unset",
  h: "unset",
});
const NoteName = styled(s.div, {
  r: 8,
  d: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 8,
  p: 8,
  items: "center",
  overflow: "hidden",

  variants: {
    selected: {
      true: { bg: "$primaryTonal", color: "$onPrimaryTonal", fontWeight: 400 },
      false: { "&:hover": { bg: "$background3" } },
    },
    expanded: {
      true: { fontWeight: 600 },
    },
  },
});
const NoteNodeRoot = styled("li", {
  d: "grid",
  gridTemplateColumns: "1fr auto",
  items: "center",
  listStyle: "none",
});
