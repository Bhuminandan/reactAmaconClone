import React, { useCallback, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/features/productsSlice'
import PageLoader from '../loaders/PageLoader'
import ProductCard from './ProductCard'

const PoductsGallary = () => {
    
    
    const dispatch = useDispatch()
    const fetchedData = useSelector(state => state.productsSlice)

    const [pageCount, setPageCount] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [products, setProducts] = useState([])

    
    const handlePagination = () => {

        let Limit = 8;
        let skip = Limit * currentPage;

        let numOfPages = Math.ceil(fetchedData.products.length / 8)
        setPageCount([...Array(numOfPages).keys()])
        setProducts(fetchedData.products.slice(skip, skip + Limit))
    }


    useEffect(() => {
        handlePagination();
    }, [fetchedData, currentPage])


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


    const handlePageClick = (event) => {
        const clickedPage = parseInt(event.target.textContent);
        setCurrentPage(clickedPage - 1);
    }

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNextClick = () => {
        if (currentPage < pageCount.length-1) {
            setCurrentPage(currentPage + 1)
        }
    }

  return (
    <div className='w-full m-auto border h-full py-10 bg-white px-5 flex flex-col items-start justify-between gap-2'>
        <div className='max-w-screen-2xl m-auto flex flex-wrap justify-between gap-4 border'>
            {
                products && products.map((item) => {
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
        <div className='w-full flex items-center justify-center py-4 px-5'>
            <div 
            onClick={handlePrevClick}
            className='flex items-center justify-center px-2 py-2 rounded-md bg-slate-100 cursor-pointer hover:scale-105 transition-all duration-300'>{'<'}</div>
            <div 
            onClick={handlePageClick}
            className='flex items-center justify-center px-2 py-2 rounded-md gap-2'>
                {
                    pageCount.length > 0 && pageCount.map((item, index) => {
                        return (
                            <div key={index + 1} className={`flex items-center justify-center px-2 py-2 rounded-md border  cursor-pointer hover:scale-105 transition-all duration-300 ${currentPage === index ? 'bg-yellow-300' : ''}`}>{index + 1}</div>
                        )
                    })
                }
            </div>
            <div 
            onClick={handleNextClick}
            className='flex items-center justify-center px-2 py-2 rounded-md bg-slate-100 cursor-pointer hover:scale-105 transition-all duration-300'>{'>'}</div>
        </div>
    </div>
  )
}

export default PoductsGallary