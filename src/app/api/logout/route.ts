import { NextResponse, NextRequest } from "next/server";

export function POST(request: NextRequest) {
    try {
        request.cookies.delete('token'); // Ensure matching path for deletion
        const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
        response.cookies.delete('token'); // Ensure matching path for deletion
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Failed to log out" }, { status: 400 });
    }
}
