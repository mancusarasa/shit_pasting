import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token");
  if (!authToken) {
    request.cookies.delete("auth_token");
    const loginUrl = new URL("/login", request.url)
    // loginUrl.searchParams.set("from", request.nextUrl.pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("auth_token");
    return response;
  } else {
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/my_pastes",
    "/compose",
    "/feed",
  ],
}
