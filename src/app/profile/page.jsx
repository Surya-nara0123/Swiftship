"use client";
import React from "react";
import Navbar from "../components/Navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen py-20 px-10 pt-40">
        <div className="flex flex-col items-left justify-left min-h-screen">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8">Your Profile</h1>

          <div
            id="orders"
            className="mb-12 p-6 bg-white border border-red-600 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
            <ul>
              {/* Example Order List */}
              <li className="border-b border-red-200 py-2">
                Order #1 -{" "}
                <a href="/track" className="text-gray-700 underline">
                  Details
                </a>
              </li>
              <li className="border-b border-red-200 py-2">
                Order #2 -{" "}
                <a href="/track" className="text-gray-700 underline">
                  Details
                </a>
              </li>
              {/* Add more orders as needed */}
            </ul>
            <button className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700">
              View Completed Orders
            </button>
          </div>

          <div
            id="edit"
            className="p-6 bg-white border border-red-600 rounded-lg shadow-md"
          >
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="username" className="block text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
