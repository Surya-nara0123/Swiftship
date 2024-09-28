import { NextResponse, NextRequest } from "next/server";

export function POST(request: NextRequest) {
    try {
        const response = NextResponse.json({ message: "Success" }, { status: 200 });
        response.cookies.set('token', '', { expires: new Date(0) });
        return response;
    } catch (e) {
        return NextResponse.json({ message: "Failed" }, { status: 400 });
    }
}