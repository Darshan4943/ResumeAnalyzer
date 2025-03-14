import React, { useState } from 'react';

import SelectPostJd from './SelectPostJd';

function RequestCV() {
    const [isResumes, setIsResumes] = useState('post');

    return (
        <div className='w-full flex flex-col gap-4 '>
            <div className='h-[36px]'>
            </div>
            <div className='p-4 bg-white rounded-[16px] flex flex-col gap-4 min-h-[560px]'>


                <div className="bg-[#F9F9F9] w-[348px] flex rounded-[30px] text-[14px] font-semibold">
                    <button
                        className={`${isResumes === "post"
                            ? "bg-[#06A9EF] py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
                            : "py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%]"
                            }`}
                        onClick={() => setIsResumes("post")}
                    >
                        Select Job Post
                    </button>
                    <button
                        className={`${isResumes === "manual"
                            ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
                            : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%]"
                            }`}
                        onClick={() => setIsResumes("manual")}
                    >
                        Manual
                    </button>
                </div>
                {isResumes === "post" ?
                    <div>
                      
                        <SelectPostJd />
                    </div>

                    :
                    <div className='text-[16px] font-semibold'>
                        Please fill out the form to request a CV from Skilotech
                    </div>
                }
            </div>

        </div>
    );
}

export default RequestCV;
