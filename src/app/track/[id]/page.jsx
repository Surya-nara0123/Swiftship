"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import {
  FaCheckCircle,
  FaCog,
  FaHourglassHalf,
  FaClipboardCheck,
} from "react-icons/fa";

export default function Page({ params }) {
  const [counter, setCounter] = useState(0);
  const [order, setOrder] = useState([]);
  const [fullOrder, setFullOrder] = useState([]);
  const [windowLoaded, setWindowLoaded] = useState(false);
  const addPricesToOrderItems = async (orderItems) => {
    const res = await fetch("http://localhost:8080/getFooditems", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log(data);
    let newOrderItems = [];
    for (let item of orderItems) {
      for (let food of data["food_items"]) {
        if (food.Item === item.item) {
          newOrderItems.push({
            item: item.item,
            price: food.Price,
            quantity: item.quantity,
            total: food.Price * item.quantity,
          });
        }
      }
    }
    setOrder(newOrderItems);
    setWindowLoaded(true);
  };
  const getOrder = async () => {
    // Fetch order details from the server
    let res = await fetch("http://localhost:8080/getorderid",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(
          {
            "id": params.id - 1234567890
          }
        )
      }
    )
    let data = await res.json();
    // console.log(data);
    let orderItems = data["order"]["order_items"];
    addPricesToOrderItems(orderItems);
    setFullOrder(data["order"]);
    // setOrder(data["order"]["order_items"]);
  }

  const calculateTotalPrice = () => {
    let total = 0;
    for (let item of order) {
      total += item.total;
    }
    return total;
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the counter
      // console.log("Counter incremented");
      getOrder();
      setCounter((prevCounter) => prevCounter + 1);
    }, 2000); // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative">
      <Navbar />
      {windowLoaded && (
        <div className="bg-white min-h-screen py-10 px-4 sm:py-20 sm:px-10 pt-40 sm:pt-40">
          <div className="flex flex-col-reverse sm:flex-row">
            {/* Progress Bar */}
            <div className="relative flex flex-col items-center w-full sm:w-32 sm:mr-8 pt-12 sm:pt-0">
              {/* Progress Bar for Mobile */}
              <div className="block sm:hidden w-full">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex flex-col justify-between items-center">
                    <div className="w-1 pt-10 bg-red-600 absolute left-1/2 transform -translate-x-1/2 top-0 h-full" />
                  </div>
                  <div className="relative flex flex-col items-center">
                    <div className={`flex flex-col items-center ${fullOrder.order_status == 2 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md mb-12 text-center relative z-8`}>
                      <FaCheckCircle className="text-green-500 text-3xl mb-2" />
                      <p className="text-sm font-semibold">Order placed</p>
                    </div>
                    <div className={`flex flex-col items-center ${fullOrder.order_status == 3 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md mb-12 text-center relative z-8`}>
                      <FaCog className="text-yellow-500 text-3xl mb-2" />
                      <p className="text-sm font-semibold">Preparing</p>
                    </div>
                    <div className={`flex flex-col items-center ${fullOrder.order_status == 4 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md mb-12 text-center relative z-8`}>
                      <FaHourglassHalf className="text-blue-500 text-3xl mb-2" />
                      <p className="text-sm font-semibold">Ready for pickup</p>
                    </div>
                    <div className={`flex flex-col items-center ${fullOrder.order_status == 5 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md text-center relative z-8`}>
                      <FaClipboardCheck className="text-gray-500 text-3xl mb-2" />
                      <p className="text-sm font-semibold">Completed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Bar for Desktop */}
              <div className="hidden sm:flex flex-col items-center w-full h-full relative">
                <div className="w-1 bg-red-600 rounded-lg absolute top-0 left-1/2 transform -translate-x-1/2 h-full" />
                <div className="flex flex-col items-center w-full h-full justify-between relative">
                  <div className={`flex flex-col items-center ${fullOrder.order_status == 2 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md text-center relative z-8`}>
                    <FaCheckCircle className="text-green-400 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Order placed</p>
                  </div>
                  <div className={`flex flex-col items-center ${fullOrder.order_status == 3 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md text-center relative z-8`}>
                    <FaCog className="text-yellow-500 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Preparing</p>
                  </div>
                  <div className={`flex flex-col items-center ${fullOrder.order_status == 4 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md text-center relative z-8`}>
                    <FaHourglassHalf className="text-blue-500 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Ready for pickup</p>
                  </div>
                  <div className={`flex flex-col items-center ${fullOrder.order_status == 5 ? "bg-blue-300" : "bg-white"} p-4 rounded-lg shadow-md text-center relative z-8`}>
                    <FaClipboardCheck className="text-gray-500 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Completed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 relative z-8">
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 sm:mb-8">
                Order Tracking
              </h1>
              <h2 className="text-lg sm:text-xl lg:text-2xl mb-6 sm:mb-8">
                Order ID: {params.id - 1234567890}
              </h2>

              {/* Table of items */}
              <div className="mb-8 sm:mb-12 p-4 sm:p-6 bg-white border border-red-600 rounded-lg shadow-md overflow-x-auto">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">
                  Order Details
                </h3>
                <table className="w-full border-collapse table-fixed">
                  <thead>
                    <tr className="border-b border-red-200">
                      <th className="py-2 px-2 sm:px-4 text-left">Item</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Unit Price</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Quantity</th>
                      <th className="py-2 px-2 sm:px-4 text-left">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.map((item, index) => (
                      <tr className="border-b border-red-200">
                        <td className="py-2 px-2 sm:px-4 truncate">{item.item}</td>
                        <td className="py-2 px-2 sm:px-4 truncate">₹{item.price}</td>
                        <td className="py-2 px-2 sm:px-4 truncate">{item.quantity}</td>
                        <td className="py-2 px-2 sm:px-4 truncate">₹{item.total}</td>
                      </tr>
                    )
                    )}
                  </tbody>
                </table>
              </div>

              {/* Total amount, mode of payment, and transaction ID */}
              <div className="p-4 sm:p-6 bg-white border border-red-600 rounded-lg shadow-md">
                <div className="mb-3 sm:mb-4">
                  <span className="font-semibold">Total Amount:</span> ₹{calculateTotalPrice()}
                </div>
                <div className="mb-3 sm:mb-4">
                  <span className="font-semibold">Mode of Payment:</span> {fullOrder.is_cash ? "Cash" : "Online"}
                </div>
                <div>
                  <span className="font-semibold">Transaction ID:</span>{" "}
                  1234567890
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
