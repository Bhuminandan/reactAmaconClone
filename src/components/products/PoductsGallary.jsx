import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/features/productsSlice'
import PageLoader from '../loaders/PageLoader'
import ProductCard from './ProductCard'
import ProductCardSkeleton from '../skeleton/ProductCardSkeleton'
import { SkeletonTheme } from 'react-loading-skeleton'

const PoductsGallary = () => {
    
    
    const [pageCount, setPageCount] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [products, setProducts] = useState([])

    const dispatch = useDispatch()

    // getting products
    const fetchedData = useSelector(state => state.productsSlice)


    
    const handlePagination = () => {

        // showing 8 products per page
        let Limit = 8;

        // calculating skip
        let skip = Limit * currentPage;

        // calculating number of pages
        let numOfPages = Math.ceil(fetchedData.products.length / 8)

        // updating page count
        setPageCount([...Array(numOfPages).keys()])

        // updating products
        setProducts(fetchedData.products.slice(skip, skip + Limit))

    }


    // Useeffct for pagination
    useEffect(() => {
        handlePagination();
    }, [fetchedData, currentPage])


    // fetching products
    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch])

    // loading
    if (fetchedData.isLoading) {
        return (
           <div className='flex items-center justify-center w-full h-full'>
                <PageLoader/>
           </div>
        )
    }

    // error
    if (fetchedData.error) {
        return (
        <div className='flex items-center justify-center w-full h-full'>
            {fetchedData.error}
        </div>
        )
    }


    // pagination
    const handlePageClick = (event) => {
        const clickedPage = parseInt(event.target.textContent);
        setCurrentPage(clickedPage - 1);
    }

    // prev
    const handlePrevClick = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    // next
    const handleNextClick = () => {
        if (currentPage < pageCount.length-1) {
            setCurrentPage(currentPage + 1)
        }
    }

  return (
    <div className='w-full m-auto border h-full py-10 bg-white px-5 flex flex-col items-start justify-between gap-2'>
        <div className='max-w-screen-2xl m-auto flex flex-wrap justify-between gap-4'>
            {
                products === 0 ?
                // showing skeleton
                    <SkeletonTheme baseColor='#e0e0e0' highlightColor='#f5f5f5' width={340} height={340} inline borderRadius={5}>
                            <ProductCardSkeleton count={1}/>
                            <ProductCardSkeleton count={1}/>
                            <ProductCardSkeleton count={1}/>
                            <ProductCardSkeleton count={1}/>
                            <ProductCardSkeleton count={1}/>
                            <ProductCardSkeleton count={1}/>
                    </SkeletonTheme>

                :
                // showing products 
                products.map((item) => {
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