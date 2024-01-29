import { Character } from "constant/types";
import { invariant } from "exception/invariant";
import { useEffect } from "react";
import { caselessEquality } from "utility";

export const MODIFIER_KEYS = [
  "Alt",
  "Control",
  "Meta",
  "Shift",
  "OS",
  "Hyper",
  "Super",
  "ScrollLock",
  "CapsLock",
  "NumLock",
  "AltGraph",
  "Fn",
  "FnLock",
  "Symbol",
  "SymbolLock",
] as const;
export type ModifierKey = (typeof MODIFIER_KEYS)[number];

export type ArrowKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
export type ShortcutKey = Character | ArrowKey | "enter" | "escape" | "space";

export type Shortcut = {
  key: ShortcutKey;
  modifiers?: ModifierKey[];
  enabled?: boolean;
  name?: string;
};
export type ShortcutEvent = {
  key: ShortcutKey | null;
  modifiers?: ModifierKey[];
};
export function isShortcut(
  shortcut: Shortcut | ShortcutEvent
): shortcut is Shortcut {
  return shortcut["key"] !== null;
}
export function getShortcutParts({
  key,
  modifiers,
}: Shortcut | ShortcutEvent): string[] {
  return [...((modifiers ?? []) as string[]), ...([key ?? []] as string[])];
}

const SHORTCUT_EVENT = "keydown";

function createShortcut(
  fn: () => void,
  key: ShortcutKey,
  modifiers: ModifierKey[] = []
) {
  const handleKeyDown = (event: Event) => {
    invariant(event instanceof KeyboardEvent, "not keyboard event");

    const isModified =
      modifiers?.every((modifier) => event.getModifierState(modifier)) ?? true;
    const isKey = caselessEquality(event.key, key);

    if (isModified && isKey) {
      event.preventDefault();
      event.stopPropagation();
      fn();
    }
  };

  return {
    register() {
      document.addEventListener(SHORTCUT_EVENT, handleKeyDown, false);
    },
    deregister() {
      document.removeEventListener(SHORTCUT_EVENT, handleKeyDown, false);
    },
  };
}

/**
 * Bind a function to a keyboard shortcut in either
 * @param fn function to call when shortcut is pressed
 * @param key key to listen for
 * @param modifiers modifiers to listen for
 */
export function useShortcut(
  fn: () => void,
  { key, modifiers, enabled }: Shortcut
) {
  useEffect(() => {
    const { register, deregister } = createShortcut(fn, key, modifiers);

    if (enabled ?? true) {
      deregister();
      register();
    } else {
      deregister();
    }

    return deregister;
  }, [fn, key, enabled, modifiers]);
}
