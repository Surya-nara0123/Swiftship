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
        //(body);
        //("Connected!");
        const cmd = `SELECT * FROM rishabhMenu;`;
        const [result, feilds] = await con.query(cmd);
        //("result", result);
        if (!result) {
            //(result, feilds);
            return NextResponse.json({ message: "Menu Not Exists" }, { status: 404 });
        }
        let price = 0;
        for(let i=0;i<body.length;i++){
            //(body[i].name);
            (result as any[]).forEach((element:any) => {
                if(body[i].name==element.name){
                    price += element.price*body[i].count;
                }});
            }
        con.commit();
        con.end();
        //(price);
        return NextResponse.json(price, { status: 200 });

    } catch (e) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}