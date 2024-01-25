import { UnknownError } from "exception/error";

const DEFAULT_ERROR = new UnknownError();

/**
 * Throw an error in render phase.
 * @param error error to throw
 */
export function Throw({ error = DEFAULT_ERROR }: { error?: Error }) {
  throw error;
  return null;
}
