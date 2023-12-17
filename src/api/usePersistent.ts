import { useEffect, useState } from "react";

/**
 * Value read from `key` does not satisfy the type predicate for `T`
 */
class BadReadInvariant extends Error {
  constructor(key: string) {
    const message = `Value read from \`${key}\` does not satisfy the predicate for \`T\``;
    super(message);
  }
}

/**
 * Read `T` data from `local storage`
 * @param key key to read from
 * @returns
 */
export function ReadPersistent<T>(
  key: string,
  predicate?: (value: unknown) => value is T,
  noexcept: boolean = true
) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  const data = JSON.parse(item);
  if (predicate && !predicate(data)) {
    if (noexcept) throw new BadReadInvariant(key);
    return null;
  }
  return JSON.parse(item) as T;
}

/**
 * Write `T` data into `local storage` under `key`
 * @param key key to write to
 * @param value value to write
 */
export function WritePersistent<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
  return ReadPersistent<T>(key);
}

/**
 * Store state persistently using `local storage`
 * @param key key to store value under
 * @param defaultValue default value to use if no value exists
 * @returns
 */
export function usePersistent<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    const item = ReadPersistent<T>(key);
    if (item) return item; // already exists, return current value
    WritePersistent(key, defaultValue);
    return defaultValue;
  });

  useEffect(() => {
    WritePersistent(key, value);
  }, [key, value]);
  return [value, setValue] as const;
}
