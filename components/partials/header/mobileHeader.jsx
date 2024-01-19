import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";

import HeaderSidebar from "@/components/models/headerSidebar";
import { AnimatePresence, motion } from "framer-motion";


function MobileHeader() {

    const [selectedPage, setSelectedPage] = useState("");
    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);
    console.log(9, userDataGlobal);


    const [login, setlogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [isSidebar, setIsSidebar] = useState(false);

    useEffect(() => {
        setSelectedPage(router.pathname);
    }, [router.pathname]);

    const taskRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {
            setOpenTaskModel(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, []);



    const handleLogOut = () => {
        setIsLogin(false);
        router.push("/");
        toggleDropdown();
        localStorage.clear();
    };

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token && token != "undefined") {
            if (token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        }
    });



    return (
        <>
            <div className="flex p-2 justify-between fixed w-[100%] bg-white z-[100]  " style={{ boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)" }}>
                <div className="flex gap-2 items-center">
                    <div onClick={() => setIsSidebar(true)}>
                        <img src="/images/home/menu.png" alt="" className="w-[30px] h-[30px] object-contain" />
                    </div>
                    <div onClick={() => router.push("/candidate/afterLogin/home/candidateHome")}>
                        <img src="/images/logo_skilotech.png" alt="" className="w-[123px] h-[40px] object-contain" />

                    </div>

                </div>

                {isLogin ?

                    <div className="flex justify-end  items-center w-full gap-3 " >

                        <div className="flex justify-between min-w-[102px] w-[60%] gap-1 items-center border border-[#9D9D9D] py-1 px-3 rounded-[8px] ">
                            <input
                                className="  w-[80%] "
                                type="text"
                                name=""
                                placeholder="Search Job"

                            />

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                <g mask="url(#mask0_5925_109050)">
                                    <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z" fill="#06A9EF" />
                                </g>
                            </svg>
                        </div>

                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="none">
                            <path d="M0 21.4571V19.0408H2.41625V10.584C2.41625 8.91271 2.91964 7.42752 3.92641 6.12838C4.93318 4.83005 6.24198 3.97953 7.85281 3.57682V2.73113C7.85281 2.22775 8.0292 1.80007 8.38197 1.4481C8.73394 1.09533 9.16161 0.918945 9.665 0.918945C10.1684 0.918945 10.5961 1.09533 10.948 1.4481C11.3008 1.80007 11.4772 2.22775 11.4772 2.73113V3.57682C13.088 3.97953 14.3968 4.83005 15.4036 6.12838C16.4104 7.42752 16.9137 8.91271 16.9137 10.584V19.0408H19.33V21.4571H0ZM9.665 25.0815C9.00053 25.0815 8.43191 24.8451 7.95913 24.3723C7.48554 23.8987 7.24875 23.3297 7.24875 22.6652H12.0813C12.0813 23.3297 11.8449 23.8987 11.3721 24.3723C10.8985 24.8451 10.3295 25.0815 9.665 25.0815Z" fill="#495057" />
                        </svg>
                    </div>
                    :

                    <button onClick={() => router.push("/auth/Sign_in")} className="px-4 py-2 border border-[#06A9EF] rounded-[8px] ">
                        Sign In
                    </button>

                }
            </div>
            <AnimatePresence>
                {isSidebar && (
                    <>

                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.5 }}
                            ref={taskRef}
                            className="absolute z-[2000] w-full mt-[-4rem] bg-white "
                            style={{
                                background: 'rgba(255, 255, 255, 0.99)', 
                                boxShadow: '0 0 10px rgba(255, 255, 255, 0.9)', 
                                backdropFilter: 'blur(10px)',
                                willChange: 'transform', 
                            }}
                        >
                            <HeaderSidebar selectedPage={selectedPage} setIsSidebar={setIsSidebar} setIsLogin={setIsLogin} isLogin={isLogin} />
                        </motion.div>

                    </>
                )}

            </AnimatePresence>


        </>
    )
}
export default MobileHeader;