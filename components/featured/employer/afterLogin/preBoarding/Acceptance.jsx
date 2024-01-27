import React, { useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants } from "@/utils/preboardArray";
import { applicantsMobile } from "@/utils/preboardArray";
import { headings } from "@/utils/preboardArray";
import { AnimatePresence, motion } from "framer-motion";
const Acceptance = ({ toggleContentt, setToggle }) => {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [moreOption, setMoreOption] = useState(false);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [selectedDotIndex, setSelectedDotIndex] = useState(null);

  const handleDotClick = (index) => {

    setMoreOption((prev) => !prev);
    setSelectedDotIndex(index);
  };


  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setMoreOption(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);
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
                        className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicants.Department === "IT"
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
                          className={`flex py-[12px]  justify-center px-[16px] text-[10px] lg:text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${applicants.status === "Interview"
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
                          <div className="flex   items-center w-full  justify-between relative">
                            {
                              applicants.Department == "IT" ? <button
                                onClick={toggleContentt}
                                className={`flex lg:py-2 lg:px-4 px-1 py-1 justify-center items-center  rounded-[6px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border ${applicants.Hire === "Hire Applicant" ? "text-[#fff] bg-[#26A4FF]" : "text-[#333] bg-[#fff]"
                                  }`}
                              >
                                {applicants.Hire}
                              </button> : <button
                                onClick={toggleContentt}
                                className="flex lg:py-2 lg:px-3 px-1 py-1 justify-center text-[#333] items-center bg-[#fff]  rounded-[6px]  lg:text-[12px] text-[10px] font-[600] font-Montserrat border "


                              >
                                Hired
                              </button>
                            }

                            <img
                              onClick={() => handleDotClick(index)}
                              className="w-[24px]"
                              src="/images/employer/three-dot.png"
                              alt=""
                            />
                            <AnimatePresence>
                              {moreOption && selectedDotIndex === index && (
                                <motion.div
                                  initial={{ x: '100%' }}
                                  animate={{ x: 0 }}
                                  exit={{ x: '100%' }}
                                  transition={{ duration: 0.5 }}
                                  ref={taskRef}
                                  className='absolute flex flex-col text-[14px] rounded-[8px] left-0 right-0 z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-4 gap-4 bg-white' style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                                >

                                  <div >
                                    View Offer

                                  </div>
                                 
                                  <div >
                                    Revise Offer

                                  </div>
                                  <div className="text-[#C00000]" >
                                    Cancel Offer

                                  </div>


                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
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
                          className="flex w-full px-6 py-3 justify-center items-center gap-[10px] bg-[#06A9EF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                        >
                          <p className="text-[14px] text-[#fff] font-[600] font-Montserrat">
                            {applicantsMobile.Hire}
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


    </>
  );
};

export default Acceptance;
