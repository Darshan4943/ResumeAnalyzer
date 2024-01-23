import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";

const InitialMobile = ({ toggleContentt, setToggle }) => {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const applicants = [
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      Recruiting: "Recruiting Manager",
      score: "0.0",
      role: "Assistant Manager",
      status: "In Review",
      action: " Start Preboarding",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",
      action: " Start Preboarding",
      role: "Recruiting Manager",
      status: "In Review",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",

      score: "4.0",
      role: "Assistant Manager",
      status: "Shortlisted",

      action: " Start Preboarding",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",

      action: " Start Preboarding",
      role: "Assistant Manager",
      status: "Hired",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",
      action: " Start Preboarding",
      role: "Assistant Manager",
      status: "Rejected",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",

      action: " Start Preboarding",
      role: "Assistant Manager",
      status: "Rejected",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",

      action: " Start Preboarding",

      role: "Assistant Manager",
      status: "Interview",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",
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
      Recruiting: "Recruiting Manager",

      role: "Assistant Manager",
      status: "Rejected",
      proboard: "Preboarding Status",
      Jobrole: "Job Role",
      Recruiter: "Recruiter",

      action: " Start Preboarding",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-start gap-4 self-stretch w-full">
        <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
          {applicants
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((applicants, index) => (
              <>
                <div
                  className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl bg-[#fff]"
                  // style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
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
                          {applicants.name}
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
                        {applicants.Jobrole}
                      </p>
                      <p className="text-[14px] text-[#333] font-Montserrat font-[600]">
                        {applicants.role}
                      </p>
                    </div>
                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-[14px] text-[#646464] font-[500]">
                        {applicants.Recruiter}
                      </p>
                      <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                        {applicants.role}
                      </p>
                    </div>

                    <div className="flex justify-between items-center self-stretch">
                      <p className="text-[14px] text-[#646464] font-[500]">
                        {applicants.proboard}
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
                          {applicants.action}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}

          {/* <div className="flex justify-between items-center self-stretch">
              <div className="flex items-center gap-2">
                <p className="text-[#646464] text-[10px] font-semibold">View</p>
                <div
                  className="flex p-2 justify-center items-center gap-2 bg-[#fff]"
                  style={{
                    borderRadius: "6px",
                    border: "1px solid var(--Text-Secondary, #646464)",
                  }}
                >
                  <p className="text-[#333] text-[12px] font-semibold font-Montserrat">
                    05
                  </p>
                  <div className="flex justify-center items-center w-full ">
                    <img
                      src="/images/jobs/arw.png"
                      alt=""
                      className="h-[20px] w-[20px]"
                    />
                  </div>
                </div>
                <p className="text-[#646464] text-[10px] font-semibold">
                  Applicants <br /> per page
                </p>
              </div>
              <div className="flex justify-center items-center gap-[2px]">
                <svg
                  xlgns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15 6L9 12L15 18"
                    stroke="#333333"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <div className="flex items-center">
                  <div className="flex px-[12px] py-2 justify-center items-center gap-2 rounded-md bg-[#06A9EF]">
                    <p className="text-[#fff] text-[12px] font-Montserrat font-semibold">
                      1
                    </p>
                  </div>
                  <div className="flex justify-center items-center gap-[2px] rounded-[8px]">
                    <p className="text-[#646464] text-[12px] px-[12px] py-2 font-semibold">
                      2
                    </p>
                  </div>
                  <svg
                    xlgns="http://www.w3.org/2000/svg"
                    width="25"
                    height="24"
                    viewBox="0 0 25 24"
                    fill="none"
                  >
                    <path
                      d="M9.375 6L15.625 12L9.375 18"
                      stroke="#333333"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div> */}
        </div>
      </div>
    </>
  );
};

export default InitialMobile;
