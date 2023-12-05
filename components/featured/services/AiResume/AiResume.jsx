import React, { useState } from 'react'
import AiResumePage from './AiResumePage'

function AiResume({ services, setServices }) {

  const [aiResumePage, setAiResumePage] = useState(false)
  
  const handleClick = () => {
    setServices(false);
    setAiResumePage(true)

  };
  return (
    <>
      {!aiResumePage && 
        <div onClick={handleClick}>AiResume</div>
      }

      {aiResumePage &&  

        <AiResumePage />
      
      

      }

    </>

  )
}

export default AiResume