import { CSS } from "style/stitches.config";

export const NOTE_STYLES: CSS = {
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

  "& ul": { listStyleType: "disc", ml: 26 },
  "& ol": { listStyleType: "decimal", ml: 26 },

  "& blockquote": {
    borderLeft: "4px solid $outline2",
    p: 10,
    pl: 14,
    m: 8,
    my: 16,
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
