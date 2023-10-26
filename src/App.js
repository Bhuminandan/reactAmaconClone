import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Cart from './components/Cart/Cart';
import Signup from './components/auth/Signup/Signup'
import Login from './components/auth/Login/Login';
import { Toaster } from 'react-hot-toast';
import PrivateRoutes from './components/private/PrivateRoutes';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './redux/features/userSlice';
import { errorToast } from './components/ToastFunctions';


function App() {

  const dispatch = useDispatch()

  // Checking if the user is logged in
  useEffect(() => {

    // onAuthStateChanged is firebase function to check if the user is logged in
    const unSubscribeAuth = onAuthStateChanged(auth, (user) => {

      // If the user is logged in
      if (user) {

        // Getting the user details
        // onsnapshot is a firebase function to get the user details from the database when the user is logged in
        const unsubscribeSnapshot = onSnapshot(
          doc(db, 'users', user.uid),
          (userDoc) => {
            // If the user is found
            if (userDoc.exists()) {
              const userData = userDoc.data();

              console.log(userData);

              // Saving the user details in the redux
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid,
                cartItems: userData.cartItems
              }));

            }
          },
          // Handling the error gracefully
          (error) => {
            console.log(error);
            errorToast('Something went wrong')
          }

        )

        // Cleanup function
        return () => {
          unsubscribeSnapshot()
        }

      }
    })

    return () => {
      unSubscribeAuth()
    }
  }, [dispatch])


  return (
    <div className='font-bodyFont w-screen min-h-screen'>
      <Toaster
        toastOptions={{
          success: {
            style: {
              background: 'white',
              color: 'black'
            },
          },
          error: {
            style: {
              background: 'white',
              color: 'black'
            },
          },
        }}
      />
      <Routes>

        {/* Auth routes */}
        <Route path='/auth' >
          <Route index element={<Signup />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoutes />} >
          <Route path='/' element={<Layout />} >
            <Route index element={<Home />} />
            <Route path='/cart' element={<Cart />} />
          </Route>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
