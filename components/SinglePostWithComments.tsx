import { SparklesIcon } from "@heroicons/react/outline";
import {
  ArrowLeftIcon,
  BackspaceIcon,
  ChatAlt2Icon,
  CheckCircleIcon,
  DotsHorizontalIcon,
  HeartIcon,
  MenuAlt4Icon,
  ShareIcon,
  UploadIcon,
} from "@heroicons/react/solid";
import { NextPage } from "next";
import React, { useState } from "react";
import { mobileSidebarState, modalState, postState } from "../store/atoms";
import Link from "next/link";
import { useRecoilState } from "recoil";

import { useEffect } from "react";
import { db } from "../firebase";
import {
  onSnapshot,
  collection,
  query,
  orderBy,

  DocumentData,
  serverTimestamp,
  addDoc,
  
  doc,
  deleteDoc,
  setDoc,

} from "@firebase/firestore";
import PostItem from "./PostItem";
import Loader from "./Loader";
import Icons from "./Icons";
import { useRouter } from "next/router";
import Comments from "./Comments";
import { useSession } from "next-auth/react";
import { LikePost } from "../Utilities/functions";
export interface PostType {
  id: string;
  tag: string;
  image: string;
  text: string;
  timestamp: string;
  userImg: string;
  username: string;
  likes?: string[];
}

export interface CommentType {

  commentId: string;
  userId: string
  comment: string;
  timestamp: string;
  userImg: string;

  username: string;
  likes?: string[];
}



const SinglePostWithComments = () => {
  const [isPostLoaded, setPostLoaded] = useState(false);
  const [isOpen, setISopen] = useRecoilState(mobileSidebarState);
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [postIdd, setPostId] = useRecoilState(postState);
  const [post, setPost] = useState<DocumentData | undefined>();
  const [comments,setCommets] =useState<CommentType[] | undefined>()
  const [commentTitle,setCommentTitle] =useState("")
 
const router=useRouter()
 const {query:{postId,numberOfComment,numberOfLikes,liked}}=useRouter()
   const parsBool =(liked:string | string[] | undefined):boolean=>{
    if(liked==="false"){
      return false
    }
    return true
   }
 
  const {data:session}=useSession()
  const user={

    userImg:session?.user.image,
    userId:session?.user.uid,
    username:session?.user.name
  

}


  const id =postId !== undefined ? postId : "";
  const image = "";

  const getPost = () => {
    onSnapshot(doc(db, "posts", id.toString()), (snapshot) => {
      setPost(snapshot.data());
    });
  };
  const addCommentToTweet=async()=>{
    
    await addDoc(collection(db,"posts",id.toString(),"comments"),{
      comment: commentTitle,
      username: session?.user.name,
      tag: session?.user.tag,
      userImg: session?.user.image,
      timestamp: serverTimestamp(),
    })

    setCommentTitle("")
  
  }
  const getPostComments=()=>{
    var commentsArray:any=[]
    const  q= query(collection(db,"posts",id.toString(),"comments"),orderBy("timestamp","desc"))
    
     onSnapshot(q,(snapshot)=>{
         snapshot.forEach((doc)=>{
          var obj={
            commentId:doc.id,...doc.data()
          
          }
          commentsArray.push(obj)
          setCommets(commentsArray)
         })

     })

     
 
 }


    


  useEffect(() => {
    getPost();
  }, []);
  useEffect(()=>{
    getPostComments()
  },[])

  const openModal=(postId:string)=>{
    setPostId(postId)
    setModalOpen(true)

  }

  return (
    <div className=" text-white sm:ml-[80px] xl:ml-[330px] flex-grow max-w-[41rem] border-1 border-r border-l min-h-screen border-gray-700 ">
        <div className="flex items-center space-x-4  top-0 sticky bg-black bg-opacity-50 py-3 ml-2  ">


         <div onClick={()=>router.back()}  className="h-10 w-10 flex hover:bg-[#18191a]   cursor-pointer rounded-full items-center  justify-center">
                    <ArrowLeftIcon className="w-6  text-tw-blue" />
         </div>
         <p className="text-xl font-bold">Tweet</p>
         </div>
     
      {!isPostLoaded ? (
        <div>
          <div className=" border-gray-700 px-3 border-b   cursor-pointer ">
            <div className="flex px-1 py-2">
              <img
                className="inline-block  h-11 w-11 rounded-full "
                src={post?.userImg}
                alt="yyy"
              />
              <div className="flex flex-col w-full pl-2">
                <div className="flex space-x-1 justify-between items-center">
                  <div className="flex ">
                    <h1 className="text-sm font-bold  truncate">Muzamil</h1>
                    <CheckCircleIcon className="w-5  text-tw-blue " />
                  </div>
                  <div className="h-10 w-10 flex  rounded-full items-center  justify-center hover:bg-black">
                    <DotsHorizontalIcon className="w-6  text-tw-blue" />
                  </div>
                </div>

                <div className="cursor-pointer">
                  <p className="text-left">{post?.text}</p>

                  <div className="py-3  overflow-hidden">
                    {post?.image && (
                      <img className="rounded-xl " src={post?.image} alt="" />
                    )}
                  </div>
                </div>

                <div className="flex justify-between border-b border-gray-700 -ml-4">
                <div  className="cursor-pointer flex items-center space-x-1 ">
               <Icons  Icon={ChatAlt2Icon} color="text-tw-blue"/>

               <span className='text-gray-200 -mt-1'>{+numberOfComment!>0 &&  numberOfComment}</span>
               </div>

              <div className="cursor-pointer flex items-center space-x-1 "  >
             <Icons isPostLiked={parsBool(liked)} Icon={HeartIcon} color="text-red-400" />
             <span className='text-gray-200 -mt-1'>{+numberOfLikes!>0 &&  numberOfLikes}</span>
             </div>
                  <Icons Icon={ShareIcon} color="text-green-400" />
                  <Icons Icon={UploadIcon} color="text-tw-blue" />
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-5 mt-3 px-2 pb-4">
              <div className="flex space-x-3">
                <img
                  className="inline-block  h-11 w-11 rounded-full "
                  src={post?.userImg}
                  alt="yyy"
                />
                <input
                  value={commentTitle}
                  onChange={(e)=>setCommentTitle(e.target.value)}
                  className="bg-transparent outline-none text-gray-200 text-xl "
                  placeholder="Tweet your reply"
                />
              </div>
              <div className="flex items-center justify-end  ">
                <button  disabled={!commentTitle.trim()}   onClick={addCommentToTweet} className="py-2 px-3 bg-blue-500 outline-none rounded-3xl w-[120px] shadow-lg text-white font-bold disabled:bg-blue-300">
                  Reply
                </button>
              </div>
            </div>
          </div>
          {
            comments!==undefined && comments.map((comment,id)=>(

              <Comments userId={post?.userId} key={id} commentText={comment.comment} userImg={comment.userImg} username={comment.username} />
            ))
          }
        
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default SinglePostWithComments;
