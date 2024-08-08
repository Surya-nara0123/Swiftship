import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const body = await request.json();
    const price = body.amount;
    const keyId = 'rzp_test_OSBL6zdvvEokmy';
    const keySecret = 'Qm5gF8ZsYVxju2i9DjaSBYKG';
    const credentials = btoa(`${keyId}:${keySecret}`);

    const response = await fetch('https://api.razorpay.com/v1/payments/qr_codes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${credentials}`
        },
        body: JSON.stringify({
            type: 'upi_qr',
            name: 'Bill Payment',
            usage: 'single_use',
            fixed_amount: true,
            payment_amount: price,
            description: 'For Store 1',
            notes: {
                purpose: 'Test UPI QR Code notes'
            }
        })
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
}