export type Nullish = null | undefined | void;
export type Valueless = Nullish | false | 0 | "";

export function defined<T = unknown, O = undefined>(
  value: unknown,
  then: T,
  otherwise: O = undefined as O
) {
  if (value === undefined || value === null) return otherwise;
  return then;
}
