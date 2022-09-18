import React from 'react'

interface IProps{
    Icon:any,
    color:string,
    isPostLiked?:boolean
}

const Icons = ({Icon,color,isPostLiked}:IProps) => {
  
  return (
    <div className="h-8 w-8 flex  rounded-full items-center  justify-center mb-2 sm:h-11 sm:w-11   hover:bg-neutral-900">
            <Icon  className={`    ${isPostLiked && color}   w-5 sm:w-5`}/>
   </div>
  )
}

export default Icons