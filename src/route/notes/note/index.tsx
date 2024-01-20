import { styled } from "style/stitches.config";
import { useEffect, useState } from "react";
import { Editor } from "component/Editor";
import { hideScrollbar } from "../../../style/util";
import { useNoteMutation, useNoteQuery } from "api/note";
import { useNoteParams } from "./params";
import { invariant } from "exception/invariant";
import { NOTE_STYLES } from "./style";
import { SaveIndicator } from "./SaveIndicator";
import { useDebounce } from "util/useDebounce";
import type { Note } from "api/note";
import { LoadingShim } from "component/ui/LoadingShim";
import { useTitle } from "route/useTitle";
import { usePaneManager } from "route/usePaneManager";

export default function Note() {
  const { noteKey } = useNoteParams();

  const { data: note, error, isLoading } = useNoteQuery(noteKey);

  useTitle(note?.name ?? "Note");

  if (isLoading) {
    return <LoadingShim />;
  }

  if (error) {
    return <Root>Error: {error.message}</Root>;
  }

  invariant(note, "loaded note should not be nullish");

  return <NoteProvider note={note} key={noteKey} />;
}

function NoteProvider({ note }: { note: Note }) {
  const { noteKey } = useNoteParams();

  const [content, setContent] = useState(note.content);
  const debouncedContent = useDebounce(content, 400);
  const { mutate: mutateNote, isPending } = useNoteMutation();
  useEffect(() => {
    if (note.content === debouncedContent) {
      return;
    }
    mutateNote({
      note_key: noteKey,
      content: debouncedContent,
    });
  }, [debouncedContent, mutateNote, note.content, noteKey]);

  const { selectPane, activePane } = usePaneManager();
  const handleFocus = () => {
    selectPane(noteKey);
  };

  const handleBlur = () => {
    selectPane(null); // todo: could be problematic if we have multiple notes open.
  };

  return (
    <Root active={!!activePane}>
      <SaveIndicator saving={isPending} />
      <Editor
        value={note?.content ?? ""}
        onChange={setContent}
        focused={activePane === noteKey}
        onFocus={handleFocus}
        onBlur={handleBlur}
        css={{
          ...hideScrollbar, // temp: get ScrollArea working here.

          h: "100vh",
          overflow: "auto",

          w: "100%",
          maxW: 1024,
          p: 32,

          "&>div": {
            ...NOTE_STYLES,
            h: "100%",
          },
        }}
      />
    </Root>
  );
}
const Root = styled("article", {
  d: "flex",
  items: "center",
  direction: "column",
  justify: "center",
  h: "100vh",

  variants: {
    active: {
      true: { bt: "2px solid $outline" },
      false: { bt: "2px solid $background" },
    },
  },

  defaultVariants: { active: false },
});
