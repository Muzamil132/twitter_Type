import React, { useEffect, useState } from 'react'
import {CheckCircleIcon ,DotsHorizontalIcon,HeartIcon } from '@heroicons/react/solid'
import {ShareIcon,UploadIcon,ChatAlt2Icon} from '@heroicons/react/outline'
import Icons from './Icons'
import { Snapshot, useRecoilState } from 'recoil'
import { modalState, postState } from '../store/atoms'
import Link from 'next/link'
import { collection, doc, getDoc, updateDoc,FieldValue,addDoc, getDocs, where, query,deleteDoc, setDoc, onSnapshot, orderBy, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import { useSession } from 'next-auth/react'
import { LikePost } from '../Utilities/functions'
import { LikeHook } from '../customeHooks/isLikedHook'
import { useUser } from '../customeHooks/useUser'

interface IProps{
  text:string
  image:string
  avatar:string
  userId?:string,
  tag:string,
  username:string,
  postId:string
 

}

const PostItem = ({text,userId,image,avatar,username,tag,postId}:IProps) => {



const [modalOpen ,setModalOpen]=useRecoilState(modalState)
const [postIdd,setPostId]=useRecoilState(postState)
const {data:session} =useSession()


const id =session?.user.uid !==undefined && session?.user.uid
const {liked,numberOfLikes,numberOfComment} =LikeHook(postId,id.toString())
const userId1=userId!==undefined ? userId : ""
const User=useUser(userId1)
console.log(User.user)
const openModal=(postId:string)=>{
  setModalOpen(true)
  setPostId(postId)

}



const user={

    userImg:session?.user.image,
    userId:session?.user.uid,
    username:session?.user.name
  

}






    return (
        <div className=" dark:border-dark-third px-3 py-2 border-b hover:dark:bg-dark-second cursor-pointer ">
         
          
            <div className="flex px-1 py-2">
            <img className="inline-block  h-11 w-11 rounded-full " src={User?.user?.userImg} alt="yyy"/>
            <div className="flex flex-col w-full pl-2">

            <div className="flex space-x-1 justify-between items-center">
            <div className="flex ">
            <h1 className="text-sm font-bold text-gray-900 dark:text-dtext1 truncate">{username}</h1>
            <CheckCircleIcon className="w-5  text-tw-blue "/>
           
            </div>
            <div className="h-10 w-10 flex  rounded-full items-center  justify-center hover:dark:bg-dark-third hover:bg-light2">
            <DotsHorizontalIcon  className="w-6 dark:text-dtext1 text-gray-500 "/>
            </div>
           
            </div>
            <Link href={{pathname:`/${postId}`
            ,query:{
              liked,numberOfComment,numberOfLikes
            }
            
          
          }}>
            <div className='cursor-pointer'>

          
          
            <p className="text-left text-gray-800 dark:text-dtext1 "  >
             {text}
            </p>

            <div className="py-3  overflow-hidden">
            
            {
              image &&  <img className="rounded-xl max-h-[500px] " src={image} alt="" />
            }    
          </div>
            </div>
            </Link>
               <div  className="flex justify-between">
               <div onClick={()=>openModal(postId)} className="cursor-pointer flex items-center space-x-1 ">
               <Icons  Icon={ChatAlt2Icon} color="text-tw-blue"/>

               <span className='dark:text-dtext2 -mt-1'>{numberOfComment!>0 &&  numberOfComment}</span>
               </div>
             <div onClick={()=>LikePost(liked,postId,user)} className="cursor-pointer flex items-center space-x-1 "  >
             <Icons isPostLiked={liked}  Icon={HeartIcon} color="text-red-500" />
             <span className='dark:text-dtext2 -mt-1'>{numberOfLikes!>0 &&  numberOfLikes}</span>
             </div>
            
              <Icons  Icon={ShareIcon} color="text-green-400"/>
              <Icons Icon={UploadIcon} color="text-tw-blue"/>
              
            </div>
            </div>
            </div>
          
        </div>
    )
}

export default PostItem