import { supabase } from ".";
import { invariant } from "exception/invariant";
import { timestampz } from "utility";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserPreferences } from "route/preferences/types";
import { invalidateQueries } from "./query";

export type ProfileCreation = Partial<Omit<Profile, "profileKey">>;
export type Profile = {
  firstName: string;
  lastName: string;
  username: string;
  profileKey?: string;
  preferences?: UserPreferences;
};

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

  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  invalidateQueries("user");
  if (error) throw error;
}

export async function getUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error) throw error;
  return data.user;
}
export function useUser() {
  return useQuery({ queryKey: ["user"], queryFn: getUser });
}

export async function getProfile() {
  const user = await getUser();
  return user.user_metadata as Profile;
}
export function useProfile() {
  return useQuery({ queryKey: ["user", "profile"], queryFn: getProfile });
}

export async function updateProfile(profile: Partial<Profile>) {
  const newProfile = {
    ...profile,
    updated_at: timestampz(),
  };

  const { data, error } = await supabase.auth.updateUser({ data: newProfile });

  if (error) throw error;
  return data;
}
export function useProfileMutation() {
  return useMutation({
    mutationKey: ["user", "profile"],
    mutationFn: updateProfile,
  });
}
