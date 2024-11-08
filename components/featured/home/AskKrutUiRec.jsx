import React, { useEffect, useRef } from 'react';

import AskKrutAnimation from './AskKrutAnimation';
import { useRouter } from 'next/router';

export default function AskKrutUiRec() {
    const router = useRouter();
    return (
        <div className=" customMargins flex ml:flex-row flex-col-reverse ml:gap-[2vw] gap-8 xl:gap-12 items-center justify-between py-9 ml:pr-12">
            <div className="flex flex-col gap-6 ml:w-[45%] w-full text-[#333333] pr-6 ml:text-start text-center ml:items-start items-center ">
                <div className="font-semibold ml:text-[3.1vw] text-[28px] leading-tight">
                Meet <span className='text-[#06A9EF]'>“Krut”</span> {" "}
                Chatbot, Your Recruitment Companion
                </div>
                <div className='font-medium ml:text-[1.1vw] text-[14px]  w-[100%] break-words text-[#333333]'>
                Skilotech&apos;s AI chatbot is <span className='text-[#06A9EF]'>always available to answer your questions, 24/7.</span> No matter what time of day or night, you can reach out to our chatbot for assistance. With its ability to provide instant responses and personalized advice, <span className='text-[#06A9EF]'>our chatbot is the perfect tool for recruiters who want to stay ahead of the curve.</span>                </div>

                <button onClick={() =>
                   router.push("/auth?signin=true&role=recruiter")
                }
                      className="ml:px-10 px-6  py-3 bg-[#06A9EF] text-white  rounded-[12px] text-[14px] font-semibold btn_hover_effect max-w-[167px]"
                >
                    Get Started
                </button>
            </div>
           <AskKrutAnimation/>
        </div>
    );
}
