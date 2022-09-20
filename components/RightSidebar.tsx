import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/solid";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import SearchBox from "./SearchBox";
import TrendComponent from "./TrendComponent";

const RightSidebar = () => {
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
    <div className=" hidden fixed top-0 sm:ml-[910px] sm:w-[450px] sm:flex flex-col">
      <div className="px-4 sm:px-6 sm:w-[460px] ">
        <SearchBox />
        {/* Search Box Completed  */}

        <div className="bg-neutral-900 rounded-xl h-[450px]  py-3 mt-4">
          <h1 className="text-2xl font-semibold mb-3 px-3 text-white">
            Trends for You
          </h1>
          <div>

          
          {
            trendingArray.map((item,id)=>(
              <TrendComponent key={id} where={item.where} tweets={item.tweets} trend={item.trend}    />
            ))
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
