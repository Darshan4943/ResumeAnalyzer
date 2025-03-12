import React, { useState } from 'react';

function FrequentAskQue() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleAnswer = (index) => {
        setOpenIndex(openIndex === index ? null : index); 
    };

    const questions = [
        {
            que: "How can I create and update my profile on Skilotech ",
            ans: `To create a profile, click on the "Sign Up" button and fill in the required details. To update your profile, log in, click on your name in the top-right corner, and select "My Profile."`,
        },
        {
            que: "How do I apply for jobs through Skilotech? ",
            ans: `Use the search bar to find suitable job openings. Click on a job title to view details, then click "Apply" and upload your resume to submit your application.`,
        },
        {
            que: "How can I post a job listing on Skilotech?",
            ans: `Log in to your recruiter account and navigate to the "Job Posting" section. Fill in the required job details, such as the job title and description, then submit the listing. `,
        },
        {
            que: "How do I search for and contact potential candidates? ",
            ans: `Navigate to the "Job Post" section and use the "Profile Match" feature to find suitable candidates. You can use the "Shortlist" and "Reject" buttons to notify candidates via email. Additionally, you can directly contact them through the platform.`,
        },
        {
            que: "What services does Skilotech offer to employers?",
            ans: "Skilotech provides employers with tools to post job listings, search for candidates, and manage the recruitment process efficiently. Additional services include JD (Job Description) matching and JD creation to streamline hiring.",
        },
       
    ];

    return (
        <div className="customMargins flex flex-col scr460:gap-[42px] gap-6 pb-[100px] w-full">
            <p className="scr460:text-[30px] text-[18px] font-[600] text-center">Frequently Asked Questions</p>
            <div className="flex gap-[10px]  items-center">
                <img
                    src="/images/withoutLogin/freqAsk.png"
                    alt=""
                    className="h-[344px] min-w-[327px] object-cover ml:block hidden "
                />
                <div className="flex flex-col gap-1 px-[10px] w-full ">
                    {questions.map((que, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-[14px] justify-between scr460:py-[18px] scr460:pl-[20px] py-2 pl-2  scr460:pr-12 pr-2 border-b-[0.5px] border-[#EAEAEA]"
                        >
                            <div className="flex justify-between items-start scr460:gap-0 gap-1">
                                <p className=" scr460:text-[16px] text-[14px] font-[500]">{que.que}</p>
                                <svg
                                    onClick={() => toggleAnswer(index)}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="cursor-pointer min-w-[24px]"
                                >
                                    <rect
                                        width="24"
                                        height="24"
                                        rx="12"
                                        fill="#D9D9D9"
                                    />
                                    <g mask="url(#mask0_6099_3011)">
                                        <path
                                            d={
                                                openIndex === index
                                                    ? "M11.9998 9.3225C11.8793 9.3225 11.7671 9.3417 11.6633 9.3802C11.5594 9.4187 11.4607 9.4847 11.367 9.5782L6.87276 14.0725C6.73442 14.211 6.66359 14.3851 6.66026 14.5947C6.65709 14.8042 6.72792 14.9815 6.87276 15.1265C7.01776 15.2713 7.19342 15.3438 7.39976 15.3438C7.60609 15.3438 7.78176 15.2713 7.92676 15.1265L11.9998 11.0532L16.0728 15.1265C16.2113 15.2648 16.3853 15.3357 16.595 15.339C16.8045 15.3422 16.9818 15.2713 17.1268 15.1265C17.2716 14.9815 17.344 14.8058 17.344 14.5995C17.344 14.3932 17.2716 14.2175 17.1268 14.0725L12.6325 9.5782C12.5388 9.4847 12.4401 9.4187 12.3363 9.3802C12.2324 9.3417 12.1203 9.3225 11.9998 9.3225Z"
                                                    : "M11.9998 14.6775C11.8793 14.6775 11.7671 14.6583 11.6633 14.6198C11.5594 14.5813 11.4607 14.5153 11.367 14.4218L6.87276 9.9275C6.73442 9.789 6.66359 9.61492 6.66026 9.40525C6.65709 9.19575 6.72792 9.0185 6.87276 8.8735C7.01776 8.72867 7.19342 8.65625 7.39976 8.65625C7.60609 8.65625 7.78176 8.72867 7.92676 8.8735L11.9998 12.9468L16.0728 8.8735C16.2113 8.73517 16.3853 8.66433 16.595 8.661C16.8045 8.65783 16.9818 8.72867 17.1268 8.8735C17.2716 9.0185 17.344 9.19417 17.344 9.4005C17.344 9.60683 17.2716 9.7825 17.1268 9.9275L12.6325 14.4218C12.5388 14.5153 12.4401 14.5813 12.3363 14.6198C12.2324 14.6583 12.1203 14.6775 11.9998 14.6775Z"
                                            }
                                            fill="#333333"
                                        />
                                    </g>
                                </svg>
                            </div>
                            {openIndex === index && (
                                <div className="scr460:text-[14px] text-[12px]  font-[400]">{que.ans}</div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FrequentAskQue;
