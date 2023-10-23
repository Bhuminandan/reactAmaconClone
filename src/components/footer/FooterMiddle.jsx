import React from 'react'
import { middleFooterData } from '../../data/index'
import { nanoid } from '@reduxjs/toolkit';
import logo from '../../assets/logo.png';
import { AiOutlineGlobal } from 'react-icons/ai';
import { countriesData } from '../../data/index';

const FooterMiddle = () => {

  return (
    <div className='w-full md:pt-20 py-10 px-4 bg-amazon_light'>
      {/* ************** Middle Footer TOP starts here **************** */}
      <div className=' max-w-screen-xl m-auto flex-wrap flex-col md:flex-row flex items-start justify-center md:gap-20 text-white'>
        {
          middleFooterData && middleFooterData.map((item) => {
            return (
              <div key={nanoid()} className='flex flex-col items-start justify-start gap-2 mx-4 my-10'>
                <h5 className='font-semibold'>{item.title}</h5>
                {
                  item?.links && item.links.map((link) => {
                    return (
                      <p className='text-[14px] text-lightText cursor-pointer hover:text-white' key={nanoid()}>{link}</p>
                    )
                  })
                }
              </div>
            )
          })
        }
      </div>
      {/* ************** Middle Footer TOP ends here **************** */}

      {/* ************** Middle Footer BOTTOM starts here **************** */}
          <div className='flex flex-col md:my-20 m-auto'>
            <div className='flex md:w-96 w-64 items-center justify-between flex-wrap gap-5 m-auto my-10'>
              <img src={logo} alt="footerlogo" className='h-8'/>
              <div className='flex items-center gap-2 border py-2 px-2 text-white rounded-lg cursor-pointer'>
                <AiOutlineGlobal/>
                English
              </div>
            </div>
            <div className='mt-5 flex items-center justify-center gap-2 flex-wrap max-w-screen-lg m-auto'>
            {
              countriesData && countriesData.map((item) => {
                return (
                  <div key={item.id} className='text-lightText text-sm hover:underline cursor-pointer'>
                    {item.country}
                  </div>
                )
              })
            }
            </div>
          </div>
      {/* ************** Middle Footer BOTTOM ends here **************** */}
    </div>
  )
}

export default FooterMiddle