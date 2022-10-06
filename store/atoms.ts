import { doc, DocumentData, onSnapshot } from 'firebase/firestore';
import { useRef } from 'react';
import {atom, selector, selectorFamily } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { db } from '../firebase';
const { persistAtom } = recoilPersist()
export const mobileSidebarState = atom({
    key: "sidebar",
    default: false,
  });



  export const modalState = atom({
    key: "modalState",
    default: false,
  });

  export const postState = atom({
    key: "currentPost",
    default: "",
  });

  export const currentChat = atom({
    key: "currentChat",
    default: {
       myId:"",
      recieverId:'',
            recieverName:"",
            recieverImg:"",
            conversationId:""
    },
    effects_UNSTABLE: [persistAtom],
  });

  interface ProfileSetting{
    profileImage?:string | ArrayBuffer | null ,
    headerImage?:string,
    biodata?:string,
    location?:string

  }


  export const profileState = atom<ProfileSetting  | any>({
    key: "profileSetting",
    default: {}
  });