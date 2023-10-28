import React, { useEffect } from 'react'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import { setUser } from '../../redux/features/userSlice'

const SuccessPayment = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()


  const user = useSelector(state => state.userSlice.user)

  // Remove items from cart 
  const handleRemoveFromCart = async() => {
       
    const updatedUser = {
      ...user,
      cartItems: []
    }

    // Removing items from users firebase data
    await updateDoc(doc(db, 'users', user.uid), updatedUser)

    // Removing cart items from redux store

    dispatch(setUser(updatedUser));
  }

  useEffect(() => {
    handleRemoveFromCart()
  }, [])


  return (
    <div className='flex flex-col gap-2 items-center justify-center w-screen h-screen'>
      <h1 className='text-2xl font-bold'>Success Payment</h1>
      <h2 className='text-xl font-bold'>Thank you for shopping with us!</h2>
      <div className='w-96 rounded-lg overflow-hidden'>
        {/* Continue shopping button */}
      <Button btnText='Continue Shopping' onClick={() => navigate('/')} />
      </div>
    </div>
  )
}

export default SuccessPayment