import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server"
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function POST(request:NextRequest) {
    try {
        const body = await request.json();
        const token = jwt.sign(body.user, 'secret', { expiresIn: '1d' });
        cookies().set('token', token, {httpOnly: true, path: '/', sameSite: 'lax', secure: true, maxAge: 2 * 60 * 60 * 24, domain: 'localhost'});
        return NextResponse.json({ message: "Success" }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: error }, { status: 500 })
    }
}