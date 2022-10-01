import { ChevronLeftIcon, EmojiSadIcon } from '@heroicons/react/outline';
import { ArrowCircleRightIcon, EmojiHappyIcon, FilmIcon, PhotographIcon, SearchIcon } from '@heroicons/react/solid'
import { addDoc, collection, doc ,getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import React ,{useRef,useState,useEffect}from 'react'
import { useRecoilState } from 'recoil';
import { useCurrentUserHook } from '../customeHooks/CurentUser';
import { db } from '../firebase';
import { currentChat } from '../store/atoms';

const MessageInputBox = () => {

  const { data: session } = useSession();
    const [activeSearch, setSearchActive] = useState<boolean>(false);
    const [existingChat,setExistingChat]=useRecoilState(currentChat)
    const [messageText,setMessageText] = useState("")
    const currentId = session?.user.uid != undefined ? session?.user.uid : "";
    const  senderImage = session?.user.image != undefined ? session?.user.image: "";
    const searchBox = useRef<HTMLDivElement>(null);
    const SearchResultBox = useRef<HTMLDivElement>(null);
    const [_,username]= useCurrentUserHook()
    useEffect(() => {
      console.log(existingChat)
   
      if (!activeSearch) return;
      function handleClick(event: any) {
        if (searchBox.current && !searchBox.current.contains(event.target)) {
          setSearchActive(false);
        }
      }
      window.addEventListener("click", handleClick);
      // clean up
      return () => window.removeEventListener("click", handleClick);
    }, [activeSearch]);


    async function addnewDoc(){
      await addDoc(collection(db,"Chats",existingChat?.conversationId
      ,"MyChats"),{
       
        senderImage,
        recieverId:existingChat?.recieverId,
         currentId,
        msg:messageText,
        timestamp:serverTimestamp()
        
      })

    }

    async function setNewDoc(){
      await setDoc(doc(db,"Chats" , existingChat.conversationId),{
        recieverId:existingChat.recieverId,
        sender:username,
        senderId:currentId,
        senderImage,
        reciever:existingChat.recieverName,
        recieverImage:existingChat.recieverImg,

        conversationId:existingChat.conversationId,
        timestamp: serverTimestamp()
  
  
      })
    }
    
   const SendMessage=async()=>{
   
    const docSnap = await getDoc(doc(db,"Chats", existingChat.conversationId));
    
    if(docSnap.exists()){
      addnewDoc()
      
      setMessageText("")

    }else{
    
      setNewDoc()
    
      addnewDoc()
  

  }



   

   }

  return (
    <div className=' absolute bottom-0 right-0 left-0 px-4 py-[0.4rem] dark:bg-dark-second bg-white flex space-x-2 items-center border-t dark:border-dark-third '>
      {
      !activeSearch?(
        <div className='flex space-x-2'>

       <PhotographIcon className='h-6 w-6 text-gray-900 dark:text-dtext1'/>
        <FilmIcon className='h-6 w-6 text-gray-900 dark:text-dtext1' />
        </div>
        ):(
          <ChevronLeftIcon className='w-6 text-gray-900 dark:text-dtext1 '   />
        )
}
        <div
              onClick={() => setSearchActive(true)}
              ref={searchBox}
              className={` dark:bg-dark-third bg-gray-100 border  flex-1 ${
                !activeSearch && "dark:border-[#18191a]"
              }  flex space-x-2 rounded-full py-[0.45rem] sm:py-2 px-5 ${
                activeSearch && "dark:border-gray-500 "
              }  `}
            >
              
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Start a new message"
                className="outline-none flex-1 text-black dark:text-white text-md sm:text-lg bg-transparent "
              />
              <EmojiSadIcon className="h-6 w-6 text-gray-900 dark:text-dtext1" />
            </div>
            <ArrowCircleRightIcon onClick={SendMessage}   className='w-6 h-6 text-gray-900 dark:text-dtext1' />

    </div>
  )
}

export default MessageInputBox