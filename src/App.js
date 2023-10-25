import { Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/layout/Layout';
import Home from './components/home/Home';
import Cart from './components/Cart/Cart';
import Signup from './components/auth/Signup/Signup'
import Login from './components/auth/Login/Login';
import { Toaster } from 'react-hot-toast';


function App() {

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
        <Route path='/auth' element={<Signup />} >
          <Route index element={<Signup />} />
          <Route path='signup' element={<Signup />} />
          <Route path='login' element={<Login />} />
        </Route>

        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart />} />
        </Route>

      </Routes>
    </div>
  );
}

export default App;
