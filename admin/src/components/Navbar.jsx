import React from 'react'
import assets from '../assets/assets'

function Navbar({setToken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
        {/* Logout button */}
        {/* Here we make the token empty so that user going to logout automatically */}
        <button onClick={() => setToken('')}  className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default Navbar