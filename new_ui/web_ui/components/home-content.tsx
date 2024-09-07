"use client";

import { Navbar } from "@/components/navbar";
import { AuthContext, authReducer, initialState, AuthDispatchContextType } from "@/components/auth-context";
import { Sidebar } from "@/components/sidebar";
import { useReducer } from "react";

export const HomeContent = ({children,}: {children: React.ReactNode;}) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const value: AuthDispatchContextType = {state, dispatch};

  return (
    <>
      <Navbar />
      <Sidebar />
      <AuthContext.Provider value={value}>
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
      </AuthContext.Provider>
    </>
  );
};
