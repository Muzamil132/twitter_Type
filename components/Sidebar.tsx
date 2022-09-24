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
      <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-blue-400 dark:text-white"
                fill="currentColor"
              >
                <g>
                  <path
                    d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"
                  ></path>
                </g>
              </svg>
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