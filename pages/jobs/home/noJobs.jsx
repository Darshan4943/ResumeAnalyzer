import React from 'react'

function NoJobs({name}) {
    return (
        <div className='flex flex-col gap-2 p-2 bg-noJobs sm:w-[337px] sm:h-[273px] w-[290px] h-[230px] bg-cover items-center justify-center '>
            <img
                src="/images/jobs/error.png"
                className="h-[30px] w-[30px] sm:h-[40px] sm:w-[40px] "
                alt=""
            />
            <p className='sm:text-[20px] text-[16px] font-semibold text-[#F54A00] text-wrap sm:w-[180px] w-[150px] text-center'>No {name} Jobs right now.</p>
            <img
                src="/images/jobs/bag.png"
                className="h-[100px] w-[170px] sm:h-[136px] sm:w-[226px] mt-2 "
                alt=""
            />
        </div>
    )
}

export default NoJobs
