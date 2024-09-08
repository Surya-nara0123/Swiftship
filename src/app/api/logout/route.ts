import { NextResponse, NextRequest } from "next/server";
import { cookies } from 'next/headers';

export function POST(request: NextRequest) {
    cookies().delete('token');
    return NextResponse.json({ message: "Success" }, { status: 200 });
}