import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import { useMediaQuery } from "react-responsive";
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
        setlogin(false);
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
            <div className="flex p-2 justify-between " style={{ boxShadow: "0px 1px 1px 0px rgba(0, 0, 0, 0.25)" }}>
                <div className="flex gap-2 items-center">
                    <div onClick={() => setIsSidebar(true)}>
                    <img src="/images/home/menu.png" alt="" className="w-[30px] h-[30px] object-contain" />
                    </div>
                    <div>
                    <img src="/images/logo_skilotech.png" alt="" className="w-[123px] h-[40px] object-contain" />

                    </div>
                    
                </div>

                <button onClick={() => router.push("/auth/Sign_in")} className="px-4 py-2 border border-[#06A9EF] rounded-[8px] ">
                    Sign In
                </button>


            </div>
            <AnimatePresence>
                {isSidebar && (

                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.5 }}
                        ref={taskRef}
                        className="absolute z-50 w-full mt-[-4rem]" style={{ background: 'rgba(255, 255, 255, 0.50)', backdropFilter: 'blur(10px)' }}
                    >


                        <HeaderSidebar selectedPage={selectedPage} setIsSidebar={setIsSidebar} />

                    </motion.div>

                )}

            </AnimatePresence>


        </>
    )
}
export default MobileHeader;