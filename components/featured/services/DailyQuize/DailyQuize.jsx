
import React, { useState } from 'react';
import AiResumePage from '../../../../pages/services/AiResumePage';
import { useRouter } from 'next/router';

function DailyQuize( ) {
  const router = useRouter();

 

  const handleClick = () => {
   
    router.push('/services/DailyQuize'); 
  };

  return (
    <>
      <div onClick={handleClick}>DailyQuize</div>
    </>
  );
}

export default DailyQuize;
