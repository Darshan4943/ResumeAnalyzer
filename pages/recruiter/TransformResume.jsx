import React, { useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion";
function TransformResume() {

    const [transform, setTransform] = useState(true)
    
    const [repeat, setRepeat] = useState(false);
    const [isAnimate, setIsAnimate] = useState(false);
    const transformRef = useRef(null);


    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '150px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setTransform(false)
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (transformRef.current) {
            observer.observe(transformRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [transformRef]);

    useEffect(() => {
        let timeoutId;
    
        if (!transform) {
            timeoutId = setTimeout(() => {
                setTransform(true);
                setRepeat(true)
            }, 7000);
        }
    
        return () => clearTimeout(timeoutId);
    }, [transform]);
    
    useEffect(() => {
        if (repeat) {
            const timer = setTimeout(() => {
                setTransform(false)
                setRepeat(false)
            }, 4000);

            return () => {
                clearTimeout(timer);
            };
        }


    }, [repeat]);

    return (
        <div ref={transformRef} className='flex ml:gap-[10%] ml:flex-row gap-6 flex-col-reverse  w-screen items-center justify-center ml:p-10 px-2 py-8'>
            <div className='flex flex-col ml:gap-6 gap-4 ml:w-[51%] w-[90%] ml:items-start items-center'>
                <div className='flex flex-col gap-2 ml:text-start text-center'>
                    <p className='ml:text-[3.9vw] text-[9vw]  font-bold leading-tight'>  Job Ready Resumes
                        for any  <span className='text-[#06A9EF]'>Job Description</span></p>
                    <p className='ml:text-[1.71vw] text-[5vw] font-medium'> Transform resumes to match job descriptions Perfectly</p>
                </div>
                <div className='ml:text-[1.45vw] text-[4vw] font-medium ml:text-start text-center'>

                    Crafting personalized resumes to fit each job perfectly, highlighting the right skills and experiences. By making sure resumes match what employers are looking for, help clients stand out and land their dream jobs
                </div>
                <button
                    //  onClick={clickHandler}
                    className='bg-[#06A9EF] text-white px-4 ml:py-3 py-2 ml:w-[190px] ml:rounded-[12px] rounded-[8px] ml:text-[16px] text-[4vw] font-semibold'>
                    Transform Resume
                </button>

            </div>

            <div className='flex  ml:w-[40%] w-[100%] justify-center h-full items-center relative'>
                <img style={{

                }} className='w-[65%] h-[80%]' src="/images/recruiter/transformResume.png" alt="" />
                <div className='bg-[#06A9EF] absolute w-[64%] h-[99%] rounded-[14px]' style={{
                    filter: 'opacity(0.07)', opacity: transform ? 0 : 1,
                    transition: "opacity 1s ease-in-out",
                }}>

                </div>

                <motion.div
                    animate={{
                        y: ["0%", "100%"],
                    }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                    style={{
                        filter: "opacity(0.7)",
                        opacity: transform ? 0 : 1,
                        transition: "opacity 1s ease-in-out",
                    }}
                    className='w-[65%] h-[95%] absolute flex justify-center'>
                    <motion.div
                        className="bg-[#06A9EF] absolute w-[98%] h-[3px] z-10"
                    ></motion.div>
                </motion.div>
                <img className='absolute top-[10%] right-[5%] h-[6.3%] w-[5.5%]' style={{
                    opacity: transform ? 0 : 1,
                    transition: "opacity 1s ease-in-out", animation: 'clockwise 10s infinite linear'
                }} src="/images/recruiter/setting1.png" alt="" />
                <img className='absolute top-[15.5%] right-[8%] h-[5.1%] w-[4.52%]' style={{
                    opacity: transform ? 0 : 1,
                    transition: "opacity 1s ease-in-out", animation: 'anticlockwise 10s infinite linear'
                }} src="/images/recruiter/setting2.png" alt="" />
                <img className='absolute top-[11.2%] right-[10.8%] h-[4.5%] w-[3.9%]' style={{
                    opacity: transform ? 0 : 1,
                    transition: "opacity 1s ease-in-out", animation: 'anticlockwise 10s infinite linear'
                }} src="/images/recruiter/setting3.png" alt="" />



                <div
                    style={{
                        opacity: transform ? 1 : 0,

                        transition: "opacity 1s ease-in-out"
                    }}
                    className={`flex items-center justify-center absolute border bg-[#0C8A0A] border-[#0C8A0A]   w-[9.02%] h-[10%] top-[45%]   left-[0%]  rounded-full`}
                >


                    <img style={{
                        opacity: transform ? 1 : 0,
                        transition: "opacity 1s ease-in-out",
                    }} className='w-[55%] h-[45%]' src="/images/recruiter/correct.png" alt="" />
                </div>



                <img className='absolute bottom-[10%] left-[5%] h-[6.3%] w-[5.5%]' style={{
                    opacity: transform ? 0 : 1,
                    transition: "opacity 1s ease-in-out", animation: 'anticlockwise 10s infinite linear'
                }} src="/images/recruiter/setting1.png" alt="" />

                <img className='absolute bottom-[15.5%] left-[9%] h-[4.5%] w-[3.9%]' style={{
                    opacity: transform ? 0 : 1,
                    transition: "opacity 1s ease-in-out", animation: 'clockwise 10s infinite linear'
                }} src="/images/recruiter/setting3.png" alt="" />


                <img style={{
                    opacity: transform ? 1 : 0,

                    transition: "opacity 1s ease-in-out"
                }} className='absolute top-[0%] right-[10%] h-[17%] w-[9.7%]' src="/images/recruiter/medal.png" alt="" />


            </div>

        </div>
    )
}

export default TransformResume
