import React from 'react'
import Sidebar from './Sidebar'

const Layoute = ({children}:any) => {
  return (
    <div className='bg-black min-h-screen  mx-auto relative'>
        <Sidebar/>
        <div className=' text-white sm:ml-[80px] xl:ml-[330px] flex-grow   border-l min-h-screen border-gray-700 ' >
        {children}
        </div>
    </div>
  )
}

export default Layoute