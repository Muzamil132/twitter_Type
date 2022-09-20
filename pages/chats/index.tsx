import React, { useRef, useEffect, useState } from "react";
import Layoute from "../../components/Layoute";
import SvgIcon from "../../components/SvgIcon";
import {
  ChatIcon,
  CogIcon,
  InboxInIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { InboxIcon } from "@heroicons/react/outline";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
const Index = ({children}:any) => {
  const IconArray = [ChatIcon, CogIcon];
  const { data: session } = useSession();
  const imageUrl = session?.user.image != undefined ? session?.user.image : "";
  const [activeSearch, setSearchActive] = useState<boolean>(false);
  const {pathname} =useRouter()
  console.log(pathname)
  const searchBox = useRef<HTMLDivElement>(null);
  const SearchResultBox = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!activeSearch) return;
    function handleClick(event: any) {
      if (searchBox.current && !searchBox.current.contains(event.target)) {
        setSearchActive(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [activeSearch]);

  return (
    <Layoute>
      <div className="flex min-h-screen sm:w-[97%] w-full">
        <div className={`sm:flex-[33%] ${pathname!=="/chats" &&"hidden sm:flex flex-col" }  flex-1 border-r border-gray-700`}>
          <div className="px-4 mt-4 flex  justify-between  ">
            <p className="text-xl font-semibold text-white">Messages</p>
            <div className="flex space-x-3">
              {IconArray.map((item, id) => (
                <div
                  className="h-10 w-10 flex rounded-full hover:bg-neutral-800 justify-center items-center "
                  key={id}
                >
                  {" "}
                  <SvgIcon Icon={item} />
                </div>
              ))}
            </div>
          </div>
          <div className="px-4">
            <div
              onClick={() => setSearchActive(true)}
              ref={searchBox}
              className={`mt-3 bg-black border ${
                !activeSearch && "border-[#18191a]"
              }  flex space-x-2 rounded-full py-[0.45rem] sm:py-3 px-5 ${
                activeSearch && "border-gray-200 border"
              }  `}
            >
              <SearchIcon className="h-5 sm:h-6 text-white" />
              <input
                placeholder="Search Twitter"
                className="outline-none text-white text-md sm:text-lg bg-transparent "
              />
            </div>
          </div>
          {/* Message Request  */}

          <div className="flex px-4 py-2 space-x-2 items-start mt-2 hover:bg-[#18191a] ">
            <div className="h-[2.5rem] w-[2.5rem] sm:w-[3rem] sm:h-[3rem] flex rounded-full border border-gray-500 justify-center items-center ">
              {" "}
              <InboxIcon className="h-5 w-5 sm:h-6 sm:w-6  " />
            </div>

            <div className="flex flex-col">
              <p className="text-sm sm:text-lg  font-semibold text-white">
                Message Requests
              </p>
              <span className="text-sm sm:text-md text-gray-200 ">
                5 pending requests
              </span>
            </div>
          </div>
          {/* Message Request Completed */}

          <div className="flex px-4 py-2 space-x-2 items-start mt-2 hover:bg-[#18191a] ">
            <div className="h-[2.5rem] w-[2.5rem] sm:w-[3rem] sm:h-[3rem] flex rounded-full ">
              <Image
                height={50}
                width={50}
                src={imageUrl}
                alt="name"
                className=" h-11 w-11 rounded-full -z-3 "
              />
            </div>

            <div className="flex flex-col">
              <p className="text-sm sm:text-lg  font-semibold text-white">
                Message Requests
              </p>
              <span className="text-sm sm:text-md text-gray-200 t ">
                You accepted the request
              </span>
            </div>
          </div>
        </div>
        <div className={`sm:flex-[62%]  ${pathname=="/chats" &&"hidden sm:flex " }  flex-1 border-r border-gray-700`}>
         {
            pathname=="/chats" &&    <div className="h-[100%] w-[100%] hidden sm:flex items-center justify-center">
            <div className="flex flex-col justify-start ">
              <h1 className="text-3xl font-semibold">Select a Message</h1>
              <span className="text-sm sm:text-lg text-gray-300 w-[350px]  ">
                Choose from your existing conversations, start a new one, or
                just keep swimming.
              </span>
              <button className=" py-3 xl:inline mt-3 bg-[#1d9bf0] text-white rounded-full w-[200px] h-[52px] text-lg font-bold shadow-md hover:bg-[#1a8cd8]">
                New message
              </button>
            </div>
          </div>
         }
        
         {children}

        </div>
      </div>
    </Layoute>
  );
};

export default Index;
