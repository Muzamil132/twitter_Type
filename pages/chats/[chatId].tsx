import { ArrowLeftIcon } from "@heroicons/react/solid";
import { Category } from "emoji-mart";
import { addDoc, collection, doc, DocumentData, getDoc, onSnapshot, orderBy, query } from "firebase/firestore";
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import { getProviders, getSession, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React,{useEffect,useState} from "react";
import { useRecoilState } from "recoil";
import Index from ".";
import MessageInputBox from "../../components/MessageInputBox";
import MessageScreen from "../../components/MessageScreen";
import { useCurrentUserHook } from "../../customeHooks/CurentUser";
import { db } from "../../firebase";
import { currentChat } from "../../store/atoms";

const OneToOneChat = () => {
  const { data: session } = useSession();
 
  const currentId = session?.user.uid != undefined ? session?.user.uid : "";
  const router=useRouter()
  const [Chat,setChat] =useState<DocumentData>({})
  const [message,setMessage] = useState<DocumentData>();
  const recieverImg= router.query.recieverImg!=undefined?router.query.recieverImg!:"";
  const recieverName= router.query.recieverName!= undefined ? router.query.recieverName! : "";
  const [existingChat,setExistingChat]=useRecoilState(currentChat)

  function getSingleChat(chatId: string,userId: string){
   
   
     onSnapshot(doc(db, "Chats",chatId), (snapshot) => {
      
      if(snapshot.exists()){
          setChat(snapshot.data())
     
    }
    else{
      setChat({})
    }
     
  
  }

    );
    
  
 
  }

  useEffect(()=>{
    const q= query(collection(db,"Chats",existingChat.conversationId,"MyChats"),orderBy("timestamp", "asc"))
      
    onSnapshot(q,(snapshot)=>{
      var messagesArray :any=[]
      snapshot.forEach((doc)=>{
        messagesArray.push(doc.data())
      })
      setMessage(messagesArray)
    })

  },[existingChat.conversationId])

  
   console.log(message)
  

   useEffect(()=>{
   getSingleChat(existingChat.conversationId,currentId)

   },[existingChat.conversationId,currentId])





 
  return (
    <Index recieverImg={recieverImg.toString()} recieverName={recieverName.toString()}>
      <div className="flex flex-col h-screen w-full relative">
        {/* chatHeader  */}
        <div className="flex items-center  space-x-8 px-4 py-[2px] dark:bg-dark-second border-b dark:border-dark-third absolute top-0 left-0 right-0 ">
          <div onClick={() => router.back()} className="   cursor-pointer ">
            <ArrowLeftIcon className="w-6 h-6  text-black dark:text-white" />
          </div>
          <div className="flex space-x-2 items-center ">
            <div className=" flex rounded-full ">
              <Image
               
                width={40}
                height={40}
               
                src={Object.keys(Chat).length===0?existingChat.recieverImg:currentId==Chat?.senderId?Chat?.recieverImage:Chat?.senderImage}
                alt="name"
                className=" h-10 w-10 rounded-full -z-3 "
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-black dark:text-white">{Object.keys(Chat).length===0?existingChat.recieverName:currentId==Chat?.senderId?Chat?.recieverName:Chat?.sender}</span>
              <span className="text-sm text-black dark:text-white font-semibold font-light -mt-1">
                online
              </span>
            </div>
          </div>
          </div>

         
        {/* chatHeader done  */}
        <MessageScreen messages={message}  />
        <MessageInputBox/>
      </div>
    </Index>
  );
};

export default OneToOneChat;


//  async function getSingleChat(chatId: string,userId: string){
//   console.log(chatId,"chatId",userId,"userId");
//   onSnapshot(doc(db, "Chats", userId,"MyChats",chatId), (snapshot) => {
//     console.log(snapshot.data(),"From MyChats")
   
//   });

//   // const snapDoc =  await getDoc(doc(db,"Chats",userId,"MyChats",chatId));

//   //   console.log(snapDoc.data(),"From MyChats")
// }

// export const getServerSideProps= async (context:any) => {
//   const providers = await getProviders();
 
export async function getServerSideProps(context:any) {


  // console.log(providers)
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
      session,
    },
  };

 
}
