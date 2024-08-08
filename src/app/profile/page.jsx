"use client";
import React from "react";
import NavbarLogin from "../components/NavbarLogin";
import { useState, useEffect } from "react";

export default function Page() {
  const [counter, setCounter] = useState(0);
  const [userName, setUserName] = useState("");
  const getUserName = async () => {  };
  useEffect(() => {
    // get the user name from the token using the get method from /api/me
    getUserName();

    const intervalId = setInterval(() => {
      // Increment the counter
      setCounter((prevCounter) => prevCounter + 1);
    }, 500); // Interval in milliseconds (e.g., 1000ms = 1 second)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);
  return (
    <div>
      <div>
        <NavbarLogin item={userName} />
        <div className="min-h-screen gradient-bg-footer">
          <div className="gradient-bg2 flex flex-col h-[500px] items-center justify-center">
            <h1 className="font-black text-3xl">Welcome {userName}</h1>
            <h1 className="font-bold text-1xl">
              See all tasks you are eligible for in this page
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
