import { styled, useGlobalStyles } from "style/stitches.config";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import useTheme from "style/useTheme";
import { hideScrollbar } from "style/util";
import { OpenSidebar } from "./OpenSidebar";

export default function Layout() {
  useGlobalStyles();
  const { theme } = useTheme();

  return (
    <Root className={`${theme}`}>
      <Sidebar />
      <Main>
        <OpenSidebar showFrom="sm" />
        <Outlet />
      </Main>
    </Root>
  );
}

const Root = styled("div", {
  d: "grid",
  gtc: "auto 1fr",

  maxH: "100vh",
  maxW: "100vw",
  minH: "100vh",
  minW: "100vw",

  overflowX: "auto",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  "&>*": { scrollSnapAlign: "start" },

  bg: "$background",
  c: "$text",

  ...hideScrollbar,
});
const Main = styled("section", {
  pos: "relative",
  w: "100vw",
  "@sm": { w: "100%" },
});
