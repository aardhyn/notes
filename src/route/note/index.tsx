import { styled, CSS } from "style/stitches.config";
import { useState } from "react";
import { Editor } from "component/Editor";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { hideScrollbar } from "../../style/util";

export default function Note() {
  // const { noteKey } = useNoteParams();

  const [note, setNote] = useState<string>("");

  return (
    <Root>
      <Editor
        value={note}
        onChange={setNote}
        css={{
          ...hideScrollbar, // temp: get ScrollArea working here.
          br: "1px solid $outline3",
          bl: "1px solid $outline3",

          h: "100vh",
          overflow: "auto",

          w: "100%",
          maxW: 1024,
          p: 32,

          "&>div": {
            ...styles,
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
  justify: "center",
  h: "100vh",
});

const styles: CSS = {
  fontSize: 16,
  fontFamily: "$main",

  "& *": {
    // override inline styles pasted from other sources
    textAlign: "left !important",
    color: "$text !important",
  },

  "& h1": { fontSize: "5rem", mb: 4 },
  "& h2": { fontSize: "3rem", mb: 10 },
  "& h3": { fontSize: "2.5rem", mb: 10 },
  "& h4": { fontSize: "2rem", mb: 8 },
  "& h5": { fontSize: "1.5rem", mb: 6 },
  "& h6": { fontSize: "1rem", mb: 4 },

  "& p": { fontSize: "1rem", mb: 16 },

  "& a": {
    color: "$primary",
    textDecoration: "none",
    "&:hover": { textDecoration: "underline" },
  },

  "& ul": { listStyleType: "disc" },
  "& ol": { listStyleType: "decimal" },

  "& blockquote": {
    borderLeft: "3px solid $outline2",
    pl: 8,
  },

  "& pre, & code": {
    fontFamily: "$mono",
    fontSize: "1rem",
    px: 6,
    py: 3,
    borderRadius: 4,
    backgroundColor: "$background2",
  },
};
