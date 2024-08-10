"use client";
import React, { useEffect } from "react";
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

  const onLogin = async () => {
    console.log(user);
    const res = await axios.post("/api/login", user);
    console.log(res.data);
    const res1 = await axios.post("/api/setcookie", {
      username: user.username,
    });
    router.push("/dashboard");
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
          <div
            className="p-2 m-2 bg-red-500 text-white rounded-2xl px-20 mt-5 cursor-pointer hover:bg-red-400"
            onClick={onLogin}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
