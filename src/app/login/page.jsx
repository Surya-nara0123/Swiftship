"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";
import { cookies } from "next/headers.js";
import jwt from "jsonwebtoken";
import { CSpinner } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css'
// import 'bootstrap/dist/css/bootstrap.min.css'

const Page = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    const request = {
      name: user.username,
      password: user.password,
    };
    const res = await fetch("https://swiftshipbackend-production.up.railway.app/getuserbyusername", {
      method: "POST",
      headers: {
        
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const body = await res.json();
    if (res.status !== 200) {
      setLoading(false);
      console.log(body);
      return;
    }
    if (body.length === 0) {
      setLoading(false);
      console.log("User not found");
      return;
    }
    let userRes = body["user"];
    if (!userRes) {
      userRes = body["resturant"];
      const res1 = await axios.post("/api/login", {
        user: userRes,
      })
      console.log("logged in, restaurant: ", userRes.id);
      window.location.href = `/admin/${userRes.id}`;
      return;
    }
    const res1 = await axios.post("/api/login", {
      user: userRes,
    })
    console.log("logged in, user: ", userRes.id);
    // router.push(`/profile/${userRes.id}`);
    setLoading(false);
    window.location.href = `/profile/${userRes.id}`;
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen gradient-bg-services">
        <div className="flex flex-col items-center justify-center white-glassmorphism p-6">
          <h1 className="text-black text-3xl py-5">Log in</h1>
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md border-2"
            type="text"
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            placeholder="username"
          />
          <input
            className="p-2 m-2 gradient-bg-footer rounded-md border-2"
            type="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
            placeholder="password"
          />
          {
            !loading ?
              <div
                className="p-2 m-2 bg-red-500 text-white rounded-2xl px-20 mt-5 cursor-pointer hover:bg-red-400"
                onClick={onLogin}
              >
                Log in
              </div>
              :
              <CSpinner className="p-2 m-2 rounded-2xl px-20 mt-5 cursor-pointer" color="#00ff00"/>
          }
        </div>
      </div>
    </div>
  );
};

export default Page;
