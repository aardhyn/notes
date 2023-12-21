import { Spinner } from "component/ui/Spinner";
import { styled } from "style/stitches.config";

export function SaveIndicator({ saving }: { saving: boolean }) {
  return (
    <Root saving={saving}>
      <Spinner size={18} /> Saving
    </Root>
  );
}
const Root = styled("div", {
  r: 128,
  bg: "$background3",
  p: "6px 16px",
  h: 32,

  d: "flex",
  items: "center",
  justify: "center",
  gap: 7,

  pos: "absolute",
  zIndex: 1,
  top: 8,
  left: 8,

  variants: {
    saving: {
      true: { opacity: 1 },
      false: { opacity: 0, transition: "opacity 500ms ease-out" },
    },
  },
});
