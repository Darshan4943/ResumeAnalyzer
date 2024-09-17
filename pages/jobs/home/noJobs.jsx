import React from 'react'

function NoJobs({name}) {
    return (
        <div className='flex flex-col gap-2 p-2 bg-noJobs w-[337px] h-[273px]  bg-cover items-center justify-center '>
            <img
                src="/images/jobs/error.png"
                className="h-[40px] w-[40px] "
                alt=""
            />
            <p className='text-[20px] font-semibold text-[#F54A00] text-wrap w-[180px] text-center'>No {name} Jobs right now.</p>
            <img
                src="/images/jobs/bag.png"
                className="h-[143px] w-[226px] mt-2 "
                alt=""
            />
        </div>
    )
}

export default NoJobs
