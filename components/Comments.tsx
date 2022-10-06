import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, ShareIcon, UploadIcon } from "@heroicons/react/solid";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useUser } from "../customeHooks/useUser";
import { db } from "../firebase";
import Icons from "./Icons";
interface IProps {
  userId: string;
  commentText: string;
  userImg: string;
  username: string;
}

const Comments = ({ userId, commentText, username,userImg }: IProps) => {
  const { data: session } = useSession();
  // const userId =session?.user.uid !==undefined? session?.user.uid:""
  const {user} = useUser(userId)




  return (
    <div className="px-4 py-2 border-b dark:border-dark-third">
      <div className="flex space-x-3 items-start">
        <Link href={`/profile/${userId}`}>
          <img
            className="inline-block  h-11 w-11 rounded-full "
            src={user?.userImg}
            alt="yyy"
          />
        </Link>
        <div className="flex-1">
          <div className=" flex  items-center  ">
            <div className="flex items-center space-x-1 flex-1 ">
              <Link href={`/profile/${userId}`}>
                <p className="text-lg text-black dark:text-white font-semibold">{username}</p>
              </Link>
             
              <p className="text-sm text-black dark:text-white">.7h</p>
            </div>
            <div className="h-10 w-10 flex  rounded-full items-center  justify-center hover:bg-[#18191a]">
              <DotsHorizontalIcon className="w-6  text-tw-blue" />
            </div>
          </div>
          <p className="text-sm text-black dark:text-white">
            Replying to{" "}
            <span className="text-md text-blue-400 font-semibold">
              {username}
            </span>
          </p>
          <p className="text-black dark:text-white text-lg ">{commentText}</p>
          <div  className="flex justify-between ">
             
             
              <Icons   Icon={HeartIcon} color="text-red-400" />
              <Icons Icon={ShareIcon} color="text-green-400"/>
              <Icons Icon={UploadIcon} color="text-tw-blue"/>
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
