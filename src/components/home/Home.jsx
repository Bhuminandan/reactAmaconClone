import React, { useEffect, useState } from 'react'
import HomeCarousel from '../carousel/HomeCarousel'
import PoductsGallary from '../products/PoductsGallary'


const Home = () => {

  
  const [innerScreenWidth, setInnerScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [innerScreenWidth]);

  return (
    <>
    {
      innerScreenWidth < 768 ? <div className='mt-24'></div> :
      <HomeCarousel/>
    }
      <PoductsGallary/>
    </>
  )
}

export default Home