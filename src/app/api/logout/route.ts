import { NextResponse, NextRequest } from "next/server";

export function PUT(request: NextRequest) {
    try {
        // request.cookies.delete('token'); // Ensure matching path for deletion
        const response = NextResponse.json({ message: "Logged out" }, { status: 200 });
        console.log("Request cookies before deleting cookie", request.cookies.getAll());
        // console.log(response.cookies.getAll(), request.cookies.getAll());
        for(const cookie of request.cookies.getAll()) {
            response.cookies.set(cookie.name, cookie.value);
        }
        response.cookies.delete('token'); // Ensure matching path for deletion
        // console.log(response.cookies.getAll()), request.cookies.getAll();
        console.log("Response cookies after deleting cookie", response.cookies.getAll());
        return response;
    } catch (error) {
        return NextResponse.json({ message: "Failed to log out" }, { status: 400 });
    }
}
