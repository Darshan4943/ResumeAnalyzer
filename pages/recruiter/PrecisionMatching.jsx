import React, { useEffect, useRef, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';
import { useRouter } from 'next/router';
function PrecisionMatching() {
    const [isGreen, setIsGreen] = useState(false)
    const [isGreenTick, setIsGreenTick] = useState(false)
    const [positionIndex, setPositionIndex] = useState();
    const controls = useAnimation();
    const [showColor, setShowColor] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const router = useRouter()
    const precisionRef = useRef(null);
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setPositionIndex(0);
                    observer.unobserve(entry.target);
                }
            });
        }, options);
        if (precisionRef.current) {
            observer.observe(precisionRef.current);
        }
        return () => {
            observer.disconnect();
        };
    }, [precisionRef]);
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token && token != "undefined") {
            if (token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        }
    }, []);
    const clickHandler = () => {
        if (isLogin) {
            router.push("/transform/JobMatching");
        } else {
            router.push("/auth?signin=true");
        }
    };
    const positions = [
        { bottom: '-5%', right: '32.5%' },
        { bottom: '-5%', right: '19%' },
        { bottom: '18%', right: '4.5%' },
        // { bottom: '30%', right: '34%' },
        { bottom: '46.5%', right: '60.5%' },
        { bottom: '58%', right: '20%' },
        { bottom: '5.5%', right: '61%' },
        { bottom: '30%', right: '34%' },
    ];
    useEffect(() => {
        const interval = setInterval(() => {
            if (positionIndex === positions.length - 1) {

                setPositionIndex(0)
            } else {

                setPositionIndex(index => (index + 1) % positions.length);
            }
        }, positionIndex === positions.length - 1 ? 5000 : 1500);
        return () => clearInterval(interval);
    }, [positionIndex, positions.length]);
    useEffect(() => {
        controls.start({ ...positions[positionIndex], transition: { duration: 0.8 } });
        if (positionIndex === 0) {
            setIsGreen(false);
            setIsGreenTick(false)
        }
        if (positionIndex === 2) {
            setShowColor(true);
        } else if (positionIndex === positions.length - 1) {
            const timeout = setTimeout(() => {
                setShowColor(false);
                setIsGreen(true)
            }, 1000);
            const timeoutt = setTimeout(() => {
                setIsGreenTick(true)
            }, 1500);
            // const timeouttt = setTimeout(() => {
            //     setIsGreen(false)
            //     setIsGreenTick(false)
            // }, 2300);
            return () => clearTimeout(timeout, timeoutt,);
        }
    }, [positionIndex, controls, positions.length]);
    return (
        <div ref={precisionRef} className='flex ml:flex-row flex-col gap-12 w-[100%] items-center justify-center   ml:py-1 py-6 overflow-hidden customMargins'>
            <div className='relative ml:w-[46%] w-[100%]'>
                <img className='min-w-[46%] ' src="/images/recruiter/recruiterAni.png" alt="" />
                <motion.img
                    animate={controls}
                    className='absolute w-[32%] '
                    src="/images/recruiter/magnify.png"
                    alt=""
                />
                <div
                    className="absolute flex flex-col gap-2 bottom-[35%] right-[40%] w-[15%]"
                    style={{
                        opacity: showColor ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                    }}
                >
                    <div className='bg-[#DEDEDE] rounded-[16px] w-[100%] h-[8px]'>
                        <div className={`${positionIndex === 6 ? "rounded-[16px]" : "rounded-l-[16px]"} line-animation ${positionIndex === 2 ? "bg-[#0C8A0A] w-[80%]" : positionIndex === 3 ? "bg-[#C00000] w-[25%]" : positionIndex === 4 ? "bg-[#598A0A] w-[70%]" : positionIndex === 5 ? "bg-[#FFA800] w-[48%]" : positionIndex === 6 ? "bg-[#0C8A0A] w-[100%]" : ""} h-[8px]`}></div>                    </div>
                    <div className='bg-[#DEDEDE] rounded-[16px] w-[100%] h-[8px]'>
                        <div className='bg-[#06A9EF] rounded-l-[16px] w-[70%] h-[8px]'></div>
                    </div>
                </div>
                <div
                    style={{
                        opacity: positionIndex === 6 ? 1 : 0,
                        transform: isGreenTick ? "scale(1.2)" : "none",
                        transition: isGreenTick ? "transform 1s ease-in-out" : (positionIndex === 6 ? "opacity 1s ease-in-out" : "")
                    }}
                    className={`flex items-center justify-center absolute border ${isGreen ? "bg-[#0C8A0A] border-[#0C8A0A] " : "bg-white border-[#646464]"}  w-[9.02%] h-[10%] bottom-[58%]   right-[30%]  rounded-full`}
                >
                    <img style={{
                        opacity: isGreenTick ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                    }} className='w-[55%] h-[45%]' src="/images/recruiter/correct.png" alt="" />
                </div>
            </div>
            <div className='flex flex-col ml:gap-6 gap-4 ml:w-[50%] w-[100%] ml:items-start items-center '>
                <div className='flex flex-col gap-2 ml:text-start text-center'>
                    <p className='ml:text-[3vw] text-[9vw] font-bold leading-tight'> <span className='text-[#06A9EF]'>Precision Matching</span> for Perfect Job Fits</p>
                    <p className='ml:text-[1.3vw] text-[5vw] font-medium'>Unlock the power of precision matching with our job description <span className='text-[#06A9EF]'>compatibility search</span> feature.</p>
                </div>
                <div className='ml:text-[1.2vw] text-[4vw] font-medium ml:text-start text-center'>
                    Simply input the job description and let our AI algorith filter through your client database to find the perfect matches, saving you considerable time and money.
                </div>
                <button className='bg-[#06A9EF] text-white flex gap-2  ml:px-4 px-2 ml:py-3 py-2 ml:w-[174px] ml:rounded-[12px] rounded-[8px] justify-center items-center' onClick={clickHandler}>
                    <p className='ml:text-[14px] text-[4vw] font-semibold'>Find Matches</p>
                    <img style={{
                    }} className='w-[15%] h-[15%]' src="/images/recruiter/findMatch.png" alt="" />
                </button>
            </div>
        </div>
    )
}

export default PrecisionMatching
