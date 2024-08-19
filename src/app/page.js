"use client"

import React, { useState, useEffect } from 'react'; // Add the missing import statement for React
import Navbar from './components/Navbar.jsx';
import Welcome from './components/Welcome.jsx';
import axios from 'axios';

export default function Home() {
  return (
    <div className='bg-white min-h-screen'>
      <Navbar/>
      <Welcome />
    </div>
  );
}
