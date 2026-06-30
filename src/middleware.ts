import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const isLoggedIn = request.cookies.has("authjs.session-token");
  const isProtected = request.nextUrl.pathname.startsWith("/llm/share");
  
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/llm/share/:path*"],
};
