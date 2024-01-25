import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-scroll";
import EmployerMobileHeader from "./EmployerMobileHeader";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";

function EmployerHeader() {
  const router = useRouter();

  const [selectedPage, setSelectedPage] = useState("");

  const userDataGlobal = useSelector((state) => state.userData);

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
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
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
      <div
        className=" flex ms:p-2 p-2 z-[2000] fixed top-0 w-[100%] bg-white gap-1 justify-between items-center h-[70px]"
        style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className=" flex ms:gap-6 gap-2 items-center ms:justify-start justify-between ms:w-[60%] w-[90%]">
          <div className="flex gap-1 items-center">
            <div className="mobile" onClick={() => setIsSidebar(true)}>
              <img
                src="/images/home/menu.png"
                alt=""
                className="min-w-[30px] h-[30px] object-contain"
              />
            </div>
            <div className="flex  items-center  ">
              <img
                className="min-w-[104px] h-[36.317px] object-contain"
                src="/images/logo_skilotech.png"
                alt=""
              />
            </div>
          </div>
          <div className=" flex items-center border  justify-between w-[25%] ms:min-w-[200px] scr420:min-w-[140px] min-w-[120px] rounded-[8px] px-3 py-1">
            <input
              type="text"
              className="text-black font-small ms:text-[14px] text-[12px] w-[70%]"
              placeholder="Search"
              style={{ border: "none" }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_7896_55668)">
                <path
                  d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex ms:px-4  px-2 py-4 justify-end gap-4 ms:w-[40%] w-[10%] ">
          <div className="flex items-center gap-5">
            <svg
            onClick={() => router.push("/employer/afterLogin/EmployerNotification")}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="26"
              viewBox="0 0 20 26"
              fill="none"
            >
              <path
                d="M0 21.4569V19.0406H2.41625V10.5837C2.41625 8.9125 2.91964 7.42731 3.92641 6.12817C4.93318 4.82984 6.24198 3.97932 7.85281 3.57661V2.73092C7.85281 2.22753 8.0292 1.79986 8.38197 1.44789C8.73394 1.09512 9.16161 0.918732 9.665 0.918732C10.1684 0.918732 10.5961 1.09512 10.948 1.44789C11.3008 1.79986 11.4772 2.22753 11.4772 2.73092V3.57661C13.088 3.97932 14.3968 4.82984 15.4036 6.12817C16.4104 7.42731 16.9137 8.9125 16.9137 10.5837V19.0406H19.33V21.4569H0ZM9.665 25.0812C9.00053 25.0812 8.43191 24.8449 7.95913 24.3721C7.48554 23.8985 7.24875 23.3295 7.24875 22.665H12.0813C12.0813 23.3295 11.8449 23.8985 11.3721 24.3721C10.8985 24.8449 10.3295 25.0812 9.665 25.0812Z"
                fill="#333333"
              />
            </svg>
            <div className="web600">
              <div className="flex items-center gap-2">
                <div className="">
                  <img
                    src="/images/employer/profileNew.png"
                    className="w-[40px] h-[40px]"
                    alt=""
                  />
                </div>

                <div className=" flex items-center ">
                  John Doe
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
                      <div className="dropdown flex flex-col gap-[8px] w-[134px] absolute top-[41px] mt-[1rem] right-0 z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                        <div className="flex gap-[8px] pl-[4px] justify-start items-center flex-row">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="min-w-[20px]  h-[18px]"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M7.99997 7.69231C7.03749 7.69231 6.21354 7.34961 5.52813 6.66421C4.84271 5.97879 4.5 5.15484 4.5 4.19236C4.5 3.22986 4.84271 2.40591 5.52813 1.72051C6.21354 1.03509 7.03749 0.692383 7.99997 0.692383C8.96246 0.692383 9.78641 1.03509 10.4718 1.72051C11.1572 2.40591 11.5 3.22986 11.5 4.19236C11.5 5.15484 11.1572 5.97879 10.4718 6.66421C9.78641 7.34961 8.96246 7.69231 7.99997 7.69231ZM0.5 15.3077V13.0846C0.5 12.5949 0.633016 12.1414 0.89905 11.7241C1.16507 11.3068 1.52051 10.986 1.96537 10.7616C2.95384 10.277 3.95096 9.91351 4.95672 9.67121C5.96249 9.42891 6.97691 9.30776 7.99997 9.30776C9.02304 9.30776 10.0375 9.42891 11.0432 9.67121C12.049 9.91351 13.0461 10.277 14.0346 10.7616C14.4794 10.986 14.8349 11.3068 15.1009 11.7241C15.3669 12.1414 15.5 12.5949 15.5 13.0846V15.3077H0.5ZM1.99997 13.8077H14V13.0846C14 12.8821 13.9413 12.6946 13.824 12.5221C13.7067 12.3497 13.5474 12.209 13.3461 12.1C12.4846 11.6757 11.6061 11.3542 10.7107 11.1356C9.81524 10.917 8.91167 10.8077 7.99997 10.8077C7.08827 10.8077 6.18471 10.917 5.28927 11.1356C4.39384 11.3542 3.51536 11.6757 2.65382 12.1C2.45254 12.209 2.29325 12.3497 2.17595 12.5221C2.05863 12.6946 1.99997 12.8821 1.99997 13.0846V13.8077ZM7.99997 6.19236C8.54997 6.19236 9.02081 5.99653 9.41247 5.60486C9.80414 5.21319 9.99998 4.74236 9.99998 4.19236C9.99998 3.64236 9.80414 3.17153 9.41247 2.77986C9.02081 2.38819 8.54997 2.19236 7.99997 2.19236C7.44997 2.19236 6.97914 2.38819 6.58747 2.77986C6.19581 3.17153 5.99997 3.64236 5.99997 4.19236C5.99997 4.74236 6.19581 5.21319 6.58747 5.60486C6.97914 5.99653 7.44997 6.19236 7.99997 6.19236Z"
                              fill="#333333"
                            />
                          </svg>
                          <Link
                              onClick={() => router.push("Profile")}
                            className="block py-1 justify-start text-[14px]"
                          >
                            Profile
                          </Link>
                        </div>
                        <div className="flex gap-[8px] justify-center items-center flex-row">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="min-w-[24px] h-[24px]"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g mask="url(#mask0_6622_124687)">
                              <path
                                d="M10.7404 14.7496H13.2596L12.6942 11.5919C13.0083 11.4573 13.2612 11.2461 13.4528 10.9582C13.6445 10.6704 13.7403 10.3509 13.7403 9.99959C13.7403 9.5201 13.5702 9.11017 13.2298 8.76979C12.8894 8.4294 12.4795 8.25921 12 8.25921C11.5205 8.25921 11.1106 8.4294 10.7702 8.76979C10.4298 9.11017 10.2596 9.5201 10.2596 9.99959C10.2596 10.3509 10.3554 10.6704 10.5471 10.9582C10.7388 11.2461 10.9916 11.4573 11.3057 11.5919L10.7404 14.7496ZM12 21.4803C9.83716 20.8906 8.04646 19.6175 6.62787 17.6611C5.20929 15.7047 4.5 13.5175 4.5 11.0996V5.34576L12 2.53809L19.5 5.34576V11.0996C19.5 13.5175 18.7907 15.7047 17.3721 17.6611C15.9535 19.6175 14.1628 20.8906 12 21.4803ZM12 19.8996C13.7333 19.3496 15.1666 18.2496 16.3 16.5996C17.4333 14.9496 18 13.1163 18 11.0996V6.37459L12 4.13421L5.99997 6.37459V11.0996C5.99997 13.1163 6.56664 14.9496 7.69997 16.5996C8.83331 18.2496 10.2666 19.3496 12 19.8996Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                          <Link
                            href="/profile"
                            className="block py-1 justify-start break-words"
                          >
                            Change Password
                          </Link>
                        </div>
                        <div className="flex gap-[8px] flex-row">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="min-w-[24px] h-[24px]"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g mask="url(#mask0_6622_124692)">
                              <path
                                d="M20.3711 12.75H8.57695V11.25H20.3711L18.5519 9.43075L19.6057 8.34615L23.2595 12L19.6057 15.6538L18.5519 14.5692L20.3711 12.75ZM15.2019 8.86535V5.3077C15.2019 5.21795 15.1731 5.14423 15.1154 5.08653C15.0577 5.02883 14.9839 4.99998 14.8942 4.99998H5.3077C5.21795 4.99998 5.14423 5.02883 5.08652 5.08653C5.02882 5.14423 4.99997 5.21795 4.99997 5.3077V18.6923C4.99997 18.782 5.02882 18.8557 5.08652 18.9134C5.14423 18.9711 5.21795 19 5.3077 19H14.8942C14.9839 19 15.0577 18.9711 15.1154 18.9134C15.1731 18.8557 15.2019 18.782 15.2019 18.6923V15.1346H16.7019V18.6923C16.7019 19.191 16.5253 19.6169 16.1721 19.9701C15.8189 20.3233 15.3929 20.5 14.8942 20.5H5.3077C4.80898 20.5 4.38302 20.3233 4.02982 19.9701C3.67661 19.6169 3.5 19.191 3.5 18.6923V5.3077C3.5 4.80898 3.67661 4.38302 4.02982 4.02982C4.38302 3.67661 4.80898 3.5 5.3077 3.5H14.8942C15.3929 3.5 15.8189 3.67661 16.1721 4.02982C16.5253 4.38302 16.7019 4.80898 16.7019 5.3077V8.86535H15.2019Z"
                                fill="#C00000"
                              />
                            </g>
                          </svg>

                          <a
                            onClick={() => router.push("/")}
                            className="block py-1"
                          >
                            Sign Out
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebar && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5 }}
              ref={taskRef}
              className="absolute z-[2000] w-full mt-[-4rem]  "
              onWheel={(e) => e.stopPropagation()}
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                ...(navigator.userAgent.includes("Safari") &&
                  !navigator.userAgent.includes("Chrome") && {
                    WebkitBackdropFilter: "blur(10px)",
                  }),
              }}
            >
              <EmployerMobileHeader
                selectedPage={selectedPage}
                setIsSidebar={setIsSidebar}
                setIsLogin={setIsLogin}
                isLogin={isLogin}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default EmployerHeader;
