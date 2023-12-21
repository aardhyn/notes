import { createContext, useContext } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from ".";
import { invariant } from "exception/invariant";
import { usePersistent, writePersistent } from "./usePersistent";

const USER_PERSISTENT_KEY = "note-app-user";
function clearSignedInUser() {
  writePersistent(USER_PERSISTENT_KEY, null);
}
function setSignedInUser(user: User) {
  writePersistent(USER_PERSISTENT_KEY, user);
}
export function useSignedInUser() {
  return usePersistent<User | null>(USER_PERSISTENT_KEY, null);
}

export type Profile = {
  firstName: string;
  lastName: string;
  username: string;
  profileKey?: string;
};

export type ProfileCreation = Partial<Omit<Profile, "profileKey">>;

export async function signUp(
  email: string,
  password: string,
  profile: ProfileCreation
) {
  invariant(profile.firstName, "First name is required");
  invariant(profile.lastName, "Last name is required");
  invariant(profile.username, "Username is required");

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: profile,
    },
  });
  if (error) throw error;
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;

  setSignedInUser(data.user);

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;

  clearSignedInUser();
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}

type Context = {
  user: User | null;
  signOut: () => Promise<void>;
  getUser: () => Promise<User | null>;
};

export const AuthContext = createContext<Context>({
  user: null,
  signOut,
  getUser,
});

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
