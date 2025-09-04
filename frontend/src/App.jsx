import React from 'react'
import MainRoutes from './routes/MainRoutes'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <MainRoutes />
      <ToastContainer theme='dark' position="top-right" autoClose={3000} />
    </>
  )
}

export default App