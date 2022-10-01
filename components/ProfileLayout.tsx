import { NextPage } from "next";
import React from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../store/atoms";
import BottomBar from "./BottomBar";
import CreatePost from "./CreatePost";
import FollowersBox from "./FollowersBox";
import FullViewImage from "./FullViewImage";
import Modal from "./Modal";
import RightSidebar from "./RightSidebar";
import SearchBox from "./SearchBox";
import Sidebar from "./Sidebar";
import TrendComponent from "./TrendComponent";

const ProfileLayout = ({ children }: any) => {
  const [modalOpen ,setModalOpen]=useRecoilState(modalState)
  return (
    <div className="relative" >
       {
     
     modalOpen && 
    <div className='  fixed top-0 right-0 left-0 bottom-0 bg-white opacity-20 z-[44]  ' >

    </div>
           
         }
        {
       modalOpen &&
       (
        <div className='fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-h-[70%] z-50 bg-black sm:w-1/2 w-[90%] rounded-xl sm:rounded-2xl shadow-xl  overflow-y-auto  '>
        <Modal/>
         
     
        </div>
       )
      
     } 

     <BottomBar/>
  
    <div className=" overflow-x-auto flex w-[100%] ">
      <div className=" hidden sm:block sm:w-[75px] xl:w-[320px] xl:flex-[23%] ">
        <div className=" h-screen sm:w-[75px] xl:w-[320px] fixed overflow-y-auto border-r dark:border-dark-third  ">
         <Sidebar/>
        </div>
      </div>
      <div className="flex-[40%] h-screen" >
       {children}
      </div>

      <div className=" px-4   hidden sm:block flex-[35%]" >
       <div className="fixed  border-l -ml-4 dark:border-dark-third">
        
      
       <RightSidebar onLayout />
       </div>
      </div>

      <div>

      </div>
     
    </div>
    </div>
  );
};

export default ProfileLayout;
