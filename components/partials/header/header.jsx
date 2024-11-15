import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CandidateHeader from "./candidateHeader";

function Header({ userData }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [isLogin, setIsLogin] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    } else {
      setIsLogin(false);
    }
  }, []);

  return (
    <div
      className={
        selectedPage === "/auth/candidate_register" ||
          selectedPage === "/auth/Employer_register" ||
          selectedPage === "/auth/Recruiter_register"
          ? " "
          : "bg-white z-[100] fixed w-[100%]  "
      }
      style={{
        borderBottom: "1.5px solid #DEDEDE",
      }}
    >
      <div className="flex justify-center items-center   z-[100] customMargins  ">
        <div className="flex justify-between w-[100%]  h-[56px]  gap-2 ">
          {!isLogin ? (
            <>
              <div className="flex items-center scr1150:gap-9 scr1024:gap-5 gap-2">
                <Link href="/">
                  {" "}
                  <img
                    className="object-contain h-[36px]"
                    src="/images/logo_skilotech.png"
                    alt=""
                  />
                </Link>
                <Link
                  href="/"
                  className={
                    selectedPage === "/" || selectedPage === "/home"
                      ? "active scr1250:text-[16px] text-[16px]"
                      : "li scr1250:text-[16px] text-[16px]"
                  }
                >
                  Candidate
                </Link>
                <Link
                  href="/recruiter"
                  className={
                    selectedPage === "/recruiter"
                      ? "active scr1250:text-[16px] text-[16px]"
                      : "li scr1250:text-[16px] text-[16px]"
                  }
                >
                  Recruiter
                </Link>
                <Link
                  href="/jobs/search"
                  className={
                    selectedPage === "/jobs/search" || selectedPage === "/jobs/search"
                      ? "active scr1250:text-[16px] text-[16px]"
                      : "li scr1250:text-[16px] text-[16px]"
                  }
                >
                  Jobs
                </Link>



              </div>
              <div className="w-[60%] scr1024:gap-4  gap-1 flex justify-end  items-center ">
                <div className="flex justify-center items-center  border border-[#9D9D9D] rounded-[8px] ">
                  <div className="flex sm:flex-row flex-col justify-between sm:items-center  sm:gap-2 gap-1 items-start   scr1024:px-[12px] px-2 scr1024:py-2 py-1 rounded-[8px] bg-white w-[100%]   ">
                    <div className="flex flex-row gap-[8px] scr1024:gap-[16.82px] items-center  sm:w-[45%] w-full rounded-[8px] sm-p-0 ">
                      <svg
                        className="w-[22px] h-[22px]  min-w-[22px]  "
                        viewBox="0 0 36 36"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.25 23.25L28.5 28.5L23.25 23.25ZM7.5 16.5C7.5 17.6819 7.73279 18.8522 8.18508 19.9441C8.63738 21.0361 9.30031 22.0282 10.136 22.864C10.9718 23.6997 11.9639 24.3626 13.0558 24.8149C14.1478 25.2672 15.3181 25.5 16.5 25.5C17.6819 25.5 18.8522 25.2672 19.9441 24.8149C21.0361 24.3626 22.0282 23.6997 22.864 22.864C23.6997 22.0282 24.3626 21.0361 24.8149 19.9441C25.2672 18.8522 25.5 17.6819 25.5 16.5C25.5 14.1131 24.5518 11.8239 22.864 10.136C21.1761 8.44821 18.8869 7.5 16.5 7.5C14.1131 7.5 11.8239 8.44821 10.136 10.136C8.44821 11.8239 7.5 14.1131 7.5 16.5V16.5Z"
                          stroke="#333333"
                          strokeWidth="3.1544"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>

                      <input
                        type="text"
                        placeholder="Job title"
                        className="text-[14px] sm:text-[16px] font-[400] font-Montserrat w-full min-w-[80px]"
                      value={jobTitle}
                      onChange={(e) => setJobTitle(e.target.value)}
                      />

                    </div>



                    <div className="flex flex-row justify-between items-center gap-[8px] scr1024:gap-[16px] bg-white sm:w-[55%] w-full  rounded-[8px]  sm:p-0">
                      <div className="flex flex-row gap-4">
                        <div className=" bg-[#E0E0E0] min-w-[2px] h-[22px] sm:block hidden"></div>
                        <div className="flex flex-row gap-[8px] scr1024:gap-[16px]  items-center">
                          <svg
                            className="w-[22px] h-[22px]  min-w-[22px]"
                            viewBox="0 0 31 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M25.5879 12.5C25.5879 18.0225 15.5879 27.5 15.5879 27.5C15.5879 27.5 5.58789 18.0225 5.58789 12.5C5.58789 9.84784 6.64146 7.3043 8.51682 5.42893C10.3922 3.55357 12.9357 2.5 15.5879 2.5C18.2401 2.5 20.7836 3.55357 22.659 5.42893C24.5343 7.3043 25.5879 9.84784 25.5879 12.5V12.5Z"
                              stroke="#333333"
                              strokeWidth="3.1544"
                            />
                            <path
                              d="M15.5879 13.75C15.9194 13.75 16.2374 13.6183 16.4718 13.3839C16.7062 13.1495 16.8379 12.8315 16.8379 12.5C16.8379 12.1685 16.7062 11.8505 16.4718 11.6161C16.2374 11.3817 15.9194 11.25 15.5879 11.25C15.2564 11.25 14.9384 11.3817 14.704 11.6161C14.4696 11.8505 14.3379 12.1685 14.3379 12.5C14.3379 12.8315 14.4696 13.1495 14.704 13.3839C14.9384 13.6183 15.2564 13.75 15.5879 13.75Z"
                              fill="white"
                              stroke="#333333"
                              strokeWidth="3.1544"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>

                          <input
                            type="text"
                            placeholder="Location"
                            className="text-[14px] sm:text-[16px] font-[400] w-full font-Montserrat min-w-[80px]"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          />
                        </div>
                      </div>

                      <div
                        onClick={() => {
                          router.push(`/jobs/search?search=${true}&loc=${location}&jobTit=${jobTitle}`);
                       
                        }}
                        className=" cursor-pointer"
                      >
                        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.6504 20.1774L14.6942 13.2211C15.7736 11.8256 16.3575 10.1193 16.3575 8.32468C16.3575 6.17647 15.5192 4.16218 14.0031 2.64343C12.487 1.12468 10.4674 0.28897 8.32184 0.28897C6.1763 0.28897 4.15666 1.12736 2.64059 2.64343C1.12184 4.1595 0.286121 6.17647 0.286121 8.32468C0.286121 10.4702 1.12451 12.4899 2.64059 14.0059C4.15666 15.5247 6.17362 16.3604 8.32184 16.3604C10.1165 16.3604 11.8201 15.7765 13.2156 14.6997L20.1718 21.6533C20.1922 21.6737 20.2165 21.6899 20.2431 21.7009C20.2698 21.7119 20.2983 21.7176 20.3272 21.7176C20.356 21.7176 20.3846 21.7119 20.4113 21.7009C20.4379 21.6899 20.4622 21.6737 20.4825 21.6533L21.6504 20.4881C21.6708 20.4677 21.687 20.4435 21.6981 20.4168C21.7091 20.3901 21.7148 20.3616 21.7148 20.3327C21.7148 20.3039 21.7091 20.2753 21.6981 20.2486C21.687 20.222 21.6708 20.1978 21.6504 20.1774ZM12.5647 12.5675C11.429 13.7006 9.92362 14.3247 8.32184 14.3247C6.72005 14.3247 5.21469 13.7006 4.07898 12.5675C2.94594 11.4318 2.32184 9.92647 2.32184 8.32468C2.32184 6.7229 2.94594 5.21486 4.07898 4.08183C5.21469 2.94879 6.72005 2.32468 8.32184 2.32468C9.92362 2.32468 11.4317 2.94611 12.5647 4.08183C13.6977 5.21754 14.3218 6.7229 14.3218 8.32468C14.3218 9.92647 13.6977 11.4345 12.5647 12.5675Z" fill="#06A9EF" />
                        </svg>


                      </div>
                    </div>
                    <div className="block sm:hidden w-full h-[1px]  bg-[#E0E0E0]"></div>

                  </div>
                </div>

                <div
                  className="relative  "
                  onMouseEnter={() => setIsSignIn(true)}
                  onMouseLeave={() => setIsSignIn(false)}
                >
                  <button
                    className={`buttonTransparent  scr1150:min-w-[138px] scr1024:min-w-[110px] min-w-[100px]  rounded-[12px] flex justify-center items-center bg-white text-[#333] py-2 scr1150:px-6 scr1024:px-3 px-2 text-[16px] font-medium border border-transparent hover:border-blue `}
                  >
                    Sign in
                    <div className="">
                      <img
                        src="/images/down_arrow.png"
                        className="h-4 w-4 ml-1 cursor-pointer "
                        alt=""
                      />
                    </div>
                  </button>
                  {isSignIn && (
                    <div
                      // ref={taskRef}
                      style={{
                        boxShadow: "0px 2px 2px 0px #00000040",
                      }}
                      className="w-[160px] flex flex-col text-[14px] font-medium  justify-center cursor-pointer absolute top-[26px] mt-[1rem] right-0  z-[5000] bg-[#FFFF]  rounded-[8px] rounded-t-[8px]   "
                    >
                      <div

                        onClick={() => {
                          router.push("/auth?signin=true&role=user");
                        }}
                        className="flex gap-3 py-2 px-3 items-center hover:bg-blue hover:text-white rounded-t-[8px] "
                      >
                        Candidate Sign In
                      </div>

                      <div
                        onClick={() => {
                          router.push("/auth?signin=true&role=recruiter");
                        }}
                        className="flex gap-3 py-2 px-3 items-center btn_hover_effect rounded-b-[8px]"
                      >
                        Recruiter Sign In
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => {
                    router.push("/auth?signup=true");
                  }}
                  className="rounded-[12px] scr1150:min-w-[138px] scr1024:min-w-[100px] min-w-[90px] flex justify-center items-center bg-white text-[#333] py-2 scr1150:px-6 scr1024:px-3 px-2 text-[16px] font-medium border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
                >
                  Sign Up
                </button>
              </div>
            </>
          ) : (
            <>
              <CandidateHeader />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
