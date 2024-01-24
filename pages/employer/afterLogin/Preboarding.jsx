import Initial from "@/components/featured/employer/afterLogin/preBoarding/Initial";
import InitialMobile from "@/components/featured/employer/afterLogin/preBoarding/InitialMobile";
import React, { useState } from "react";
import { TablePagination } from "@mui/material";
import { useRouter } from "next/router";
import Documention from "@/components/featured/employer/afterLogin/preBoarding/Documention";
import DocumentMobile from "@/components/featured/employer/afterLogin/preBoarding/DocumnetMobile";
import VerificationMobile from "@/components/featured/employer/afterLogin/preBoarding/VerificationMobile";
import Verification from "@/components/featured/employer/afterLogin/preBoarding/Verification";
import Offer from "@/components/featured/employer/afterLogin/preBoarding/Offer";
import OfferMobile from "@/components/featured/employer/afterLogin/preBoarding/OfferMobile";
import Acceptance from "@/components/featured/employer/afterLogin/preBoarding/Acceptance";
import AcceptanceMobile from "@/components/featured/employer/afterLogin/preBoarding/AcceptanceMobile";
import HireMobile from "@/components/featured/employer/afterLogin/preBoarding/HireMobile";
import Hire from "@/components/featured/employer/afterLogin/preBoarding/Hire";

