import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSpring, animated } from "react-spring";
function ForCandidate() {



    const [moveLeft, setmoveLeft] = useState(false);
    const [moveRight, setmoveRight] = useState(false);
    const [initial, setInitial] = useState(true);
    const [moveRightagain, setMoveRightAgain] = useState(false);
    const [recall, setCount] = useState(0);
    const [toggle, setToggle] = useState(true);

    const springProps = useSpring({
        opacity: toggle ? 1 : 0,
        transform: toggle ? 'scale(1)' : 'scale(0.9)',
        config: { duration: 1000 },
    });


    const slowConfig = {
        duration: 1000,
    };

    const bounceUp = {
        from: { transform: "translateY(0px)" },
        to: { transform: "translateY(100px)" },
    };

    const bounceDown = {
        from: { transform: "translateY(100px)" },
        to: { transform: "translateY(0px)" },
    };

    const [isBouncingUp, setIsBouncingUp] = React.useState(true);
    const [isBouncingDown, setIsBouncinDown] = React.useState(true);

    const springProps1 = useSpring({
        ...bounceUp,
        config: slowConfig,
        reverse: isBouncingUp,
        pauseTransition: isBouncingUp,
        onRest: () => {
            setTimeout(() => {
                setIsBouncingUp(!isBouncingUp);
                setToggle(!toggle)
            }, 5000);

        },
    });

    const springProps2 = useSpring({
        ...bounceDown,
        config: slowConfig,
        reverse: isBouncingDown,
        pauseTransition: isBouncingDown,
        onRest: () => {
            setTimeout(() => {
                setIsBouncinDown(!isBouncingDown);
                setToggle(!toggle)
            }, 5000);

        },
    });




    const data = [
        {
            img1: "./images/home/can1.png",
            name1: 'Create Your Free Account',
            img2: "./images/home/rec1.png",
            name2: 'Register your Organization',

        },
        {
            img1: "./images/home/can2.png",
            name1: 'Built your Profile',
            img2: "./images/home/rec2.png",
            name2: 'Post the required Job Openings',

        },
        {
            img1: "./images/home/can3.png",
            name1: 'Search & Apply your dream Job',
            img2: "./images/home/rec3.png",
            name2: 'Get desired talent shortlisted',

        },
        {
            img1: "./images/home/can4.png",
            name1: 'Get Hired by a desired company',
            img2: "./images/home/rec4.png",
            name2: 'Schedule interview & Hire right talent',

        },

    ]


    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => prevCount + 1);
            setmoveLeft(false);
            setmoveRight(false);
            setInitial(true);
            setMoveRightAgain(false);
        }, 12000);

        return () => {
            clearInterval(interval);
        };
    }, []);
    useEffect(() => {
        const imageleftTimer = setTimeout(() => {
            setInitial(false);
        }, 1000);

        return () => {
            clearTimeout(imageleftTimer);
        };
    }, [recall]);
    useEffect(() => {
        const imageleftTimer = setTimeout(() => {
            setMoveRightAgain(true);
        }, 9000);

        return () => {
            clearTimeout(imageleftTimer);
        };
    }, [recall]);
    useEffect(() => {
        const imageleftTimer = setTimeout(() => {
            setmoveRight(true);
        }, 2000);

        return () => {
            clearTimeout(imageleftTimer);
        };
    }, [recall]);
    useEffect(() => {
        const imageleftTimer = setTimeout(() => {
            setmoveRight(false);
        }, 6000);

        return () => {
            clearTimeout(imageleftTimer);
        };
    }, [recall]);
    useEffect(() => {
        const imageleftTimer = setTimeout(() => {
            setmoveLeft(false);
        }, 7000);

        return () => {
            clearTimeout(imageleftTimer);
        };
    }, [recall]);

    return (
        <div className="lg:h-[404px]  customMargins relative w-full overflow-hidden ">



            <div className="  text-center w-full">

                {toggle ? (

                    <p className="text-center"
                        id="candidate">Candidate</p>

                ) : (


                    <p className="text-center"
                        id="Employer">Employer</p>

                )}

            </div>



            <div className="pt-8 lg:block hidden ">
                {data.map((item, index) => (
                    <animated.div className="create_account " key={index} style={index % 2 === 0 ? springProps1 : springProps2}>


                        {toggle ? (

                            <div id="smooth" className="z-[100] relative  flex flex-col justify-center items-center h-[192px] w-[192px] border border-blue rounded-[192px] ">
                                <div className=" flex justify-center items-center h-[188px] w-[188px]  rounded-[188px] circle10">
                                    <div className="flex flex-col gap-[18px] items-center justify-center w-[140px]">
                                        <img id="smooth" src={item.img1} alt="" className="h-[56px] w-[56px]" />
                                        <p id="smooth" className="text-[14px] font-[500] items-center text-center">{item.name1}</p>
                                    </div>
                                </div>
                                <div style={{ filter: 'blur(35px)', opacity: 0.1 }} className="absolute flex flex-col justify-center items-center h-[268px] w-[268px] rounded-[268px] pulse-animation ">
                                </div>
                            </div>
                        ) : (
                            <div id="smooth" className="z-[100] relative  flex flex-col justify-center items-center h-[192px] w-[192px] border border-[#FFC65C] rounded-[192px] ">
                                <div className=" flex justify-center items-center h-[188px] w-[188px]  rounded-[188px] circle11">
                                    <div className="flex flex-col gap-[18px] items-center justify-center w-[140px]">
                                        <img id="smooth" src={item.img2} alt="" className="h-[56px] w-[56px]" />
                                        <p id="smooth" className="text-[14px] font-[500] items-center text-center">{item.name2}</p>
                                    </div>
                                </div>
                                <div style={{ filter: 'blur(35px)', opacity: 0.1 }} className="absolute flex flex-col justify-center items-center h-[268px] w-[268px]  rounded-[268px] pulse-animation1">
                                </div>
                            </div>
                        )}



                    </animated.div>
                ))}
            </div>


            <div className="lg:hidden flex flex-wrap scr460:gap-y-[100px] gap-y-[40px] scr700:gap-x-[200px] gap-x-[60px] justify-evenly mt-9">
                {data.map((item, index) => (
                    <div key={index} >
                        {toggle ? (

                            <div id="smooth" className="z-[100] relative  flex flex-col justify-center items-center h-[192px] w-[192px] border border-blue rounded-[192px] ">
                                <div className=" flex justify-center items-center h-[188px] w-[188px]  rounded-[188px] circle10">
                                    <div className="flex flex-col gap-[18px] items-center justify-center w-[140px]">
                                        <img id="smooth" src={item.img1} alt="" className="h-[56px] w-[56px]" />
                                        <p id="smooth" className="text-[14px] font-[500] items-center text-center">{item.name1}</p>
                                    </div>
                                </div>
                                <div style={{ filter: 'blur(35px)', opacity: 0.1 }} className="absolute flex flex-col justify-center items-center h-[268px] w-[268px]  rounded-[268px] pulse-animation over">
                                </div>
                            </div>
                        ) : (
                            <div id="smooth" className="z-[100] relative  flex flex-col justify-center items-center h-[192px] w-[192px] border border-[#FFC65C] rounded-[192px] ">
                                <div className=" flex justify-center items-center h-[188px] w-[188px]  rounded-[188px] circle11">
                                    <div className="flex flex-col gap-[18px] items-center justify-center w-[140px]">
                                        <img id="smooth" src={item.img2} alt="" className="h-[56px] w-[56px]" />
                                        <p id="smooth" className="text-[14px] font-[500] items-center text-center">{item.name2}</p>
                                    </div>
                                </div>
                                <div style={{ filter: 'blur(35px)', opacity: 0.1 }} className="absolute flex flex-col justify-center items-center h-[268px] w-[268px] rounded-[268px] pulse-animation1">
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>


        </div >
    );
}

export default ForCandidate;