import React, { useEffect, useState } from 'react'
import HomeCarousel from '../carousel/HomeCarousel'
import PoductsGallary from '../products/PoductsGallary'


const Home = () => {

  
  const [innerScreenWidth, setInnerScreenWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setInnerScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Getting the inner width of the window
    window.addEventListener('resize', handleResize);

    // Cleaning up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [innerScreenWidth]);

  return (
    <>
    {
      // If the screen width is less than 768px, then do not display the carousel
      innerScreenWidth < 768 ? <div className='mt-24'></div> :
      <HomeCarousel/>
    }
      <PoductsGallary/>
    </>
  )
}

export default Home