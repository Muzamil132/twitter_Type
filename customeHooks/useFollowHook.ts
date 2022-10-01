

import { collection, doc, getDoc, updateDoc,FieldValue,addDoc, getDocs, where, query,deleteDoc, setDoc, onSnapshot, orderBy, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import {useState,useEffect,useCallback} from 'react'
import { useSession } from 'next-auth/react';

export function useFollowHook(userId:string,currentUserId:string){
    const { data: session } = useSession();
    const imageUrl = session?.user.image != undefined ? session?.user.image : "";
    
    const [isFollowing,setFollowing]=useState<boolean>(false)
    const [loading,setLoading]=useState<boolean>(false)


    const getAllFollowers =useCallback(()=>{
      setLoading(true)
        
      onSnapshot(collection(db, "Users", userId,"MyFollowers"), (snapshot) =>{
        var FollowersArray:any=[]
       
          
        snapshot.forEach((doc)=>{
        
          FollowersArray.push(doc.data())
  
        })
        setFollowers(FollowersArray)
        
    })
    setLoading(false) 

    },[userId])

 

    const [Followers,setFollowers] =useState<DocumentData | undefined>()
    useEffect(

        () =>{
        getAllFollowers()
        },
        [getAllFollowers]
      );
    
    
      useEffect(()=>{
        setFollowing(
          Followers?.some((follower:any) => follower.userId === currentUserId) 
        )
      
      },[Followers,currentUserId])

return [
    isFollowing,loading
]

}