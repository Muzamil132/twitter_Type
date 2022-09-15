import React from 'react'

interface IProps{
    Icon:any,
    color:string
}

const Icons = ({Icon,color}:IProps) => {
  return (
    <div className="h-8 w-8 flex  rounded-full items-center  justify-center mb-2   hover:bg-neutral-900">
            <Icon  className={`   w-5`}/>
   </div>
  )
}

export default Icons