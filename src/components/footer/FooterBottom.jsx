import React from 'react'
import { bottomFooterData } from '../../data'

const FooterBottom = () => {
  return (
    <div className='border border-gray-700 bg-amazon_blue py-10 text-center'>
      <ul className='flex items-start justify-start gap-2 flex-wrap max-w-screen-lg m-auto'>
        {
          bottomFooterData && bottomFooterData.map((item) => {
            return (
              <li key={item.id} className='text-lightText text-xs p-2 m-2 headerHover flex flex-col items-start justify-start hover:underline'>
                <div className='font-semibold text-sm'>{item.title}</div>
                <div>{item.items[0]}</div>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default FooterBottom