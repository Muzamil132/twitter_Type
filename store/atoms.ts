import {atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'
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