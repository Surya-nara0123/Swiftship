"use client";
import React from "react";
import Navbar from "../components/Navbar";

export default function Page() {
  return (
    <div>
      <Navbar />
      <div className="gradient-bg2 items-left justify-center">
        <div className="flex flex-col items-left justify-left min-h-screen pt-40 ml-10 pb-20">
          <h1 className="text-3xl lg:text-5xl font-bold">Your Profile</h1>
        </div>
      </div>
    </div>
  );
}
