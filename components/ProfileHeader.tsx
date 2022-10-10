import {
  ChatIcon,
  DotsHorizontalIcon,
  InboxIcon,
  InboxInIcon,
} from "@heroicons/react/solid";
import { profile } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useCallback } from "react";
import { useRecoilState } from "recoil";
import { useCurrentUserHook } from "../customeHooks/CurentUser";
import { useFollowHook } from "../customeHooks/useFollowHook";
import { useUser } from "../customeHooks/useUser";
import { currentChat } from "../store/atoms";
import { addFollower } from "../Utilities/functions";

import Loader from "./Loader";

interface IProps {
  name: string;
  profileImage: string;
}

const ProfileHeader = ({ name, profileImage }: IProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    query: { profileId },
    asPath,
  } = useRouter();
  const [scrollY, setScrollY] = useState(0);
  const profileId1 =
    router.query.ProfileId !== undefined ? router.query.ProfileId : "";
  const [existingChat, setExistingChat] = useRecoilState(currentChat);
  const [currentId, username, userImg] = useCurrentUserHook();
  const {user} =useUser(profileId1.toString())
  const [isFollowing] = useFollowHook(
    profileId1.toString(),
    currentId.toString()
  );

  console.log(profileId1,"profileId1")

  const imageUrl =
    "https://cdn.pixabay.com/photo/2019/09/26/18/57/wasp-4506782_960_720.jpg";
  const image =
    "https://cdn.pixabay.com/photo/2022/09/13/11/29/girl-7451711_960_720.jpg";

  const profileNavItem = [
    {
      title: "Tweets",
      href: `/profile/${profileId1}`,
    },
    {
      title: "replies",
      href: `/profile/${profileId1}/replies`,
    },
    {
      title: "Media",
      href: `/profile/${profileId1}/media`,
    },
    {
      title: "Likes",
      href: `/profile/${profileId1}/likes`,
    },
  ];

  const routeToChat = () => {
    var conversationId =
      currentId > profileId1
        ? `${currentId.toString() + profileId1}`
        : `${profileId1 + currentId.toString()}`;

    setExistingChat({
      myId: currentId,
      recieverId: profileId1.toString(),
      recieverName: name,
      recieverImg: profileImage,
      conversationId,
    });
    router.push({
      pathname: "/chats/${conversationId}",
      query: {
        recieverId: profileId1,
        recieverName: name,
        recieverImg: profileImage,
        conversationId,
      },
    });
  };

  const followHim = (e: any) => {
    addFollower(
      e,
      isFollowing,
      profileId1.toString(),
      currentId.toString(),
      username.toString(),
      userImg.toString()
    );
  };
  return (
    <div>
      <Image
        layout="responsive"
        width={700}
        height={250}
        className="-z-3"
        src={user?.headerImg?user?.userImg:imageUrl}
        alt="header image"
      />
      <div className="w-full flex items-end justify-between sm:-mt-[75px] -mt-[45px] px-4 ">
        <div className="rounded-full border-4 z-[2] dark:border-dark-third sm:w-[135px] w-[90px]">
          <Image
            layout="responsive"
            width={150}
            height={150}
            className="rounded-full -z-10"
            src={user?.userImg}
            alt="header image"
          />
        </div>
        {currentId == profileId1 ? (
          <div>
            <button
            onClick={()=>router.push(`/profile/${profileId1}/setting`)}
              className={`text-md border  hover:bg-gray-100 dark:bg-light1 dark:border-dark-third  px-4 py-[0.35rem] dark:text-black text-black  font-semibold  rounded-full `}
            >
              Set up Profile
            </button>
          </div>
        ) : (
          <div className="flex  space-x-1">
            {isFollowing && (
              <div
                onClick={routeToChat}
                className="h-9 w-9 flex cursor-pointer  rounded-full items-center border dark:border-dtext2 justify-center "
              >
                <ChatIcon className="w-6 text-gray-900  dark:text-dtext1" />
              </div>
            )}

            <div className="h-9 w-9 flex  cursor-pointer  rounded-full items-center border dark:border-dtext2 justify-center ">
              <DotsHorizontalIcon className="w-6 dark:text-dtext2 text-gray-900" />
            </div>
            <button
              onClick={followHim}
              className={`text-md shadow-xl ${
                isFollowing
                  ? "bg-blue-400 dark:dark-text-dtext1 "
                  : " text-black bg-gray-100 "
              } outline-none " }    px-4 py-[0.35rem]   font-bold rounded-full `}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          </div>
        )}
      </div>
      <div className="px-3 mt-5">
        <p className="text-md font-bold">{name}</p>
        <p className="text-sm text-black dark:text-white">@PathtoNowhereEN</p>
        <p className="text-sm text-black dark:text-white">date of joing</p>
        <Link href="/">
          <p className="text-sm dark:text-white text-black font-semibold">
            {0} Following &nbsp;&nbsp;&nbsp;&nbsp; {15} Number of followers{" "}
          </p>
        </Link>
      </div>
      <div className="flex justify-between  mt-4 first-line sm:h-12  ">
        {profileNavItem.map((item: any, id: any) => (
          <Link
            key={id}
            href={item.href}
            className="hover:bg-[#19181a] cursor-pointer"
          >
            <div className="flex justify-center items-center cursor-pointer hover:dark:bg-dark-third hover:bg-gray-100  w-full">
              {/* <p className={`border-b py-[10px] `}>Tweets</p> */}
              <div
                className={` h-full font-semibold ${
                  asPath == item.href && " border-b-2 border-blue-400"
                } flex justify-center items-center text-black dark:text-white `}
              >
                {item.title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
