"use client";
import React, { useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';
import Navbar from '../components/Navbar';
import NavbarLogin from '../components/NavbarLogin';
import axios from 'axios';
import { Button } from '../../components/ui/button';

export default function Page() {
  const [open, setOpen] = useState(false);

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    // Make API call to the serverless API
    const response = await fetch("/api/razorpay", { method: "POST" });
    const data = await response.json();

    if (!data) {
      alert("Server error. Please try again later.");
      return;
    }

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Rishabh's Canteen",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Bill for your order",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
      },
      prefill: {
        name: "Surya Narayanan",
        email: "surya.nara0123@gmail.com",
        contact: "9940537699",
      },
    };

    console.log(options);

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const getUserName = async () => {
    try {
      const res = await axios.get("/api/getcookies");
      console.log(res.data.result.value);
      if (res.data.result.value) {
        setUserName(res.data.result.value);
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (cart.length > 0) {
      getPrice(cart);
    }
  }, [cart]);

  const loadCart = () => {
    const cartData = localStorage.getItem("cart");
    console.log('Cart data from localStorage:', cartData);
    if (cartData) {
      const parsedCart = JSON.parse(cartData);
      console.log('Parsed cart data:', parsedCart);
      setCart(parsedCart);
    }
    console.log('Cart:', cart);
  };

  const getPrice = async (cart1) => {
    try {
      const response = await axios.post("/api/billCalculator", { cart: cart1 });
      console.log(response);
      setPrice(response.data);
      console.log(price);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadCart();
    getUserName();
  }, []);

  return (
    <ScrollArea>
      {userName.length > 0 ? <NavbarLogin item={userName} /> : <Navbar />}
      <div className="w-screen h-screen flex items-center justify-center gradient-bg-footer">
        <div className="w-[400px] h-[400px] rounded-lg gradient-bg-transactions border border-white flex flex-col items-center text-white p-3">
          <div className="text-3xl font-bold">Checkout</div>
          {cart.length > 0 &&
            cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-between blue-glassmorphism select-none mb-2 p-2 px-3"
              >
                <div className="w-full">
                  <div className=" flex-col w-full">
                    <h1 className="text-white font-black font-mono mr-auto text-sm">
                      Name: {item.name}
                    </h1>
                  </div>
                </div>
                <div className=" justify-center items-center w-full ml-auto">
                  <div className="text-white font-black font-mono text-sm ml-[100px]">
                    Count:{item.count}
                  </div>
                </div>
              </div>
            ))}
            <div className="flex flex-col items-center gap-2 dark text-white font-extralight">
              Final Bill Amount
              <div className="red-glassmorphism flex w-[100px] justify-center items-center dark font-normal">
                {price}
              </div>
            </div>
          <Button className="mt-2" onClick={makePayment}>Proceed to Payment</Button>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
