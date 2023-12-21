import { invariant } from "exception/invariant";
import { Table, supabase } from ".";
import { useMutation, useQuery } from "@tanstack/react-query";

const KEY = ["notes"];

export type Note = Table<"note">;

// create //

export type NoteCreation = Partial<Pick<Note, "name" | "route" | "content">>;

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
export function useCreateNoteMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: createNote });
}

// list //

async function listNotes() {
  const { data: note, error } = await supabase
    .from("note")
    .select("note_key, name, route")
    .order("name", { ascending: true });

  if (error) throw error;
  return note;
}
export function useNotesQuery() {
  return useQuery({ queryKey: KEY, queryFn: listNotes });
}
export type SimpleNote = Awaited<ReturnType<typeof listNotes>>[number];

// get //

async function getNote(note_key: string) {
  const { data, error } = await supabase
    .from("note")
    .select(
      "note_key, user_key, name, route, content, meta, created_at, mutated_at"
    )
    .eq("note_key", note_key);
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
  Pick<Note, "name" | "route" | "content" | "mutated_at">
> &
  Pick<Note, "note_key">;
async function mutateNote(mutation: NoteMutation) {
  const { data, error } = await supabase
    .from("note")
    .update(mutation)
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
export function useDeleteNoteMutation() {
  return useMutation({ mutationKey: KEY, mutationFn: deleteNote });
}
