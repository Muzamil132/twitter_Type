import { useRouter } from 'next/router'
import React from 'react'

interface IProps{
    Icon:any
}





const BottomBarIcons = ({Icon}:IProps) => {
   
  return (
    <div>
        <Icon className="w-7 h-7  text-white" />
    </div>
  )
}

export default BottomBarIcons