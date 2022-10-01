import React, { useRef, useEffect, useState } from "react";
import Layoute from "../../components/Layoute";
import SvgIcon from "../../components/SvgIcon";
import {
  ChatIcon,
  CogIcon,
  InboxInIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { InboxIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { collection, DocumentData, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useCurrentUserHook } from "../../customeHooks/CurentUser";
import { db } from "../../firebase";
import Loader from "../../components/Loader";
import { useRecoilState } from "recoil";
import { currentChat } from "../../store/atoms";
import ChatComponent from "../../components/ChatComponent";

interface IProps{
recieverImg:string;
recieverName:string;
children:any
}



  const Index = ({children,recieverImg,recieverName}:IProps) => {
  const IconArray = [ChatIcon, CogIcon];
  const { data: session } = useSession();
  const imageUrl = session?.user.image != undefined ? session?.user.image : "";
  const [activeSearch, setSearchActive] = useState<boolean>(false);
  const currentId= session?.user.uid!== undefined? session?.user.uid:""
  const {pathname,asPath} =useRouter()
  console.log(pathname)
  const searchBox = useRef<HTMLDivElement>(null);
  const SearchResultBox = useRef<HTMLDivElement>(null);
  const [Chats,setChats]=useState<any>()
  const [loading,setLoading]=useState<boolean>(false)
  
  const [MyChats,setMyChats]=useState<any>()
  const [AllChats,setAllChats]=useState<DocumentData>()
  const [existingChat,setExistingChat]=useRecoilState(currentChat)
 
  console.log(currentId,"Current Id")


  useEffect(()=>{
       setLoading(true)
      if(currentId!==""){
        const q= query(collection(db,"Chats"),where("recieverId","==",currentId),
        
        )
        onSnapshot(q,(snapshot)=>{
          var chatsArray:any=[]
        
          snapshot.forEach(doc => {
   
              chatsArray.push({conversationId:doc.id,...doc.data()})
          });
           
          setChats(chatsArray)
          setLoading(false)
       })
        
      }


  

  },[currentId])

  useEffect(()=>{
   
   if(currentId!==""){
     const q= query(collection(db,"Chats"),where("senderId","==",currentId),
     
     )
     onSnapshot(q,(snapshot)=>{
       var chatsArray:any=[]
     
       snapshot.forEach(doc => {

           chatsArray.push({conversationId:doc.id,...doc.data()})
       });
        
       setMyChats(chatsArray)
      
    })
     
   }




},[currentId])



useEffect(() => {
  
if(Chats!==undefined      && MyChats!==undefined) {

  setAllChats([...Chats,...MyChats])

}

},[currentId,Chats,MyChats])







  console.log(Chats,"Messages recieved")
  console.log(MyChats,"Messages sended")
  console.log(AllChats,"All My Chats")

  useEffect(() =>  {
   
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
// 
  return (
    <Layoute>
      <div className="flex min-h-screen sm:w-[97%] w-full">
        <div className={`sm:flex-[33%] ${pathname!=="/chats" &&"hidden sm:flex flex-col" }  flex-1 border-r dark:border-dark-third`}>
          <div className="px-4 mt-4 flex  justify-between  ">
            <p className="text-xl font-semibold text-black dark:text-white">Messages</p>
            <div className="flex space-x-3">
              {IconArray.map((item, id) => (
                <div
                  className="h-10 w-10 flex rounded-full hover:dark:bg-dark-third hover:bg-light1 justify-center items-center "
                  key={id}
                >
                  {" "}
                  <SvgIcon Icon={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="px-4">
            <div
              onClick={() => setSearchActive(true)}
              ref={searchBox}
              className={`mt-3 dark:bg-dark-second bg-gray-100 border ${
                !activeSearch && "dark:border-dark-third"
              }  flex space-x-2 rounded-full py-[0.45rem] sm:py-3 px-5 ${
                activeSearch && "dark:border-dark-dtext1 border-gray-400  border"
              }  `}
            >
              <SearchIcon className="h-5 sm:h-6 dark:text-dtext1 text-gray-500" />
              <input
                placeholder="Search Twitter"
                className="outline-none dark:text-dtext1    text-md sm:text-lg bg-transparent "
              />
            </div>
          </div>
          {/* Message Request  */}

          {/* <div className="flex px-4 py-2 space-x-2 items-start mt-2 hover:bg-[#18191a] ">
            <div className="h-[2.5rem] w-[2.5rem] sm:w-[3rem] sm:h-[3rem] flex rounded-full border border-gray-500 justify-center items-center ">
              {" "}
              <InboxIcon className="h-5 w-5 sm:h-6 sm:w-6  " />
            </div>

            <div className="flex flex-col">
              <p className="text-sm sm:text-lg  font-semibold text-white">
                Message Requests
              </p>
              <span className="text-sm sm:text-md text-gray-200 ">
                5 pending requests
              </span>
            </div>
          </div> */}
          {/* Message Request Completed */}
          {/* {
            asPath !=='/chats' &&            <div className="border-r-2 border-blue-400  flex px-4 py-2 space-x-2 items-start mt-2 bg-[#18191a] ">
            <div className="h-[2.5rem] w-[2.5rem] sm:w-[3rem] sm:h-[3rem] flex rounded-full ">
              <Image
                height={50}
                width={50}
                src={existingChat.recieverImg}
                alt="name"
                className=" h-11 w-11 rounded-full -z-3 "
              />
            </div>

            <div className="flex flex-col">
              <p className="text-sm sm:text-lg  font-semibold text-white">
                {existingChat.recieverName}
              </p>
              <span className="text-sm sm:text-md text-gray-200 t ">
                You accepted the request
              </span>
            </div>
          </div>
          } */}

          {
            loading?<Loader/>:
             AllChats!== undefined && AllChats.length>0 &&   AllChats.map((chat:any,id:any)=>(
              
             
              asPath!=="/chats"?(
                chat?.recieverId !== existingChat.recieverId && 
              

              <ChatComponent   sender={chat?.sender}  senderId={chat?.senderId} senderImage={chat?.senderImage} href={chat?.conversationId}  key={id}  reciever={chat?.reciever} recieverId={chat?.recieverId}  recieverImage={chat?.recieverImage}  />
              ):(
                <ChatComponent    sender={chat?.sender}  senderId={chat?.senderId} senderImage={chat?.senderImage} href={chat?.conversationId}  key={id}  reciever={chat?.reciever} recieverId={chat?.recieverId}   recieverImage={chat?.recieverImage}  />
              )

             ))
          }
        </div>
        <div className={`sm:flex-[62%]  ${pathname=="/chats" &&"hidden sm:flex " }  flex-1 border-r dark:border-dark-third`}>
         {
            pathname=="/chats" &&    <div className="h-[100%] w-[100%] hidden sm:flex items-center justify-center">
            <div className="flex flex-col justify-start ">
              <h1 className="text-3xl text-black dark:text-white font-semibold">Select a Message</h1>
              <span className="text-sm sm:text-lg dark:text-white text-black w-[350px]  ">
                Choose from your existing conversations, start a new one, or
                just keep swimming.
              </span>
              <button className=" py-3 xl:inline mt-3 bg-[#1d9bf0] text-white rounded-full w-[200px] h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
                New message
              </button>
            </div>
          </div>
         }
        
         {children}

        </div>
      </div>
    </Layoute>
  );
};

export default Index;
