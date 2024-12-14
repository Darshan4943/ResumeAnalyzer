import React from 'react'

function RecommendedJobs() {
    return (
        <div className='flex flex-col p-6 bg-[#FFFFFF] rounded-[16px] gap-5'>
            <div className='flex gap-2 justify-between items-center'>
                <div className='flex flex-col gap-1 '>
                    <p className='text-[16px] font-semibold'>
                        Jobs for You
                    </p>
                    <p className='text-[14px] font-medium'>
                        Discover Personalized Job Recommendations
                    </p>

                </div>
                <div className='text-[#06A9EF] text-[14px] font-semibold'>
                    View All
                </div>

            </div>
            

        </div>
    )
}

export default RecommendedJobs