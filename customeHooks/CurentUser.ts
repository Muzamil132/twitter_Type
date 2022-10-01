import { useSession } from "next-auth/react";


export function useCurrentUserHook(){

    const {data:session}=useSession();
    let id = session?.user.uid !==undefined? session?.user.uid:"";
    let username = session?.user.name !==undefined? session?.user.name:"";
    let userImg = session?.user.image !==undefined? session?.user.image:"";
    const currentId= id.toString();
    return [
        currentId,username,userImg
    ]
}