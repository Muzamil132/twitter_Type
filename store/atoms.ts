import {atom } from 'recoil'

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