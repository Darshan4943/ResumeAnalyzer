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

      <div className="relative flex gap-4 justify-end  items-center w-[30%]  ">
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
            // ref={taskRef}
            style={{
              boxShadow: "0px 2px 2px 0px #00000040"
            }}
            className="w-[160px] flex flex-col text-[14px] font-medium  justify-center cursor-pointer absolute top-[26px] mt-[1.95rem] right-0 z-[5000] bg-[#FFFF]  rounded-b-[8px]   "
          >
            <div onClick={() => router.push("/profile")} className="flex gap-3 py-2 px-3 items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g mask="url(#mask0_641_21690)">
                  <path d="M12 11.6923C11.0375 11.6923 10.2135 11.3496 9.52813 10.6642C8.84271 9.97879 8.5 9.15484 8.5 8.19236C8.5 7.22986 8.84271 6.40591 9.52813 5.72051C10.2135 5.03509 11.0375 4.69238 12 4.69238C12.9625 4.69238 13.7864 5.03509 14.4718 5.72051C15.1572 6.40591 15.5 7.22986 15.5 8.19236C15.5 9.15484 15.1572 9.97879 14.4718 10.6642C13.7864 11.3496 12.9625 11.6923 12 11.6923ZM4.5 19.3077V17.0846C4.5 16.5949 4.63302 16.1414 4.89905 15.7241C5.16507 15.3068 5.52051 14.986 5.96537 14.7616C6.95384 14.277 7.95096 13.9135 8.95672 13.6712C9.96249 13.4289 10.9769 13.3078 12 13.3078C13.023 13.3078 14.0375 13.4289 15.0432 13.6712C16.049 13.9135 17.0461 14.277 18.0346 14.7616C18.4794 14.986 18.8349 15.3068 19.1009 15.7241C19.3669 16.1414 19.5 16.5949 19.5 17.0846V19.3077H4.5ZM5.99997 17.8077H18V17.0846C18 16.8821 17.9413 16.6946 17.824 16.5221C17.7067 16.3497 17.5474 16.209 17.3461 16.1C16.4846 15.6757 15.6061 15.3542 14.7107 15.1356C13.8152 14.917 12.9117 14.8077 12 14.8077C11.0883 14.8077 10.1847 14.917 9.28927 15.1356C8.39384 15.3542 7.51536 15.6757 6.65382 16.1C6.45254 16.209 6.29325 16.3497 6.17595 16.5221C6.05863 16.6946 5.99997 16.8821 5.99997 17.0846V17.8077ZM12 10.1924C12.55 10.1924 13.0208 9.99653 13.4125 9.60486C13.8041 9.21319 14 8.74236 14 8.19236C14 7.64236 13.8041 7.17153 13.4125 6.77986C13.0208 6.38819 12.55 6.19236 12 6.19236C11.45 6.19236 10.9791 6.38819 10.5875 6.77986C10.1958 7.17153 9.99997 7.64236 9.99997 8.19236C9.99997 8.74236 10.1958 9.21319 10.5875 9.60486C10.9791 9.99653 11.45 10.1924 12 10.1924Z" fill="#333333" />
                </g>
              </svg>

              My Profile
            </div>

            <div onClick={() => router.push("/purchase/MyPurchase")} className="flex gap-3 py-2 px-3 items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.70043 5.53379C3.97492 5.53379 3.39291 6.13379 3.41372 6.85826L3.41372 6.85826C3.54981 11.5967 3.8106 14.6428 4.47355 19.1433C4.6616 20.4201 5.76089 21.3575 7.04538 21.3575H13.6689C14.0158 21.3575 14.297 21.0762 14.297 20.7293C14.297 20.3824 14.0158 20.1012 13.6689 20.1012H7.04538C6.37797 20.1012 5.81277 19.6146 5.71639 18.9602C5.06099 14.5109 4.80421 11.5141 4.66947 6.82222L4.66947 6.82221C4.66896 6.8047 4.6835 6.79004 4.70043 6.79004H19.2024C19.2203 6.79004 19.2334 6.80433 19.2332 6.82022C19.2016 9.8616 19.093 12.1806 18.8241 14.6158C18.786 14.9606 19.0346 15.271 19.3794 15.309C19.7242 15.3471 20.0346 15.0985 20.0727 14.7537C20.3478 12.2633 20.4575 9.89981 20.4894 6.83328C20.4969 6.11627 19.9169 5.53379 19.2024 5.53379H4.70043Z" fill="#333333" stroke="#333333" stroke-width="0.2" />
                <path d="M20.1345 16.8066L17.1 19.8411M20.1345 16.8066L17.1 19.8411M20.1345 16.8066C20.3798 16.5613 20.7775 16.5613 21.0228 16.8066M20.1345 16.8066L21.0228 16.8066M17.1 19.8411L15.8048 18.546C15.5595 18.3007 15.1618 18.3007 14.9165 18.546C14.6712 18.7912 14.6712 19.189 14.9165 19.4343L14.9165 19.4343L16.3799 20.8976L16.38 20.8977C16.7776 21.2954 17.4223 21.2954 17.82 20.8977L17.7493 20.827L17.82 20.8977L21.0228 17.6949C21.2681 17.4496 21.2681 17.0519 21.0228 16.8066M17.1 19.8411L21.0228 16.8066M21.0228 16.8066C21.0228 16.8066 21.0228 16.8066 21.0228 16.8066L20.9521 16.8773L21.0228 16.8066Z" fill="#333333" stroke="#333333" stroke-width="0.2" />
                <path d="M12.4048 3.92281L12.4048 3.92281L12.4048 3.92281ZM12.4048 3.92281C13.2324 3.95263 13.762 3.97462 14.1819 4.0767C14.5571 4.1679 14.832 4.32151 15.1197 4.64664L15.1197 4.64664C15.4171 4.98282 15.5325 5.26077 15.5777 5.59669C15.6291 5.97895 15.5926 6.44074 15.5283 7.1854C15.4836 7.70299 15.4003 8.26021 15.2798 8.92702C15.2181 9.26839 15.4448 9.59514 15.7862 9.65683L15.7862 9.65684C16.1276 9.7185 16.4543 9.49179 16.516 9.15041L16.4176 9.13263M12.4048 3.92281L16.4176 9.13263M8.7716 4.62891L8.7716 4.62892C8.47529 4.96047 8.35722 5.24336 8.31073 5.59651M8.7716 4.62891L14.4787 2.85601C13.9203 2.72026 13.2625 2.69659 12.5052 2.66936L12.4973 2.66907L12.4972 2.66907L12.45 2.66737L12.45 2.66737C12.1307 2.65587 11.8142 2.65473 11.4951 2.66405L11.4951 2.66405L11.4479 2.66545L11.4478 2.66545L11.4396 2.66569C10.6687 2.68817 10.0012 2.70763 9.43566 2.83993L9.45844 2.9373L9.43566 2.83993C8.81192 2.98586 8.30293 3.26812 7.8349 3.79182L7.8349 3.79182C7.37451 4.30698 7.14548 4.82299 7.06522 5.43257L7.06522 5.43258C6.99301 5.98115 7.04469 6.60219 7.10324 7.30584L7.10398 7.31477L7.10399 7.31484L7.10793 7.36229C7.10793 7.3623 7.10793 7.36231 7.10793 7.36232C7.15407 7.91693 7.23879 8.49496 7.358 9.15101L7.45639 9.13313L7.358 9.15101C7.42002 9.49232 7.747 9.71874 8.08832 9.65672C8.42964 9.59469 8.65602 9.26771 8.594 8.9264C8.47904 8.29365 8.40146 7.75854 8.35987 7.25819L8.26021 7.26648L8.35987 7.25819C8.29541 6.48293 8.25812 5.99619 8.31073 5.59651M8.7716 4.62891C9.06028 4.30588 9.33854 4.15282 9.72184 4.06315C10.1499 3.96302 10.6905 3.94437 11.5319 3.91976L8.7716 4.62891ZM8.31073 5.59651L8.21159 5.58345L8.31073 5.59651ZM16.4176 9.13263L16.516 9.15041C16.6398 8.46549 16.7304 7.86579 16.7799 7.29351L16.784 7.24604L16.7847 7.23761C16.8429 6.56447 16.8948 5.96459 16.8227 5.42917L16.7236 5.4425L16.4176 9.13263Z" fill="#333333" stroke="#333333" stroke-width="0.2" />
              </svg>


              My Purchase
            </div>
            <div onClick={handleLogOut} className=" flex gap-3 py-2 px-3 text-[#C00000] items-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g mask="url(#mask0_2556_34497)">
                  <path d="M20.3711 12.75H8.57695V11.25H20.3711L18.5519 9.43075L19.6057 8.34615L23.2595 12L19.6057 15.6538L18.5519 14.5692L20.3711 12.75ZM15.2019 8.86535V5.3077C15.2019 5.21795 15.1731 5.14423 15.1154 5.08653C15.0577 5.02883 14.9839 4.99998 14.8942 4.99998H5.3077C5.21795 4.99998 5.14423 5.02883 5.08652 5.08653C5.02882 5.14423 4.99997 5.21795 4.99997 5.3077V18.6923C4.99997 18.782 5.02882 18.8557 5.08652 18.9134C5.14423 18.9711 5.21795 19 5.3077 19H14.8942C14.9839 19 15.0577 18.9711 15.1154 18.9134C15.1731 18.8557 15.2019 18.782 15.2019 18.6923V15.1346H16.7019V18.6923C16.7019 19.191 16.5253 19.6169 16.1721 19.9701C15.8189 20.3233 15.3929 20.5 14.8942 20.5H5.3077C4.80898 20.5 4.38302 20.3233 4.02982 19.9701C3.67661 19.6169 3.5 19.191 3.5 18.6923V5.3077C3.5 4.80898 3.67661 4.38302 4.02982 4.02982C4.38302 3.67661 4.80898 3.5 5.3077 3.5H14.8942C15.3929 3.5 15.8189 3.67661 16.1721 4.02982C16.5253 4.38302 16.7019 4.80898 16.7019 5.3077V8.86535H15.2019Z" fill="#C00000" />
                </g>
              </svg>
              Log Out
            </div>
          </div>
        )}
      </div>

    </>
  );
}

export default CandidateHeader;
