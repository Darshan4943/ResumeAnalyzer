import React, { useEffect, useRef, useState } from 'react'
import { animate, motion, useSpring } from 'framer-motion';
function AskKrutAnimation() {

    const [isAnimate, setIsAnimate] = useState(false);

    const [img1, setImg1] = useState(false);
    const [img2, setImg2] = useState(false);
    const [img3, setImg3] = useState(false);

    const generateAiRef = useRef(null);

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
        <div ref={generateAiRef} className=" flex justify-center items-center ">
            <div className="relative ml:block hidden">
                <img
                    src="/images/resumeBuilder/askKrut.png"
                    alt=""
                    className="w-[28vw] h-[40vw] xl1:w-[500px] xl1:h-[690px] object-contain"
                />
                <div className="w-[24vw]  h-[30vw] xl1:w-[400px] xl1:h-[500px]  object-contain absolute bottom-[8vw] xl1:bottom-[140px]   left-[2vw] xl1:left-[50px] overflow-hidden" style={{
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
            <div className="relative ml:hidden visible">
                <img
                    src="/images/resumeBuilder/askKrut.png"
                    alt=""
                    className="w-[52vw] h-[90vw] object-contain"
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
    )
}

export default AskKrutAnimation
