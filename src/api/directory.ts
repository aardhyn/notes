import { invariant } from "exception/invariant";
import { Table, supabase } from ".";
import { useMutation, useQuery } from "@tanstack/react-query";
import { timestampz } from "util/time";

const KEY = ["directory"];

export type Directory = Table<"directory">;

// create //

export type DirectoryCreation = Partial<Pick<Directory, "name" | "parent_key">>;

async function createDirectory(directory: DirectoryCreation) {
  // todo: no name? find the first available `New Folder ${n}`

  const { data, error } = await supabase
    .from("directory")
    .insert(directory)
    .select("directory_key");
  if (error) throw error;

  const [{ directory_key }] = data;

  return directory_key;
}
export function useDirectoryCreateMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: createDirectory });
}

// list //

export async function listDirectories() {
  const { data: directory, error } = await supabase
    .from("directory")
    .select("directory_key, parent_key, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return directory;
}
export function useDirectoriesQuery() {
  return useQuery({ queryKey: KEY, queryFn: listDirectories });
}
export type SimpleDirectory = Awaited<
  ReturnType<typeof listDirectories>
>[number];

// get //

async function getDirectory(directoryKey: string) {
  const { data, error } = await supabase
    .from("directory")
    .select("directory_key, user_key, parent_key, name, created_at, mutated_at")
    .eq("directory_key", directoryKey);
  if (error) throw error;

  invariant(data?.length === 1, "directory not found");
  const [directory] = data;
  return directory;
}
export function useDirectoryQuery(directoryKey: string) {
  return useQuery({
    queryKey: [...KEY, directoryKey],
    queryFn: () => getDirectory(directoryKey),
  });
}

// mutate //

export type DirectoryMutation = Partial<
  Pick<Directory, "name" | "directory_key" | "parent_key">
> &
  Pick<Directory, "directory_key">;
async function mutateDirectory(mutation: DirectoryMutation) {
  const timestampedMutation = { ...mutation, mutated_at: timestampz() };
  const { data, error } = await supabase
    .from("directory")
    .update(timestampedMutation)
    .eq("directory_key", mutation.directory_key)
    .select("directory_key");
  if (error) throw error;

  const [{ directory_key }] = data;
  return directory_key;
}
export function useDirectoryMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: mutateDirectory });
}

// delete //

async function deleteDirectory(directoryKey: string) {
  const { error } = await supabase
    .from("directory")
    .delete()
    .eq("directory_key", directoryKey);
  if (error) throw error;
  return directoryKey;
}
export function useDirectoryDeleteMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: deleteDirectory });
}
