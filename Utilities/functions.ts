import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { db } from "../firebase";

export const LikePost = async(liked:boolean,postId:string,user:any)=>{

   
    if(liked){
      await deleteDoc(doc(db, "posts", postId, "likes", user.userId.toString()));
    }else{
     
   await setDoc(doc(db,"posts",postId,"likes",user.userId.toString()),{
    userImg:user.userImg,
    userId:user.userId,
    username:user.username
  
   })
  }
  
  
  }


 export  async function addFollower(e:any,isFollowing:boolean,userId:string,currentUserId:string,username:string,userImg:string){
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
