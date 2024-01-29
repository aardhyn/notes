import { CSS, styled } from "style/stitches.config";
import { Code } from "../ui/Code";
import { PartialRecord, capitalize, isWindows } from "utility";
import { ModifierKey } from "api";
import { HTMLAttributes } from "react";

const DEFAULT_SEPARATOR = "+";

type Translation = [string, string];
const partTranslations: PartialRecord<ModifierKey, Translation> = {
  Meta: ["Win", "⌘"],
  Control: ["Ctrl", "⌃"],
  Alt: ["Alt", "⌥"],
};

export function ShortcutSet({
  parts,
  separator = DEFAULT_SEPARATOR,
  ...props
}: {
  parts: (string | null)[];
  separator?: string;
  css?: CSS;
} & HTMLAttributes<HTMLSpanElement>) {
  return (
    <ShortcutRoot {...props}>
      {parts
        .filter((p) => p !== null)
        .map((part) => {
          const translation = partTranslations[part as ModifierKey];
          if (translation) {
            const [windowsKey, macOSKey] = translation;
            return isWindows() ? windowsKey : macOSKey;
          }
          return part;
        })
        .map((part, i) => (
          <Segment key={i}>
            {!!i && parts.length > 1 && <span>{separator}</span>}
            <Code>{capitalize(part!)}</Code>
          </Segment>
        ))}
    </ShortcutRoot>
  );
}

const ShortcutRoot = styled("span", {
  h: 24,
  d: "flex",
  items: "center",
  gap: 4,
});
const Segment = styled("span", { d: "flex", gap: 4, items: "center" });
