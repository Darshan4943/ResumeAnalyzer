import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CandidateHeader from "./candidateHeader";

function Header({ userData }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [isLogin, setIsLogin] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
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
      <div className="flex justify-center items-center   z-[100] customMargins">
        <div className="flex justify-between w-[100%]  h-[56px]  gap-2 ">
          {!isLogin ? (
            <>
              <div className="flex items-center gap-9 ">
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
              </div>
              <div className="w-[30%] gap-4  flex justify-end  items-center ">
                <div
                  className="relative  "
                  onMouseEnter={() => setIsSignIn(true)}
                  onMouseLeave={() => setIsSignIn(false)}
                >
                  <button
                    className={`buttonTransparent  min-w-[138px] rounded-[12px] flex justify-center items-center bg-white text-[#333] py-2 px-6 text-[16px] font-medium border border-transparent hover:border-blue `}
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
                        o
                        onClick={() => {
                          router.push("/auth?signin=true");
                        }}
                        className="flex gap-3 py-2 px-3 items-center hover:bg-blue hover:text-white rounded-t-[8px] "
                      >
                        Candidate Sign In
                      </div>

                      <div
                        onClick={() => {
                          router.push("/auth?signin=true");
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
                  className="rounded-[12px] min-w-[138px] flex justify-center items-center bg-white text-[#333] py-2 px-6 text-[16px] font-medium border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
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
