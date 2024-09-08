import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: NextRequest) {
    const cookieStore = cookies();
    const result = cookieStore.get("user");
    //("result", result);
    if (!result) {
        return NextResponse.json({ message: "Cookie Not Exists" }, { status: 200 });
    }
    return NextResponse.json({ result }, { status: 200 });
}