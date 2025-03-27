import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
function JdAnimation({ details, count }) {
    const router = useRouter();
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [borderline, setBorderLine] = useState(false)
    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setBorderLine(true);

            const timeout2 = setTimeout(() => {
                setBorderLine(false);
            }, 1500);

            return () => clearTimeout(timeout2);
        }, 2000);

        return () => clearTimeout(timeout1);
    }, []);

    const [moveLeft, setMoveLeft] = useState(false)
    const [animate, setAnimate] = useState(true)
    const [one, setOne] = useState(false)
    const [two, setTwo] = useState(false)
    const [three, setThree] = useState(false)
    const [four, setFour] = useState(false)

    useEffect(() => {
        if (animate) {
            const timer = setTimeout(() => {
                setOne(true)

            }, 500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, []);


    useEffect(() => {
        if (one) {
            const timer = setTimeout(() => {

                setTwo(true);

                setOne(false)
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [one]);

    useEffect(() => {
        if (two) {
            const timer = setTimeout(() => {

                setThree(true);
                setTwo(false);
            }, 3500);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [two]);

    useEffect(() => {
        if (three) {
            const timer = setTimeout(() => {
                setMoveLeft(true);

            }, 3000);
            const timer1 = setTimeout(() => {
                setFour(true)

                setThree(false)

            }, 10000)

            const timer2 = setTimeout(() => {

                setMoveLeft(false);
                setFour(false)
            }, 15000)
            const timer3 = setTimeout(() => {
                setOne(true)

            }, 18000)
            return () => {
                clearTimeout(timer, timer1, timer2, timer3);

            };
        }
    }, [three]);
    return (
        <div className="flex flex-col gap-6 w-[100%] items-center ">
            {userDataGlobal?.role === "user" ?
                <>
                    {count == 0 &&
                        <div className="flex flex-col gap-4 items-center">
                            <p className=" text-[16px] font-semibold"> To transform your resume, you will have to first create and save your resume in “My Resumes” section.</p>
                            <button onClick={() => router.push("/home/MyCollection")} className="bg_Button flex justify-center px-4 py-2 rounded-[12px] bg-blue font-medium text-white w-[170px]">Create Resume</button>
                        </div>
                    }
                </>

                :
                <>
                    {details?.length == 0 &&
                        <div className="flex flex-col gap-4 items-center">
                            <p className=" text-[16px] font-semibold"> To transform your resume, you will have to first create Client.</p>

                            <button onClick={() => router.push("/myClients")} className="flex justify-center px-4 py-2 rounded-[12px] bg-blue text-white w-[150px] font-medium">Create Client</button>

                        </div>
                    }
                </>
            }
            <div className="ml:flex hidden flex-col gap-12 w-[100%] max-w-[925px] ">

                <div className="w-[100%] flex justify-between gap-4 p-[60px] ">
                    <div className="flex flex-col items-center gap-[24px] w-[50%]">
                        <div className="flex flex-col gap-[24px]">
                            <div className="flex gap-[8px] ">
                                <div style={{
                                    background: "rgb(6,169,239)",
                                    background: "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)"
                                }} className="  h-[29px] min-w-[29px] flex rounded-[50%]">
                                    <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] " >1</div>
                                </div>
                                <div className="font-[500] text-center max-w-[250px] text-[14px] text-[#333]"> Select Resume which you want to transform</div>
                            </div>
                        </div>

                        <div className="max-w-[200px] justify-center flex-wrap flex overflow-hidden relative ">

                            {

                                [1, 2, 3, 4, 5, 6].map((item, index) => (
                                    <>
                                        <div className="mx-[12px]  my-[8px]">
                                            <div className={`rounded-[4px] ${index === 1 && borderline === true ? 'border border-[#06A9EF] p-[2px]' : 'border  border-[#fff] p-[2px]'}`}>
                                                <img src="/images/resumeBuilder/folder.png" className="w-[24px] mx-[2px] my-[2px]  h-[18px]" alt="" />
                                            </div>

                                        </div>
                                    </>
                                ))

                            }
                            <div
                                className={`absolute  top-[27px] right-[-15px] ${one ? "job_matching_animation" : ''} `}                    >
                                <img src="/images/resumeBuilder/arrow_selector_tool.png" className="w-[13px] h-[18px] " alt="" />
                            </div>




                        </div>


                    </div>
                    <div className="flex flex-col items-center gap-[24px] w-[50%]">
                        <div className="flex flex-col gap-[24px]">
                            <div className="flex gap-[8px]  ">
                                <div style={{
                                    background: "rgb(6,169,239)",
                                    background: "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)"
                                }} className="  h-[29px] min-w-[29px] flex rounded-[50%]">
                                    <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] " >2</div>
                                </div>
                                <div className="font-[500] text-center max-w-[250px] text-[14px] text-[#333]">Enter job Description you want</div>
                            </div>
                        </div>

                        <div className="max-w-[200px] relative justify-center flex-wrap flex ">
                            <img src="/images/resumeBuilder/Frame4.svg" alt="" />
                            <motion.svg

                                initial={{ opacity: 0 }}
                                animate={{ opacity: two ? 1 : 0 }}
                                transition={{ duration: two ? 2.5 : '', delay: two ? 1.8 : '' }}
                                className="absolute  top-[13px]" width="93" height="40" viewBox="0 0 93 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M4 4H89" stroke="#06A9EF" stroke-width="3" stroke-linecap="round" />
                                <path d="M4 20H89" stroke="#06A9EF" stroke-width="3" stroke-linecap="round" />
                                <path d="M4 36H89" stroke="#06A9EF" stroke-width="3" stroke-linecap="round" />
                            </motion.svg>

                            <motion.div

                                className={` w-[20px] ${two ? "job_matching_animation3" : ''} top-[21px] opacity-0 right-[50px] absolute h-[20px]  `} >
                                <img src="/images/resumeBuilder/paste.png" className=" object-contain" alt="" />
                            </motion.div>

                            <motion.div
                                className={` absolute ${two ? "job_matching_animation4" : ''} opacity-0 top-[22px] right-[58px] `} >
                                <img src="/images/resumeBuilder/arrow_selector_tool.png" className="w-[10px] h-[15px] " alt="" />
                            </motion.div>

                        </div>

                    </div>
                </div>

                <div className="w-[100%] flex justify-between overflow-hidden gap-4 p-[22px] scr1150:p-[44px]">
                    <div className="flex flex-col items-center overflow-hidden gap-[24px] w-[50%]">
                        <div className="flex flex-col gap-[24px]">
                            <div className="flex gap-[8px] ">
                                <div style={{
                                    background: "rgb(6,169,239)",
                                    background: "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)"
                                }} className="  h-[29px] min-w-[29px] flex rounded-[50%]">
                                    <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] " >3</div>
                                </div>
                                <div className="font-[500] text-center max-w-[250px] text-[14px] text-[#333]">Hit ‘Transform Resume’ to reframe resume as per Job Description</div>
                            </div>
                        </div>

                        <div className="max-w-[200px] h-[80px] justify-center relative items-end flex-wrap flex ">


                            <motion.button
                                initial={{ borderBottomColor: '#008DCA', borderBottomWidth: "5px", opacity: 1 }}
                                animate={{ borderBottomWidth: three ? "0px" : '5px', translateX: moveLeft ? '-300px' : '0px' }}
                                transition={{ delay: moveLeft ? 0 : 1, duration: moveLeft ? 0.5 : 0.01 }}
                                className="font-[600]  mb-[10px] text-[10px] opacity-0 bg-[#06A9EF] rounded-[5px] text-[#fff] px-[5px] py-[8px]">Transform Resume
                            </motion.button>


                            <div
                                className={` absolute ${three ? 'button_arrow' : ''} opacity-0 top-[10px] right-[-5px] `} >
                                <img src="/images/resumeBuilder/arrow_selector_tool.png" className="w-[10px] h-[15px] " alt="" />
                            </div>

                            <motion.img
                                initial={{ top: '4px', right: '-200px' }}
                                animate={{ top: moveLeft ? '7px' : '4px', right: moveLeft ? '0px' : '-250px' }}
                                transition={{}}
                                src="/images/resumeBuilder/Frame12.png" className="w-[85px] h-[95px] absolute " alt="" />

                            <img src="/images/resumeBuilder/search.png" className={` w-[25px] ${moveLeft ? 'search_animation' : ''}  right-[-1px] top-[47px]  h-[25px] absolute `} alt="" style={{ opacity: moveLeft ? 1 : 0 }} />
                        </div>

                    </div>
                    <div className="flex flex-col items-center w-[50%]">
                        <div className="flex flex-col gap-[24px]">
                            <div className="flex gap-[8px] ">
                                <div style={{
                                    background: "rgb(6,169,239)",
                                    background: "linear-gradient(14deg, rgba(6,169,239,1) 0%, rgba(85,204,255,1) 70%)"
                                }} className="  h-[29px] min-w-[29px] flex rounded-[50%]">
                                    <div className="text-[#fff] flex items-center justify-center text-center  h-[29px] w-[29px] font-[600] " >4</div>
                                </div>
                                <div className="font-[500] text-center max-w-[250px] text-[14px] text-[#333]">Compare Modified version of your resume with Old one.</div>
                            </div>
                        </div>

                        <div className=" justify-center relative h-[100%] overflow-hidden w-[200px] pt-[38px] flex-wrap flex ">
                            <motion.img
                                initial={{ opacity: 1, translateX: '0px' }}
                                animate={{ opacity: four ? 0.5 : 1, translateX: four ? "-18px" : '0px' }}
                                transition={{ duration: 0.5, delay: 1 }}
                                src="/images/resumeBuilder/Frame5.svg" className="w-[56px] absolute h-[66px]" alt="" />

                            <motion.img
                                initial={{ right: '-100px' }}
                                animate={{ right: four ? '25px' : '-100px' }}
                                transition={{ duration: 0.5, delay: 1 }}
                                src="/images/resumeBuilder/Frame5.svg" className="w-[56px] absolute h-[66px]" alt="" />


                            <motion.svg
                                initial={{ top: '41px', right: '13px', opacity: 0 }}
                                animate={{ opacity: four ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 3 }}
                                className='absolute'
                                width="14" height="14" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.56526 0.0548299C6.2505 2.97225 8.03293 4.73086 10.9493 5.42859C10.986 5.43675 11.0064 5.47348 10.9982 5.50612C10.9941 5.5306 10.9737 5.551 10.9493 5.55508C8.00846 6.22833 6.25458 8.02775 5.56118 10.9493C5.55302 10.986 5.51631 11.0064 5.47961 10.9982C5.45513 10.9941 5.43474 10.9737 5.43066 10.9493C4.75766 8.00735 2.97523 6.24874 0.0507309 5.54692C0.0140217 5.53876 -0.00637211 5.50204 0.00178548 5.46532C0.00586428 5.44083 0.0262581 5.42043 0.0507309 5.41635C2.97523 4.7431 4.74134 2.96817 5.43882 0.05075C5.44698 0.0140272 5.48368 -0.00637449 5.52039 0.00178613C5.54079 0.0181074 5.56118 0.0344284 5.56526 0.0548299Z" fill="#FFDA1D" />
                            </motion.svg>

                            <motion.svg
                                initial={{ top: '33px', right: '9px', opacity: 0 }}
                                animate={{ opacity: four ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 3.1 }}
                                className='absolute' width="8" height="8" viewBox="0 0 4 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.02677 0.0190071C2.27662 1.07643 2.92357 1.71891 3.98099 1.97323C3.99438 1.97769 4.0033 1.99108 3.99884 2.00446C3.99884 2.01338 3.98992 2.02231 3.98099 2.02231C2.91465 2.2677 2.27663 2.92357 2.02231 3.98099C2.01785 3.99438 2.00446 4.0033 1.99108 3.99884C1.98215 3.99438 1.97769 3.98992 1.97323 3.98099C1.72784 2.91019 1.08089 2.27216 0.0190075 2.01785C0.00562238 2.01339 -0.00330108 2 0.00116061 1.98661C0.00116061 1.97769 0.0100841 1.96877 0.0190075 1.96877C1.08089 1.72337 1.72337 1.08089 1.97769 0.0190071C1.98215 0.00562206 1.99554 -0.00330105 2.00892 0.00116064C2.02231 0.00562234 2.02677 0.0100838 2.02677 0.0190071Z" fill="#FFDA1D" />
                            </motion.svg>


                            <motion.svg
                                initial={{ top: '20px', right: '16px', opacity: 0 }}
                                animate={{ opacity: four ? 1 : 0 }}
                                transition={{ duration: 0.5, delay: 3.2 }}
                                className='absolute' width="10" height="10" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.03598 0.0306877C3.40847 1.62222 4.38201 2.58307 5.97354 2.96402C5.99471 2.96825 6.00317 2.98942 5.99894 3.00635C5.99471 3.01905 5.98624 3.03175 5.97354 3.03175C4.36931 3.4 3.40847 4.38201 3.03175 5.97354C3.02751 5.99471 3.00635 6.00317 2.98942 5.99894C2.97672 5.99471 2.96402 5.98624 2.96402 5.97354C2.59577 4.36931 1.62222 3.40847 0.026455 3.02328C0.00529101 3.01905 -0.0031746 2.99788 0.0010582 2.98095C0.00529101 2.96825 0.0137566 2.95556 0.026455 2.95556C1.62222 2.5873 2.5873 1.62222 2.96825 0.026455C2.97249 0.00529094 2.99365 -0.0031746 3.01058 0.00105821C3.02328 0.00952381 3.03598 0.0179893 3.03598 0.0306877Z" fill="#FFDA1D" />
                            </motion.svg>

                            <motion.img
                                initial={{ top: '80px', right: '40px', opacity: 1 }}
                                animate={{ opacity: four ? 0 : 1 }}
                                transition={{ duration: 0.1, delay: 4 }}
                                src="/images/resumeBuilder/arrow_selector_tool.png" className="w-[10px] absolute h-[15px] " alt="" />


                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default JdAnimation
