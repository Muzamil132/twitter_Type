import React from 'react'

interface IProps{
    Icon:any,
    color:string,
    isPostLiked?:boolean
}

const Icons = ({Icon,color,isPostLiked}:IProps) => {
  
  return (
    <div className="h-8 w-8 flex  rounded-full items-center  justify-center mb-2 sm:h-11 sm:w-11 hover:bg-light2  hover:dark:bg-dark-third ">
            <Icon  className={`    ${isPostLiked? color:"dark:text-dtext1 text-gray-600"}   w-5 sm:w-5`}/>
   </div>
  )
}

export default Icons