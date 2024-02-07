import MiniLoader from '@/components/common/mini-loader';
import axios from 'axios';
import { motion } from "framer-motion"

import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';

function GenerateAi() {
    const [slideRobot, setSlideRobot] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isAnimate, setIsAnimate] = useState(false);
    const [isAnimateSecond, setIsAnimateSecond] = useState(false);
    const [loading1, setLoading1] = useState(false);
    const [repeat, setRepeat] = useState(false);
    const generateAiRef = useRef(null);





    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setIsAnimate(true);
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

    const userDataGlobal = useSelector((state) => state.userData);



    const [animationText, setAnimationText] = useState(" ");

    useEffect(() => {
        const originalText = "  Hello! I'm Darshan, a tech enthusiast and creative developer. I enjoy crafting elegant solutions to complex problems, always exploring new technologies. Let's build something amazing together!";
        let currentIndex = 0;

        if (isAnimate) {
            const interval = setInterval(() => {
                setAnimationText((prevText) => prevText + originalText[currentIndex]);
                currentIndex++;

                if (currentIndex === originalText.length - 1) {
                    clearInterval(interval);
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isAnimate]);


    useEffect(() => {
        const originalText = " Hey there! I'm Darshan, a passionate tech aficionado and innovative developer. I thrive on finding sophisticated answers to intricate challenges, constantly researching and experimenting with cutting-edge technologies. Let's collaborate and create something truly remarkable! "
        let currentIndex = 0;
        if (isAnimateSecond) {
            const interval = setInterval(() => {
                setAnimationText((prevText) => prevText + originalText[currentIndex]);
                currentIndex++;

                if (currentIndex === originalText.length - 1) {
                    clearInterval(interval);
                }
            }, 20);

            return () => clearInterval(interval);
        }
    }, [isAnimateSecond]);

    useEffect(() => {
        if (isAnimate) {
            const timer = setTimeout(() => {
                setSlideRobot(true);
            }, 4000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [isAnimate]);

    useEffect(() => {
        if (slideRobot) {
            const timer = setTimeout(() => {
                setIsClicked(true);

                const resetTimer = setTimeout(() => {
                    setIsClicked(false);
                    setSlideRobot(false);
                    setAnimationText("")

                    setLoading1(true)
                }, 2000);

                return () => {
                    clearTimeout(resetTimer);
                };
            }, 4000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [slideRobot, setIsClicked]);


    useEffect(() => {
        if (loading1) {
            const timer = setTimeout(() => {
                setLoading1(false);
                setIsAnimateSecond(true)
                setRepeat(false)
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [loading1]);


    useEffect(() => {
        if (isAnimateSecond) {
            const timer = setTimeout(() => {
                setRepeat(true)
                setIsAnimate(false);

            }, 7000);

            return () => {
                clearTimeout(timer);
            };
        }


    }, [isAnimateSecond]);

    useEffect(() => {
        if (repeat) {
            const timer = setTimeout(() => {
                setSlideRobot(false);
                setIsClicked(false);

                setIsAnimateSecond(false);
                setLoading1(false);
                setAnimationText('');
                setLoading(false);
                setIsAnimate(true);

            }, 2000);

            return () => {
                clearTimeout(timer);
            };
        }


    }, [repeat]);

    const [text, setText] = useState("");
    const [attempt, setAttempt] = useState(3);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [stars, setStars] = useState(false);

    useEffect(() => {
        if (stars) {
            const timer = setTimeout(() => {
                setStars(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [stars]);

    const generateText = () => {
        const prompt = `Original Paragraph:\n${text}\n\nNew Paragraph:\n`;
        if (text.length > 50) {
            setLoading(true);
            setStars(true)
            axios
                .post("https://freedygoservices.in/api/text/regenrate", { prompt })
                .then((res) => {
                    setLoading(false);
                    setError("");
                    setText(res.data.data.choices[0].message.content);
                    const newAttempts = attempt - 1;
                    setAttempt(newAttempts);
                    localStorage.setItem("attempts", newAttempts);
                    getAttempts();
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        } else {
            setError("Minimum 50 characters required");
        }
    };
    const getAttempts = () => {
        const localData = localStorage.getItem("attempts");
        if (localData) {
            setAttempt(parseInt(localData));
        }
    };

    useEffect(() => {
        getAttempts();
        if (userDataGlobal?.resumeUrl) {
            const Summery = userDataGlobal.summary;
            setText(Summery);
        }
    }, [userDataGlobal]);



    const handleTextChange = (e) => {
        setText(e.target.value);
        setError("")
    };

    return (

        <div ref={generateAiRef} className=' bg-cover bg-no-repeat ml:bg_generateAi bg_generateAi1 py-[78px] my-[36px]  w-screen  '>
            <div className='ml:w-[90%]  md:w-[60%] ms:w-[70%] sm:w-[80%] w-[97%] flex ml:flex-row flex-col items-center gap-6 customMargins sm:px-4 xsm:px-2 px-1 rounded-[16px] py-6 ' style={{ boxShadow: "0px 4px 14px 0px rgba(0, 0, 0, 0.25)", background: "rgba(255, 255, 255, 0.25)" }} >
                <div
                    className=" ml:w-[37%] w-[95%] relative flex flex-col gap-2 rounded-[16px] px-4 py-6 bg-white "
                    style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }}
                >
                    <div className="w-full font-medium"> About Me</div>
                    <div className=" w-full text-[14px] sm:min-h-[240px] min-h-[200px] max-h-[200px] overflow-hidden p-2 font-montserrat font-small h-full border border-[#06A9EF] rounded-[8px] outline-none ">

                        {loading1 ? (
                            <div className='sm:min-h-[240px] min-h-[200px] flex justify-center items-center '>
                                <MiniLoader />
                            </div>
                        ) : (
                            <div className=" w-[100%]">
                                {animationText}
                            </div>
                        )}


                    </div>
                    <div className="w-full flex justify-end items-center gap-3 ">
                        <button className={` cursor-not-allowed  relative flex gap-2 sm:px-3 px-[5px] py-2 border items-center border-[#06A9EF] ${isClicked && "bg-[#06A9EF] "}  rounded-[8px] min-w-[155px] sm:min-w-[170px]`} style={{
                            boxShadow: slideRobot ? '0px 0px 16px 0px #06A9EF' : 'none',
                            animation: slideRobot ? 'shadowAnimation 3s linear infinite' : 'none'
                        }}
                        >
                            <motion.img
                                initial={{ translateY: '-4px' }}
                                animate={{ translateY: '4px' }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                src="/images/home/robot.png"
                                alt=""
                                className="max-h-[22px] ml-1 w-[22px]"
                            />
                            {isClicked &&
                                <motion.img
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 2 }}
                                    src="/images/home/stars.png " alt="" className={`h-[30px] w-[35px]  absolute left-[5%] `} />
                            }

                            <p className={`text-[12px]  ${isClicked && "text-white "}  `}>Generate with AI</p>
                            {isClicked &&
                                <p className='absolute top-[115%] left-[55%] text-[12px] font-medium '> clicked !</p>
                            }
                        </button>

                        <button className="py-2 px-4 text-[12px]  bg-[#06A9EF] rounded-[8px] text-white cursor-not-allowed">
                            Save
                        </button>

                    </div>
                    {slideRobot &&
                        <motion.div
                            initial={{ bottom: '0.3rem', right: 0, opacity: 0 }}
                            animate={{ right: '170px', opacity: 1 }}
                            transition={{ duration: 1.5, delay: 1 }}
                            className="absolute flex gap-1 items-end">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M17.5309 11.4893C17.5309 10.5875 18.2132 9.85674 19.055 9.85674H19.0889C19.929 9.85674 20.6111 10.5845 20.6131 11.4847C20.6202 14.4298 20.6156 14.7188 20.6115 19.1175C20.6089 21.5874 18.7392 23.5877 16.4339 23.5877H11.4839C9.96919 23.5877 8.5727 22.709 7.83466 21.2919L3.42139 12.8128L3.88242 12.4304C4.83718 11.5529 6.27307 11.6609 7.10391 12.672L8.33904 14.1756L8.34613 3.83144C8.34672 2.93006 9.02901 2.19971 9.87029 2.19971H9.87088C10.7127 2.19971 11.395 2.93105 11.395 3.83282V10.0932C11.4153 9.21051 12.0895 8.50281 12.9182 8.50281H12.9541C13.7959 8.50281 14.4784 9.23376 14.4784 10.1355V10.6612C14.4784 9.75922 15.1607 9.02846 16.003 9.02846H16.0065C16.8484 9.02846 17.5309 9.75922 17.5309 10.6612V11.4893Z" fill="white" />
                                <path d="M19.0891 9.47342H19.0552C18.595 9.47126 18.1505 9.6405 17.8085 9.94824C17.5317 9.18144 16.8279 8.62978 16.0032 8.62978C15.4974 8.63332 15.0147 8.84118 14.6644 9.20626C14.3427 8.55432 13.6973 8.11161 12.9543 8.11161H12.9184C12.5214 8.10491 12.1335 8.23199 11.8175 8.47255V3.83251C11.8175 2.70968 10.9433 1.7959 9.87996 1.7959C8.81763 1.7959 7.94817 2.70889 7.94758 3.83073L7.93891 13.0496L7.417 12.4157C6.95952 11.8463 6.2861 11.4929 5.55791 11.4395C4.8441 11.3904 4.14172 11.6389 3.61764 12.1259L3.1641 12.502C3.01771 12.6232 2.97594 12.8303 3.06362 12.9989L7.47689 21.4825C8.28389 23.0326 9.81948 23.9998 11.4839 23.9998H16.4339C18.9573 23.9998 21.0125 21.8093 21.0152 19.1221C21.0164 17.904 21.0174 16.9986 21.0184 16.2673C21.0209 14.3381 21.0217 13.6253 21.0166 11.4953C21.0142 10.3752 20.1495 9.47342 19.0891 9.47342ZM20.2116 16.264C20.2106 16.9953 20.2094 17.9028 20.2082 19.121C20.2058 21.3637 18.5128 23.1924 16.4341 23.1924H11.4841C10.1215 23.1924 8.86038 22.3917 8.19287 21.1095L3.92992 12.9174L4.14014 12.7418C4.14527 12.7375 4.15059 12.7324 4.15571 12.7278C4.51764 12.387 5.00487 12.212 5.50097 12.2447C6.00751 12.2833 6.47524 12.531 6.79225 12.928L8.02737 14.4315C8.13554 14.5633 8.31463 14.6127 8.4752 14.5554C8.63558 14.4979 8.74256 14.346 8.74276 14.1755L8.74985 3.83133C8.75024 3.15397 9.2623 2.6029 9.88036 2.6029C10.4984 2.6029 11.0105 3.15456 11.0105 3.83251V10.0893C11.0105 10.1045 11.0095 10.1195 11.0095 10.1348C11.0095 10.1413 11.0105 10.1478 11.0105 10.1543V12.8301C11.0105 13.0529 11.1911 13.2336 11.414 13.2336C11.6368 13.2336 11.8175 13.0529 11.8175 12.8301V10.0999C11.8175 9.4415 12.3167 8.91861 12.9184 8.91861H12.9543C13.5723 8.91861 14.0872 9.45746 14.0872 10.1352V12.5753C14.0872 12.7984 14.2678 12.9788 14.4907 12.9788C14.7135 12.9788 14.8942 12.7984 14.8942 12.5753V10.6609C14.8942 9.98312 15.3839 9.43165 16.0057 9.43165C16.6238 9.43165 17.1134 9.98312 17.1134 10.6609V12.467C17.1134 12.6898 17.2941 12.8705 17.5169 12.8705C17.7397 12.8705 17.9204 12.6898 17.9204 12.467V11.4889C17.9204 10.8112 18.4372 10.2804 19.0552 10.2804H19.0891C19.7054 10.2804 20.2082 10.8199 20.2098 11.4958C20.2149 13.6245 20.2139 14.3357 20.2116 16.264Z" fill="black" />
                            </svg>

                        </motion.div>

                    }

                </div>
                <div className=' ml:w-[19.85%] w-[70%]  flex flex-col gap-4 justify-center text-center items-center'>
                    <div className='flex sm:w-[95%] w-[97%] flex-wrap text-center items-center justify-center ml:text-[1.6vw] text-[24px] font-bold'>
                        <span className='text-center'>   Try our Generative AI Feature to </span> &nbsp; <span className='px-[30px] text-[#BB57E1]'>  Improve </span> &nbsp; <span className='px-[70px]'>&</span>  &nbsp; <span className='px-[30px] text-[#06A9EF]'>Enhance</span>&nbsp;your profile
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2 w-[90%] relative'>

                        <p className='text-[14px] font-semibold'>Type something about yourself & Click on</p>
                        <img src="/images/blueArrow.png " alt="" className='h-[40px]  object-contain w-[41px] absolute scr1150:top-4 -right-6 top-7 web' />

                        <button className=' cursor-not-allowed w-[60%] flex gap-2 sm:px-3 px-[5px] py-2 border items-center border-[#06A9EF] bg-white rounded-[8px] min-w-[155px] sm:min-w-[170px] relative'>
                            <img src="/images/blueArrow1.png " alt="" className='h-[40px]  object-contain w-[41px] absolute top-3 -right-10 mobile' />
                            <motion.img
                                initial={{ translateY: '-4px' }}
                                animate={{ translateY: '4px' }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                src="/images/home/robot.png"
                                alt=""
                                className="max-h-[22px] w-[22px]"
                            />


                            <p className=" text-[12px] text-center ">
                                Generate with AI
                            </p>
                        </button>
                        <p className='text-[14px] font-semibold'>to Try now!</p>
                    </div>
                </div>
                <div className='ml:w-[39%] w-[95%] border-dashed border-[2px] border-[#06A9EF] sm:p-2 px-1 py-1 rounded-[16px]'>
                    <div className='  flex w-full h-full flex-col gap-2 rounded-[16px] p-4 bg-white ' style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }} >
                        <p className='w-full font-medium'> About Me</p>
                        <div className="error_text_form ">{error}</div>
                        {loading ? (
                            <div className='sm:min-h-[240px] min-h-[200px] flex justify-center items-center border border-[#06A9EF] rounded-[8px]'>
                                <MiniLoader />
                            </div>
                        ) : (
                            <textarea
                                // onWheel={(e) => e.stopPropagation()}
                                type="text"
                                name="aboutMe"
                                className="w-full sm:min-h-[240px] min-h-[200px] max-h-[240px] text-[14px] font-montserrat  h-full border border-[#06A9EF] rounded-[8px] outline-none p-4 "
                                placeholder=""
                                onChange={handleTextChange}
                                value={text}
                            />
                        )}
                        <div className='w-full flex justify-end items-center gap-2'>
                            <div className=" scr1024:text-[12px] text-[10px] font-[400]">
                                Remaining Attempts - <span className={`${attempt <= 0 && "text-red"} `}>{attempt}</span>
                            </div>
                            <button onClick={generateText} disabled={attempt <= 0} className={` justify-between relative flex gap-1 sm:px-1 px-[5px] py-2 border items-center border-[#06A9EF] ${stars && "bg-[#06A9EF]"}  rounded-[8px] min-w-[122px] ml:min-w-[122px] sm:min-w-[146px] scr1024:min-w-[146px] ${attempt <= 0 && " cursor-not-allowed"}`} >
                                <motion.img
                                    initial={{ translateY: '-4px' }}
                                    animate={{ translateY: '4px' }}
                                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
                                    src="/images/home/robot.png"
                                    alt=""
                                    className="className=' sm:h-[22px] sm:w-[22px] scr1024:h-[22px] ml-1 scr1024:w-[22px] ml:w-[15px] ml:h-[15px] h-[15px]  w-[15px]'"
                                />
                                {stars &&
                                    <motion.img
                                        src="/images/home/stars.png"
                                        alt=""
                                        className={`sm:h-[30px] sm:w-[35px] h-[20px] w-[25px] sm:ml-1 ml-2 absolute left-[-3%] `}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 2 }}

                                    />
                                }


                                <p className={`sm:text-[12px] ml:text-[9px] text-[9px] scr1024:text-[12px] ${stars && "text-white"}`}  >
                                    Generate with AI
                                </p>
                            </button>
                            <button

                                className="py-2 sm:px-4 px-3  sm:text-[12px] ml:text-[9px] text-[9px] scr1024:text-[12px] bg-[#06A9EF] rounded-[8px] text-white cursor-not-allowed "
                            >
                                Save
                            </button>

                        </div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default GenerateAi
