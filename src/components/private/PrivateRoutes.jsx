import React from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageLoader from '../loaders/PageLoader';
import { Navigate, Outlet } from 'react-router-dom';
import { errorToast } from '../ToastFunctions';

const PrivateRoutes = () => {

  // useAuthState returns an array of user and loading and error
  // useAuthState function comes from react-firebase-hooks
  const [user, loading, error] = useAuthState(auth); 

  // If loading then show page loader
  if (loading) {
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <PageLoader/>
        </div>
    )

  // If user is not logged in then redirect to login page
  } else if ( !user.emailVerified) {

    errorToast('Please verify your email first', 4000)
    return <Navigate to='/auth/login'/>


  } else if(!user || error) {

    // If user is not logged in then redirect to login page
    errorToast('Please login to continue', 1000)
    return <Navigate to='/auth/login'/>

  } else {

    // If user is logged in then return the outlet
    return <Outlet/>

  }
}

export default PrivateRoutes;
