import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Header() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const { signin, signup } = useRouter().query;
  const [login, setlogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  const handleLogin = () => {
    setlogin(true);
    router.push("/candidate/afterLogin/home/candidateHome");
    toggleDropdown();
  };
  const handleLogOut = () => {
    setlogin(false);
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
    <div
      className={
        selectedPage === "/auth/candidate_register" ||
        selectedPage === "/auth/Employer_register" ||
        selectedPage === "/auth/Recruiter_register"
          ? " "
          : "bg-white z-[1000] fixed w-[100%] mt-[-5rem]"
      }
      style={{
        boxShadow:
          selectedPage === "/" ? "none" : "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="header_parent sticky-header customMargins z-[1000]">
        <div className="header   ">
          <div className="header_left">
            {!isLogin ? (
              <>
                <Link href="/">
                  {" "}
                  <img src="/images/logo_skilotech.png" alt="" />
                </Link>

                <Link
                  href="/"
                  className={selectedPage === "/" ? "active" : "li"}
                >
                  <li>Home</li>
                </Link>
                <Link
                  href="/candidate"
                  className={
                    selectedPage === "/candidate/beforeLogin/candidate"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Candidate</li>
                </Link>
                <Link
                  href="/employer"
                  className={
                    selectedPage === "/employer/beforeLogin/employer"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Employer</li>
                </Link>
                <Link
                  href="/recruiter"
                  className={
                    selectedPage === "/recruiter/Recruiter_page"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Recruiter</li>
                </Link>
              </>
            ) : (
              <>
                <Link href="/candidate/afterLogin/home/candidateHome">
                  {" "}
                  <img src="/images/logo_skilotech.png" alt="" />
                </Link>
                <Link
                  href="/candidate/afterLogin/home/candidateHome"
                  className={
                    selectedPage === "/candidate/afterLogin/home/candidateHome"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Home</li>
                </Link>
                <Link
                  href="/candidate/afterLogin/jobs/jobs"
                  className={
                    selectedPage === "/candidate/afterLogin/jobs/jobs"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Jobs</li>
                </Link>
                <Link
                  href="/candidate/afterLogin/services/services"
                  className={
                    selectedPage ===
                      "/candidate/afterLogin/services/services" ||
                    selectedPage ===
                      "/candidate/afterLogin/services/servicesSub/AiResumePage" ||
                    selectedPage ===
                      "/candidate/afterLogin/services/servicesSub/InterviewQue" ||
                    selectedPage ===
                      "/candidate/afterLogin/services/servicesSub/SkillAssessment" ||
                    selectedPage ===
                      "/candidate/afterLogin/services/servicesSub/DailyQuize"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Services</li>
                </Link>
              </>
            )}
          </div>
          {!isLogin ? (
            <div className="header_right">
              <div
                onClick={() => {
                  router.push({
                    pathname: "/auth",
                    query: { signin: true },
                  });
                }}
              >
                <button className="header_signIn_btn  border border-transparent ">
                  Sign in
                </button>
              </div>
              <Link
                href={{
                  pathname: "/auth",
                  query: { signup: true },
                }}
              >
                <button
                  style={{ border: "1px solid var(--primary, #06A9EF)" }}
                  className="header_signUp_btn"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          ) : (
            <div className="header_right_login">
              <Link href="">
                <img
                  src="/images/notifications.png"
                  className="header_notification"
                  alt=""
                />
              </Link>
              <div className="flex items-center gap-[8px]">
                <Link href="/profile">
                  <div className="profile_icon">
                    <img
                      src="/images/profile_icon.png"
                      className="profile_icon_img"
                      alt=""
                    />
                  </div>
                </Link>
                <div className="user_name flex items-center relative">
                  demo
                  <img
                    src="/images/down_arrow.png"
                    className="h-4 w-4 ml-1 cursor-pointer "
                    alt=""
                    onMouseEnter={toggleDropdown}
                    // onMouseLeave={toggleDropdown}
                  />
                  {showDropdown && (
                    <div className="dropdown absolute -right-10 mt-[6rem] z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md">
                      <a onClick={handleLogin} className="block py-1">
                        Login
                      </a>
                      <a onClick={handleLogOut} className="block py-1">
                        LogOut
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
