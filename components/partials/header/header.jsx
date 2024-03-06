import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CandidateHeader from "./candidateHeader";

function Header({ userData }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [isLogin, setIsLogin] = useState(false);

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
    }
  }, []);

  return (
    <div
      className={
        selectedPage === "/auth/candidate_register" ||
        selectedPage === "/auth/Employer_register" ||
        selectedPage === "/auth/Recruiter_register"
          ? " "
          : "bg-white z-[100] fixed w-[100%] "
      }
      style={{
        boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="flex justify-center items-center  scr1250:px-6 px-3 z-[100]">
        <div className="flex justify-between w-[100%] h-[58px] my-[16px]  gap-2 ">
          {!isLogin ? (
            <>
              <div className="flex items-center gap-9 ">
                <Link href="/">
                  {" "}
                  <img
                    className="h-[58px] w-[172px]"
                    src="/images/logo_skilotech.png"
                    alt=""
                  />
                </Link>
                <Link href="/">
                  {" "}
                  Candidate
                </Link>
                <Link href="/">
                  {" "}
                 Recruiter
                </Link>
              </div>
              <div className="w-[30%] gap-4  flex justify-end py-2 items-center">
                <div
                  onClick={() => {
                    router.push("/auth?signin=true");
                  }}
                >
                  <button className=" buttonTransparent min-w-[138px] rounded-[12px] flex justify-center items-center bg-white text-[#333] py-3 px-9 text-[16px] font-medium border border-transparent hover:border-[#06A9EF]">
                    Sign in
                  </button>
                </div>

                <button
                  onClick={() => {
                    router.push("/auth?signup=true");
                  }}
                  className="rounded-[12px] min-w-[138px] flex justify-center items-center bg-white text-[#333] py-3 px-9 text-[16px] font-medium border border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white]"
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
