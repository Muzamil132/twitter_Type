import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/solid";
import { NextPage } from "next";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import FollowersBox from "./FollowersBox";
import SearchBox from "./SearchBox";
import TrendComponent from "./TrendComponent";

interface IProps{
  onLayout?:boolean 
}

const RightSidebar:NextPage<IProps> = ({onLayout}) => {
  var trendingArray = [
    {
      where: "trending in Pakistan",
      trend: "#ViralVideo",
      tweets: 7888,
    },
    {
      where: "trending in Pakistan",
      trend: "Lanat",
      tweets: 8888,
    },
    {
      where: "trending in Technology",
      trend: "#Python",
      tweets: 19389,
    },
    {
      where: "trending in Technology",
      trend: "#Bitcoin",
      tweets: 193788,
    },
  ];

  return (
    <div className={`hidden  ${!onLayout && " fixed top-0 sm:ml-[895px] sm:w-[400px]"} sm:w-[400px] sm:flex flex-col`}>
      <div className="px-4 sm:px-6 sm:w-[460px] ">
        <SearchBox />
        
        
        {/* Search Box Completed  */}
        <div className="h-[600px] overflow-y-auto pb-[50px] sm:w-[410px] sm:pr-4 ">
       
        <FollowersBox/>
        <div className=" dark:bg-dark-second bg-gray-100 rounded-xl h-[300px] overflow-y-auto py-3 mt-4">
          <h1 className="text-2xl font-semibold mb-3 px-3 dark:text-white">
            Trends for You
          </h1>
          <div>
    
          
          {
            trendingArray.map((item,index)=>(

                <TrendComponent key={index} where={item.where} tweets={item.tweets} trend={item.trend}    />
            ))
          }
          </div>
        </div>
        {/* Trend Componet completd  */}

       
        
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
