import { Button, CloseDialog, Code, Dialog, ShortcutSet } from "component";
import {
  MODIFIER_KEYS,
  Modifier,
  Shortcut,
  ShortcutEvent,
  ShortcutKey,
  isShortcut,
} from "api";
import { ReactNode, useEffect, useState } from "react";
import { styled } from "style/stitches.config";
import { invariant } from "exception/invariant";

const DESCRIPTION = (
  <>
    Hold any key combination and press <Code>Save</Code>
  </>
);

const INITIAL_SHORTCUT_EVENT: ShortcutEvent = {
  key: null,
  modifiers: [],
};

export function RecordShortcutDialog({
  name,
  onShortcutChange,
  children,
  requireModifier = false,
}: {
  name: string;
  children?: ReactNode;
  onShortcutChange: (shortcut: Shortcut) => void;
  requireModifier?: boolean;
}) {
  const [open, setOpen] = useState(false);

  const [recording, setRecording] = useState(INITIAL_SHORTCUT_EVENT);
  const handleSave = () => {
    invariant(isShortcut(recording), "invalid shortcut!");
    onShortcutChange(recording);
    setOpen(false);
    setRecording(INITIAL_SHORTCUT_EVENT);
  };

  const { key, modifiers } = recording;
  const parts = [...(modifiers ?? []), key];
  const valid = !!key && (!requireModifier || (modifiers?.length ?? 0) > 0);

  return (
    <Dialog
      size="medium"
      trigger={children}
      title={`${name}`}
      description={DESCRIPTION}
      footer={<Footer onSave={handleSave} valid={valid} />}
      open={open}
      onOpenChange={setOpen}
    >
      <KeyListener onShortcutChange={setRecording} />
      <ShortcutSet parts={parts} />
    </Dialog>
  );
}

const KEYDOWN = "keydown";
const KEYUP = "keyup";
function KeyListener({
  onShortcutChange,
}: {
  onShortcutChange: (shortcut: ShortcutEvent) => void;
}) {
  const [keys, setKeys] = useState<ShortcutKey[]>([]);
  const [modifiers, setModifiers] = useState<Modifier[]>([]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const modifierKey = MODIFIER_KEYS.find((key) => key === event.key);
      if (modifierKey) {
        if (!modifiers.includes(modifierKey)) {
          setModifiers((modifiers) => [...modifiers, modifierKey]);
        }
      } else {
        const key = event.key.toLocaleLowerCase() as ShortcutKey;
        if (!keys.includes(key)) {
          setKeys((keys) => [...keys, key]);
        }
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const modifierKey = MODIFIER_KEYS.find((key) => key === event.key);
      if (modifierKey) {
        setModifiers((modifiers) =>
          modifiers.filter((modifier) => modifier !== modifierKey)
        );
      } else {
        const key = event.key.toLocaleLowerCase() as ShortcutKey;
        setKeys((keys) => keys.filter((k) => k !== key));
      }
    };

    window.addEventListener(KEYDOWN, handleKeyDown);
    window.addEventListener(KEYUP, handleKeyUp);
    return () => {
      window.removeEventListener(KEYDOWN, handleKeyDown);
      window.removeEventListener(KEYUP, handleKeyUp);
    };
  }, [keys, modifiers]);

  useEffect(() => {
    const key = [...keys].at(-1);
    onShortcutChange({
      key: (key ?? null) as ShortcutKey | null,
      modifiers: [...modifiers],
    });
  }, [keys, modifiers, onShortcutChange]);

  return null;
}

function Footer({
  onSave: handleSave,
  valid,
}: {
  onSave: () => void;
  valid: boolean;
}) {
  return (
    <FooterRoot>
      <ErrorText>{!valid && "This shortcut is not valid"}</ErrorText>
      <CloseDialog>
        <Button color="transparent">Cancel</Button>
      </CloseDialog>
      <Button onClick={handleSave} color="primary">
        Save
      </Button>
    </FooterRoot>
  );
}
const FooterRoot = styled("div", {
  w: "100%",
  items: "center",
  d: "grid",
  gridTemplateColumns: "1fr auto auto",
});
const ErrorText = styled("span", { color: "$onError" });
