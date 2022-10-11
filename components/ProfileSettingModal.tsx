import { ArrowLeftIcon, CameraIcon } from "@heroicons/react/solid";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { userAgent } from "next/server";
import React from "react";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useUser } from "../customeHooks/useUser";
import { db, storage } from "../firebase";
import { profileState} from "../store/atoms";
function HeaderImage() {

  const [Profile, setProfile] = useRecoilState(profileState);
  const {query:{profileId}}=useRouter()
  const { data: session}=useSession()
  const currentId =session?.user.uid != undefined ? session?.user.uid : "";
  const {user} =useUser(currentId)

  const addProfileImage = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setProfile({ headerImage: readerEvent.target?.result });
    };
   
  };




  return (
    <div>
      <div className="flex w-full  justify-center items-center mt-1"></div>
      <div className="flex flex-col sm:px-[100px] px-[25px]">
        <h1 className="sm:text-3xl text-2xl  font-bold tcolor ">
          Pick a Header Picture
        </h1>
        <p className="text-xl tcolor ">
          People who visit your profile will see it. Show your style.
        </p>
      </div>
      <div className="w-full flex justify-center min-h-[320px] items-center">
      {
          user!==null && user.headerImg && !Profile?.headerImage ?
          <div className="relative">
          <label className="cursor-pointer">
           <div className="w-[400px] max-w-[90%] cursor-pointer h-[100px] absolute z-20  flex justify-center items-center ">
             <input onChange={addProfileImage} className="hidden" type="file" />
             <CameraIcon
               
               className="w-10 h-10 text-blue-400  "
             />
           </div>
         </label>

       <Image className="rounded-lg" alt="profile_image" width={300} height={150} src={user?.headerImg}/>
       </div>:(
        Profile?.headerImage?

        <Image className="rounded-lg" alt="profile_image" width={300} height={150} src={Profile?.headerImage.toString()}/>:(
          <label className="cursor-pointer">
          <div className="w-[300px] max-w-[90%] bg-blue-400 cursor-pointer h-[150px]    flex justify-center items-center ">
            <input onChange={addProfileImage} className="hidden" type="file" />
            <CameraIcon
              
              className="w-10 h-10 text-white "
            />
          </div>
        </label>
        )
       )
        }
      </div>
    </div>
  );
}


function ProfileImage() {
  const [Profile, setProfile] = useRecoilState(profileState);
  const {query:{profileId}}=useRouter()
  const { data: session}=useSession()
  const currentId =session?.user.uid != undefined ? session?.user.uid : "";
  const {user} =useUser(currentId)

  const addProfileImage = async (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setProfile({ profileImage: readerEvent.target?.result });
    };
    console.log(Profile)
  };






  return (
    <div>
      <div className="flex flex-col sm:px-[100px] px-[25px]">
        <h1 className="sm:text-3xl text-2xl  font-bold tcolor ">
          Pick a Profile Picture
        </h1>
        <p className="text-xl tcolor ">
          Have a favourite selfie? Upload it now
        </p>
      </div>
      <div className="w-full flex justify-center min-h-[320px] items-center">
        {
          user!==null && user.userImg  && !Profile?.profileImage ?
          <div className="relative">
          <label className="cursor-pointer">
           <div className="w-[150px] cursor-pointer h-[150px] absolute z-20  flex justify-center items-center rounded-full">
             <input onChange={addProfileImage} className="hidden" type="file" />
             <CameraIcon
               
               className="w-10 h-10 text-blue-400  "
             />
           </div>
         </label>

       <Image className="rounded-full" alt="profile_image" width={150} height={150} src={user?.userImg}/>
       </div>:(
        Profile?.profileImage &&  

        <Image className="rounded-full" alt="profile_image" width={150} height={150} src={Profile?.profileImage.toString()}/>
       )
        }
      </div>
    </div>
  );
}

function ToggleComponent({ item }: any) {
  switch (item) {
    case "profile":
      return <ProfileImage />;
    case "HeaderImage":
      return <HeaderImage />;

    default:
      return null;
  }
}

