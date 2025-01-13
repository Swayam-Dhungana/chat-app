import React, { useEffect, useState } from 'react';
import { IoMdSettings } from "react-icons/io";
import { TbLogout } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import {Link, useNavigate} from "react-router-dom"
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const navigator=useNavigate()
  const handleLogout=()=>{
    localStorage.removeItem('auth-token')
    navigator('/login')
  }
  useEffect(()=>{
    if(!localStorage.getItem('auth-token')){
      setIsLoggedIn(false)
    }else{
      setIsLoggedIn(true)
    }
  },[navigator])
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
      <div className='flex gap-3'>
        <Link to='/settings'>
          <div className="flex items-center  bg-blue-600 text-white px-2 py-2 rounded-xl hover:bg-blue-500 hover:cursor-pointer">
            <IoMdSettings size={24} className="hover:text-purple-400 transition-all duration-200" />
            <p className="mx-2 font-bold">Settings</p>
          </div>
        </Link>
        <Link to='/profile' className={`${isLoggedIn?"":"hidden"}`}>
          <div className="flex items-center  bg-blue-600 text-white px-2 py-2 rounded-xl hover:bg-blue-500 hover:cursor-pointer">
            <CgProfile size={24} className="hover:text-purple-400 transition-all duration-200" />
            <p className="mx-2 font-bold">Profile</p>
          </div>
        </Link>
      <div className={`flex items-center  bg-blue-600 text-white px-2 py-2 rounded-xl hover:bg-blue-500 hover:cursor-pointer ${isLoggedIn?"":"hidden"}`} onClick={handleLogout}>
        <TbLogout size={24} className="hover:text-purple-400 transition-all duration-200" />
        <p className="mx-2 font-bold">Logout</p>
      </div>
    </div>
      </div>
  );
};

export default Navbar;
