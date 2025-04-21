import React, { useState } from 'react'
import JobsForYou from './JobsForYou'

function RelevantJobs({ jobData,isdata, setIsData }) {
  
  return (
    <>
      {isdata &&
        <div>
          <div className='flex gap-2  items-center   '>

            <p className='text-[18px] font-semibold px-4'>
              Relevant Job Opportunities
            </p>

          </div>
          <JobsForYou isRelevant={true} jobData={jobData} setIsData={setIsData} />

        </div>
      }
    </>
  )
}

export default RelevantJobs