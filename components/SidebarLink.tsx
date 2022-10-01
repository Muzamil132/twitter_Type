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
    className={`dark:text-dtext1 text-gray-900 font-bold flex items-center justify-center xl:justify-start text-lg space-x-3 hoverAn xl:ml-[3rem] ${active && 'font-bold'   }`}
    >
  <Icon className=" h-6"/>
  <span  className='hidden xl:inline text-md ' >{text}</span>

        
    </div>
    </Link>
  )
}

export default SidebarLink