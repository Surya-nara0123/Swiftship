import { NextResponse, NextRequest } from "next/server";

export function POST(request: NextRequest) {
    try {
        const response = NextResponse.next();
        response.cookies.set('token', '', { expires: new Date(0), path: '/' }); // Ensure matching path for deletion
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Failed to log out" }, { status: 400 });
    }
}
