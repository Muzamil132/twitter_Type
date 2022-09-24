import { addDoc, collection, deleteDoc, doc, DocumentData, onSnapshot, orderBy, query,serverTimestamp,setDoc } from 'firebase/firestore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React,{useState,useEffect} from 'react'
import { useFollowHook } from '../customeHooks/useFollowHook';
import { db } from '../firebase';

interface IProps{
    username:string,
    userImg:string,
    userId:string
}



const FollowerComp = ({username,userImg,userId}:IProps) => {
    const { data: session } = useSession();
    const imageUrl = session?.user.image != undefined ? session?.user.image : "";
    const currentUserId=session?.user.uid!=undefined?session?.user.uid:""
   
   
    const [isFollowing]=useFollowHook(userId,currentUserId)
    const [unfollow,setUnfollow]=useState(false)
    


    async function addFollower(e:any){
         e.preventDefault()
        if(isFollowing){
            await deleteDoc(doc(db, "Users",userId, "MyFollowers",currentUserId));
            
            
        }else{
            
        await setDoc(doc(db,"Users",userId,"MyFollowers",currentUserId),{

            username,
            userImg,
            userId:currentUserId,
            timestamp:serverTimestamp()
            
        })

        }

}


    

  return (
    <div className='cursor-pointer'>
      <Link  href={`/profile/${userId}`} >
      
         <div className="px-3 flex space-x-2 items-start mb-2 py-3  hover:bg-neutral-800">
        <Image
          height={50}
          width={50}
          src={userImg}
          alt="name"
          className=" h-10 w-10 rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full items-start">
            <span className="text-md font-semibold text-white">
              {username}
            </span>
            <button 
             onMouseLeave={()=>setUnfollow(false)}
             onMouseEnter={()=>{
              if(isFollowing){
                setUnfollow(true)
              }
             }}
            onClick={addFollower} className={`text-md shadow-xl outline-none ${isFollowing?(unfollow?("bg-red-100 text-red-500 border-2 border-red-400 " ) :"bg-blue-400 text-white"):"bg-gray-100 text-black" }    px-4 py-[0.35rem]   font-bold rounded-full `}>
             {isFollowing?(unfollow?"Unfollow":"Following")   :"Follow"}
            </button>
          </div>
          <div className="flex flex-col -mt-2">
            <span className="text-sm text-gray-200 font-light ">
             {username}@nolan_json
            </span>
          </div>
        </div>
      </div>
      </Link>
    </div>
  )
}

export default FollowerComp
