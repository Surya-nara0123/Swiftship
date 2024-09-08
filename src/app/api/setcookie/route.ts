import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
    const body = await request.json();
    //(body);
    const cookieStore = cookies();
    cookieStore.set("user", `${body.username}`);
    return NextResponse.json({ message: "Cookie set" }, { status: 200 });
}