import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled, CSS } from "style/stitches.config";
import { ComponentProps, ReactNode } from "react";

export function Dropdown({
  children,
  trigger,
  side = "bottom",
  ...props
}: {
  children: ReactNode;
  trigger: ReactNode;
  side?: DropdownMenu.DropdownMenuContentProps["side"];
} & React.ComponentProps<typeof DropdownMenu.Root>) {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenuContent side={side}>
        {children}
        <DropdownMenuArrow />
      </DropdownMenuContent>
    </DropdownMenu.Root>
  );
}

export function DropdownItem({
  children,
  right,
  ...props
}: { children: ReactNode; right?: ReactNode } & ComponentProps<
  typeof DropdownMenu.Item
>) {
  return (
    <DropdownMenuItemRoot {...props}>
      {children}
      {right && <RightSlot>{right}</RightSlot>}
    </DropdownMenuItemRoot>
  );
}

const DropdownMenuContent = styled(DropdownMenu.Content, {
  minW: 200,
  z: 1024,
  b: "1px $outline solid",
  background: "$background",
  r: 8,
  p: 4,
});

const DropdownMenuArrow = styled(DropdownMenu.Arrow, { fill: "$outline" });

const itemStyles: CSS = {
  all: "unset",
  lineHeight: 1,
  c: "$text",
  r: 4,
  d: "flex",
  items: "center",
  h: 24,
  p: 4,
  pos: "relative",
  pl: 25,
  userSelect: "none",
  cursor: "pointer",

  "&[data-disabled]": { c: "$text2", pointerEvents: "none" },
  "&[data-highlighted]": { bg: "$primaryTonal", color: "$onPrimaryTonal" },
};

const DropdownMenuItemRoot = styled(DropdownMenu.Item, itemStyles);

export const DropdownMenuLabel = styled(DropdownMenu.Label, {
  pl: 24,
  color: "$text2",
});

export const DropdownSeparator = styled(DropdownMenu.Separator, {
  h: 1,
  bg: "$outline",
  m: 4,
});

const RightSlot = styled("div", {
  ml: "auto",
  color: "$text2",

  "[data-disabled] &": { color: "$text3" },
});
