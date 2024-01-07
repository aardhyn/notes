export function equalElements(a: readonly unknown[], b: readonly unknown[]) {
  return a.length === b.length && a.every((element) => b.includes(element));
}
