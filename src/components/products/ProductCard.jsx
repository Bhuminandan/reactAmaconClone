import React from 'react'
import {AiFillStar} from 'react-icons/ai'
const ProductCard = ({ catagory, description, id, image, price, rating, title }) => {
  
  const {rate, count} = rating;

  return (
    <div className='w-full md:w-[350px] h-[460px] rounded-lg bg-white cursor-pointer hover:scale-[1.01] transition-all duration-100 flex flex-col items-center justify-start gap-4 border p-4 shadow-xl'>
      <div className='w-full h-[250px] p-1'>
        <img src={image} alt={title} className='w-full h-full object-contain border rounded-lg p-2'/>
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
         <button className='bg-yellow-400 font-medium px-2 py-2 w-full rounded-lg hover:bg-yellow-500 text-amazon_blue'>
          Add to cart
         </button>
      </div>
    </div>
  )
}

export default ProductCard