import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import CartCardItem from './CartCardItem';
import { emptycart } from '../../assets';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { errorToast, successToast } from '../ToastFunctions/index';


const Cart = () => {


  // Loading state for stripe
  const [loading , setLoading] = useState(false)

   // Get cart items from redux
  let cartItems = useSelector(state => state.cartSlice.cartItems);


  // Calculate subtotal
  let subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0).toFixed(2)



  const handleCheckOut = async () => {

    setLoading(true)

    // Handlign if someone tries to checkout with 0 items
    if (cartItems.length === 0) {
      errorToast('Your cart is empty')
      setLoading(false)
      return;
    }

    // Payment integration
    const stripe = await loadStripe(`${process.env.REACT_APP_PUBLISHER_KEY}`)

    // Creating object to send to backend
    const body = {
      items: cartItems,
      total: subtotal
    }

    // Creating headers
    const headers = {
      'Content-Type' : 'application/json'
    }

    const res = await axios.post('http://localhost:7000/checkout-create-session', body, { headers });

    // Storing session got from backend
    const session = res.data;

    // Redirecting user to stripe checkout
    const result  = await stripe.redirectToCheckout({
      sessionId: session.id
    })

    // Handling errors
    if (result.error) {

        setLoading(false)
        console.log(result.error.message)
        errorToast(result.error.message)

    } else {

        // Success toast
        successToast('Checkout successful', 1000)

    }

    setLoading(false);

  }

  return (
    <div
    className='flex items-start justify-between gap-2 md:flex-nowrap flex-wrap-reverse w-full h-full mt-36 px-10 pb-20 md:pb-40'
    >
            <div className='flex flex-col items-start justify-start gap-2 md:w-2/3 w-full h-full mb-5'>
                <div>
                    <h1 className='text-2xl font-bold'>Shopping Cart</h1>
                </div>
                {
                    cartItems.length !== 0 ?
                        <div className='w-full h-full'>
                        {
                            cartItems && cartItems.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <CartCardItem 
                                            id={item.id}
                                            image={item.image}
                                            title={item.title}
                                            price={item.price}
                                            rating={item.rating?.rate}
                                            description={item.description}
                                            quantity={item.quantity}
                                        />
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <div className='w-full h-full flex items-center justify-center border self-center'>
                        <img src={emptycart} alt="empty cart"  className='w-96'/>
                    </div>
                }
            
            </div>
            <div className='flex flex-col md:w-1/4 w-full h-full'>
                <div>
                    <h1 className='text-2xl font-bold mb-4'>Cart</h1>
                </div>
                <div className='w-full h-full p-10 flex flex-col items-start justify-start gap-4 bg-slate-100 rounded-lg mb-10'>
                    {
                        cartItems.map((cartItem) => {
                            return (
                                <div key={cartItem.id} className='w-full flex items-center justify-between gap-10'>
                                    <h1 className='text-sm'>{cartItem?.title?.substring(0, 20)}...</h1>
                                    <h1 className='text-sm  font-bold'>${cartItem.price}</h1>
                                </div>
                            )
                        })
                    }
                <div className='w-full h-[1px] bg-gray-400'></div>
                <div className='flex items-center justify-between w-full'>
                    <div>Sub total: </div>
                    <div className='text-lg font-semibold'>${subtotal}</div>
                </div>
                </div>
            <button 
                    onClick={handleCheckOut}
                    disabled={loading}
                    className={`w-full py-2 text-center ${loading ? 'bg-gray-400 hover:bg-gray-500' : 'bg-yellow-500 hover:bg-yellow-600'} rounded-lg font-bold`}>{loading ? 'Redirecting to payment...' : 'Proceed to Checkout'}</button>
            </div>
    </div>
  )
}

export default Cart