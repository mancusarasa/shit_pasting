"use client";

import { Navbar } from "@/components/navbar";
import {
  AuthContext,
  authReducer,
  initialState,
  AuthDispatchContextType
} from "@/components/auth-context";
import { useReducer } from "react";

export const MainContent = ({children,}: {children: React.ReactNode;}) => {

  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );
  const value: AuthDispatchContextType = {state, dispatch};

  return (
    <>
      <AuthContext.Provider value={value}>
        <Navbar />
        <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
          {children}
        </main>
      </AuthContext.Provider>
    </>
  );
};
