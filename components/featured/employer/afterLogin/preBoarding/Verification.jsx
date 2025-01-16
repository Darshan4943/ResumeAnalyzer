import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import { applicants, applicantsMobile, headings } from "../../../../../utils/preboardArray";


const Verification = ({ toggleContentt, setToggle }) => {
  const [documentation, setDocumentation] = useState(false);
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleHeadingChange = (event, index) => {
    const selectedOption = event.target.value;
    const selectedHeading = headings[index];
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const labels = [
    "Name of Candidate",
    "Job Role",
    "Due Date",
    "Doc Status",
    "Recruiter",
    "Preboarding Status",
    "Actions",
  ];

  const id = [
    {
      tittle: "Photo ID & Address Proof",
      img: <img src="/images/aadhaar-card.png" className="" alt="" />,
    },
    {
      tittle: "Aadhar card.pdf",
      img: <img src="/images/pan.png" className="" alt="" />,
    },

    {
      tittle: "DL.pdf",
      img: <img src="/images/e_pan.png" className="" alt="" />,
    },
    {
      tittle: "Passport.pdf",
      img: <img src="/images/passport.png" className="" alt="" />,
    },
  ];

  const Payroll = [
    {
      tittle: "Bank Statement.pdf",
      img: <img src="/images/passport.png" className="" alt="" />,
    },
    {
      tittle: "PAN card.pdf",
      img: <img src="/images/pan.png" className="" alt="" />,
    },
  ];

  const degree = [
    {
      tittle: "Academic degree",
      education: "MBA degree.pdf",
      img: <img src="/images/degree.png" className="" alt="" />,
    },
    {
      tittle: "Degree Certificate",
      education: "BE degree.pdf",
      img: <img src="/images/degree.png" className="" alt="" />,
    },
  ];

  return (
    <>
      <div className="web w-full">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div className="w-full flex items-center justify-between border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
            {headings.map((items, index) => (
              <>
                <select
                  className=" w-[19.87%] bg-whites outline-none"
                  onChange={(e) => handleHeadingChange(e, items.heading)}
                >
                  <option value=""> {items.heading}</option>
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
          <div className="grid grid-cols-7 w-full grid-flow-col">
            {labels.map((req, index) => (
              <div
                key={index}
                className="flex px-4 text-[14px] font-[600] font-Montserrat text-[#333333] py-4 items-center bg-[#EFFAFF] justify-between w-full"
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
                    className="flex w-[100%] bg-[#FFFFFF]  border-b border-[#D4D4D480] py-[16px] justify-between items-center"
                  >
                    <div className="grid grid-cols-7 w-full px-4 py-2">
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex justify-start text-[14px] font-[600] items-center  gap-1 scr1024:gap-[16px]">
                          <input
                            className="w-[16px] h-[16px]"
                            type="checkbox"
                          />
                          <img
                            className="w-[40px] rounded-[50%]"
                            src="/images/employer/profile_icon.png"
                            alt=""
                          />
                          <p className="text-[14px] font-[600]">
                            {applicants.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[12px] font-[500] text-[#333] font-Montserrat">
                          {applicants.role}
                        </p>
                      </div>
                      <div className="flex items-center justify-start col-span-1">
                        <p className="text-[12px] font-[500] text-[#333] font-Montserrat">
                          {applicants.dueDate}
                        </p>
                      </div>
                      <div
                        className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicants.docStatus === "Submitted"
                          ? "text-[#0C8A0A]"
                          : "text-[#333]"
                          } `}
                      >
                        {applicants.docStatus}
                      </div>
                      <div className="flex items-center justify-start col-span-1 pl-5 text-[12px] font-[500]">
                        {applicants.role}
                      </div>
                      <div className="flex items-center justify-center col-span-1 ">
                        <div
                          className={`flex py-[6px]  justify-center px-[10px] text-[10px] lg:text-[14px] font-semibold items-center gap-[8px] rounded-[80px]  ${applicants.status === "Interview"
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
                      <div className="flex items-center justify-start col-span-1">
                        <div className="flex   items-center w-full  justify-between">
                          {applicants.docStatus == "Submitted" ? (
                            <button
                              onClick={() => setDocumentation(true)}
                              className={`flex lg:py-[6px] lg:px-4 px-1 py-1 justify-center items-center  rounded-[30px]  lg:text-[14px] text-[10px] font-[600] font-Montserrat border ${applicants.verify === "View & Verify"
                                ? "text-[#fff] bg-[#06A9EF]"
                                : "text-[#333] bg-[#fff]"
                                }`}
                            >
                              {applicants.verify}
                            </button>
                          ) : (
                            <button
                              onClick={toggleContentt}
                              className="flex lg:py-[6px] lg:px-3 px-1 py-1 justify-center text-[#ABABAB] items-center bg-[#fff]  rounded-[30px]  lg:text-[12px] text-[10px]  font-[600] font-Montserrat border border-[#ABABAB]"
                            >
                              Moved forward
                            </button>
                          )}

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
                          className={` flex items-center text-[14px]  font-[600] justify-start col-span-1 pl-5 text ${applicantsMobile.verifyStatus === "Verified"
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
                          onClick={() => setDocumentation(true)}
                          className="flex w-full px-6 py-3 justify-center items-center gap-[10px] max-w-[260px] bg-[#06A9EF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                        >
                          <p className="text-[14px] text-[#fff] font-[600] font-Montserrat">
                            {applicantsMobile.verify}
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

      {documentation && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div className="absolute w-[95%] ms:w-[90%] ">
              <div
                className="flex w-[100%] p-[10px] sm:p-[24px] flex-col items-start gap-[16px] rounded-[16px] h-[90vh] overflow-y-scroll  bg-[#fff] "
                style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="flex justify-between w-full">
                  <p className="scr420:text-[20px] text-[18px] px-[5%] scr420:px-[0%] text-[#333] font-[500] ">
                    View & Verify Documents
                  </p>
                  <svg
                    onClick={() => setDocumentation(false)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g mask="url(#mask0_7804_67168)">
                      <path
                        d="M6.28384 18.8838L5.11719 17.7172L10.8339 12.0005L5.11719 6.28384L6.28384 5.11719L12.0005 10.8339L17.7172 5.11719L18.8838 6.28384L13.1672 12.0005L18.8838 17.7172L17.7172 18.8838L12.0005 13.1672L6.28384 18.8838Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>
                </div>

                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[16px] px-[5%] scr420:px-[0%] text-[#333] font-[600]">
                    Personal ID Proof
                  </p>

                  <p className="text-[14px] px-[5%] scr420:px-[0%] font-[400]">
                    Photo ID & Address Proof
                  </p>
                  <div className="flex flex-start flex-wrap gap-4">
                    {id.map((e, index) => (
                      <>
                        <div key={index} className="flex flex-col gap-1 w-[100%] px-[5%] scr420:px-[0%] scr420:w-[180px]">
                          <p className="text-[12px] font-[400] text-[#333]">
                            {e.tittle}
                          </p>
                          {e.img}
                        </div>
                      </>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[14px] px-[5%] scr420:px-[0%] font-[400]">Payroll</p>
                  <div className="flex flex-start flex-wrap gap-4">
                    {Payroll.map((e, index) => (
                      <>
                        <div key={index} className="flex flex-col gap-1 w-[100%] px-[5%] scr420:px-[0%] scr420:w-[180px]">
                          <p className="text-[12px] font-[400] text-[#333]">
                            {e.tittle}
                          </p>
                          {e.img}
                        </div>
                      </>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[16px] px-[5%] scr420:px-[0%] text-[#333] font-[600]">Degrees</p>
                  <div className="flex gap-4  flex-wrap flex-row">
                    {degree.map((e, index) => (
                      <div key={index} className="flex gap-1 flex-col">
                        <p className="text-[14px] px-[5%] scr420:px-[0%] font-[400]">{e.education}</p>
                        <div className="flex flex-start gap-4">
                          <div className="flex flex-col gap-2 w-[100%] px-[5%] scr420:px-[0%] scr420:w-[180px]">
                            <p className="text-[12px] font-[400] text-[#333]">
                              {e.tittle}
                            </p>
                            {e.img}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[16px] px-[5%] scr420:px-[0%] text-[#333] font-[600]">
                    Certification
                  </p>
                  <div className="flex gap-4 flex-wrap flex-row">
                    <div className="flex flex-start gap-4">
                      <div className="flex flex-col gap-2 w-[100%] px-[5%] scr420:px-[0%] scr420:w-[180px]">
                        <p className="text-[12px] font-[400] text-[#333]">
                          XYZ certificate.pdf
                        </p>
                        <img src="/images/degree.png" className="" alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-[4px]">
                  <p className="text-[16px] px-[5%] scr420:px-[0%] text-[#333] font-[600]">
                    Previous Work Experience
                  </p>
                  <div className="flex gap-4  flex-row">
                    <div className="flex flex-start gap-4">
                      <div className="flex flex-col gap-2 w-[100%] px-[5%] scr420:px-[0%] scr420:w-[180px]">
                        <p className="text-[12px] font-[400] text-[#333]">
                          experience letter.pdf
                        </p>
                        <img src="/images/degree.png" className="" alt="" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full justify-end gap-4 flex ">
                  <button
                    onClick={() => setDocumentation(false)}
                    className="flex items-center justify-center text-[14px] scr420:text-[16px] py-[8px] scr420:px-[24px] px-[16px] rounded-[12px] font-[600] border-[1px] text-[#333] border-[#06A9EF] bg-[#fff]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setDocumentation(false)}
                    className="flex items-center justify-center text-[14px] scr420:text-[16px] py-[8px] scr420:px-[24px] px-[16px] rounded-[12px] font-[600] border-[1px] text-[#fff] border-[#06A9EF] bg-[#06A9EF]"
                  >
                    Verify Documents
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Verification;
