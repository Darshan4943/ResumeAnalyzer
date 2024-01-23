import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";

const Initial = ({ toggleContentt, setToggle }) => {
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

  const widths = ["20%", "10%", "15%", "20%", "15%", "20%"];

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
      status: "In Review",
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

      action: " Start Preboarding",
    },
  ];
  const labels = [
    "Name of Candidate",
    "Job Role",
    "Recruiter",
    "Preboarding Status",
    "Actions",
  ];
  return (
    <>
      {/* <div className="flex px-4 text-[14px] font-medium font-Montserrat text-[#333] py-2 items-center bg-[#E6E6E6] justify-between w-full">
          {labels.map((req) => (
            <div className=" w-[12.85%] ">{req}</div>
          ))}
        </div> */}
      {/* <div className="flex flex-col gap-[16px] items-start bg-[#fff]  overflow-y-auto">
        {applicants
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((applicants, index) => (
            <>
              <div
                className="flex w-[100%] p-[16px] justify-between items-center"
                style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
              >
                <div className="  gap-[24px]  w-full justify-between flex items-center">
                  <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                    <input className="w-[24px] h-[24px]" type="checkbox" />
                    <img
                      className="w-[40px]"
                      src="/images/employer/profile_icon.png"
                      alt=""
                    />
                    <p className="text-[16px] font-[600]">{applicants.name}</p>
                  </div>
                  <div className="flex w-[10%] items-center  gap-[8px]">
                        {applicants.img_star1}
                        {applicants.img_star2}


                        <p className="text-[14px] font-[600]">{applicants.score}</p>
                      </div>
                      <div className="flex w-[20%] items-center ">{applicants.role}</div>

                  <div className="flex w-[15%] items-center px-4  gap-[8px]">
                    <p className="text-[14px] font-[600]">
                      {applicants.profile}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <div
                      className={`flex py-[6px] min-w-[110px]  w-[60%] justify-center px-[10px] text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${
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
                  <div className=" flex text-[14px] w-[15%]  font-[600]">
                    <p>{applicants.date}</p>
                  </div>
                  <div className="flex  w-[20%] items-center gap-[16px]">
                    <button
                      onClick={toggleContentt}
                      className="flex py-[12px] px-[24px] justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#E7F8FF] "
                    >
                      See Application
                    </button>
                    <img
                      className="w-[24px]"
                      src="/images/employer/three-dot.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
      </div> */}
      {/* <div className="grid grid-cols-5 w-full">
            <div className="flex items-center justify-start flex-col">hi</div>
            <div className="flex items-center justify-start">ps</div>
        </div> */}

      <div className="grid grid-rows-1 w-full ">
        <div className="grid grid-cols-5 w-full grid-flow-col">
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
      {/* <div className="grid grid-rows-1 w-full grid-flow-row">
      <div className="grid grid-cols-5 w-full grid-flow-row">
      {applicants
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((applicants, index) => (
            <>
              <div
                className="flex w-[100%] p-[16px] justify-between items-center"
                style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
              >
                <div className="  gap-[24px]  w-full justify-between flex items-center">
                  <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                    <input className="w-[24px] h-[24px]" type="checkbox" />
                    <img
                      className="w-[40px]"
                      src="/images/employer/profile_icon.png"
                      alt=""
                    />
                    <p className="text-[16px] font-[600]">{applicants.name}</p>
                  </div>
                  <div className="flex w-[10%] items-center  gap-[8px]">
                        {applicants.img_star1}
                        {applicants.img_star2}


                        <p className="text-[14px] font-[600]">{applicants.score}</p>
                      </div>
                      <div className="flex w-[20%] items-center ">{applicants.role}</div>

                  <div className="flex w-[15%] items-center px-4  gap-[8px]">
                    <p className="text-[14px] font-[600]">
                      {applicants.profile}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <div
                      className={`flex py-[6px] min-w-[110px]  w-[60%] justify-center px-[10px] text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${
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
                  <div className=" flex text-[14px] w-[15%]  font-[600]">
                    <p>{applicants.date}</p>
                  </div>
                  <div className="flex  w-[20%] items-center gap-[16px]">
                    <button
                      onClick={toggleContentt}
                      className="flex py-[12px] px-[24px] justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#E7F8FF] "
                    >
                      See Application
                    </button>
                    <img
                      className="w-[24px]"
                      src="/images/employer/three-dot.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </>
          ))}

      </div>
      </div> */}
      <div className="grid grid-rows-1 w-full">
        {/* <div className="grid grid-cols-1 w-full grid-flow-row">
        {applicants
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((applicants, index) => (
            <>
              <div
                className="flex w-[100%] p-[16px] justify-between items-center"
                style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
              >
                <div className="  gap-[24px]  w-full justify-between flex items-center">
                  <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                    <input className="w-[24px] h-[24px]" type="checkbox" />
                    <img
                      className="w-[40px]"
                      src="/images/employer/profile_icon.png"
                      alt=""
                    />
                    <p className="text-[16px] font-[600]">{applicants.name}</p>
                  </div>
                  <div className="flex w-[10%] items-center  gap-[8px]">
                        {applicants.img_star1}
                        {applicants.img_star2}


                        <p className="text-[14px] font-[600]">{applicants.score}</p>
                      </div>
                      <div className="flex w-[20%] items-center ">{applicants.role}</div>

                  <div className="flex w-[15%] items-center px-4  gap-[8px]">
                    <p className="text-[14px] font-[600]">
                      {applicants.profile}
                    </p>
                  </div>
                  <div className="w-[20%]">
                    <div
                      className={`flex py-[6px] min-w-[110px]  w-[60%] justify-center px-[10px] text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${
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
                  <div className=" flex text-[14px] w-[15%]  font-[600]">
                    <p>{applicants.date}</p>
                  </div>
                  <div className="flex  w-[20%] items-center gap-[16px]">
                    <button
                      onClick={toggleContentt}
                      className="flex py-[12px] px-[24px] justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#E7F8FF] "
                    >
                      See Application
                    </button>
                    <img
                      className="w-[24px]"
                      src="/images/employer/three-dot.png"
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </>
          ))}
        </div> */}
        <div className="grid grid-cols-1 w-full">
          {applicants
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((applicants, index) => (
              <>
                <div
                  className="flex w-[100%] p-[16px] justify-between items-center"
                  style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
                >
                  <div className="grid grid-cols-5 w-full px-4 py-2">
                    <div className="flex items-center justify-start col-span-1">
                      <div className="flex justify-start text-[14px] font-[600] items-center gap-2 lg:gap-[16px]">
                        <input className="w-[24px] h-[24px]" type="checkbox" />
                        <img
                          className="w-[40px]"
                          src="/images/employer/profile_icon.png"
                          alt=""
                        />
                        <p className="text-[16px] font-[600]">
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
                        {applicants.Recruiting}
                      </p>
                    </div>
                    <div className="flex items-center justify-start col-span-1 pl-5">
                      <div
                        className={`flex py-[12px]  justify-center px-[16px] text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${
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
                    <div className="flex items-center justify-start col-span-1 ">
                      <div className="flex   items-center w-full  justify-between">
                        <button
                          onClick={toggleContentt}
                          className="flex lg:py-2 lg:px-4 px-1 py-1 justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#06A9EF] text-white lg:text-[14px] text-[10px] font-[600]  font-Montserrat "
                        >
                            {applicants.action}
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
    </>
  );
};

export default Initial;
