import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants } from "@/utils/preboardArray";

const Acceptance = ({ toggleContentt, setToggle }) => {
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
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex   items-center w-full  justify-between">
                        {
                            applicants.Department=="IT" ? <button
                            onClick={toggleContentt}
                            className={`flex lg:py-2 lg:px-4 px-1 py-1 justify-center items-center  rounded-[6px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border ${
                              applicants.Hire === "Hire Applicant" ? "text-[#fff] bg-[#26A4FF]" : "text-[#333] bg-[#fff]"
                            }`}
                          >
                                          {applicants.Hire}
                                        </button>: <button
            onClick={toggleContentt}
            className= "flex lg:py-2 lg:px-3 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[6px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border "
            
           
          >
                         Hired
                        </button>
                        }
                     
                        <img
                          className="w-[24px]"
                          src="/images/employer/three-dot.png"
                          alt=""
                        />
                      </div>
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

export default Acceptance;
