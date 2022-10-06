import type { NextPage } from 'next'
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from 'next/head'
import Image from 'next/image'
import { useCallback, useState } from 'react';
import Login from '../components/Login';
import { MobileSideBar } from '../components/MobileSideBar';
import Sidebar from '../components/Sidebar'
import TimeLine from '../components/TimeLine'
import { mobileSidebarState, modalState } from '../store/atoms';
import styles from '../styles/Home.module.css'
import {useRecoilState} from 'recoil'
import Modal from '../components/Modal';
import FullViewImage from '../components/FullViewImage';
import {useEffect} from 'react'
import { addDoc, collection, doc, getDoc, onSnapshot, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase';
import SearchCompoent from '../components/RightSidebar';
import BottomBar from '../components/BottomBar';





interface Provider {
  
  
    google: {
      id: string
      name: string
      signinUrl: string
      callbackUrl: string
    }
  
}

export interface IProps{
  providers:Provider,
 
}

const Home: NextPage<IProps> = ({providers}) => {
 
  const [isOpen,setISopen] =useRecoilState(mobileSidebarState)
  const [modalOpen ,setModalOpen]=useRecoilState(modalState)
  const { data: session } = useSession();
  
  const id=session?.user.uid!=undefined?session?.user.uid:""
    async function addUser(){
      await setDoc(doc(db,"Users",id.toString()),{
        username: session?.user.name,
        userImg : session?.user.image,
        userId: session?.user.uid,


      })
    }

  const  addUsertoDb = useCallback(async()=>{
   if(id){

   
    onSnapshot(doc(db, "Users",id.toString()),(snapshot)=>{
      if(!snapshot.exists()){
        addUser()
        
      }
      
    })
  }




  },[id])


   
  useEffect(()=>{
    if(session!==undefined){
      addUsertoDb()
    }
    

  },[session,addUsertoDb])




  if (!session) return <Login providers={providers} />

  return (
    <div>
    <main className=' min-h-screen  mx-auto relative  '>
    {
     
     isOpen && 
    <div className=' sm:hidden fixed top-0 right-0 left-0 bottom-0 bg-white bg-opacity-10 z-30  ' >

    </div>
           
         }
         {
     
     modalOpen && 
    <div className='  fixed top-0 right-0 left-0 bottom-0 bg-black opacity-20 z-20  ' >

    </div>
           
         }
      {
     
  isOpen && 
 <MobileSideBar/>
        
      }
    
      <Sidebar/>
      {/* sidebar  */}
      <TimeLine/>

     {
       modalOpen &&
       (
        <div className='fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 min-h-[70%] z-50 dark:bg-dark-second bg-white sm:w-1/2 w-[90%] rounded-xl sm:rounded-2xl shadow-xl  overflow-y-auto  '>
        <Modal>
          <FullViewImage/>
        </Modal>
        </div>
       )
      
     } 
      
     <SearchCompoent/>
     <BottomBar/>
    </main>
    </div>
  )
}

export default Home


export async function getServerSideProps(context:any) {

  const providers = await getProviders();
  // console.log(providers)
  const session = await getSession(context);
  // if (!session) {
  //   return {
  //     redirect: {
  //       destination: '/',
  //       permanent: false,
  //     },
  //   }
  // }

  return {
    props: {
    
      providers,
     

     
    },
  };
}