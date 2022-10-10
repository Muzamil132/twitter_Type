import { XIcon } from '@heroicons/react/outline'
import { useRouter } from 'next/router'
import React from 'react'

interface IProps{
    children:any
}

export const ModalImages = ({children}:IProps) => {

    const router= useRouter()
  return (
    <div className="absolute cursor-pointer  top-0 left-0 bottom-0 right-0 sm:top-1/3 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/3 min-h-[90%] z-50 dark:bg-dark-second bg-white sm:w-[60%] w-[100%]  sm:rounded-2xl shadow-xl  overflow-y-auto  ">
        <div className='relative'>

        
        <div onClick={()=>router.back()} className='absolute z-40  top-3 right-3 rounded-full w-10 h-10 dark:bg-dark-third bg-opacity-40 flex bg-gray-100 justify-center items-center '>
            <XIcon className=' tcolor  h-8 w-8'/>

        </div>
        </div>
      {children}
    </div>
  )
}
