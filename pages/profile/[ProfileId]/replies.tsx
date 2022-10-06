import { getSession } from 'next-auth/react'
import React from 'react'
import NestedProfileLayout from '../../../components/NestedProfileLayout'

const Replies = () => {
  return (
    <NestedProfileLayout>
        <p>Replies here</p>
    </NestedProfileLayout>
  )
}

export default Replies

export async function getServerSideProps(context:any) {


  // console.log(providers)
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  return {
    props: {
    
    },
  };
 
}
