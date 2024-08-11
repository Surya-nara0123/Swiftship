"use client";
import React from "react";
import Navbar from "../components/Navbar";
import {
  FaCheckCircle,
  FaCog,
  FaHourglassHalf,
  FaClipboardCheck,
} from "react-icons/fa";

export default function Page() {
  return (
    <div className="relative">
      <Navbar />
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
                  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md mb-12 text-center relative z-8">
                    <FaCheckCircle className="text-green-500 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Order placed</p>
                  </div>
                  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md mb-12 text-center relative z-8">
                    <FaCog className="text-yellow-500 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Preparing</p>
                  </div>
                  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md mb-12 text-center relative z-8">
                    <FaHourglassHalf className="text-blue-500 text-3xl mb-2" />
                    <p className="text-sm font-semibold">Ready for pickup</p>
                  </div>
                  <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md text-center relative z-8">
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
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md text-center relative z-8">
                  <FaCheckCircle className="text-green-500 text-3xl mb-2" />
                  <p className="text-sm font-semibold">Order placed</p>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md text-center relative z-8">
                  <FaCog className="text-yellow-500 text-3xl mb-2" />
                  <p className="text-sm font-semibold">Preparing</p>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md text-center relative z-8">
                  <FaHourglassHalf className="text-blue-500 text-3xl mb-2" />
                  <p className="text-sm font-semibold">Ready for pickup</p>
                </div>
                <div className="flex flex-col items-center bg-white p-4 rounded-lg shadow-md text-center relative z-8">
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
              Order ID: NVGN
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
                  {/* Example items */}
                  <tr className="border-b border-red-200">
                    <td className="py-2 px-2 sm:px-4 truncate">Item 1</td>
                    <td className="py-2 px-2 sm:px-4 truncate">₹10.00</td>
                    <td className="py-2 px-2 sm:px-4 truncate">2</td>
                    <td className="py-2 px-2 sm:px-4 truncate">₹20.00</td>
                  </tr>
                  <tr className="border-b border-red-200">
                    <td className="py-2 px-2 sm:px-4 truncate">Item 2</td>
                    <td className="py-2 px-2 sm:px-4 truncate">₹15.00</td>
                    <td className="py-2 px-2 sm:px-4 truncate">1</td>
                    <td className="py-2 px-2 sm:px-4 truncate">₹15.00</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>

            {/* Total amount, mode of payment, and transaction ID */}
            <div className="p-4 sm:p-6 bg-white border border-red-600 rounded-lg shadow-md">
              <div className="mb-3 sm:mb-4">
                <span className="font-semibold">Total Amount:</span> ₹35.00
              </div>
              <div className="mb-3 sm:mb-4">
                <span className="font-semibold">Mode of Payment:</span> Credit
                Card
              </div>
              <div>
                <span className="font-semibold">Transaction ID:</span>{" "}
                1234567890
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
