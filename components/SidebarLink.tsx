import { NextPage } from 'next'
import React from 'react'

interface IProps{
  active:boolean | undefined
  Icon:any
  text:string
  override?:boolean
}

const SidebarLink:NextPage<IProps> = ({Icon,text,active,override}) => {
  return (
    <div
    className={`text-[#d9d9d9] flex items-center justify-center xl:justify-start text-lg space-x-3 hoverAn xl:ml-24 ${active && 'font-bold'   }`}
    >
  <Icon className=" h-7"/>
  <span  className={`${!override } xl:inline`} >{text}</span>

        
    </div>
  )
}

export default SidebarLink