import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { BLUR_COMMAND, COMMAND_PRIORITY_LOW, FOCUS_COMMAND } from "lexical";
import { useEffect } from "react";

const PRIORITY = COMMAND_PRIORITY_LOW;

export function OnFocusPlugin({
  onFocusChange,
  focus,
}: {
  onFocusChange: (focused: boolean) => void;
  focus?: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerCommand(
      BLUR_COMMAND,
      () => {
        onFocusChange(false);
        return false;
      },
      PRIORITY
    );
    editor.registerCommand(
      FOCUS_COMMAND,
      () => {
        onFocusChange(true);
        return false;
      },
      PRIORITY
    );
  }, [editor, onFocusChange]);

  useEffect(() => {
    if (focus === undefined) return; // no control

    if (focus) {
      editor.focus();
    } else {
      editor.blur();
    }
  }, [editor, focus]);

  return null;
}
