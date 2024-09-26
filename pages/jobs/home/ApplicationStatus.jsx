import React from 'react'

function ApplicationStatus() {

    const Application_status = [
        {
            tittle: "Total Applied Jobs",
            img: (
                <img
                    className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#06A9EF]"
                    src="/images/jobs/work_white.png"
                    alt=""
                />
            ),
            num: "60",
        },
        {
            tittle: "New Updates",
            img: (
                <img
                    className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#FF9B52]"
                    src="/images/jobs/work_history.png"
                    alt=""
                />
            ),
            num: "09",
        },
        {
            tittle: "Search appearances",
            img: (
                <img
                    className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#D197FF]"
                    src="/images/jobs/Icon.png"
                    alt=""
                />
            ),
            num: "60",
        },
        {
            tittle: "Shortlisted",
            img: (
                <img
                    className="p-[6px] rounded-[32px] h-[32px] w-[32px] bg-[#47C945]"
                    src="/images/jobs/check.png"
                    alt=""
                />
            ),
            num: "04",
        },
    ];

    return (
        <div className={`flex flex-col rounded-md bg-white shadow-md py-6 ms:px-4 px-2  items-start gap-4 h-fit `}>
            <div className="flex flex-col items-center gap-[8px]">
                <p className="text-[22px] font-[500] text-[#333] ">
                    Application Status
                </p>
                <p className="text-[12px] leading-[18px] text-[#333]">
                    Track your job applications, get updates on views and
                    profile activity.
                </p>
            </div>
            <div className="w-[100%] bg-[#06A9EF] h-[1px]"></div>
            <div className='flex ms:flex-col flex-row flex-wrap w-[100%] justify-center gap-4 '>
                {Application_status.map((item, index) => (
                    <>
                        <div className="flex justify-between gap-2 max-w-[200px] w-[40%] ms:w-full ms:max-w-full">
                            <div className="flex flex-col  gap-[8px] justify-between items-start">
                                <div className="flex justify-center">
                                    <p className="text-[14px] font-[500] text-[#333]">
                                        {item.tittle}
                                    </p>
                                </div>
                                <p className="text-[36px] font-[500] text-[#333] ">
                                    {item.num}
                                </p>
                            </div>
                            {item.img}
                        </div>
                        <div
                            className={`w-[100%]  h-[1px] web600 ${index === Application_status.length - 1
                                ? ""
                                : "bg-[#06A9EF] "
                                }`}
                        ></div>
                       <div
                            className={`w-[1px]  h-[100px] mobile600 ${ index === 1 || index===3
                                ? ""
                                : "bg-[#06A9EF] "
                                }`}
                        ></div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default ApplicationStatus
