import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Navigate, Route,Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import {Toaster} from 'react-hot-toast'
const App = () => {
  const {checkAuth,authUser,isCheckingAuth,onlineUsers}=useAuthStore()
  console.log({onlineUsers})
  useEffect(()=>{
    checkAuth()
  },[checkAuth])  

  if(isCheckingAuth && !authUser)return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className='size-10 animate-spin'/>
    </div>
  )
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser?<HomePage/>:<Navigate to={"/login"}/>}></Route>
        <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to={'/'}/>}></Route>
        <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to={'/'}/>}></Route>
        <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/settings' element={<SettingsPage/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  )
}

export default App