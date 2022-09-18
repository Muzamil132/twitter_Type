import { useRouter } from 'next/router'
import React from 'react'

interface IProps{
    Icon:any
}





const BottomBarIcons = ({Icon}:IProps) => {
   
  return (
    <div>
        <Icon className="w-5 h-5  text-white" />
    </div>
  )
}

export default BottomBarIcons