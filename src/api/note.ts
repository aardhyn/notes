import { invariant } from "exception/invariant";
import { Table, supabase } from ".";
import { useMutation, useQuery } from "@tanstack/react-query";
import { timestampz } from "utility";

const KEY = ["notes"];

export type Note = Table<"note">;

// create //

export type NoteCreation = Partial<
  Pick<Note, "name" | "directory_key" | "content">
>;

async function createNote(note: NoteCreation) {
  // todo: no name? find the first available `New Note ${n}`

  const { data, error } = await supabase
    .from("note")
    .insert(note)
    .select("note_key");
  if (error) throw error;

  const [{ note_key }] = data;

  return note_key;
}
export function useNoteCreateMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: createNote });
}

// list //

export async function listNotes() {
  const { data: note, error } = await supabase
    .from("note")
    .select("note_key, directory_key, name")
    .order("name", { ascending: true });

  if (error) throw error;
  return note;
}
export function useNotesQuery() {
  return useQuery({ queryKey: KEY, queryFn: listNotes });
}
export type SimpleNote = Awaited<ReturnType<typeof listNotes>>[number];

// get //

async function getNote(noteKey: string) {
  const { data, error } = await supabase
    .from("note")
    .select(
      "note_key, user_key, directory_key, name, content, meta, created_at, mutated_at"
    )
    .eq("note_key", noteKey);
  if (error) throw error;

  invariant(data?.length === 1, "note not found");
  const [note] = data;
  return note;
}
export function useNoteQuery(note_key: string) {
  return useQuery({
    queryKey: [...KEY, note_key],
    queryFn: () => getNote(note_key),
  });
}

// mutate //

export type NoteMutation = Partial<
  Pick<Note, "name" | "directory_key" | "content">
> &
  Pick<Note, "note_key">;
async function mutateNote(mutation: NoteMutation) {
  const timestampedMutation = { ...mutation, mutated_at: timestampz() };
  const { data, error } = await supabase
    .from("note")
    .update(timestampedMutation)
    .eq("note_key", mutation.note_key)
    .select("note_key");
  if (error) throw error;
  const [{ note_key }] = data;
  return note_key;
}
export function useNoteMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: mutateNote });
}

// delete //

async function deleteNote(noteKey: string) {
  const { error } = await supabase
    .from("note")
    .delete()
    .eq("note_key", noteKey);
  if (error) throw error;
  return noteKey;
}
export function useNoteDeleteMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: deleteNote });
}
