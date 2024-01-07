import { Character } from "constant/types";
import { useEffect } from "react";
import { capitalize, caselessEquality } from "util/string";

const modifierKeys = ["alt", "ctrl", "meta", "shift"] as const;
type Modifier = (typeof modifierKeys)[number];

export function useShortcut(
  fn: () => void,
  key: Character,
  modifiers?: Modifier[]
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isModified =
        modifiers?.every((modifier) =>
          event.getModifierState(capitalize(modifier))
        ) ?? true;
      const isKey = caselessEquality(event.key, key);

      if (isModified && isKey) {
        console.log("shortcut", key, modifiers);
        event.preventDefault();
        event.stopPropagation();
        fn();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [fn, key, modifiers]);
}
