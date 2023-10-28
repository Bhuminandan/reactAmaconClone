import React, { useState } from 'react'
import Input from '../../common/Input'
import logo from '../../../assets/amazonLogo.png'
import Button from '../../common/Button'
import { errorToast, successToast } from '../../ToastFunctions'
import toast from 'react-hot-toast'
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'
import { auth, db } from '../../../firebase'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { doc, setDoc } from 'firebase/firestore'
import { setUser } from '../../../redux/features/userSlice'
import PasswordInput from '../../common/PasswordInput'

const Signup = () => {


  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [isPrivacyPolicyChecked, setIsPrivacyPolicyChecked] = useState(false)

  const handleSignupSubmit = (e) => {

    e.preventDefault()

    // Form validations

    if (!name || !email || !password || !confirmPassword) {

      errorToast('Please fill all the fields', 2000);
      return;

    } else if (password.length < 8) {

      errorToast('Password must be at least 8 characters', 2000);
      return;

    } else if (password !== confirmPassword) {

      errorToast('Passwords password do not match', 3000);
      return;

    } else if(!isPrivacyPolicyChecked) {

      errorToast('Please accept the terms and conditions', 2000);
      return;

    }


    // Success toast
    toast.success('Creating account, please wait...', 3000)

    const handleSigup = async () => {

      setLoading(true);
      
      try {

        // Creating a new user
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

        const user = userCredentials.user;

        await sendEmailVerification(user);
        
        successToast('Please verify your email', 2000);

        // Storing user data in object
        const userData = {
          name: name,
          email: email,
          uid: user.uid,
          cartItems: []
        }
        
        // Adding user to database
        await setDoc(doc(db, 'users', user.uid), userData)

        // Setting the user in Redux store
        dispatch(setUser(userData))

        // Success toast
        successToast('Account created successfully', 1000);

        setLoading(false)
        
        // Redirecting to login
        navigate('/auth/login');
        
      } catch (error) {

        // Handling errors gracefully
        if(error.message === 'auth/email-already-in-use') {
          errorToast('Email already in use, try login', 1000);
          navigate('/auth/login');
        } else {
          console.log(error.message);
          errorToast('Something went wrong, Try again...', 1000);
        }

        setLoading(false)

      }
    }

    // Calling the handleSinup function
    handleSigup();

    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setIsPrivacyPolicyChecked(false)
    setLoading(false);
    
  }


  return (
    <div className='w-screen h-screen flex items-center justify-start md:mt-20 mt-10 px-5 flex-col pb-20'>

      <div className='w-32 mb-10'>
        <img src={logo} alt="amazonlogo" />
      </div>

      {/* Singup form */}
      <form
        onSubmit={handleSignupSubmit}
        className='flex flex-col items-start justify-start border gap-4 rounded-sm p-4 w-full px-10 md:w-1/3'>

        <h2 className='md:text-4xl text-2xl font-medeium py-5'>Create Acoount</h2>

        <div className='flex flex-col items-start justify-start w-full gap-1'>
          <h3 className='text-md font-medium'>Your Name</h3>
          <Input type='text' placeholder='your name' onChange={(e) => setName(e.target.value)} value={name} />
        </div>

        <div className='flex flex-col items-start justify-start w-full gap-1'>
          <h3 className='text-md font-medium'>Email</h3>
          <Input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>

        <div className='flex flex-col items-start justify-start w-full gap-1'>
          <h3 className='text-md font-medium'>Password</h3>
          <PasswordInput type='password' placeholder='Password...' onChange={(e) => setPassword(e.target.value)} value={password} />
        </div>

        <div className='flex flex-col items-start justify-start w-full gap-1'>
          <h3 className='text-md font-medium'>Confirm Password</h3>
          <PasswordInput type='password' placeholder='Confirm Password...' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
        </div>

        <div className='flex items-center justify-center w-full rounded-md border'>
          <Button btnText={'Create Account'} type='submit' isActive={loading}/>
        </div>

      </form>

      <div className='w-full flex items-center justify-center gap-4 pt-5'>
        <input onChange={() => setIsPrivacyPolicyChecked(!isPrivacyPolicyChecked)} checked={isPrivacyPolicyChecked} id='remember' type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        <label htmlFor="remember">Agree to our <span className='text-blue-500'>Terms and Conditions</span></label>
      </div>

      <div className='flex items-center justify-center mt-5 gap-2'>Already have an account? <span className='text-blue-500 hover:underline cursor-pointer'
      onClick={() => navigate('/auth/login')}
      >Login</span>
      </div>

      <div className='w-full flex items-center justify-center gap-2  pb-20'>
        Forgot Passward ? <span className='text-blue-500 hover:underline cursor-pointer'
        onClick={() => navigate('/auth/password-reset')}
        >Reset Password</span>
      </div>
      
    </div>
  )
}

export default Signup