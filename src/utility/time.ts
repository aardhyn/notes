export function timestampz(date: Date = new Date()) {
  return date.toISOString();
}

export function getYear() {
  return new Date().getFullYear();
}
