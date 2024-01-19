import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

// type PaneType = "horizontal_split" | "vertical_split" | "note";
// type Pane = {
//   id: string;
//   title: string;
//   type: PaneType;
//   children: Pane[];
// };

type State = {
  panes: Set<string>;
  activeSidebar: boolean;
  activePane: string | null;
  sidebarOpen: boolean;
};
type Actions = {
  selectPane: (pane: string) => void;
  selectSidebar: () => void;
  addPane: (pane: string, select: boolean) => void;
  removePane: (pane: string, fallbackSelection: string | null) => void;

  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
};
type Store = State & Actions;

const STORE_NAME = "pane-store";
const DEFAULT_SIDEBAR_OPEN = true;

const INITIAL_STATE: State = {
  panes: new Set(),
  activeSidebar: false,
  activePane: null,
  sidebarOpen: DEFAULT_SIDEBAR_OPEN,
};

/**
 * Manages the state of the editor panes and sidebar.
 */
const usePaneStore = create<Store>()(
  persist(
    immer((set) => ({
      ...INITIAL_STATE,

      selectPane(pane) {
        set((state) => {
          state.activeSidebar = false;
          state.activePane = pane;
        });
      },
      selectSidebar() {
        set((state) => {
          state.activePane = null;
          state.activeSidebar = true;
        });
      },

      addPane(pane, select = false) {
        set((state) => {
          state.panes.add(pane);
          if (select) {
            state.selectPane(pane);
          }
        });
      },
      removePane(pane, fallbackSelection = null) {
        set((state) => {
          state.panes.delete(pane);
          // todo: add sidebar selection fallback
          if (state.activePane === pane && fallbackSelection !== null) {
            state.selectPane(fallbackSelection);
          }
        });
      },

      openSidebar() {
        set((state) => {
          state.sidebarOpen = true;
        });
      },
      closeSidebar() {
        set((state) => {
          state.sidebarOpen = false;
        });
      },
      toggleSidebar() {
        set((state) => {
          state.sidebarOpen = !state.sidebarOpen;
        });
      },
    })),
    { name: STORE_NAME }
  )
);

type PaneManagerProps = {
  onSidebarOpenChange?: (open: boolean) => void;
  onActivePaneChange?: (pane: string | null) => void;
  onActiveSidebarChange?: (active: boolean) => void;
};
/**
 * Hooks editor pane and sidebar state management into a component.
 * @param onSidebarOpenChange Called when the sidebar is opened or closed.
 * @param onActivePaneChange Called when the active pane changes.
 * @param onActiveSidebarChange Called when the sidebar is selected/deselected
 * @returns The pane manager state and actions with callbacks injected.
 */
export function usePaneManager({
  onSidebarOpenChange,
  onActiveSidebarChange,
  onActivePaneChange,
}: PaneManagerProps = {}) {
  const store = usePaneStore();
  const overrides: Partial<Actions> = {
    openSidebar() {
      store.openSidebar();
      onSidebarOpenChange?.(true);
    },
    closeSidebar() {
      store.closeSidebar();
      onSidebarOpenChange?.(false);
    },
    toggleSidebar() {
      store.toggleSidebar();
      onSidebarOpenChange?.(store.sidebarOpen);
    },

    addPane(pane, select = false) {
      store.addPane(pane, select);
      if (select) {
        onActivePaneChange?.(pane);
      }
    },
    removePane(pane, fallbackSelection = null) {
      store.removePane(pane, fallbackSelection);
      if (pane === store.activePane && fallbackSelection) {
        onActivePaneChange?.(fallbackSelection);
      }
    },

    selectPane(pane) {
      store.selectPane(pane);
      onActivePaneChange?.(store.activePane);
    },
    selectSidebar() {
      store.selectSidebar();
      onActiveSidebarChange?.(store.activeSidebar);
    },
  };

  return { ...store, ...overrides };
}
