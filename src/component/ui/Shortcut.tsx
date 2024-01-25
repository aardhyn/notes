import { CSS, styled } from "style/stitches.config";
import { Code } from "./Code";
import { capitalize } from "utility";

export function Shortcut({
  parts,
  separator = "+",
  css,
}: {
  parts: string[];
  separator?: string;
  css?: CSS;
}) {
  return (
    <ShortcutRoot css={css}>
      {parts.map((part, i) => (
        <Segment key={i}>
          {!!i && parts.length > 1 && <span>{separator}</span>}
          <Code>{capitalize(part)}</Code>
        </Segment>
      ))}
    </ShortcutRoot>
  );
}

const ShortcutRoot = styled("span", {
  d: "flex",
  items: "center",
  gap: 4,
});
const Segment = styled("span", { d: "flex", gap: 4, items: "center" });
