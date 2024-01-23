import { SimpleDirectory } from "api/directory";
import { SimpleNote } from "api/note";
import { invariant } from "exception/invariant";

export type NodeType = "directory" | "note";

export function isRootDirectory(directory: SimpleDirectory) {
  return !directory.parent_key;
}
export function isRootNote(note: SimpleNote) {
  return !note.directory_key;
}
export function subDirectoryOf(parent: SimpleDirectory) {
  return (child: SimpleDirectory) => child.parent_key === parent.directory_key;
}
export function childOf(parent: SimpleDirectory) {
  return (child: SimpleNote) => child.directory_key === parent.directory_key;
}

type BaseNode = { name: string; key: string; parentKey: string | null };
export type DirectoryNode = BaseNode & {
  type: "directory";
  children: TreeNode[];
};
export type NoteNode = BaseNode & { type: "note" };
export type TreeNode = DirectoryNode | NoteNode;

export function toNoteNode(note: SimpleNote): TreeNode {
  return {
    key: note.note_key,
    name: note.name,
    type: "note",
    parentKey: note.directory_key,
  };
}

export type Named = { name: string };
function alphabetically(a: Named, b: Named) {
  return a.name.localeCompare(b.name);
}

// tree //

export function createTreeBuilder(
  notes: SimpleNote[],
  directories: SimpleDirectory[]
) {
  const buildTree = (root: SimpleDirectory): TreeNode => {
    // filter children
    const subdirectories = directories.filter(subDirectoryOf(root));
    const childNotes = notes.filter(childOf(root)).map(toNoteNode);

    // build subtrees
    const subTrees = subdirectories.map(buildTree);

    // sort children
    const children = [...subTrees, ...childNotes];
    const sortedSubTrees = children.sort(alphabetically);

    // build node
    const node: TreeNode = {
      type: "directory",
      parentKey: root.parent_key,
      key: root.directory_key,
      name: root.name,
      children: sortedSubTrees,
    };
    return node;
  };

  return buildTree;
}
export function forNode(
  tree: TreeNode[],
  fn: (node: TreeNode, siblings: TreeNode[]) => void
) {
  const walk = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      fn(node, nodes);
      if (node.type === "directory") {
        walk(node.children);
      }
    }
  };

  walk(tree);
}

export function mapNode<T>(
  tree: TreeNode[],
  fn: (node: TreeNode, siblings: TreeNode[]) => T
): T[] {
  const result: T[] = [];
  forNode(tree, (node, siblings) => {
    result.push(fn(node, siblings));
  });

  return result;
}

export function filterNode(tree: TreeNode[], fn: (node: TreeNode) => boolean) {
  const result: TreeNode[] = [];
  forNode(tree, (node) => {
    if (fn(node)) {
      result.push(node);
    }
  });
  return result;
}

const MAX_FIND_RESULTS = 1;
export function findNode(tree: TreeNode[], key: string) {
  const result = filterNode(tree, (node) => node.key === key);
  invariant(result.length <= MAX_FIND_RESULTS, "found multiple nodes");

  const [node] = result;
  return node ?? null;
}

export function getSiblings(tree: TreeNode[], key: string) {
  const parent = getParent(tree, key) ?? null; // get parent of key
  if (!parent) {
    return tree;
  }
  invariant(parent.type === "directory", "node has no parent");
  return parent.children;
}

export function getParent(tree: TreeNode[], key: string) {
  const node = findNode(tree, key);
  if (!node.parentKey) {
    return null;
  }
  const parent = findNode(tree, node.parentKey);
  return parent;
}

export function getChildren(tree: TreeNode[], key: string) {
  const node = findNode(tree, key);
  if (node.type === "note") {
    return [];
  }
  return node.children;
}
