import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "api";
import { ReactNode } from "react";

export function ApiProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
