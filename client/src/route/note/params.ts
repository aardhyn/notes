import { invariant } from "exception/invariant";
import { useParams } from "react-router-dom";

type NoteParams = {
  noteKey: string;
};

function isNoteParams(params: object): asserts params is NoteParams {
  invariant("noteKey" in params, "noteKey must be a string");
}

export function useNoteParams() {
  const params = useParams();
  isNoteParams(params);
  return params as NoteParams;
}
