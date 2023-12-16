import { styled, useGlobalStyles } from "style/stitches.config";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";
import useTheme from "style/useTheme";

export default function Layout() {
  useGlobalStyles();
  const { theme } = useTheme();

  return (
    <Root className={`${theme}`}>
      <Sidebar />
      <Outlet />
    </Root>
  );
}

const Root = styled("div", {
  bg: "$background",
  c: "$text",

  minH: "100vh",
  minW: "100vw",
  h: "100vh",
  w: "100vw",
  maxH: "100vh",
  maxW: "100vw",

  d: "grid",
  gtc: "auto 1fr",

  scrollSnapAlign: "start",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
});
