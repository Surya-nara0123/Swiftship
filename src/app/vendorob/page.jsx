"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function Page() {
  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [business, setBusiness] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      name: name,
      sname: sname,
      phone: phone,
      email: email,
      address: address,
      business: business,
    });

    //create a new vendor
    const res = await axios.post("/api/createVendor", {
      name: name,
      sname: sname,
      phone: phone,
      email: email,
      address: address,
      business: business,
    })

    if (res.status === 200) {
      alert("Vendor created successfully");
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
            Let's get you started on selling your items on SwiftShip!
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
                  Name
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
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
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
                <label htmlFor="Business Type" className="block text-gray-700">
                  Business Type
                </label>
                <select
                  id="business"
                  value={business}
                  onChange={(e) => setBusiness(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="0" defaultValue>Select</option>
                  <option value="1">proprietorship</option>
                  <option value="2">partnership</option>
                  <option value="3">private_limited</option>
                  <option value="4">public_limited</option>
                  <option value="5">llp</option>
                  <option value="6">ngo</option>
                  <option value="7">trust</option>
                  <option value="8">society</option>
                  <option value="9">not_yet_registered</option>
                  <option value="10">huf</option>
                </select>
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
