import { collection, DocumentData, onSnapshot, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect ,useState} from 'react'
import NestedProfileLayout from '../../components/NestedProfileLayout'
import PostItem from '../../components/PostItem'
import { db } from '../../firebase'

const ProfileId = () => {
  const [Posts,setPosts]=useState<DocumentData>()
  const router =useRouter()
  const profileId1= router.query.ProfileId!==undefined && router.query.ProfileId

  useEffect(()=>{
    const q =query(collection(db,"posts"),where("userId","==",profileId1))
    onSnapshot(q,(snapshot)=>{
      var postdata:any=[]
      snapshot.forEach((doc)=>{
        var obj={}
       
        obj={id:doc.id,...doc.data()}
        postdata.push(obj)
      
      })
      setPosts(postdata)
    });

  },[profileId1])

  console.log(Posts)

  return (
    <NestedProfileLayout>

      { Posts!==undefined && Posts.length==0?
        <div className='flex justify-center items-center text-white h-[100px] w-full'>
         You dont have any posts to display
        </div>:
        Posts!==undefined && Posts.map((post:any,id:any)=>(
          <PostItem   postId={post.id} username={post.username} tag={post.tag}  key={id} text={post.text} image={post?.image}  avatar={post.userImg}   />
        ))
      }
     
    </NestedProfileLayout>
  )
}

export default ProfileId