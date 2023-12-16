import {
  createStitches,
  CSS as StitchesCSS,
  CSSProperties as CssProp,
  createTheme,
} from "@stitches/react";
import { fonts } from "./font";

const DEFAULT_FONT = "Inter";
const BACKUP_FONTS = `
  system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,  Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
`;

export const lightTheme = createTheme("light", {
  colors: {
    light: "#fff",
    dark: "#24292e",

    text: "#24292e",
    text2: "#6a737c",
    text3: "#959da5",
    text4: "#d1d5da",

    primary: "#117dff",
    primary2: "#0f69d5",
    onPrimary: "#fff",

    tonal: "#cfe4fc",
    tonal2: "#cfe4fc",
    outline: "#d0d7de",
    outline2: "#e6edf5",

    background: "#fff",
    background2: "#f6f8fa",
    background3: "#e1e4e8",
    background4: "#d1d5da",

    error: "#f2e1e3",
    onError: "#e35557",

    blue: "#DFE7FF",
    onBlue: "#0646FE",
    blueTonal: "#7496F5",

    green: "#B0FFD9",
    onGreen: "#00891e",
    greenTonal: "#4FD67D",

    lime: "#D5FF9F",
    onLime: "#3B520A",
    limeTonal: "#B3D64F",

    orange: "#ffe3d7",
    onOrange: "#6D400A",
    orangeTonal: "#FCA86B",

    purple: "#efdbff",
    onPurple: "#6B33B3",
    purpleTonal: "#C57CFF",

    yellow: "#FFEFB4",
    onYellow: "#876900",
    yellowTonal: "#FBD13A",

    cyan: "#BBFBFF",
    onCyan: "#004E52",
    cyanTonal: "#04D9D9",

    violet: "#E6DEFF",
    onViolet: "#4F35BA",
    violetTonal: "#A9A2FC",
  },
});
export const darkTheme = createTheme("dark", {
  colors: {
    light: "#fff",
    dark: "#12141a",

    text: "#fff",
    text2: "#c6cbd1",
    text3: "#959da5",
    text4: "#6a737d",

    primary: "#117dff",
    primary2: "#0f69d5",
    onPrimary: "#fff",

    tonal: "#cfe4fc",
    tonal2: "#fff",

    outline: "#505961",
    outline2: "#3c434a",

    background: "#24292e",
    background2: "#1f2428",
    background3: "#2f363d",
    background4: "#3f4448",

    error: "#392d33",
    onError: "#f85c58",

    blue: "#142046",
    onBlue: "#D9E3FF",
    blueTonal: "#3257BE",

    green: "#0B3520",
    onGreen: "#B3FFC4",
    greenTonal: "#339955",

    lime: "#313B25",
    onLime: "#DEFF97",
    limeTonal: "#87A62F",

    orange: "#432102",
    onOrange: "#FFD4A2",
    orangeTonal: "#A54A2D",

    purple: "#2A154D",
    onPurple: "#E793FC",
    purpleTonal: "#9C40E5",

    yellow: "#382D05",
    onYellow: "#FFEAA1",
    yellowTonal: "#A7891D",

    cyan: "#223B3C",
    onCyan: "#B9FBFF",
    cyanTonal: "#5B8F8F",

    violet: "#1A173F",
    onViolet: "#ECDEFF",
    violetTonal: "#5A2CDD",
  },
});

