import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import Index from ".";
import MessageInputBox from "../../components/MessageInputBox";
import MessageScreen from "../../components/MessageScreen";

const OneToOneChat = () => {
  const { data: session } = useSession();
  const imageUrl = session?.user.image != undefined ? session?.user.image : "";
  const router = useRouter();
  return (
    <Index>
      <div className="flex flex-col min-h-screen w-full relative">
        {/* chatHeader  */}
        <div className="flex items-center space-x-8 px-4 py-2 bg-[#18191a] absolute top-0 left-0 right-0 ">
          <div onClick={() => router.back()} className="   cursor-pointer ">
            <ArrowLeftIcon className="w-5  text-tw-blue" />
          </div>
          <div className="flex space-x-2 items-center ">
            <div className="h-[1.7rem] w-[1.7rem] sm:w-[2.5rem] sm:h-[2.5rem] flex rounded-full ">
              <Image
                height={50}
                width={50}
                src={imageUrl}
                alt="name"
                className=" h-11 w-11 rounded-full -z-3 "
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">Muzamil</span>
              <span className="text-sm text-gray-200 font-light -mt-1">
                online
              </span>
            </div>
          </div>
          </div>

         
        {/* chatHeader done  */}
        <MessageScreen/>
        <MessageInputBox/>
      </div>
    </Index>
  );
};

export default OneToOneChat;
