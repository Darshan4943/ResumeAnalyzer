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
                <Link href="/home/BeforeLoginHome">
                    {" "}
                    <img src="/images/logo_skilotech.png" alt="" className='min-w-[172px]' />
                </Link>
                <Link
                    href="/home/BeforeLoginHome"
                    className={
                        selectedPage === "/home/BeforeLoginHome"
                            ? "active"
                            : "li"
                    }
                >
                    <li>Home</li>
                </Link>
                <Link
                    href="/home/myPurchase"
                    className={
                        selectedPage === "/home/myPurchase"
                            ? "active"
                            : "li"
                    }
                >
                    <li>My Purchase</li>
                </Link>
                
            </div>

            <div className="header_right_login w-[50%]">

               
               
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
                    <div>{userDataGlobal?.basics?.firstName}{" "} {userDataGlobal?.basics?.lastName}</div>
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
                            <div className="dropdown absolute top-[26px] mt-[1.5rem] right-0 z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
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
