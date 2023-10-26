import React from 'react'
import { Link } from 'react-router-dom'

const FooterTop = () => {
  return (
    <div className='my-4 border border-gray-300 py-10 text-center'>
      <div className=' flex flex-col text-xs items-center justify-center gap-2'>
          <p>
            See personalized recommendations
          </p>
          <button className='w-64 py-2 text-center bg-yellow-400 hover:bg-yellow-500 rounded-lg font-bold'>
            Sign in
          </button>
          <div>New customer ? <Link to='/auth/signup'>Start here</Link></div>
      </div>
    </div>
  )
}

export default FooterTop