import { SparklesIcon } from '@heroicons/react/outline'
import { MenuAlt4Icon } from '@heroicons/react/solid'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { mobileSidebarState } from '../store/atoms'
import CreatePost from './CreatePost'
import { useRecoilState } from "recoil";

import  {useEffect} from 'react'
import { db } from '../firebase'
import { onSnapshot, collection, query, orderBy,QueryDocumentSnapshot,DocumentData,getDocs } from "@firebase/firestore";
import PostItem from './PostItem'
interface PostType{
  id:string,
  tag:string,
  image:string,
  text:string,
  timestamp:string,
  userImg:string
  username:string
  likes?:string[]
}


const TimeLine:NextPage = () => {
 
  const [isOpen,setISopen] =useRecoilState(mobileSidebarState)
  const [Posts,setPosts]=useState<PostType[]>()
   

   useEffect(()=>{
    const q = query(collection(db, "posts"),orderBy("timestamp", "desc"));
      onSnapshot(q, (querySnapshot) => {
      const postdata:any = [];
      querySnapshot.forEach((doc) => {
          var obj={}
          obj ={id:doc.id,...doc.data()}
          postdata.push(obj);
          setPosts(postdata)
      });
    
    });
 
  

   },[])
console.log(Posts)
 
  return (

    <div className=' text-white sm:ml-[80px] xl:ml-[330px] flex-grow max-w-[41rem] border-1 border-r border-l min-h-screen border-gray-700 ' >
    <div className='text-[#d9d9d9d] flex items-center sm:justify-between sticky top-0 py-2 px-3 z-10 border-b bg-black  border-gray-700' >
    <button  onClick={()=>setISopen(true)} className=" sm:hidden  h-10 w-10 rounded-full text-gray-400 ">
            <MenuAlt4Icon  className="h-5"/>
          </button>
      <h2  className='text-lg sm:text-xl  font-bold  ' >Home</h2>
      <div className='hoverAn px-0 py-0 flex  items-center justify-center h-10 w-10  '>
      <SparklesIcon className='h-5 text-white'    />
      </div>
    
    </div>
    <CreatePost/>
    <div>
      {
        Posts!==undefined && Posts.map((post,id)=>(
          <PostItem username={post.username} tag={post.tag}  key={id} text={post.text} image={post?.image}  avatar={post.userImg}   />
        ))
      }
    </div>
        
    </div>
  )
}

export default TimeLine