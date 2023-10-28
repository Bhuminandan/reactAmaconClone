import React from 'react'

const Input = ({type, placeholder, onChange, value}) => {

  // Common input component
  return (
    <div className='w-full'>
        <input 
        className='w-full p-2 rounded-sm outline-yellow-500 border '
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        />
    </div>
  )
}

export default Input