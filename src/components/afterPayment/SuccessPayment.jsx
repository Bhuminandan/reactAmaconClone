import React from 'react'
import Button from '../common/Button'
import { useNavigate } from 'react-router-dom'

const SuccessPayment = () => {


  const navigate = useNavigate()

  return (
    <div className='flex flex-col gap-2 items-center justify-center w-screen h-screen'>
      <h1 className='text-2xl font-bold'>Success Payment</h1>
      <h2 className='text-xl font-bold'>Thank you for shopping with us!</h2>
      <div className='w-96 rounded-lg overflow-hidden'>
      <Button btnText='Continue Shopping' onClick={() => navigate('/')} />
      </div>
    </div>
  )
}

export default SuccessPayment