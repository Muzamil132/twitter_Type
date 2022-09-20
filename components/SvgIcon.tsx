import React from 'react'

interface IProps{
    Icon:any
}

const SvgIcon = ({Icon}:IProps) => {
  return (
    <div>
        <Icon className="h-6 w-6"  />
    </div>
  )
}

export default SvgIcon