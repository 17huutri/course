import React, { useState } from 'react';

export default function Clock() {
  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  const updateTime = () => {
    setCurrentTime(getCurrentTime());
  };

  setInterval(updateTime, 1000); 

  return (
    <div className='absolute bottom-[2%] right-[2%]'>
      <h1 className='text-white font-medium text-[50px]'>{currentTime}</h1>
    </div>
  );
}
