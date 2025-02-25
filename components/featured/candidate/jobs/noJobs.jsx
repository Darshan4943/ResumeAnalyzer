import React from 'react'

function NoJobs({name}) {
    return (
        <div className='flex flex-col gap-2 p-2  bg-cover items-center justify-center '>
          <p className='text-[36px] font-semibold text-[#FF6262]'>Sorry!</p>
            <p className=' text-[27px] font-medium  text-center'>No {name} Jobs were found.</p>
            <img
                src="/images/jobs/bag.png"
                className="h-[100px] w-[170px] sm:h-[222px] sm:w-[346px] mt-2 "
                alt=""
            />
        </div>
    )
}

export default NoJobs
