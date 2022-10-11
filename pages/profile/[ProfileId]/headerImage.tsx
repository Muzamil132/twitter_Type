import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ModalImages } from '../../../components/ModalImages'

const HeaderImage = () => {
    const router= useRouter()
    const imgUrl= router.query.imageUrl!==undefined?router.query.imageUrl : ""
  return (
    <div>
         <ModalImages>
            <div>

          
            <Image
            
            width={500}
            height={500}
            layout="fill"
            objectFit='contain'
            src={imgUrl.toString()}
            className="z-"
            alt="chatimg" />
        
        </div>
        </ModalImages>
    </div>
  )
}

export default HeaderImage
