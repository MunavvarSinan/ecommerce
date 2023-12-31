import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

type AllowedRoles = Record<string, string[]>;

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("token")?.value;
  const isPublicRoute = pathname === "/sign-in";

  if (!authToken) {
    // Redirect to sign-in if there's no token
    return isPublicRoute ? NextResponse.next() : NextResponse.redirect(new URL("/sign-in", request.url));
  }

  try {
    const { payload } = await jwtVerify(authToken, new TextEncoder().encode(process.env.JWT_SECRET as string));
    const { role, exp } = payload as { role: string; exp: number };
    const isExpired = Date.now() >= exp.valueOf() * 1000;

    if (isExpired) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Define allowed routes for each role
    const allowedRoutes: AllowedRoles = {
      VENDOR: ["/vendor"],
    };

    // Check if the current pathname is allowed for the user's role
    if (role && allowedRoutes[role].some((allowedRoute) => pathname.startsWith(allowedRoute))) {
      return NextResponse.next();
    }

    // Redirect to the appropriate route based on the user's role
    return NextResponse.redirect(new URL(`/${role.toLowerCase()}/`, request.url));
  } catch (error) {
    // Handle token verification errors
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
