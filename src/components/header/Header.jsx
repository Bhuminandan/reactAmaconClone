import React from 'react'
import { indiaflag, logo } from '../../assets/index'
import { IoLocationSharp, IoSearch } from 'react-icons/io5'
import { IoMdArrowDropdown } from 'react-icons/io'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDropdown } from '../../redux/features/headerSlice'
import HeaderBottom from './HeaderBottom'


const Header = () => {


  const dispatch = useDispatch()

  // Getting the current state of isDropdownOpen
  const isDropdownOpen = useSelector(state => state.headerSlice.isDropdownOpen)


  return (
    <>
        <div className='w-full bg-amazon_blue text-white px-4 py-2 flex items-center justify-start gap-2 relative'>

            {/* ************************ Logo image starts here ******************************* */}
            <div className='headerHover flex items-center justify-center'>
              <img src={logo} alt="amazon logo" className='w-24'/>
            </div>
            {/* ************************ Logo image ends here ******************************* */}



            {/* ************************ Deliver starts here ******************************* */}
            <div className='headerHover flex-col w-24'>
              <p className='text-sm'>Deliver to</p>
              <div className='flex items-center transition-all duration-100 active:translate-y-1'>
                <IoLocationSharp className='text-md'/>
                <p className='text-sm ml-2'>India</p>
              </div>
            </div>
            {/* ************************ Deliver ends here ******************************* */}


            {/* ************************ Search starts here ******************************* */}
                <div className='flex items-center justify-start flex-grow rounded-lg overflow-hidden h-full'>
                    <div className='flex items-center bg-zinc-200 py-2 px-2 text-slate-800 cursor-pointer'
                            onClick={() => dispatch(toggleDropdown())}
                    >
                      <span>All </span><span><IoMdArrowDropdown/></span>                
                    </div>
                  <div className='h-full w-full'>
                    <input type="text"
                    className='bg-white outline-none border-none h-10 text-amazon_blue w-full px-2'
                    />
                  </div>
                  <div className='h-10 w-10 text-slate-600 py-2 flex items-center justify-center cursor-pointer bg-yellow-500 hover:bg-yellow-400 transition-all duration-200'>
                    <IoSearch className='duration-300 transition-all active:scale-105 text-xl'/>
                  </div>
                      {
                        isDropdownOpen && 
                        <div className='absolute w-full mt-10 -ml-8'>
                          <ul className='absolute flex flex-col bg-slate-100 p-4 text-slate-950 rounded-lg mt-1 shadow-lg'>
                            <li onClick={() => dispatch(toggleDropdown())} className='hover:bg-slate-200 rounded-lg transition-all duration-200 py-2 px-2 cursor-pointer'>Electronics</li>
                            <li onClick={() => dispatch(toggleDropdown())} className='hover:bg-slate-200 rounded-lg transition-all duration-200 py-2 px-2 cursor-pointer'>Home & Kitchen</li>
                            <li onClick={() => dispatch(toggleDropdown())} className='hover:bg-slate-200 rounded-lg transition-all duration-200 py-2 px-2 cursor-pointer'>Beauty</li>
                            <li onClick={() => dispatch(toggleDropdown())} className='hover:bg-slate-200 rounded-lg transition-all duration-200 py-2 px-2 cursor-pointer'>Books</li>
                            <li onClick={() => dispatch(toggleDropdown())} className='hover:bg-slate-200 rounded-lg transition-all duration-200 py-2 px-2 cursor-pointer'>Home & Kitchen</li>
                          </ul>
                        </div>
                      }
                </div>
            {/* ************************ Search ends here ******************************* */}

            {/* ************************ Language and country starts here ******************************* */}
                <div className='flex items-center justify-center gap-2 headerHover'>
                  <span>EN</span>
                  <img 
                    className='w-4'
                    src={indiaflag} alt="india flag" />
                    <IoMdArrowDropdown/>
                </div>
            {/* ************************ Language and country ends here ******************************* */}

            {/* ************************ Sign in starts here ******************************* */}
                <div className='flex flex-col items-start justify-start text-xs headerHover'>
                  <div >Hello, Sign in</div>
                  <div className='flex items-center text-sm font-semibold'>Account & Lists <IoMdArrowDropdown/></div>
                </div>
            {/* ************************ Sign in ends here ******************************* */}

            {/* ************************ Orders starts here ******************************* */}
                <div className='flex flex-col items-start justify-start text-xs headerHover'>
                  <div >Returns</div>
                  <div className='flex items-center text-sm font-semibold'>Orders <IoMdArrowDropdown/></div>
                </div>
            {/* ************************ Orders ends here ******************************* */}

            {/* ************************ Cart starts here ******************************* */}
                <div className='flex items-end justify-end text-xs headerHover relative'>
                  <div className='flex items-center font-semibold text-4xl'><AiOutlineShoppingCart/></div>
                  <div className='absolute top-0 right-8 p-1 px-2 bg-yellow-500 rounded-full'>0</div>
                  <div>Cart</div>
                </div>
            {/* ************************ Cart ends here ******************************* */}
        </div>

        {/* ************************ Header bottom starts here ******************************* */}
                <HeaderBottom/>
        {/* ************************ Header bottom ends here ******************************* */}
    </>
  )
}

export default Header;