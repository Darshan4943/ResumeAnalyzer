import React, { useEffect, useRef, useState } from 'react';
import { animate, motion, useSpring } from 'framer-motion';

export default function AskKrutAi() {
    const [isAnimate, setIsAnimate] = useState(false);
    const generateAiRef = useRef(null);
    const [img1, setImg1] = useState(false);
    const [img2, setImg2] = useState(false);
    const [img3, setImg3] = useState(false);

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
            setImg1(true)

        }


    }, [isAnimate]);

    useEffect(() => {
        if (img1 === true) {
            const interval = setTimeout(() => setImg2(true), 3000);

            return () => clearInterval(interval);

        }


    }, [img1]);




    useEffect(() => {
        if (img2 === true) {
            const timeout = setTimeout(() => {
                setImg3(true);
              
            }, 2000);

            return () => clearTimeout(timeout);
        }
    }, [img2]);

    useEffect(() => {
        if (img3 === true) {
           
            const timeout1 = setTimeout(() => {
                setIsAnimate(false);                
                const timeout2 = setTimeout(() => {
                    setImg1(false);
                    setImg2(false);
                    setImg3(false);
    
                    const timeout3 = setTimeout(() => {
                        setIsAnimate(true);
                    }, 2000);
    
                    return () => clearTimeout(timeout3);
                }, 2000);
    
                return () => clearTimeout(timeout2);
            }, 2000);
            return () => clearTimeout(timeout1);
        }
    }, [img3]);
    


    return (
        <div ref={generateAiRef} className=" customMargins flex md:flex-row flex-col-reverse md:gap-[2vw] gap-8 xl:gap-12 items-center py-9">
            <div className="flex flex-col gap-6 md:w-[45%] w-full text-[#333333] pr-6 md:text-start text-center md:items-start items-center ">
                <div className="font-semibold md:text-[3.2vw] text-[28px] leading-tight">
                    Get Advice with
                    Skilotech's AI Featured



                    <p className="text-[#06A9EF]">
                        “MyKrute”
                        <span className="font-semibold md:text-[3.2vw] text-[30px] w-[100%] break-words text-[#333333]">
                            Chatbot
                        </span>
                    </p>

                </div>
                <div className='font-medium md:text-[1.1vw] text-[14px]  w-[100%] break-words text-[#333333]'>
                    Our AI chatbot is powered by advanced technology that allows it to understand and respond to your queries in a natural and informative way. Whether you're looking for job search tips, resume writing advice, or career guidance, our chatbot can provide you with the information you need. With Skilotech's AI chatbot, you have a knowledgeable and helpful resource at your fingertips
                </div>

                <button onClick={() =>
                   router.push("/auth?signin=true&role=user")
                }
                      className="md:px-10 px-6  py-3 bg-[#06A9EF] text-white  rounded-[12px] text-[14px] font-semibold btn_hover_effect max-w-[167px]"
                >
                    Get Started
                </button>
            </div>
            <div className="w-[55%] flex justify-center items-center ">
                <div className="relative md:block hidden">
                    <img
                        src="/images/resumeBuilder/askKrut.png"
                        alt=""
                        className="w-[40vw] h-[40vw] object-contain"
                    />
                    <div className="w-[24vw] h-[30vw] object-contain absolute bottom-[8vw]  left-[8vw] overflow-hidden" style={{
                        opacity: isAnimate ? 1 : 0,
                        transition: 'opacity 2s ease-in-out',
                    }}>
                        <motion.img
                            src="/images/resumeBuilder/img1.png"
                            alt=""
                            className="w-[15vw] h-[3vw] object-contain absolute  left-[0vw]"
                            style={{
                                opacity: img1 ? 1 : 0,
                                transition: 'opacity 2s ease-in-out',
                            }}
                            initial={{ bottom: '0vw', }}
                            animate={{
                                bottom: img3 ? '23vw' : img2 ? "3vw" : "0vw",

                                transition: { duration: 1.5, ease: 'easeInOut' }
                            }}
                        />
                        <motion.img
                            src="/images/resumeBuilder/img2.png"
                            alt=""
                            className="w-[18.5vw] h-[3vw] object-contain absolute right-[0vw]"
                            initial={{ bottom: '-4vw', }}
                            animate={{
                                bottom: img3 ? "20vw" : img2 ? '0vw' : "-4vw",

                                transition: { duration: 1.5, ease: 'easeInOut' }
                            }}

                        />
                        <motion.img
                            src="/images/resumeBuilder/img3.png"
                            alt=""
                            className="w-[18.5vw] h-[20vw] object-contain absolute left-[0vw]"
                            initial={{ bottom: '-20vw', }}
                            animate={{
                                bottom: img3 ? '0vw' : "-20vw",

                                transition: { duration: 1.5, ease: 'easeInOut' }
                            }}

                        />

                    </div>



                </div>
                <div className="relative md:hidden visible">
                    <img
                        src="/images/resumeBuilder/askKrut.png"
                        alt=""
                        className="w-[60vw] h-[90vw] object-contain"
                    />
                    <div className="w-[45vw] h-[55vw] object-contain absolute bottom-[22vw]  left-[3.5vw] overflow-hidden" style={{
                        opacity: isAnimate ? 1 : 0,
                        transition: 'opacity 2s ease-in-out',
                    }}>
                        <motion.img
                            src="/images/resumeBuilder/img1.png"
                            alt=""
                            className="w-[35vw] h-[5vw] object-contain absolute  left-[0vw]"
                            style={{
                                opacity: img1 ? 1 : 0,
                                transition: 'opacity 2s ease-in-out',
                            }}
                            initial={{ bottom: '0vw', }}
                            animate={{
                                bottom: img3 ? '48vw' : img2 ? "8vw" : "0vw",

                                transition: { duration: 1.5, ease: 'easeInOut' }
                            }}
                        />
                        <motion.img
                            src="/images/resumeBuilder/img2.png"
                            alt=""
                            className="w-[75vw] h-[7vw] object-contain absolute right-[0vw]"
                            initial={{ bottom: '-8vw', }}
                            animate={{
                                bottom: img3 ? "40vw" : img2 ? '0vw' : "-8vw",

                                transition: { duration: 1.5, ease: 'easeInOut' }
                            }}

                        />
                        <motion.img
                            src="/images/resumeBuilder/img3.png"
                            alt=""
                            className="w-[40vw] h-[38vw] object-contain absolute left-[0vw]"
                            initial={{ bottom: '-40vw', }}
                            animate={{
                                bottom: img3 ? '0vw' : "-40vw",

                                transition: { duration: 1.5, ease: 'easeInOut' }
                            }}

                        />

                    </div>



                </div>
            </div>
        </div>
    );
}
