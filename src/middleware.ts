import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { toast } from 'sonner';

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith("/cart") ||
        request.nextUrl.pathname.startsWith("/checkout") ||
        request.nextUrl.pathname.startsWith("/track") ||
        request.nextUrl.pathname.startsWith("/profile")) {

        try {
            const token = request.cookies.get("token")?.value;

            if (!token) {
                //("Cookie Not Exists");
                return NextResponse.redirect(new URL('/login', request.url));
            }

            const secret = new TextEncoder().encode("secret");
            const { payload } = await jwtVerify(token, secret);
            if (!payload) {
                //("Invalid Token");
                return NextResponse.redirect(new URL('/login', request.url));
            }
            if ((payload.user_type != 1) && !(request.nextUrl.pathname.startsWith("/profile"))) {
                //("Invalid User Type");
                return NextResponse.redirect(new URL('/login', request.url));
            }

            // If the token is valid, continue with the request
            return NextResponse.next();

        } catch (error) {
            //(error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    else if (request.nextUrl.pathname.startsWith("/vendor/") ||
        request.nextUrl.pathname.startsWith("/vendorincoming") ||
        request.nextUrl.pathname.startsWith("/admin")) {

        try {
            const token = request.cookies.get("token")?.value;

            if (!token) {
                //("Cookie Not Exists");
                return NextResponse.redirect(new URL('/', request.url));
            }

            const secret = new TextEncoder().encode("secret");
            const { payload } = await jwtVerify(token, secret);
            if(request.nextUrl.pathname.replace("/admin/","") != payload.id || payload.user_type != 2){
                return NextResponse.redirect(new URL('/', request.url));
            }
            if (!payload) {
                //("Invalid Token");
                return NextResponse.redirect(new URL('/', request.url));
            }

            // If the token is valid, continue with the request
            return NextResponse.next();

        } catch (error) {
            //(error);
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }
    else if (request.nextUrl.pathname.startsWith("/login") ||
        request.nextUrl.pathname.startsWith("/signup") ||
        request.nextUrl.pathname.startsWith("/vendorob")) {
        const token = request.cookies.get("token")?.value;
        if (token) {
            return NextResponse.redirect
                (new URL('/', request.url));
        }
    }
    else if (request.nextUrl.pathname.startsWith("/cart") ||
        request.nextUrl.pathname.startsWith("/checkout")) {
        const cart = localStorage.getItem("cart");
        if (!cart) {
            return NextResponse.redirect(new URL('/', request.url));
        }
    }
    else {
        return NextResponse.next();
    }

    // For other routes, continue the request
    return NextResponse.next();
}

// Apply middleware to the following routes
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
}

function sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}

