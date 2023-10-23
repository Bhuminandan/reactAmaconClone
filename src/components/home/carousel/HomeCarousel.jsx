import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { bannerImgOne, bannerImgTwo, bannerImgThree, bannerImgFour, bannerImgFive } from '../../assets';

const HomeCarousel = () => {
  return (
    <div className='w-full'>
         <Carousel autoPlay={true} showArrows={false} showStatus={false} infiniteLoop={true} interval={3000} showThumbs={false}>
                <div>
                    <img src={bannerImgOne} alt='firstbannerImg' />
                </div>
                <div>
                    <img src={bannerImgTwo} alt='secongbannerImg' />
                </div>
                <div>
                    <img src={bannerImgThree} alt='thirdbannerImg' />
                </div>
                <div>
                    <img src={bannerImgFour} alt='forthbannerImg' />
                </div>
                <div>
                    <img src={bannerImgFive} alt='fifthbannerImg' />
                </div>
            </Carousel>
    </div>
  )
}

export default HomeCarousel