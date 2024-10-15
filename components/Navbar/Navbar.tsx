import Image from 'next/image'
import React from 'react'
import Pakdropify from '@/public/pakdropify.png'
import { useContext } from 'react'

const Navbar: React.FC = () => {

  return (
    <nav className=' py-4 px-6'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Image src={Pakdropify} alt="Pakdropify Logo" width={100} height={100} />
        </div>
        <div className='space-x-4'>
          {/* <a href="#login" className='hover:text-blue-400 transition-colors' >Login</a>
          <a href="#signup" className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors'>Signup</a> */}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
