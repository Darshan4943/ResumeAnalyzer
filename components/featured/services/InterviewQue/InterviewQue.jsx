
import React, { useState } from 'react';
import AiResumePage from '../../../../pages/services/AiResumePage';
import { useRouter } from 'next/router';

function InterviewQue( ) {
  const router = useRouter();

  const [aiResumePage, setAiResumePage] = useState(false);

  const handleClick = () => {
   
    router.push('/services/InterviewQue'); 
  };

  return (
    <>
      <div onClick={handleClick}>InterviewQue</div>
    </>
  );
}

export default InterviewQue;
