import React, { useEffect, useRef, useState } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useRouter } from 'next/router';

export default function ResumeLink() {
    const [isAnimate, setIsAnimate] = useState(false);
    const generateAiRef = useRef(null);
    const [isBoy, setIsBoy] = useState(false);
    const [isGirl1, setIsGirl1] = useState(false);
    const [isGirl2, setIsGirl2] = useState(false);
    const [isGirl3, setIsGirl3] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: "0px",
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {

                    setTimeout(() => setIsAnimate(true), 1000);
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        if (generateAiRef.current) {
            observer.observe(generateAiRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [generateAiRef]);

    useEffect(() => {
        if (isAnimate === true) {
            setIsGirl1(true)

        }


    }, [isAnimate]);

    useEffect(() => {
        if (isGirl1 === true) {
            const interval = setTimeout(() => setIsBoy(true), 1000);

            return () => clearInterval(interval);

        }


    }, [isGirl1]);

    // useEffect(() => {

    //     if (isBoy === true) {
    //         setIsGirl2(true)
    //     }

    // }, [isBoy]);



    useEffect(() => {
        if (isBoy === true) {
            const interval = setTimeout(() => setIsGirl2(true), 2000);

            return () => clearInterval(interval);
        }
    }, [isBoy]);

    useEffect(() => {
        if (isGirl2 === true) {
            const interval = setTimeout(() => { setIsGirl3(true); setIsAnimate(false) }, 2000);

            return () => clearInterval(interval);
        }
    }, [isGirl2]);

    useEffect(() => {
        if (isGirl3 === true) {

            const timeout1 = setTimeout(() => {
                setIsGirl3(false);
                setIsGirl2(false);
                setIsGirl1(false);
                setIsBoy(false);

                const timeout2 = setTimeout(() => {
                    setIsAnimate(true);
                }, 2000);

                return () => clearTimeout(timeout2);
            }, 5000);

            return () => clearTimeout(timeout1);
        }
    }, [isGirl3]);



    return (
        <div ref={generateAiRef} className=" customMargins flex ml:flex-row flex-col-reverse gap-[2vw] xl:gap-12 items-center py-9">
            <div className="flex flex-col gap-6 ml:w-[47%] w-full text-[#333333] ml:text-start text-center ml:items-start items-center  ">
                <div className="font-semibold ml:text-[3.2vw] text-[30px] leading-tight">
                    <p>
                    Transform your Resume
                    </p>

                    
                    <p className="text-[#06A9EF]">
                    into a Link
                        </p>
                </div>
                <div className="font-medium ml:text-[1.1vw] text-[14px] w-[100%] break-words">
                    Sharing your resume has never been easier. Skilotech&apos;s intuitive platform allows you to create a shareable link for your resume in just a few clicks. Send it to hiring managers, post it on your social media profiles, or embed it on your website. Let your resume do the talking.
                </div>
                <button onClick={() =>
                    router.push("/auth?signin=true&role=user")
                }
                    className="ml:px-10 px-6  py-3 bg-[#06A9EF] text-white  rounded-[12px] text-[14px] font-semibold btn_hover_effect"
                >
                    Get Started
                </button>
            </div>
            <div className="ml:w-[55%] w-full flex justify-center items-center ">
                <div className="relative">
                    <img
                        src="/images/resumeBuilder/resumeLink.png"
                        alt=""
                        className="w-[40vw] h-[40vw] object-contain"
                    />
                    <img
                        src="/images/resumeBuilder/boy1.png"
                        alt=""
                        className="w-[12vw] h-[13vw] object-contain absolute right-[11.5vw] top-[13.5vw] z-20"
                    />
                    {/* <motion.img
                        src="/images/resumeBuilder/circle.png"
                        alt=""
                        className="w-[11.5vw] h-[9.5vw] object-contain absolute top-[3.8vw] right-[3vw]"
                        initial={{ rotate: -20 }}
                        animate={isGirl1 ? { rotate: 10 } : {}}
                        transition={{
                            duration: 1,
                            ease: "easeInOut",

                        }}
                        style={{ transformOrigin: "center center" }}
                    /> */}
                    <motion.img
                        src="/images/resumeBuilder/girl11.png"
                        alt=""
                        className="w-[17.5vw] h-[17.5vw] object-contain absolute"
                        initial={{ rotate: -10, top: '-0.2vw', right: '0.1vw'}}
                        animate={{
                            rotate: isGirl1 ? 0 : -10,

                        }}
                        transition={{ duration: 1, ease: "easeInOut", delay:1 }}
                        style={{ transformOrigin: "center center" }}
                    />
                    <div
                        style={{
                            opacity: isBoy ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                        }}
                    >
                        <img
                            src="/images/resumeBuilder/boyCircle.png"
                            alt=""
                            className="w-[12vw] h-[13vw] object-contain absolute bottom-[2.5vw] left-[5.2vw]"
                        />
                        <motion.img
                            src="/images/resumeBuilder/boy11.png"
                            alt=""
                            className="w-[19vw] h-[19vw] object-contain absolute z-10"
                            initial={{ rotate: 0, bottom: '-0.9vw', left: '1.8vw' }}
                            animate={{
                                rotate: isBoy ? 10 : 0,
                            }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
                            style={{ transformOrigin: "center center" }}
                        />
                        {/* <motion.img
                            src="/images/resumeBuilder/circle.png"
                            alt=""
                            className="w-[9.2vw] h-[9.2vw] object-contain absolute bottom-[4.1vw] left-[6.7vw]"
                        /> */}
                    </div>

                    <div
                        style={{
                            opacity: isGirl2 ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                        }}
                    >
                        <img
                            src="/images/resumeBuilder/girlCircle2.png"
                            alt=""
                            className="w-[12vw] h-[13vw] object-contain absolute bottom-[4.5vw] right-[3vw] "
                        />
                        <motion.img
                            src="/images/resumeBuilder/girl2.png"
                            alt=""
                            className="w-[11vw] h-[11vw] object-contain absolute z-10"
                            initial={{ rotate: 10, bottom: '5.1vw', right: '2.9vw' }}
                            animate={{
                                rotate: isGirl2 ? 0 : 10,
                            }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
                            style={{ transformOrigin: "center center" }}
                        />
                        <motion.img
                            src="/images/resumeBuilder/circle.png"
                            alt=""
                            className="w-[9.3vw] h-[9.3vw] object-contain absolute bottom-[6.1vw] right-[3.6vw]"
                        />
                    </div>
                    <div
                        style={{
                            opacity: isGirl3 ? 1 : 0,
                            transition: 'opacity 1s ease-in-out',
                        }}
                    >
                        <img
                            src="/images/resumeBuilder/girlCircle3.png"
                            alt=""
                            className="w-[13vw] h-[13vw] object-contain absolute top-[8vw] left-[1.9vw] "
                        />
                        <motion.img
                            src="/images/resumeBuilder/girl3.png"
                            alt=""
                            className="w-[14vw] h-[15.3vw] object-contain absolute z-10"
                            initial={{ rotate: 0, top: '6.5vw', left: '1.5vw' }}
                            animate={{
                                rotate: isGirl3 ? 10 : 0,
                            }}
                            transition={{ duration: 1, ease: "easeInOut", delay: 2 }}
                            style={{ transformOrigin: "center center" }}
                        />
                        <motion.img
                            src="/images/resumeBuilder/circle.png"
                            alt=""
                            className="w-[9.3vw] h-[9.3vw] object-contain absolute top-[9.85vw] left-[3.35vw]"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}
