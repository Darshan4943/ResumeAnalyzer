// import StackedBarChart from "@/components/common/StackedBarChart";
// import StackedBarChart from "@/components/common/Bars";
// import ChartComponent, { Bars } from "@/components/common/Bars";
// import StackedBarChart from "@/components/common/StackedBarChart";
import { TablePagination } from "@mui/material";
import { useState } from "react";


function AdminDashboard({ toggleContentt }) {

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const applicant_head = [
    {
      name: "Full Name",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "score",
      check: "",
    },
    {
      name: "Hiring stage",
      check: "",
    },
    {
      name: "Applied Date",
      check: "",
    },
    {
      name: "Action",
      check: "",
    },
  ];

  const applicants = [
    {
      img: (
        <img
          className="w-[40px]"
          src="./images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] h-[24px]"
          src="/images/employer/st.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",

      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="./images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="./images/employer/empty_star.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",

      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Shortlisted",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "5.0",

      status: "Hired",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "2.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "3.0",

      status: "Interview",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
  ];
  return (
    <div className=" ml:h-[80vh] w-[100%] customMargins overflow-y-auto">
      <div
        className="bg-frm  bg-cover bg-[#06A9EF] p-2  ml:py-6 flex  items-center "
        style={{
          borderRadius: "16px",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <div className="ml:px-4 flex lg:flex-row flex-col justify-between w-[100%] gap-1">
          <div className="flex flex-col items-start ml:gap-2 gap-[2px] ">
            <p className="text-white font-montserrat ml:text-[24px] text-[20px] font-semibold leading-[120%]">
              Good morning, Rajveer
            </p>

            <p className="text-white font-montserrat ml:text-[16px] text-[14px] font-medium leading-[160%] ">
              Here is your job listings statistic report from Nov 19 - Nov 25.
            </p>
          </div>
          <div className="flex justify-between items-center py-3 px-4 gap-4 rounded-lg bg-white">
            <p className="text-[#646464] font-montserrat text-[16px] font-medium leading-[160%]">
              Nov 19 - Nov 25
            </p>
            <img
              src="/images/employer/cal.png"
              alt=""
              className="h-[20px] w-[20px]"
            />
          </div>
        </div>
      </div>

      <div className="ml:pt-5 pt-4 lg:flex flex lg:flex-row flex-col flex-wrap items-start lg:justify-between gap-3">
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[31.28%] w-[100%] gap-[6px]  ml:gap-4"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[36px] ml:text-[48px] font-semibold leading-normal">
              77
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[18px] text-[16px] leading-4 font-medium font-montserrat ">
                New candidates to review
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-[3px]">
            <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md bg-[#FFD6D6]">
              <svg
                xlgns="http://www.w3.org/2000/svg"
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
              >
                <path
                  d="M1.3267 0.751982L0 2.09319L7.01254 9.23033L10.8031 5.39831L15.7308 10.332H13.267V12.248H18.9528V6.50001H17.0575V8.99083L10.8031 2.66799L7.01254 6.50001L1.3267 0.751982Z"
                  fill="#C00000"
                />
              </svg>
            </div>
            <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
              {" "}
              <span className="text-[14px] font-Montserrat font-normal text-[#C00000]">
                {" "}
                0.6%
              </span>{" "}
              from last Week
            </p>
          </div>
        </div>
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[31.28%] w-[100%] gap-[6px]  ml:gap-4"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[36px] ml:text-[48px] font-semibold leading-normal">
              03
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[18px] text-[16px] leading-4 font-medium font-montserrat ">
                Interview Schedule for
                today
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-[3px]">
            <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md "
              style={{ backgroundColor: "rgba(0, 175, 18, 0.30)" }}
            >
              <svg
                xlgns="http://www.w3.org/2000/svg"
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
              >
                <path
                  d="M1.6597 12.248L0.333008 10.9068L7.34554 3.76967L11.1361 7.60169L16.0638 2.66796H13.6V0.751953H19.2858V6.49999H17.3905V4.00917L11.1361 10.332L7.34554 6.49999L1.6597 12.248Z"
                  fill="#00AF12"
                />
              </svg>
            </div>
            <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
              {" "}
              <span className="text-[14px] font-Montserrat font-normal text-[#00AF12]">
                {" "}
                0.5%
              </span>{" "}
              from last Week
            </p>
          </div>
        </div>
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[31.28%] w-[100%] gap-[6px]  ml:gap-4"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[36px] ml:text-[48px] font-semibold leading-normal">
              04
            </p>
            <div className="w-[69%]">
              <p className="ml:text-[18px] text-[16px] leading-4 font-medium font-montserrat ">
                In Preboarding
                process
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-[3px]">
            <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md "
              style={{ backgroundColor: "rgba(0, 175, 18, 0.30)" }}

            >
              <svg
                xlgns="http://www.w3.org/2000/svg"
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
              >
                <path
                  d="M1.6597 12.248L0.333008 10.9068L7.34554 3.76967L11.1361 7.60169L16.0638 2.66796H13.6V0.751953H19.2858V6.49999H17.3905V4.00917L11.1361 10.332L7.34554 6.49999L1.6597 12.248Z"
                  fill="#00AF12"
                />
              </svg>
            </div>
            <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
              {" "}
              <span className="text-[14px] font-Montserrat font-normal text-[#00AF12]">
                {" "}
                1.6%
              </span>{" "}
              from last Week
            </p>
          </div>
        </div>

      </div>
      <div className="lg:flex lg:flex-row flex flex-col w-full pt-6 justify-between">
        <div
          className="lg:w-[66.17%] w-[100%] bg-[#fff] flex flex-col items-center gap-4 sm:p-4 p-2"
          style={{
            borderRadius: "16px",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            className="flex pb-4 flex-col gap-4 self-stretch"
            style={{
              borderBottom: " 1px solid var(--Text-Secondary, #646464)",
            }}
          >
            <div className="flex justify-between items-center self-stretch">
              <div className="flex flex-col items-start lg:gap-1 gap-[2px]">
                <p className="text-[#25324B] font-Montserrat text-[12px] lg:text-[20px] font-medium">
                  {" "}
                  Job statistics
                </p>
                <p className="text-[#7C8493] lg:text-[14px] text-[10px] font-medium">
                  Showing Job statistics Nov 19-25
                </p>
              </div>
              <div className="flex items-end lg:gap-[6px] gap-1">
                <div
                  className="flex lg:px-2 px-[6px] bg-[#fff] py-1 items-center"
                  style={{
                    borderRadius: "6px",
                    border: " 0.5px solid var(--Text-Secondary, #646464)",
                  }}
                >
                  <p className="text-[#333] items-center font-Montserrat lg:text-[12px] text-[10px] font-medium">
                    Daily
                  </p>
                </div>
                <div className="flex px-2 bg-[#06A9EF] justify-center py-1 items-center rounded-[6px]">
                  <p className="text-[#fff] items-center font-Montserrat lg:text-[12px] text-[10px] font-medium">
                    Weekly
                  </p>
                </div>
                <div
                  className="flex px-2 bg-[#fff] py-1 items-center"
                  style={{
                    borderRadius: "6px",
                    border: " 0.5px solid var(--Text-Secondary, #646464)",
                  }}
                >
                  <p className="text-[#333] items-center font-Montserrat lg:text-[12px] text-[10px] font-medium">
                    Monthly
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex w-full ml:flex-row-reverse flex-col flex gap-2 justify-between">
            <div className="flex ml:flex-col flex-row items-start gap-2 ml:gap-4 lg:w-[32.23%] w-[100%]">
              <div
                className="flex ml:p-4 p-2 flex-col items-start ml:gap-4 gap-1 bg-[#fff] self-stretch w-full"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "16px",
                }}
              >
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-[#333] font-Montserrat text-[12px] ml:text-[18px] font-semibold">
                    {" "}
                    Job Applied
                  </p>
                  <div className="flex p-[2px] ml:p-[6px] rounded-[32px] bg-[#FFDA1D]">
                    <svg
                      xlgns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.266 9.66634C16.5827 5.75801 13.416 3.33301 9.99932 3.33301C6.58266 3.33301 3.41599 5.75801 1.73266 9.66634C1.68677 9.77148 1.66309 9.88496 1.66309 9.99967C1.66309 10.1144 1.68677 10.2279 1.73266 10.333C3.41599 14.2413 6.58266 16.6663 9.99932 16.6663C13.416 16.6663 16.5827 14.2413 18.266 10.333C18.3119 10.2279 18.3356 10.1144 18.3356 9.99967C18.3356 9.88496 18.3119 9.77148 18.266 9.66634ZM9.99932 14.9997C7.34932 14.9997 4.85766 13.0913 3.41599 9.99967C4.85766 6.90801 7.34932 4.99967 9.99932 4.99967C12.6493 4.99967 15.141 6.90801 16.5827 9.99967C15.141 13.0913 12.6493 14.9997 9.99932 14.9997ZM9.99932 6.66634C9.34005 6.66634 8.69559 6.86184 8.14742 7.22811C7.59926 7.59438 7.17202 8.11498 6.91972 8.72406C6.66743 9.33315 6.60142 10.0034 6.73004 10.65C6.85866 11.2966 7.17613 11.8905 7.6423 12.3567C8.10848 12.8229 8.70242 13.1403 9.34902 13.269C9.99563 13.3976 10.6658 13.3316 11.2749 13.0793C11.884 12.827 12.4046 12.3997 12.7709 11.8516C13.1372 11.3034 13.3327 10.6589 13.3327 9.99967C13.3327 9.11562 12.9815 8.26777 12.3563 7.64265C11.7312 7.01753 10.8834 6.66634 9.99932 6.66634ZM9.99932 11.6663C9.66969 11.6663 9.34745 11.5686 9.07337 11.3855C8.79929 11.2023 8.58567 10.942 8.45952 10.6375C8.33338 10.3329 8.30037 9.99783 8.36468 9.67452C8.42899 9.35122 8.58772 9.05425 8.82081 8.82116C9.0539 8.58808 9.35087 8.42934 9.67417 8.36503C9.99747 8.30072 10.3326 8.33373 10.6371 8.45988C10.9417 8.58602 11.202 8.79964 11.3851 9.07372C11.5682 9.34781 11.666 9.67004 11.666 9.99967C11.666 10.4417 11.4904 10.8656 11.1778 11.1782C10.8653 11.4907 10.4414 11.6663 9.99932 11.6663Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px]">
                  <p className="text-[#333] flex items font-Montserrat font-semibold text-[20px] ml:text-[36px]">
                    2,324
                  </p>
                  <div className="flex gap-2 items-start">
                    <p className="text-[#646464] text-[12px] ml:text-[18px] font-Montserrat font-Medium">
                      This Week{" "}
                    </p>
                    <div className="flex items-center">
                      <p className="text-[#06A9EF] items-center ml:text-[18px]  text-[10px] font-medium">
                        6.4%
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <g clip-path="url(#clip0_6622_117270)">
                          <path d="M15.7344 13L10.7344 8L5.73438 13H15.7344Z" fill="#06A9EF" stroke="#06A9EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_6622_117270">
                            <rect width="20" height="20" fill="white" transform="translate(0.734375 0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex ml:p-4 p-2 flex-col items-start ml:gap-4 gap-1 bg-[#fff] self-stretch w-full"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "16px",
                }}
              >
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-[#333] font-Montserrat text-[12px] ml:text-[18px] font-semibold">
                    {" "}
                    Job Applied
                  </p>
                  <div className="flex p-[2px] ml:p-[6px] rounded-[32px] bg-[#3E6B7E]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g mask="url(#mask0_7540_117295)">
                        <path
                          d="M2.15385 10.2499C1.90128 10.2499 1.6875 10.1624 1.5125 9.98745C1.3375 9.81245 1.25 9.59867 1.25 9.3461V4.15383C1.25 3.90126 1.3375 3.68747 1.5125 3.51247C1.6875 3.33747 1.90128 3.24997 2.15385 3.24997H4.25V2.40384C4.25 2.15128 4.3375 1.9375 4.5125 1.7625C4.6875 1.5875 4.90128 1.5 5.15385 1.5H6.84613C7.09869 1.5 7.31248 1.5875 7.48748 1.7625C7.66248 1.9375 7.74998 2.15128 7.74998 2.40384V3.24997H9.84613C10.0987 3.24997 10.3125 3.33747 10.4875 3.51247C10.6625 3.68747 10.75 3.90126 10.75 4.15383V9.3461C10.75 9.59867 10.6625 9.81245 10.4875 9.98745C10.3125 10.1624 10.0987 10.2499 9.84613 10.2499H2.15385ZM2.15385 9.49996H9.84613C9.88459 9.49996 9.91986 9.48394 9.95191 9.45189C9.98396 9.41983 9.99999 9.38457 9.99999 9.3461V4.15383C9.99999 4.11536 9.98396 4.0801 9.95191 4.04804C9.91986 4.01599 9.88459 3.99996 9.84613 3.99996H2.15385C2.11538 3.99996 2.08012 4.01599 2.04806 4.04804C2.01601 4.0801 1.99999 4.11536 1.99999 4.15383V9.3461C1.99999 9.38457 2.01601 9.41983 2.04806 9.45189C2.08012 9.48394 2.11538 9.49996 2.15385 9.49996ZM4.99999 3.24997H6.99999V2.40384C6.99999 2.36537 6.98396 2.33011 6.95191 2.29806C6.91985 2.266 6.88459 2.24997 6.84613 2.24997H5.15385C5.11538 2.24997 5.08012 2.266 5.04806 2.29806C5.01601 2.33011 4.99999 2.36537 4.99999 2.40384V3.24997Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px]">
                  <p className="text-[#333] flex items font-Montserrat font-semibold text-[20px] ml:text-[36px]">
                    654
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-[#646464] text-[12px] ml:text-[18px] font-Montserrat font-Medium">
                      This Week{" "}
                    </p>
                    <div className="flex text-center">
                      <p className="text-[#C00000] items-center ml:text-[18px] text-[10px] font-medium leading-5">
                        0.5%
                      </p>
                      <svg
                        xlgns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_6622_117282)">
                          <path
                            d="M5.73438 8L10.7344 13L15.7344 8L5.73438 8Z"
                            fill="#C00000"
                            stroke="#C00000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6622_117282">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="matrix(-1 0 0 -1 20.7344 20.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%]  flex py-2 ">
              {/* <StackedBarChart /> */}
            </div>
          </div>
        </div>
        <div className=" pt-6 lg:pt-0 lg:w-[31.26%]  w-[100%] flex flex-col gap-4 lg:justify-between items-start  ">
          <div
            className="flex justify-between items-center px-6 py-[32px] lg:py-[50px]   w-full"
            style={{
              borderRadius: "16px",
              backgroundColor: "#fff",
              boxShadow:
                "0px 4px 0px 0px #FFB836 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex  items-center w-full">
              <div className="flex gap-2 items-center w-full ">
                <svg
                  xlgns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#FFB836" />
                </svg>
                <div className="flex justify-between items-center w-[100%]">
                  <p className="text-[#333] text-[20px] font-semibold">
                    Total Applications
                  </p>

                  <div className="flex p-1 gap-[10px] items-center rounded-[6px] bg-[#E9EBFD]">
                    <p className="text-[#333] text-[20px] font-semibold font-Montserrat">
                      654
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-between items-center px-6 py-[32px] lg:py-[50px]  w-full"
            style={{
              borderRadius: "16px",
              backgroundColor: "#fff",
              boxShadow:
                "0px 4px 0px 0px #56CDAD inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex  items-center w-full">
              <div className="flex gap-2 items-center w-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#56CDAD" />
                </svg>
                <div className="flex justify-between items-center w-[100%]">
                  <p className="text-[#333] text-[20px] font-semibold">Hired</p>

                  <div className="flex p-1 gap-[10px] items-center rounded-[6px] bg-[#E9EBFD]">
                    <p className="text-[#333] text-[20px] font-semibold font-Montserrat">
                      10
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="flex justify-between items-center px-6 py-[32px] lg:py-[50px]   w-full"
            style={{
              borderRadius: "16px",
              backgroundColor: "#fff",
              boxShadow:
                "0px 4px 0px 0px #FF6550 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div className="flex  items-center w-full">
              <div className="flex gap-2 items-center w-full ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                >
                  <circle cx="5" cy="5" r="5" fill="#FF6550" />
                </svg>
                <div className="flex justify-between items-center w-[100%]">
                  <p className="text-[#333] text-[20px] font-semibold">
                    Declined
                  </p>

                  <div className="flex p-1 gap-[10px] items-center rounded-[6px] bg-[#E9EBFD]">
                    <p className="text-[#333] text-[20px] font-semibold font-Montserrat">
                      148
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-6">
        <div
          className="flex py-4 px-4 flex-col bg-[#fff] items-center w-full"
          style={{
            boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <div className="flex lg:flex-row flex-col  w-[100%] ml:py-[24px] ml:px-[16px] gap-4 lg:justify-between items-start lg:items-center bg-[#fff]">
            <p className="font-[600] text-[16px]">Recent Applications</p>

            <div className="flex gap-2 items-start justify-between sm:w-[430px]   ">
              <div
                className="flex py-3 px-4 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/employer/icon_search.png"
                  className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />
                <input type="text" placeholder="Search" className="w-full" />
              </div>
              <div
                className="flex py-3 px-4 gap-2 justify-center items-center bg-white sm:w-[108px] w-[98px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/profile/fil.png"
                  className=" sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />

                <p className="font-Montserrat text-[14px] sm:text-base font-semibold leading-6 text-[#333]">
                  Filter
                </p>
              </div>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>

      <div className="web">
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div
            className="flex p-4 gap-[2vw] self-stretch bg-[#fff] w-[100%]"
            style={{
              borderTop: "1px solid var(--Neutrals-20, #D6DDEB)",
              borderBottom: "1px solid var(--Neutrals-20, #D6DDEB)",
            }}
          >
            {applicant_head.map((applicant_head,index) => (
              <div key={index} className="w-[20%] flex items-center gap-6 justify-evenly ">
                <div>{applicant_head.check}</div>

                <div className="flex  justify-between items-center gap-[8px]">
                  <p className="text-[16px] font-[600]">
                    {applicant_head.name}
                  </p>
                  <svg
                    xlgns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_6622_117335)">
                      <path
                        d="M12 15.3746L6 9.37461L7.4 7.97461L12 12.5746L16.6 7.97461L18 9.37461L12 15.3746Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  overflow-y-auto w-[100%]">
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicants, index) => (
                <>
                  <div
                    className="flex w-[100%] p-[16px] justify-between items-center"
                    style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
                  >
                    <div className="  gap-[2vw] w-[100%] justify-between flex items-center">
                      <div className="flex justify-center text-[14px] font-[600] items-center gap-[16px] w-[15%]">
                        <input className="w-[24px] h-[24px]" type="checkbox" />
                        <img
                          className="w-[40px] h-[40px]"
                          src="/images/profile/john_doe.png"
                          alt=""
                        />
                        <p className="text-[16px] font-[600]">
                          {applicants.name}
                        </p>
                      </div>
                      <div className="flex w-[10%] items-center gap-[8px]">
                        {applicants.img_star1}
                        {applicants.img_star2}

                        <p className="text-[14px] font-[600]">
                          {applicants.score}
                        </p>
                      </div>
                      <div
                        className={`flex py-[6px] px-[10px] text-[14px] font-semibold justify-center items-center gap-[8px] rounded-[80px] border ${applicants.status === "Interview"
                          ? "text-[#26A4FF] border-[#26A4FF]"
                          : applicants.status === "Hired"
                            ? "text-[#56CDAD] border-[#56CDAD]"
                            : applicants.status === "Shortlisted"
                              ? "text-[#4640DE] border-[#4640DE]"
                              : applicants.status === "Rejected"
                                ? "text-[#FF6550] border-[#FF6550]"
                                : applicants.status === "In Review"
                                  ? "text-[#FFB836] border-[#FFB836]"
                                  : ""
                          }`}
                      >
                        {applicants.status}
                      </div>

                      <p className="text-[14px] font-[600]">
                        {applicants.date}
                      </p>
                      <div className="flex justify-center items-center gap-[16px]">
                        <button
                          onClick={toggleContentt}
                          className="flex py-[12px] px-[24px] justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#E7F8FF] "
                        >
                          See Application
                        </button>
                        <svg
                          xlgns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_6622_117371)">
                            <path
                              d="M5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                              stroke="#333333"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                              stroke="#333333"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12C18 12.5523 18.4477 13 19 13Z"
                              stroke="#333333"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_6622_117371">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>

      <div className="mobile">
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicants, index) => (
                <>
                  <div
                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl"
                    style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff", border: '1px solid #DEDEDE' }}
                  >
                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start"
                    >
                      <div className="flex justify-between items-center self-stretch">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-[40px] h-[40px]"
                            src="/images/profile/john_doe.png"
                            alt=""
                          />
                          <p className="text-[14px] text-[#333] font-[600]">
                            {applicants.name}
                          </p>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-[24px] h-[24px]"
                              src="/images/employer/st.png"
                              alt=""
                            />
                            <p className="text-[14px] font-semibold text-[#333]">
                              0.0
                            </p>
                            {applicants.img_star2}
                          </div>
                          <svg
                            xlgns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_7540_117410)">
                              <path
                                d="M11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_7540_117410">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="matrix(0 1 -1 0 24 0)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#333] font-[600]">
                          20 Nov, 2023{" "}
                        </p>
                        <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                          <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                            In Review
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">
                        <div
                          className="flex px-6 py-3 justify-center items-center gap-[10px] bg-[#E7F8FF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                        >
                          <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                            See Application
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        className="h-[64px] rounded-b-[12px] py-[12px] px-[16px]  border-t bg-white w-[100%]"
        count={applicants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default AdminDashboard;
