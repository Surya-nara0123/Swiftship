import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server"

export async function POST(request:NextRequest) {
    try {
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "surya1",
            idleTimeout: 10000,

        });
        console.log("Connected!");
        const body = await request.json();
        const cmd = `SElECT * FROM userDetails WHERE username='${body.username}' AND password='${body.password}';`;
        const [result, feilds] = await con.query(cmd);
        console.log("result" ,result);
        console.log("feilds",feilds);
        console.log("hiii");
        con.commit();
        con.end();
        if (!result) {
            return NextResponse.json({ message: "User Not Exists" }, { status: 404 })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Error" }, { status: 500 })
    }
    console.log("User created successfully");
    return NextResponse.json({ message: "User Exists" }, { status: 200 })
}