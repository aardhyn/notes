import { ShortcutSet, Button, RecordShortcutDialog } from "component";
import { ShortcutPreferences } from "../types";
import { styled } from "style/stitches.config";
import { useShortcutPreference } from "../preferences";
import { Shortcut } from "api";

export function ShortcutPreferencesSection({
  preferences,
}: {
  preferences: ShortcutPreferences;
}) {
  return (
    <ShortcutPreferencesRoot>
      {Object.keys(preferences).map((shortcutKey) => (
        <ShortcutPreference key={shortcutKey} shortcutKey={shortcutKey} />
      ))}
    </ShortcutPreferencesRoot>
  );
}

const ShortcutPreferencesRoot = styled("ul");

function ShortcutPreference({ shortcutKey }: { shortcutKey: string }) {
  const [shortcut, setShortcut] = useShortcutPreference(
    shortcutKey as keyof ShortcutPreferences
  );
  const handleShortcutChange = (mutation: Shortcut) => {
    setShortcut({
      ...shortcut,
      ...mutation,
    });
  };

  const { name, key, modifiers } = shortcut;
  const shortcutParts = [...((modifiers ?? []) as string[]), key];

  return (
    <ShortcutRow key={shortcutKey}>
      <ShortcutAction>{name}</ShortcutAction>
      <ShortcutKeys>
        <ShortcutSet parts={shortcutParts} />
        <RecordShortcutDialog
          name={name ?? "Unnamed Shortcut"}
          onShortcutChange={handleShortcutChange}
          requireModifier
        >
          <Button color="transparent" size="small">
            Edit
          </Button>
        </RecordShortcutDialog>
      </ShortcutKeys>
    </ShortcutRow>
  );
}
const ShortcutRow = styled("li", {
  d: "grid",
  gridTemplateColumns: "auto 1fr 1fr",
  gap: 24,
  items: "center",
});
const ShortcutKeys = styled("span", {
  d: "inline-flex",
  gap: 8,
  items: "center",
});
const ShortcutAction = styled("span", {});
