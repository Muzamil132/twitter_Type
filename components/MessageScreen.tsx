import { FilmIcon, PhotographIcon } from '@heroicons/react/outline'
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { ModalImages } from './ModalImages';

interface IProps{
  messages:any
  chatId:string
}

const MessageScreen = ({messages,chatId}:IProps) => {

  const { data: session } = useSession();
 
  const currentId = session?.user.uid != undefined ? session?.user.uid : "";
  return (
    

      
    <div
    className='mt-[50px] py-1  h-[calc(100vh-98px)] overflow-y-auto  '
    >
     
      <div className='px-4'>
        {
          messages!== undefined && messages.map((message:any,id:any)=>(
            <div key={id} className={`w-full flex   ${currentId==message.currentId?"justify-end ":"justify-start"} `} >
              <div className={` mb-1   max-w-[80%] space-x-2  flex items-end`} >

               
            
                 {
                   message?.userImg? (
                    <Link
                        className='mt-1' 

                     href={{
                      pathname:`/chats/${chatId}/messageImage`,
                      query:{imageUrl:message?.userImg}

                     }}
                    >
                    <Image 
                    src={message?.userImg}
                    width={200}
                    height={250}
                    alt="name"
                    className="rounded-xl mt-1 cursor-pointer border-2 dark:border-dark-third"
                    objectFit="fill"
                    />
                    </Link>
                   ):
                 
                <p className={`${currentId==message.currentId?"bg-blue-500 text-white dark:text-white":"dark:bg-dark-second   bg-gray-100  text-black  dark:text-dtext1"} inline-block px-3 py-1 rounded-xl`}>  {message.msg}</p>
                 }
              </div>

              </div>
          ))
        }
      </div>
       </div>
    
  )
}

export default MessageScreen