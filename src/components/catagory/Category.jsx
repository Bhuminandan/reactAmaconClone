import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CategoryItemCard from './CategoryItemCard';

const Category = ({category}) => {
  
    const [categoryItems, setcategoryItems] = useState([]);
    const products = useSelector(state => state.productsSlice.products);
    const currentProductId  =useSelector(state => state.productDetailsSlice.currentProduct.id);


  useEffect(() => {

    // Filter products by category
    setcategoryItems(products.filter((product) => {
      return product.category === category && product.id !== currentProductId;
    }));

  }, [products, category, currentProductId])


  return (

    <div className='flex items-start justify-evenly gap-4 flex-wrap'>
          {
            categoryItems.length !== 0 && categoryItems.map((categoryItem) => {
              return (
                <CategoryItemCard
                  key={categoryItem.id}
                  id={categoryItem.id}
                  title={categoryItem.title}
                  category={categoryItem.category}
                  image={categoryItem.image}
                  price={categoryItem.price}
                  description={categoryItem.description}
                  rating={categoryItem.rating}
                />
              )
            })
          }  
    </div>
  )
}

export default Category