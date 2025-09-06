import React from 'react'
import { Route, Routes } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import UserRegister from '../pages/authUser/UserRegister'
import UserLogin from '../pages/authUser/UserLogin'
import PartnerRegister from '../pages/authPartner/PartnerRegister'
import PartnerLogin from '../pages/authPartner/PartnerLogin'
import PartnerDetails from '../pages/partner/PartnerDetails'
import PartnerHome from '../pages/partner/PartnerHome'
import CreateFood from '../pages/partner/create-video/CreateFood'

const MainRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner" element={<PartnerHome />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/partner/login" element={<PartnerLogin />} />
        <Route path="/partner/register" element={<PartnerRegister />} />
        <Route path="/partner/create-food" element={<CreateFood />} />
        <Route path="/food-partner/:id" element={<PartnerDetails />} />
    </Routes>
  )
}

export default MainRoutes