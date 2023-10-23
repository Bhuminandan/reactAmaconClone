import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/features/productsSlice'
import PageLoader from '../loaders/PageLoader'
import ProductCard from './ProductCard'

const PoductsGallary = () => {
    
    
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.productsSlice)
    console.log(fetchedData);

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    if (fetchedData.isLoading) {
        return (
           <div className='flex items-center justify-center w-full h-full'>
                <PageLoader/>
           </div>
        )
    }

    if (fetchedData.error) {
        return (
        <div className='flex items-center justify-center w-full h-full'>
            {fetchedData.error}
        </div>
        )
    }

  return (
    <div className='w-full m-auto border h-full py-10 bg-gray-100'>
        <div className='max-w-screen-2xl m-auto flex flex-wrap justify-between gap-4 border'>
            {
                fetchedData.products && fetchedData.products.map((item) => {
                    return (
                        <ProductCard
                            key={item.id}
                            catagory={item.category}
                            description={item.description}
                            id={item.id}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                            title={item.title}
                        />
                    )
                })
            }
        </div>
    </div>
  )
}

export default PoductsGallary