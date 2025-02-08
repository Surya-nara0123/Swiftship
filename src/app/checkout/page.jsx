"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NavbarLogin from "../components/NavbarLogin";
import axios from "axios";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";
import { CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [price, setPrice] = useState(0);
  const [rest_id, setRest_id] = useState(0);

  const getUserName = async () => {
    try {
      const res = await fetch("/api/getToken", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status !== 200) {
        setUserName("");
        // //(res);
        return;
      }
      const body = await res.json();
      if (body["message"] == "Token Expired") {
        // //("Token Expired");
        setUserName("");
        return;
      }
      // //(body);
      setUserName(body["decodedToken"]["name"]);
    } catch (error) {
      //(error);
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
    const res = await fetch(
      "https://swiftshipbackend-production.up.railway.app/getFooditems"
    );
    const data = await res.json();
    //(data["food_items"])
    for (let item of cart) {
      for (let food_item of data["food_items"]) {
        //(item.name, food_item.Item)
        if (item.name === food_item.Item) {
          setRest_id(food_item.RestuarantId);
          //(food_item.RestuarantId)
          item.price = food_item.Price;
        }
      }
    }
    setCart(cart);
    calculateTotalPrice(cart);
  };

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
    let res = await fetch(
      "https://swiftshipbackend-production.up.railway.app/getuserid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: userName }),
      }
    );
    let data = await res.json();
    let orderDetails = [];
    for (let item of cart) {
      let orderDetail = {};
      orderDetail.item = item.name;
      orderDetail.quantity = item.count;
      orderDetails.push(orderDetail);
    }
    //(orderDetails);
    const order = {
      user_id: data.uid,
      rest_id: rest_id,
      timestamp: new Date().toISOString(),
      order_items: orderDetails,
    };
    //(order);
    res = await fetch(
      "https://swiftshipbackend-production.up.railway.app/createorder",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      }
    );
    if (!res) {
      alert("Server error. Please try again later.");
      return;
    }
    if (res.status !== 200) {
      alert("Server error. Please try again later.");
      return;
    }
    toast.success("Order Placed Successfully");
    data = await res.json();
    //(data);
    localStorage.setItem("cart", JSON.stringify([]));
    window.location.href = `/track/${data["order"] + 1234567890}`;
  };

  const makePayment = async () => {
    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK Failed to load");
      return;
    }
    console.log(cart);
    let orderDetails = [];
    for (let item of cart) {
      let orderDetail = {};
      orderDetail.item = item.name;
      orderDetail.quantity = item.count;
      orderDetails.push(orderDetail);
    }
    const res1 = await fetch(
      "https://swiftshipbackend-production.up.railway.app/razorpay",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          {
            user_id: 123456,
            order_items: orderDetails,
          }
        ),
      }
    );
    const data1 = await res1.json();
    console.log(data1);

    if (!data1) {
      alert("Server error. Please try again later.");
      return;
    }

    var options = {
      key: data1.key,
      name: "Rishabh's Canteen",
      // currency: data1["options"].currency,
      // amount: price * 10000,
      order_id: data1["options"].id,
      description: "Bill for your order",
      handler: async function (response) {
        addOrderToDatabase(false);
        setIsLoading(false);
      },
      modal: {
        ondismiss: function () {
          setIsLoading(false);
        },
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
              {isLoading ? (
                <CSpinner color="primary" />
              ) : (
                <Button
                  className="bg-red-500 text-white rounded-2xl cursor-pointer hover:bg-red-400"
                  onClick={() => {
                    setIsLoading(true);
                    makePayment();
                  }}
                >
                  Proceed to Payment
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
