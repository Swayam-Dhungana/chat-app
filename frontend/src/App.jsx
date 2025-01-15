import React, { useEffect } from 'react'
import {  Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  const location=useLocation()
 const navigator=useNavigate();
 useEffect(()=>{
    const token=localStorage.getItem('auth-token')
    if(!token && location.pathname!="/signup"){
      navigator('/login')
    }
  }, [navigator])
  return (
    <div className='overflow-hidden'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage />}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App