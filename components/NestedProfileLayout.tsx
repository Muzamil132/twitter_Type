import { ArrowLeftIcon, SparklesIcon } from "@heroicons/react/solid";
import { doc, DocumentData, getDoc, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import React,{useState,useEffect,useCallback} from "react";
import { db } from "../firebase";
import ProfileHeader from "./ProfileHeader";
import ProfileLayout from "./ProfileLayout";


const NestedProfileLayout = ({children}:any) => {
  const router = useRouter();
  const [User,setUser]=useState<DocumentData>()
  const profileId1= router.query.ProfileId!==undefined && router.query.ProfileId

  const loadUser= useCallback( async() => {
     const user = await getDoc(doc(db,"Users",profileId1.toString()))
     setUser(user.data())
  },[profileId1]
  )
  useEffect(()=>{
   
    loadUser()
  
   
  },[loadUser])

console.log(User)



  return (
    <ProfileLayout>
      <div className="text-white">
        <div className="flex items-center space-x-4 z-10  left-0 top-0 sticky bg-black bg-opacity-50 py-1 right-0 border-b border-gray-700  ">
          <div
            onClick={() => router.back()}
            className="h-8 w-8 flex hover:bg-[#18191a]   cursor-pointer rounded-full items-center  justify-center"
          >
            <ArrowLeftIcon className="w-5 text-tw-blue" />
          </div>
          <div className="flex flex-col">
            <p className="text-lg font-bold">{User?.username}</p>
            <p className="text-sm text-gray-200 ">Tweet</p>
          </div>
        </div>
        <ProfileHeader profileImage={User?.userImg} name={User?.username}  />
      
        {children}
      </div>
    </ProfileLayout>
  );
};

export default NestedProfileLayout;
