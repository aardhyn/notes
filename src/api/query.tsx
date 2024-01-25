import { QueryClient } from "@tanstack/react-query";

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
