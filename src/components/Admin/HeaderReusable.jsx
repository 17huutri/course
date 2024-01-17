import React from 'react'

export default function HeaderReusable({text,border}) {
  return (
    <div className={`flex mb-4 py-4 border-${border} border-solid border-gray_2`}>
        <h1 className='text-[25px] text-[#453f3f] font-semibold '>{text}</h1>
    </div>
  )
}
