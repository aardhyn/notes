import { getShortcutParts } from "api";
import { ShortcutSet } from "component";
import { useShortcutPreference } from "route/preferences/preferences";
import { styled } from "style/stitches.config";

export function Shortcuts() {
  const [toggleSidebar] = useShortcutPreference("toggleSidebar");

  return (
    <List>
      {/* <Line>
        <span>
          Create <strong>New Note</strong>
        </span>
        <Shortcut parts={["cmd", "o"]} />
      </Line> */}
      {/* <Line>
        <span>
          Open <strong>Command Palette</strong>
        </span>
        <Shortcut parts={["shift", "shift"]} />
      </Line> */}
      <Line>
        <span>
          Select <strong>Explorer</strong>
        </span>
        <ShortcutSet parts={getShortcutParts(toggleSidebar)} />
      </Line>
    </List>
  );
}

const List = styled("ul", {
  d: "flex",
  listStyle: "none",
  direction: "column",
  gap: 16,
});

const Line = styled("li", {
  d: "grid",
  gap: 16,
  items: "center",
  gridTemplateColumns: "1fr 1fr",
  "&>span:first-child": {
    justifySelf: "end",
  },
});
