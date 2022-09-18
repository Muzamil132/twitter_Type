
type SideBarItem={
    active?:boolean
    Icon:any,
    text:string
    href:string
}



import {HomeIcon} from "@heroicons/react/solid"

import {

    HashtagIcon,
    BellIcon,
    InboxIcon,
    BookmarkIcon,
    ClipboardListIcon,
    UserIcon,
    DotsCircleHorizontalIcon,
    DotsHorizontalIcon,
  } from "@heroicons/react/outline";
import { ReactComponentElement } from "react";
import Home from "../pages";

export const ItemsList:SideBarItem[]=[
    {
        active:true,
        Icon:HomeIcon,
        text:"Home",
        href:"/"
        

    },
    
    {
       
        Icon:HashtagIcon,
        text:"Explore"
        ,
        href:"/"
    },
    {
       
        Icon:BellIcon,
        text:"Notifications",
        
        href:"/"
    },
    {
       
        Icon:BookmarkIcon,
        text:"Messages",
        
        href:"/"
    },
    {
       
        Icon:InboxIcon,
        text:"Bookmarks"
        ,
        href:"/"
    },
   
    {
       
        Icon:UserIcon,
        text:"Profile"
        ,
        href:"/"
    },
    {
       
        Icon:DotsCircleHorizontalIcon,
        text:"More",
        
        href:"/"
    },
]
