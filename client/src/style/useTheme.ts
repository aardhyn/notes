import { lightTheme, darkTheme } from "./stitches.config";
import { useEffect, useState } from "react";
import { usePersistent } from "api/usePersistent";

export const THEME_KEY = "component-theme";
export const THEME_MEDIA = "(prefers-color-scheme: dark)";

const themes = ["light", "dark", "default"] as const;
export type Theme = (typeof themes)[number];

function GetSystemDefaultTheme() {
  return window.matchMedia(THEME_MEDIA).matches ? "dark" : "light";
}

function GetThemeStyles(theme: Theme) {
  if (theme === "light") return lightTheme;
  if (theme === "dark") return darkTheme;
  return null;
}

export default function useTheme() {
  const [defaultTheme, setDefaultTheme] = useState<Exclude<Theme, "default">>(
    GetSystemDefaultTheme()
  );
  const [theme, setTheme] = usePersistent<Theme>(THEME_KEY, "default");

  useEffect(() => {
    const darkModePreference = window.matchMedia(THEME_MEDIA);
    const listener = (e: MediaQueryListEvent) =>
      setDefaultTheme(e.matches ? "dark" : "light");

    darkModePreference.addEventListener("change", listener);
    return () => {
      darkModePreference.removeEventListener("change", listener);
    };
  }, []);

  const styles = GetThemeStyles(theme === "default" ? defaultTheme : theme);

  return { setTheme, themes, theme: styles };
}
