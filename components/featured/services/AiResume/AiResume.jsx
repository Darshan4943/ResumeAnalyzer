import React, { useState } from 'react';
import AiResumePage from '../../../../pages/services/AiResumePage';
import { useRouter } from 'next/router';

function AiResume( ) {
  const router = useRouter();

  const [aiResumePage, setAiResumePage] = useState(false);

  const handleClick = () => {
   
    router.push('/services/AiResumePage'); 
  };

  return (
    <>
      <div onClick={handleClick}>AiResume</div>
    </>
  );
}

export default AiResume;
