import { createContext, Dispatch } from "react";
import Cookies from "js-cookie";

export type AuthState = {auth_token: string};
export type AuthAction = {event_type: "logged_in", auth_token: string} | {event_type: "logged_out"};

export interface AuthDispatchContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
}

export const initialState: AuthState = {auth_token: Cookies.get("auth_token") || ""}

export const authReducer = (auth_state: AuthState, auth_action: AuthAction): AuthState => {
  switch (auth_action.event_type) {
    case "logged_in": {
      Cookies.set("auth_token", auth_action.auth_token);
      return {auth_token: auth_action.auth_token};
    }
    case "logged_out": {
      Cookies.remove("auth_token")
      return {auth_token: ""};
    }
    default: {
      return auth_state;
    }
  }
}

export const AuthContext = createContext<AuthDispatchContextType>({
  state: initialState,
  dispatch: () => {},
});
