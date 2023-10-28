import React, { useEffect } from 'react'

const FailPayment = () => {

  // Redirect to home page after 3 seconds of payment fail
  useEffect(() => {

    setTimeout(() => {
      window.location.href = '/'
    }, 3000)

  }, [])


  return (
    <div className='flex items-center justify-center w-full h-full'>
      <h1 className='text-2xl font-bold'>Payment Failed, redirecting you the cart, please try again...</h1>
    </div>
  )
}

export default FailPayment