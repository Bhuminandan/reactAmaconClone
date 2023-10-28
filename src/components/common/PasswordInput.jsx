import React from 'react'
import { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'

const PasswordInput = ({type, placeholder, onChange, value}) => {

  // State to manage password visibility
  const [isPassVisible, setIsPassVisible] = useState(false)


  return (
    <div className='w-full flex items-center justify-between border pr-2' >
        <input 
        className='w-full p-2 rounded-sm outline-none'
        type={isPassVisible ? 'text' : type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
        {
          isPassVisible ? 
          // Hide password
              <AiFillEyeInvisible onClick={() => setIsPassVisible(false)} className='text-xl cursor-pointer text-slate-900'/>
              :
          // Show password
              <AiFillEye onClick={() => setIsPassVisible(true)} className='text-xl cursor-pointer text-slate-900'/>
        }
    </div>
  )
}

export default PasswordInput;