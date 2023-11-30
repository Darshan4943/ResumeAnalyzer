import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ALink from "~/components/alink";

function Header() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  return (
    <>
      <div className="header_parent">
        <div className="header">
          <div className="header_left">
            <ALink href="/"> <img src="./images/logo_skilotech.png" alt="" /></ALink>
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
          </div>
          <div className="header_right">
            <button className="header_signIn_btn">Sign in</button>
            <button
              style={{ border: "1px solid var(--primary, #06A9EF)" }}
              className="header_signUp_btn"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
