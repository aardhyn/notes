import { NodeType } from "algorithm/tree";
import { When } from "component/When";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuSeparator,
} from "component/ui/Context";
import { Shortcut } from "component/ui/Shortcut";
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
      <ContextMenuItem right={<Shortcut parts={["d"]} />} onClick={onDelete}>
        Delete
      </ContextMenuItem>
      <ContextMenuItem
        right={<Shortcut parts={["space"]} />}
        onClick={onRename}
      >
        Rename
      </ContextMenuItem>
      <When condition={type === "note"}>
        <ContextMenuItem
          right={<Shortcut parts={["c"]} />}
          onClick={onCopyNodeLink}
        >
          Copy Link
        </ContextMenuItem>
      </When>
      <ContextMenuSeparator />
      <ContextMenuItem onClick={onCreateSubdirectory}>
        New Folder
      </ContextMenuItem>
      <ContextMenuItem
        right={<Shortcut parts={["n"]} />}
        onClick={() => {
          onCreateNote();
        }}
      >
        New Note
      </ContextMenuItem>
    </ContextMenu>
  );
}
