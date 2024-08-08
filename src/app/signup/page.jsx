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
    console.log(user);
    const res = await axios.post("/api/signup", user);
    console.log("User created successfully");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen gradient-bg-services">
        <div className="flex flex-col items-center justify-center white-glassmorphism p-6">
          <h1 className="text-white">Hello from Signup</h1>
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md text-white"
            type="text"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            placeholder="email"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md text-white"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md text-white"
            type="text"
            value={user.mobile}
            onChange={(e) => setUser({ ...user, mobile: e.target.value })}
            placeholder="mobile"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md text-white"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          <div
            className="p-2 m-2 bg-[#2952e3] rounded-md cursor-pointer hover:bg-[#2546bd]"
            onClick={onSignup}
          >
            Signup
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
