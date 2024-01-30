import { ShortcutPreferences, UserPreferences } from "./types";

export const DEFAULT_KEYBOARD_SHORTCUTS: ShortcutPreferences = {
  toggleSidebar: {
    key: "s",
    modifiers: ["Control"],
    name: "Toggle Sidebar",
  },
};

export const DEFAULT_USER_PREFERENCES: UserPreferences = {
  shortcuts: DEFAULT_KEYBOARD_SHORTCUTS,
};
