import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { Suspense, lazy, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { setUser } from './redux/features/userSlice';
import { errorToast } from './components/ToastFunctions';
import { setCartItems } from './redux/features/cartSlice';
import PageLoader from './components/loaders/PageLoader';

// import Layout from './components/layout/Layout';
// import Home from './components/home/Home';
// import Cart from './components/Cart/Cart';
// import Signup from './components/auth/Signup/Signup'
// import Login from './components/auth/Login/Login';
// import PrivateRoutes from './components/private/PrivateRoutes';
// import SuccessPayment from './components/afterPayment/SuccessPayment';
// import ProductDetails from './components/productDetails/ProductDetails';
// import FailPayment from './components/afterPayment/FailPayment';

const Layout = lazy(() => import('./components/layout/Layout'));
const Home = lazy(() => import('./components/home/Home'));
const Cart = lazy(() => import('./components/Cart/Cart'));
const Signup = lazy(() => import('./components/auth/Signup/Signup'));
const Login = lazy(() => import('./components/auth/Login/Login'));
const PrivateRoutes = lazy(() => import('./components/private/PrivateRoutes'));
const SuccessPayment = lazy(() => import('./components/afterPayment/SuccessPayment'));
const ProductDetails = lazy(() => import('./components/productDetails/ProductDetails'));
const FailPayment = lazy(() => import('./components/afterPayment/FailPayment'));



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

              dispatch(setCartItems(userData.cartItems))

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
    <Suspense fallback={<PageLoader />}>
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
              <Route path='/products/details/:id' element={<ProductDetails />} />
              <Route path='/success' element={<SuccessPayment />} />
              <Route path='/cencel' element={<FailPayment />} />
            </Route>
          </Route>

        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
