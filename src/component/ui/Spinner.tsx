import { keyframes, styled } from "style/stitches.config";

export function Spinner({
  size = 32,
  background = "$background2",
  color = "$text",
  speed = "600ms",
}: {
  size?: number;
  background?: string;
  color?: string;
  speed?: `${number}${"ms" | "s"}`;
}) {
  const b = 0.15 * size;
  return (
    <Root
      css={{
        w: size,
        h: size,
        r: "50%",
        b: `${b}px solid ${background}`,
        br: `${b}px solid ${color}`,
        animation: `${spin} ${speed} linear infinite`,
      }}
    />
  );
}

const spin = keyframes({
  from: { transform: "rotate(-90deg)" },
  to: { transform: "rotate(270deg)" },
});

const Root = styled("div", {});
