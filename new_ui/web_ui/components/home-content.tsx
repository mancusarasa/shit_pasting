"use client";

import { Navbar } from "@/components/navbar";
import { AuthContext, AuthDispatchContext } from "@/components/auth-context";
import { useReducer } from "react";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

type AuthState = { auth_token: string };

type AuthAction = { event_type: 'logged_in', auth_token: string } | { event_type: 'logged_out' }

const authReducer = (auth_state: AuthState, auth_action: AuthAction): AuthState => {
  switch (auth_action.event_type) {
    case "logged_in": {
      cookies.set("auth_token", auth_action.auth_token);
      return { auth_token: auth_action.auth_token };
    }
    case "logged_out": {
      cookies.remove("auth_token")
      return { auth_token: ""};
    }
  }
}

export const HomeContent = ({children,}: {children: React.ReactNode;}) => {
  // const [authToken, dispatch] = useReducer(authReducer, cookies.get("auth_token") || "");
  const [authToken, dispatch] = useReducer(authReducer, {auth_token: ""});

  return (
    <>
      <Navbar />
      <AuthContext.Provider value={authToken}>
        <AuthDispatchContext.Provider value={dispatch}>
          <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
            {children}
          </main>
        </AuthDispatchContext.Provider>
      </AuthContext.Provider>
    </>
  );
};
