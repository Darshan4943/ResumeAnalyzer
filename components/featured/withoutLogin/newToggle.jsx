import React, { useState, useEffect } from 'react';
import NewToggleDesk from '../../common/newToggleDesk';
import NewToggleTab from '../../common/newToggleTab';
import NewToggleMob from '../../common/newToggleMob';

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
    const [visibleArrows, setVisibleArrows] = useState([]); // Track arrow visibility

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setVisibleArrows([]); // Reset arrow visibility
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

    return (
        <>
            <div className='hidden scr1135:block'>
                <NewToggleDesk />
            </div>
            <div className='hidden scr772:block scr1135:hidden'>
                <NewToggleTab />
            </div>
            <div className='block scr772:hidden'>
                <NewToggleMob />
            </div>
        </>
    );
}

export default NewToggle;
