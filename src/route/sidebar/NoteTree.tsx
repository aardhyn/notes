import {
  useNotesQuery,
  useCreateNoteMutation,
  SimpleNote,
  useNoteMutation,
  useDeleteNoteMutation,
} from "api/note";
import { Button, IconButton } from "component/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { s, styled } from "style/stitches.config";
import { PlusIcon, TrashIcon, FileTextIcon } from "@radix-ui/react-icons";
import { useNoteParams } from "route/notes/note/params";
import { useMemo, useState } from "react";
import Field from "component/ui/Field";
import { LoadingShim } from "component/ui/LoadingShim";
import { firstUniqueName } from "util/string";

export function NoteTree({ editing }: { editing: boolean }) {
  const { data: notes, error, isLoading } = useNotesQuery();

  const names = useMemo(() => notes?.map((note) => note.name) ?? [], [notes]);

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

  if (isLoading) {
    return <LoadingShim />;
  }
  if (error) {
    return <s.div css={{ flex: 1 }}>Error: {error.message}</s.div>;
  }

  return (
    <NoteNodes css={{ flex: 1 }}>
      <Button
        leadingIcon={<PlusIcon />}
        color="neutral"
        onClick={handleCreateNote}
        css={{ mb: 8 }}
      >
        New Note
      </Button>
      {notes?.map((note) => (
        <NoteNode
          key={note.note_key}
          note={note}
          editing={editing}
          usedNames={names}
        />
      ))}
    </NoteNodes>
  );
}
const NoteNodes = styled("ul", {
  m: 0,
  p: 8,
  d: "flex",
  direction: "column",
});

const UNTITLED_NOTE_PREFIX = "Untitled Note";
function processNoteName(name: string, existingNames: string[]) {
  const trimmed = name.trim();
  const processed = trimmed.replace(/[\\/]/g, "");

  if (!processed) return firstUniqueName(UNTITLED_NOTE_PREFIX, existingNames);

  // can't do this... must check for uniqueness at a route level
  // if (existingNames.includes(processed)) throw new NonUniqueNameError(processed);

  return processed;
}

function NoteNode({
  note,
  editing,
  usedNames,
}: {
  note: SimpleNote;
  editing: boolean;
  usedNames: string[];
}) {
  const { noteKey } = useNoteParams({ noexcept: true });
  const selected = noteKey === note.note_key;

  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(note.name);
  const { mutate: mutateNote } = useNoteMutation();
  const handleRename = () => {
    setRenaming(false);

    if (name === note.name) return;
    const processed = processNoteName(name, usedNames);

    setName(processed);
    mutateNote({ note_key: note.note_key, name: processed });
  };

  const { mutate: deleteNote } = useDeleteNoteMutation();
  const handleDelete = () => {
    if (confirm(`Delete note "${note.name}"?`)) deleteNote(note.note_key);
  };

  return (
    <NoteNodeRoot>
      <NoteName
        selected={selected}
        onDoubleClick={() => setRenaming(true)}
        to={note.note_key}
      >
        <FileTextIcon />
        {renaming ? (
          <NameField
            variant="stealth"
            autoFocus
            value={name}
            onValueChange={setName}
            onBlur={() => {
              handleRename();
            }}
            onKeyDown={(key) => {
              if (key === "Enter") handleRename();
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
  );
}

const NameField = styled(Field, {
  flex: 1,
  p: "unset",
  h: "unset",
});
const NoteName = styled(Link, {
  r: 8,
  d: "grid",
  gridTemplateColumns: "auto 1fr",
  gap: 8,
  p: 8,
  items: "center",
  overflow: "hidden",

  variants: {
    selected: {
      true: { bg: "$primaryTonal", color: "$onPrimaryTonal", fontWeight: 500 },
      false: { "&:hover": { bg: "$background3" } },
    },
  },
});
const NoteNodeRoot = styled("li", {
  d: "grid",
  gridTemplateColumns: "1fr auto",
  items: "center",
  listStyle: "none",
});
