import React, { useEffect, useState } from 'react'
import { popupVisible } from '../../../Redux/actions/user';
import { useDispatch } from 'react-redux';
import {  useRouter } from 'next/router';

function JdResume({isLogin}) {
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
        <div className="flex flex-row gap-8 items-center py-9 px-4 ">
            <div className=" flex flex-col gap-6 w-[38%] text-[#000000] pl-[24px]">
                <div className="flex flex-col gap-[24px]">
                    <div className="font-semibold text-[2.5vw] leading-none ">
                        <span className='text-[#06A9EF]'>Transform</span> Resume to Match Multiple Job Description
                    </div>
                    <div className="font-medium text-[1.4vw] text-[#333333] ">
                        Adapting your resume to fit various job descriptions means adjusting your skills and experiences to closely match what each job requires.
                        Boost your chances of getting noticed by hiring managers.
                    </div>
                    <button
                        onClick={() => isLogin?router.push("/home/BuildResume"):  dispatch(popupVisible())}
                        className="px-9 py-4 bg-[#06A9EF] text-white  rounded-[12px] text-[1.3vw] font-semibold"
                        style={{ width: "fit-content" }}
                    >
                        Get Started
                    </button>
                </div>
            </div>
            <div className="w-[60%] relative flex justify-center h-[50vw] items-center p-5">
                <img
                    src="/images/resumeBuilder/gdResume1.png"
                    alt=""
                    className={`w-[20vw] h-[28vw] ${isFlickering ? 'flicker' : ''}`}
                />

                {[0, 1, 2, 3].map((index) => (
                    <img
                        key={index}
                        src="/images/resumeBuilder/JD.png"
                        alt=""
                        className={`rounded-[14px] absolute w-[13vw] h-[18vw] ${
                            index === currentImageIndex
                            ? 'bg-[#DAF2FD] transition-background-color 0.5s ease-in-out'
                            : 'bg-transparent'
                            } ${index === 0
                                ? 'left-0 top-[60px]'
                                : index === 1
                                    ? 'top-[100px] right-0'
                                    : index === 2
                                        ? 'right-6 bottom-[10px]'
                                        : 'left-6 bottom-[60px]'
                            }`}
                        style={{
                            
                            boxShadow: index !== currentImageIndex ? "0px 2px 15px 0px #00000033" : 'none',
                            padding: "16px",
                           
                        }}
                    />
                ))}

            </div>
        </div>
    )
}

export default JdResume