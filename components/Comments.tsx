import { ChatAlt2Icon, DotsHorizontalIcon, HeartIcon, ShareIcon, UploadIcon } from "@heroicons/react/solid";
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect } from "react";
import { db } from "../firebase";
import Icons from "./Icons";
interface IProps {
  userId: string;
  commentText: string;
  userImg: string;
  username: string;
}

const Comments = ({ userId, commentText, username }: IProps) => {
  const { data: session } = useSession();



  return (
    <div className="px-4 py-2 border-b border-gray-700">
      <div className="flex space-x-3 items-start">
        <Link href={`/profile/${userId}`}>
          <img
            className="inline-block  h-11 w-11 rounded-full "
            src={session?.user.image}
            alt="yyy"
          />
        </Link>
        <div className="flex-1">
          <div className=" flex  items-center  ">
            <div className="flex items-center space-x-1 flex-1 ">
              <Link href={`/profile/${userId}`}>
                <p className="text-lg font-semibold">Muzamil</p>
              </Link>
              <p className="text-sm text-gray-300">@muzamil900</p>

              <p className="text-sm text-gray-300">.7h</p>
            </div>
            <div className="h-10 w-10 flex  rounded-full items-center  justify-center hover:bg-[#18191a]">
              <DotsHorizontalIcon className="w-6  text-tw-blue" />
            </div>
          </div>
          <p className="text-sm text-gray-3">
            Replying to{" "}
            <span className="text-md text-blue-400 font-semibold">
              {username}
            </span>
          </p>
          <p className="text-white text-lg ">{commentText}</p>
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
