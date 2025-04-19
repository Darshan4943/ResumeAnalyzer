import React from 'react'
import JobsForYou from './JobsForYou'

function SimilarJobs({jobData}) {
    return (


        <div className='flex flex-col gap-4 pt-6'>
            <div className='flex gap-2  items-center'>

                <p className='text-[18px] font-semibold '>
                    Similar Jobs
                </p>

            </div>
            <JobsForYou isSimilar={true} jobData={jobData} />

        </div>

    )
}

export default SimilarJobs