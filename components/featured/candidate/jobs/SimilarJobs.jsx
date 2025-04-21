import React, { useState } from 'react'
import JobsForYou from './JobsForYou'

function SimilarJobs({ jobData }) {
    const [isdata, setIsData] = useState(true)
    return (

        <>
            {isdata &&
                <div className='flex flex-col gap-4 pt-6'>
                    <div className='flex gap-2  items-center'>

                        <p className='text-[18px] font-semibold '>
                            Similar Jobs
                        </p>

                    </div>
                    <JobsForYou isSimilar={true} jobData={jobData} setIsData={setIsData} />

                </div>
            }
        </>

    )
}

export default SimilarJobs