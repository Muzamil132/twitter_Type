import {  XIcon } from "@heroicons/react/solid";
import React, {useState } from "react";
import { useRecoilState } from "recoil";
import { modalState, postState } from "../store/atoms";
import { useEffect } from "react";
import { db } from "../firebase";
import {
  doc,
  serverTimestamp,
  collection,addDoc,
  onSnapshot,

  DocumentData,
} from "@firebase/firestore";

import { useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";

const Modal = ({ children }: any) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [postId, setPostId] = useRecoilState(postState);
  const [commentText,setCommentText] =useState('')
  const [post, setPost] = useState<DocumentData | undefined>();
  const { data: session } = useSession();
  const id=postId!==undefined && postId
   const router=useRouter()
  const getSinglePost = async () => {
   
    onSnapshot(doc(db, "posts", id.toString()), (snapshot) => {
      setPost(snapshot.data());
    });
  };

  useEffect(() => {
    getSinglePost();
  }, []);
  

  // add comment 
  const addCommentToTweet=async()=>{
    
    await addDoc(collection(db,"posts",id.toString(),"comments"),{
      comment: commentText,
      username: session?.user.name,
      tag: session?.user.tag,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
    })

    setCommentText("")
    setModalOpen(false)
    router.push(`/${postId}`)

    
  }
  return (
    <div className="p-3">
      <div
        onClick={() => setModalOpen(false)}
        className="h-10 w-10 rounded-full text-white hover:bg-stone-900 flex items-center justify-center cursor-pointer  "
      >
        <XIcon className="h-7" />
      </div>
      <div className="flex sm:ml-6 mt-5 items-start space-x-2">
        <div className="h-10 w-10 flex-[0.1]   sm:h-14 sm:w-14 ">
          <img
            className="rounded-full "
            src={session?.user.image}
            alt="user_image"
          />
        </div>
        <div className="flex flex-[0.8] sm:flex-1 flex-col">
          <div className="flex flex-row space-x-1">
            <span className="text-white sm:text-xl font-semibold">
              {session?.user.name}
            </span>
            <span className="text-gray-400 sm:text-xl ">
              {session?.user.tag}@990
            </span>
          </div>
       
          <p className="text-gray-200 mt-2 text-md ">{post?.text}</p>
        
        </div>
      </div>
      <div className="flex mt-10 sm:ml-6 items-center space-x-2">
      <div className=" h-10 w-10  sm:h-14 sm:w-14 ">
          <img
            className="rounded-full"
            src={post?.userImg}
            alt=
            "user_image"
          />
        </div>
        <input onChange={(e)=>setCommentText(e.target.value)}  value={commentText} type="text" placeholder="Tweet your reply" className="outline-none bg-transparent text-gray-100 text-xl "/>
      </div>
      <div className="flex items-center justify-end  sm:fixed sm:bottom-4 sm:right-4">
        <button onClick={addCommentToTweet} disabled={!commentText.trim()} className="py-2 px-3 bg-blue-500 outline-none rounded-3xl w-[120px] shadow-lg text-white font-bold disabled:bg-blue-200  ">
           Reply
        </button>

      </div>
    </div>
  );
};

export default Modal;
