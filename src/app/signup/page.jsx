"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

const Page = () => {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });

  const onSignup = async () => {
    // console.log(user);
    const request = {
      "name": user.username,
      "email": user.email,
      "mobile": Number(user.mobile),
      "user_type": 1,
      "password": user.password
    };
    const res = await fetch ("https://swiftshipbackend-production.up.railway.app/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const body = await res.json();
    if (res.status !== 200) {
      console.log(body);
      return;
    }
    console.log("User created successfully");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen gradient-bg-services">
        <div className="flex flex-col items-center justify-center white-glassmorphism p-6">
          <h1 className="text-black text-3xl py-5">Sign up</h1>
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md border-2"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md border-2"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="Username"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md border-2"
            type="text"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            placeholder="Phone Number"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md border-2"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="Password"
          />
          <div
            className="p-2 m-2 bg-red-500 text-white rounded-2xl px-20 mt-5 cursor-pointer hover:bg-red-400"
            onClick={onSignup}
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
