import { keyframes, styled } from "style/stitches.config";
import { Spinner } from "./Spinner";

export function LoadingShim() {
  return (
    <Root>
      <Spinner />
    </Root>
  );
}

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

const Root = styled("div", {
  animation: `${fadeIn} 500ms ease-in-out forwards`,
  w: "100%",
  h: "100%",
  flex: 1,
  d: "flex",
  items: "center",
  justify: "center",
});
