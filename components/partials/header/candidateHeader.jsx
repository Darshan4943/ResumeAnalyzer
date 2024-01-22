import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import Link from "next/link";
function CandidateHeader() {

    const router = useRouter();
    const userDataGlobal = useSelector((state) => state.userData);

    const [selectedPage, setSelectedPage] = useState("");
    const { signin, signup } = useRouter().query;
    const [login, setlogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        setSelectedPage(router.pathname);
    }, [router.pathname]);

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };
    const handleLogin = () => {
        setlogin(true);
        router.push("/candidate/afterLogin/home/candidateHome");
        toggleDropdown();
    };
    const handleLogOut = () => {
        setlogin(false);
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

            <div className="header_left ">
                <Link href="/candidate/afterLogin/home/candidateHome">
                    {" "}
                    <img src="/images/logo_skilotech.png" alt="" className='min-w-[172px]' />
                </Link>
                <Link
                    href="/candidate/afterLogin/home/candidateHome"
                    className={
                        selectedPage === "/candidate/afterLogin/home/candidateHome"
                            ? "active"
                            : "li"
                    }
                >
                    <li>Home</li>
                </Link>
                <Link
                    href="/candidate/afterLogin/jobs/jobs"
                    className={
                        selectedPage === "/candidate/afterLogin/jobs/jobs"
                            ? "active"
                            : "li"
                    }
                >
                    <li>Jobs</li>
                </Link>
                <Link
                    href="/candidate/afterLogin/services/services"
                    className={
                        selectedPage ===
                            "/candidate/afterLogin/services/services" ||
                            selectedPage ===
                            "/candidate/afterLogin/services/servicesSub/AiResumePage" ||
                            selectedPage ===
                            "/candidate/afterLogin/services/servicesSub/InterviewQue" ||
                            selectedPage ===
                            "/candidate/afterLogin/services/servicesSub/SkillAssessment" ||
                            selectedPage ===
                            "/candidate/afterLogin/services/servicesSub/DailyQuize"
                            ? "active"
                            : "li"
                    }
                >
                    <li>Services</li>
                </Link>
            </div>

            <div className="header_right_login w-[50%]">

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
                <Link href="">
                    <img
                        src="/images/notifications.png"
                        className="header_notification"
                        alt=""
                    />
                </Link>
                <div className="flex items-center gap-[8px]">
                    <Link href="/profile">
                        <div className="profile_icon">
                            {userDataGlobal?.profilePicture ? (
                                <img
                                    className=" rounded-full object-cover h-[40px] w-[40px]"
                                    src={
                                        userDataGlobal?.profilePicture?.img ||
                                        "/images/profile/profileNew.png"
                                    }
                                />
                            ) : (
                                <img
                                    src="/images/profile_icon.png"
                                    className="profile_icon_img"
                                    alt=""
                                />
                            )}
                        </div>

                    </Link>
                    <div className="user_name flex items-center relative">
                        <div
                            className="group"
                            style={{
                                height: "50px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                position: "relative",
                            }}
                        >
                            <img
                                src="/images/down_arrow.png"
                                className="h-4 w-4 ml-1 cursor-pointer group-hover:opacity-100 group-hover:visible"
                                alt=""
                            />
                            <div className="dropdown absolute top-[26px] mt-[1rem] z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                                <Link href="/profile" className="block py-1">
                                    Profile
                                </Link>
                                <a onClick={handleLogOut} className="block py-1">
                                    LogOut
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

export default CandidateHeader
