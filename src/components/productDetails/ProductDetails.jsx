import React from 'react'
import { useSelector } from 'react-redux'

const ProductDetails = () => {


  const { catagory, description, id, image, price, rating, title } = useSelector(state => state.productDetailsSlice.currentProduct)


  console.log(catagory);
  console.log(description);
  console.log(image);
  console.log(id);
  console.log(price);
  console.log(rating);
  console.log(title);

  return (
    <div className='w-screen h-screen flex flex-col items-start justify-start gap-2 mt-40 md:px-10 px-5'>
        <div className='flex flex-col items-start justify-start gap-2'>
            <div className='flex items-start justify-start gap-2'>
                <div className='w-96 h-96 border rounded-lg p-10'>
                    <img src={image} className='w-full h-full object-contain' alt="productImg" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default ProductDetails