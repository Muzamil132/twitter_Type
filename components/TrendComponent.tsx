import { DotsHorizontalIcon } from '@heroicons/react/solid'
import React from 'react'


interface IProps{
 where:string,
 trend:string,
 tweets:number
}
const TrendComponent = ({where,trend,tweets}:IProps) => {
  return (
    <div className='cursor-pointer hover:bg-stone-700 py-1 overflow-y-auto px-3'>
    <div className="flex justify-between ">
      <span className="text-md text-gray-200 font-light ">
       {where}
      </span>
      <div className="h-8 w-8 flex  rounded-full items-center  justify-center hover:bg-black">
        <DotsHorizontalIcon className="w-6 text-gray-200 " />
      </div>
    </div>
    <div className="flex flex-col space-y-1">
      <p className="text-lg font-semibold text-white">{trend}</p>
      <span className="text-md text-gray-200 font-light ">
      {tweets}
      </span>
    </div>
  </div>
  )
}

export default TrendComponent
