

import { collection, doc, getDoc, updateDoc,FieldValue,addDoc, getDocs, where, query,deleteDoc, setDoc, onSnapshot, orderBy, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import {useState,useEffect} from 'react'
import { useSession } from 'next-auth/react';

export function useFollowHook(userId:string,currentUserId:string){
    const { data: session } = useSession();
    const imageUrl = session?.user.image != undefined ? session?.user.image : "";
    
    const [isFollowing,setFollowing]=useState<boolean>(false)


    const [Followers,setFollowers] =useState<DocumentData | undefined>()
    useEffect(

        () =>{
        
          onSnapshot(collection(db, "Users", userId,"MyFollowers"), (snapshot) =>{
            var FollowersArray:any=[]
           
              
            snapshot.forEach((doc)=>{
            
              FollowersArray.push(doc.data())
      
            })
            setFollowers(FollowersArray)
           
        })
        },
        [userId]
      );
    
    
      useEffect(()=>{
        setFollowing(
          Followers?.some((follower:any) => follower.userId === currentUserId) 
        )
      
      },[Followers,currentUserId])

return [
    isFollowing,Followers,setFollowing
]

}