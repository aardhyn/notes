import { createClient } from "@supabase/supabase-js";
import { QueryClient } from "@tanstack/react-query";

import { Database } from "./types.generated"; // run `/generateTypes.sh` to generate this file

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60,
    },
    mutations: {
      retry: false,
      onSuccess: () => {
        queryClient.invalidateQueries();
      },
    },
  },
});
export function invalidateQueries(...path: string[]) {
  queryClient.invalidateQueries({ queryKey: path });
}

const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = import.meta.env;
export const supabase = createClient<Database>(
  VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY
);

export type Tables = Database["public"]["Tables"];
export type Table<T extends keyof Tables> = Tables[T]["Row"];
