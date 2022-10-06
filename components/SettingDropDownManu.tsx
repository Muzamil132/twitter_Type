import { CogIcon, DotsHorizontalIcon } from "@heroicons/react/solid";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { useUser } from "../customeHooks/useUser";

import {
  LogoutIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/outline";
import { ItemsList } from "./SidebarItemlist";
import SvgIcon from "./SvgIcon";
import Icons from "./Icons";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Router, { useRouter } from "next/router";
const Items = [
  {
    icon: LogoutIcon,
    title: "Log Out",
  },
  {
    icon: MoonIcon,
    title: "Dispay Mood",
  },
  {
    icon: UserCircleIcon,
    title: "Profile Setting",
  },
];

const SettingDropDownManu = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);
  const userId = session?.user.uid !== undefined ? session?.user.uid : "";
  const { user } = useUser(userId);
  const [activeSearch, setSearchActive] = useState(false);
  const searchBox = useRef<HTMLDivElement>(null);
  const buttonBox = useRef<HTMLDivElement>(null);
 const router= useRouter()
  useEffect(() => {
    // only add the event listener when the dropdown is opened
    if (!activeSearch) return;
    function handleClick(event: any) {
      if (searchBox.current && buttonBox.current && !buttonBox.current.contains(event.target) && !searchBox.current.contains(event.target)) {
        setSearchActive(false);
      }
    }
    window.addEventListener("click", handleClick);
    // clean up
    return () => window.removeEventListener("click", handleClick);
  }, [activeSearch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  function handleClick(icon: any) {
    switch (icon) {
      case LogoutIcon:
        signOut();
        setSearchActive(false)
        break;
      case MoonIcon || MoonIcon:
        currentTheme === "light" ? setTheme("dark") : setTheme("light");
        setSearchActive(false)
        break;
     case UserCircleIcon:
        router.push(`/profile/${userId}/setting`)
        setSearchActive(false)
      default:
        break;
    }
  }


  return (
    <div  className=" relative  px-0 py-0 flex cursor-pointer  items-center justify-center h-10 w-10  ">
      <div ref={buttonBox} className="w-10 h-10 rounded-full dark:bg-dark-second bg-gray-100 flex justify-center items-center " onClick={()=>setSearchActive(true)}>
      <CogIcon  className="w-7 h-7 tcolor" />
      </div>
      {activeSearch &&
      <div
        ref={searchBox}
        className="  
        
        absolute z-40 flex flex-col top-[45px] right-0 rounded-md shadow-lg w-[250px] p-2 dark:bg-dark-second bg-gray-100 min-h-[200px]"
      >
        <div className="flex space-x-2 items-center border-b dark:border-dark-third pb-2">
          <Image
            width={40}
            height={40}
            src={user?.userImg}
            alt=""
            className="rounded-full"
          />
          <div className=" xl:inline leading-5">
            <h4 className="font-bold text-gray-900 text-md dark:text-dtext1  ">
              {session?.user.name}
            </h4>
          </div>
        </div>
        <div>
          {Items.map((item: any, id: any) => (
            <div
              onClick={() => handleClick(item.icon)}
              className=" tcolor flex space-x-2 items-center mt-3 rounded-lg py-2 px-2 hover:dark:bg-dark-third hover:bg-gray-200 "
              key={id}
            >
              <div className="h-10 w-10 tcolor rounded-full dark:bg-dark-main  bg-gray-300 flex justify-center items-center ">
                <SvgIcon
                  Icon={
                    item.icon === MoonIcon
                      ? currentTheme == "light"
                        ? item.icon
                        : SunIcon
                      : item.icon
                  }
                />
              </div>
              <h4 className="font-semibold text-md dark:text-dtext1  ">
                {item.title}
              </h4>
            </div>
          ))}
        </div>
      </div>
}
    </div>
  );
};

export default SettingDropDownManu;
