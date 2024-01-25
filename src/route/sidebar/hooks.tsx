import { useState } from "react";
import {
  useDirectoryCreateMutation,
  useDirectoryDeleteMutation,
  useDirectoryMutation,
  useNoteCreateMutation,
  useNoteDeleteMutation,
  useNoteMutation,
} from "api";
import { NodeType, TreeNode } from "algorithm";

/**
 * Hook node deletion into a component
 * @param node node to delete
 */
export function useNodeDelete(node: TreeNode) {
  const isDirectory = node.type === "directory";

  const { mutate: deleteNote } = useNoteDeleteMutation();
  const { mutate: deleteDirectory } = useDirectoryDeleteMutation();
  const handleDelete = () => {
    if (isDirectory && confirm(`Delete folder "${node.name}"?`)) {
      deleteDirectory(node.key);
    } else if (confirm(`Delete note "${node.name}"?`)) {
      deleteNote(node.key);
    }
  };

  return handleDelete;
}

/**
 * Hook node renaming into a component
 * @param node node to rename
 * @returns
 */
export function useNodeRename(node: TreeNode) {
  const isDirectory = node.type === "directory";

  const [name, setName] = useState(node.name);
  const { mutate: mutateNote } = useNoteMutation();
  const { mutate: mutateDirectory } = useDirectoryMutation();

  const rename = () => {
    if (name === node.name) {
      return; // no change
    }

    const processed = name; // processNoteName(name, usedNames);
    setName(processed);

    if (isDirectory) {
      mutateDirectory({ directory_key: node.key, name: processed });
    } else {
      mutateNote({ note_key: node.key, name: processed });
    }
  };

  return {
    name,
    setName,
    rename,
  };
}

type NodeCreationOptions = {
  parentKey?: string | null;
  onSuccess?: (key: string) => void;
};
/**
 * Hook node creation into a component
 * @param node node to create
 * @returns
 */
export function useNodeCreate(type: NodeType, options?: NodeCreationOptions) {
  const { parentKey, onSuccess } = options || {};
  const { mutate: createDirectory } = useDirectoryCreateMutation();
  const { mutate: createNote } = useNoteCreateMutation();

  return () => {
    if (type === "directory") {
      createDirectory({ name: "folder", parent_key: parentKey }, { onSuccess });
    } else {
      createNote({ name: "new note", directory_key: parentKey }, { onSuccess });
    }
  };
}
