import { FilmIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react'

interface IProps{
  messages:any
}

const MessageScreen = ({messages}:IProps) => {

  const { data: session } = useSession();
 
  const currentId = session?.user.uid != undefined ? session?.user.uid : "";
  return (
    <div className='relative'>
      
    <div
    className='mt-[50px] h-[83vh] pb-3 overflow-y-auto  '
    >
      <div className='px-4'>
        {
          messages!== undefined && messages.map((message:any,id:any)=>(
            <div key={id} className={`w-full flex   ${currentId==message.currentId?"justify-end ":"justify-start"} `} >
              <div className={` mb-1   max-w-[80%] space-x-2  flex items-end`} >

                {
                  currentId!==message.currentId &&    <Image
          
                  height={25}
                  width={25}
                  src={message.senderImage}
                  alt="name"
                  className=" h-2 w-2 rounded-full -z-3 "
                />
                }
            

                <p className={`${currentId==message.currentId?"bg-blue-500 text-white dark:text-white":"dark:bg-dark-second   bg-gray-100  text-black  dark:text-dtext1"} inline-block px-3 py-1 rounded-xl`}>  {message.msg}</p>
              
              </div>

              </div>
          ))
        }
      </div>
       </div>
    </div> 
  )
}

export default MessageScreen