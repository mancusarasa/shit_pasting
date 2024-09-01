import { createContext } from 'react';

export type AuthState = { auth_token: string };
export type AuthAction = { event_type: 'logged_in', auth_token: string } | { event_type: 'logged_out' }

export const AuthContext = createContext<AuthState>({ auth_token: "" });
export const AuthDispatchContext: any = createContext(null);
