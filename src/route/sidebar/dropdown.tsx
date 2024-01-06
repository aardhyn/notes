import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Dropdown, DropdownItem } from "component/ui/Dropdown";
import { Shortcut } from "component/ui/Shortcut";

export function NodeDropdown({
  open,
  onOpenChange,
  onRename,
  onDelete,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRename: () => void;
  onDelete: () => void;
}) {
  return (
    <Dropdown
      trigger={<DotsHorizontalIcon />}
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
    </Dropdown>
  );
}
