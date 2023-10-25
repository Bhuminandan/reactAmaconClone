import React, { useEffect, useRef } from 'react'
import { sidemenu } from '../../../data/index'
import SidebarItem from './SidebarItem';
import { nanoid } from '@reduxjs/toolkit';
import {RiAccountCircleFill} from 'react-icons/ri'
import { toggleSideMenu } from '../../../redux/features/headerSlice';
import { useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { motion } from 'framer-motion';
import { GoSignOut } from 'react-icons/go';
import { clearUser } from '../../../redux/features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { errorToast, successToast } from '../../ToastFunctions';
import { useNavigate } from 'react-router-dom';


const Sidebar = () => {

    const sideRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Toggle side menu on click of anywhere outside the side menu
    useEffect(() => {

        // Add event listener to body to detect clicks outside the side menu
        const bodyListener = document.body.addEventListener('click', (e) => {

            // checking if the event contains the sidebar, if so then toggling the sidemenu
            if (e.target.contains(sideRef.current)) {
                dispatch(toggleSideMenu())
            }
        })

        // Clean up
        return bodyListener;
    }, [sideRef, dispatch])


    const handleSignOut = async () => {
        try {

            // Clearing the user from the redux store
            dispatch(clearUser())

            // Making the side menu close
            dispatch(toggleSideMenu())

            // Sign out firebase auth
            signOut(auth)

            // Success toast
            successToast('Logged out successfully', 1000)

            navigate('/auth/login')
            
        } catch (error) {
            
            console.log(error)
            errorToast('Something went wrong', 1000)

        }

    }

  return (
    <div 
    className='w-full min-h-screen fixed top-0 left-0 bg-amazon_blue bg-opacity-60 text-amazon_blue z-10 flex items-start justify-start'>
            <motion.div // adding motion to the sidebar 
                ref={sideRef}
                className='h-full md:w-1/4 w-3/4 bg-white absolute'

                initial={{ x: -500, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -500, opacity: 0 }}
                transition={{ duration: 0.3 }}
                
                >
                <div className='flex items-center  bg-amazon_light justify-between h-16 py-2 px-6 gap-2'>
                    <div className='flex items-center justify-center gap-2'>
                    <RiAccountCircleFill className='text-4xl text-white'/>
                    <h3 className='text-xl text-white font-bold'>Hello, Sign In</h3>
                    </div>
                    <GoSignOut className='md:text-4xl text-2xl text-white cursor-pointer' onClick={handleSignOut}/>
                </div>
                <div
                    className='mt-4 px-5 h-full overflow-y-scroll'>
                            {
                                sidemenu && (
                                    sidemenu.data.map((sideMenuObj) => {
                                        return (
                                        <SidebarItem key={nanoid()} sideMenuObj={sideMenuObj}/>
                                        )
                                    })
                                )
                            }
                    <div 
                    onClick={() => dispatch(toggleSideMenu())}
                    className='absolute top-2 -right-14 cursor-pointer text-4xl p-2 rounded-full'>
                        <AiOutlineClose className='text-white'/>
                    </div>
                </div>
            </motion.div>
    </div>
  )
}

export default Sidebar