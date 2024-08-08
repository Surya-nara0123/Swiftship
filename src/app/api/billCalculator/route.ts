import { NextRequest, NextResponse } from "next/server";
import mysql from 'mysql2/promise';

export async function POST(req: NextRequest) {
    try {
        const con = await mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1234",
            database: "surya1",

        });
        let body = await req.json();
        body = body.cart;
        console.log(body);
        console.log("Connected!");
        const cmd = `SELECT * FROM rishabhMenu;`;
        const [result, feilds] = await con.query(cmd);
        console.log("result", result);
        if (!result) {
            console.log(result, feilds);
            return NextResponse.json({ message: "Menu Not Exists" }, { status: 404 });
        }
        let price = 0;
        for(let i=0;i<body.length;i++){
            console.log(body[i].name);
            (result as any[]).forEach((element:any) => {
                if(body[i].name==element.name){
                    price += element.price*body[i].count;
                }});
            }
        con.commit();
        con.end();
        console.log(price);
        return NextResponse.json(price, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}