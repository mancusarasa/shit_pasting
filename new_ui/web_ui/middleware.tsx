import { useContext } from 'react';
import { NextResponse, NextRequest } from 'next/server';
import {
  AuthContext,
  initialState
} from "@/components/auth-context";

async function getAuthStatus(): Promise<boolean> {

  const authContext = useContext(AuthContext);

  const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST;
  const port = process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT;
  const token = authContext.state.auth_token;
  const authServiceUrl = `http://${host}:${port}/userinfo`;
  fetch(authServiceUrl, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  }).then(response => {
    if (response.status != 200) {
      return false;
    } else {
      return true;
    }
  }).catch(error => {
    return false;
  });
  return false;
}

export async function middleware(request: NextRequest) {
  const isAuthenticated: boolean = await getAuthStatus();
  if (isAuthenticated) {
      return NextResponse.next();
  } else {
      return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: [
    '/',
    '/home',
    '/!(login)',
  ],
}
