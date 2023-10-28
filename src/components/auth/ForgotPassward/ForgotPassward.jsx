import React, { useState } from 'react'
import Input from '../../common/Input'
import Button from '../../common/Button'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../../firebase'
import { errorToast, successToast } from '../../ToastFunctions'
import { useNavigate } from 'react-router-dom'

const ForgotPassward = () => {

    const [loading, setLoading] = useState(false)
    const [email, setEamil] = useState('')

    const navigate = useNavigate();

    const handleResetButtonClick = async() => {

      // Sending passward reset link
        try {
            await sendPasswordResetEmail(auth, email);
            successToast('Password reset link sent to your email', 1000);
            successToast('Please check your email', 2000);
            setLoading(false)
            setTimeout(() => {
                navigate('/auth/login')
            }, 2000)
          } catch (err) {
            console.error(err);
            errorToast('Something went wrong', 2000);
            setLoading(false)
          }
          setEamil('')
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center px-5 flex-col pb-20'>
        <div className='w-96 flex flex-col items-start justify-start'>
            <h1 className='text-2xl font-bold mb-5'>Reset Password</h1>
            <div className='flex flex-col items-start justify-start w-full'>
                <p>Your email</p>
                    <Input type="email" placeholder="Email" value={email} onChange={(e) => setEamil(e.target.value)}/>
            </div>
            <div className='w-full flex items-center justify-center mt-4'>
                <Button btnText={'Send Reset Link'} type='submit' onClick={handleResetButtonClick} isActive={loading}/>
            </div>
        </div>
    </div>
  )
}

export default ForgotPassward