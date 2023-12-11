import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("token")?.value;
    const isPublicRoute = pathname === "/sign-in";
    console.log("authToken", authToken);
    console.log("isPublicRoute", isPublicRoute);
    console.log("pathname",);
    // Check if token exists and redirect if not on public route
    if (!authToken && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    // Allow access for valid token and public routes
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};