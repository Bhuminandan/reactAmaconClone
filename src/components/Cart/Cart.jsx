import React from 'react'
import { useSelector } from 'react-redux'
import CartCardItem from './CartCardItem';
import { emptycart } from '../../assets';

const Cart = () => {

  let cartItems = useSelector(state => state.cartSlice.cartItems);

  let subtotal = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0).toFixed(2)

  return (
    <div
    className='flex items-start justify-between gap-2 md:flex-nowrap flex-wrap-reverse w-full h-full mt-36 px-10'
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
                                            rating={item.rating.rate}
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
                                    <h1 className='text-sm'>{cartItem.title.substring(0, 20)}...</h1>
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
            <button className='w-full py-2 text-center bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold'>Proceed to Checkout</button>
            </div>
    </div>
  )
}

export default Cart