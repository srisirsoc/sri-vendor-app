import { NextResponse } from "next/server";

export function proxy(request) {
    const token = request.cookies.get("token")?.value;

    const { pathname } = request.nextUrl;

    const protectedRoutes = ["/user", "/chats", "/v-calls", "/calls"];

    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));

    if (isProtected && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    };

    if (token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/user/:path*",
        "/chats/:path*",
        "/v-calls/:path*",
        "/calls/:path*",
    ],
};