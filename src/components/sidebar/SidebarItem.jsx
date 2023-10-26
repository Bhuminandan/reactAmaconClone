import React from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { SlArrowRight } from 'react-icons/sl'
import { toggleSideMenu } from '../../redux/features/headerSlice'
import { useDispatch } from 'react-redux'

const SidebarItem = ({sideMenuObj}) => {


    const dispatch = useDispatch()

  return (
    <>
        <h3 className='text-lg font-semibold py-2'>{sideMenuObj.title}</h3>
        <div className='overflow-y-auto'>
                {
                sideMenuObj && sideMenuObj.items.map ((item) => {
                    return (
                    <li 
                    onClick={() => dispatch(toggleSideMenu())}
                    key={nanoid()} className='cursor-pointer font-normal py-2 my-2 text-sm px-4 rounded-lg hover:bg-zinc-200 transition-all duration-200 flex items-center justify-between'>
                        {item}
                        <SlArrowRight/>
                    </li>
                    )
                })
                }
        </div>
    </>
  )
}

export default SidebarItem