import { NextPage } from 'next'
import React from 'react'

interface IProps{
  active:boolean | undefined
  Icon:any
  text:string
 
}

const SidebarLink:NextPage<IProps> = ({Icon,text,active}) => {
  return (
    <div
    className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-lg space-x-3 hoverAn xl:ml-20 ${active && 'font-bold'   }`}
    >
  <Icon className=" h-7"/>
  <span  className='hidden xl:inline' >{text}</span>

        
    </div>
  )
}

export default SidebarLink