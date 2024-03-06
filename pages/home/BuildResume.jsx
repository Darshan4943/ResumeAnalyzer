import React, { useState } from "react";

import { useRouter } from "next/router";
import ALink from "../../components/alink";
const ArrowLeft = ({ index }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
    >
        <g mask="url(#mask0_3991_32467)">
            <path
                d="M8.525 22L6.75 20.225L14.975 12L6.75 3.775L8.525 2L18.525 12L8.525 22Z"
                fill="#333333"
                className={index != 2 && "svg_classs"}
            />
        </g>
    </svg>
);

function BuildResume() {
    const router = useRouter();
    const clientId = router.query.clientId;
   
   
    return (
        <>
            <div className="flex justify-center  w-full my-[3rem] ">
                <div className="w-full flex flex-col gap-[36px] pb-[10px]  items-center">
                    <div className="ml:w-[55%] sm:w-[80%] w-[95%] ">
                        <div className="text-[#333] text-center text-[36px] ms:text-[40px] font-[600]">
                            How would you like to create your resume?
                        </div>
                        <div className="text-[#646464] text-center text-[16px] ms:text-[16px] font-[500]">
                            Craft your resume manually or upload for easy restructuring. Choose what works for you to highlight your professional journey effortlessly.
                        </div>
                    </div>
                    <div className="flex justify-center item-center">
                        <div className="flex flex-col gap-[24px] px-[8px]">
                            <ALink href={`/auth/Candidate_register?isResume=true&clientId=${clientId}`}>
                                <div className="px-[16px] py-9 z-0 flex flex-row justify-between rounded-[16px] gap-3 relative sign_up_shadow">
                                    <div className="flex flex-row justify-center item-center gap-[8px] ">
                                        <div className="flex items-center">

                                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">


                                                <path className="svg_classs" d="M38.3333 55H41.6667V41.6667H55V38.3333H41.6667V25H38.3333V38.3333H25V41.6667H38.3333V55ZM40.0112 70C35.8627 70 31.9624 69.2128 28.3103 67.6384C24.6583 66.064 21.4815 63.9272 18.7799 61.2283C16.0784 58.5293 13.9397 55.3554 12.3638 51.7068C10.7879 48.0582 10 44.1596 10 40.0112C10 35.8627 10.7872 31.9624 12.3616 28.3103C13.936 24.6583 16.0728 21.4815 18.7717 18.7799C21.4707 16.0784 24.6446 13.9397 28.2932 12.3638C31.9418 10.7879 35.8404 10 39.9888 10C44.1373 10 48.0376 10.7872 51.6897 12.3616C55.3417 13.936 58.5185 16.0727 61.2201 18.7717C63.9216 21.4707 66.0603 24.6446 67.6362 28.2932C69.2121 31.9418 70 35.8404 70 39.9888C70 44.1373 69.2128 48.0376 67.6384 51.6897C66.064 55.3417 63.9272 58.5185 61.2283 61.2201C58.5293 63.9216 55.3554 66.0603 51.7068 67.6362C48.0582 69.2121 44.1596 70 40.0112 70ZM40 66.6667C47.4444 66.6667 53.75 64.0833 58.9167 58.9167C64.0833 53.75 66.6667 47.4444 66.6667 40C66.6667 32.5556 64.0833 26.25 58.9167 21.0833C53.75 15.9167 47.4444 13.3333 40 13.3333C32.5556 13.3333 26.25 15.9167 21.0833 21.0833C15.9167 26.25 13.3333 32.5556 13.3333 40C13.3333 47.4444 15.9167 53.75 21.0833 58.9167C26.25 64.0833 32.5556 66.6667 40 66.6667Z" fill="#333333" />
                                                <defs>

                                                </defs>
                                            </svg>



                                            <div>
                                                <div className="text-[20px] font-[500] sign_ip_text">
                                                    Create New Resume
                                                </div>
                                                <div className="text-[14px] font-[500] text-[#646464] sign_ip_text">
                                                    Enter your details manually
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <ArrowLeft />
                                    </div>
                                    <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
                                </div>
                            </ALink>
                            <ALink href={`/auth/Candidate_register?clientId=${clientId}`}>
                                <div className="px-[16px] py-9 z-0 flex flex-row justify-between rounded-[16px] gap-3 relative sign_up_shadow">
                                    <div className="flex flex-row justify-center item-center gap-[8px] ">
                                        <div className="flex items-center">

                                            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">


                                                <path className="svg_classs" d="M38.3333 59.2308H41.6667V43.5833L48.6667 50.5833L51.0257 48.2052L40 37.1795L28.9743 48.2052L31.3526 50.5642L38.3333 43.5833V59.2308ZM22.0512 70C20.5171 70 19.2361 69.4861 18.2083 68.4583C17.1805 67.4306 16.6667 66.1496 16.6667 64.6154V15.3846C16.6667 13.8504 17.1805 12.5694 18.2083 11.5417C19.2361 10.5139 20.5171 10 22.0512 10H48.3333L63.3333 25V64.6154C63.3333 66.1496 62.8194 67.4306 61.7917 68.4583C60.7639 69.4861 59.4829 70 57.9487 70H22.0512ZM46.6667 26.6667V13.3333H22.0512C21.5385 13.3333 21.0684 13.547 20.641 13.9743C20.2137 14.4017 20 14.8718 20 15.3846V64.6154C20 65.1282 20.2137 65.5983 20.641 66.0257C21.0684 66.453 21.5385 66.6667 22.0512 66.6667H57.9487C58.4615 66.6667 58.9316 66.453 59.359 66.0257C59.7863 65.5983 60 65.1282 60 64.6154V26.6667H46.6667Z" fill="#333333" />

                                            </svg>



                                            <div>
                                                <div className="text-[20px] font-[500] sign_ip_text">
                                                    Already Have a Resume
                                                </div>
                                                <div className="text-[14px] font-[500] text-[#646464] sign_ip_text">
                                                    Upload your resume
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <ArrowLeft />
                                    </div>
                                    <div className="h-[100%] w-[0%] bg-[#06a9ef] absolute z-[-1] top-[0px] left-[0]  sign_up_blue_hover"></div>
                                </div>
                            </ALink>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default BuildResume;
