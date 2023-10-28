import React from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  // Layout component

  return (
    <>
     <Header/>
        <Outlet/>
     <Footer/>
    </>
  )
}

export default Layout