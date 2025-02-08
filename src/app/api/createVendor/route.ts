import { NextResponse, NextRequest } from "next/server";
import Razorpay from "razorpay";

export async function POST(request: NextRequest) {
    const body = await request.json();
    // //(body);
    const req = {
        email: body.email,
        phone: body.phone,
        legal_business_name: body.sname,
        business_type: "partnership",
        customer_facing_business_name: body.sname,
        profile: {
            category: "food",
            subcategory: "food_court"
        },
        contact_name: body.name
    }
    //(req);
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY,
        key_secret: process.env.RAZORPAY_SECRET
    });
    try {
        const response = await razorpay.accounts.create(req);
        return NextResponse.json(response);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}