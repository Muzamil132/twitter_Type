import React from 'react'
import Sidebar from './Sidebar'

const Layoute = ({children}:any) => {
  return (
    <div className=' h-screen mx-auto relative'>
        <Sidebar/>
        <div className='h-screen sm:w-[calc(100%-330px)] w-full fixed text-white sm:ml-[80px] xl:ml-[330px] flex-grow   border-l  dark:border-dark-third ' >
        {children}
        </div>
    </div>
  )
}

export default Layoute