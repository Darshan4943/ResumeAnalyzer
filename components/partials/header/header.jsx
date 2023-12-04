import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ALink from "~/components/alink";

function Header() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [login, setlogin] = useState(true);

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <div className="header_parent">
        <div className="header">

          <div className="header_left">

            <ALink href="/">
              {" "}
              <img src="./images/logo_skilotech.png" alt="" />
            </ALink>
            {!login ? (
              <>
                <ALink href="/" className={selectedPage === "/" ? "active" : "li"}>
                  <li>Home</li>
                </ALink>
                <ALink
                  href="/candidate/candidate"
                  className={
                    selectedPage === "/candidate/candidate" ? "active" : "li"
                  }
                >
                  <li>Candidate</li>
                </ALink>
                <ALink
                  href="/employer/employer"
                  className={
                    selectedPage === "/employer/employer" ? "active" : "li"
                  }
                >
                  <li>Employer</li>
                </ALink>
                <ALink
                  href="/recruiter/Recruiter_page"
                  className={
                    selectedPage === "/recruiter/Recruiter_page" ? "active" : "li"
                  }
                >
                  <li>Recruiter</li>
                </ALink>
              </>
            ) : (<>
              <ALink href="/" className={selectedPage === "/" ? "active" : "li"}>
                <li>Home</li>
              </ALink>
              <ALink
                href="/jobs/jobs"
                className={
                  selectedPage === "/jobs/jobs" ? "active" : "li"
                }
              >
                <li>Jobs</li>
              </ALink>
              <ALink
                href="/services/services"
                className={
                  selectedPage === "/services/services" ? "active" : "li"
                }
              >
                <li>Services</li>
              </ALink>

            </>
            )}

          </div>
          {!login ? (

            <div className="header_right">
              <ALink href="/Auth/Sign_in">
                <button className="header_signIn_btn">Sign in</button>
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
                <img src="./images/notifications.png" className="header_notification" alt="" />
              </ALink>
              <div className="flex items-center gap-[8px]">
              <ALink href="/profile/profile">
                <div className="profile_icon">
                  <img src="./images/profile_icon.png" className="profile_icon_img" alt="" />
                </div>
              </ALink>
              <div className="user_name flex items-center">
                John Doe

                <img src="./images/down_arrow.png" className="h-[16px] w-[16px]" alt="" />
              </div>
              </div>

            </div>
          )}


        </div>
      </div>
    </>
  );
}

export default Header;