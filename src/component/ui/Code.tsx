import { styled } from "style/stitches.config";

export const Code = styled("code", {
  d: "inline",
  bg: "$background2",
  px: 4,
  py: 2,
  r: 4,
  fontSize: 14,
  fontFamily: "$mono",

  variants: {
    block: { true: { d: "block" } },
  },

  defaultVariants: {
    block: false,
  },
});
