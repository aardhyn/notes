import { styled } from "style/stitches.config";

const verticalAnchors = ["top", "bottom"] as const;
const horizontalAnchors = ["left", "right"] as const;
const anchor = [...verticalAnchors, ...horizontalAnchors] as const;
type Anchor = (typeof anchor)[number];
type VerticalAnchor = (typeof verticalAnchors)[number];
type HorizontalAnchor = (typeof horizontalAnchors)[number];

const FULL_LENGTH = "100%";

export function DragHandle({
  anchor,
  size,
  ...divProps
}: {
  anchor: Anchor;
  size: number;
}) {
  const css = {
    w: verticalAnchors.includes(anchor as VerticalAnchor) ? FULL_LENGTH : size,
    h: horizontalAnchors.includes(anchor as HorizontalAnchor)
      ? FULL_LENGTH
      : size,
  };
  return <Root css={css} anchor={anchor} {...divProps} />;
}

const VERTICAL_RESIZE = "ns-resize";
const HORIZONTAL_RESIZE = "ew-resize";

const Root = styled("div", {
  position: "absolute",
  touchAction: "none", // see https://use-gesture.netlify.app/docs/extras/#touch-action
  zIndex: 512,

  opacity: 0,
  transition: "opacity 200ms ease-in-out",

  "&:hover": {
    background: "$primary",
    opacity: 1,
  },

  variants: {
    anchor: {
      top: {
        top: 0,
        left: 0,
        right: 0,
        w: "100%",
        cursor: VERTICAL_RESIZE,
      },
      bottom: {
        bottom: 0,
        left: 0,
        right: 0,
        w: "100%",
        cursor: VERTICAL_RESIZE,
      },
      left: {
        left: 0,
        top: 0,
        bottom: 0,
        h: "100%",
        cursor: HORIZONTAL_RESIZE,
      },
      right: {
        right: 0,
        top: 0,
        bottom: 0,
        h: "100%",
        cursor: HORIZONTAL_RESIZE,
      },
    },
  },
});
