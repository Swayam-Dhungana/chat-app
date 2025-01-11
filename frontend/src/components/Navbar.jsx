import React from 'react';
import { IoMdSettings } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="h-[60px] w-full flex justify-between items-center bg-gradient-to-r from-purple-900 to-blue-900 shadow-md px-4">
      {/* Left Section: Logo and Name */}
      <div className="flex items-center">
        <img
          src="talk.avif"
          className="w-10 h-10 rounded-full mx-2 border-2 border-purple-400"
          alt="Logo"
        />
        <p className="tracking-widest text-xl font-bold text-purple-300">
          Talken
        </p>
      </div>

      {/* Right Section: Settings */}
      <div className="flex items-center text-purple-300">
        <IoMdSettings size={24} className="hover:text-purple-400 transition-all duration-200" />
        <p className="mx-2 font-bold">Settings</p>
      </div>
    </div>
  );
};

export default Navbar;
