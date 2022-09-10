
type SideBarItem={
    active?:boolean
    Icon:any,
    text:string
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
        text:"Home"
    },
    
    {
       
        Icon:HashtagIcon,
        text:"Explore"
    },
    {
       
        Icon:BellIcon,
        text:"Notifications"
    },
    {
       
        Icon:BookmarkIcon,
        text:"Messages"
    },
    {
       
        Icon:InboxIcon,
        text:"Bookmarks"
    },
   
    {
       
        Icon:UserIcon,
        text:"Profile"
    },
    {
       
        Icon:DotsCircleHorizontalIcon,
        text:"More"
    },
]
