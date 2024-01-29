import { useQuery } from "@tanstack/react-query";
import { listDirectories } from "./directory";
import { listNotes } from "./note";
import {
  toNoteNode,
  createTreeBuilder,
  isRootDirectory,
  isRootNote,
  NoteNode,
} from "algorithm";

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

export function writeNodeLinkToClipboard({ key }: NoteNode) {
  const location = window.location.origin;
  const slug = (location.endsWith("/") ? "" : "/") + key;
  const url = location + slug;

  navigator.clipboard.writeText(url);
}
