import { styled } from "style/stitches.config";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../sidebar";
import { hideScrollbar } from "style/util";
import { OpenSidebar } from "../OpenSidebar";
import { useShortcut } from "api/shortcut";
import { useTreeStore } from "route/sidebar/store";
import { useNoteParams } from "./note/params";
import { usePaneManager } from "route/usePaneManager";

export default function NotesLayout() {
  const { noteKey } = useNoteParams({ noexcept: true });
  const { select, deselect } = useTreeStore();
  const { selectSidebar, selectPane, activeSidebar } = usePaneManager();
  const handleSelectSidebar = () => {
    if (activeSidebar) {
      // select the active note
      deselect();
      selectPane(noteKey);
    } else {
      // select the active note in the sidebar
      selectSidebar();
      select(noteKey);
    }
  };
  useShortcut(handleSelectSidebar, "s", { modifiers: ["Control"] });

  return (
    <Root>
      <Sidebar />
      <Main>
        <OpenSidebar showFrom="sm" />
        <Outlet />
      </Main>
    </Root>
  );
}

const Root = styled("div", {
  d: "grid",
  gtc: "auto 1fr",

  w: "100%",
  h: "100%",

  overflowX: "auto",
  scrollSnapType: "x mandatory",
  scrollBehavior: "smooth",
  "&>*": { scrollSnapAlign: "start" },

  ...hideScrollbar,
});
const Main = styled("section", {
  pos: "relative",
  w: "100vw",
  "@sm": { w: "100%" },
});
