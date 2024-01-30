import { Shortcut } from "api";

export type UserPreferences = {
  shortcuts: ShortcutPreferences;
};

export type ShortcutPreferences = Record<string, Shortcut>;
