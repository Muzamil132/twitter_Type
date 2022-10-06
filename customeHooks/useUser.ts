import { doc, onSnapshot } from "firebase/firestore";
import React from "react"
import { db } from "../firebase";
export function useUser(userId:string){
    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        if(userId){
            onSnapshot(doc(db,"Users",userId),(snapshot)=>{
                setUser(snapshot.data())
            })

        }


    },[userId])

    return {
        user,
        
    }
    
}