const config = createStitches({
  media: {
    // from `Tailwind`
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    xxl: "(min-width: 1536px)",
  },
  theme: {
    colors: {},
    fonts: { main: `${DEFAULT_FONT}, ${BACKUP_FONTS}` },
    fontWeights: {
      normal: 500,
      bold: 900,
    },
    fontSizes: {
      0: ".6rem",
      1: ".8rem",
      2: "1rem", // regular
      3: "1.5rem",
      4: "2.0",
    },
  },
  utils: {
    // Layout

    d: (display: CssProp["display"]) => ({ display }),
    fd: (flexDirection: CssProp["flexDirection"]) => ({ flexDirection }),
    pos: (position: CssProp["position"]) => ({ position }),
    justify: (justifyContent: CssProp["justifyContent"]) => ({
      justifyContent,
    }),
    items: (alignItems: CssProp["alignItems"]) => ({ alignItems }),
    direction: (flexDirection: CssProp["flexDirection"]) => ({
      flexDirection,
    }),

    g: (gap: CssProp["gap"]) => ({ gap }),

    gtc: (gridTemplateColumns: CssProp["gridTemplateColumns"]) => ({
      gridTemplateColumns,
    }),

    z: (zIndex: CssProp["zIndex"]) => ({ zIndex }),

    m: (margin: CssProp["margin"]) => ({ margin }),
    mt: (marginTop: CssProp["marginTop"]) => ({ marginTop }),
    mb: (marginBottom: CssProp["marginBottom"]) => ({ marginBottom }),
    ml: (marginLeft: CssProp["marginLeft"]) => ({ marginLeft }),
    mr: (marginRight: CssProp["marginRight"]) => ({ marginRight }),
    my: (marginY: CssProp["margin"]) => ({
      marginTop: marginY,
      marginBottom: marginY,
    }),
    mx: (marginX: CssProp["margin"]) => ({
      marginLeft: marginX,
      marginRight: marginX,
    }),

    p: (padding: CssProp["padding"]) => ({ padding }),
    pt: (paddingTop: CssProp["paddingTop"]) => ({ paddingTop }),
    pb: (paddingBottom: CssProp["paddingBottom"]) => ({ paddingBottom }),
    pl: (paddingLeft: CssProp["paddingLeft"]) => ({ paddingLeft }),
    pr: (paddingRight: CssProp["paddingRight"]) => ({ paddingRight }),
    py: (paddingY: CssProp["padding"]) => ({
      paddingTop: paddingY,
      paddingBottom: paddingY,
    }),
    px: (paddingX: CssProp["padding"]) => ({
      paddingLeft: paddingX,
      paddingRight: paddingX,
    }),

    // Dimensions

    w: (width: CssProp["width"]) => ({ width }),
    h: (height: CssProp["height"]) => ({ height }),
    minW: (minWidth: CssProp["minWidth"]) => ({ minWidth }),
    minH: (minHeight: CssProp["minHeight"]) => ({ minHeight }),
    maxW: (maxWidth: CssProp["maxWidth"]) => ({ maxWidth }),
    maxH: (maxHeight: CssProp["maxHeight"]) => ({ maxHeight }),

    // Style

    bg: (backgroundColor: CssProp["backgroundColor"]) => ({
      backgroundColor,
    }),
    c: (color: CssProp["color"]) => ({ color }),
    o: (opacity: CssProp["opacity"]) => ({ opacity }),

    // Border

    r: (borderRadius: CssProp["borderRadius"]) => ({ borderRadius }),
    b: (border: CssProp["border"]) => ({ border }),
    bt: (borderTop: CssProp["borderTop"]) => ({ borderTop }),
    bb: (borderBottom: CssProp["borderBottom"]) => ({ borderBottom }),
    bl: (borderLeft: CssProp["borderLeft"]) => ({ borderLeft }),
    br: (borderRight: CssProp["borderRight"]) => ({ borderRight }),
    out: (outline: CssProp["outline"]) => ({ outline }),

    // Shadow

    bs: (boxShadow: CssProp["boxShadow"]) => ({ boxShadow }),
  },
});

export const { styled, css, keyframes, globalCss } = config;

const globalStyles = globalCss({
  "*": {
    boxSizing: "border-box",
    m: 0,
    p: 0,
  },
  //@ts-expect-error type errors
  "@font-face": fonts,
  body: {
    color: "$text",
    lineHeight: 1.5,
    "-webkit-text-size-adjust": "100%",
    fontFamily: `$main`,
    fontSize: 14,
  },
});

export function useGlobalStyles() {
  globalStyles();
}

export type CSS = StitchesCSS<typeof config>;

export const s = {
  a: styled("a"),
  audio: styled("audio"),
  aside: styled("aside"),
  button: styled("button"),
  b: styled("b"),
  canvas: styled("canvas"),
  caption: styled("caption"),
  code: styled("code"),
  div: styled("div"),
  form: styled("form"),
  h1: styled("h1"),
  h2: styled("h2"),
  h3: styled("h3"),
  h4: styled("h4"),
  h5: styled("h5"),
  h6: styled("h6"),
  img: styled("img"),
  input: styled("input"),
  label: styled("label"),
  li: styled("li"),
  ol: styled("ol"),
  option: styled("option"),
  p: styled("p"),
  pre: styled("pre"),
  section: styled("section"),
  select: styled("select"),
  span: styled("span"),
  sup: styled("sup"),
  sub: styled("sub"),
  table: styled("table"),
  tbody: styled("tbody"),
  td: styled("td"),
  textarea: styled("textarea"),
  tfoot: styled("tfoot"),
  th: styled("th"),
  thead: styled("thead"),
  tr: styled("tr"),
  ul: styled("ul"),
} as const;
