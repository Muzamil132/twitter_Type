
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
       
        Icon:BellIcon,
        text:"Notifications",
        
        href:"/"
    },
    {
       
        Icon:InboxIcon,
        text:"Messages",
        
        href:"/chats"
    },
    {
       
        Icon:BookmarkIcon,
        text:"Bookmarks"
        ,
        href:"/"
    },
   
    {
       
        Icon:UserIcon,
        text:"Profile"
        ,
        href:"/profile/:profileId"
    },
    {
       
        Icon:DotsCircleHorizontalIcon,
        text:"More",
        
        href:"/"
    },
]
