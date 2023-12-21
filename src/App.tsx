import { ApiProvider } from "provider/ApiProvider";
import { AuthProvider } from "provider/AuthProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "route/routes";
import { styled, useGlobalStyles } from "style/stitches.config";
import useTheme from "style/useTheme";

export function App() {
  const { theme } = useTheme();

  useGlobalStyles();

  return (
    <Root className={`${theme}`}>
      <AuthProvider>
        <ApiProvider>
          <RouterProvider router={router} />
        </ApiProvider>
      </AuthProvider>
    </Root>
  );
}

const Root = styled("div", {
  minH: "100vh",
  minW: "100vw",
  w: "100vw",
  h: "100vh",
  maxW: "100vw",
  maxH: "100vh",

  background: "$background",
  color: "$text",
  fontFamily: "$main",
});
