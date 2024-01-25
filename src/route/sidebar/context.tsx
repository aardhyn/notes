import { NodeType } from "algorithm";
import {
  When,
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
  // Shortcut,
} from "component";
import { ReactNode } from "react";

export function NodeContext({
  children,
  type,
  onRename,
  onDelete,
  onCreateSubdirectory,
  onCreateNote,
  onCopyNodeLink,
}: {
  children: ReactNode;
  type: NodeType;
  onRename: () => void;
  onDelete: () => void;
  onCreateSubdirectory: () => void;
  onCreateNote: () => void;
  onCopyNodeLink: () => void;
}) {
  return (
    <ContextMenu trigger={children} modal={false}>
      <When condition={type === "note"}>
        <ContextMenuItem
          // right={<Shortcut parts={["c"]} />}
          onClick={onCopyNodeLink}
        >
          Copy Link
        </ContextMenuItem>
      </When>
      <ContextMenuItem
        // right={<Shortcut parts={["space"]} />}
        onClick={onRename}
      >
        Rename
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={onCreateSubdirectory}>
        New Folder
      </ContextMenuItem>
      <ContextMenuItem
        // right={<Shortcut parts={["n"]} />}
        onClick={() => {
          onCreateNote();
        }}
      >
        New Note
      </ContextMenuItem>
      <ContextMenuSeparator />
      <ContextMenuItem
        // right={<Shortcut parts={["d"]} />}
        onClick={onDelete}
      >
        Delete
      </ContextMenuItem>
    </ContextMenu>
  );
}