function Preboarding() {
  const btn = ["In Preboarding", "Joined", "Declined"];

  const router = useRouter();
  const query = router.query;

  const headings = [
    {
      heading: "Job Role",
      options: ["Assistant Manager", "Option 2", "Option 3"],
    },
    {
      heading: "Due Date",
      options: ["Mumbai", "Pune", "Banglore"],
    },
    {
      heading: "Recruiter",
      options: ["Pending", "Approved"],
    },
    {
      heading: "Preboarding status",
      options: ["Yes", "No"],
    },
  ];

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [toggle, setToggle] = useState(0);

  const preboarding = [
    {
      name: "Initial",
      num: "2",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Documentation",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Verification",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Release Offer",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Offer Acceptance",
      num: "10",
      line: <div className="h-[2px] bg-[#06A9EF] w-[20px]"></div>,
    },
    {
      name: "Hired",
      num: "10",
      line: "",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-start gap-6 w-full  ">
        <div
          className="flex p-4 gap-4 items-start w-[100%] rounded-2xl bg-[#fff]"
          style={{ boxShadow: "box-shadow: 0px -1px 0px 0px #D6DDEB inset" }}
        >
          <div className="flex items-start md:gap-10 gap-6">
            {btn.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-center md:gap-[7px]"
              >
                <p className="md:text-[16px] text-[12px] text-[#333] font-Montserrat font-semibold">
                  {item}
                </p>
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="109"
                  height="4"
                  viewBox="0 0 109 4"
                  fill="none"
                >
                  <path
                    d="M0 4C0 1.79086 1.79086 0 4 0H105C107.209 0 109 1.79086 109 4H0Z"
                    fill="#06A9EF"
                  />
                </svg> */}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex items-center w-[100%] gap-5">
          <div
            onClick={() => setToggle(0)}
            className="w-[196px] flex p-2 justify-between items-center rounded-lg bg-[#fff] whitespace-nowrap"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <p className="text-[14px] text-[#646464] font-Montserrat font-semibold">
              Initial
            </p>
            <div className="flex p-1 justify-center items-center rounded-md bg-[#E9EBFD] ">
              2
            </div>
          </div>
          <div
            onClick={() => setToggle(1)}
            className="w-[196px] flex p-2 justify-between items-center rounded-lg bg-[#fff] whitespace-nowrap"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            <p className="text-[14px] text-[#646464] font-Montserrat font-semibold">
              Documentation
            </p>
            <div className="flex p-1 justify-center items-center rounded-md bg-[#E9EBFD] ">
              2
            </div>
          </div>
          <div
            onClick={() => setToggle(2)}
            className="w-[196px] flex p-2 justify-between items-center rounded-lg bg-[#fff] whitespace-nowrap"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-[14px] text-[#646464] font-Montserrat font-semibold">
            Verification
            </p>
            <div className="flex p-1 justify-center items-center rounded-md bg-[#E9EBFD] ">
              2
            </div>
          </div>
          <div
            onClick={() => setToggle(3)}
            className="w-[196px] flex p-2 justify-between items-center rounded-lg bg-[#fff] whitespace-nowrap"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-[14px] text-[#646464] font-Montserrat font-semibold">
            Release Offer
            </p>
            <div className="flex p-1 justify-center items-center rounded-md bg-[#E9EBFD] ">
              2
            </div>
          </div>
          <div
            onClick={() => setToggle(4)}
            className="w-[196px] flex p-2 justify-between items-center rounded-lg bg-[#fff] whitespace-nowrap"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-[14px] text-[#646464] font-Montserrat font-semibold">
            Offer Acceptance
            </p>
            <div className="flex p-1 justify-center items-center rounded-md bg-[#E9EBFD] ">
              2
            </div>
          </div>
          <div
            onClick={() => setToggle(5)}
            className="w-[196px] flex p-2 justify-between items-center rounded-lg bg-[#fff] whitespace-nowrap"
            style={{
              boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              whiteSpace: "nowrap",
            }}
          >
            <p className="text-[14px] text-[#646464] font-Montserrat font-semibold">
            Hired
            </p>
            <div className="flex p-1 justify-center items-center rounded-md bg-[#E9EBFD] ">
              2
            </div>
          </div>
        </div> */}

        <div className="flex items-center flex-row p-2 overflow-x-scroll w-full">
          {preboarding.map((e, index) => (
            <>
              <div
                onClick={() => setToggle(index)}
                key={index}
                className={`flex p-[8px] min-w-[12rem]  justify-between   items-center rounded-[8px] ${
                  toggle === index ? "bg-[#06A9EF] " : "bg-[#fff] "
                }`}
                style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <p className={`text-[14px] text-[#333] leading-[160%]  ${
                  toggle === index ? "text-white" : " "
                }`}>
                  {e.name}
                </p>
                <div className=" flex ">
                  <p className="bg-[#E9EBFD]  p-1 rounded-[8px] w-[30px] flex justify-center items-center">
                    {e.num}
                  </p>
                </div>
              </div>
              <div>{e.line}</div>
            </>
          ))}
        </div>

        {/* INITIAL 1ST PAGE  */}

        {toggle === 0 && (
          <>
            <div className="web w-full">
              <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#646464] font-Montserrat font-medium  text-[14px] w-full ">
                {headings.map((headingObj, index) => (
                  <>
                    <select
                      className=" w-[17.68%] bg-white p-4 "
                      onChange={(e) =>
                        handleHeadingChange(e, headingObj.heading)
                      }
                    >
                      <option value=""> {headingObj.heading}</option>
                      {headingObj.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ))}
                <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                      stroke="#646464"
                      stroke-width="2.02783"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="w-[100%]"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-500]  flex gap-2 items-center bg-[#fff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_62876)">
                      <path
                        d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div>Filter</div>
                </div>
              </div>

              <Initial />
            </div>
            <div className="mobile relative overflow-y-scroll  w-full ">
              <div className="sticky top-0">
                <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
                  <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                        stroke="#646464"
                        stroke-width="2.02783"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      className="w-[100%] text-[#646464]"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7540_118191)">
                        <path
                          d="M3.33203 5H16.6654"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 10H15"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66797 15H13.3346"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7540_118191">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Filter</div>
                  </div>
                </div>
              </div>
              <InitialMobile />
            </div>
          </>
        )}

        {/* DOCUMENTATION PAGE  */}

        {toggle === 1 && (
          <>
            <div className="web w-full">
              <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#646464] font-Montserrat font-medium  text-[14px] w-full ">
                {headings.map((headingObj, index) => (
                  <>
                    <select
                      className=" w-[17.68%] bg-white p-4 "
                      onChange={(e) =>
                        handleHeadingChange(e, headingObj.heading)
                      }
                    >
                      <option value=""> {headingObj.heading}</option>
                      {headingObj.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ))}
                <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                      stroke="#646464"
                      stroke-width="2.02783"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="w-[100%]"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-500]  flex gap-2 items-center bg-[#fff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_62876)">
                      <path
                        d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div>Filter</div>
                </div>
              </div>

              <Documention />
            </div>

            <div className="mobile relative overflow-y-scroll  w-full ">
              <div className="sticky top-0">
                <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
                  <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                        stroke="#646464"
                        stroke-width="2.02783"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      className="w-[100%] text-[#646464]"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7540_118191)">
                        <path
                          d="M3.33203 5H16.6654"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 10H15"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66797 15H13.3346"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7540_118191">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Filter</div>
                  </div>
                </div>
              </div>
              <DocumentMobile />
            </div>
          </>
        )}

        {/* VERIFICATION PAGE  */}

        {toggle === 2 && (
          <>
            <div className="web w-full">
              <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#646464] font-Montserrat font-medium  text-[14px] w-full ">
                {headings.map((headingObj, index) => (
                  <>
                    <select
                      className=" w-[17.68%] bg-white p-4 "
                      onChange={(e) =>
                        handleHeadingChange(e, headingObj.heading)
                      }
                    >
                      <option value=""> {headingObj.heading}</option>
                      {headingObj.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ))}
                <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                      stroke="#646464"
                      stroke-width="2.02783"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="w-[100%]"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-500]  flex gap-2 items-center bg-[#fff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_62876)">
                      <path
                        d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div>Filter</div>
                </div>
              </div>

              <Verification />
            </div>

            <div className="mobile relative overflow-y-scroll  w-full ">
              <div className="sticky top-0">
                <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
                  <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                        stroke="#646464"
                        stroke-width="2.02783"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      className="w-[100%] text-[#646464]"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7540_118191)">
                        <path
                          d="M3.33203 5H16.6654"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 10H15"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66797 15H13.3346"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7540_118191">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Filter</div>
                  </div>
                </div>
              </div>
              <VerificationMobile />
            </div>
          </>
        )}

        {/* OFFER PAGE  */}
        {toggle === 3 && (
          <>
            <div className="web w-full">
              <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#646464] font-Montserrat font-medium  text-[14px] w-full ">
                {headings.map((headingObj, index) => (
                  <>
                    <select
                      className=" w-[17.68%] bg-white p-4 "
                      onChange={(e) =>
                        handleHeadingChange(e, headingObj.heading)
                      }
                    >
                      <option value=""> {headingObj.heading}</option>
                      {headingObj.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ))}
                <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                      stroke="#646464"
                      stroke-width="2.02783"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="w-[100%]"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-500]  flex gap-2 items-center bg-[#fff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_62876)">
                      <path
                        d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div>Filter</div>
                </div>
              </div>

              <Offer />
            </div>

            <div className="mobile relative overflow-y-scroll  w-full ">
              <div className="sticky top-0">
                <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
                  <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                        stroke="#646464"
                        stroke-width="2.02783"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      className="w-[100%] text-[#646464]"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7540_118191)">
                        <path
                          d="M3.33203 5H16.6654"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 10H15"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66797 15H13.3346"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7540_118191">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Filter</div>
                  </div>
                </div>
              </div>
              <OfferMobile />
            </div>
          </>
        )}

        {/* Offer Acceptance PAGE  */}

        {toggle === 4 && (
          <>
            <div className="web w-full">
              <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#646464] font-Montserrat font-medium  text-[14px] w-full ">
                {headings.map((headingObj, index) => (
                  <>
                    <select
                      className=" w-[17.68%] bg-white p-4 "
                      onChange={(e) =>
                        handleHeadingChange(e, headingObj.heading)
                      }
                    >
                      <option value=""> {headingObj.heading}</option>
                      {headingObj.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ))}
                <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                      stroke="#646464"
                      stroke-width="2.02783"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="w-[100%]"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-500]  flex gap-2 items-center bg-[#fff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_62876)">
                      <path
                        d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div>Filter</div>
                </div>
              </div>

              <Acceptance />
            </div>
            <div className="mobile relative overflow-y-scroll  w-full ">
              <div className="sticky top-0">
                <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
                  <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                        stroke="#646464"
                        stroke-width="2.02783"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      className="w-[100%] text-[#646464]"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7540_118191)">
                        <path
                          d="M3.33203 5H16.6654"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 10H15"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66797 15H13.3346"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7540_118191">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Filter</div>
                  </div>
                </div>
              </div>
              <AcceptanceMobile />
            </div>
          </>
        )}

        {/* HIRED */}

        {toggle === 5 && (
          <>
            <div className="web w-full">
              <div className="h-[84px] bg-[#06A9EF] flex flex-row p-[16px] justify-between  text-[#646464] font-Montserrat font-medium  text-[14px] w-full ">
                {headings.map((headingObj, index) => (
                  <>
                    <select
                      className=" w-[17.68%] bg-white p-4 "
                      onChange={(e) =>
                        handleHeadingChange(e, headingObj.heading)
                      }
                    >
                      <option value=""> {headingObj.heading}</option>
                      {headingObj.options.map((option, optIndex) => (
                        <option key={optIndex} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </>
                ))}
                <div className=" w-[19.87%] bg-white p-4 flex gap-[10px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                      stroke="#646464"
                      stroke-width="2.02783"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  <input
                    className="w-[100%]"
                    type="text"
                    placeholder="search"
                  />
                </div>
                <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-500]  flex gap-2 items-center bg-[#fff]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_62876)">
                      <path
                        d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div>Filter</div>
                </div>
              </div>

              <Hire />
            </div>
            <div className="mobile relative overflow-y-scroll  w-full ">
              <div className="sticky top-0">
                <div className="flex bg-[#06A9EF] gap-[1px] p-4 w-[100%]">
                  <div className=" bg-white p-4 flex gap-[10px] w-full items-center ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M15.5 15.5L19 19L15.5 15.5ZM5 11C5 11.7879 5.15519 12.5681 5.45672 13.2961C5.75825 14.0241 6.20021 14.6855 6.75736 15.2426C7.31451 15.7998 7.97595 16.2417 8.7039 16.5433C9.43185 16.8448 10.2121 17 11 17C11.7879 17 12.5681 16.8448 13.2961 16.5433C14.0241 16.2417 14.6855 15.7998 15.2426 15.2426C15.7998 14.6855 16.2417 14.0241 16.5433 13.2961C16.8448 12.5681 17 11.7879 17 11C17 9.4087 16.3679 7.88258 15.2426 6.75736C14.1174 5.63214 12.5913 5 11 5C9.4087 5 7.88258 5.63214 6.75736 6.75736C5.63214 7.88258 5 9.4087 5 11V11Z"
                        stroke="#646464"
                        stroke-width="2.02783"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <input
                      className="w-[100%] text-[#646464]"
                      type="text"
                      placeholder="search"
                    />
                  </div>
                  <div className=" py-[12px] px-[16px] text-[#333] text-[14px] font-[600]  flex gap-[8px] items-center bg-[#fff]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_7540_118191)">
                        <path
                          d="M3.33203 5H16.6654"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M5 10H15"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M6.66797 15H13.3346"
                          stroke="#333333"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_7540_118191">
                          <rect width="20" height="20" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <div>Filter</div>
                  </div>
                </div>
              </div>
              <HireMobile />
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Preboarding;
