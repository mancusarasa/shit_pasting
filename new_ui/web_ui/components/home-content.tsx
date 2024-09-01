"use client";

import { Navbar } from "@/components/navbar";
import { AuthContext, AuthDispatchContext, AuthState, AuthAction } from "@/components/auth-context";
import { useReducer } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const authReducer = (auth_state: AuthState, auth_action: AuthAction): AuthState => {
  switch (auth_action.event_type) {
    case "logged_in": {
      cookies.set("auth_token", auth_action.auth_token);
      return { auth_token: auth_action.auth_token };
    }
    case "logged_out": {
      cookies.remove("auth_token")
      return { auth_token: "" };
    }
  }
}

export const HomeContent = ({children,}: {children: React.ReactNode;}) => {
  const [authState, dispatch] = useReducer(
    authReducer,
    { auth_token: cookies.get("auth_token") || "" }
  );

  return (
    <>
      <Navbar />
      <AuthContext.Provider value={authState}>
        <AuthDispatchContext.Provider value={dispatch}>
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            {children}
          </main>
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </>
  );
};
