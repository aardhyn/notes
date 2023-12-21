import { styled } from "style/stitches.config";
import {
  MIN_SIDEBAR_WIDTH,
  MAX_SIDEBAR_WIDTH,
  DEFAULT_SIDE_BAR_WIDTH,
} from "./constants";
import { useDragPanePrimitive } from "component/DragPane/useDragPanePrimitive";
import DragHandle from "component/DragPane/DragHandle";
import { NoteTree } from "./NoteTree";
import { signOut } from "api/user";
import { useNavigate } from "react-router-dom";
import { Button, IconButton } from "component/ui/Button";
import { CheckIcon, ExitIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { useState } from "react";

export function Sidebar() {
  const { bind, rangeConstraint, css, size } = useDragPanePrimitive(
    "left-sidebar",
    "right",
    {
      minSize: MIN_SIDEBAR_WIDTH,
      maxSize: MAX_SIDEBAR_WIDTH,
      defaultSize: DEFAULT_SIDE_BAR_WIDTH,
    }
  );

  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut();
    navigate("/sign-in");
  };

  const [editing, setEditing] = useState(false);

  return (
    <Root
      id="left-sidebar"
      css={{
        w: "90vw",
        "@sm": { w: size },

        ...css,
        ...rangeConstraint,
      }}
    >
      <Head>
        <h2>📝 Notes</h2>
        <IconButton
          onClick={() => setEditing(!editing)}
          css={{ ml: 8 }}
          color={editing ? "primary" : "neutral"}
        >
          {editing ? <CheckIcon /> : <Pencil1Icon />}
        </IconButton>
      </Head>
      <NoteTree editing={editing} />
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
});
const Head = styled("section", {
  p: 8,
  d: "flex",
  items: "center",
  justify: "space-between",
  // bb: "1px solid $outline",
});
const Footer = styled("section", {
  d: "flex",
  p: 8,
  // bt: "1px solid $outline",
});
