import { ComponentProps, ReactNode } from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { styled, CSS } from "style/stitches.config";

export function ContextMenu({
  children,
  trigger,
  ...props
}: {
  children: ReactNode;
  trigger: ReactNode;
} & ComponentProps<typeof ContextMenuPrimitive.Root>) {
  return (
    <ContextMenuRoot {...props}>
      <ContextMenuTrigger>{trigger}</ContextMenuTrigger>
      <ContextMenuContent>{children}</ContextMenuContent>
    </ContextMenuRoot>
  );
}
const ContextMenuRoot = styled(ContextMenuPrimitive.Root);
// const ContextMenuPortal = styled(ContextMenuPrimitive.Portal);
const ContextMenuTrigger = styled(ContextMenuPrimitive.Trigger);

export function ContextMenuItem({
  children,
  right,
  ...props
}: {
  children: ReactNode;
  right?: ReactNode;
} & ComponentProps<typeof ContextMenuPrimitive.Item>) {
  return (
    <ContextMenuItemRoot {...props}>
      {children}
      {right && <RightSlot>{right}</RightSlot>}
    </ContextMenuItemRoot>
  );
}

const ContextMenuContent = styled(ContextMenuPrimitive.Content, {
  minW: 200,
  z: 1024,
  b: "1px $outline solid",
  background: "$background",
  r: 8,
  p: 4,
});

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
const ContextMenuItemRoot = styled(ContextMenuPrimitive.Item, itemStyles);

export const ContextMenuLabel = styled(ContextMenuPrimitive.Label, {
  pl: 24,
  color: "$text2",
});

export const ContextMenuSeparator = styled(ContextMenuPrimitive.Separator, {
  h: 1,
  bg: "$outline",
  m: 4,
});

const RightSlot = styled("div", {
  ml: "auto",
  color: "$text2",

  "[data-disabled] &": { color: "$text3" },
});
