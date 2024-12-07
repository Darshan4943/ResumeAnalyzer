import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import CandidateHeader from "./candidateHeader";
import { Service } from "../../../utils/svg";
import Services from "../../featured/candidate/createResume/components/services";


function Header({ userData }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [isLogin, setIsLogin] = useState(null);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isServices, setServices] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [isMove, setIsMove] = useState(false);
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
          : "bg-white z-[1000000] fixed w-[100%]  "
      }
      style={{
        borderBottom: "1.5px solid #DEDEDE",
      }}
    >
      <div className="flex justify-center items-center   z-[10000000] customMargins  ">
        <div className="flex justify-between w-[100%]  h-[60px]  gap-2 ">
          {!isLogin ? (
            <>
              <div className="flex items-center gap-9 ">
                <Link href="/">
                  {" "}
                  <img
                    className="object-contain h-[40px]"
                    src="/images/logo_skilotech.png"
                    alt=""
                  />
                </Link>
                {/* <Link
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
                </Link> */}
                <div
                  onClick={() => setServices(false)}

                  className={
                    !isServices  || !isServices 
                      ? "active scr1250:text-[16px] text-[16px]"
                      : "li scr1250:text-[16px] text-[16px]"
                  }
                >
                  Jobs
                </div>

                <div
                  // href="/services"
                  onClick={() => setServices(true)}
                  className={
                    isServices
                      ? "active scr1250:text-[16px] text-[16px]"
                      : "li scr1250:text-[16px] text-[16px]"
                  }
                >
                  Services
                </div>


              </div>
              <div className="w-[60%] gap-4   flex justify-end  items-center ">


                <button
                  onClick={() => {
                    router.push("/auth?signin=true");
                  }}
                  className={`buttonTransparent  scr1150:min-w-[123px] scr1024:min-w-[110px] min-w-[100px]  rounded-[30px] flex justify-center items-center bg-white text-[#333] py-[10px] h-[42px] scr1150:px-6 scr1024:px-3 px-2 text-[14px] font-semibold  border-[1px] border-[#06A9EF]  hover:bg-[#06A9EF] hover:text-[white] leading-[18px] `}
                >
                  Sign in

                </button>



                <button
                  onClick={() => {
                    router.push("/auth?signup=true");
                  }}
                  className="rounded-[30px] scr1150:min-w-[129px] scr1024:min-w-[100px] min-w-[90px] flex justify-center items-center  text-[#FFFFFF] py-[10px] h-[42px] scr1150:px-6 scr1024:px-3 px-2 text-[14px] font-semibold border-[1px] border-[#06A9EF] bg-[#06A9EF]   hover:bg-white hover:text-[#333333] leading-[18px]"
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

          {isServices &&
           
              <Services />

          }
        </div>
      </div>
    </div>
  );
}

export default Header;
