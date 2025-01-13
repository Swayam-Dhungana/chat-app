import React, { useContext, useEffect, useState } from 'react'
import { IoIosContacts } from "react-icons/io";
import UserContext from '../contexts/createContext';

const HomePage = () => {
  const [height, setHeight] = useState(`100vh`)
  const [creds, setCreds] = useState({username: "", profilePic:""})
  const [users, setUsers] = useState([])
  const {getUserData, getUsers}=useContext(UserContext)
  const renderMessage=async(id)=>{
    users.map((user)=>{
      if(user._id==id) {
        setCreds({username:user.username, profilePic:user.profilePic})
      }
    })
  }
  useEffect(()=>{    
    const navbarHeight = 60;
    setHeight(`calc(100vh - ${navbarHeight}px)`);
    getUserData().then((data)=>{
      setCreds({username: data.user.username, profilePic: data.user.profilePic})
    })
    getUsers().then((response)=>{
      console.log(response)
      setUsers(response);
    })
  },[])
  return (
    <div className='bg-gray-900 w-screen flex justify-center items-center' style={{height}}>
      {/* Card */}

      <div className='w-[90%] rounded-xl h-[90%] bg-gray-800 grid grid-cols-[30%_70%]'>
        
        {/* Contact Box */}
        <div className='border-r border-gray-400 m-3'>
          <div className='flex items-center'>
            <IoIosContacts className='size-10 mx-1'/>
            <p>Contacts</p>
          </div>
          <div>
            {users.map((data)=>{
              return <div className='flex items-center hover:cursor-pointer gap-3 mx-2 my-2 px-2 py-4 bg-gray-600 rounded-xl' onClick={()=>{renderMessage(data._id)}}>
              <img src={data.profilePic?data.profilePic:"default.webp"} alt="" className='rounded-full size-8' />
              <p>{data.username}</p>
            </div>
            })}
          </div>
        </div>

        {/* Message box */}
        <div>
          <div className='mt-2 flex items-center gap-2 underline hover:cursor-pointer'>
            <img src={creds.profilePic?creds.profilePic:"default.webp"} className='size-10 rounded-full' alt="" />
            <p>{creds.username?creds.username:"Hello User!"}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
