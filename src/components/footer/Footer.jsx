import React from 'react'
import FooterTop from './FooterTop'
import FooterMiddle from './FooterMiddle'
import FooterBottom from './FooterBottom'
import { useSelector } from 'react-redux'

const Footer = () => {

  const user = useSelector(state => state.userSlice.user)


  return (
    <>
    {
      // only showind footer if user is not logged in
      !user ?
     <FooterTop/>
     :
     <></>
    }
     <FooterMiddle/>
     <FooterBottom/> 
    </>
  )
}

export default Footer