const ProfileSettingModal = () => {
  const [Profile, setProfile] = useRecoilState(profileState);
  type Current = "profile" | "HeaderImage" | "Biodata" | "location";
  const { data: session}=useSession()
  const currentId =session?.user.uid != undefined ? session?.user.uid : "";
  const [current, setCurrent] = useState<Current>("profile");
  const [selectedFile,setSelectedFile] = useState("");
  const [loading,setLoading]=useState(false)
  const router =useRouter()

  function toggleIt() {
    if (current == "profile") {
      setCurrent("HeaderImage");
    }
  }




  

  console.log(Profile)
  
  async function addImageToDb(){
    if(current == "profile"){
    setLoading(true)
    const imageRef = ref(storage, `users/${currentId}/Profiles`);
    if(Profile?.profileImage){
     
       
        const stringImage= Profile?.profileImage.toString()
         await uploadString(imageRef, stringImage, "data_url").then(async () => {
           const downloadURL = await getDownloadURL(imageRef);
           await updateDoc(doc(db, "Users", currentId), {
             userImg: downloadURL,
           });
           setLoading(false)
            
          setCurrent("HeaderImage")
           
         });

       
    }
  }
  else if(current==="HeaderImage"){
    setLoading(true)
    if(Profile?.headerImage){
      const imageRef = ref(storage, `users/${currentId}/HeaderImages`);
       
      const stringImage= Profile?.headerImage.toString()
       await uploadString(imageRef, stringImage, "data_url").then(async () => {
         const downloadURL = await getDownloadURL(imageRef);
         await updateDoc(doc(db, "Users", currentId), {
           headerImg: downloadURL,
         });
         setLoading(false)
         router.push(`/profile/${currentId}`)
         
       });

     
  }
    

  }

  }


  return (
    <div className="fixed  top-0 left-0 bottom-0 right-0 sm:top-1/3 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/3 min-h-[90%] z-50 dark:bg-dark-second bg-white sm:w-[45%] w-[100%]  sm:rounded-2xl shadow-xl  overflow-y-auto  ">
      <div className="relative">
        {/* relative start here  */}
        <div>
          <div className="flex w-full  justify-center items-center mt-1">
          {
            current=="HeaderImage" && <div onClick={()=>setCurrent("profile")}  className="w-16 h-16    flex justify-center items-center hoverAn  p-0 sm:p-3">
             
            <ArrowLeftIcon     className="w-6 text-gray-900 dark:text-dtext1 " />
          
         </div>
          }
          
            <div className="w-16 h-16    flex justify-center items-center hoverAn  p-0 sm:p-3">
             

              <svg
                viewBox="0 0 24 24"
                className="w-8 h-8 text-blue-400 dark:text-white"
                fill="currentColor"
              >
                <g>
                  <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z"></path>
                </g>
              </svg>
            </div>
            
          </div>

          <ToggleComponent item={current} />
        </div>
        <div className="fixed bottom-0 left-0 right-0 w-full flex justify-center items-center mb-[50px] ">
          {current=="profile"?
            (
            Profile?.profileImage ?(
              <button
               onClick={addImageToDb}
              className=" text-md font-bold py-4 w-[60%] rounded-full brcolor  dark:bg-white text-white dark:text-black bg-black hover:bg-opacity-80 "
            >
              {loading?"Loading...":"Apply"}
            </button>
            ):
          
          <button
            onClick={toggleIt}
            className=" text-md font-bold py-4 w-[60%] rounded-full brcolor text-gray-900 dark:text-black  dark:bg-dtext1  "
          >
            Skip for now
          </button>
            ):
            (
              Profile?.headerImage ? (
                <button
                 onClick={addImageToDb}
                className=" text-md font-bold py-4 w-[60%] rounded-full brcolor  dark:bg-white text-white dark:text-black bg-black hover:bg-opacity-80 "
              >
                {loading?"Loading...":"Apply"}
              </button>
              ):
            
            <button
              onClick={()=>router.push("/")}
              className=" text-md font-bold py-4 w-[60%] rounded-full brcolor text-gray-900 dark:text-black  dark:bg-dtext1  "
            >
              Skip for now
            </button>
              )
}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingModal;
