import React from 'react'
import {CheckCircleIcon ,DotsHorizontalIcon } from '@heroicons/react/solid'
import {HeartIcon,ShareIcon,UploadIcon,ChatAlt2Icon} from '@heroicons/react/outline'

interface IProps{
  text:string
  image:string
  avatar:string
  tag:string,
  username:string,

}

const PostItem = ({text,image,avatar,username,tag}:IProps) => {
    return (
        <div className=" border-gray-700 px-3 py-2 border-b ">
            <div className="flex px-1 py-2">
            <img className="inline-block  h-11 w-11 rounded-full " src={avatar} alt="yyy"/>
            <div className="flex flex-col w-full pl-2">

            <div className="flex space-x-1 justify-between items-center">
            <div className="flex ">
            <h1 className="text-sm font-bold  truncate">{username}</h1>
            <CheckCircleIcon className="w-5  text-tw-blue "/>
           
            </div>
            <div className="h-10 w-10 flex  rounded-full items-center  justify-center hover:bg-black">
            <DotsHorizontalIcon  className="w-6  text-tw-blue"/>
            </div>
           
            </div>
            <p className="text-left"  >
             {text}
            </p>

            <div className="py-3  overflow-hidden">
            
            {
              image &&  <img className="rounded-xl " src={image} alt="" />
            }    
            </div>
            {/* <div  className="flex justify-between py-2">
              <Icons Icon={ChatAlt2Icon} color="text-tw-blue"/>
              <Icons Icon={HeartIcon} color="text-red-400" />
              <Icons Icon={ShareIcon} color="text-green-400"/>
              <Icons Icon={UploadIcon} color="text-tw-blue"/>
              
            </div> */}
            </div>
            </div>
        </div>
    )
}

export default PostItem