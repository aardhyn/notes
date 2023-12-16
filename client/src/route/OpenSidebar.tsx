import { styled } from "style/stitches.config";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

export function OpenSidebar({ showFrom }: { showFrom: Breakpoint }) {
  const handleClick = () => {
    const sidebar = document.getElementById("left-sidebar");
    sidebar?.scrollIntoView();
  };

  return (
    <Root
      onClick={handleClick}
      css={{
        [`@${showFrom}`]: { display: "none" },
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="#fff"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M4 18h4V6H4v12zm6-12v12h10V6H10z" />
      </svg>
    </Root>
  );
}
const Root = styled("button", {
  all: "unset",
  pos: "absolute",
  backgroundColor: "$background2",
  w: 48,
  d: "flex",
  items: "center",
  justify: "center",
  aspectRatio: 1,
  r: 100,
  top: 8,
  left: 8,
});
