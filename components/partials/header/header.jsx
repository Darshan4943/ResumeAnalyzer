import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ALink from "~/components/alink";

function Header() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [login, setlogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const userProfileData = JSON.parse(localStorage.getItem("userProfileData"));

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
    // window.location.reload();
  };
  const handleLogOut = () => {
    setlogin(false);
    router.push("/");
    toggleDropdown();
    localStorage.clear()

    // window.location.reload();
  };

  useEffect(() => {
    const userProfileData = localStorage.getItem("userProfileData");
    if (userProfileData) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  });

  return (
    <div
      className={selectedPage === "/Auth/Candidate_register" || selectedPage === "/Auth/Employer_register" || selectedPage === "/Auth/Recruiter_register"  ?" ": "bg-white z-[1000] fixed w-[100%] mt-[-5rem]"}
      style={{ boxShadow: selectedPage === "/" ? "none" : "0px 1px 4px 0px rgba(0, 0, 0, 0.25)", }}
    >
      <div className="header_parent customMargins z-[1000]">
        <div className="header   ">
          <div className="header_left">
            {!isLogin ? (
              <>
                <ALink href="/">
                  {" "}
                  <img src="./images/logo_skilotech.png" alt="" />
                </ALink>


                <ALink
                  href="/"
                  className={selectedPage === "/" ? "active" : "li"}
                >
                  <li>Home</li>
                </ALink>
                <ALink
                  href="/candidate/beforeLogin/candidate"
                  className={
                    selectedPage === "/candidate/beforeLogin/candidate"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Candidate</li>
                </ALink>
                <ALink
                  href="/employer/beforeLogin/employer"
                  className={
                    selectedPage === "/employer/beforeLogin/employer" ? "active" : "li"
                  }
                >
                  <li>Employer</li>
                </ALink>
                <ALink
                  href="/recruiter/Recruiter_page"
                  className={
                    selectedPage === "/recruiter/Recruiter_page"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Recruiter</li>
                </ALink>
              </>
            ) : (
              <>

                <ALink href="/candidate/afterLogin/home/candidateHome">
                  {" "}
                  <img src="./images/logo_skilotech.png" alt="" />
                </ALink>
                <ALink
                  href="/candidate/afterLogin/home/candidateHome"
                  className={
                    selectedPage === "/candidate/afterLogin/home/candidateHome"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Home</li>
                </ALink>
                <ALink
                  href="/candidate/afterLogin/jobs/jobs"
                  className={
                    selectedPage === "/candidate/afterLogin/jobs/jobs"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Jobs</li>
                </ALink>
                <ALink
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
                </ALink>
              </>
            )}
          </div>
          {!isLogin ? (
            <div className="header_right">
              <ALink href="/Auth/Sign_in">
                <button className="header_signIn_btn  border border-transparent ">Sign in</button>
              </ALink>
              <ALink href="/Auth/Sign_up">
                <button
                  style={{ border: "1px solid var(--primary, #06A9EF)" }}
                  className="header_signUp_btn"
                >
                  Sign Up
                </button>
              </ALink>
            </div>
          ) : (
            <div className="header_right_login">
              <ALink href="">
                <img
                  src="./images/notifications.png"
                  className="header_notification"
                  alt=""
                />
              </ALink>
              <div className="flex items-center gap-[8px]">
                <ALink href="/profile/profile">
                  <div className="profile_icon">
                    <img
                      src="./images/profile_icon.png"
                      className="profile_icon_img"
                      alt=""
                    />
                  </div>
                </ALink>
                <div className="user_name flex items-center relative">
                  {userProfileData?.firstName}
                  <img
                    src="./images/down_arrow.png"
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
