import React, { useEffect, useState } from 'react'
import { motion, useAnimation } from 'framer-motion';




function PrecisionMatching() {
    const [isGreen, setIsGreen] = useState(false)
    const [isGreenTick, setIsGreenTick] = useState(false)
    const [positionIndex, setPositionIndex] = useState(0);
    const controls = useAnimation();
    const [showColor, setShowColor] = useState(false);

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
        <div className='flex ml:flex-row flex-col gap-12 w-[100%] items-center justify-center sm:px-6 px-2 overflow-hidden'>
            <div className='relative ml:w-[46%] w-[100%]'>
                <img className='min-w-[46%] h-[40%] ' src="/images/recruiter/recruiterAni.png" alt="" />
                <motion.img
                    animate={controls}
                    className='absolute w-[32%] h-[38%]'
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
                        <div className={`${positionIndex === 6 ? "rounded-[16px]" : "rounded-l-[16px]"} line-animation ${positionIndex === 2 ? "bg-[#0C8A0A] w-[90%]" : positionIndex === 3 ? "bg-[#C00000] w-[25%]" : positionIndex === 4 ? "bg-[#598A0A] w-[70%]" : positionIndex === 5 ? "bg-[#FFA800] w-[48%]" : positionIndex === 6 ? "bg-[#0C8A0A] w-[100%]" : ""} h-[8px]`}></div>                    </div>
                    <div className='bg-[#DEDEDE] rounded-[16px] w-[100%] h-[8px]'>
                        <div className='bg-[#06A9EF] rounded-l-[16px] w-[50px] h-[8px]'></div>
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
            <div className='flex flex-col gap-6 ml:w-[50%] w-[100%]'>
                <div className='flex flex-col gap-2'>
                    <p className='ml:text-[3.3vw] text-[5vw] font-bold leading-tight'> <span className='text-[#06A9EF]'>Precision Matching</span> for Perfect Job Fits</p>
                    <p className='ml:text-[1.71vw] text-[3vw] font-medium'>Unlock the power of precision matching</p>
                </div>
                <div className='ml:text-[1.45vw] text-[2.5vw] font-medium'>
                    with our job description compatibility search feature. Simply input the job description, and let our AI algorithm sift through your client database to find the perfect matches, saving you time and effort.
                </div>
                <button className='bg-[#FFD500] flex gap-2  px-4 py-2 w-[174px] rounded-[8px]'>
                    <p className='text-[16px] font-semibold'>Find Matches</p>
                    <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM8 6C8.55 6 9.02083 5.80417 9.4125 5.4125C9.80417 5.02083 10 4.55 10 4C10 3.45 9.80417 2.97917 9.4125 2.5875C9.02083 2.19583 8.55 2 8 2C7.45 2 6.97917 2.19583 6.5875 2.5875C6.19583 2.97917 6 3.45 6 4C6 4.55 6.19583 5.02083 6.5875 5.4125C6.97917 5.80417 7.45 6 8 6ZM19.1 19.5L15.9 16.3C15.55 16.5 15.175 16.6667 14.775 16.8C14.375 16.9333 13.95 17 13.5 17C12.25 17 11.1875 16.5625 10.3125 15.6875C9.4375 14.8125 9 13.75 9 12.5C9 11.25 9.4375 10.1875 10.3125 9.3125C11.1875 8.4375 12.25 8 13.5 8C14.75 8 15.8125 8.4375 16.6875 9.3125C17.5625 10.1875 18 11.25 18 12.5C18 12.95 17.9333 13.375 17.8 13.775C17.6667 14.175 17.5 14.55 17.3 14.9L20.5 18.1L19.1 19.5ZM13.5 15C14.2 15 14.7917 14.7583 15.275 14.275C15.7583 13.7917 16 13.2 16 12.5C16 11.8 15.7583 11.2083 15.275 10.725C14.7917 10.2417 14.2 10 13.5 10C12.8 10 12.2083 10.2417 11.725 10.725C11.2417 11.2083 11 11.8 11 12.5C11 13.2 11.2417 13.7917 11.725 14.275C12.2083 14.7583 12.8 15 13.5 15ZM0 16V13.225C0 12.6583 0.141667 12.1333 0.425 11.65C0.708333 11.1667 1.1 10.8 1.6 10.55C2.45 10.1167 3.40833 9.75 4.475 9.45C5.54167 9.15 6.725 9 8.025 9C7.825 9.3 7.65417 9.62083 7.5125 9.9625C7.37083 10.3042 7.25833 10.6583 7.175 11.025C6.175 11.1083 5.28333 11.2792 4.5 11.5375C3.71667 11.7958 3.05833 12.0667 2.525 12.35C2.35833 12.4333 2.22917 12.5542 2.1375 12.7125C2.04583 12.8708 2 13.0417 2 13.225V14H7.175C7.25833 14.3667 7.37083 14.7167 7.5125 15.05C7.65417 15.3833 7.825 15.7 8.025 16H0Z" fill="#333333" />
                    </svg>

                </button>

            </div>

        </div>
    )
}

export default PrecisionMatching
