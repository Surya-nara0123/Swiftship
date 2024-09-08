import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server"

export async function POST(request:Request) {
    try {
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "surya1",
            idleTimeout: 10000,

        });
        //("Connected!");
        const body = await request.json();
        const cmd = `INSERT INTO userDetails (email, password, username, mobile) VALUES ('${body.email}', '${body.password}', '${body.username}', '${body.mobile}');`;
        const [result, feilds] = await con.query(cmd);
        //(result, feilds);
        //("hiii");
        con.commit();
        con.end();
    } catch (error) {
        //(error);
        return Response.json({ message: "Error in creating user" }, { status: 500 })
    }
    //("User created successfully");
    return Response.json({ message: "User created successfully" }, { status: 200 })
}