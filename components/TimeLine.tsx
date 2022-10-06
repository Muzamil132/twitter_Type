import { CogIcon, SparklesIcon } from '@heroicons/react/outline'
import { MenuAlt4Icon } from '@heroicons/react/solid'
import { NextPage } from 'next'

import { useTheme } from 'next-themes';

import React, { useState } from 'react'
import { mobileSidebarState } from '../store/atoms'
import CreatePost from './CreatePost'
import { Snapshot, useRecoilState } from "recoil";
import { Notyf } from 'notyf'
import  {useEffect} from 'react'
import { db } from '../firebase'
import { onSnapshot, collection, query, orderBy,QueryDocumentSnapshot,DocumentData,getDocs, doc ,getDoc} from "@firebase/firestore";
import PostItem from './PostItem'
import Loader from './Loader'
import { useSession } from 'next-auth/react'
import "notyf/notyf.min.css"
import Image from 'next/image';
import SettingDropDownManu from './SettingDropDownManu';
export interface PostType{
  id:string,
  tag:string,
  image:string,
  text:string,
  timestamp:string,
  userImg:string
  userId:string,
  username:string
  commentNumber:number,
  likes?:string[]
}




const TimeLine:NextPage = () => {
 const {data:session}=useSession()
  const [isOpen,setISopen] =useRecoilState(mobileSidebarState)
  const [Posts,setPosts]=useState<PostType[]>()
  const [isPostLoaded,setPostLoaded]=useState(false)
  const [isPostLiked,setPostLiked]=useState(false)
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  




  const getPosts=()=>{
  
    setPostLoaded(true)
    
    const q = query(collection(db, "posts"),orderBy("timestamp", "desc"));
    onSnapshot(q, (querySnapshot) => {
      const postdata:any = [];
    querySnapshot.forEach((doc) => {
     
        var obj={}
       
        obj={id:doc.id,...doc.data()}
        postdata.push(obj)
     
       setPosts(postdata)
    });

   
      setPostLoaded(false)
    
  
  });


    
  }

   useEffect(()=>{
    getPosts()

   
  },[])

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === 'system' ? systemTheme : theme;

 


  return (

    <div className=' dark:text-dtext1 sm:ml-[80px] xl:ml-[330px] flex-grow max-w-[35rem] border-1 border-r border-l min-h-screen dark:border-dark-third' >
    <div className='dark:dtext1 flex items-center sm:justify-between  top-0 py-2 px-3 sticky border-b dark:bg-dark-main bg-light1  z-10 dark:border-dark-third' >
    {/* <button  onClick={()=>setISopen(true)} className=" sm:hidden  h-10 w-10 rounded-full text-gray-400 ">
            <MenuAlt4Icon  className="h-5"/>
          </button> */}
          <div className='w-full justify-between flex'>
      <h2  className='text-lg sm:text-xl dark:text-dtext1 font-bold text-gray-900 ' >Home</h2>
      <div className='relative'>

      
      <SettingDropDownManu/>
       </div>


      </div>
    
    </div>
    <CreatePost/>
    {
      !isPostLoaded? <div>
      {
        Posts!==undefined && Posts.map((post,id)=>(
          <PostItem userId={post.userId}  postId={post.id} username={post.username} tag={post.tag}  key={id} text={post.text} image={post?.image}  avatar={post.userImg}   />
        ))
      }
    </div>:(
      <Loader/>
    )
    }
   
        
    </div>
  )
}

export default TimeLine