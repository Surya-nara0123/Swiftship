"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import axios from "axios";
import { Button } from "../../components/ui/button";

export default function Page() {
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

  return (
    <div className="gradient-bg2 items-left justify-center">
      {userName.length > 0 ? <NavbarLogin item={userName} /> : <Navbar />}
      <div className="flex flex-col  min-h-screen pt-40 px-4 md:px-10 pb-20">
        <div className="text-3xl font-bold mb-4">Checkout</div>
        <div className="w-full max-w-4xl flex flex-col gap-2">
          {cart.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Item Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.count}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ₹{item.price * item.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-4">
            <div className="font-light mb-4">Final Bill Amount: ₹{price}</div>
            <div className="flex flex-col gap-4 md:flex-row md:gap-6 mt-5">
              <Button
                className="bg-red-500 text-white rounded-2xl cursor-pointer hover:bg-red-400"
                onClick={makePayment}
              >
                Proceed to Payment
              </Button>
              <Button className="bg-gray-500 text-white rounded-2xl cursor-pointer hover:bg-gray-400">
                <a href="/track" className="block w-full text-center">
                  Pay with Cash
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
