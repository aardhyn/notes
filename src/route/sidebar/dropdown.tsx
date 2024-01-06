import { Separator } from "@radix-ui/react-dropdown-menu";
import { NodeType } from "api/tree";
import { When } from "component/When";
import {
  Dropdown,
  DropdownItem,
  DropdownSeparator,
} from "component/ui/Dropdown";
import { Shortcut } from "component/ui/Shortcut";
import { ReactNode } from "react";

export function NodeDropdown({
  children,
  type,
  open,
  onOpenChange,
  onRename,
  onDelete,
  onCreateSubdirectory,
  onCreateNote,
  onCopyNodeLink,
}: {
  children: ReactNode;
  type: NodeType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRename: () => void;
  onDelete: () => void;
  onCreateSubdirectory: () => void;
  onCreateNote: () => void;
  onCopyNodeLink: () => void;
}) {
  return (
    <Dropdown
      trigger={children}
      open={open}
      onOpenChange={onOpenChange}
      modal={false}
    >
      <DropdownItem
        right={<Shortcut parts={["d"]} />}
        onClick={() => {
          onOpenChange(false);
          onDelete();
        }}
      >
        Delete
      </DropdownItem>
      <DropdownItem
        right={<Shortcut parts={["space"]} />}
        onClick={() => {
          onOpenChange(false);
          onRename();
        }}
      >
        Rename
      </DropdownItem>
      <When condition={type === "note"}>
        <DropdownItem
          right={<Shortcut parts={["c"]} />}
          onClick={() => {
            onOpenChange(false);
            onCopyNodeLink();
          }}
        >
          Copy Link
        </DropdownItem>
      </When>
      <DropdownSeparator />
      <DropdownItem
        onClick={() => {
          onOpenChange(false);
          onCreateSubdirectory();
        }}
      >
        New Folder
      </DropdownItem>
      <DropdownItem
        right={<Shortcut parts={["n"]} />}
        onClick={() => {
          onOpenChange(false);
          onCreateNote();
        }}
      >
        New Note
      </DropdownItem>
    </Dropdown>
  );
}
