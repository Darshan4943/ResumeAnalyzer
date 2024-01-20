import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector } from "react-redux";
import { data } from "autoprefixer";
import CandidateHeader from "./candidateHeader";

function Header({ userData }) {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);
  console.log(9, userDataGlobal);
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
  });

  return (
    <div
      className={
        selectedPage === "/auth/candidate_register" ||
          selectedPage === "/auth/Employer_register" ||
          selectedPage === "/auth/Recruiter_register"
          ? " "
          : "bg-white z-[100] fixed w-[100%] "
      }
      style={{
        boxShadow:
          selectedPage === "/" ? "none" : "0px 1px 4px 0px rgba(0, 0, 0, 0.25)",
      }}
    >
      <div className="header_parent sticky-header customMargins z-[100]">
        <div className="header   ">

          {!isLogin ? (
            <>
              <div className="header_left">
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
                    selectedPage === "/candidate"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Candidate</li>
                </Link>
                <Link
                  href="/employer"
                  className={
                    selectedPage === "/employer"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Employer</li>
                </Link>
                <Link
                  href="/recruiter"
                  className={
                    selectedPage === "/recruiter"
                      ? "active"
                      : "li"
                  }
                >
                  <li>Recruiter</li>
                </Link>
              </div>
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
            </>
          ) : (
            <>

              <CandidateHeader />
            </>
          )}
        </div>


      </div>
    </div >
  );
}

export default Header;
