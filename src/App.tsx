import { ApiProvider } from "provider/ApiProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "route/routes";
import { styled, useGlobalStyles } from "style/stitches.config";
import useTheme from "style/useTheme";

export function App() {
  const { theme } = useTheme();

  useGlobalStyles();

  return (
    <Root className={`${theme}`}>
      <ApiProvider>
        <RouterProvider router={router} />
      </ApiProvider>
    </Root>
  );
}

const Root = styled("div", {
  minH: "-webkit-fill-available", // for mobile safari
  minW: "100vw",
  w: "100vw",
  h: "100vh",
  maxW: "100vw",
  maxH: "100vh",

  overflow: "hidden",

  bg: "$background",
  c: "$text",
  fontFamily: "$main",
});
