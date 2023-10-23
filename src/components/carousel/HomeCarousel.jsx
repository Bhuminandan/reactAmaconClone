import React, { useEffect, useState } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { bannerImgOne, bannerImgTwo, bannerImgThree, bannerImgFour, bannerImgFive, bannerImgSix, bannerImgSeven, bannerImgEight, bannerImgNine, bannerImgTen } from '../../assets';

const HomeCarousel = () => {

    const [innerScreenWidth, setInnerScreenWidth] = useState(window.innerWidth);

    const handleResize = () => {
      setInnerScreenWidth(window.innerWidth);
    };
  
    useEffect(() => {
      window.addEventListener('resize', handleResize);
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

  return (
    <div>
         <Carousel autoPlay={true}  centerSlidePercentage={100} centerMode={true} dynamicHeight={true} showArrows={false} showStatus={false} infiniteLoop={true} interval={3000} showThumbs={false}>
                <div>
                    <img src={ innerScreenWidth < 768 ? bannerImgSix : bannerImgOne} alt='firstbannerImg' />
                </div>
                <div>
                    <img src={ innerScreenWidth < 768 ? bannerImgSeven : bannerImgTwo} alt='secongbannerImg' />
                </div>
                <div>
                    <img src={ innerScreenWidth < 768 ? bannerImgEight : bannerImgThree} alt='thirdbannerImg' />
                </div>
                <div>
                    <img src={ innerScreenWidth < 768 ? bannerImgNine : bannerImgFour} alt='forthbannerImg' />
                </div>
                <div>
                    <img src={ innerScreenWidth < 768 ? bannerImgTen : bannerImgFive} alt='fifthbannerImg' />
                </div>
            </Carousel>
    </div>
  )
}

export default HomeCarousel