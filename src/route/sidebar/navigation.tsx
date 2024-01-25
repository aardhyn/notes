import { useShortcut } from "api";
import { useNavigate } from "react-router-dom";
import { useTreeStore } from "./store";

/**
 * bind keyboard shortcuts for tree navigation to a reference of T
 * @param enabled whether or not to enable shortcuts
 * @returns reference with bound keyboard shortcuts for tree navigation
 */
export function useTreeShortcuts() {
  const {
    toggleExpansion,
    selectChild,
    selected,
    selectNext,
    selectPrevious,
    selectParent,
  } = useTreeStore();

  // only enable shortcuts when a tree node is selected and not renaming
  const focusedElement = document.activeElement;
  const selectedTreeNode = !!selected.node;
  const renaming = focusedElement?.tagName === "INPUT";
  const enabled = selectedTreeNode && !renaming;

  useShortcut(selectNext, "ArrowDown", { enabled });
  useShortcut(selectPrevious, "ArrowUp", { enabled });

  useShortcut(selectChild, "ArrowRight", { enabled });
  useShortcut(selectParent, "ArrowLeft", { enabled });

  const navigate = useNavigate();
  useShortcut(
    () => {
      const { node } = selected;
      if (!node) {
        return;
      }

      if (node?.type === "directory") {
        toggleExpansion(node);
      } else {
        navigate(node.key);
      }
    },
    "enter",
    { enabled }
  );
}
