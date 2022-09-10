import { PlusIcon, XIcon } from '@heroicons/react/outline'
import React from 'react'
import { signOut, useSession } from "next-auth/react";
import SidebarLink from './SidebarLink';
import { ItemsList } from './SidebarItemlist';
import { mobileSidebarState } from '../store/atoms'
import CreatePost from './CreatePost'
import { useRecoilState } from "recoil";
import SvgIcon from './SvgIcon';

export const MobileSideBar = () => {

const [isOpen,setOpen] =useRecoilState(mobileSidebarState)
    const {data:session} =useSession()
  return (

   <div className={`px-4  py-3 border-r border-gray-700 bg-black sm:hidden min-h-screen  block fixed  lef-0 top-0 z-20 w-[300px] ease-in-out duration-300 ${isOpen? "translate-x-0 " : "translate-x-full"}    `  } >
  
    <div className='flex items-center justify-between text-gray-400'>
     <h4 className='text-bold text-xl'>Account info</h4>
    
     <XIcon onClick={()=>setOpen(false)}  className='h-5 cursor-pointer' />
     
     </div>

     {/* profile Box */}

     <div className='flex items-center justify-between mt-8 text-gray-400'>
     <img
          src={session?.user.image}
          alt=""
          className="h-10 w-10 rounded-full"
        />

     <div className='h-8 w-8 rounded-full border-2 border-gray-400 flex items-center justify-center  '>
     <PlusIcon className='h-5' />
     </div>
     </div>

     {/* ProfileName Box  */}

     <div className='flex flex-col space-y-1 mt-6 '>
        <h4 className='text-bold text-lg text-white'>
        {session?.user.name}

        </h4>
        <span className='text-gray-400 text-sm'>
            {session?.user.tag}
        </span>


     </div>

     {/* Items Box  */}

     <div className='mt-4 mb-2 space-y-4'>
        {
          ItemsList.map((item,id)=>(
           
                <div key={id} className="space-x-3 text-gray-400 flex  ">
                 
                  <SvgIcon Icon={item.Icon}  />
                 <span  className=' text-sm xl:inline' >{item.text}</span>
                </div>


          ))
        }
      </div>
     

     


    
    </div>

  )
}
