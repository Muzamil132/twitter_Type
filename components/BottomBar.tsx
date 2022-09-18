import React from 'react'
import {

    HomeIcon,
    InboxIcon,
 
   SearchIcon,
    UserIcon,
   
  } from "@heroicons/react/outline";
import BottomBarIcons from './BottomBarIcons';

  var bottomBarIcons=[
    HomeIcon,
    SearchIcon,
   
 
   UserIcon,
   InboxIcon,
  ]


const BottomBar = () => {
  return (
    <div className='bg-black fixed bottom-0 left-0 right-0 sm:hidden flex justify-between px-3 py-2 border-t border-gray-700 '>
     {bottomBarIcons.map((icon,id)=>(
        <BottomBarIcons key={id} Icon={icon}/>
      ))
     }
    </div>
  )
}

export default BottomBar