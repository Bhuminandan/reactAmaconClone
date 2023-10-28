import React, { useState } from 'react'
import Input from '../../common/Input'
import PasswordInput from '../../common/PasswordInput'
import Button from '../../common/Button'
import logo from '../../../assets/amazonLogo.png'
import { errorToast, successToast } from '../../ToastFunctions'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/features/userSlice'
import { doc, getDoc } from 'firebase/firestore'

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignInSubmit = (e) => {

    e.preventDefault();
    setLoading(true)

    // Validations
    if (!email || !password) {
      errorToast('Please fill all the fields', 2000);
      setLoading(false)
      return;
    }

    successToast('Logging in, please wait...', 3000)

    const handleSignIn = async () => {

      // Handling signin
      try {


        // Getting user credentials
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user;


        // Getting user data
        const userDoc = await getDoc(doc(db, 'users', user.uid))
        const userData = userDoc.data();

        // Storing user data in object
        dispatch(setUser({
          name: userData.name,
          email: userData.email,
          uid: userData.uid,
          cartItems: []
        }))

        // Success toast
        successToast('Logged in successfully', 1000);

        setLoading(false)
        navigate('/')
        
      } catch (error) {
        
        console.log(error.message);

        if (error.message === 'Firebase: Error (auth/invalid-login-credentials).') {

          errorToast('User not found, try sign up...', 2000);
          navigate('/auth/signup')

        }

        errorToast('Something went wrong...', 3000)
        setLoading(false)

      }

    }

    setEmail('')
    setPassword('')
    handleSignIn()
  }

  return (
    <div className='w-screen h-screen flex items-center justify-start md:mt-20 mt-10 px-5 flex-col'>

    <div className='w-32 mb-10'>
      <img src={logo} alt="amazonlogo" />
    </div>

      {/* Login form */}
    <form
      onSubmit={handleSignInSubmit}
      className='flex flex-col items-start justify-start border gap-4 rounded-sm p-4 w-full px-10 md:w-1/3'>
          <h2 className='md:text-4xl text-2xl font-medeium py-5'>Login</h2>
          <div className='flex flex-col items-start justify-start w-full gap-1'>
            <h3 className='text-md font-medium'>Email</h3>
            <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
          </div>
          <div className='flex flex-col items-start justify-start w-full gap-1'>
            <h3 className='text-md font-medium'>Password</h3>
            <PasswordInput type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <div className='flex items-center justify-center w-full rounded-md border'>
            <Button btnText={'Login'} type='submit' isActive={loading}/>
          </div>
    </form>

    <div className='flex items-center justify-center mt-5 gap-2'>Don't have and account? <span className='text-blue-500 hover:underline cursor-pointer'
    onClick={() => navigate('/auth/signup')}
    >Signup</span>
    </div>

    <div className='w-full flex items-center justify-center gap-2  pb-20'>
        Forgot Passward ? <span className='text-blue-500 hover:underline cursor-pointer'
        onClick={() => navigate('/auth/password-reset')}
        >Reset Password</span>
    </div>

  </div>
  )
}

export default Login