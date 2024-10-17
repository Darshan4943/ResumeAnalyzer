import React, { useEffect, useRef } from 'react';

import AskKrutAnimation from './AskKrutAnimation';

export default function AskKrutAi() {

    return (
        <div className=" customMargins flex ml:flex-row flex-col-reverse ml:gap-[2vw] gap-8 xl:gap-12 items-center py-9">
            <div className="flex flex-col gap-6 ml:w-[45%] w-full text-[#333333] pr-6 ml:text-start text-center ml:items-start items-center ">
                <div className="font-semibold ml:text-[3vw] text-[28px] leading-tight">
                    Get Curated Advice
                    <p className="text-[#06A9EF]">
                        <span className='font-semibold ml:text-[3vw] text-[28px] w-[100%] break-words text-[#333333]'>from </span> “Krut” <span className='font-semibold ml:text-[3vw] text-[28px] w-[100%] break-words text-[#333333]'>Skilotech&apos;s </span>
                        <span className="font-semibold ml:text-[3vw] text-[28px] w-[100%] break-words text-[#333333]">
                            Personalized
                        </span>
                        {" "}  AI Chatbot
                    </p>
                </div>

                <div className='font-medium ml:text-[1.1vw] text-[14px]  w-[100%] break-words text-[#333333]'>
                    Our AI chatbot is powered by advanced technology that allows it to understand and respond to your queries in a natural and informative way. Whether you&apos;re looking for job search tips, resume writing advice, or career guidance, our chatbot can provide you with the information you need. With Skilotech&apos;s AI chatbot, you have a knowledgeable and helpful resource at your fingertips
                </div>

                <button onClick={() =>
                    router.push("/auth?signin=true&role=user")
                }
                    className="ml:px-10 px-6  py-3 bg-[#06A9EF] text-white  rounded-[12px] text-[14px] font-semibold btn_hover_effect max-w-[167px]"
                >
                    Get Started
                </button>
            </div>
            <AskKrutAnimation />
        </div>
    );
}
