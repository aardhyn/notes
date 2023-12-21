import { ListBulletIcon } from "@radix-ui/react-icons";
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
      <ListBulletIcon />
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
