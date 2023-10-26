import React from 'react'
import './pageloader.css'

const PageLoader = () => {
  return (
    <div className='flex items-center justify-center w-screen h-screen bg-opacity-50'>
        <span className="loader"></span>
    </div>
  )
}

export default PageLoader