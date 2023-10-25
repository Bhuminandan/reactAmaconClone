import React from 'react'

const Button = ({btnText, onClick, type}) => {
  return (
    <button onClick={onClick} type={type} className='w-full py-2 bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400'>
      {btnText}
    </button>
  )
}

export default Button