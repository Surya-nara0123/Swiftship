"use client";
import React, { useEffect, useState } from "react";
import { ScrollArea, ScrollBar } from "../../components/ui/scroll-area";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import axios from "axios";
import { Button } from "../../components/ui/button";

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

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);

  const getUserName = async () => {
    try {
      const res = await axios.get("/api/getcookies");
      if (res.data.result.value) {
        setUserName(res.data.result.value);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadCart();
    getUserName();
  }, []);

  const loadCart = () => {
    // Example items for demonstration
    const exampleCart = [
      { name: "Item 1", price: 100, count: 2 },
      { name: "Item 2", price: 200, count: 1 },
      { name: "Item 3", price: 50, count: 3 },
    ];
    setCart(exampleCart);
    calculateTotalPrice(exampleCart);
  };

  const calculateTotalPrice = (cartItems) => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );
    setPrice(totalPrice);
  };

  const incrementItem = (index) => {
    const newCart = [...cart];
    newCart[index].count += 1;
    setCart(newCart);
    calculateTotalPrice(newCart);
  };

  const decrementItem = (index) => {
    const newCart = [...cart];
    if (newCart[index].count > 1) {
      newCart[index].count -= 1;
      setCart(newCart);
      calculateTotalPrice(newCart);
    }
  };

  const removeItem = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    calculateTotalPrice(newCart);
  };

  return (
    <ScrollArea>
      {userName.length > 0 ? <NavbarLogin item={userName} /> : <Navbar />}
      <div className="gradient-bg2 items-left justify-center">
        <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
          <div className="text-3xl font-bold mb-4">Cart</div>
          <div className="w-full flex flex-col gap-2">
            {cart.length > 0 &&
              cart.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/20 backdrop-blur-lg rounded-lg p-3"
                >
                  <div>
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-sm">Unit Price: ₹{item.price}</div>
                    <div className="text-sm">
                      Total: ₹{item.price * item.count}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      className="text-white bg-red-500 p-1 rounded"
                      onClick={() => decrementItem(index)}
                    >
                      -
                    </Button>
                    <div className="text-sm font-bold">{item.count}</div>
                    <Button
                      className="text-white bg-green-500 p-1 rounded"
                      onClick={() => incrementItem(index)}
                    >
                      +
                    </Button>
                    <Button
                      className="text-black bg-transparent hover:scale-125 hover:text-whitep-1 rounded"
                      onClick={() => removeItem(index)}
                    >
                      X
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <div className="mt-4">
            <div className="font-light">Final Bill Amount: ₹{price}</div>
            <Button
              className="bg-red-500 text-white rounded-2xl mt-5 cursor-pointer hover:bg-red-400 mx-auto"
              onClick={makePayment}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
}
