import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from "next/server"

export async function GET(request: NextRequest) {
    try {
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "surya1",
            idleTimeout: 10000,

        });
        //("Connected!");
        const cmd = `SElECT * FROM rishabhMenu;`;
        const [result, feilds] = await con.query(cmd);
        // //("result", result);
        if (!result) {
            return NextResponse.json({ message: "Menu Not Exists" }, { status: 404 })
        }
        con.commit();
        con.end();
        return NextResponse.json(result, { status: 200 })
    } catch (error) {
        //(error);
        return NextResponse.json({ message: "Error" }, { status: 500 })
    }
}