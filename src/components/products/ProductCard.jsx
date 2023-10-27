import React, { useState } from 'react'
import {AiFillStar} from 'react-icons/ai'
import { useDispatch, useSelector} from 'react-redux';
import { addToCard } from '../../redux/features/cartSlice'
import { successToast } from '../ToastFunctions';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { setProductDetails } from '../../redux/features/productDetailsSlice';
import { useNavigate } from 'react-router-dom';



const ProductCard = ({ catagory, description, id, image, price, rating, title }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const user = useSelector(state => state.userSlice.user)
  
  const {rate, count} = rating;

  const handleCardClick = () => {

    const currentProdData = {
      catagory,
      description,
      id,
      image,
      price,
      rating,
      title,
      quantity : 1
    }

    dispatch(setProductDetails(currentProdData))

    navigate(`/products/details/${id}`)

  }

  const handleAddToCartClick = async (e) => {

    e.stopPropagation();

    successToast(`${title.substring(0, 10)}... added to cart`, 2000)

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

  return (
    <div 
    onClick={handleCardClick}
    className='w-full md:w-[350px] h-[460px] rounded-lg bg-white cursor-pointer hover:scale-[1.01] transition-all duration-100 flex flex-col items-center justify-start gap-4 border p-4 shadow-md'>
      <div className='w-full h-[250px] p-1'>
        <img src={image} alt={title} className='w-full h-[250px] object-contain border rounded-lg p-2'/>
      </div>
      <div className='flex flex-col items-start justify-between gap-2 w-full h-full'>
        <h1 className='text-sm font-bold'>{title}</h1>
        <p className='text-xs text-gray-500'>{description.substring(0, 50)}</p>
        <div className='flex items-center justify-between w-full'>
        <div className='text-sm text-gray-500'>${price}</div>
        <div className='flex items-center justify-center gap-1'>
          <div className='text-lg text-yellow-500'>{<AiFillStar/>}</div>
          <p className='text-sm text-gray-500'>{rate}</p>
          <p className='text-xs text-gray-500'>({count})</p>
        </div>
        </div>
         <button 
         onClick={handleAddToCartClick}
         className='bg-yellow-400 font-medium px-2 py-2 w-full rounded-lg hover:bg-yellow-500 text-amazon_blue'>
          {
            isAddedToCart ? 'Added to cart ✔' : 'Add to cart'
          }
         </button>
      </div>
    </div>
  )
}


export default ProductCard