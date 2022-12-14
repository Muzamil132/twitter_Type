import React from 'react'
import {

    HomeIcon,
    InboxIcon,
 
   SearchIcon,
    UserIcon,
   
  } from "@heroicons/react/outline";
import BottomBarIcons from './BottomBarIcons';
import { useSession } from 'next-auth/react';
import { UserAddIcon } from '@heroicons/react/solid';

 
   const BottomBar=()=>{
 
const {data:session}=useSession()
 
  
const id =session?.user.uid !==undefined && session?.user.uid

  var bottomBarIcons=[
   
    {
        icon:HomeIcon,
        href:"/"
        
    },
    {
        icon:SearchIcon,
        href:"/SearchPage"
        
    },
    {
      icon:UserAddIcon,
      href:`/addUsers`

  },
    
    {
        icon:UserIcon,
        href:`/profile/${id}`

    },
    {
        icon:InboxIcon,
        href:"/chats"

    }
  ]
   


 
  return (
    <div className='dark:bg-dark-main bg-white fixed bottom-0 left-0 right-0 sm:hidden flex justify-between px-3 py-3 border-t dark:border-dark-third '>
     {bottomBarIcons.map((item,id)=>(
        <BottomBarIcons key={id} href={item.href} Icon={item.icon}/>
      ))
     }
    </div>
  )
}

export default BottomBar