import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'

interface IProps{
  active:boolean | undefined
  Icon:any
  text:string
  href:string
 
}

const SidebarLink:NextPage<IProps> = ({Icon,text,active,href}) => {
  return (
    <Link href={href} >
    <div
    className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-lg space-x-3 hoverAn xl:ml-20 ${active && 'font-bold'   }`}
    >
  <Icon className=" h-7"/>
  <span  className='hidden xl:inline' >{text}</span>

        
    </div>
    </Link>
  )
}

export default SidebarLink