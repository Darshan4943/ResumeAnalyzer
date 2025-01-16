import React, { useEffect, useState } from "react";
import StartPreboarding from "./StartPreboarding";
import { applicantsMobile, } from "../../../../../utils/preboardArray";
import { TablePagination } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";

const Initial = ({ jobs, fetchPreboardings, setToggle, setHeadings, headings }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [startPreboarding, setStartPreboarding] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [checkedjob, setCheckedJob] = useState({});
  const [applicant, selectedApplicant] = useState();
  const [setOpenThreeDts] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (applicant?.applicantId) {
      fetchPreboardings(applicant.applicantId);
    }
  }, [applicant]);

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



  const handleNavigation = () => {
    setToggle();
  };
  const [filterJobs, setFilterJobs] = useState([]);
  const [attributes, setAttributes] = useState([]);


  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/jobs/getDistinctJobTitlesAndLocations"
        );
        const data = response.data;

        setAttributes(data);

        setHeadings((prevHeadings) =>
          prevHeadings.map((item) => {
            if (item.heading === "Job Role") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.jobTitles])],
              };
            } else if (item.heading === "Location") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.locations])],
              };
            } else if (item.heading === "Due Date") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.deadLines])],
              };
            }
            return item;
          })
        );
      } catch (error) {
        console.error("Error fetching job attributes:", error);
      }
    };

    fetchAttributes();
  }, []);

  const handlePageChange = (event, newPage) => setPage(newPage);
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleHeadingChange = (heading, value) => {
    console.log(`Sorting/Filtering by ${heading}:`, value);
  };

  const handleCheckboxChange = (job) => {
    setCheckedJob((prevChecked) =>
      prevChecked.includes(job)
        ? prevChecked.filter((item) => item !== job)
        : [...prevChecked, job]
    );
  };
  const handleSearch = () => {
    console.log("Filters applied:", filterData);
  };

  console.log("filterJobs", filterJobs)
  console.log("headings", headings)

  return (
    <>
      {startPreboarding && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed  z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins ">
            <StartPreboarding
              applicant={applicant}
              jobs={jobs}
              setStartPreboarding={setStartPreboarding}
            />
          </div>
        </>
      )}
      <div className="web w-full">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
            {headings.map((items, index) => (
              <>
                <select
                  className=" w-[19.87%] bg-whites outline-none text-[#646464] text-[14px] font-[500]"
                  onChange={(e) => handleHeadingChange(e, items.heading)}
                >
                  <option value="" className="text-[#646464] text-[14px] font-[500]"> {items.heading}</option>
                  {items.options.map((option, optIndex) => (
                    <option key={optIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="w-[1px] bg-[#E0E0E0] h-[24px]"></div>
              </>
            ))}
            <button className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[36px] text-[#FFFFFF] text-[14px] font-[600]">
              Search
            </button>
          </div>
        </div>
        <div className="grid grid-rows-1 w-full ">
          <div className="grid grid-cols-5 w-full grid-flow-col">
            {labels.map((req, index) => (
              <div
                key={index}
                className="flex p-4 text-[14px] font-[600] font-Montserrat text-[#333] items-center bg-[#EFFAFF] justify-between w-full"
              >
                <p>{req}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-rows-1 w-full">
          <div className="grid grid-cols-1 w-full">
            {jobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job, index) => (
                <>
                  <div
                    className={`flex w-[100%] border-b border-[#D4D4D480] p-[16px] justify-between items-center ${checkedjob[index] ? "bg-[#D3F1FF]" : "bg-[#FFFFFF] hover:bg-[#D3F1FF]"
                      }`}
                  >
                    <div className="grid grid-cols-5 w-full px-4 py-2">
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex justify-start text-[14px] font-[600] items-center gap-2 lg:gap-[16px]">
                          <input
                            className="w-[16px] h-[16px]"
                            type="checkbox"
                            checked={!!checkedjob[index]}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <img
                            className="w-[40px]  rounded-[50%]"
                            src="/images/employer/profile_icon.png"
                            alt=""
                          />
                          <p className="text-[14px] font-[600] text-[#333333]">
                            {!job.details.personal.firstName.length == 0 ? (
                              <>
                                {job.details.personal.firstName}{" "}
                                {job.details.personal.lastName}
                              </>
                            ) : (
                              "-"
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[12px] font-[500] text-[#333333] font-Montserrat">
                          {/* {applicants.role} */}
                          Software Developer
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[12px] font-[500] text-[#333333] font-Montserrat">
                          {/* {applicants.Recruiting} */}
                          Nikhil Patil
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1 pl-5">
                        <div
                          className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : job.status === "Interview"
                              ? "bg-[#26A4FF1A]"
                              : job.status === "Hired"
                                ? "bg-[#56CDAD1A]"
                                : job.status === "Shortlisted"
                                  ? "bg-[#4640DE1A]"
                                  : job.status === "Rejected"
                                    ? "bg-[#FF65501A]"
                                    : job.status === "In Review"
                                      ? "bg-[#EB85331A]"
                                      : ""
                            } ${job.status === "Interview"
                              ? "text-[#26A4FF]"
                              : job.status === "Hired"
                                ? "text-[#56CDAD]"
                                : job.status === "Shortlisted"
                                  ? "text-[#4640DE]"
                                  : job.status === "Rejected"
                                    ? "text-[#FF6550]"
                                    : job.status === "In Review"
                                      ? "text-[#FFB836]"
                                      : "text-[#333333]"
                            }`}
                        >
                          {job.status}
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1 ">
                        <div className="flex   items-center w-full  justify-between">
                          <div key={index}>
                            {job?.isPreboarding ? (
                              <button className="flex lg:py-[6px] lg:px-2 xxlg:px-14  px-1 py-1 justify-center items-center content-center rounded-[30px] border border-[#DEDEDE]  text-[#DEDEDE] lg:text-[12px] xxlg:text-[14px] text-[10px] font-[600] font-Montserrat">
                                Intied
                              </button>
                            ) : (
                              <button
                                onClick={() => {
                                  setStartPreboarding(true);
                                  selectedApplicant(job);
                                }}
                                className="flex lg:py-[6px] lg:px-2 xxlg:px-4 px-1 py-1 justify-center items-center gap-[10px] rounded-[30px] border border-[#06A9EF] bg-[#06A9EF] text-[#FFFFFF] lg:text-[12px] xxlg:text-[14px] text-[10px] font-[600] font-Montserrat"
                              >
                                Start Preboarding
                              </button>
                            )}
                          </div>

                          <img
                            onClick={() => {
                              setOpenThreeDts(true);
                            }}
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
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          className="h-[64px] rounded-b-[12px] py-[12px] px-[16px]  border-t bg-white w-[100%]"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
      <div className="mobile relative overflow-y-scroll  w-full">
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
                    onChange={(e) => handleHeadingChange(e, headingObj.heading)}
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
            {jobs
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((job, index) => (
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
                            {job.firstName}
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
                          job Role
                        </p>
                        <p className="text-[14px] text-[#333] font-Montserrat font-[600]">
                          {job.role}
                        </p>
                      </div>
                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          Recruiter
                        </p>
                        <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                          {job.role}
                        </p>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#646464] font-[500]">
                          {job.proboard}
                        </p>
                        <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                          <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                            In Review
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">
                        <div
                          className="flex w-full px-6 py-3 justify-center items-center gap-[10px] max-w-[250px] bg-[#06A9EF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                          onClick={() => {
                            setStartPreboarding(true);
                            selectedApplicant(applicantsMobile);
                          }}
                        >
                          <p className="text-[14px] text-[#fff] font-[600] font-Montserrat">
                            {applicantsMobile.action}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>

        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={jobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          className="h-[64px] rounded-b-[12px] py-[12px] px-[16px]  border-t bg-white w-[100%]"
        />
      </div>

    </>
  );
};

export default Initial;
