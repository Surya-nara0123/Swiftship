"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { AiOutlineClose } from "react-icons/ai";

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState({
    incoming: [
      {
        id: 1,
        items: "Pizza, Burger",
        quantity: 3,
        notes: "Extra cheese",
        amount: "₹500",
        paymentStatus: "Paid",
      },
      {
        id: 2,
        items: "Pasta",
        quantity: 2,
        notes: "No onions",
        amount: "₹300",
        paymentStatus: "Pending",
      },
    ],
    preparing: [],
    ready: [],
    completed: [],
  });

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const moveOrder = (status) => {
    if (!selectedOrder) return;

    // Remove the order from the current section
    setOrders((prevOrders) => {
      const updatedOrders = { ...prevOrders };
      const currentSection = Object.keys(updatedOrders).find((section) =>
        updatedOrders[section].find((o) => o.id === selectedOrder.id)
      );
      updatedOrders[currentSection] = updatedOrders[currentSection].filter(
        (order) => order.id !== selectedOrder.id
      );

      // Add the order to the new section
      updatedOrders[status].push(selectedOrder);

      return updatedOrders;
    });

    handleCloseModal();
  };

  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen py-20 px-10 pt-40">
        <div className="flex flex-col items-left justify-left min-h-screen">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8">
            Vendor Dashboard
          </h1>
          <h2 className="text-xl lg:text-2xl mb-8">Rishabh Food Court</h2>

          {/* Incoming Orders */}
          <div className="mb-12 p-6 bg-white border border-red-600 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Incoming Orders</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-red-200">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Items</th>
                  <th className="py-2 px-4 text-left">Total Items</th>
                  <th className="py-2 px-4 text-left">Notes</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.incoming.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-red-200 cursor-pointer"
                    onClick={() => handleOpenModal(order)}
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.items}</td>
                    <td className="py-2 px-4">{order.quantity}</td>
                    <td className="py-2 px-4">{order.notes}</td>
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
                <tr className="border-b border-yellow-200">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Items</th>
                  <th className="py-2 px-4 text-left">Total Items</th>
                  <th className="py-2 px-4 text-left">Notes</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.preparing.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-yellow-200 cursor-pointer"
                    onClick={() => handleOpenModal(order)}
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.items}</td>
                    <td className="py-2 px-4">{order.quantity}</td>
                    <td className="py-2 px-4">{order.notes}</td>
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
                <tr className="border-b border-blue-200">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Items</th>
                  <th className="py-2 px-4 text-left">Total Items</th>
                  <th className="py-2 px-4 text-left">Notes</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.ready.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-blue-200 cursor-pointer"
                    onClick={() => handleOpenModal(order)}
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.items}</td>
                    <td className="py-2 px-4">{order.quantity}</td>
                    <td className="py-2 px-4">{order.notes}</td>
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
                <tr className="border-b border-green-200">
                  <th className="py-2 px-4 text-left">Order ID</th>
                  <th className="py-2 px-4 text-left">Items</th>
                  <th className="py-2 px-4 text-left">Total Items</th>
                  <th className="py-2 px-4 text-left">Notes</th>
                  <th className="py-2 px-4 text-left">Amount</th>
                  <th className="py-2 px-4 text-left">Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.completed.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-green-200 cursor-pointer"
                    onClick={() => handleOpenModal(order)}
                  >
                    <td className="py-2 px-4">{order.id}</td>
                    <td className="py-2 px-4">{order.items}</td>
                    <td className="py-2 px-4">{order.quantity}</td>
                    <td className="py-2 px-4">{order.notes}</td>
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
                      Order ID: {selectedOrder.id}
                    </h2>
                    <table className="w-full border-collapse mb-4">
                      <thead>
                        <tr className="border-b border-red-200">
                          <th className="py-2 px-4 text-left">Item</th>
                          <th className="py-2 px-4 text-left">Quantity</th>
                          <th className="py-2 px-4 text-left">Notes</th>
                          <th className="py-2 px-4 text-left">Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        {/* Example expanded order details */}
                        <tr className="border-b border-red-200">
                          <td className="py-2 px-4">Pizza</td>
                          <td className="py-2 px-4">2</td>
                          <td className="py-2 px-4">Extra cheese</td>
                          <td className="py-2 px-4">₹200</td>
                        </tr>
                        <tr className="border-b border-red-200">
                          <td className="py-2 px-4">Burger</td>
                          <td className="py-2 px-4">1</td>
                          <td className="py-2 px-4">No onions</td>
                          <td className="py-2 px-4">₹150</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold">
                        Customer Details
                      </h3>
                      <p>Name: John Doe</p>
                      <p>Address: 123 Main Street</p>
                      <p>Phone: 123-456-7890</p>
                    </div>
                    <div className="flex space-x-4">
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
                        onClick={() => moveOrder("preparing")}
                      >
                        Move to Preparing Orders
                      </button>
                      <button
                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600"
                        onClick={() => moveOrder("ready")}
                      >
                        Move to Ready Orders
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
                        onClick={() => moveOrder("completed")}
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
    </div>
  );
}
