import React from 'react'
import SmallLoader from '../loaders/SmallLoader'

const Button = ({btnText, onClick, type, isActive}) => {
  return (
    <button onClick={onClick} type={type} className='w-full py-2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400'>
      {!isActive ? btnText : <SmallLoader/>}
    </button>
  )
}

export default Button