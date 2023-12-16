import { styled } from "style/stitches.config";
import {
  MIN_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  DEFAULT_SIDE_BAR_WIDTH,
} from "./constants";
import { useDragPanePrimitive } from "component/DragPane/useDragPanePrimitive";
import DragHandle from "component/DragPane/DragHandle";

export function Sidebar() {
  const { bind, rangeConstraint, css, size } = useDragPanePrimitive(
    "left-sidebar",
    "right",
    {
      minSize: MIN_SIDEBAR_WIDTH,
      maxSize: MAX_SIDEBAR_WIDTH,
      defaultSize: DEFAULT_SIDE_BAR_WIDTH,
    }
  );

  return (
    <Root
      id="left-sidebar"
      css={{
        w: "90vw",
        "@sm": { w: size },

        ...css,
        ...rangeConstraint,
      }}
    >
      <Head>
        <h2>📝 Notes</h2>
      </Head>
      <DragHandle {...bind()} size={6} anchor="right" />
    </Root>
  );
}

const Root = styled("div", {
  br: "1px solid $outline",
  bg: "$background2",
});
const Head = styled("div", {
  p: 8,
  bb: "1px solid $outline",
});
