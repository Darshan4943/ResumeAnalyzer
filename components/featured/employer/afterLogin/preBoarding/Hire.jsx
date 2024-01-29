import React, { useEffect, useRef, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants } from "@/utils/preboardArray";
import { applicantsMobile } from "@/utils/preboardArray";
import { headings } from "@/utils/preboardArray";
import { AnimatePresence, motion } from "framer-motion";
const Hire = ({ toggleContentt, setPreview }) => {
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

  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
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
                onChange={(e) => handleHeadingChange(e, headingObj.heading)}
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
            <input className="w-[100%]" type="text" placeholder="search" />
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
                          <input
                            className="w-[24px] h-[24px]"
                            type="checkbox"
                          />
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
                        <div className="flex   items-center w-full relative ">
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
                              onClick={() => setPreview(true)}
                              className=" text-white lg:text-[10px] text-[11px] font-[600]  font-Montserrat "
                            >
                              {applicants.Preview}
                            </button>
                          </div>
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
                        <div className="flex justify-end items-center gap-4 relative">
                          <img
                            onClick={() => handleDotClick(index)}
                            className="w-[24px]"
                            src="/images/employer/three-dot1.png"
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
                                className='absolute flex flex-col text-[14px] rounded-[8px] w-[150px] z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-4 gap-4 bg-white' style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                              >

                                <div >
                                  View Offer

                                </div>
                                <div className="text-[#C00000]" >
                                  Cancel Offer

                                </div>


                              </motion.div>
                            )}
                          </AnimatePresence>
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
    </>
  );
};

export default Hire;
