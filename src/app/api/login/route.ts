import { NextResponse, NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const token = jwt.sign(body.user, 'secret', { expiresIn: '1d' });
        const isLocalhost = request.url.includes('localhost');

        const response = NextResponse.json({ message: "Success" }, { status: 200 });
        response.cookies.set('token', token, {
            // httpOnly: true,
            path: '/',
            sameSite: 'lax',
            secure: !isLocalhost,
            maxAge: 7 * 24 * 60 * 60,  // Adjusted for clarity
            ...(isLocalhost ? {} : { domain: 'swiftship-nine.vercel.app' })
        });

        return response;
    } catch (error) {
        return NextResponse.json({ message: "Error setting cookie" }, { status: 500 });
    }
}
