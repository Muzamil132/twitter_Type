import type { NextPage } from 'next'
import { getProviders, getSession, useSession } from "next-auth/react";
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import Login from '../components/Login';
import { MobileSideBar } from '../components/MobileSideBar';
import Sidebar from '../components/Sidebar'
import TimeLine from '../components/TimeLine'
import { mobileSidebarState } from '../store/atoms';
import styles from '../styles/Home.module.css'
import {useRecoilState} from 'recoil'




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

  const { data: session } = useSession();

  if (!session) return <Login providers={providers} />

  return (
    <div>
    <main className='bg-black min-h-screen  mx-auto relative  '>
    {
     
     isOpen && 
    <div className=' sm:hidden fixed top-0 right-0 left-0 bottom-0 bg-white bg-opacity-10 z-14  ' >

    </div>
           
         }
      {
     
  isOpen && 
 <MobileSideBar/>
        
      }
    
      <Sidebar/>
      {/* sidebar  */}
      <TimeLine/>
      {/* feed */}

      {/* widets */}
    </main>
    </div>
  )
}

export default Home


export async function getServerSideProps(context:any) {

  const providers = await getProviders();
  // console.log(providers)
  const session = await getSession(context);
  console.log(session)

  return {
    props: {
    
      providers,
     

     
    },
  };
}