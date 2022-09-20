import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface IProps{
    Icon:any,
    href:string
}





const BottomBarIcons = ({Icon,href}:IProps) => {
   
  return (
    <div>
        <Link href={href}  >
        
        <Icon className="w-6 h-6  text-white" />
        </Link>
    </div>
  )
}

export default BottomBarIcons