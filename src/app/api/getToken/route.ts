import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const cookieStore = cookies();
        const data = cookieStore.getAll();
        console.log(data);
        const token = cookieStore.get("token") || null;
        const data1 = request.cookies.getAll();
        console.log(data1);
        if (!token) {
            return NextResponse.json({ message: "Cookie Not Exists" }, { status: 200 });
        }
        const decodedToken = jwt.verify(token.value, "secret");
        return NextResponse.json({ decodedToken }, { status: 200 });
    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            return NextResponse.json({ message: "Token Expired" }, { status: 200 });
        }
        return NextResponse.json({ message: error }, { status: 500 });
    }
}