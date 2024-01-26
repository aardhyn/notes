import { Character } from "constant/types";
import { invariant } from "exception/invariant";
import { useEffect } from "react";
import {
  PartialRecord,
  caselessEquality,
  getOperatingSystem,
  isMacOS,
  isWindows,
} from "utility";

const modifierKeys = [
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
type Modifier = (typeof modifierKeys)[number];

// translate Windows keys to MacOS keys
const translations: PartialRecord<Modifier, Modifier> = {
  Control: "Meta",
  Meta: "Control",
};
function translateModifier(modifier: Modifier): Modifier {
  return translations[modifier] ?? modifier;
}

export type ArrowKey = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight";
type ShortcutKey = Character | ArrowKey | "enter" | "escape" | "space";

type ShortcutOptions = Partial<{ enabled: boolean; modifiers?: Modifier[] }>;

const SHORTCUT_EVENT = "keydown";

function createShortcut(
  fn: () => void,
  key: ShortcutKey,
  modifiers: Modifier[] = []
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
  key: ShortcutKey,
  { modifiers, enabled }: ShortcutOptions = {}
) {
  useEffect(() => {
    const { register, deregister } = createShortcut(
      fn,
      key,
      !isWindows() ? modifiers?.map(translateModifier) : modifiers
    );

    if (enabled ?? true) {
      deregister();
      register();
    } else {
      deregister();
    }

    return deregister;
  }, [fn, key, enabled, modifiers]);
}
