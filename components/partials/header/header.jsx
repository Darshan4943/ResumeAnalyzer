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
      className={selectedPage === "/Auth/Candidate_register" || selectedPage === "/Auth/Employer_register" || selectedPage === "/Auth/Recruiter_register" ? " " : "bg-white z-[1000] fixed w-[100%] mt-[-5rem]"}
      style={{ boxShadow: selectedPage === "/" ? "none" : "0px 1px 4px 0px rgba(0, 0, 0, 0.25)", }}
    >
      <div className="header_parent customMargins z-[1000]">
        <div className="header items-center">
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
                  <img src="./images/logo_skilotech.png" alt="" className=" object-contain" />
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


          <div className="w-[40.78%] border flex justify-between items-center gap-4 border-[#9D9D9D] rounded-[8px] py-2 px-4 my-[10px]">
            <input
              type="text"
              className="text-black font-small text-[14px]"
              placeholder="Search Job"
                
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
              <path d="M21.6524 20.1779L14.6961 13.2216C15.7756 11.8261 16.3595 10.1198 16.3595 8.32517C16.3595 6.17696 15.5211 4.16267 14.005 2.64392C12.489 1.12517 10.4693 0.289458 8.32379 0.289458C6.17825 0.289458 4.15861 1.12785 2.64254 2.64392C1.12379 4.15999 0.288074 6.17696 0.288074 8.32517C0.288074 10.4707 1.12647 12.4903 2.64254 14.0064C4.15861 15.5252 6.17557 16.3609 8.32379 16.3609C10.1184 16.3609 11.822 15.777 13.2175 14.7002L20.1738 21.6537C20.1942 21.6742 20.2184 21.6903 20.2451 21.7014C20.2717 21.7124 20.3003 21.7181 20.3291 21.7181C20.358 21.7181 20.3866 21.7124 20.4132 21.7014C20.4399 21.6903 20.4641 21.6742 20.4845 21.6537L21.6524 20.4886C21.6728 20.4682 21.689 20.4439 21.7 20.4173C21.7111 20.3906 21.7167 20.3621 21.7167 20.3332C21.7167 20.3044 21.7111 20.2758 21.7 20.2491C21.689 20.2225 21.6728 20.1982 21.6524 20.1779ZM12.5666 12.568C11.4309 13.7011 9.92557 14.3252 8.32379 14.3252C6.722 14.3252 5.21665 13.7011 4.08093 12.568C2.9479 11.4323 2.32379 9.92696 2.32379 8.32517C2.32379 6.72339 2.9479 5.21535 4.08093 4.08231C5.21665 2.94928 6.722 2.32517 8.32379 2.32517C9.92557 2.32517 11.4336 2.9466 12.5666 4.08231C13.6997 5.21803 14.3238 6.72339 14.3238 8.32517C14.3238 9.92696 13.6997 11.435 12.5666 12.568Z" fill="#06A9EF" />
            </svg>
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
