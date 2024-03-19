import React, { useEffect, useState } from 'react'
import { popupVisible } from '../../../Redux/actions/user';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

function JdResume({ isLogin }) {
    const router = useRouter();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFlickering, setIsFlickering] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % 4);
            setIsFlickering(true);
            setTimeout(() => setIsFlickering(false), 500);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex md:flex-row flex-col-reverse gap-8 items-center py-9 md:px-6 px-3 ">
            <div className=" flex flex-col gap-6 md:w-[38%]  ms:w-[60%] sm:w-[80%] text-[#000000] ">
                <div className="flex flex-col gap-[24px] md:items-start items-center">
                    <div className="font-semibold md:text-[2.5vw] text-[32px] leading-tight md:text-start text-center ">
                        <span className='text-[#06A9EF]'>Transform</span> Resume to Match Multiple <span className='text-[#06A9EF]'>Job Description</span>
                    </div>
                    <div className="font-medium md:text-[1.4vw] text-[14px] text-[#333333] ">
                        <span className='text-[#06A9EF]'>Adapting your resume</span> to fit various job descriptions means adjusting your skills and experiences to closely match what each job requires.
                        <span className='text-[#06A9EF]'> Boost your chances </span>  of getting noticed by relevant hiring managers.
                    </div>
                    <button
                        onClick={() => isLogin ? router.push("/home/BuildResume") : router.push("/auth?signin=true")}
                        className="px-9 py-4 bg-[#06A9EF] text-white  rounded-[12px] md:text-[1.3vw] text-[14px] font-semibold"
                        style={{ width: "fit-content" }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
            <div className="md:w-[60%] w-full relative flex sm:justify-center md:h-[47vw] sm:h-[70vw] h-[120vw] sm:items-center items-end sm:p-5">
                <img
                    src="/images/resumeBuilder/gdResume1.png"
                    alt=""
                    className={`md:w-[20vw] md:h-[28vw] sm:w-[30vw] sm:h-[40vw] w-[53vw] h-[74vw] sm:relative absolute sm:left-0 left-[8%] ${isFlickering ? 'flicker' : ''}`}
                />

                {[0, 1, 2, 3].map((index) => (
                    <div key={index} className={` absolute    ${index === 0
                        ? 'left-0  md:top-[20px] sm:top-[0] top-[20px]'
                        : index === 1
                            ? 'md:top-[40px] sm:top-[20px] top-[-10px] sm:right-0 right-[40%]'
                            : index === 2
                                ? 'right-6 sm:bottom-[0px] bottom-[62%] '
                                : 'sm:left-6 sm:bottom-[30px] bottom-[25%] left-[71%]'
                        }`} style={{
                            borderRadius: "1.15vw",
                            padding: "1.15vw",
                            backgroundColor: index === currentImageIndex ? "#DAF2FD" : 'transparent',


                        }}>
                        <img
                            className='sm:w-[19vw] sm:h-[24vw]  md:w-[13vw] md:h-[17.5vw] w-[23vw] h-[35vw]'
                            src="/images/resumeBuilder/JD.png"
                            alt=""

                            style={{
                                borderRadius: "1.15vw",
                                border: index === currentImageIndex ? " 1px solid #06A9EF" : "none",
                                boxShadow: index !== currentImageIndex ? "0px 2px 15px 0px #00000033" : 'none',


                            }}
                        />
                    </div>
                ))}

            </div>
        </div>
    )
}

export default JdResume