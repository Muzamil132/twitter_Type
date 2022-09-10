import React, { useEffect, useRef, useState } from "react";
import { NextPage } from "next";
import { GlobeAltIcon, MenuAlt4Icon } from "@heroicons/react/solid";


import {
  PhotographIcon,
  VideoCameraIcon,
  ChartBarIcon,
  EmojiHappyIcon,
  XIcon,
} from "@heroicons/react/outline";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { isWeakMap } from "util/types";
import { signOut, useSession } from "next-auth/react";

import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadString,uploadBytes } from "firebase/storage";

import {db,storage} from '../firebase'

// import "emoji-mart/css/emoji-mart.css";
const CreatePost= () => {
  // const ref = useRef<HTMLDivElement | null>(null);
  const pickerRef = useRef<HTMLInputElement>(null);
 
  const {data:session} =useSession()
  // console.log(ref)
  const [input, setInput] = useState<string>("");
  const [loading,setLoading]=useState(false)
  const [isEmoji, setEmoji] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  console.log(selectedFile);

  const addImage = async (e:any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target?.result);
    };
   
   
  };



  const iconArray = [
    PhotographIcon,
    VideoCameraIcon,
    ChartBarIcon,
    EmojiHappyIcon,
  ];

  const addEmoji = (e: any) => {
    let sym = e.unified.split("-");
    let codesArray: any = [];
    sym.forEach((el: any) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  const selectEmoji = (Icon: any) => {
    if (Icon === EmojiHappyIcon) {
      setEmoji(true);
    }
  };



  // send Post functionanility


  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
    
      id: session?.user.uid,
      username: session?.user.name,
      userImg: session?.user.image,
      tag: session?.user.tag,
      text: input,
      timestamp: serverTimestamp(),
     
    
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
       
     const stringImage= selectedFile.toString()
      await uploadString(imageRef, stringImage, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }
  
    setInput("");
    setSelectedFile(null);
    setLoading(false);
  };

 

  return (
    <div className="">

      <div
        className={`flex flex-col space-x-2 items-center border-b border-gray-700 pb-2 `}
      >
        <div className="flex flex-row  w-full items-center  space-x-2 px-3 py-2">
         
          <img
            src={session?.user.image}
            alt="name"
            className=" h-11 w-11 rounded-full  "
          />
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Whats happening . . . "
            className="flex-1 py-4 bg-green outline-none bg-black  "
          />
        </div>

         <div className=" flex flex-col w-full">
          <div className=" w-1/3 px-1 py-2 ml-3  hoverAn items-center justify-center space-x-1 hidden sm:flex bo ">
            <GlobeAltIcon className="h-5 w-5" />
            <span>Every one can reply</span>
          </div>
          {isEmoji && (
          <div className="relative   ">
            <div
              onClick={() => setEmoji(false)}
              className="  cursor-pointer  h-10 bg-blue-400 absolute z-20 w-10 -top-4 left-[335px] rounded-full flex justify-center items-center "
            >
              <XIcon className="h-5" />
            </div>
            <Picker theme="dark" data={data} onEmojiSelect={addEmoji}>
              Muzamil
            </Picker>
          </div>
        )}
         {selectedFile && (
            <div className="relative ">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt="name"
                className="rounded-2xl max-h-80  object-contain"
              />
            </div>
         )}


          {/* <hr className="border-b border-1 border-gray-700 mt-2 -ml-3" /> */}
          <div className="flex items-center justify-between p-2">
            <div className="flex space-x-3 ml-7  ">
              {iconArray.map((Icon, id) =>
                Icon === PhotographIcon ? (
                  <div
                    onClick={() => pickerRef.current?.click()}
                    className="h-10 w-10 flex items-center justify-center hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full cursor-pointer  "
                    key={id}
                  >
                    <input
                      className="hidden "
                      type="file"
                      ref={pickerRef}
                      onChange={addImage}
                    />

                    <Icon
                      onClick={() => selectEmoji(Icon)}
                      className="h-6  text-blue-400"
                    />
                  </div>
                ) : (
                  <div
                    className="h-10 w-10 flex items-center justify-center hover:bg-[#d9d9d9] hover:bg-opacity-10 rounded-full cursor-pointer    "
                    key={id}
                  >
                    <Icon
                      onClick={() => selectEmoji(Icon)}
                      className="h-6  text-blue-400 "
                    />
                  </div>
                )
              )}
            </div>
            <button onClick={sendPost} className=" mr-2 xl:inline ml-auto bg-[#1d9bf0] text-white rounded-full w-[100px] h-[40px] text-lg font-bold shadow-md hover:bg-[#1a8cd8] hover:bg-opacity-80  ">
              Tweet
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
