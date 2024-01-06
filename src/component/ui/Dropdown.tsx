import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { styled, CSS } from "style/stitches.config";
import { ComponentProps, ReactNode } from "react";

export function Dropdown({
  children,
  trigger,
  ...props
}: {
  children: ReactNode;
  trigger: ReactNode;
} & React.ComponentProps<typeof DropdownMenu.Root>) {
  return (
    <DropdownMenu.Root {...props}>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      {/* <DropdownMenu.Portal> */}
      <DropdownMenuContent>
        {children}
        <DropdownMenuArrow />
      </DropdownMenuContent>
      {/* </DropdownMenu.Portal> */}
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

// const contentStyles = {
// };

const DropdownMenuContent = styled(DropdownMenu.Content, {
  minW: 200,
  z: 1024,
  b: "1px $outline solid",
  background: "$background",
  r: 8,
  p: 4,
});
// export const DropdownMenuSubContent = styled(
//   DropdownMenu.SubContent,
//   contentStyles
// );

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
// const DropdownMenuCheckboxItem = styled(DropdownMenu.CheckboxItem, itemStyles);
// const DropdownMenuRadioItem = styled(DropdownMenu.RadioItem, itemStyles);
// const DropdownMenuSubTrigger = styled(DropdownMenu.SubTrigger, {
//   '&[data-state="open"]': {
//     backgroundColor: violet.violet4,
//     color: violet.violet11,
//   },
//   ...itemStyles,
// });

export const DropdownMenuLabel = styled(DropdownMenu.Label, {
  pl: 24,
  color: "$text2",
});

export const DropdownMenuSeparator = styled(DropdownMenu.Separator, {
  h: 1,
  bg: "$outline",
  m: 4,
});

// const DropdownMenuItemIndicator = styled(DropdownMenu.ItemIndicator, {
//   position: "absolute",
//   left: 0,
//   width: 25,
//   display: "inline-flex",
//   alignItems: "center",
//   justifyContent: "center",
// });

const RightSlot = styled("div", {
  ml: "auto",
  color: "$text2",

  "[data-disabled] &": { color: "$text3" },
});
