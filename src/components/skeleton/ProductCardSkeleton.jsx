import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const ProductCardSkeleton = ({count}) => {
  return (
    <div className='w-96 h-96 flex flex-col items-start justify-start p-5 rounded-lg border'>
        <Skeleton count={count} enableAnimation={true}/>
    </div>
  )
}

export default ProductCardSkeleton