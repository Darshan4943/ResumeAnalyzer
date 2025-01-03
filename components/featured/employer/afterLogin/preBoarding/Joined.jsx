import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants, applicantsMobile } from "../../../../../utils/preboardArray";
import { headings } from "../../../../../utils/preboardArray";
import StartPreboarding from "./StartPreboarding";

const Joined = ({ toggleContentt, setPreview, }) => {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openSort, setOpenSort] = useState(false);
  const [startPreboarding, setStartPreboarding] = useState(false);
  const [checkedApplicants, setCheckedApplicants] = useState({});

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const labels = [
    "Name of Candidate",
    "Job Role",
    "Recruiter",
    "Preboarding Status",
    "Actions",
  ];
  const handleCheckboxChange = (index) => {
    setCheckedApplicants((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <>
      <div className="web w-full">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
            {headings.map((headingObj, index) => (
              <>
                <select className=" w-[19.87%] bg-whites" onChange={(e) => handleHeadingChange(e, headingObj.heading)}>
                  <option value=""> {headingObj.heading}</option>
                  {headingObj.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="w-[1px] bg-[#E0E0E0] h-[24px]"></div>
              </>
            ))}
            <button className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[36px] text-[#FFFFFF] text-[14px] font-[600]">Search</button>
          </div>
        </div>
        <div className="grid grid-rows-1 w-full ">
          <div className="flex justify-between items-center">
            {labels.map((req, index) => (
              <div
                key={index}
                className="flex p-4 text-[14px] font-medium font-Montserrat text-[#333] items-center bg-[#EFFAFF] w-full"
              >
                <p>{req}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-1 w-full">
          <div className="grid grid-cols-1 w-full">
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicants, index) => (
                <>
                  <div
                    className={`flex w-[100%] p-[16px] justify-between items-center ${checkedApplicants[index] ? "bg-[#D3F1FF]" : "bg-[#FFFFFF]"}`}>
                    <div className="grid grid-cols-5 w-full px-4 py-2">
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex justify-start text-[14px] font-[600] items-center gap-2 lg:gap-[16px]">
                          <input
                            className="w-[24px] h-[24px]"
                            type="checkbox"
                            checked={!!checkedApplicants[index]}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <img
                            className="w-[40px]  rounded-[50%]"
                            src="/images/employer/profile_icon.png"
                            alt=""
                          />
                          <p className="text-[14px] font-[600] text-[#333333]">
                            {applicants.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[14px] font-[600] text-[#333333] font-Montserrat">
                          {applicants.role}
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[14px] font-[600] text-[#333333] font-Montserrat">
                          {applicants.Recruiting}
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1 pl-5">
                        <div
                          className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedApplicants[index]
                            ? "bg-[#FFFFFF]"
                            : applicants.status === "Interview"
                              ? "bg-[#26A4FF1A]"
                              : applicants.status === "Hired"
                                ? "bg-[#56CDAD1A]"
                                : applicants.status === "Shortlisted"
                                  ? "bg-[#4640DE1A]"
                                  : applicants.status === "Rejected"
                                    ? "bg-[#FF65501A]"
                                    : applicants.status === "In Review"
                                      ? "bg-[#EB85331A]"
                                      : ""
                            } ${applicants.status === "Interview"
                              ? "text-[#26A4FF]"
                              : applicants.status === "Hired"
                                ? "text-[#56CDAD]"
                                : applicants.status === "Shortlisted"
                                  ? "text-[#4640DE]"
                                  : applicants.status === "Rejected"
                                    ? "text-[#FF6550]"
                                    : applicants.status === "In Review"
                                      ? "text-[#FFB836]"
                                      : "text-[#333333]"
                            }`}
                        >
                          {applicants.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1 ">
                        <div className="flex   items-center w-full  justify-between">
                          <button
                             onClick={() => setPreview(true)}
                            className="flex lg:py-[6px] lg:px-2 xxlg:px-4 px-1 py-1 justify-center items-center gap-[10px] rounded-[30px] border border-[#06A9EF] bg-[#06A9EF] text-[#FFFFFF] lg:text-[12px] xxlg:text-[14px] text-[10px] font-[600] font-Montserrat "
                          >
                            {applicants.Preview}
                          </button>
                          <img
                            className="w-[24px]"
                            src="/images/employer/three-dot.png"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>

      <div className="mobile relative overflow-y-scroll  w-full ">
        <div className="sticky top-0">
          <div className="flex relative bg-[#06A9EF] gap-[1px] p-4 ml:w-[20%] w-full">
            <div
              onClick={() => setOpenSort(true)}
              className=" w-full py-[12px] px-[16px] text-[#333] text-[14px] font-[600] flex gap-[8px] items-center bg-[#fff]"
            >
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
              <div>Sort</div>
            </div>
            {openSort && (
              <div
                style={{ boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.4)" }}
                className="absolute top-[48px] right-[5px] flex flex-col gap-[10px] rounded-[6px] bg-[#FFFFFF] p-[12px] z-[100]"
              >
                {headings.map((headingObj, index) => (
                  <select
                    key={index}
                    className=" bg-whites outline-none"
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
                ))}
                <button
                  onClick={() => setOpenSort(false)}
                  className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]"
                >
                  Search
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
            {applicantsMobile
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicantsMobile, index) => (
                <>
                  <div
                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl bg-[#fff]"
                    style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                  >
                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start">
                      <div className="flex justify-between items-center self-stretch">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-[40px] h-[40px]"
                            src="/images/profile/john_doe.png"
                            alt=""
                          />
                          <p className="text-[14px] text-[#333] font-[600]">
                            {applicantsMobile.name}
                          </p>
                        </div>
                        <div className="flex justify-end items-center gap-4">
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
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Job Role
                        </p>
                        <p className="text-[14px] text-[#333] font-Montserrat font-[600]">
                          {applicantsMobile.role}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Due Date
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {applicantsMobile.dueDate}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Doc Status
                        </p>
                        <div
                          className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicantsMobile.Department === "IT"
                            ? "text-[#0C8A0A]"
                            : "text-[#333]"
                            } `}
                        >
                          {applicantsMobile.Department}
                        </div>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Recruiter
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {applicantsMobile.Recruiting}
                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          {applicantsMobile.proboard}
                        </p>
                        <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                          <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                            In Review
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">
                        <div
                          className="flex w-[260px] px-6 py-3 justify-center items-center gap-[10px] bg-[#06A9EF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="12"
                            viewBox="0 0 18 12"
                            fill="none"
                          >
                            <path
                              d="M9 9.5C9.97222 9.5 10.7986 9.15972 11.4792 8.47917C12.1597 7.79861 12.5 6.97222 12.5 6C12.5 5.02778 12.1597 4.20139 11.4792 3.52083C10.7986 2.84028 9.97222 2.5 9 2.5C8.02778 2.5 7.20139 2.84028 6.52083 3.52083C5.84028 4.20139 5.5 5.02778 5.5 6C5.5 6.97222 5.84028 7.79861 6.52083 8.47917C7.20139 9.15972 8.02778 9.5 9 9.5ZM9 8C8.44444 8 7.97222 7.80556 7.58333 7.41667C7.19444 7.02778 7 6.55556 7 6C7 5.44444 7.19444 4.97222 7.58333 4.58333C7.97222 4.19444 8.44444 4 9 4C9.55556 4 10.0278 4.19444 10.4167 4.58333C10.8056 4.97222 11 5.44444 11 6C11 6.55556 10.8056 7.02778 10.4167 7.41667C10.0278 7.80556 9.55556 8 9 8ZM9 12C7.0195 12 5.21535 11.4549 3.58754 10.3646C1.95974 9.27431 0.763889 7.81944 0 6C0.763889 4.18056 1.95974 2.72569 3.58754 1.63542C5.21535 0.545139 7.0195 0 9 0C10.9805 0 12.7847 0.545139 14.4125 1.63542C16.0403 2.72569 17.2361 4.18056 18 6C17.2361 7.81944 16.0403 9.27431 14.4125 10.3646C12.7847 11.4549 10.9805 12 9 12ZM9 10.5C10.5556 10.5 11.9931 10.0972 13.3125 9.29167C14.6319 8.48611 15.6458 7.38889 16.3542 6C15.6458 4.61111 14.6319 3.51389 13.3125 2.70833C11.9931 1.90278 10.5556 1.5 9 1.5C7.44444 1.5 6.00694 1.90278 4.6875 2.70833C3.36806 3.51389 2.35417 4.61111 1.64583 6C2.35417 7.38889 3.36806 8.48611 4.6875 9.29167C6.00694 10.0972 7.44444 10.5 9 10.5Z"
                              fill="white"
                            />
                          </svg>

                          <p
                            onClick={() => setPreview(true)}
                            className="text-[14px] text-[#fff] font-[600] font-Montserrat"
                          >
                            {applicantsMobile.Preview}
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
      {
        startPreboarding && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed  z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins ">
              <StartPreboarding setStartPreboarding={setStartPreboarding} />
            </div>
          </>
        )
      }
    </>
  );
};

export default Joined;
