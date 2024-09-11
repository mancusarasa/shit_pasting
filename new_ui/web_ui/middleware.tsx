import { NextResponse, NextRequest } from 'next/server';
// import { cookies } from "@/components/auth-context";

// async function getAuthStatus(): Promise<boolean> {

//   const token = cookies.get('auth_token');
//   const host = process.env.NEXT_PUBLIC_AUTH_SERVICE_HOST;
//   const port = process.env.NEXT_PUBLIC_AUTH_SERVICE_PORT;
//   const authServiceUrl = `http://${host}:${port}/userinfo`;

//   fetch(authServiceUrl, {
//     method: 'GET',
//     headers: {
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//     }
//   }).then(response => { 
//     console.log(response);
//     if (response.status != 200) {
//       return false;
//     } else {
//       console.log(response.json());
//       return true;
//     }
//   }).catch(error => {
//     return false;
//   });
//   return false;
// }

export async function middleware(request: NextRequest) {
  return NextResponse.next();
  // const isAuthenticated: boolean = await getAuthStatus();
  // if (isAuthenticated) {
  //     return NextResponse.next();
  // } else {
  //     return NextResponse.redirect(new URL('/login', request.url));
  // }
}

// export const config = {
//   matcher: [
//     '/',
//     '/home',
//     '/!(login)',
//   ],
// }
