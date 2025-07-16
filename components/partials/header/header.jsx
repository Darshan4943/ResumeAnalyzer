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

function Header({ userData }) {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [experience, setExperience] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [experinceData, setExperinceData] = useState([]);
  const [isSignIn, setIsSignIn] = useState(false);
  const [isServices, setServices] = useState(false);
  const [isLogout, setIsLogout] = useState(false);

  const [isMove, setIsMove] = useState(false);

  const [jdCountMonthly, setJdCountMonthly] = useState();
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const { recallData } = useSelector((state) => state.recall);
  const { aiHitsMonthly, aiHitsMonthlyLimit } = useSelector(
    (state) => state.aiHits
  );
  // const getLimits = () => {
  //   const jdCountMonthly = JSON.parse(localStorage.getItem("aiHitsMonthly"));
  //   setJdCountMonthly(jdCountMonthly);

  //   const jdCountMonthlyLimit = JSON.parse(
  //     localStorage.getItem("aiHitsMonthlyLimit")
  //   );
  //   setJdCountMonthlyLimit(jdCountMonthlyLimit);
  // };
  // useEffect(() => {
  //   setTimeout(() => {
  //     getLimits();
  //   }, 500);
  // }, [recallData]);
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
      .get("https://api.skilotech.com/api/jobs/getJobAttributes")
      .then((res) => {
        const { experiences } = res.data;
        setExperinceData(experiences);
      })
      .catch((err) => console.error(err));
  }, []);

  // const sortedExperiences = (experinceData || [])
  //   .filter(Boolean)
  //   .sort((a, b) => {
  //     const getYearsRange = (str) => {
  //       const match = str?.match(/\d+/g);
  //       return match
  //         ? [parseInt(match[0]), parseInt(match[1] || Infinity)]
  //         : [Infinity, Infinity];
  //     };

  //     const [aStart, aEnd] = getYearsRange(a);
  //     const [bStart, bEnd] = getYearsRange(b);

  //     if (aStart !== bStart) return aStart - bStart;

  //     return aEnd - bEnd;
  //   });


  const [open, setOpen] = useState(false);
 
  const dropdownRef = useRef(null);

  const experienceList = ["Fresher", ...Array.from({ length: 30 }, (_, i) => `${i + 1} year${i + 1 > 1 ? "s" : ""}`)];

  const toggleDropdownn = () => setOpen(!open);

  const handleSelect = (exp) => {
    setExperience(exp);
    setOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogOut = () => {
    toggleDropdown();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
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
          style={{ height: isSearch ? "168px" : "60px" }}
        >
          <>
            <div className="flex py-3 scr1024:gap-9  gap-4 list-none w-full">
              <Link href="/">
                <img
                  className=" object-contain min-h-[36px] h-[36px] min-w-[119px]"
                  src="/images/logo_skilotech.png"
                  alt=""
                />
              </Link>
              {!isLogin ? (
                <div className=" ml:flex hidden items-center h-[40px] scr1024:gap-9 gap-4 ">
                  <div
                    onClick={() => {
                      router.push("/jobs/candidate");
                      setServices(false);
                    }}
                    className={`transition-opacity duration-800 ease-in-out ${isSearch ? "opacity-0" : "opacity-100"
                      } ${selectedPage === "/jobs/candidate" && !isServices
                        ? "active"
                        : "li"
                      } scr1250:text-[16px] text-[16px] cursor-pointer`}
                  >
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{
                        opacity: isSearch ? 0 : 1,
                        scale: isSearch ? 0.8 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      layout
                    >
                      Jobs
                    </motion.div>
                  </div>

                  <div
                    onClick={() => router.push("/services")}
                    className={`transition-opacity duration-800 ease-in-out ${isSearch ? "opacity-0" : "opacity-100"
                      } ${selectedPage === "/services" ? "active" : "li"
                      } scr1250:text-[16px] text-[16px] cursor-pointer`}
                  >
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{
                        opacity: isSearch ? 0 : 1,
                        scale: isSearch ? 0.8 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      layout
                    >
                      Services
                    </motion.div>
                  </div>
                </div>
              ) : (
                <div className="ml:flex hidden items-center scr1024:gap-7 gap-4 h-[40px]">
                  {userDataGlobal?.role == "user" && (
                    <motion.div
                      initial={{ opacity: 1, scale: 1 }}
                      animate={{
                        opacity: isSearch ? 0 : 1,
                        scale: isSearch ? 0.8 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.4 }}
                      layout
                      onClick={() => {
                        setServices(false);
                        selectedPage !== "/jobs/candidate" &&
                          router.push("/jobs/candidate");
                      }}
                      className={
                        selectedPage === "/jobs/candidate" && !isServices
                          ? "text-[14px] flex gap-2 items-center   px-[4px] font-semibold cursor-pointer  border-b-2 border-b-yellow "
                          : " text-[14px] flex gap-2 items-center font-medium  px-[4px] border-2 border-white  hover:border-b-yellow  cursor-pointer "
                      }
                    >
                      {/* <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                      </svg> */}

                      <li>Jobs</li>
                    </motion.div>
                  )}
                  <motion.div
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{
                      opacity: isSearch ? 0 : 1,
                      scale: isSearch ? 0.8 : 1,
                    }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    layout
                    className="relative flex items-center  "
                  >
                    {selectedPage !== "/services" ? (
                      <div
                        onClick={() => router.push("/services")}
                        className={
                          "text-[14px] flex gap-2 items-center   px-[4px] font-medium cursor-pointer  border-2 border-white hover:border-b-yellow "
                        }
                      >
                        {/* <Service /> */}

                        <li>Services</li>
                      </div>
                    ) : (
                      <div
                        // onClick={() => {
                        //   setServices(false);
                        // }}
                        className={
                          " text-[14px] flex gap-2  items-center font-semibold px-[4px] border-b-2 border-b-yellow   cursor-pointer "
                        }
                      >
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
                </div>
              )}

              {(selectedPage.startsWith("/jobs") || isLogin) && (
                <div className="relative  w-full ml:flex hidden justify-center ">
                  <motion.div
                    className={`absolute z-[30000] bg-white xlg:w-[258px]  ${isSearch ? "" : ""
                      }  `}
                    initial={{ width: "258px", height: "46px" }}
                    animate={{
                      width: isSearch ? "648px" : "",
                      height: isSearch ? "62px" : "46px",
                      y: isSearch ? 80 : 0,
                      x: isSearch ? 0 : 0,
                    }}
                    exit={{ width: "80px", height: "50px" }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    {isSearch ? (
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
                        className="flex flex-row gap-[8px] scr1024:gap-4 items-center justify-between w-full border border-[#E1E3E3] rounded-[30px] px-3 py-[10px]"
                      >
                        <input
                          type="text"
                          placeholder="Enter Job title"
                          className="text-[14px] font-[500] font-Montserrat w-full max-w-[100px] min-w-[80px] placeholder:text-[#889FBA]"
                          value={jobTitle}
                          onChange={(e) => setJobTitle(e.target.value)}
                        />
                        <div className="bg-[#E0E0E0] min-w-[2px] h-[22px] sm:block hidden"></div>

                        <div className="relative w-[180px]" ref={dropdownRef}>
                          <div
                            className={`px-4 py-2 bg-white cursor-pointer text-[14px] font-medium ${experience  ? "text-[#333]" : "text-[#889FBA]"
                              }`}
                            onClick={toggleDropdownn}
                          >
                            {experience || "Select Experience"}
                          </div>

                          {open && (
                            <ul className="absolute top-full left-0 mt-2 bg-white rounded shadow-md w-[204px] max-h-[200px] overflow-y-auto z-10">
                              {experienceList.map((exp, idx) => (
                                <li
                                  key={idx}
                                  onClick={() => handleSelect(exp)}
                                  className={`px-4 py-2 text-[13px] font-medium cursor-pointer hover:bg-[#f5f5f5] ${exp === experience ? "bg-[#f0f0f0] font-semibold" : ""
                                    }`}
                                >
                                  {exp === "Fresher" ? (
                                    <div className="flex items-center leading-tight font-medium">
                                      <span className="text-[13px]">Fresher</span> <span className="text-[12px] text-[#717B9E] pl-1"> (less than 1 year)</span>
                                      
                                    </div>
                                  ) : (
                                    exp
                                  )}
                                </li>

                              ))}
                            </ul>
                          )}
                        </div>

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
                            router.push(
                              `/jobs/candidate?search=${true}&jobTit=${jobTitle}&exp=${experience}&loc=${location}`
                            );
                          }}
                          className="px-6 bg-blue h-[38px] bg_Button rounded-[30px] text-[14px] font-semibold text-white leading-tight"
                        >
                          Search
                        </button>
                      </motion.div>
                    ) : (
                      <div
                        onClick={() => {
                          setIsSearch(true);
                        }}
                        className={`  flex justify-between pl-[10px] gap-4 items-center  cursor-pointer lg:w-full w-[200px]  border border-[#E1E3E3] rounded-[30px] px-[3px] h-[37px] `}
                      >
                        <div className="text-[14px] font-medium text-[#889FBA]">
                          UX Designer
                        </div>
                        <div className="bg-blue rounded-[50%] h-[30px] w-[30px] flex justify-center items-center">
                          <svg
                            width="19"
                            height="18"
                            viewBox="0 0 19 18"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <g mask="url(#mask0_8338_107109)">
                              <path
                                d="M7.75831 11.7119C6.47756 11.7119 5.39294 11.2677 4.50444 10.3794C3.61606 9.49087 3.17188 8.40625 3.17188 7.1255C3.17188 5.84475 3.61606 4.76013 4.50444 3.87163C5.39294 2.98325 6.47756 2.53906 7.75831 2.53906C9.03906 2.53906 10.1237 2.98325 11.0122 3.87163C11.9006 4.76013 12.3448 5.84475 12.3448 7.1255C12.3448 7.66112 12.2549 8.17269 12.0751 8.66019C11.8953 9.14769 11.6553 9.57169 11.3553 9.93219L15.6708 14.2477C15.7747 14.3514 15.8278 14.4819 15.8302 14.6392C15.8326 14.7964 15.7794 14.9294 15.6708 15.038C15.5622 15.1466 15.4304 15.2009 15.2756 15.2009C15.1208 15.2009 14.9891 15.1466 14.8805 15.038L10.565 10.7225C10.19 11.0321 9.75875 11.2744 9.27125 11.4494C8.78375 11.6244 8.27944 11.7119 7.75831 11.7119ZM7.75831 10.5871C8.72469 10.5871 9.54319 10.2517 10.2138 9.581C10.8846 8.91037 11.2199 8.09187 11.2199 7.1255C11.2199 6.15912 10.8846 5.34062 10.2138 4.67C9.54319 3.99925 8.72469 3.66387 7.75831 3.66387C6.79194 3.66387 5.97344 3.99925 5.30281 4.67C4.63206 5.34062 4.29669 6.15912 4.29669 7.1255C4.29669 8.09187 4.63206 8.91037 5.30281 9.581C5.97344 10.2517 6.79194 10.5871 7.75831 10.5871Z"
                                fill="white"
                              />
                            </g>
                          </svg>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}
            </div>

            {isLogin ? (
              <motion.div
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: isSearch ? 0 : 1,
                  scale: isSearch ? 0.8 : 1,
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                layout
                className="relative flex gap-4 justify-end  items-center scr1024:w-[50%]  w-[40%] h-[50px] mt-[4px] "
              >
                <div className="flex gap-1 text-[12px] font-medium items-center">
                  <p className="hidden ml:block min-w-[120px]">
                    Remaining AI Hits
                  </p>
                  <div
                    style={{
                      backgroundColor: "#4C43CD",
                      backgroundImage: `
      radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0) 86.18%)
    `,
                    }}
                    className="relative py-[6px] px-2 text-[12px] font-[600] rounded-[30px] flex justify-center items-center leading-tight h-[28px] w-[51px] gap-[4px] text-white scr420:p-[4px] scr420:text-[10px] scr420:h-[24px] scr420:w-[40px]"
                  >
                    <svg
                      width="11"
                      height="10"
                      viewBox="0 0 11 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.93291 2.29406C5.26133 3.80704 6.1156 4.71906 7.51333 5.0809C7.53093 5.08513 7.5407 5.10418 7.53679 5.12111C7.53484 5.1338 7.52506 5.14438 7.51333 5.1465C6.10388 5.49565 5.26329 6.42883 4.93096 7.94392C4.92705 7.96296 4.90946 7.97354 4.89186 7.96931C4.88013 7.9672 4.87036 7.95662 4.8684 7.94392C4.54585 6.41825 3.69158 5.50623 2.28994 5.14227C2.27235 5.13803 2.26257 5.11899 2.26648 5.09995C2.26844 5.08725 2.27821 5.07667 2.28994 5.07455C3.69158 4.7254 4.53803 3.80492 4.87231 2.29194C4.87622 2.2729 4.89382 2.26232 4.91141 2.26655C4.92118 2.27502 4.93096 2.28348 4.93291 2.29406Z"
                        fill="#FFDA1D"
                      />
                      <path
                        d="M8.23025 0.0407713C8.40423 0.836407 8.8519 1.31675 9.58693 1.5072C9.5967 1.50931 9.60061 1.51989 9.59865 1.52836C9.5967 1.5347 9.59279 1.54105 9.58693 1.54105C8.84603 1.72515 8.40228 2.21607 8.2283 3.01171C8.22634 3.02229 8.21657 3.02652 8.20875 3.02441C8.20288 3.02229 8.19702 3.01806 8.19702 3.01171C8.02694 2.20973 7.57733 1.72938 6.84034 1.53682C6.83057 1.5347 6.82666 1.52412 6.82861 1.51566C6.83057 1.50931 6.83448 1.50296 6.84034 1.50296C7.57733 1.31887 8.02303 0.836407 8.19897 0.0386553C8.20093 0.0280751 8.20875 0.0217269 8.21852 0.0238429C8.22439 0.025959 8.2283 0.0323071 8.23025 0.0407713Z"
                        fill="#FFDA1D"
                      />
                      <path
                        d="M1.40994 1.37472C1.58197 2.17035 2.03158 2.6507 2.76661 2.84114C2.77639 2.84326 2.7803 2.85384 2.77834 2.8623C2.77639 2.86865 2.77248 2.875 2.76661 2.875C2.02572 3.05909 1.58197 3.55002 1.40798 4.34565C1.40603 4.35623 1.39625 4.36047 1.38843 4.35835C1.38257 4.35623 1.37671 4.352 1.37671 4.34565C1.20663 3.54367 0.757014 3.06333 0.0200304 2.87077C0.0102561 2.86865 0.00634635 2.85807 0.00830122 2.8496C0.0102561 2.84326 0.0141658 2.83691 0.0200304 2.83691C0.757014 2.65281 1.20272 2.17035 1.37866 1.3726C1.38061 1.36202 1.39039 1.35779 1.39821 1.3599C1.40407 1.36414 1.40994 1.36837 1.40994 1.37472Z"
                        fill="#FFDA1D"
                      />
                      <path
                        d="M8.53494 7.01733C8.70892 7.81297 9.15658 8.29331 9.89161 8.48376C9.90139 8.48587 9.9053 8.49645 9.90334 8.50492C9.90139 8.51127 9.89748 8.51762 9.89161 8.51762C9.15072 8.70171 8.70697 9.19264 8.53298 9.98827C8.53103 9.99885 8.52125 10.0031 8.51343 10.001C8.50757 9.99885 8.50171 9.99462 8.50171 9.98827C8.33163 9.18629 7.88201 8.70594 7.14503 8.51338C7.13526 8.51127 7.13135 8.50069 7.1333 8.49222C7.13526 8.48587 7.13917 8.47953 7.14503 8.47953C7.88201 8.29543 8.32772 7.81297 8.50366 7.01522C8.50561 7.00464 8.51539 6.99829 8.52321 7.00041C8.52907 7.00675 8.53494 7.01099 8.53494 7.01733Z"
                        fill="#FFDA1D"
                      />
                      <path
                        d="M9.14583 4.56582C9.2553 5.06732 9.53876 5.37203 10.0021 5.49265C10.0079 5.49477 10.0099 5.50111 10.0079 5.50746C10.006 5.50958 10.004 5.51169 10.0021 5.51381C9.53289 5.63019 9.25335 5.93914 9.14387 6.44276C9.14192 6.44911 9.13605 6.45334 9.13019 6.45122C9.12628 6.45122 9.12237 6.44699 9.12237 6.44276C9.01485 5.9349 8.7314 5.63231 8.26614 5.51169C8.26028 5.50958 8.25637 5.50323 8.25832 5.49688C8.25832 5.49265 8.26223 5.48842 8.26614 5.48842C8.7314 5.37203 9.0129 5.06732 9.12433 4.5637C9.12628 4.55735 9.13214 4.55312 9.13801 4.55524C9.14192 4.55735 9.14583 4.56159 9.14583 4.56582Z"
                        fill="#FFDA1D"
                      />
                      <path
                        d="M2.41927 7.67308C2.52874 8.17458 2.81219 8.47929 3.2755 8.59991C3.28136 8.60202 3.28527 8.60837 3.28332 8.61472C3.28332 8.61895 3.27941 8.62318 3.2755 8.62318C2.80828 8.73957 2.52874 9.05063 2.41731 9.55213C2.41536 9.55848 2.40949 9.56271 2.40363 9.5606C2.39972 9.55848 2.39776 9.55636 2.39581 9.55213C2.28829 9.04428 2.00484 8.74168 1.53958 8.62107C1.53371 8.61895 1.5298 8.6126 1.53176 8.60626C1.53176 8.60202 1.53567 8.59779 1.53958 8.59779C2.00484 8.48141 2.28634 8.1767 2.39776 7.67308C2.39972 7.66673 2.40558 7.6625 2.41145 7.66461C2.41731 7.66673 2.41927 7.66884 2.41927 7.67308Z"
                        fill="#FFDA1D"
                      />
                      <path
                        d="M3.59492 0.00902704C3.68485 0.423773 3.91943 0.675584 4.30454 0.775038C4.30845 0.777154 4.31236 0.781386 4.3104 0.785618C4.3104 0.78985 4.30649 0.791966 4.30454 0.791966C3.91748 0.887189 3.68485 1.14535 3.59297 1.56221C3.59101 1.56644 3.5871 1.57067 3.58124 1.56856C3.57733 1.56856 3.57537 1.56433 3.57537 1.56221C3.48741 1.14323 3.25087 0.891421 2.86576 0.791966C2.86185 0.78985 2.85794 0.785618 2.85989 0.77927C2.85989 0.775038 2.8638 0.772922 2.86576 0.772922C3.25087 0.6777 3.4835 0.423773 3.57733 0.00691098C3.57928 0.00267888 3.58319 -0.00155321 3.58906 0.000562842C3.59101 0.00267889 3.59492 0.00479494 3.59492 0.00902704Z"
                        fill="#FFDA1D"
                      />
                    </svg>

                    {aiHitsMonthlyLimit - aiHitsMonthly}
                  </div>
                </div>

                <div
                  onClick={() => setIsLogout(!isLogout)}
                  className="flex items-center gap-[8px] cursor-pointer"
                >
                  <div className=" h-[36px] w-[36px]">
                    {profileData?.profilePicture?.img ? (
                      <img
                        className=" rounded-full object-cover h-[36px] w-[36px] min-w-[36px]"
                        src={
                          profileData?.profilePicture?.img ||
                          "/images/profile/profileNew.png"
                        }
                      />
                    ) : (
                      <div
                        className="rounded-[40px] bg-[#06A9EF] min-w-[36px] flex items-center justify-center text-white font-semibold scr1250:text-[20px] text-[14px] h-full"
                        style={{ textTransform: "capitalize" }}
                        alt=""
                      >
                        {userDataGlobal?.email?.slice(0, 1)}
                      </div>
                    )}
                  </div>
                  {profileData?.basics?.firstName && (
                    <div className=" text-[14px] font-semibold xxlg:block hidden">
                      {camelCase(profileData?.basics?.firstName)}
                      {/* {" "}
                      {camelCase(profileData?.basics?.lastName)} */}
                    </div>
                  )}

                  <div className="text-[#495057] text-[14px] font-[600] flex items-center relative">
                    <div
                      className=""
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
                        className="h-4 w-4 -ml-1 cursor-pointer min-w-4 "
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                {isLogout && (
                  <div
                    ref={taskRef}
                    style={{
                      boxShadow: "0px 2px 2px 0px #00000040",
                    }}
                    className="w-[160px] flex flex-col text-[14px] font-medium  justify-center cursor-pointer absolute top-[0px] mt-[57px] right-0 z-[5000] bg-[#FFFF]  rounded-b-[8px]   "
                  >
                    <div
                      onClick={() => router.push("/profile")}
                      className="flex gap-3 py-2 px-3 items-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_641_21690)">
                          <path
                            d="M12 11.6923C11.0375 11.6923 10.2135 11.3496 9.52813 10.6642C8.84271 9.97879 8.5 9.15484 8.5 8.19236C8.5 7.22986 8.84271 6.40591 9.52813 5.72051C10.2135 5.03509 11.0375 4.69238 12 4.69238C12.9625 4.69238 13.7864 5.03509 14.4718 5.72051C15.1572 6.40591 15.5 7.22986 15.5 8.19236C15.5 9.15484 15.1572 9.97879 14.4718 10.6642C13.7864 11.3496 12.9625 11.6923 12 11.6923ZM4.5 19.3077V17.0846C4.5 16.5949 4.63302 16.1414 4.89905 15.7241C5.16507 15.3068 5.52051 14.986 5.96537 14.7616C6.95384 14.277 7.95096 13.9135 8.95672 13.6712C9.96249 13.4289 10.9769 13.3078 12 13.3078C13.023 13.3078 14.0375 13.4289 15.0432 13.6712C16.049 13.9135 17.0461 14.277 18.0346 14.7616C18.4794 14.986 18.8349 15.3068 19.1009 15.7241C19.3669 16.1414 19.5 16.5949 19.5 17.0846V19.3077H4.5ZM5.99997 17.8077H18V17.0846C18 16.8821 17.9413 16.6946 17.824 16.5221C17.7067 16.3497 17.5474 16.209 17.3461 16.1C16.4846 15.6757 15.6061 15.3542 14.7107 15.1356C13.8152 14.917 12.9117 14.8077 12 14.8077C11.0883 14.8077 10.1847 14.917 9.28927 15.1356C8.39384 15.3542 7.51536 15.6757 6.65382 16.1C6.45254 16.209 6.29325 16.3497 6.17595 16.5221C6.05863 16.6946 5.99997 16.8821 5.99997 17.0846V17.8077ZM12 10.1924C12.55 10.1924 13.0208 9.99653 13.4125 9.60486C13.8041 9.21319 14 8.74236 14 8.19236C14 7.64236 13.8041 7.17153 13.4125 6.77986C13.0208 6.38819 12.55 6.19236 12 6.19236C11.45 6.19236 10.9791 6.38819 10.5875 6.77986C10.1958 7.17153 9.99997 7.64236 9.99997 8.19236C9.99997 8.74236 10.1958 9.21319 10.5875 9.60486C10.9791 9.99653 11.45 10.1924 12 10.1924Z"
                            fill="#333333"
                          />
                        </g>
                      </svg>
                      My Profile
                    </div>
                    <div
                      onClick={() => router.push("/purchase/MyPurchase")}
                      className="flex gap-3 py-2 px-3 items-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.70043 5.53379C3.97492 5.53379 3.39291 6.13379 3.41372 6.85826L3.41372 6.85826C3.54981 11.5967 3.8106 14.6428 4.47355 19.1433C4.6616 20.4201 5.76089 21.3575 7.04538 21.3575H13.6689C14.0158 21.3575 14.297 21.0762 14.297 20.7293C14.297 20.3824 14.0158 20.1012 13.6689 20.1012H7.04538C6.37797 20.1012 5.81277 19.6146 5.71639 18.9602C5.06099 14.5109 4.80421 11.5141 4.66947 6.82222L4.66947 6.82221C4.66896 6.8047 4.6835 6.79004 4.70043 6.79004H19.2024C19.2203 6.79004 19.2334 6.80433 19.2332 6.82022C19.2016 9.8616 19.093 12.1806 18.8241 14.6158C18.786 14.9606 19.0346 15.271 19.3794 15.309C19.7242 15.3471 20.0346 15.0985 20.0727 14.7537C20.3478 12.2633 20.4575 9.89981 20.4894 6.83328C20.4969 6.11627 19.9169 5.53379 19.2024 5.53379H4.70043Z"
                          fill="#333333"
                          stroke="#333333"
                          stroke-width="0.2"
                        />
                        <path
                          d="M20.1345 16.8066L17.1 19.8411M20.1345 16.8066L17.1 19.8411M20.1345 16.8066C20.3798 16.5613 20.7775 16.5613 21.0228 16.8066M20.1345 16.8066L21.0228 16.8066M17.1 19.8411L15.8048 18.546C15.5595 18.3007 15.1618 18.3007 14.9165 18.546C14.6712 18.7912 14.6712 19.189 14.9165 19.4343L14.9165 19.4343L16.3799 20.8976L16.38 20.8977C16.7776 21.2954 17.4223 21.2954 17.82 20.8977L17.7493 20.827L17.82 20.8977L21.0228 17.6949C21.2681 17.4496 21.2681 17.0519 21.0228 16.8066M17.1 19.8411L21.0228 16.8066M21.0228 16.8066C21.0228 16.8066 21.0228 16.8066 21.0228 16.8066L20.9521 16.8773L21.0228 16.8066Z"
                          fill="#333333"
                          stroke="#333333"
                          stroke-width="0.2"
                        />
                        <path
                          d="M12.4048 3.92281L12.4048 3.92281L12.4048 3.92281ZM12.4048 3.92281C13.2324 3.95263 13.762 3.97462 14.1819 4.0767C14.5571 4.1679 14.832 4.32151 15.1197 4.64664L15.1197 4.64664C15.4171 4.98282 15.5325 5.26077 15.5777 5.59669C15.6291 5.97895 15.5926 6.44074 15.5283 7.1854C15.4836 7.70299 15.4003 8.26021 15.2798 8.92702C15.2181 9.26839 15.4448 9.59514 15.7862 9.65683L15.7862 9.65684C16.1276 9.7185 16.4543 9.49179 16.516 9.15041L16.4176 9.13263M12.4048 3.92281L16.4176 9.13263M8.7716 4.62891L8.7716 4.62892C8.47529 4.96047 8.35722 5.24336 8.31073 5.59651M8.7716 4.62891L14.4787 2.85601C13.9203 2.72026 13.2625 2.69659 12.5052 2.66936L12.4973 2.66907L12.4972 2.66907L12.45 2.66737L12.45 2.66737C12.1307 2.65587 11.8142 2.65473 11.4951 2.66405L11.4951 2.66405L11.4479 2.66545L11.4478 2.66545L11.4396 2.66569C10.6687 2.68817 10.0012 2.70763 9.43566 2.83993L9.45844 2.9373L9.43566 2.83993C8.81192 2.98586 8.30293 3.26812 7.8349 3.79182L7.8349 3.79182C7.37451 4.30698 7.14548 4.82299 7.06522 5.43257L7.06522 5.43258C6.99301 5.98115 7.04469 6.60219 7.10324 7.30584L7.10398 7.31477L7.10399 7.31484L7.10793 7.36229C7.10793 7.3623 7.10793 7.36231 7.10793 7.36232C7.15407 7.91693 7.23879 8.49496 7.358 9.15101L7.45639 9.13313L7.358 9.15101C7.42002 9.49232 7.747 9.71874 8.08832 9.65672C8.42964 9.59469 8.65602 9.26771 8.594 8.9264C8.47904 8.29365 8.40146 7.75854 8.35987 7.25819L8.26021 7.26648L8.35987 7.25819C8.29541 6.48293 8.25812 5.99619 8.31073 5.59651M8.7716 4.62891C9.06028 4.30588 9.33854 4.15282 9.72184 4.06315C10.1499 3.96302 10.6905 3.94437 11.5319 3.91976L8.7716 4.62891ZM8.31073 5.59651L8.21159 5.58345L8.31073 5.59651ZM16.4176 9.13263L16.516 9.15041C16.6398 8.46549 16.7304 7.86579 16.7799 7.29351L16.784 7.24604L16.7847 7.23761C16.8429 6.56447 16.8948 5.96459 16.8227 5.42917L16.7236 5.4425L16.4176 9.13263Z"
                          fill="#333333"
                          stroke="#333333"
                          stroke-width="0.2"
                        />
                      </svg>
                      My Purchase
                    </div>
                    {userDataGlobal?.role == "user" && (
                      <div
                        onClick={() => router.push("/candidate/myWebsite")}
                        className=" flex gap-3 py-2 px-3  items-center"
                      >
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M7 6.6C7 6.26863 7.26863 6 7.6 6H8.4C8.73137 6 9 6.26863 9 6.6C9 6.93137 8.73137 7.2 8.4 7.2H7.6C7.26863 7.2 7 6.93137 7 6.6Z"
                            fill="#333333"
                          />
                          <path
                            d="M4 6.6C4 6.26863 4.26863 6 4.6 6H5.4C5.73137 6 6 6.26863 6 6.6C6 6.93137 5.73137 7.2 5.4 7.2H4.6C4.26863 7.2 4 6.93137 4 6.6Z"
                            fill="#333333"
                          />
                          <path
                            d="M16 6.6C16 6.26863 16.2686 6 16.6 6C16.9314 6 17.2 6.26863 17.2 6.6C17.2 6.93137 16.9314 7.2 16.6 7.2C16.2686 7.2 16 6.93137 16 6.6Z"
                            fill="#333333"
                          />
                          <path
                            d="M17.7002 6.6C17.7002 6.26863 17.9688 6 18.3002 6C18.6316 6 18.9002 6.26863 18.9002 6.6C18.9002 6.93137 18.6316 7.2 18.3002 7.2C17.9688 7.2 17.7002 6.93137 17.7002 6.6Z"
                            fill="#333333"
                          />
                          <path
                            d="M19.3999 6.6C19.3999 6.26863 19.6685 6 19.9999 6C20.3313 6 20.5999 6.26863 20.5999 6.6C20.5999 6.93137 20.3313 7.2 19.9999 7.2C19.6685 7.2 19.3999 6.93137 19.3999 6.6Z"
                            fill="#333333"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.0998 5.49999H20.8998C21.2312 5.49999 21.4998 5.76862 21.4998 6.09999V8H2.5L2.4998 6.09999C2.4998 5.76862 2.76843 5.49999 3.0998 5.49999ZM2.49998 9L2.4998 17.9C2.4998 18.2314 2.76843 18.5 3.0998 18.5H20.8998C21.2312 18.5 21.4998 18.2314 21.4998 17.9V9H2.49998ZM1.2998 6.09999C1.2998 5.10588 2.10569 4.29999 3.0998 4.29999H20.8998C21.8939 4.29999 22.6998 5.10588 22.6998 6.09999V17.9C22.6998 18.8941 21.8939 19.7 20.8998 19.7H3.0998C2.10569 19.7 1.2998 18.8941 1.2998 17.9V6.09999Z"
                            fill="#333333"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M9.07419 18.689C9.0742 18.6889 9.07422 18.6887 9.07423 18.6886C9.15106 17.9667 9.49204 17.2987 10.0316 16.8131C10.5713 16.3273 11.2715 16.0582 11.9976 16.0577C12.7237 16.0571 13.4244 16.325 13.9649 16.8098C14.5051 17.2944 14.8471 17.9616 14.9253 18.683C14.9253 18.6834 14.9254 18.6838 14.9254 18.6842L15.977 18.5707C15.9329 18.1626 15.8268 17.7674 15.665 17.3974C15.4376 16.8775 15.1004 16.4077 14.6712 16.0226C13.9364 15.3634 12.9839 14.9992 11.9968 15C11.0097 15.0008 10.0577 15.3666 9.32405 16.027C8.89542 16.4128 8.55897 16.8832 8.3325 17.4034C8.17132 17.7737 8.06584 18.1691 8.02246 18.5772L9.07419 18.689Z"
                            fill="#333333"
                          />
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M12 13.5C12.856 13.5 13.55 12.8061 13.55 11.95C13.55 11.094 12.856 10.4 12 10.4C11.144 10.4 10.45 11.094 10.45 11.95C10.45 12.8061 11.144 13.5 12 13.5ZM12 14.7C13.5188 14.7 14.75 13.4688 14.75 11.95C14.75 10.4312 13.5188 9.20001 12 9.20001C10.4812 9.20001 9.25 10.4312 9.25 11.95C9.25 13.4688 10.4812 14.7 12 14.7Z"
                            fill="#333333"
                          />
                        </svg>
                        My Website
                      </div>
                    )}
                    <div
                      onClick={handleLogOut}
                      className=" flex gap-3 py-2 px-3 text-[#C00000] items-center"
                    >
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_2556_34497)">
                          <path
                            d="M20.3711 12.75H8.57695V11.25H20.3711L18.5519 9.43075L19.6057 8.34615L23.2595 12L19.6057 15.6538L18.5519 14.5692L20.3711 12.75ZM15.2019 8.86535V5.3077C15.2019 5.21795 15.1731 5.14423 15.1154 5.08653C15.0577 5.02883 14.9839 4.99998 14.8942 4.99998H5.3077C5.21795 4.99998 5.14423 5.02883 5.08652 5.08653C5.02882 5.14423 4.99997 5.21795 4.99997 5.3077V18.6923C4.99997 18.782 5.02882 18.8557 5.08652 18.9134C5.14423 18.9711 5.21795 19 5.3077 19H14.8942C14.9839 19 15.0577 18.9711 15.1154 18.9134C15.1731 18.8557 15.2019 18.782 15.2019 18.6923V15.1346H16.7019V18.6923C16.7019 19.191 16.5253 19.6169 16.1721 19.9701C15.8189 20.3233 15.3929 20.5 14.8942 20.5H5.3077C4.80898 20.5 4.38302 20.3233 4.02982 19.9701C3.67661 19.6169 3.5 19.191 3.5 18.6923V5.3077C3.5 4.80898 3.67661 4.38302 4.02982 4.02982C4.38302 3.67661 4.80898 3.5 5.3077 3.5H14.8942C15.3929 3.5 15.8189 3.67661 16.1721 4.02982C16.5253 4.38302 16.7019 4.80898 16.7019 5.3077V8.86535H15.2019Z"
                            fill="#C00000"
                          />
                        </g>
                      </svg>
                      Log Out
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="w-[40%] gap-4 flex justify-end items-center h-[40px] mt-[10px]">
                <motion.button
                  onClick={() => router.push("/auth?signin=true")}
                  className="buttonTransparent  rounded-[30px] flex justify-center items-center blue_border_Button py-[10px] h-[38px] px-6 text-[14px] font-semibold border-[1px]  leading-[18px]"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: isSearch ? 0 : 1,
                    scale: isSearch ? 0.8 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  Sign In
                </motion.button>

                <motion.button
                  onClick={() => router.push("/auth?signup=true")}
                  className="rounded-[30px]  flex justify-center items-center bg_Button py-[10px] h-[38px] px-6  text-[14px] font-semibold border-[1px]  leading-[18px]"
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{
                    opacity: isSearch ? 0 : 1,
                    scale: isSearch ? 0.8 : 1,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  layout
                >
                  Sign Up
                </motion.button>
              </div>
            )}
          </>

          {isServices && (
            <Services
              setServices={setServices}
              isServices={isServices}
              setIsMove={setIsMove}
              isMove={isMove}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
