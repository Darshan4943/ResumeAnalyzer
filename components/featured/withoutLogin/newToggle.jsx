import React, { useState, useEffect } from 'react';

function NewToggle() {
    const steps = [
        {
            candidate: {
                name: "Create Your Free Account",
                imgSrc: "/images/withoutLogin/cand1.png",
            },
            recruiter: {
                name: "Register your Organization",
                imgSrc: "/images/withoutLogin/rec1.png",
            },
        },
        {
            candidate: {
                name: "Build Your Profile",
                imgSrc: "/images/withoutLogin/cand2.png",
            },
            recruiter: {
                name: "Post the required Job Opening",
                imgSrc: "/images/withoutLogin/rec2.png",
            },
        },
        {
            candidate: {
                name: "Search & Apply for Your Dream Job",
                imgSrc: "/images/withoutLogin/cand3.png",
            },
            recruiter: {
                name: "Get desired talent shortlisted",
                imgSrc: "/images/withoutLogin/rec3.png",
            },
        },
        {
            candidate: {
                name: "Get Hired by a Desired Company",
                imgSrc: "/images/withoutLogin/cand4.png",
            },
            recruiter: {
                name: "Schedule interview & Hire right talent",
                imgSrc: "/images/withoutLogin/rec4.png",
            },
        },
    ];

    const [isCandidateView, setIsCandidateView] = useState(true);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIsCandidateView((prev) => !prev);
                setFade(true);
            }, 500);
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    const headingText = isCandidateView ? "Land Your Dream Job with Ease" : "Hire Top Talent Effortlessly";
    const headingColor = isCandidateView ? "text-blue" : "text-[#F9B700]";

    return (
        <div className='bg-[#EBF9FF] overflow-hidden'>
            <div className='customMargins w-full flex flex-col gap-6 py-[30px] transition-all duration-1000 ease-in-out'>
                <div className={`text-[24px] font-semibold text-center transition-all duration-1000 ease-in-out ${headingColor}`}>
                    {headingText}
                </div>
                <div className={`flex justify-between flex-wrap gap-4 transition-all duration-1000 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {steps.map((step, index) => (
                        <div key={index} className='flex flex-col items-center gap-4 w-[212px] transition-all duration-1000 ease-in-out'>
                            <img src={isCandidateView ? step.candidate.imgSrc : step.recruiter.imgSrc} alt='Step Image' className='w-[212px] h-[212px] object-contain' />
                            <p className='text-center text-[14px] font-semibold w-[200px]'>
                                {isCandidateView ? step.candidate.name : step.recruiter.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default NewToggle;
