import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { decreaseQuantity, increaseQuantity, removeFromCart } from '../../redux/features/cartSlice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'

const CartCardItem = ({title, description, price, rating, image, id, quantity}) => {


   const dispatch = useDispatch()
   const user = useSelector(state => state.userSlice.user)

   const handleRemoveFromCart = async() => {

    // Removing cart items from user data
    const updatedCart = user.cartItems.filter((item) => item.id !== id)
    await updateDoc(doc(db, 'users', user.uid), {
      cartItems : updatedCart
    })

    // Removing cart items from redux store
    dispatch(removeFromCart(id))

   }


  return (
    <div className='md:w-1/2 border lg:w-9/12 w-full flex flex-col lg:flex-row items-center justify-center gap-10 my-2 py-4 px-4 shadow-md cursor-pointer'>
        <div className='w-32 h-32 rounded-2xl'>
        <img src={image} className='w-full h-full rounded-2xl object-contain border' alt="cartprdimg" />
        </div>
        <div className='w-full flex flex-col items-start justify-between md:justify-start gap-2'>
            <h1 className='text-sm font-bold'>{title}</h1>
            <p className='text-xs text-gray-500'>{description.substring(0, 50)}</p>
            <div className='flex items-center justify-start gap-4 w-full'>
                <div className='text-sm text-gray-500'>${price}</div>
                <div className='flex items-center justify-center gap-1'>
                    <div className='text-lg text-yellow-500'>{<AiFillStar/>}</div>
                    <p>{rating}</p>
                </div>
            </div>
            <div className='flex items-center justify-between flex-wrap gap-2 w-full'>
                <div className='flex items-center justify-center gap-2'>
                    <span className='px-2 py-1 rounded-lg bg-gray-100'
                    onClick={() => dispatch(decreaseQuantity(id))}
                    >-</span>
                    <span className='px-4 py-1 rounded-lg border'>{quantity}</span>
                    <span className='px-2 py-1 rounded-lg bg-gray-100'
                    onClick={() => dispatch(increaseQuantity(id))}
                    >+</span>
                </div>
                <div className='text-sm text-red-500 bg-red-100 rounded-md py-1 px-2'
                    onClick={handleRemoveFromCart}
                >
                    Remove from Cart
                </div>
            </div>
        </div>
            
        <div>
        </div>
    </div>
  )
}

export default CartCardItem