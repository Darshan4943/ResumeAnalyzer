import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants } from "@/utils/preboardArray";

const Hire = ({ toggleContentt, setPreview }) => {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    "Due Date",
    "Department",
    "Recruiter",
    "Preboarding Status",
    "Actions",
  ];
  return (
    <>
      <div className="grid grid-rows-1 w-full ">
        <div className="grid grid-cols-7 w-full grid-flow-col">
          {labels.map((req, index) => (
            <div
              key={index}
              className="flex px-4 text-[14px] font-medium font-Montserrat text-[#333] py-2 items-center bg-[#E6E6E6] justify-between w-full"
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
                  className="flex w-[100%] py-[16px] justify-between items-center"
                  style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
                >
                  <div className="grid grid-cols-7 w-full px-4 py-2">
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex justify-start text-[14px] font-[600] items-center  gap-1 scr1024:gap-[16px]">
                        <input className="w-[24px] h-[24px]" type="checkbox" />
                        <img
                          className="w-[40px]"
                          src="/images/employer/profile_icon.png"
                          alt=""
                        />
                        <p className="text-[14px] font-[600]">
                          {applicants.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-start col-span-1">
                      <p className="text-[14px] font-[600] text-[#333] font-Montserrat">
                        {applicants.role}
                      </p>
                    </div>
                    <div className="flex items-center justify-start col-span-1">
                      <p className="text-[14px] font-[600] text-[#333] font-Montserrat">
                        {applicants.dueDate}
                      </p>
                    </div>
                    <div
                      className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${
                        applicants.Department === "IT"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                      } `}
                    >
                      {applicants.Department}
                    </div>
                    <div className="flex items-center justify-start col-span-1 pl-5 text-[14px] font-semibold">
                      {applicants.role}
                    </div>
                    <div className="flex items-center justify-center col-span-1 ">
                      <div
                        className={`flex py-[12px]  justify-center px-[16px] text-[10px] lg:text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${
                          applicants.status === "Interview"
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
                    </div>
                    <div className="flex items-center justify-start col-span-1">
                      {/* <div className="flex items-center justify-start col-span-1"> */}
                      <div className="flex   items-center w-full  ">
                        <div className="flex lg:py-3 gap-1 lg:px-2 px-1 py-1 justify-center items-center rounded-[6px] border border-[#06A9EF] bg-[#06A9EF]">
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
                          <button
                            onClick={()=>setPreview(true)}
                            className=" text-white lg:text-[10px] text-[11px] font-[600]  font-Montserrat "
                          >
                            {applicants.Preview}
                          </button>
                        </div>
                        <img
                          className="w-[24px]"
                          src="/images/employer/three-dot.png"
                          alt=""
                        />
                      </div>
                      {/* </div> */}
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

export default Hire;
