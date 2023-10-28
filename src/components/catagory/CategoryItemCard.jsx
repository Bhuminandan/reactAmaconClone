import React from 'react'
import { AiFillStar } from 'react-icons/ai'
import Button from '../common/Button'
import { useDispatch } from 'react-redux';
import { setProductDetails } from '../../redux/features/productDetailsSlice';
import { useNavigate } from 'react-router-dom';

const CategoryItemCard = ({ id, title, category, image, price, rating, description }) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleViewDetails = () => {

        // Adding product details to redux store to access in product details page
        dispatch(setProductDetails({
            id,
            title,
            catagory: category,
            image,
            price,
            rating,
            description,
        }))

        // Navigating to product details page
        navigate(`/products/details/${id}`)
    }


  return (
    <div className='w-96 h-[500px] flex flex-col items-start justify-start p-5 rounded-lg border gap-2'>
        <div className='w-full h-72 flex items-center justify-center border py-4'>
            <img src={image} alt="igmg" className='w-full h-full object-contain'/>
        </div>
        <div className='flex flex-col items-start justify-start gap-2'>
            <h1 className='text-sm font-bold'>{title.substring(0, 30)}...</h1>
            <p className='text-xs text-gray-500'>{category}</p>
            <div className='flex items-center justify-start gap-4'>
                <div className='text-sm text-gray-500'>${price}</div>
                <div className='flex items-center justify-center gap-1'>
                    <div className='text-lg text-yellow-500'>{<AiFillStar/>}</div>
                    <p>{rating.rate}</p>
                </div>
            </div>
            <div className='w-44 mt-4'>
            <Button btnText='View Details' onClick={handleViewDetails}/>
            </div>
        </div>
    </div>
  )
}

export default CategoryItemCard