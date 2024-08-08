import React from 'react'; // Add the missing import statement for React
import Navbar from './components/Navbar.jsx';
import Welcome from './components/Welcome.jsx';

export default function Home() {
  return (
    <div className='bg-black min-h-screen'>
      <Navbar />
      <Welcome />
    </div>
  );
}
