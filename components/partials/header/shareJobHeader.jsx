

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CandidateHeader from "./candidateHeader";
import { Service } from "../../../utils/svg";
import Services from "../../../pages/services";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import axios from "axios";
import { camelCase } from "../../../utils/middleware";

function ShareJobHeader({ userData }) {
    const router = useRouter();
    const [selectedPage, setSelectedPage] = useState("");
    const isLogin = useSelector((state) => state.auth.isLogin);
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const { profileData } = useSelector((state) => state.profile.profileData);
    const [jobTitle, setJobTitle] = useState("");
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");
    const [isSearch, setIsSearch] = useState(false)
    const [experinceData, setExperinceData] = useState([]);
    const [isSignIn, setIsSignIn] = useState(false);
    const [isServices, setServices] = useState(false);
    const [isLogout, setIsLogout] = useState(false);

    const [isMove, setIsMove] = useState(false);
    useEffect(() => {
        setSelectedPage(router.pathname);
    }, [router.pathname]);

    const taskRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {
            setIsSearch(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        axios
            .get("http://localhost:2000/api/jobs/getJobAttributes")
            .then((res) => {
                const { experiences } = res.data;
                setExperinceData(experiences);

            })
            .catch((err) => console.error(err));
    }, []);


    const sortedExperiences = (experinceData || [])
        .filter(Boolean)
        .sort((a, b) => {
            const getYearsRange = (str) => {
                const match = str?.match(/\d+/g);
                return match ? [parseInt(match[0]), parseInt(match[1] || Infinity)] : [Infinity, Infinity];
            };

            const [aStart, aEnd] = getYearsRange(a);
            const [bStart, bEnd] = getYearsRange(b);


            if (aStart !== bStart) return aStart - bStart;


            return aEnd - bEnd;
        });

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLogOut = () => {


        localStorage.clear();
        sessionStorage.clear();

    };

    return (
        <div
            ref={taskRef}
            className={
                selectedPage === "/auth/candidate_register" ||
                    selectedPage === "/auth/Employer_register" ||
                    selectedPage === "/auth/Recruiter_register"
                    ? " "
                    : "bg-white z-[1000000] fixed w-[100%]  "
            }
            style={{
                borderBottom: "1.5px solid #DEDEDE",
            }}
        >
            <div className="flex justify-center  z-[10000000] customMargins relative w-full ">
                <div
                    className={`flex justify-between w-[100%] transition-all duration-500 ease-in-out bg-white`}
                    style={{ height: isSearch ? "168px" : "70px" }}
                >



                    <>
                        <div className="flex py-3 scr900:gap-9  gap-4 list-none w-full">
                            <div onClick={() => {
                                handleLogOut(); router.push("/");

                            }} className=" cursor-pointer">
                                <img
                                    className=" object-contain min-h-[40px] h-[40px] min-w-[119px]"
                                    src="/images/logo_skilotech.png"
                                    alt=""
                                />
                            </div>

                            {/* <div className="flex items-center gap-9 h-[50px]">
                                {userDataGlobal?.role == "user" &&
                                    <motion.div
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={{ opacity: isSearch ? 0 : 1, scale: isSearch ? 0.8 : 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                        layout

                                        onClick={() => { setServices(false); selectedPage !== "/" && router.push("/") }}

                                        className={
                                            (selectedPage === "/" && !isServices)
                                                ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px] cursor-pointer h-[36px]"
                                                : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] cursor-pointer h-[36px]"
                                        }
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_5501_92674)">
                                                <path d="M20 8.40035C19.9957 8.22188 19.921 8.0543 19.7806 7.94117L17.678 6.19613V0.585938C17.678 0.262344 17.4157 0 17.0921 0H2.90793C2.58434 0 2.32199 0.262344 2.32199 0.585938V6.19617L0.211719 7.94758C0.0791016 8.05781 0 8.22594 0 8.39844V19.4141C0 19.7377 0.262344 20 0.585938 20H0.589492H0.589844H0.590313H19.4097H19.4102H19.4105H19.4141C19.7377 20 20 19.7377 20 19.4141V8.40043C20 8.40039 20 8.40035 20 8.40035ZM1.17188 9.64434L6.31977 13.9068L1.17188 18.1709V9.64434ZM7.23848 14.6675L9.62633 16.6446C9.73152 16.7325 9.86754 16.7798 10 16.7792C10.1325 16.7798 10.2685 16.7324 10.3737 16.6446L12.7615 14.6675L17.7846 18.8281H2.21547L7.23848 14.6675ZM13.6803 13.9068L18.8281 9.64434V18.1709L13.6803 13.9068ZM18.4959 8.39789L17.678 9.07512V7.71906L18.4959 8.39789ZM16.5062 1.17188V10.0455L10 15.4326L3.49387 10.0455V1.17188H16.5062ZM2.32199 7.7191V9.07516L1.5041 8.39793L2.32199 7.7191Z" fill="url(#paint0_linear_5501_92674)" />
                                                <path d="M6.23189 10.6423H13.7681C14.0917 10.6423 14.3541 10.38 14.3541 10.0564V6.01071V4.8918C14.3541 4.56821 14.0917 4.30586 13.7681 4.30586H12.1295V2.91168C12.1295 2.58809 11.8672 2.32574 11.5436 2.32574H8.4565C8.13291 2.32574 7.87057 2.58809 7.87057 2.91168V4.30586H6.23193C5.90834 4.30586 5.646 4.56821 5.646 4.8918V6.01071V10.0563C5.64596 10.38 5.9083 10.6423 6.23189 10.6423ZM6.81783 9.47043V7.58422L6.84846 7.61965C6.95979 7.74836 7.1215 7.82235 7.2917 7.82235H9.42092C9.46213 8.10563 9.70533 8.32344 10 8.32344C10.2947 8.32344 10.5379 8.10563 10.5791 7.82235H12.7028C12.8724 7.82235 13.0338 7.74883 13.145 7.62078L13.1822 7.57805V9.47043H6.81783ZM9.04244 3.49762H10.9576V4.30586H9.04244V3.49762ZM6.81783 5.47774H13.1822V5.79168L12.4358 6.65047H10.5792C10.5379 6.36719 10.2947 6.14938 10.0001 6.14938C9.70537 6.14938 9.46217 6.36719 9.42096 6.65047H7.55971L6.81791 5.79254V5.47774H6.81783Z" fill="url(#paint1_linear_5501_92674)" />
                                            </g>
                                            <defs>
                                                <linearGradient id="paint0_linear_5501_92674" x1="0" y1="10" x2="20" y2="10" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#06A9EF" />
                                                    <stop offset="1" stop-color="#55CCFF" />
                                                </linearGradient>
                                                <linearGradient id="paint1_linear_5501_92674" x1="5.646" y1="6.48403" x2="14.3541" y2="6.48403" gradientUnits="userSpaceOnUse">
                                                    <stop stop-color="#06A9EF" />
                                                    <stop offset="1" stop-color="#55CCFF" />
                                                </linearGradient>
                                                <clipPath id="clip0_5501_92674">
                                                    <rect width="20" height="20" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>

                                        <li>Jobs</li>
                                    </motion.div>

                                }
                                {userDataGlobal?.role == "user" &&
                                    <motion.div
                                        initial={{ opacity: 1, scale: 1 }}
                                        animate={{ opacity: isSearch ? 0 : 1, scale: isSearch ? 0.8 : 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4 }}
                                        layout
                                        className="relative flex items-center  ">
                                        {!isServices ? (
                                            <div
                                                onClick={() => setServices(true)}
                                                className={
                                                    " text-[14px] flex gap-2  items-center font-semibold p-[8px] hover:bg-[#EAF7FF] rounded-[14px] cursor-pointer "
                                                }
                                            >
                                                <Service />

                                                <li>Services</li>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() => {
                                                    setServices(false);
                                                }}
                                                className={
                                                    " text-[14px] flex gap-2  items-center font-semibold p-[8px] hover:bg-[#EAF7FF] bg-[#EAF7FF] rounded-[14px] cursor-pointer "
                                                }
                                            >
                                                <Service />

                                                <li>Services</li>
                                            </div>
                                        )}
                                        {isServices && (
                                            <Services
                                                setServices={setServices}
                                                isServices={isServices}
                                                setIsMove={setIsMove}
                                                isMove={isMove}
                                            />
                                        )}
                                    </motion.div>
                                }
                                <div className="w-[80px]"></div>
                            </div>



                            {(selectedPage.startsWith('/jobs') || isLogin) &&
                                <div className="relative  w-full flex justify-center ">
                                    <motion.div

                                        className={`absolute   ${isSearch ? "" : ""}  `}
                                        initial={{ width: "258px", height: "46px" }}
                                        animate={{
                                            width: isSearch ? "648px" : "258px",
                                            height: isSearch ? "62px" : "46px",
                                            y: isSearch ? 80 : 0,
                                            x: isSearch ? 0 : 0,

                                        }}
                                        exit={{ width: "80px", height: "50px" }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                    >
                                        {isSearch ?
                                            <motion.div
                                                initial={{ scaleX: 0, scaleY: 0 }}
                                                animate={{
                                                    width: isSearch ? "648px" : "258px",
                                                    height: isSearch ? "62px" : "46px",
                                                    scaleX: isSearch ? 1 : 0,
                                                    scaleY: isSearch ? 1 : 0,
                                                }}
                                                exit={{ scaleX: 0, scaleY: 0 }}
                                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                                className="flex flex-row gap-[8px] scr1024:gap-4 items-center justify-between w-full border border-[#E1E3E3] rounded-[30px] px-3 py-[10px]">
                                                <input
                                                    type="text"
                                                    placeholder="Enter Job title"
                                                    className="text-[14px] font-[500] font-Montserrat w-full max-w-[100px] min-w-[80px] placeholder:text-[#889FBA]"
                                                    value={jobTitle}
                                                    onChange={(e) => setJobTitle(e.target.value)}
                                                />
                                                <div className="bg-[#E0E0E0] min-w-[2px] h-[22px] sm:block hidden"></div>

                                                <select
                                                    className={`text-[14px] font-[500] outline-none border-none  w-full font-Montserrat max-w-[148px] min-w-[80px] ${experience ? "text-[#333333]" : "text-[#889FBA]"}`}
                                                    value={experience}
                                                    onChange={(e) => setExperience(e.target.value)}
                                                >
                                                    <option value="" disabled className="text-[#889FBA]">
                                                        Select Experience
                                                    </option>
                                                    {sortedExperiences
                                                        .filter((exp) => exp)
                                                        .map((exp, index) => (
                                                            <option key={index} value={exp} className="text-[#333333]">
                                                                {exp}
                                                            </option>
                                                        ))}
                                                </select>

                                                <div className="bg-[#E0E0E0] min-w-[2px] h-[22px] sm:block hidden"></div>

                                                <input
                                                    type="text"
                                                    placeholder="Enter Location"
                                                    className="text-[14px] font-[500] w-full font-Montserrat max-w-[110px] min-w-[80px] placeholder:text-[#889FBA]"
                                                    value={location}
                                                    onChange={(e) => setLocation(e.target.value)}
                                                />

                                                <button
                                                    onClick={() => {
                                                        router.push(`/jobs/candidate?search=${true}&jobTit=${jobTitle}&exp=${experience}&loc=${location}`);
                                                    }}
                                                    className="px-9 bg-blue py-3 rounded-[30px] text-[14px] font-semibold text-white leading-tight"
                                                >
                                                    Search
                                                </button>
                                            </motion.div>
                                            :
                                            <div
                                                onClick={() => setIsSearch(true)}
                                                className={` scr1067:ml-[-80px] flex justify-between pl-[10px] gap-4 items-center  cursor-pointer w-full  border border-[#E1E3E3] rounded-[30px] px-1 py-1`}
                                            >
                                                <div className="text-[14px] font-medium text-[#889FBA]">
                                                    UX Designer
                                                </div>
                                                <div className="bg-blue rounded-[50%] h-[38px] w-[38px] flex justify-center items-center">
                                                    <svg width="19" height="18" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                                                        <g mask="url(#mask0_8338_107109)">
                                                            <path d="M7.75831 11.7119C6.47756 11.7119 5.39294 11.2677 4.50444 10.3794C3.61606 9.49087 3.17188 8.40625 3.17188 7.1255C3.17188 5.84475 3.61606 4.76013 4.50444 3.87163C5.39294 2.98325 6.47756 2.53906 7.75831 2.53906C9.03906 2.53906 10.1237 2.98325 11.0122 3.87163C11.9006 4.76013 12.3448 5.84475 12.3448 7.1255C12.3448 7.66112 12.2549 8.17269 12.0751 8.66019C11.8953 9.14769 11.6553 9.57169 11.3553 9.93219L15.6708 14.2477C15.7747 14.3514 15.8278 14.4819 15.8302 14.6392C15.8326 14.7964 15.7794 14.9294 15.6708 15.038C15.5622 15.1466 15.4304 15.2009 15.2756 15.2009C15.1208 15.2009 14.9891 15.1466 14.8805 15.038L10.565 10.7225C10.19 11.0321 9.75875 11.2744 9.27125 11.4494C8.78375 11.6244 8.27944 11.7119 7.75831 11.7119ZM7.75831 10.5871C8.72469 10.5871 9.54319 10.2517 10.2138 9.581C10.8846 8.91037 11.2199 8.09187 11.2199 7.1255C11.2199 6.15912 10.8846 5.34062 10.2138 4.67C9.54319 3.99925 8.72469 3.66387 7.75831 3.66387C6.79194 3.66387 5.97344 3.99925 5.30281 4.67C4.63206 5.34062 4.29669 6.15912 4.29669 7.1255C4.29669 8.09187 4.63206 8.91037 5.30281 9.581C5.97344 10.2517 6.79194 10.5871 7.75831 10.5871Z" fill="white" />
                                                        </g>
                                                    </svg>

                                                </div>
                                            </div>
                                        }


                                    </motion.div>

                                </div>
                            } */}


                        </div>

                        <div className="w-[40%] gap-4 flex justify-end items-center h-[40px] mt-[10px]">
                            <motion.button
                                onClick={() => { handleLogOut(); router.push("/auth/Sign_in?role=user") }}
                                className="buttonTransparent  rounded-[30px] flex justify-center items-center blue_border_Button py-[10px] h-[38px] px-6 text-[14px] font-semibold border-[1px]  leading-[18px]"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: isSearch ? 0 : 1, scale: isSearch ? 0.8 : 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                layout
                            >
                                Sign In
                            </motion.button>

                            <motion.button
                                onClick={() => { handleLogOut(); router.push("/auth/AiProfileCreation") }}
                                className="rounded-[30px]  flex justify-center items-center bg_Button py-[10px] h-[38px] px-6  text-[14px] font-semibold border-[1px]  leading-[18px]"
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: isSearch ? 0 : 1, scale: isSearch ? 0.8 : 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.4 }}
                                layout
                            >
                                Sign Up
                            </motion.button>
                        </div>

                    </>


                    {isServices && <Services setServices={setServices} isServices={isServices} setIsMove={setIsMove} isMove={isMove} />}
                </div>

            </div>
        </div>
    );
}

export default ShareJobHeader;
