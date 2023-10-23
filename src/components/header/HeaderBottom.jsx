import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from './sidebar/Sidebar'
import { toggleSideMenu } from '../../redux/features/headerSlice'

const HeaderBottom = () => {


  let isSideMenuOpen = useSelector(state => state.headerSlice.isSideMenuOpen)
  const dispatch = useDispatch()

  return (
    <div className='relative'>
          <div className=' bg-amazon_light py-2 px-4 flex items-center justify-start gap-6 h-12 text-white'>

            {/* ************************ Bottom Header items ends ******************************* */}
                <div 
                onClick={() => dispatch(toggleSideMenu())}
                className='headerHover flex items-center gap-2'>

                  <GiHamburgerMenu  className='text-2xl cursor-pointer'/>
                  <div className='cursor-pointer text-sm'>All</div>

                </div>

                <div className='headerHover cursor-pointer text-sm hidden md:inline-block'>Electronics</div>
                <div className='headerHover cursor-pointer text-sm hidden md:inline-block'>Home & Kitchen</div>
                <div className='headerHover cursor-pointer text-sm hidden md:inline-block'>Beauty</div>
                <div className='headerHover cursor-pointer text-sm hidden md:inline-block'>Books</div>

                {/* ************************ Bottom Header items ends ******************************* */}


        </div>

        {/* ************************ Sidebar starts here ******************************* */}
        {
          isSideMenuOpen &&
          (
            <Sidebar/>
          )
        }

        {/* ************************ Sidebar ends here ******************************* */}

    </div>
  )
}

export default HeaderBottom