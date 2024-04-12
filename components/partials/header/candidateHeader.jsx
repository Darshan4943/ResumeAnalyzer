import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Services from "../../../pages/services";
import { Service, ServiceCross } from "../../../utils/svg";

function CandidateHeader() {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
  const [selectedPage, setSelectedPage] = useState("");
  const { signin, signup } = useRouter().query;
  const [login, setlogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const taskRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
  const [isServices, setServices] = useState(false);
  const [isMove, setIsMove] = useState(false);
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
      <div className="flex justify-center items-center list-none  gap-9 ">
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
                    <stop stop-color="#06A9EF" />
                    <stop offset="1" stop-color="#55CCFF" />
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
            <Link
              onClick={() => setServices(false)}
              href="/dashboard/Enquiries"
              className={
                selectedPage === "/dashboard/Enquiries"
                  ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] py-[8px] px-[12px] font-semibold rounded-[14px]"
                  : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px] hover:bg-[#EAF7FF] rounded-[14px] "
              }
            >
              <li>Enquiries</li>
            </Link>
          </>
        ) : (
          <>
            {" "}
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
                    <stop stop-color="#06A9EF" />
                    <stop offset="1" stop-color="#55CCFF" />
                  </linearGradient>
                </defs>
              </svg>

              <li>Home</li>
            </Link>
            <div className="relative ">
              {!isServices ? (
                <div
                  onClick={() => setServices(true)}
                  className={
                    " text-[14px] flex gap-2  items-center font-semibold p-[10px] hover:bg-[#EAF7FF] rounded-[14px] cursor-pointer "
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
                    " text-[14px] flex gap-2  items-center font-semibold p-[10px] hover:bg-[#EAF7FF] bg-[#EAF7FF] rounded-[14px] cursor-pointer "
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
          </>
        )}
      </div>

      <div  className="relative flex gap-4 justify-end  items-center w-[30%]  ">
        <div onClick={() => setIsLogout(!isLogout)} className="flex items-center gap-[8px] cursor-pointer">
          <div className=" h-[36px] w-[36px]"
          >
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
          {userDataGlobal?.name && (
            <div className="scr1250:text-[14px] text-[14px]">
              {userDataGlobal?.name}
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
                  className="w-[140px] flex flex-col gap-2 justify-center cursor-pointer absolute top-[26px] mt-[1.6rem] right-0 z-[5000] bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md  "
                >
                   <a onClick={()=>router.push("/profile")} className=" ">
                    My Profile
                  </a> 
                 
                  <a onClick={()=>router.push("/purchase/MyPurchase")} className=" ">
                    My Purchases
                  </a>
                  <a onClick={handleLogOut} className=" ">
                    Log Out
                  </a>
                </div>
              )}
      </div>
    </>
  );
}

export default CandidateHeader;
