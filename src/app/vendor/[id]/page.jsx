"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { AiOutlineClose } from "react-icons/ai";

export default function Page({ params }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [orders, setOrders] = useState([]);
  const [counter, setCounter] = useState(0);
  const [restaurant, setRestaurant] = useState("");
  const [windowLoaded, setWindowLoaded] = useState(false);

  const getOrders = async () => {
    let res = await fetch("https://swiftshipbackend-production.up.railway.app/getrestaurantbyid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(params.id),
      }),
    });
    let data = await res.json();
    // console.log(data);
    setRestaurant(data["result"]["name"]);
    res = await fetch("https://swiftshipbackend-production.up.railway.app/getordersbyrestaurant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Number(params.id),
      }),
    })
    data = await res.json();
    for (let i = 0; i < data["orders"].length; i++) {
      let sum = 0;
      data["orders"][i].order_items.forEach((item) => {
        sum += item.price * item.quantity;
      });
      data["orders"][i].amount = sum;
    }
    // console.log(data);
    setOrders(data["orders"]);
    setWindowLoaded(true);
  };

  const updateOrders = async (status) => {
    // Update the orders on the server
    let res = await fetch("https://swiftshipbackend-production.up.railway.app/updateorderstatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: selectedOrder.UID,
        status: status,
      }),
    });
    let data = await res.json();
    // console.log(data);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the counter
      // console.log("Counter incremented");
      getOrders();
      setCounter((prevCounter) => prevCounter + 1);
    }, 2000); // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleOpenModal = (order, index) => {
    console.log(index);
    setSelectedOrder(order);
    setSelectedIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const moveOrder = async (status) => {
    // console.log("Moving order to status", status, selectedIndex);
    let newOrders = [...orders];
    newOrders[selectedIndex].order_status = status;
    setOrders(newOrders);
    await updateOrders(status);
    handleCloseModal();
  };

  return (
    <div>
      <Navbar />
      {windowLoaded &&
        <div className="bg-white min-h-screen py-20 px-10 pt-40">
          <div className="flex flex-col items-left justify-left min-h-screen">
            <h1 className="text-3xl lg:text-5xl font-bold mb-8">
              Vendor Dashboard
            </h1>
            <h2 className="text-xl lg:text-2xl mb-8">{restaurant}</h2>

            {/* Incoming Orders */}
            <div className="mb-12 p-6 bg-white border border-red-600 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Incoming Orders</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Total Items</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    order.order_status == 2 && (
                      <tr
                        key={order.id}
                        className="border-b border-red-200 cursor-pointer"
                        onClick={() => handleOpenModal(order, index)}
                      >
                        <td className="py-2 px-4">{order.username}</td>
                        <td className="py-2 px-4">{order.order_items.length}</td>
                        <td className="py-2 px-4">{order.amount}</td>
                        <td className="py-2 px-4">{order.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Preparing Orders */}
            <div className="mb-12 p-6 bg-white border border-yellow-600 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Preparing Orders</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Total Items</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    order.order_status == 3 && (
                      <tr
                        key={order.id}
                        className="border-b border-red-200 cursor-pointer"
                        onClick={() => handleOpenModal(order, index)}
                      >
                        <td className="py-2 px-4">{order.username}</td>
                        <td className="py-2 px-4">{order.order_items.length}</td>
                        <td className="py-2 px-4">{order.amount}</td>
                        <td className="py-2 px-4">{order.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Ready Orders */}
            <div className="mb-12 p-6 bg-white border border-blue-600 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Ready Orders</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Total Items</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    order.order_status == 4 && (
                      <tr
                        key={order.id}
                        className="border-b border-red-200 cursor-pointer"
                        onClick={() => handleOpenModal(order, index)}
                      >
                        <td className="py-2 px-4">{order.username}</td>
                        <td className="py-2 px-4">{order.order_items.length}</td>
                        <td className="py-2 px-4">{order.amount}</td>
                        <td className="py-2 px-4">{order.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Completed Orders */}
            <div className="mb-12 p-6 bg-white border border-green-600 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Completed Orders</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="py-2 px-4 text-left">Username</th>
                    <th className="py-2 px-4 text-left">Total Items</th>
                    <th className="py-2 px-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) =>
                    order.order_status == 5 && (
                      <tr
                        key={order.id}
                        className="border-b border-red-200 cursor-pointer"
                        onClick={() => handleOpenModal(order, index)}
                      >
                        <td className="py-2 px-4">{order.username}</td>
                        <td className="py-2 px-4">{order.order_items.length}</td>
                        <td className="py-2 px-4">{order.amount}</td>
                        <td className="py-2 px-4">{order.paymentStatus}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Order Details */}
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg relative w-3/4 max-w-4xl">
                  <AiOutlineClose
                    className="absolute top-4 right-4 cursor-pointer"
                    onClick={handleCloseModal}
                    size={24}
                  />
                  {selectedOrder && (
                    <>
                      <h2 className="text-xl font-semibold mb-4">
                        Order ID: {selectedOrder.UID}
                      </h2>
                      <table className="w-full border-collapse mb-4">
                        <thead>
                          <tr className="border-b border-red-200">
                            <th className="py-2 px-4 text-left">Item</th>
                            <th className="py-2 px-4 text-left">Quantity</th>
                            <th className="py-2 px-4 text-left">Amount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Example expanded order details */}
                          {selectedOrder.order_items.map((item) => (
                            <tr className="border-b border-red-200">
                              <td className="py-2 px-4">{item.item}</td>
                              <td className="py-2 px-4">{item.quantity}</td>
                              <td className="py-2 px-4">₹{item.price}</td>
                            </tr>
                          ))}

                        </tbody>
                      </table>
                      <div className="mb-4">
                        <h3 className="text-lg font-semibold">
                          Customer Details
                        </h3>
                        <p>Name: {selectedOrder.username}</p>
                      </div>
                      <div className="flex space-x-4">
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                          onClick={() => moveOrder(3)}
                        >
                          Move to Preparing Orders
                        </button>
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                          onClick={() => moveOrder(4)}
                        >
                          Move to Ready Orders
                        </button>
                        <button
                          className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
                          onClick={() => moveOrder(5)}
                        >
                          Move to Completed Orders
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      }
    </div>
  );
}
