import {
  TreeNode,
  filterNode,
  findNode,
  getChildren,
  getParent,
  getSiblings,
} from "algorithm";
import { invariant } from "exception/invariant";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const DEFAULT_JUMP_DIRECTORIES = false;
type AdjacentSelectOptions = {
  jumpDirectories?: boolean;
};
const DEFAULT_COLLAPSE_CHILDREN = true;
type ParentSelectionOptions = {
  collapseChildren?: boolean;
};

type Selected = {
  node: TreeNode | null;
  siblings: TreeNode[];
  parent: TreeNode | null;
};

type State = {
  tree: TreeNode[];
  selected: Selected;
  expanded: string[];
};
type Actions = {
  load(nodes: TreeNode[]): void;

  select: (key: string) => void;
  deselect: () => void;
  selectNext(options?: AdjacentSelectOptions): void;
  selectPrevious(options?: AdjacentSelectOptions): void;
  selectChild(): void;
  selectParent(options?: ParentSelectionOptions): void;

  expand: (node: TreeNode) => void;
  collapse: (node: TreeNode) => void;
  toggleExpansion: (node: TreeNode) => void;

  isExpanded: (node: TreeNode) => boolean;
  isSelected: (node: TreeNode) => boolean;
};
type Store = State & Actions;

const INITIAL_SELECTED: Selected = {
  node: null,
  siblings: [],
  parent: null,
};
const INITIAL_STATE: State = {
  tree: [],
  selected: INITIAL_SELECTED,
  expanded: [],
};

const STORE_NAME = "tree-store";
export const useTreeStore = create<Store>()(
  persist(
    (set, get) => ({
      ...INITIAL_STATE,
      load(nodes) {
        set({ tree: nodes });

        // check expanded nodes are still in the tree
        const expanded = get().expanded.filter((id) => {
          return !!filterNode(nodes, (node) => node.key === id);
        });
        set({ expanded });

        // check selected node is still in the tree
        const { selected } = get();
        if (selected.node && !findNode(nodes, selected.node.key)) {
          set({ selected: INITIAL_SELECTED });
        }
      },

      select(key) {
        const { tree } = get();

        if (!key) {
          const [firstNode] = tree;
          get().select(firstNode.key);
        } else {
          if (key === get().selected.node?.key) {
            return; // already selected
          }

          const node = findNode(tree, key);
          const siblings = getSiblings(tree, key);
          const parent = node.parentKey ? getParent(tree, key) : null;
          const selected = { node, siblings, parent };

          // make sure the parent chain is expanded
          const expanded = expandParents(tree, node, get().expanded);

          set((state) => ({ ...state, selected, expanded }));
        }
      },
      deselect() {
        set((state) => ({
          ...state,
          selected: {
            node: null,
            siblings: [],
            parent: null,
          },
        }));
      },
      selectNext({ jumpDirectories = DEFAULT_JUMP_DIRECTORIES } = {}) {
        const { selected } = get();
        if (!selected.node) {
          return;
        }

        const hasChildren =
          selected.node.type === "directory" && selected.node.children.length;
        const isExpanded = get().isExpanded(selected.node);
        if (hasChildren && isExpanded && !jumpDirectories) {
          // select its first child instead
          get().selectChild();
        } else {
          // select next sibling
          const { siblings } = selected;
          const index = siblings.findIndex((n) => n.key === selected.node?.key);
          invariant(index !== -1, "selected node not found in siblings");

          const next = siblings[index + 1];
          if (!next) {
            if (selected.parent) {
              // select parent's next sibling
              get().selectParent({ collapseChildren: false });
              get().selectNext({ jumpDirectories: true });
            } else {
              // no parent, no next sibling
              return;
            }
          } else {
            // select next child
            set((state) => ({
              ...state,
              selected: {
                ...state.selected,
                node: next, // parent not changed, siblings not changed
              },
            }));
          }
        }
      },
      selectPrevious({ jumpDirectories = DEFAULT_JUMP_DIRECTORIES } = {}) {
        const { selected } = get();
        if (!selected.node) {
          return;
        }

        const { siblings } = selected;
        const index = siblings.findIndex((n) => n.key === selected.node?.key);
        invariant(index !== -1, "selected node not found in siblings");

        const previous = siblings[index - 1];
        const previousHasChildren =
          previous?.type === "directory" && previous.children.length;
        if (!previous) {
          if (selected.parent) {
            // select parent
            get().selectParent({ collapseChildren: false });
          } else {
            return; // no parent, no previous sibling
          }
        } else if (
          previousHasChildren &&
          get().isExpanded(previous) &&
          !jumpDirectories
        ) {
          const lastChild = previous.children.at(-1);
          invariant(lastChild, "previous node has no children");
          get().select(lastChild.key);
        } else {
          // select previous sibling
          set((state) => ({
            ...state,
            selected: {
              ...state.selected,
              node: previous, // parent not changed, siblings not changed
            },
          }));
        }
      },
      selectChild() {
        const { selected } = get();
        if (!selected.node) {
          return;
        }

        if (selected.node.type === "note") {
          return; // no children and can't expand
        }

        get().expand(selected.node);

        const { children } = selected.node;
        if (!children.length) {
          return;
        }

        const [firstChild] = children;

        set((state) => ({
          ...state,
          selected: {
            parent: selected.node, // previous selection now parent
            node: firstChild, // select first child
            siblings: children, // children are now siblings
          },
        }));
      },
      selectParent({ collapseChildren = DEFAULT_COLLAPSE_CHILDREN } = {}) {
        const { selected } = get();
        if (!selected.node) {
          return;
        }

        const isDirectory = selected.node.type === "directory";
        const isExpanded = isDirectory && get().isExpanded(selected.node);

        if (isExpanded && isDirectory && collapseChildren) {
          // collapse current node first
          get().collapse(selected.node);
        } else {
          // select parent
          const { parent } = selected;
          if (!parent) {
            return; // no parent
          }
          invariant(
            parent.type === "directory",
            "parent node must be a directory"
          );

          const { tree } = get();
          const siblings = parent.parentKey
            ? getChildren(tree, parent.parentKey)
            : tree;
          const parentParent = parent.parentKey
            ? findNode(tree, parent.parentKey)
            : null;

          set((state) => ({
            ...state,
            selected: {
              parent: parentParent, // parent's parent is parent
              node: parent, // parent is now selected
              siblings,
            },
          }));
        }
      },

      expand(node) {
        set((state) => ({ ...state, expanded: [...get().expanded, node.key] }));
      },
      collapse(node) {
        set((state) => ({
          ...state,
          expanded: get().expanded.filter((id) => id !== node.key),
        }));
      },
      toggleExpansion(node) {
        const { isExpanded, expand, collapse } = get();
        if (isExpanded(node)) {
          collapse(node);
        } else {
          expand(node);
        }
      },

      isExpanded(node) {
        return get().expanded.includes(node.key);
      },
      isSelected(node) {
        return get().selected.node?.key === node.key;
      },
    }),
    { name: STORE_NAME }
  )
);

function expandParents(
  tree: TreeNode[],
  node: TreeNode,
  expanded: string[] = []
) {
  if (!node.parentKey) {
    return expanded; // no parents, done
  }

  const parent = getParent(tree, node.key);
  invariant(parent, "parent node not found");

  if (!expanded.includes(parent.key)) {
    expanded.push(parent.key);
  }
  return expandParents(tree, parent, expanded);
}
