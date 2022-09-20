import { collection, doc, getDoc, updateDoc,FieldValue,addDoc, getDocs, where, query,deleteDoc, setDoc, onSnapshot, orderBy, DocumentData } from 'firebase/firestore'
import { db } from '../firebase'
import {useState,useEffect} from 'react'

export function LikeHook(postId:string,id:string){
 const [likes,setLikes] =useState<DocumentData |undefined >()
const [liked,setLiked] =useState(false)
const [numberOfLikes,setNumberOfLikes]=useState<number>()
const [numberOfComment,setNumberOfComment]=useState<number>()


useEffect(

    () =>{
    
      onSnapshot(collection(db, "posts", postId, "likes"), (snapshot) =>{
        var likesArray:any=[]
       
        setNumberOfLikes(snapshot.docs.length)
  
        snapshot.forEach((doc)=>{
        
          likesArray.push(doc.data())
  
        })
        setLikes(likesArray)
    })
    },
    [ postId]
  );
  
  useEffect(()=>{
    setLiked(
      likes?.some((like:any) => like.userId === id) 
    )
  
  },[likes,id])

  useEffect(

    () =>{
    
      onSnapshot(collection(db, "posts", postId, "comments"), (snapshot) =>{
      
       
        setNumberOfComment(snapshot.docs.length)
  
       
        
    })
    },
    [ postId]
  );

  
  
  return {
    liked,numberOfLikes,numberOfComment
  }


}