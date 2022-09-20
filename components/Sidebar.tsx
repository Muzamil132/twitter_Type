import { NextPage } from 'next'
import Image from 'next/image'
import React, { useRef } from 'react'
import  SidebarLink from './SidebarLink'
// import {Home} from "@heroicons/react/solid"
import {

  HashtagIcon,
  BellIcon,
  InboxIcon,
  BookmarkIcon,
  ClipboardListIcon,
  UserIcon,
  DotsCircleHorizontalIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { ItemsList } from './SidebarItemlist';
import { signOut, useSession } from "next-auth/react";

const Sidebar:NextPage = () => {
  
const {data:session} =useSession()
  return (
    <div
    className='hidden  sm:flex flex-col item-center lg:items-start xl:w-[320px] p-2 fixed h-full'
    >
      <div className='w-16 h-16    flex justify-center items-center hoverAn  p-0 sm:p-3 xl:ml-24'>
        <img src="https://rb.gy/ogau5a"alt ="twitter-logo"/>
       </div>
       <div className='mt-4 mb-1 space-y-2'>
        {
          ItemsList.map((item,id)=>(
            <SidebarLink  
            href={item.href}
            active={item.active}
            key={id}   
            text={item.text}
            Icon={item.Icon}
            />    

          ))
        }
      </div>
      <button className="hidden py-2 xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-56 h-[45px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
        Tweet
      </button>
      <div
        className="text-[#d9d9d9] flex items-center justify-center mt-auto hoverAn xl:ml-auto xl:-mr-5"
       
      >
        <img
          src={session?.user.image}
          alt=""
          className="h-8 w-8 rounded-full xl:mr-2.5"
        />
        <div className="hidden xl:inline leading-5">
          <h4 className="font-bold">{session?.user.name}</h4>
          <p className="text-[#6e767d] text-sm">{session?.user.tag}</p>
        </div>
        <DotsHorizontalIcon className="h-5 hidden xl:inline ml-10" />
      </div>
   
       
    </div>
  )
}

export default Sidebar