import { styled } from "style/stitches.config";
import { useNoteParams } from "./params";

export default function Note() {
  const { noteKey } = useNoteParams();
  return <Root>{noteKey}</Root>;
}

const Root = styled("div", {});
