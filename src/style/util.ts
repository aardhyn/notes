import { CSS } from "./stitches.config";

export const hideScrollbar: CSS = {
  scrollbarWidth: "none",
  msOverflowStyle: "none",
  "&::-webkit-scrollbar": { display: "none" },
};
