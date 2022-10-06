
import Image from "next/image";
import React ,{useState,useEffect} from "react";
import FollowerComp from "./FollowerComp";
import { collection, DocumentData, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from "../firebase";
import { useRouter } from "next/router";
const FollowersBox = () => {
const {pathname} =useRouter()
    const [more,setMore]=useState<boolean>(false)

    
    const [Users,setUsers]=useState<DocumentData>([])

    

     useEffect(()=>{
        const q = query(collection(db, "Users"))
        onSnapshot(q,(snapshot)=>{
            var UsersArray:DocumentData[]=[]
            snapshot.forEach((doc)=>{
               
              UsersArray.push(doc.data())
                  setUsers(UsersArray)
            })
        })
        

     },[])


  return (
    <div className=" dark:bg-dark-second bg-gray-100 rounded-xl  overflow-y-auto py-3 mt-4">
      <h1 className="text-2xl font-semibold mb-3 px-3 dark:text-gray-100 text-black">
        Want to follow
      </h1>
      {
        Users!== undefined &&  Users.map((user:any,id:any)=>(
           pathname=='/addUsers'?(<FollowerComp username={user.username} userImg={user.userImg}  userId={user.userId} key={id} />)   : id<3 && <FollowerComp username={user.username} userImg={user.userImg}  userId={user.userId} key={id} />
        ))
      }
      {
        !more && pathname!=='/addUsers' && Users!== undefined &&  Users.length>3 ? (
            <div onClick={()=>setMore(true)} className="px-3 pb-5 dark:text-white text-dark-main  font-bold cursor-pointer">
            <p >Show more</p>
            </div>
        ):(
         <div>{
            
            Users!== undefined && Users.map((user:any,id:any)=>(
            id>=3 && <FollowerComp username={user.username} userImg={user.userImg}  userId={user?.userId} key={id} />
         ))
        }
         { more && 
         Users.length>3 &&
          <div onClick={()=>setMore(false)} className="px-3 pb-5 dark:text-white text-dark-main  font-bold cursor-pointer">
            <p >Show less</p>
            </div>
}
         </div>
        )
      }
    
      
  
    </div>
  );
};

export default FollowersBox;
