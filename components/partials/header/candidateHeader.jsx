import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
function CandidateHeader() {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
 
  const [selectedPage, setSelectedPage] = useState("");
  const { signin, signup } = useRouter().query;
  const [login, setlogin] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const taskRef = useRef(null);
  const [isLogin, setIsLogin] = useState(false);
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
      <div className="flex justify-center items-center list-none scr1250:gap-9 scr1024:gap-4 gap-3">
        <Link href="/home">
          {" "}
          <img
            src="/images/logo_skilotech.png"
            alt=""
            className="scr1250:h-[58px] scr1024:h-[51px] h-[45px] scr1250:w-[172px] scr1024:w-[150px] w-[133px]"
          />
        </Link>
        <Link
          href="/home"
          className={
            selectedPage === "/home"
              ? "active scr1250:text-[18px] text-[16px]"
              : "li scr1250:text-[18px] text-[16px]"
          }
        >
          <li>Home</li>
        </Link>
        {userDataGlobal.role === "recruiter" &&
          <Link
            href="/myClients"
            className={
              selectedPage === "/myClients"
                ? "active scr1250:text-[18px] text-[16px]"
                : "li scr1250:text-[18px] text-[16px]"
            }
          >
            <li>My Clients</li>
          </Link>
        }
        {userDataGlobal.role === "user" &&
          <Link
            href="/home/MyCollection"
            className={
              selectedPage === "/home/MyCollection"
                ? "active scr1250:text-[18px] text-[16px]"
                : "li scr1250:text-[18px] text-[16px]"
            }
          >
            <li>My Resumes</li>
          </Link>
        }
        <Link
          href="/transform/TransformJob"
          className={
            selectedPage === "/transform/TransformJob"
              ? "active scr1250:text-[18px] text-[16px]"
              : "li scr1250:text-[18px] text-[16px]"
          }
        >
          <li>Transform CV for Job Description</li>
        </Link>
        <Link
          href="/purchase/MyPurchase"
          className={
            selectedPage === "/purchase/MyPurchase"
              ? "active scr1250:text-[18px] text-[16px]"
              : "li scr1250:text-[18px] text-[14px]"
          }
        >
          <li>My Purchase</li>
        </Link>
        {userDataGlobal.role === "user" &&
          <Link
            href="/home/SkillAssessment"
            className={
              selectedPage === "/home/SkillAssessment"
                ? "active scr1250:text-[18px] text-[16px]"
                : "li scr1250:text-[18px] text-[16px]"
            }
          >
            <li>Skill Test</li>
          </Link>
        }
      </div>

      <div className=" flex gap-4 justify-end py-2 items-center scr1250:w-[24.9%] w-[23%]  ">
        <div className="flex items-center gap-[8px]">
          <div className="scr1250:h-[40px] scr1250:w-[40px] h-[30px] w-[30px]">
            {userDataGlobal?.profilePicture ? (
              <img
                className=" rounded-full object-cover h-[40px] w-[40px]"
                src={
                  userDataGlobal?.profilePicture?.img ||
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
            <div className="scr1250:text-[16px] text-[14px]">
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
