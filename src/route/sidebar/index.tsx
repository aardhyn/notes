import { styled } from "style/stitches.config";
import {
  MIN_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  DEFAULT_SIDEBAR_WIDTH,
  SIDEBAR_WIDTH_KEY,
} from "./constants";
import { useDragPanePrimitive } from "component/DragPane/useDragPanePrimitive";
import DragHandle from "component/DragPane/DragHandle";
import { NoteTree } from "./Tree";
import { signOut } from "api/user";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "component/ui/Button";
import { ExitIcon } from "@radix-ui/react-icons";
import { usePaneManager } from "route/usePaneManager";

export function Sidebar() {
  const { bind, rangeConstraint, css, size } = useDragPanePrimitive(
    SIDEBAR_WIDTH_KEY,
    "right",
    {
      minSize: MIN_SIDEBAR_WIDTH,
      maxSize: MAX_SIDEBAR_WIDTH,
      defaultSize: DEFAULT_SIDEBAR_WIDTH,
    }
  );

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  const { activeSidebar } = usePaneManager();

  return (
    <Root
      id="left-sidebar"
      css={{
        w: "90vw",
        "@sm": { w: size },

        ...css,
        ...rangeConstraint,
      }}
      active={activeSidebar}
    >
      <Head>
        <Title to="/">📝 Notes</Title>
      </Head>
      <NoteTree width={size} />
      <Footer>
        <Button
          leadingIcon={<ExitIcon />}
          color="neutral"
          expand
          onClick={handleSignOut}
        >
          Sign out
        </Button>
      </Footer>
      <DragHandle {...bind()} size={6} anchor="right" />
    </Root>
  );
}
const Root = styled("aside", {
  br: "1px solid $outline",
  bg: "$background2",
  d: "flex",
  direction: "column",

  variants: {
    active: {
      true: { bt: "2px solid $outline" },
      false: { bt: "2px solid $background2" },
    },
  },

  defaultVariants: {
    active: false,
  },
});

const Head = styled("section", { p: 8 });
const Title = styled(Link, {
  fontSize: 24,
  fontWeight: 700,
});
const Footer = styled("section", {
  d: "flex",
  p: 8,
});
