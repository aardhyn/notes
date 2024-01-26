class UnknownOperatingSystemError extends Error {
  constructor() {
    super("Unknown operating system");
  }
}

export function getOperatingSystem() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Windows") != -1) return "Windows";
  if (userAgent.indexOf("Mac OS") != -1) return "MacOS";
  if (userAgent.indexOf("Linux") != -1) return "Linux";
  if (userAgent.indexOf("X11") != -1) return "unix";
  throw new UnknownOperatingSystemError();
}

export function isMacOS() {
  return getOperatingSystem() === "MacOS";
}
export function isWindows() {
  return getOperatingSystem() === "Windows";
}
export function isLinux() {
  return getOperatingSystem() === "Linux";
}

export type OperatingSystem = ReturnType<typeof getOperatingSystem>;
