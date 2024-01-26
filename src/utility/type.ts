export type PartialRecord<K extends string | number | symbol, T> = Partial<
  Record<K, T>
>;
