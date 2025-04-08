import React, { useState, useEffect } from 'react';

const NewToggleTab = () => {
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
    const [visibleArrows, setVisibleArrows] = useState([]);
    const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setVisibleArrows([]);
            setTimeout(() => {
                setIsCandidateView((prev) => !prev);
                setFade(true);
                revealArrowsSequentially();
            }, 500);
        }, 12000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (fade) {
            revealArrowsSequentially();
        }
    }, [fade]);

    const revealArrowsSequentially = () => {
        setVisibleArrows([]);
        steps.slice(0, steps.length - 1).forEach((_, index) => {
            setTimeout(() => {
                setVisibleArrows((prev) => [...prev, index]);
            }, (index + 1) * 3000);
        });
    };

    const headingText = isCandidateView ? "Land Your Dream Job with Ease" : "Hire Top Talent Effortlessly";
    const headingColor = isCandidateView ? "text-blue" : "text-[#F9B700]";

    // Swap index 2 and 3 if screen width is between 768px and 1150px
    const modifiedSteps = [...steps];
    if (windowWidth >= 768 && windowWidth < 1150) {
        [modifiedSteps[2], modifiedSteps[3]] = [modifiedSteps[3], modifiedSteps[2]];
    }

    return (
        <div className='bg-[#EBF9FF] overflow-hidden'>
            <div className='customMargins w-full flex flex-col gap-6 py-[30px] transition-all duration-1000 ease-in-out'>
                <div className={`text-[24px] font-semibold text-center transition-all duration-1000 ease-in-out ${headingColor}`}>
                    {headingText}
                </div>
                <div className={`flex justify-evenly items-center flex-wrap transition-all duration-1000 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {modifiedSteps.map((step, index) => (
                        <div key={index} className={`flex ${index === 0 ? "items-start" : "items-center"} ${index === 0 ? "flex-col scr772:flex-row" : ""} ${index === 1 ? "flex-col scr1150:flex-row" : ""} items-center min-w-[272px] scr500:min-w-[342px] scr1150:min-w-[272px] gap-2`}>
                            <div className='flex flex-col items-center gap-4 w-[212px] scr500:w-[322px] scr1150:w-[212px] transition-all duration-1000 ease-in-out '>
                                <img src={isCandidateView ? step.candidate.imgSrc : step.recruiter.imgSrc} alt='Step Image' className='w-[212px] h-[212px] object-contain' />
                                <p className='text-center text-[14px] font-semibold w-[200px]'>
                                    {isCandidateView ? step.candidate.name : step.recruiter.name}
                                </p>
                            </div>
                            <div className={index === modifiedSteps.length - 1 ? 'w-0 h-0' : `w-[52px] h-[90px]
                                ${index === 0 ? 'rotate-0' : ''}
                                 ${index === 1 ? 'rotate-90' : ''}
                                  ${index === 2 ? 'rotate-180 ' : ""} 
                                  `}>
                                {index !== modifiedSteps.length - 1 && visibleArrows.includes(index) && (
                                    <svg width="52" height="16" viewBox="0 0 52 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_10087_135372)">
                                            <path d="M0 7C-0.552285 7 -1 7.44772 -1 8C-1 8.55228 -0.552285 9 0 9L0 7ZM52 8L42 2.2265L42 13.7735L52 8ZM1.85714 9C2.40943 9 2.85714 8.55229 2.85714 8C2.85714 7.44772 2.40943 7 1.85714 7L1.85714 9ZM5.57143 7C5.01914 7 4.57143 7.44772 4.57143 8C4.57143 8.55229 5.01914 9 5.57143 9L5.57143 7ZM9.28571 9C9.838 9 10.2857 8.55229 10.2857 8C10.2857 7.44772 9.838 7 9.28571 7L9.28571 9ZM13 7C12.4477 7 12 7.44772 12 8C12 8.55229 12.4477 9 13 9L13 7ZM16.7143 9C17.2666 9 17.7143 8.55229 17.7143 8C17.7143 7.44772 17.2666 7 16.7143 7L16.7143 9ZM20.4286 7C19.8763 7 19.4286 7.44772 19.4286 8C19.4286 8.55229 19.8763 9 20.4286 9L20.4286 7ZM24.1429 9C24.6951 9 25.1429 8.55229 25.1429 8C25.1429 7.44772 24.6951 7 24.1429 7L24.1429 9ZM27.8571 7C27.3049 7 26.8571 7.44772 26.8571 8C26.8571 8.55229 27.3049 9 27.8571 9L27.8571 7ZM31.5714 9C32.1237 9 32.5714 8.55229 32.5714 8C32.5714 7.44772 32.1237 7 31.5714 7L31.5714 9ZM35.2857 7C34.7334 7 34.2857 7.44772 34.2857 8C34.2857 8.55229 34.7334 9 35.2857 9L35.2857 7ZM39 9C39.5523 9 40 8.55229 40 8C40 7.44772 39.5523 7 39 7L39 9ZM42.7143 7C42.162 7 41.7143 7.44772 41.7143 8C41.7143 8.55229 42.162 9 42.7143 9L42.7143 7ZM46.4286 9C46.9809 9 47.4286 8.55229 47.4286 8C47.4286 7.44772 46.9809 7 46.4286 7L46.4286 9ZM50.1429 7C49.5906 7 49.1429 7.44772 49.1429 8C49.1429 8.55229 49.5906 9 50.1429 9L50.1429 7ZM0 9L1.85714 9L1.85714 7L0 7L0 9ZM5.57143 9L9.28571 9L9.28571 7L5.57143 7L5.57143 9ZM13 9L16.7143 9L16.7143 7L13 7L13 9ZM20.4286 9L24.1429 9L24.1429 7L20.4286 7L20.4286 9ZM27.8571 9L31.5714 9L31.5714 7L27.8571 7L27.8571 9ZM35.2857 9L39 9L39 7L35.2857 7L35.2857 9ZM42.7143 9L46.4286 9L46.4286 7L42.7143 7L42.7143 9Z" fill="#374957" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_10087_135372">
                                                <rect width="52" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))
                    }
                </div >
            </div >
        </div >)
}

export default NewToggleTab
