import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useRecoilState } from 'recoil'
import { currentChat } from '../store/atoms'

interface IProps{
    sender:string,
    recieverId:string;
    senderId: string;
    recieverImage: string,
    senderImage:string,
    reciever:string,
    href:string,
}

const ChatComponent = ({reciever,recieverImage,href,sender,senderId,senderImage,recieverId}:IProps) => {
  const {data:session }=useSession()
  const [existingChat,setExistingChat]=useRecoilState(currentChat)
  const currentId= session?.user.uid!== undefined? session?.user.uid:""
  const router= useRouter()
  const {asPath}=router
 const chatHim=()=>{
  setExistingChat({
  myId:currentId,
  recieverName:reciever,
  recieverImage:recieverImage,
  conversationId:href,
  recieverImag:recieverImage,
  recieverId



  })
  router.push(`/chats/${href}`)
  

  

 }

  return (
   
    <div onClick={chatHim}  className={` ${href==existingChat.conversationId && asPath!=="/chats"  &&  "border-r-2 border-blue-400"} flex px-4 py-2 space-x-2 items-start cursor-pointer  `}>
    <div className="h-[2.5rem] w-[2.5rem] sm:w-[3rem] sm:h-[3rem] flex rounded-full ">
      <Image
        height={50}
        width={50}
        src={currentId==senderId?recieverImage:senderImage}
        alt="name"
        className=" h-11 w-11 rounded-full -z-3 "
      />
    </div>

    <div className="flex flex-col">
      <p className="text-sm sm:text-lg  font-semibold text-white">
        {currentId==senderId?reciever:sender}
      </p>
      <span className="text-sm sm:text-md text-gray-200 t ">
        You accepted the request
      </span>
    </div>
  </div>
 
  )
}

export default ChatComponent