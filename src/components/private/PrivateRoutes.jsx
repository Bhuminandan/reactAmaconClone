import React, { useEffect } from 'react';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import PageLoader from '../loaders/PageLoader';
import { Outlet, useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {
    const navigate = useNavigate();
    const [user, loading, error] = useAuthState(auth);

    // Checking if the user is logged in
    // and redirecting to the login page 
    // Using useEffect here becase you cant redirect to the login page while redering the component
    useEffect(() => {
        if (!user || error) {
            navigate('/auth/login');
        }
    }, [user, error, navigate]);

    if (loading) {
        return <PageLoader />;
    }

    return <Outlet />;
};

export default PrivateRoutes;
