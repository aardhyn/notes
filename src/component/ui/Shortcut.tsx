import { CSS, styled } from "style/stitches.config";
import { Code } from "./Code";
import { capitalize } from "util/string";

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
        <>
          {!!i && parts.length > 1 && (
            <ShortcutSeparator key={i + "s"}>{separator}</ShortcutSeparator>
          )}
          <ShortcutPart key={i}>{capitalize(part)}</ShortcutPart>
        </>
      ))}
    </ShortcutRoot>
  );
}

const ShortcutRoot = styled("span", {
  d: "flex",
  items: "center",
  gap: 4,
});
const ShortcutPart = styled(Code, {});
const ShortcutSeparator = styled("span", {});
