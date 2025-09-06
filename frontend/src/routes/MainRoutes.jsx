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
import Cookies from 'js-cookie';

const MainRoutes = () => {
  const token = Cookies.get('token');
  return (
    <Routes>
      <Route
        path="/"
        element={token ? <Home /> : <UserLogin />}
      />
      <Route
        path="/partner"
        element={token ? <Home /> : <PartnerLogin />}
      />
      <Route
        path="/user/register"
        element={!token ? <UserRegister /> : <Home />}
      />
      <Route
        path="/user/login"
        element={!token ? <UserLogin /> : <Home />}
      />
      <Route
        path="/partner/login"
        element={!token ? <PartnerLogin /> : <Home />}
      />
      <Route
        path="/partner/register"
        element={!token ? <PartnerRegister /> : <Home />}
      />
      <Route
        path="/partner/create-food"
        element={token ? <CreateFood /> : <PartnerLogin />}
      />
      <Route
        path="/food-partner/:id"
        element={token ? <PartnerDetails /> : <PartnerLogin />}
      />
    </Routes>
  )
}

export default MainRoutes