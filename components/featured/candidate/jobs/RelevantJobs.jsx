import React from 'react'
import JobsForYou from './JobsForYou'

function RelevantJobs({jobData}) {
  return (
    <div>
      <div className='flex gap-2  items-center'>

        <p className='text-[18px] font-semibold px-4'>
          Relevant Job Opportunities
        </p>

      </div>
      <JobsForYou isRelevant={true} jobData={jobData} />

    </div>
  )
}

export default RelevantJobs