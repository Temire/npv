import * as React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { AuthProvider, UserContextProvider } from "../context";
import { NpvToastBar } from "../components/toast";

const queryClient = new QueryClient();

export const Provider = ({ children }: IProviderProps) => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <UserContextProvider>
            <NpvToastBar />
            {children}
          </UserContextProvider>
        </AuthProvider>
      </QueryClientProvider>
    </>
  );
};

interface IProviderProps {
  children: React.ReactNode;
}
