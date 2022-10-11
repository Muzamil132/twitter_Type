import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import FollowerComp from '../../../components/FollowerComp'
import NestedProfileLayout from '../../../components/NestedProfileLayout'
import ProfileLayout from '../../../components/ProfileLayout'
import { useFollowHook } from '../../../customeHooks/useFollowHook'

const MyFollowers = () => {
    const { data: session } = useSession();
     const router= useRouter();
    const currentId = session?.user.uid != undefined ? session?.user.uid : "";
     console.log(router)
    const userId= router.query?.ProfileId!==undefined?router.query?.ProfileId! : ""
    console.log(userId)
    const {Followers}=useFollowHook(userId?.toString(),currentId)
    console.log(Followers)
  return (
    <div>
       <ProfileLayout>
       <div 
        className="mt-4 p-2"
       >
       {  Followers!==undefined &&
         Followers.map((follower:any,id:any)=>(
            <div className='rounded-xl overflow-hidden hover:bg-gray-100 dark:hover:bg-dark-third' key={id}>
            <FollowerComp  userId={follower.userId} userImg={follower?.userImg} username={follower?.username} />
            </div>
         ))

       }
       </div>

       
       </ProfileLayout>
    </div>
  )
}

export default MyFollowers