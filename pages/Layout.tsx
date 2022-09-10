import React from 'react'

const Layout = () => {
  return (
    <div
    className='bg-white min-h-screen flex '
    >  
        <div className='w-[350px] min-h-screen fixed top-0    bg-green-400 '>
            kkk
        </div>
        <div className='w-[600px] min-h-screen ml-[350px]  bg-blue-400  '>
            {
                  [...Array(200)].map((x,id)=>(
                    <p key={id} >muzamil</p>
                  ))
            }
          
        </div>
        <div className='w-[1000px] min-h-screen fixed ml-[950px]  bg-purple-400  '>
            kkk
        </div>


    </div>
  )
}

export default Layout