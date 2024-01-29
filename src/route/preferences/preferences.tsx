import { useEffect, useState } from "react";
import { UserPreferences } from "./types";
import { DEFAULT_USER_PREFERENCES } from "./constants";
import { Shortcut, useProfile, useProfileMutation } from "api";

type UserPreferencesState = {
  preferences: UserPreferences;
  setPreferences: (mutation: Partial<UserPreferences>) => void;
} & Omit<ReturnType<typeof useProfile>, "data">;

/**
 * Hook user preferences state into a component
 * @returns user preferences getter and setter
 */
export function useUserPreferences(): UserPreferencesState {
  const { data: profile, ...others } = useProfile();

  const [preferences, _setPreferences] = useState(DEFAULT_USER_PREFERENCES);
  useEffect(() => {
    _setPreferences({
      ...DEFAULT_USER_PREFERENCES,
      ...(profile?.preferences ?? {}),
    });
  }, [profile?.preferences]);

  const { mutate: updateProfile } = useProfileMutation();
  const setPreferences = (mutation: Partial<UserPreferences>) => {
    const newPreferences = {
      ...preferences,
      ...mutation,
    };
    _setPreferences(newPreferences);
    updateProfile({
      preferences: newPreferences,
    });
  };

  return { preferences, setPreferences, ...others };
}

/**
 * hook a user preference state into a component
 * @param key preference to reduce getter and setter to
 * @returns preference getter and setter
 */
export function useUserPreference<T extends keyof UserPreferences>(key: T) {
  const { preferences, setPreferences } = useUserPreferences();
  const preference = preferences[key];
  const setPreference = (value: UserPreferences[T]) => {
    setPreferences({ [key]: value });
  };

  return [preference, setPreference] as const;
}

/**
 * Hook a user shortcut preference state into a component
 * @param key shortcut preference to reduce getter and setter to
 * @returns shortcut preference getter and setter
 */
export function useShortcutPreference<
  T extends keyof UserPreferences["shortcuts"],
>(key: T) {
  const { preferences, setPreferences } = useUserPreferences();
  const shortcut = preferences.shortcuts[key];
  const setShortcut = (value: Shortcut) => {
    setPreferences({ shortcuts: { ...preferences.shortcuts, [key]: value } });
  };

  return [shortcut, setShortcut] as const;
}
