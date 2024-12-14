import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Services from "../../../pages/services";
import { Service, ServiceCross } from "../../../utils/svg";
import { camelCase } from "../../../utils/middleware";

function CandidateHeader() {
  const router = useRouter();
  const { userDataGlobal, profileData } = useSelector((state) => state.user.userData);
  const [selectedPage, setSelectedPage] = useState("");
  const { signin, signup } = useRouter().query;
  const [login, setlogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const taskRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isServices, setServices] = useState(false);
  const [isMove, setIsMove] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogOut = () => {
    setlogin(false);
    setIsLogin(false);

    toggleDropdown();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
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
  }, []);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsLogout(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (!isMove) {
      const imagedownTimer = setTimeout(() => {
        setServices(false);
      }, 300);

      return () => {
        clearTimeout(imagedownTimer);
      };
    }
  }, [isMove]);

  return (
    <>
      <div className="flex justify-center items-center list-none  scr1600:gap-9 xxlg:gap-4 gap-0 ">
        <Link href="/home">
          {" "}
          <img
            src="/images/logo_skilotech.png"
            alt=""
            className="object-contain h-[36px]"
          />
        </Link>
        {userDataGlobal?.role == "admin" ? (
          <>
            <Link
              onClick={() => setServices(false)}
              href="/home"
              className={
                selectedPage === "/home"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_1861_9679)">
                  <path
                    d="M4.99967 15.8333H7.49967V10.8333H12.4997V15.8333H14.9997V8.33333L9.99967 4.58333L4.99967 8.33333V15.8333ZM3.33301 17.5V7.5L9.99967 2.5L16.6663 7.5V17.5H10.833V12.5H9.16634V17.5H3.33301Z"
                    fill="url(#paint0_linear_1861_9679)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_1861_9679"
                    x1="3.33301"
                    y1="10"
                    x2="16.6663"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06A9EF" />
                    <stop offset="1" stopColor="#55CCFF" />
                  </linearGradient>
                </defs>
              </svg>

              <li>Home</li>
            </Link>
            <Link
              onClick={() => setServices(false)}
              href="/dashboard/Recruiters"
              className={
                selectedPage === "/dashboard/Recruiters"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Recruiters</li>
            </Link>
            <Link
              onClick={() => setServices(false)}
              href="/dashboard/Candidates"
              className={
                selectedPage === "/dashboard/Candidates"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Candidates</li>
            </Link>
            {/* <Link
              onClick={() => setServices(false)}
              href="/dashboard/Enquiries"
              className={
                selectedPage === "/dashboard/Enquiries"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Enquiries</li>
            </Link> */}
            <Link
              onClick={() => setServices(false)}
              href="/dashboard/ActivePlans"
              className={
                selectedPage === "/dashboard/ActivePlans"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Active Plans</li>
            </Link>
            <Link
              onClick={() => setServices(false)}
              href="/dashboard/ApiLogs"
              className={
                selectedPage === "/dashboard/ApiLogs"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Api Logs</li>
            </Link>
            {/* <Link
              onClick={() => setServices(false)}
              href="/dashboard/Plans"
              className={
                selectedPage === "/dashboard/Plans"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Plans</li>
            </Link> */}
          </>
        ) : (
          <>
            {" "}
            <div
              onClick={() => setServices(false)}
              // href="/home"
              className={
                (selectedPage === "/home" && !isServices)
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_1861_9679)">
                  <path
                    d="M4.99967 15.8333H7.49967V10.8333H12.4997V15.8333H14.9997V8.33333L9.99967 4.58333L4.99967 8.33333V15.8333ZM3.33301 17.5V7.5L9.99967 2.5L16.6663 7.5V17.5H10.833V12.5H9.16634V17.5H3.33301Z"
                    fill="url(#paint0_linear_1861_9679)"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_1861_9679"
                    x1="3.33301"
                    y1="10"
                    x2="16.6663"
                    y2="10"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#06A9EF" />
                    <stop offset="1" stopColor="#55CCFF" />
                  </linearGradient>
                </defs>
              </svg>

              <li>Home</li>
            </div>
            <div className="relative ">
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
                    setIsMove(false);
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
            </div>
            {userDataGlobal?.role == "user" &&
              <Link
                onClick={() => setServices(false)}
                href="/jobs/search"
                className={
                  (selectedPage === "/jobs/candidate" && !isServices)
                    ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                    : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
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
              </Link>
            }
          </>
        )}
      </div>

      <div className="relative flex gap-4 justify-end  items-center w-[60%]  ">
        {userDataGlobal?.role == "user" &&
          <div className="flex justify-center items-center  border border-[#9D9D9D] rounded-[8px] w-[60%] min-w-[350px] ">
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
        }
        <div
          onClick={() => setIsLogout(!isLogout)}
          className="flex items-center gap-[8px] cursor-pointer"
        >
          <div className=" h-[36px] w-[36px]">
            {userDataGlobal?.profilePicture ? (
              <img
                className=" rounded-full object-cover h-[36px] w-[36px]"
                src={
                  userDataGlobal?.profilePicture ||
                  "/images/profile/profileNew.png"
                }
              />
            ) : (
              <div
                className="rounded-[40px] bg-[#06A9EF] flex items-center justify-center text-white font-semibold scr1250:text-[20px] text-[14px] h-full"
                style={{ textTransform: "capitalize" }}
                alt=""
              >
                {userDataGlobal?.email?.slice(0, 1)}
              </div>
            )}
          </div>
          {userDataGlobal?.firstName && (
            <div className="scr1250:text-[14px] text-[14px] xxlg:block hidden">
              {camelCase(userDataGlobal?.firstName)}{" "}
              {camelCase(userDataGlobal?.lastName)}
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
                className="h-4 w-4 ml-1 cursor-pointer "
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
            className="w-[160px] flex flex-col text-[14px] font-medium  justify-center cursor-pointer absolute top-[26px] mt-[1.95rem] right-0 z-[5000] bg-[#FFFF]  rounded-b-[8px]   "
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
            {userDataGlobal?.role == "user" &&
              <div
                onClick={() => router.push("/myWebsite")}
                className=" flex gap-3 py-2 px-3  items-center"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 6.6C7 6.26863 7.26863 6 7.6 6H8.4C8.73137 6 9 6.26863 9 6.6C9 6.93137 8.73137 7.2 8.4 7.2H7.6C7.26863 7.2 7 6.93137 7 6.6Z" fill="#333333" />
                  <path d="M4 6.6C4 6.26863 4.26863 6 4.6 6H5.4C5.73137 6 6 6.26863 6 6.6C6 6.93137 5.73137 7.2 5.4 7.2H4.6C4.26863 7.2 4 6.93137 4 6.6Z" fill="#333333" />
                  <path d="M16 6.6C16 6.26863 16.2686 6 16.6 6C16.9314 6 17.2 6.26863 17.2 6.6C17.2 6.93137 16.9314 7.2 16.6 7.2C16.2686 7.2 16 6.93137 16 6.6Z" fill="#333333" />
                  <path d="M17.7002 6.6C17.7002 6.26863 17.9688 6 18.3002 6C18.6316 6 18.9002 6.26863 18.9002 6.6C18.9002 6.93137 18.6316 7.2 18.3002 7.2C17.9688 7.2 17.7002 6.93137 17.7002 6.6Z" fill="#333333" />
                  <path d="M19.3999 6.6C19.3999 6.26863 19.6685 6 19.9999 6C20.3313 6 20.5999 6.26863 20.5999 6.6C20.5999 6.93137 20.3313 7.2 19.9999 7.2C19.6685 7.2 19.3999 6.93137 19.3999 6.6Z" fill="#333333" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M3.0998 5.49999H20.8998C21.2312 5.49999 21.4998 5.76862 21.4998 6.09999V8H2.5L2.4998 6.09999C2.4998 5.76862 2.76843 5.49999 3.0998 5.49999ZM2.49998 9L2.4998 17.9C2.4998 18.2314 2.76843 18.5 3.0998 18.5H20.8998C21.2312 18.5 21.4998 18.2314 21.4998 17.9V9H2.49998ZM1.2998 6.09999C1.2998 5.10588 2.10569 4.29999 3.0998 4.29999H20.8998C21.8939 4.29999 22.6998 5.10588 22.6998 6.09999V17.9C22.6998 18.8941 21.8939 19.7 20.8998 19.7H3.0998C2.10569 19.7 1.2998 18.8941 1.2998 17.9V6.09999Z" fill="#333333" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.07419 18.689C9.0742 18.6889 9.07422 18.6887 9.07423 18.6886C9.15106 17.9667 9.49204 17.2987 10.0316 16.8131C10.5713 16.3273 11.2715 16.0582 11.9976 16.0577C12.7237 16.0571 13.4244 16.325 13.9649 16.8098C14.5051 17.2944 14.8471 17.9616 14.9253 18.683C14.9253 18.6834 14.9254 18.6838 14.9254 18.6842L15.977 18.5707C15.9329 18.1626 15.8268 17.7674 15.665 17.3974C15.4376 16.8775 15.1004 16.4077 14.6712 16.0226C13.9364 15.3634 12.9839 14.9992 11.9968 15C11.0097 15.0008 10.0577 15.3666 9.32405 16.027C8.89542 16.4128 8.55897 16.8832 8.3325 17.4034C8.17132 17.7737 8.06584 18.1691 8.02246 18.5772L9.07419 18.689Z" fill="#333333" />
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.5C12.856 13.5 13.55 12.8061 13.55 11.95C13.55 11.094 12.856 10.4 12 10.4C11.144 10.4 10.45 11.094 10.45 11.95C10.45 12.8061 11.144 13.5 12 13.5ZM12 14.7C13.5188 14.7 14.75 13.4688 14.75 11.95C14.75 10.4312 13.5188 9.20001 12 9.20001C10.4812 9.20001 9.25 10.4312 9.25 11.95C9.25 13.4688 10.4812 14.7 12 14.7Z" fill="#333333" />
                </svg>



                My Website
              </div>
            }
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
      </div>
    </>
  );
}

export default CandidateHeader;
