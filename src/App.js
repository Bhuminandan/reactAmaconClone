import { Route, Routes } from 'react-router-dom';
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
import ForgotPassward from './components/auth/ForgotPassward/ForgotPassward';


// Importing components lazily
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

              // Saving the user details in the redux
              dispatch(setUser({
                name: userData.name,
                email: userData.email,
                uid: userData.uid,
                cartItems: userData.cartItems,
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

    // Suspense and lazy components
    <Suspense fallback={<PageLoader />}>

      <div className='font-bodyFont w-screen min-h-screen'>

        {/* Toast component */}
        <Toaster
          reverseOrder={true}
          gutter={8}
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

        {/* Routes */}
        <Routes>

          {/* Auth routes */}
          <Route path='/auth' >
            <Route index element={<Signup />} />
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='password-reset' element={<ForgotPassward />} />
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
