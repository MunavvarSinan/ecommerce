import { NextResponse } from "next/server";
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string;
    role: string;
    exp: number;
    iat: number;
}
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const authToken = request.cookies.get("token")?.value;
    const isPublicRoute = pathname === "/sign-in";

    if (authToken) {
        const decodedToken = jwt.decode(authToken) as DecodedToken;
        const isExpired = Date.now() >= decodedToken.exp * 1000;

        if (isExpired) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
    }

    if (!authToken && !isPublicRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};