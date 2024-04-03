import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Services from "../../featured/candidate/createResume/components/services";
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
        <Link
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
          <div
            onClick={() => setServices(!isServices)}
            className={
              " text-[14px] flex gap-2  items-center font-semibold p-[10px] hover:bg-[#EAF7FF] rounded-[14px] cursor-pointer "
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_1861_9684)">
                <path
                  d="M2.5 9.16667V2.5H9.16667V9.16667H2.5ZM2.5 17.5V10.8333H9.16667V17.5H2.5ZM10.8333 9.16667V2.5H17.5V9.16667H10.8333ZM10.8333 17.5V10.8333H17.5V17.5H10.8333ZM4.16667 7.5H7.5V4.16667H4.16667V7.5ZM12.5 7.5H15.8333V4.16667H12.5V7.5ZM12.5 15.8333H15.8333V12.5H12.5V15.8333ZM4.16667 15.8333H7.5V12.5H4.16667V15.8333Z"
                  fill="url(#paint0_linear_1861_9684)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1861_9684"
                  x1="2.5"
                  y1="10"
                  x2="17.5"
                  y2="10"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#06A9EF" />
                  <stop offset="1" stop-color="#55CCFF" />
                </linearGradient>
              </defs>
            </svg>

            <li>Services</li>
          </div>
          {isServices && <Services setServices={setServices} />}
        </div>
        <Link
          href="/jobs/list"
          className={
            selectedPage === "/jobs/list"
              ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF]  py-[8px] px-[12px] font-semibold rounded-[14px]"
              : " text-[14px] flex gap-2 items-center font-semibold py-[8px] px-[12px]  hover:bg-[#EAF7FF] rounded-[14px] "
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

          <li>Jobs</li>
        </Link>
      </div>
      {/* <div className="flex justify-center items-center list-none  gap-9 ">
        <Link href="/home">
          {" "}
          <img
            src="/images/logo_skilotech.png"
            alt=""
            className="w-[131px] h-[44px]"
          />
        </Link>
        <Link
          href="/home"
          className={
            selectedPage === "/home"
              ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] p-[10px] font-semibold rounded-[14px]"
              : " text-[14px] flex gap-2 items-center font-semibold p-[10px] hover:bg-[#EAF7FF] rounded-[14px] "
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
          <div
            onClick={() => setServices(!isServices)}
            className={
              " text-[14px] flex gap-2  items-center font-semibold p-[10px] hover:bg-[#EAF7FF] rounded-[14px] cursor-pointer "
            }
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_1861_9684)">
                <path
                  d="M2.5 9.16667V2.5H9.16667V9.16667H2.5ZM2.5 17.5V10.8333H9.16667V17.5H2.5ZM10.8333 9.16667V2.5H17.5V9.16667H10.8333ZM10.8333 17.5V10.8333H17.5V17.5H10.8333ZM4.16667 7.5H7.5V4.16667H4.16667V7.5ZM12.5 7.5H15.8333V4.16667H12.5V7.5ZM12.5 15.8333H15.8333V12.5H12.5V15.8333ZM4.16667 15.8333H7.5V12.5H4.16667V15.8333Z"
                  fill="url(#paint0_linear_1861_9684)"
                />
              </g>
              <defs>
                <linearGradient
                  id="paint0_linear_1861_9684"
                  x1="2.5"
                  y1="10"
                  x2="17.5"
                  y2="10"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#06A9EF" />
                  <stop offset="1" stop-color="#55CCFF" />
                </linearGradient>
              </defs>
            </svg>

            <li>Services</li>
          </div>
          {isServices && <Services setServices={setServices} />}
        </div>
        <Link
          href="/jobs/list"
          className={
            selectedPage === "/jobs/list"
              ? "text-[14px] flex gap-2 items-center bg-[#EAF7FF] p-[10px] font-semibold rounded-[14px]"
              : " text-[14px] flex gap-2 items-center font-semibold p-[10px] hover:bg-[#EAF7FF] rounded-[14px] "
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

          <li>Jobs</li>
        </Link>
      </div> */}

      <div className=" flex gap-4 justify-end  items-center scr1250:w-[18%] w-[23%]  ">
        <div className="flex items-center gap-[8px]">
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
                onClick={() => setIsLogout(!isLogout)}
                src="/images/down_arrow.png"
                className="h-4 w-4 ml-1 cursor-pointer "
                alt=""
              />
              {isLogout && (
                <div
                  ref={taskRef}
                  className="w-[85px] flex justify-center cursor-pointer absolute top-[26px] mt-[1.5rem] right-0 z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md  "
                >
                  <a onClick={handleLogOut} className=" py-1">
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateHeader;
