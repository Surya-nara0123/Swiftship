"use client";
import React from "react";
import Navbar from "../components/Navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen py-20 px-10 pt-40">
        <div className="flex flex-col items-left justify-left min-h-screen">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8">
            Vendor Onboarding
          </h1>
          <h1 className="text-m lg:text-l mb-8">
            Let's get you started on selling your items on SwiftShip!
          </h1>
          <div
            id="edit"
            className="p-6 bg-white border border-red-600 rounded-lg shadow-md"
          >
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Proprietor Name
                </label>
                <input
                  type="text"
                  id="pname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Shop Name
                </label>
                <input
                  type="text"
                  id="sname"
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
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700"
              >
                Apply
              </button>
            </form>
          </div>
          {/* Add a total amount text, followed by a mode of payment and transaction id text */}
        </div>
      </div>
    </div>
  );
}
