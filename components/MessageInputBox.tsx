import { ChevronLeftIcon, EmojiSadIcon, XIcon } from "@heroicons/react/outline";
import {
  ArrowCircleRightIcon,
  EmojiHappyIcon,
  FilmIcon,
  PhotographIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { useCurrentUserHook } from "../customeHooks/CurentUser";
import { db, storage } from "../firebase";
import { currentChat } from "../store/atoms";
import Loader from "./Loader";

const MessageInputBox = () => {
  const { data: session } = useSession();
  const [activeSearch, setSearchActive] = useState<boolean>(false);
  const [existingChat, setExistingChat] = useRecoilState(currentChat);
  const [messageText, setMessageText] = useState("");
  const [loading,setLoading]=useState(false)
  const currentId = session?.user.uid != undefined ? session?.user.uid : "";
  const senderImage =
    session?.user.image != undefined ? session?.user.image : "";
  const searchBox = useRef<HTMLDivElement>(null);
  const SearchResultBox = useRef<HTMLDivElement>(null);
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | undefined | null
  >();
  const [_, username] = useCurrentUserHook();
  useEffect(() => {
    console.log(existingChat);

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

  const selectImage = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
  };


 async function sendImage(){

      setLoading(true)
      const imageRef = ref(storage, `Messages/${Math.random() * 100}`);
      if(selectedFile){
       
         
          const stringImage= selectedFile.toString()
           await uploadString(imageRef, stringImage, "data_url").then(async () => {
             const downloadURL = await getDownloadURL(imageRef);
             await addDoc(collection(db, "Chats", existingChat?.conversationId,"MyChats"), {
               userImg: downloadURL,
               senderImage,
        recieverId: existingChat?.recieverId,
        currentId,
       
        timestamp: serverTimestamp(),
             });
             setLoading(false)

             setSelectedFile(null)
              
           
             
           });
  
         
      
  }
}

  async function addnewDoc() {
    await addDoc(
      collection(db, "Chats", existingChat?.conversationId, "MyChats"),
      {
        senderImage,
        recieverId: existingChat?.recieverId,
        currentId,
        msg: messageText,
        timestamp: serverTimestamp(),
      }
    );
  }

  async function setNewDoc() {
    await setDoc(doc(db, "Chats", existingChat.conversationId), {
      recieverId: existingChat.recieverId,
      sender: username,
      senderId: currentId,
      senderImage,
      reciever: existingChat.recieverName,
      recieverImage: existingChat.recieverImg,

      conversationId: existingChat.conversationId,
      timestamp: serverTimestamp(),
    });
  }

  const SendMessage = async () => {
    const docSnap = await getDoc(doc(db, "Chats", existingChat.conversationId));
     


    if (docSnap.exists()) {
      addnewDoc();

      setMessageText("");
    } else {
      setNewDoc();

      addnewDoc();
    }
  };

  return (
    <div className=" absolute bottom-0 right-0 left-0 px-4 py-[0.2rem] dark:bg-dark-main bg-white flex space-x-2 items-center border-t dark:border-dark-third ">
      {!activeSearch ? (
        <div className="flex space-x-2">
          <div className="relative">
            {
              selectedFile!==null  && selectedFile!==undefined && !loading &&

            <div className=" absolute  bottom-0 dark:bg-dark-second rounded-xl w-[350px] bg-gray-100  sm:w-[600px] h-[250px]">
              <div
                className="w-8 absolute right-2 cursor-pointer top-2 h-8 rounded-full dark:bg-dark-second bg-gray-100 flex justify-center items-center "
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="w-6 h-6 tcolor" />
              </div>
              <div className="pl-[40px] pr-5 flex items-center justify-between h-full">
                <Image
                  src={selectedFile.toString()}
                  alt="sendii"
                  width={250}
                  height={170}
                  className="rounded-xl"
                  objectFit="cover"
                />
                <ArrowCircleRightIcon onClick={sendImage}  className="w-10 cursor-pointer h-10 text-gray-900 dark:text-dtext1" />
              </div>
            </div>
}
{
              selectedFile!==null  && selectedFile!==undefined && loading &&

            <div className=" absolute  bottom-0 dark:bg-dark-second rounded-xl w-[400px] bg-gray-100  sm:w-[600px] h-[250px]">
             <Loader/>
            </div>
}
            <label className="cursor-pointer">
              <input onChange={selectImage} className="hidden" type="file" />
              <PhotographIcon className="h-7 w-7text-gray-900 dark:text-dtext1" />
            </label>
          </div>

          <FilmIcon className="h-7 w-7 text-gray-900 dark:text-dtext1" />
        </div>
      ) : (
        <ChevronLeftIcon className="w-8 text-gray-900 dark:text-dtext1 " />
      )}
      <div
        onClick={() => setSearchActive(true)}
        ref={searchBox}
        className={` dark:bg-dark-third bg-gray-100 border  flex-1 ${
          !activeSearch && "dark:border-[#18191a]"
        }  flex space-x-2 rounded-full py-[0.3rem] px-5 ${
          activeSearch && "dark:border-gray-500 "
        }  `}
      >
        <input
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Start a new message"
          className="outline-none w-[95%] text-black dark:text-white text-md sm:text-lg bg-transparent "
        />
        <EmojiSadIcon className="h-6 w-6 text-gray-900 dark:text-dtext1" />
      </div>
      <ArrowCircleRightIcon
        onClick={SendMessage}
        className="w-7 h-7 text-gray-900 dark:text-dtext1"
      />
    </div>
  );
      }
    

export default MessageInputBox
