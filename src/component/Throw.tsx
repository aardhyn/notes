/**
 * Throw an error in render phase.
 * @param error error to throw
 */
export function Throw({ error }: { error: Error }) {
  throw error;
  return null;
}
