export function firstUniqueName(prefix: string, names: string[]) {
  let i = 0;
  let name = prefix;
  while (names.includes(name)) name = `${prefix} ${++i}`;
  return name;
}
export class NonUniqueNameError extends Error {
  constructor(name: string) {
    super(`Name "${name}" is not unique`);
  }
}

export function capitalize(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
