import { Code } from "component/ui/Code";
import { styled } from "style/stitches.config";

export function Shortcuts() {
  return (
    <ShortcutsRoot>
      <Shortcut>
        <Cmd />
        <Plus />
        <Code>N</Code>
        <span>Make a new note</span>
      </Shortcut>
      <Shortcut>
        <Shift />
        <Plus />
        <Shift />
        <span>
          Open <strong>Command Palette</strong>
        </span>
      </Shortcut>
      <Shortcut>
        <Cmd />
        <Plus />
        <Code>E</Code>
        <span>
          Select <strong>Explorer</strong>
        </span>
      </Shortcut>
    </ShortcutsRoot>
  );
}

const ShortcutsRoot = styled("ul", {
  listStyle: "none",
  d: "flex",
  gap: 16,
  direction: "column",
});

const Shortcut = styled("li", {
  d: "flex",
  gap: 8,
  items: "center",
});

const Cmd = () => <Code>Cmd</Code>;
const Shift = () => <Code>Shift</Code>;
const Plus = () => <span>+</span>;
