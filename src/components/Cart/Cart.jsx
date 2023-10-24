import React from 'react'
import { useSelector } from 'react-redux'
import CartCardItem from './CartCardItem';
import { emptycart } from '../../assets';

const Cart = () => {

  let cartItems = useSelector(state => state.cartSlice.cartItems);
  console.log(cartItems);

  return (
    <div
    className='flex items-center justify-between gap-2 md:flex-nowrap flex-wrap-reverse w-full h-full mt-36 px-10'
    >
            <div className='flex flex-col items-start justify-start gap-2 w-3/4 h-full'>

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
            <div className='flex flex-col w-1/4 h-full'>

            </div>
    </div>
  )
}

export default Cart