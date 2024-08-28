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
  const [rest_id, setRest_id] = useState(0);

  const getUserName = async () => {
    try {
      const res = await fetch("/api/getToken",
        {
          method: "POST",
          headers: {
        
            "Content-Type": "application/json"
          }
        }
      );
      if (res.status !== 200) {
        setUserName("");
        // console.log(res);
        return;
      }
      const body = await res.json();
      if (body["message"] == "Token Expired") {
        // console.log("Token Expired");
        setUserName("");
        return;
      }
      // console.log(body);
      setUserName(body["decodedToken"]["name"]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCart();
    getUserName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    updatePricesCart(cart);
  }, [cart]);

  const updatePricesCart = async () => {
    if (cart.length === 0) return;
    const res = await fetch("https://swiftshipbackend-production.up.railway.app/getFooditems")
    const data = await res.json()
    console.log(data["food_items"])
    for (let item of cart) {
      for (let food_item of data["food_items"]) {
        console.log(item.name, food_item.Item)
        if (item.name === food_item.Item) {
          setRest_id(food_item.RestuarantId)
          console.log(food_item.RestuarantId)
          item.price = food_item.Price;
        }
      }
    }
    setCart(cart);
    calculateTotalPrice(cart);
  }

  const loadCart = () => {
    // Example items for demonstration
    const temp = localStorage.getItem("cart");
    const cartItems = temp ? JSON.parse(temp) : [];
    setCart(cartItems);
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

  const addOrderToDatabase = async (isCash) => {
    let res = await fetch("https://swiftshipbackend-production.up.railway.app/getuserid", {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName }),
    });
    let data = await res.json();
    let orderDetails = [];
    for(let item of cart){
      let orderDetail = {};
      orderDetail.item = item.name;
      orderDetail.quantity = item.count;
      orderDetails.push(orderDetail);
    }
    console.log(orderDetails);
    const order = {
      user_id:data.uid,
      rest_id: rest_id,
      is_paid: isCash ? false : true,
      is_cash: isCash,
      timestamp: new Date().toISOString(),
      order_status: isCash ? 1 : 2,
      order_items: orderDetails,
    };
    console.log(order);
    res = await fetch("https://swiftshipbackend-production.up.railway.app/createorder", {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
    data = await res.json();
    console.log(data);
    localStorage.setItem("cart", JSON.stringify([]));
    window.location.href = `/track/${data["order"]+1234567890}`;
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }

    const response = await fetch("/api/razorpay", {
      method: "POST",
      headers: {
         "Content-Type": "application/json" },
      body: JSON.stringify({ amount: price })
    });
    const data = await response.json();

    if (!data) {
      alert("Server error. Please try again later.");
      return;
    }

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Rishabh's Canteen",
      currency: data.currency,
      amount: price * 100,
      order_id: data.id,
      description: "Bill for your order",
      handler: async function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);
        // if payment is successful, add the order to the  clear the cart and redirect to track page
        addOrderToDatabase(false);
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
      <Navbar />
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
                <div className="block w-full text-center" onClick={()=>addOrderToDatabase(true)}>
                  Pay with Cash
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
