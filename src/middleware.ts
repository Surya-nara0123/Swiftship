import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get("token")?.value;
    const secret = new TextEncoder().encode("secret");
    if(pathname.startsWith("/api/logout")) {
        // Clear the token cookie
        const res = NextResponse.next();
        res.cookies.set("token", "", { expires: new Date(0) });
    }

    // Check paths requiring logged-in user
    if (pathname.startsWith("/cart") || pathname.startsWith("/checkout") ||
        pathname.startsWith("/track") || pathname.startsWith("/profile")) {

        if (!token) return NextResponse.redirect(new URL('/login', request.url));

        try {
            const { payload } = await jwtVerify(token, secret);

            if (!payload || (payload.user_type !== 1 && pathname !== "/profile")) {
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

    // Check paths for vendor/admin access
    } else if (pathname.startsWith("/vendor/") || pathname.startsWith("/vendorincoming") ||
               pathname.startsWith("/admin")) {

        if (!token) return NextResponse.redirect(new URL('/', request.url));

        try {
            const { payload } = await jwtVerify(token, secret);

            if (!payload || pathname.replace("/admin/", "") !== payload.id || payload.user_type !== 2) {
                return NextResponse.redirect(new URL('/', request.url));
            }
            return NextResponse.next();
        } catch (error) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

    // Redirect logged-in users from login/signup pages
    } else if (pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/vendorob")) {
        if (token) return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

// Middleware configuration for matching routes
export const config = {
    matcher: [
        "/",
        "/cart",
        "/checkout",
        "/login",
        "/signup",
        "/track/:path*",
        "/menu/:path*",
        "/profile/:path*",
        "/admin/:path*",
        "/vendor/:path*",
        "/vendorincoming/:path*",
        "/vendorob",
    ],
};
