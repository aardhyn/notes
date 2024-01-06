import { Shortcut } from "component/ui/Shortcut";
import { styled } from "style/stitches.config";

export function Shortcuts() {
  return (
    <List>
      <Line>
        <Shortcut parts={["cmd", "n"]} />
        Create new file
      </Line>
      <Line>
        <Shortcut parts={["shift", "shift"]} />
        Open <strong>Command Palette</strong>
      </Line>
      <Line>
        <Shortcut parts={["cmd", "e"]} />
        Select <strong>Explorer</strong>
      </Line>
    </List>
  );
}

const List = styled("ul", {
  listStyle: "none",
  d: "flex",
  gap: 16,
  direction: "column",
});

const Line = styled("li", {
  d: "flex",
  gap: 8,
  items: "center",
});
