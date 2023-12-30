import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type AllowedRoles = Record<string, string[]>;

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;
  const isPublicRoute = pathname === "/sign-in";

  if (authToken) {
    try {
      const { payload } = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET!));
      const { role, exp } = payload;
      const isExpired = Date.now() >= (exp?.valueOf() ?? 0) * 1000;
      const allowedRoles: AllowedRoles = {
        "/admin/*": ["ADMIN"],
        "/vendor/*": ["VENDOR"],
      };

      const allowedRolesForPath = allowedRoles[pathname];

      // Check if allowedRolesForPath is defined before using includes
      if (
        isExpired ||
        (!isPublicRoute && !allowedRolesForPath.includes((role as string).toUpperCase()))
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (error) {
      // Handle token verification errors (e.g., invalid signature, expired token)
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  } else if (!isPublicRoute) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
