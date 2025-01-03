import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

import EmployerMobileHeader from "./EmployerMobileHeader";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { camelCase } from "../../../utils/middleware";

function EmployerHeader() {
  const router = useRouter();

  const [selectedPage, setSelectedPage] = useState("");
  const [isLogout, setIsLogout] = useState(false);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  const [login, setlogin] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isSidebar, setIsSidebar] = useState(false);

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setOpenTaskModel(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setIsLogout(!isLogout);
  };

  const handleLogOut = () => {
    setlogin(false);
    setIsLogin(false);

    toggleDropdown();
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/";
  };



  return (
    <>
      <div
        className=" flex ms:p-2 p-2 z-[2000] fixed top-0 w-[100%] bg-white gap-1 justify-between items-center h-[70px]"
      // style={{ boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className=" flex ms:gap-6 gap-2 items-center ms:justify-start justify-between ms:w-[60%] w-[90%]">
          <div className="flex gap-1 items-center">
            <div className="mobile" onClick={() => setIsSidebar(true)}>
              <img
                src="/images/home/menu.png"
                alt=""
                className="min-w-[30px] h-[30px] object-contain"
              />
            </div>
            <div onClick={() => router.push("/employer/EmployerHome")} className="flex  items-center  ">
              <img
                className="min-w-[104px] h-[36.317px] object-contain"
                src="/images/logo_skilotech.png"
                alt=""
              />
            </div>
          </div>
          <div className=" flex items-center border-[0.5px] border-[#646464]  justify-between w-[25%] ms:min-w-[200px] scr420:min-w-[140px] min-w-[120px] rounded-[30px] px-3 py-1">
            <input
              type="text"
              className="text-black font-small ms:text-[14px] text-[12px] w-[70%]"
              placeholder="Search"
              style={{ border: "none" }}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_7896_55668)">
                <path
                  d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.14583 15.3708 4.8875 14.1125C3.62917 12.8542 3 11.3167 3 9.5C3 7.68333 3.62917 6.14583 4.8875 4.8875C6.14583 3.62917 7.68333 3 9.5 3C11.3167 3 12.8542 3.62917 14.1125 4.8875C15.3708 6.14583 16 7.68333 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8125 13.5625 12.6875 12.6875C13.5625 11.8125 14 10.75 14 9.5C14 8.25 13.5625 7.1875 12.6875 6.3125C11.8125 5.4375 10.75 5 9.5 5C8.25 5 7.1875 5.4375 6.3125 6.3125C5.4375 7.1875 5 8.25 5 9.5C5 10.75 5.4375 11.8125 6.3125 12.6875C7.1875 13.5625 8.25 14 9.5 14Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex ms:px-4  px-2 py-4 justify-end gap-4 ms:w-[40%] w-[10%] ">
          <div className="flex items-center gap-5">
            <svg
              onClick={() => router.push("/employer/EmployerNotification")}
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="26"
              viewBox="0 0 20 26"
              fill="none"
            >
              <path
                d="M0 21.4569V19.0406H2.41625V10.5837C2.41625 8.9125 2.91964 7.42731 3.92641 6.12817C4.93318 4.82984 6.24198 3.97932 7.85281 3.57661V2.73092C7.85281 2.22753 8.0292 1.79986 8.38197 1.44789C8.73394 1.09512 9.16161 0.918732 9.665 0.918732C10.1684 0.918732 10.5961 1.09512 10.948 1.44789C11.3008 1.79986 11.4772 2.22753 11.4772 2.73092V3.57661C13.088 3.97932 14.3968 4.82984 15.4036 6.12817C16.4104 7.42731 16.9137 8.9125 16.9137 10.5837V19.0406H19.33V21.4569H0ZM9.665 25.0812C9.00053 25.0812 8.43191 24.8449 7.95913 24.3721C7.48554 23.8985 7.24875 23.3295 7.24875 22.665H12.0813C12.0813 23.3295 11.8449 23.8985 11.3721 24.3721C10.8985 24.8449 10.3295 25.0812 9.665 25.0812Z"
                fill="#333333"
              />
            </svg>

            <div className="flex items-center gap-2">
              <div className=" h-[36px] w-[36px]">
                {profileData?.profilePicture?.img ? (
                  <img
                    className=" rounded-full object-cover h-[36px] w-[36px]"
                    src={
                      profileData?.profilePicture?.img ||
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

              <div onClick={() => setIsLogout(!isLogout)} className=" flex items-center cursor-pointer text-[14px] font-semibold">
                {profileData?.basics?.firstName && (
                  <div className=" text-[14px] font-semibold xxlg:block hidden">
                    {camelCase(profileData?.basics?.firstName)}{" "}
                    {camelCase(profileData?.basics?.lastName)}
                  </div>
                )}

                <div className="user_name flex items-center relative">
                  <div
                    className="group"
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
                  ref={taskRef}
                  style={{
                    boxShadow: "0px 2px 2px 0px #00000040",
                  }}
                  className="w-[160px] flex flex-col text-[14px] font-medium  justify-center cursor-pointer absolute top-[26px] mt-[2.80rem] right-4 z-[5000] bg-[#FFFF]  rounded-b-[8px]   "
                >
                  <div
                    onClick={() => router.push("/recruiter/profile")}
                    className="flex gap-3 py-2 px-3 items-center"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_641_21690)">
                        <path
                          d="M12 11.6923C11.0375 11.6923 10.2135 11.3496 9.52813 10.6642C8.84271 9.97879 8.5 9.15484 8.5 8.19236C8.5 7.22986 8.84271 6.40591 9.52813 5.72051C10.2135 5.03509 11.0375 4.69238 12 4.69238C12.9625 4.69238 13.7864 5.03509 14.4718 5.72051C15.1572 6.40591 15.5 7.22986 15.5 8.19236C15.5 9.15484 15.1572 9.97879 14.4718 10.6642C13.7864 11.3496 12.9625 11.6923 12 11.6923ZM4.5 19.3077V17.0846C4.5 16.5949 4.63302 16.1414 4.89905 15.7241C5.16507 15.3068 5.52051 14.986 5.96537 14.7616C6.95384 14.277 7.95096 13.9135 8.95672 13.6712C9.96249 13.4289 10.9769 13.3078 12 13.3078C13.023 13.3078 14.0375 13.4289 15.0432 13.6712C16.049 13.9135 17.0461 14.277 18.0346 14.7616C18.4794 14.986 18.8349 15.3068 19.1009 15.7241C19.3669 16.1414 19.5 16.5949 19.5 17.0846V19.3077H4.5ZM5.99997 17.8077H18V17.0846C18 16.8821 17.9413 16.6946 17.824 16.5221C17.7067 16.3497 17.5474 16.209 17.3461 16.1C16.4846 15.6757 15.6061 15.3542 14.7107 15.1356C13.8152 14.917 12.9117 14.8077 12 14.8077C11.0883 14.8077 10.1847 14.917 9.28927 15.1356C8.39384 15.3542 7.51536 15.6757 6.65382 16.1C6.45254 16.209 6.29325 16.3497 6.17595 16.5221C6.05863 16.6946 5.99997 16.8821 5.99997 17.0846V17.8077ZM12 10.1924C12.55 10.1924 13.0208 9.99653 13.4125 9.60486C13.8041 9.21319 14 8.74236 14 8.19236C14 7.64236 13.8041 7.17153 13.4125 6.77986C13.0208 6.38819 12.55 6.19236 12 6.19236C11.45 6.19236 10.9791 6.38819 10.5875 6.77986C10.1958 7.17153 9.99997 7.64236 9.99997 8.19236C9.99997 8.74236 10.1958 9.21319 10.5875 9.60486C10.9791 9.99653 11.45 10.1924 12 10.1924Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                    My Profile
                  </div>
                  <div
                    onClick={() => router.push("/purchase/MyPurchase")}
                    className="flex gap-3 py-2 px-3 items-center"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.70043 5.53379C3.97492 5.53379 3.39291 6.13379 3.41372 6.85826L3.41372 6.85826C3.54981 11.5967 3.8106 14.6428 4.47355 19.1433C4.6616 20.4201 5.76089 21.3575 7.04538 21.3575H13.6689C14.0158 21.3575 14.297 21.0762 14.297 20.7293C14.297 20.3824 14.0158 20.1012 13.6689 20.1012H7.04538C6.37797 20.1012 5.81277 19.6146 5.71639 18.9602C5.06099 14.5109 4.80421 11.5141 4.66947 6.82222L4.66947 6.82221C4.66896 6.8047 4.6835 6.79004 4.70043 6.79004H19.2024C19.2203 6.79004 19.2334 6.80433 19.2332 6.82022C19.2016 9.8616 19.093 12.1806 18.8241 14.6158C18.786 14.9606 19.0346 15.271 19.3794 15.309C19.7242 15.3471 20.0346 15.0985 20.0727 14.7537C20.3478 12.2633 20.4575 9.89981 20.4894 6.83328C20.4969 6.11627 19.9169 5.53379 19.2024 5.53379H4.70043Z"
                        fill="#333333"
                        stroke="#333333"
                        stroke-width="0.2"
                      />
                      <path
                        d="M20.1345 16.8066L17.1 19.8411M20.1345 16.8066L17.1 19.8411M20.1345 16.8066C20.3798 16.5613 20.7775 16.5613 21.0228 16.8066M20.1345 16.8066L21.0228 16.8066M17.1 19.8411L15.8048 18.546C15.5595 18.3007 15.1618 18.3007 14.9165 18.546C14.6712 18.7912 14.6712 19.189 14.9165 19.4343L14.9165 19.4343L16.3799 20.8976L16.38 20.8977C16.7776 21.2954 17.4223 21.2954 17.82 20.8977L17.7493 20.827L17.82 20.8977L21.0228 17.6949C21.2681 17.4496 21.2681 17.0519 21.0228 16.8066M17.1 19.8411L21.0228 16.8066M21.0228 16.8066C21.0228 16.8066 21.0228 16.8066 21.0228 16.8066L20.9521 16.8773L21.0228 16.8066Z"
                        fill="#333333"
                        stroke="#333333"
                        stroke-width="0.2"
                      />
                      <path
                        d="M12.4048 3.92281L12.4048 3.92281L12.4048 3.92281ZM12.4048 3.92281C13.2324 3.95263 13.762 3.97462 14.1819 4.0767C14.5571 4.1679 14.832 4.32151 15.1197 4.64664L15.1197 4.64664C15.4171 4.98282 15.5325 5.26077 15.5777 5.59669C15.6291 5.97895 15.5926 6.44074 15.5283 7.1854C15.4836 7.70299 15.4003 8.26021 15.2798 8.92702C15.2181 9.26839 15.4448 9.59514 15.7862 9.65683L15.7862 9.65684C16.1276 9.7185 16.4543 9.49179 16.516 9.15041L16.4176 9.13263M12.4048 3.92281L16.4176 9.13263M8.7716 4.62891L8.7716 4.62892C8.47529 4.96047 8.35722 5.24336 8.31073 5.59651M8.7716 4.62891L14.4787 2.85601C13.9203 2.72026 13.2625 2.69659 12.5052 2.66936L12.4973 2.66907L12.4972 2.66907L12.45 2.66737L12.45 2.66737C12.1307 2.65587 11.8142 2.65473 11.4951 2.66405L11.4951 2.66405L11.4479 2.66545L11.4478 2.66545L11.4396 2.66569C10.6687 2.68817 10.0012 2.70763 9.43566 2.83993L9.45844 2.9373L9.43566 2.83993C8.81192 2.98586 8.30293 3.26812 7.8349 3.79182L7.8349 3.79182C7.37451 4.30698 7.14548 4.82299 7.06522 5.43257L7.06522 5.43258C6.99301 5.98115 7.04469 6.60219 7.10324 7.30584L7.10398 7.31477L7.10399 7.31484L7.10793 7.36229C7.10793 7.3623 7.10793 7.36231 7.10793 7.36232C7.15407 7.91693 7.23879 8.49496 7.358 9.15101L7.45639 9.13313L7.358 9.15101C7.42002 9.49232 7.747 9.71874 8.08832 9.65672C8.42964 9.59469 8.65602 9.26771 8.594 8.9264C8.47904 8.29365 8.40146 7.75854 8.35987 7.25819L8.26021 7.26648L8.35987 7.25819C8.29541 6.48293 8.25812 5.99619 8.31073 5.59651M8.7716 4.62891C9.06028 4.30588 9.33854 4.15282 9.72184 4.06315C10.1499 3.96302 10.6905 3.94437 11.5319 3.91976L8.7716 4.62891ZM8.31073 5.59651L8.21159 5.58345L8.31073 5.59651ZM16.4176 9.13263L16.516 9.15041C16.6398 8.46549 16.7304 7.86579 16.7799 7.29351L16.784 7.24604L16.7847 7.23761C16.8429 6.56447 16.8948 5.96459 16.8227 5.42917L16.7236 5.4425L16.4176 9.13263Z"
                        fill="#333333"
                        stroke="#333333"
                        stroke-width="0.2"
                      />
                    </svg>
                    My Purchase
                  </div>
                  {userDataGlobal?.role == "user" &&
                    <div
                      onClick={() => router.push("/myWebsite")}
                      className=" flex gap-3 py-2 px-3  items-center"
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 6.6C7 6.26863 7.26863 6 7.6 6H8.4C8.73137 6 9 6.26863 9 6.6C9 6.93137 8.73137 7.2 8.4 7.2H7.6C7.26863 7.2 7 6.93137 7 6.6Z" fill="#333333" />
                        <path d="M4 6.6C4 6.26863 4.26863 6 4.6 6H5.4C5.73137 6 6 6.26863 6 6.6C6 6.93137 5.73137 7.2 5.4 7.2H4.6C4.26863 7.2 4 6.93137 4 6.6Z" fill="#333333" />
                        <path d="M16 6.6C16 6.26863 16.2686 6 16.6 6C16.9314 6 17.2 6.26863 17.2 6.6C17.2 6.93137 16.9314 7.2 16.6 7.2C16.2686 7.2 16 6.93137 16 6.6Z" fill="#333333" />
                        <path d="M17.7002 6.6C17.7002 6.26863 17.9688 6 18.3002 6C18.6316 6 18.9002 6.26863 18.9002 6.6C18.9002 6.93137 18.6316 7.2 18.3002 7.2C17.9688 7.2 17.7002 6.93137 17.7002 6.6Z" fill="#333333" />
                        <path d="M19.3999 6.6C19.3999 6.26863 19.6685 6 19.9999 6C20.3313 6 20.5999 6.26863 20.5999 6.6C20.5999 6.93137 20.3313 7.2 19.9999 7.2C19.6685 7.2 19.3999 6.93137 19.3999 6.6Z" fill="#333333" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M3.0998 5.49999H20.8998C21.2312 5.49999 21.4998 5.76862 21.4998 6.09999V8H2.5L2.4998 6.09999C2.4998 5.76862 2.76843 5.49999 3.0998 5.49999ZM2.49998 9L2.4998 17.9C2.4998 18.2314 2.76843 18.5 3.0998 18.5H20.8998C21.2312 18.5 21.4998 18.2314 21.4998 17.9V9H2.49998ZM1.2998 6.09999C1.2998 5.10588 2.10569 4.29999 3.0998 4.29999H20.8998C21.8939 4.29999 22.6998 5.10588 22.6998 6.09999V17.9C22.6998 18.8941 21.8939 19.7 20.8998 19.7H3.0998C2.10569 19.7 1.2998 18.8941 1.2998 17.9V6.09999Z" fill="#333333" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.07419 18.689C9.0742 18.6889 9.07422 18.6887 9.07423 18.6886C9.15106 17.9667 9.49204 17.2987 10.0316 16.8131C10.5713 16.3273 11.2715 16.0582 11.9976 16.0577C12.7237 16.0571 13.4244 16.325 13.9649 16.8098C14.5051 17.2944 14.8471 17.9616 14.9253 18.683C14.9253 18.6834 14.9254 18.6838 14.9254 18.6842L15.977 18.5707C15.9329 18.1626 15.8268 17.7674 15.665 17.3974C15.4376 16.8775 15.1004 16.4077 14.6712 16.0226C13.9364 15.3634 12.9839 14.9992 11.9968 15C11.0097 15.0008 10.0577 15.3666 9.32405 16.027C8.89542 16.4128 8.55897 16.8832 8.3325 17.4034C8.17132 17.7737 8.06584 18.1691 8.02246 18.5772L9.07419 18.689Z" fill="#333333" />
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13.5C12.856 13.5 13.55 12.8061 13.55 11.95C13.55 11.094 12.856 10.4 12 10.4C11.144 10.4 10.45 11.094 10.45 11.95C10.45 12.8061 11.144 13.5 12 13.5ZM12 14.7C13.5188 14.7 14.75 13.4688 14.75 11.95C14.75 10.4312 13.5188 9.20001 12 9.20001C10.4812 9.20001 9.25 10.4312 9.25 11.95C9.25 13.4688 10.4812 14.7 12 14.7Z" fill="#333333" />
                      </svg>



                      My Website
                    </div>
                  }
                  <div
                    onClick={handleLogOut}
                    className=" flex gap-3 py-2 px-3 text-[#C00000] items-center"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_2556_34497)">
                        <path
                          d="M20.3711 12.75H8.57695V11.25H20.3711L18.5519 9.43075L19.6057 8.34615L23.2595 12L19.6057 15.6538L18.5519 14.5692L20.3711 12.75ZM15.2019 8.86535V5.3077C15.2019 5.21795 15.1731 5.14423 15.1154 5.08653C15.0577 5.02883 14.9839 4.99998 14.8942 4.99998H5.3077C5.21795 4.99998 5.14423 5.02883 5.08652 5.08653C5.02882 5.14423 4.99997 5.21795 4.99997 5.3077V18.6923C4.99997 18.782 5.02882 18.8557 5.08652 18.9134C5.14423 18.9711 5.21795 19 5.3077 19H14.8942C14.9839 19 15.0577 18.9711 15.1154 18.9134C15.1731 18.8557 15.2019 18.782 15.2019 18.6923V15.1346H16.7019V18.6923C16.7019 19.191 16.5253 19.6169 16.1721 19.9701C15.8189 20.3233 15.3929 20.5 14.8942 20.5H5.3077C4.80898 20.5 4.38302 20.3233 4.02982 19.9701C3.67661 19.6169 3.5 19.191 3.5 18.6923V5.3077C3.5 4.80898 3.67661 4.38302 4.02982 4.02982C4.38302 3.67661 4.80898 3.5 5.3077 3.5H14.8942C15.3929 3.5 15.8189 3.67661 16.1721 4.02982C16.5253 4.38302 16.7019 4.80898 16.7019 5.3077V8.86535H15.2019Z"
                          fill="#C00000"
                        />
                      </g>
                    </svg>
                    Log Out
                  </div>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <AnimatePresence>
        {isSidebar && (
          <>
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.5 }}
              ref={taskRef}
              className="absolute z-[2000] w-full mt-[-4rem]  "
              onWheel={(e) => e.stopPropagation()}
              style={{
                background: "rgba(255, 255, 255, 0.5)",
                boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
                backdropFilter: "blur(10px)",
                ...(navigator.userAgent.includes("Safari") &&
                  !navigator.userAgent.includes("Chrome") && {
                  WebkitBackdropFilter: "blur(10px)",
                }),
              }}
            >
              <EmployerMobileHeader
                selectedPage={selectedPage}
                setIsSidebar={setIsSidebar}
                setIsLogin={setIsLogin}
                isLogin={isLogin}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default EmployerHeader;
