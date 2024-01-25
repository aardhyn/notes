import { createClient } from "@supabase/supabase-js";
import { Database } from "./types.generated"; // run `/generateTypes.sh` to generate this file

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;
export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
);

export type Tables = Database["public"]["Tables"];
export type Table<T extends keyof Tables> = Tables[T]["Row"];
