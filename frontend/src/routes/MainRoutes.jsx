import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import UserRegister from '../pages/user/UserRegister'
import Home from '../pages/Home'
import UserLogin from '../pages/user/UserLogin'
import PartnerLogin from '../pages/partner/PartnerLogin'
import PartnerRegister from '../pages/partner/PartnerRegister'
import PartnerHome from '../pages/PartnerHome'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<PartnerHome />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
    </Routes>
  )
}

export default MainRoutes