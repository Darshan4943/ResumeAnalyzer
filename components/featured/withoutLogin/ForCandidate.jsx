import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

function ForCandidate() {
    const [toggle, setToggle] = useState(true);
    const [isBouncingUp, setIsBouncingUp] = useState(true);
    const [isBouncingDown, setIsBouncingDown] = useState(true);

    const springProps = useSpring({
        opacity: toggle ? 1 : 0.2,
        config: { duration: 2000 },
    });

    const springProps4 = useSpring({
        opacity: toggle ? 0.2 : 1,
        config: { duration: 2000 },
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

    const springProps1 = useSpring({
        ...bounceUp,
        config: slowConfig,
        reverse: isBouncingUp,
        pauseTransition: isBouncingUp,
        onRest: () => {
            setTimeout(() => {
                setIsBouncingUp(!isBouncingUp);
                setToggle(!toggle);
            }, 4000);
        },
    });

    const springProps2 = useSpring({
        ...bounceDown,
        config: slowConfig,
        reverse: isBouncingDown,
        pauseTransition: isBouncingDown,
        onRest: () => {
            setTimeout(() => {
                setIsBouncingDown(!isBouncingDown);
                setToggle(!toggle);
            }, 4000);
        },
    });

    const data = [
        {
            img1: "./images/home/can1.png",
            name1: 'Create Your Free Account',
            img2: "./images/home/rec1.png",
            name2: 'Register Your Company',
        },
        {
            img1: "./images/home/can2.png",
            name1: 'Build Your Professional Profile',
            img2: "./images/home/rec2.png",
            name2: 'Post Job Openings',
        },
        {
            img1: "./images/home/can3.png",
            name1: 'Search & Apply for Jobs',
            img2: "./images/home/rec3.png",
            name2: 'Shortlist the Best Candidates',
        },
        {
            img1: "./images/home/can4.png",
            name1: 'Get Hired by Top Companies',
            img2: "./images/home/rec4.png",
            name2: 'Schedule interview & Hire',
        },
    ];

    return (
        <div className="lg:h-[404px] customMargins relative w-full overflow-hidden">
            <div className="text-center w-full">
                <animated.p style={toggle ? springProps : springProps4} className="text-center" id={toggle ? "candidate" : "Employer"}>
                    {toggle ? "Land Your Dream Job with Ease" : "Hire Top Talent Effortlessly"}
                </animated.p>
            </div>

            <div className="pt-8 lg:block hidden">
                {data.map((item, index) => (
                    <animated.div
                        className="create_account"
                        key={index}
                        style={index % 2 === 0 ? springProps1 : springProps2}
                    >
                        <div
                             style={toggle ? springProps : springProps4}
                            className={`z-[100] relative flex flex-col justify-center items-center h-[192px] w-[192px] border ${toggle ? 'border-blue' : 'border-[#FFC65C]'} rounded-[192px]`}
                        >
                            <div
                              style={toggle ? springProps : springProps4}
                                className={`flex justify-center items-center h-[188px] w-[188px] rounded-[188px] ${toggle ? 'circle10' : 'circle11'}`}
                            >
                                <div   style={toggle ? springProps : springProps4} className="flex flex-col gap-[18px] items-center justify-center w-[140px]">
                                    <animated.img
                                        src={toggle ? item.img1 : item.img2}
                                        alt=""
                                        className="h-[56px] w-[56px]"
                                        style={toggle ? springProps : springProps4}
                                    />
                                    <animated.p
                                        className="text-[14px] font-[500] items-center text-center"
                                        style={toggle ? springProps : springProps4}
                                    >
                                        {toggle ? item.name1 : item.name2}
                                    </animated.p>
                                </div>
                            </div>
                            <div
                                style={{ filter: 'blur(35px)', opacity: 0.1 }}
                                className={`absolute flex flex-col justify-center items-center h-[268px] w-[268px] rounded-[268px] ${toggle ? 'pulse-animation' : 'pulse-animation1'}`}
                            />
                        </div>
                    </animated.div>
                ))}
            </div>

            <div className="lg:hidden flex flex-wrap scr460:gap-y-[100px] gap-y-[40px] scr700:gap-x-[200px] gap-x-[60px] justify-evenly mt-9">
                {data.map((item, index) => (
                    <div key={index}>
                        <div
                            style={toggle ? springProps : springProps4}
                            className={`z-[100] relative flex flex-col justify-center items-center h-[192px] w-[192px] border ${toggle ? 'border-blue' : 'border-[#FFC65C]'} rounded-[192px]`}
                        >
                            <div
                                style={toggle ? springProps : springProps4}
                                className={`flex justify-center items-center h-[188px] w-[188px] rounded-[188px] ${toggle ? 'circle10' : 'circle11'}`}
                            >
                                <div
                                    style={toggle ? springProps : springProps4}
                                    className="flex flex-col gap-[18px] items-center justify-center w-[140px]"
                                >
                                    <animated.img
                                        src={toggle ? item.img1 : item.img2}
                                        alt=""
                                        className="h-[56px] w-[56px]"
                                        style={toggle ? springProps : springProps4}
                                    />
                                    <animated.p
                                        className="text-[14px] font-[500] items-center text-center"
                                        style={toggle ? springProps : springProps4}
                                    >
                                        {toggle ? item.name1 : item.name2}
                                    </animated.p>
                                </div>
                            </div>
                            <div
                                style={{ filter: 'blur(35px)', opacity: 0.1 }}
                                className={`absolute flex flex-col justify-center items-center h-[268px] w-[268px] rounded-[268px] ${toggle ? 'pulse-animation over' : 'pulse-animation1'}`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ForCandidate;


// import React, { useState } from "react";
// import { useSpring, animated } from "react-spring";

// function ForCandidate() {
//     const [toggle, setToggle] = useState(true);
//     const [isBouncingUp, setIsBouncingUp] = useState(true);
//     const [isBouncingDown, setIsBouncingDown] = useState(true);

//     // Spring for fade-in and fade-out transitions
//     const springProps = useSpring({
//         opacity: toggle ? 1 : 0,
//         config: { duration: 1000 },
//     });

//     const springProps4 = useSpring({
//         opacity: toggle ? 0 : 1,
//         config: { duration: 1000 },
//     });

//     // Bounce transition
//     const bounceUp = {
//         from: { transform: "translateY(0px)" },
//         to: { transform: "translateY(100px)" },
//     };

//     const bounceDown = {
//         from: { transform: "translateY(100px)" },
//         to: { transform: "translateY(0px)" },
//     };

//     const springProps1 = useSpring({
//         ...bounceUp,
//         config: { duration: 1000 },
//         reverse: isBouncingUp,
//         onRest: () => {
//             setTimeout(() => {
//                 setIsBouncingUp(!isBouncingUp);
//                 setToggle(!toggle);
//             }, 4000);
//         },
//     });

//     const springProps2 = useSpring({
//         ...bounceDown,
//         config: { duration: 1000 },
//         reverse: isBouncingDown,
//         onRest: () => {
//             setTimeout(() => {
//                 setIsBouncingDown(!isBouncingDown);
//                 setToggle(!toggle);
//             }, 4000);
//         },
//     });

//     // Data for displaying images and text
//     const data = [
//         {
//             img1: "./images/home/can1.png",
//             name1: 'Create Your Free Account',
//             img2: "./images/home/rec1.png",
//             name2: 'Register your Organization',
//         },
//         {
//             img1: "./images/home/can2.png",
//             name1: 'Built your Profile',
//             img2: "./images/home/rec2.png",
//             name2: 'Post the required Job Openings',
//         },
//         {
//             img1: "./images/home/can3.png",
//             name1: 'Search & Apply your dream Job',
//             img2: "./images/home/rec3.png",
//             name2: 'Get desired talent shortlisted',
//         },
//         {
//             img1: "./images/home/can4.png",
//             name1: 'Get Hired by a desired company',
//             img2: "./images/home/rec4.png",
//             name2: 'Schedule interview & Hire right talent',
//         },
//     ];

//     return (
//         <div className="lg:h-[404px] customMargins relative w-full overflow-hidden">
//             <div className="text-center w-full">
//                 <animated.p style={toggle ? springProps : springProps4} className="text-center" id={toggle ? "candidate" : "Employer"}>
//                     {toggle ? "Candidate" : "Employer"}
//                 </animated.p>
//             </div>

//             <div className="pt-8 lg:block hidden">
//                 {data.map((item, index) => (
//                     <animated.div
//                         className="create_account"
//                         key={index}
//                         style={index % 2 === 0 ? springProps1 : springProps2}
//                     >
//                         <animated.div
//                             style={toggle ? springProps : springProps4}
//                             className={`z-[100] relative flex flex-col justify-center items-center h-[192px] w-[192px] border ${toggle ? 'border-blue' : 'border-[#FFC65C]'} rounded-[192px]`}
//                         >
//                             <animated.div
//                                 style={toggle ? springProps : springProps4}
//                                 className={`flex justify-center items-center h-[188px] w-[188px] rounded-[188px] ${toggle ? 'circle10' : 'circle11'}`}
//                             >
//                                 <animated.div style={toggle ? springProps : springProps4} className="flex flex-col gap-[18px] items-center justify-center w-[140px]">
//                                     <animated.img
//                                         src={toggle ? item.img1 : item.img2}
//                                         alt=""
//                                         className="h-[56px] w-[56px]"
//                                         style={toggle ? springProps : springProps4}
//                                     />
//                                     <animated.p
//                                         className="text-[14px] font-[500] items-center text-center"
//                                         style={toggle ? springProps : springProps4}
//                                     >
//                                         {toggle ? item.name1 : item.name2}
//                                     </animated.p>
//                                 </animated.div>
//                             </animated.div>
//                             <div
//                                 style={{ filter: 'blur(35px)', opacity: 0.1 }}
//                                 className={`absolute flex flex-col justify-center items-center h-[268px] w-[268px] rounded-[268px] ${toggle ? 'pulse-animation' : 'pulse-animation1'}`}
//                             />
//                         </animated.div>
//                     </animated.div>
//                 ))}
//             </div>

//             <div className="lg:hidden flex flex-wrap scr460:gap-y-[100px] gap-y-[40px] scr700:gap-x-[200px] gap-x-[60px] justify-evenly mt-9">
//                 {data.map((item, index) => (
//                     <div key={index}>
//                         <div
//                             style={toggle ? springProps : springProps4}
//                             className={`z-[100] relative flex flex-col justify-center items-center h-[192px] w-[192px] border ${toggle ? 'border-blue' : 'border-[#FFC65C]'} rounded-[192px]`}
//                         >
//                             <div
//                                 style={toggle ? springProps : springProps4}
//                                 className={`flex justify-center items-center h-[188px] w-[188px] rounded-[188px] ${toggle ? 'circle10' : 'circle11'}`}
//                             >
//                                 <div
//                                     style={toggle ? springProps : springProps4}
//                                     className="flex flex-col gap-[18px] items-center justify-center w-[140px]"
//                                 >
//                                     <animated.img
//                                         src={toggle ? item.img1 : item.img2}
//                                         alt=""
//                                         className="h-[56px] w-[56px]"
//                                         style={toggle ? springProps : springProps4}
//                                     />
//                                     <animated.p
//                                         className="text-[14px] font-[500] items-center text-center"
//                                         style={toggle ? springProps : springProps4}
//                                     >
//                                         {toggle ? item.name1 : item.name2}
//                                     </animated.p>
//                                 </div>
//                             </div>
//                             <div
//                                 style={{ filter: 'blur(35px)', opacity: 0.1 }}
//                                 className={`absolute flex flex-col justify-center items-center h-[268px] w-[268px] rounded-[268px] ${toggle ? 'pulse-animation over' : 'pulse-animation1'}`}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default ForCandidate;

