import { DotsHorizontalIcon } from '@heroicons/react/solid'
import React from 'react'


interface IProps{
 where:string,
 trend:string,
 tweets:number
}
const TrendComponent = ({where,trend,tweets}:IProps) => {
  return (
    <div className='cursor-pointer hover:dark:bg-dark-third hover:bg-gray-200 py-1 overflow-y-auto px-3'>
    <div className="flex justify-between ">
      <span className="text-md text-gray-800 dark:text-dtext1   ">
       {where}
      </span>
      <div className="h-8 w-8 flex  rounded-full items-center  justify-center hover:bg-black">
        <DotsHorizontalIcon className="w-6 text-gray-600 dark:text-dtext1 " />
      </div>
    </div>
    <div className="flex flex-col space-y-1">
      <p className="text-lg font-semibold text-back dark:text-dtext1">{trend}</p>
      <span className="text-md text-black dark:text-dtext1 ">
      {tweets}
      </span>
    </div>
  </div>
  )
}

export default TrendComponent
