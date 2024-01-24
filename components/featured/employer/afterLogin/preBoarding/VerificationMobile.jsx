import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicantsMobile  } from "@/utils/preboardArray";

const  VerificationMobile = ({ toggleContentt, setToggle }) => {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className="flex flex-col items-start gap-4 self-stretch w-full">
        <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
          {applicantsMobile 
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((applicantsMobile , index) => (
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
                          {applicantsMobile .name}
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
                        {applicantsMobile .role}
                      </p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-[14px] text-[#646464] font-[500]">
                      Due Date
                      </p>
                      <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                        {applicantsMobile .dueDate}
                      </p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-[14px] text-[#646464] font-[500]">
                      Doc Status
                      </p>
                      <div
                      className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${
                        applicantsMobile.verifyStatus === "Verified"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                      } `}
                    >
                      {applicantsMobile.verifyStatus}
                    </div>

                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-[14px] text-[#646464] font-[500]">
                      Recruiter
                      </p>
                      <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                      {applicantsMobile .Recruiting}
                        
                      </p>
                    </div>

                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-[14px] text-[#646464] font-[500]">
                        {applicantsMobile .proboard}
                      </p>
                      <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                        <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                          In Review
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center w-[100%]">
                      <div
                        className="flex w-full px-6 py-3 justify-center items-center gap-[10px] bg-[#06A9EF]"
                        style={{
                          borderRadius: "8px",
                          border: " 1px solid var(--primary, #06A9EF)",
                        }}
                      >
                        <p className="text-[14px] text-[#fff] font-[600] font-Montserrat">
                          {applicantsMobile .Next}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

        
        </div>
      </div>
    </>
  );
};

export default VerificationMobile;
