import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
function CandidateHeader() {
  const router = useRouter();
  const userDataGlobal = useSelector((state) => state.userData);

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
    <>
      <div className="flex justify-center items-center list-none gap-9">
        <Link href="/home/BeforeLoginHome">
          {" "}
          <img
            src="/images/logo_skilotech.png"
            alt=""
            className="h-[58px] w-[172px]"
          />
        </Link>
        <Link
          href="/home/BeforeLoginHome"
          className={selectedPage === "/home/BeforeLoginHome" ? "active" : "li"}
        >
          <li>Home</li>
        </Link>
        <Link
          href="/home/MyCollection"
          className={selectedPage === "/home/BeforeLoginHome" ? "active" : "li"}
        >
          <li>My Resumes</li>
        </Link>
        {/* <Link
          href="/home/myPurchase"
          className={selectedPage === "/home/myPurchase" ? "active" : "li"}
        >
          <li>JD Analyser</li>
        </Link> */}
        <Link
          href="/transform/TransformJob"
          className={selectedPage === "/transform/TransformJob" ? "active" : "li"}
        >
          <li>Transform for Job Description</li>
        </Link>

      </div>

      <div className=" flex gap-4 justify-end py-2 items-center w-[50%] group group-hover:visible">
        <div className="flex items-center gap-[8px]">
          <div className="h-[40px] w-[40px]">
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
                className="rounded-[40px] bg-[#06A9EF] flex items-center justify-center text-white font-semibold text-[20px] h-full"
                style={{ textTransform: "capitalize" }}
                alt=""
              >
                {userDataGlobal?.email?.slice(0, 1)}
              </div>
            )}
          </div>
          {userDataGlobal?.name && <div>{userDataGlobal?.name}</div>}

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
                className="h-4 w-4 ml-1 cursor-pointer group-hover:opacity-100 "
                alt=""
              />
              <div className=" cursor-pointer absolute top-[26px] mt-[1.5rem] right-0 z-10 bg-white border border-gray-200 py-2 px-3 rounded-md shadow-md opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                <a onClick={handleLogOut} className="block py-1">
                  LogOut
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CandidateHeader;
