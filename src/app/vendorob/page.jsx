"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Page() {
  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [phone, setPhone] = useState(false)
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    // //({
    //   vendor_name: name,
    //   sname: sname,
    //   phone: phone,
    //   email: email,
    //   address: address,
    //   business: business,
    // });

    //create a new vendor
    const res = await axios.post("https://swiftshipbackend-production.up.railway.app/addrestaurant", {
      vendor_name: name,
      name: sname,
      password: password,
      is_veg: phone,
      location: address,
    })

    if (res.status === 200) {
      window.location.href = "/login"
    } else {
      alert("Vendor creation failed");
    }

  }
  return (
    <div>
      <Navbar />
      <div className="bg-white min-h-screen py-20 px-10 pt-40">
        <div className="flex flex-col items-left justify-left min-h-screen">
          <h1 className="text-3xl lg:text-5xl font-bold mb-8">
            Vendor Onboarding
          </h1>
          <h1 className="text-m lg:text-l mb-8">
            {"Let's get you started on selling your items on SwiftShip!"}
          </h1>
          <div
            id="edit"
            className="p-6 bg-white border border-red-600 rounded-lg shadow-md"
          >
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Legal Business Name
                </label>
                <input
                  type="text"
                  value={sname}
                  onChange={(e) => setSname(e.target.value)}
                  id="pname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="name" className="block text-gray-700">
                  Vendor Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="sname"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700">
                  Are you a vegetarian vendor?
                </label>
                <input
                  type="checkbox"
                  checked={phone}
                  onChange={(e) => setPhone(e.target.checked)}
                  id="phone"
                  className="ml-2 px-3 py-2 border border-gray-300 rounded-md"
                />

              </div>
              <div>
                <label htmlFor="address" className="block text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  id="address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                onClick={handleSubmit}
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
