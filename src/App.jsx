import { useState } from 'react'
import './App.css'
import { Home } from './components/home/Home'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from './components/signup/Login'
import { UpdateProfile } from './components/profile/UpdateProfile'
import { Modal } from './components/profile/Modal'
import { MobileChat } from './components/switch/MobileChat'
import {ToastContainer} from "react-toastify"
import { VerifiyOtp } from './components/signup/VerifiyOtp'
import { ForgotPass } from './components/signup/ForgotPass'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <ToastContainer position='bottom-right' />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat' element={<MobileChat />}  />
          <Route path='/verify-otp' element = { <VerifiyOtp /> } />
          <Route path='/chage-password' element={ <ForgotPass /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
