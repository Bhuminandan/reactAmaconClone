import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiFillStar } from 'react-icons/ai'
import { increaseQuantity, decreaseQuantity, addToCard } from '../../redux/features/cartSlice'
import { useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase'
import {errorToast} from '../ToastFunctions/index'
import Category from '../catagory/Category'

const ProductDetails = () => {

  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.userSlice.user);
  const currentProduct = useSelector(state => state.productDetailsSlice.currentProduct);
  const cartItems = useSelector((state) => state.cartSlice.cartItems);
  const quantity = cartItems.find((item) => item.id === currentProduct.id)?.quantity || 0;


  useEffect(() => {

    if (!currentProduct) {
      navigate('/');
    }
  }, [currentProduct, navigate]);

  if (!currentProduct) {
    return null; 
  }

  const { catagory, description, id, image, price, rating, title } = currentProduct;


  const handleAddToCart = async() => {

    // Adding the product to the cart
    let userData;

    if (user.cartItems.some((item) => item.id === id)) {

      userData = {
        ...user,
          cartItems : [
            ...user.cartItems.map((item) => {
              return item.id === id ? {...item, quantity : item.quantity + 1} : item
            })
          ]
    }
      
    } else {
      userData = {
        ...user,
        cartItems : [
          ...user.cartItems,
          {
              id,
              title,
              catagory,
              description,
              image,
              price,
              rating,
              quantity : 1
          }
        ]
      }
    }

    // Adding user to database
    await updateDoc(doc(db, 'users', user.uid), userData)


    dispatch(addToCard({
      id,
      title,
      catagory,
      description,
      image,
      price,
      rating,
      quantity : 1,
    }))

    setIsAddedToCart(true);
  }

  const handleDecreaseQuantity = () => {
    if (user.cartItems.some((item) => item.id === id)) {
      dispatch(decreaseQuantity(id))
    } else {
      errorToast('Item not added to cart')
    }
  }

  const handleIncreaseQuantity = () => {
    if (user.cartItems.some((item) => item.id === id)) {
      dispatch(increaseQuantity(id))
    } else {
      errorToast('Item not added to cart')
    }
  }




  return (
    <div className='w-screen min-h-screen flex flex-col items-start justify-start gap-2 md:mt-40 mt-32 md:px-10 px-5 pb-20'>
        <div className='flex flex-col items-start justify-start gap-2 mt-10'>
            <div className='flex md:flex-row flex-col items-start md:justify-center justify-start flex-wrap gap-2 md:px-20 px-5'>
                <div className='flex-1 rounded-lg p-10'>
                    <img src={image} className='w-1/2 h-2/w-1/2 object-contain' alt="productImg" />
                </div>
                <div className='flex-1 flex flex-col items-start justify-start gap-5'>
                    <h1 className='text-2xl font-bold'>{title}</h1>
                    <p className='text-sm text-gray-200 p-1 bg-black rounded-full px-2'>{catagory}</p>
                    <p className='text-sm text-gray-500'>{description}</p>
                    <div className='flex items-center justify-start gap-4 w-full'>
                        <div className='text-sm text-gray-500'>${price}</div>
                        <div className='flex items-center justify-center gap-1'>
                            <div className='text-lg text-yellow-500'>{<AiFillStar/>}</div>
                            <p>{rating.rate}</p>
                        </div>
                    </div>
                    <div className='flex items-center justify-between flex-wrap gap-2 w-full'>
                        <div className='flex items-center justify-center gap-2 mb-10'>
                            <span className='px-2 py-1 rounded-lg bg-gray-100 cursor-pointer'
                            onClick={handleDecreaseQuantity}
                            >-</span>
                            <span className='px-4 py-1 rounded-lg border'>{quantity}</span>
                            <span className='px-2 py-1 rounded-lg bg-gray-100 cursor-pointer'
                            onClick={handleIncreaseQuantity}
                            >+</span>
                        </div>
                        {
                          !isAddedToCart ? 
                          <Button btnText='Add to cart' onClick={handleAddToCart}/>
                          :
                          <Button btnText='Go to cart' onClick={() => navigate('/cart')}/>
                        }
                    </div>
                </div>
            </div>
        </div>
        <div className='w-full'>
          <h2 className='text-2xl font-bold my-10'>Similar Products</h2>
          <Category category={catagory}/>
        </div>
    </div>
  )
}

export default ProductDetails