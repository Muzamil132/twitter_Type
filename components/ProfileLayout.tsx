import { NextPage } from "next";
import React from "react";
import CreatePost from "./CreatePost";
import FollowersBox from "./FollowersBox";
import RightSidebar from "./RightSidebar";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";
import TrendComponent from "./TrendComponent";

const ProfileLayout = ({ children }: any) => {
  return (
    <div className="h-screen flex">
      <div className=" hidden sm:block sm:w-[350px] ">
        <div className=" h-screen  fixed overflow-y-auto  ">
         <Sidebar/>
        </div>
      </div>
      <div className="flex-[0.8] border-l border-gray-700 " >
       {children}
      </div>

      <div className=" px-4 py-3  hidden sm:block flex-[0.5] border-l border-gray-700" >
       <div className="fixed">
        
      
       <RightSidebar onLayout />
       </div>
      </div>

      <div>

      </div>
     
    </div>
  );
};

export default ProfileLayout;
