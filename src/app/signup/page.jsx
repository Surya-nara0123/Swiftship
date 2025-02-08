"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar.jsx";
import { CSpinner } from "@coreui/react";
import "@coreui/coreui/dist/css/coreui.min.css";
import { toast } from "sonner";

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
    mobile: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");

  // Function to check password strength
  const checkPasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length >= 8) {
      if (/[A-Z]/.test(password) && /\d/.test(password) && /[^A-Za-z0-9]/.test(password)) {
        strength = "Strong";
      } else if (/[A-Z]/.test(password) || /\d/.test(password)) {
        strength = "Medium";
      }
    }
    setPasswordStrength(strength);
  };

  const onSignup = async () => {
    if (passwordStrength === "Weak") {
      toast.error("Password is too weak! Use at least 8 characters, including a number, an uppercase letter, and a symbol.");
      return;
    }

    setIsLoading(true);

    const request = {
      name: user.username,
      email: user.email,
      mobile: Number(user.mobile),
      password: user.password,
    };

    const res = await fetch(
      "https://swiftshipbackend-production.up.railway.app/createnormaluser",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      }
    );

    const body = await res.json();
    setIsLoading(false);

    if (res.status !== 200) {
      toast.error("Signup failed. Please try again.");
      return;
    }

    toast.success("User created successfully");
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
            onChange={(e) => {
              setUser({ ...user, password: e.target.value });
              checkPasswordStrength(e.target.value);
            }}
            placeholder="Password"
          />
          <p className={`text-sm ${passwordStrength === "Weak" ? "text-red-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-green-500"}`}>
            {passwordStrength && `Password Strength: ${passwordStrength}`}
          </p>

          {!isLoading ? (
            <div
              className="p-2 m-2 bg-red-500 text-white rounded-2xl px-20 mt-5 cursor-pointer hover:bg-red-400"
              onClick={onSignup}
            >
              Sign up
            </div>
          ) : (
            <CSpinner
              color="primary"
              style={{ width: "4rem", height: "4rem" }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
