import { VariantProps } from "@stitches/react";
import { styled } from "style/stitches.config";

const sizes = { ty: 8, sm: 16, md: 64, lg: 128, xl: 512, flex: 1 };
type Size = keyof typeof sizes;

type SpacerProps = { size?: Size } & VariantProps<typeof Root>;
const DEFAULT_SIZE = "sm";
const DEFAULT_DIRECTION = "horizontal";
const DEFAULT_GREEDY = false;

const GREED = 1; // Spacer greed: quantified!

export default function Spacer({
  size = DEFAULT_SIZE,
  direction = DEFAULT_DIRECTION,
  greedy = DEFAULT_GREEDY,
}: SpacerProps) {
  const axis = direction === "horizontal" ? "h" : "s";
  const sizeLiteral = typeof size === "number" ? size : sizes[size];

  return (
    <Root
      direction={direction}
      css={{
        [axis]: greedy ? undefined : sizeLiteral,
        flex: greedy ? GREED : undefined,
      }}
    />
  );
}

const Root = styled("div", {
  variants: {
    direction: {
      horizontal: { w: "100%" },
      vertical: { h: "100%" },
    },
    greedy: { true: { flex: 1 } },
  },

  defaultVariants: { direction: "horizontal" },
});
