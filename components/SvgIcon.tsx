import React from 'react'

interface IProps{
    Icon:any
}

const SvgIcon = ({Icon}:IProps) => {
  return (
    <div>
        <Icon className="h-5 sm:h-7"  />
    </div>
  )
}

export default SvgIcon