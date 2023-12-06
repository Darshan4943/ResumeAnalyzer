
import React, { useState } from 'react';
import AiResumePage from '../../../../pages/services/AiResumePage';
import { useRouter } from 'next/router';

function SkillAssessment( ) {
  const router = useRouter();



  const handleClick = () => {
   
    router.push('/services/SkillAssessment'); 
  };

  return (
    <>
      <div onClick={handleClick}>SkillAssessment</div>
    </>
  );
}

export default SkillAssessment;
