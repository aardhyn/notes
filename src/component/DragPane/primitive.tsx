import { CSSProperties, useState } from "react";
import { CSS } from "style/stitches.config";
import { useDrag } from "@use-gesture/react";
import { usePersistent } from "api";
import { clamp } from "utility";

const DEFAULT_MIN_SIZE = 0;
const DEFAULT_SIZE = DEFAULT_MIN_SIZE;
const DEFAULT_MAX_SIZE = Infinity;

type Options = {
  minSize?: number;
  maxSize?: number;
  defaultSize?: number;
};
const DEFAULT_OPTIONS: Options = {};

export type Direction = "left" | "right" | "up" | "down";
export type Axis = "horizontal" | "vertical";

/**
 * ### `useDragPanePrimitive()`
 * Hook into the state and backend logic for a draggable pane
 * @param key Provide a **unique** and **immutable** key to reference the pane
 * @param expandDir drag direction that should expand the pane (left or right)
 * @param options options for the pane (minWidth, maxWidth)
 * @example
 * ...
 * const { bind, width, rangeConstraint } = useDraggablePane(SidebarWidthAtom);
 * ...
 * <Sidebar style={{ width, ...rangeConstraint }}>
 *   <DragHandle {...bind()} />
 *   ...
 * </Sidebar>
 */
export function useDragPanePrimitive(
  key: string,
  expandDir: Direction,
  {
    minSize = DEFAULT_MIN_SIZE,
    maxSize = DEFAULT_MAX_SIZE,
    defaultSize = DEFAULT_SIZE,
  }: Options = DEFAULT_OPTIONS
) {
  const [dragging, setDragging] = useState(false);
  const [size, setSize] = usePersistent(key, defaultSize);
  const [delta, setDelta] = useState(0);

  const horizontal = getAxis(expandDir) === "horizontal";
  const rangeConstraint: CSSProperties = horizontal
    ? { minWidth: minSize, maxWidth: maxSize } // apply min/max width
    : { minHeight: minSize, maxHeight: maxSize }; // apply min/max height

  const bind = useDrag(({ movement: [deltaX, deltaY], dragging }) => {
    setDragging(!!dragging);

    const dt = horizontal ? deltaX : deltaY;
    const appliedDt = applyDt(dt, expandDir);

    if (dragging) setDelta(appliedDt);
    else {
      const newWidth = clamp(size + appliedDt, minSize, maxSize);
      setSize(newWidth);
      setDelta(0);
    }
  }, {});

  return {
    /**
     * width of the pane
     * @example <Pane css={{ width }}> ... </Pane>
     */
    size: size + delta,
    /**
     * Spread into the drag handle for gestures
     * @example <DragHandle {...bind()} />
     */
    bind,
    /**
     * Necessary css for the pane to be draggable
     */
    css: {
      pos: "relative",
    } as CSS,
    /**
     * store dragging state
     * @example if (dragging) doSomthingWhileDrag()
     */
    isDragging: dragging,
    /**
     * CSS to constrain a DOM element to `minWidth` <=> `maxWidth`
     * @example <Pane css={{ ...rangeConstraint }}> ... </Pane>
     */
    rangeConstraint,
  };
}

function getAxis(direction: Direction): Axis {
  return direction === "left" || direction === "right"
    ? "horizontal"
    : "vertical";
}

function applyDt(delta: number, direction: Direction) {
  return direction === "right" || direction === "down" ? delta : -delta;
}
