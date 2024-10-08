import { NextResponse, NextRequest } from 'next/server';
import { Cookies } from "react-cookie";
// import { cookies } from "@/components/auth-context";


async function getAuthStatus(): Promise<boolean> {

  const cookies = new Cookies();
  const token = cookies.get('auth_token');
  const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST;
  const port = process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT;
  const authServiceUrl = `http://${host}:${port}/userinfo`;

  fetch(authServiceUrl, {
    method: 'GET',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
    }
  }).then(response => { 
    console.log(response);
    if (response.status != 200) {
      return false;
    } else {
      console.log(response.json());
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
      const loginUrl = new URL('/login', request.url)
      // loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    "/my_pastes",
    "/compose",
    "/feed",
  ],
}
