import { useQuery } from "@tanstack/react-query";
import { SimpleDirectory, listDirectories } from "./directory";
import { SimpleNote, listNotes } from "./note";

// utilities //

function isRootDirectory(directory: SimpleDirectory) {
  return !directory.parent_key;
}
function isRootNote(note: SimpleNote) {
  return !note.directory_key;
}
function subDirectoryOf(parent: SimpleDirectory) {
  return (child: SimpleDirectory) => child.parent_key === parent.directory_key;
}
function childOf(parent: SimpleDirectory) {
  return (child: SimpleNote) => child.directory_key === parent.directory_key;
}

type DirectoryNode = { type: "directory"; children: TreeNode[] } & Pick<
  SimpleDirectory,
  "name"
>;
type NoteNode = { type: "note" } & Pick<SimpleNote, "name">;
export type TreeNode = { key: string } & (DirectoryNode | NoteNode);
function toNoteNode(note: SimpleNote): TreeNode {
  return { key: note.note_key, name: note.name, type: "note" };
}

export type Named = { name: string };
function alphabetically(a: Named, b: Named) {
  const aName = a.name;
  const bName = b.name;
  return aName.localeCompare(bName);
}

// tree //

function createTreeBuilder(
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
      key: root.directory_key,
      name: root.name,
      children: sortedSubTrees,
    };
    return node;
  };

  return buildTree;
}

// api //

const KEY = ["tree"];

async function noteTree() {
  // fetch notes
  const directories = await listDirectories();
  const notes = await listNotes();

  // create builder
  const buildTree = createTreeBuilder(notes, directories);

  // get roots
  const rootDirectories = directories.filter(isRootDirectory);
  const rootNotes = notes.filter(isRootNote).map(toNoteNode);

  // build tree
  const tree = [...rootDirectories.map(buildTree), ...rootNotes];
  return tree;
}

export function useNoteTreeQuery() {
  return useQuery({ queryKey: KEY, queryFn: noteTree });
}
