import React, { useEffect, useState } from "react";
import { TablePagination } from '@mui/material';
import JobDetails from "./JobDetails";
import Analytics from "./Analytics";
import { CloudSearch } from "aws-sdk";

function JobPost({ toggleContentt, setToggle }) {
  const [option, setOption] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [activeOption, setActiveOption] = useState('Applicants');
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const applicant_head = [
    {
      name: 'Name of Candidate',
      check: <input className="w-[24px] h-[24px]" type="checkbox" />
    },
    {
      name: 'Rating',
      check: ""
    },
    {
      name: 'Profile Match',
      check: ""
    },
    {
      name: 'Hiring stage',
      check: ""
    },
    {
      name: 'Applied Date',
      check: ""
    },
    {
      name: 'Action',
      check: ""
    },
  ]

  const applicants = [
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/empty_star.png" alt="" />
      ,
      img_star2: '',
      score: '0.0',
      profile: "87%",
      status: "In Review",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/empty_star.png" alt="" />
      ,
      img_star2: '',
      score: '0.0',
      profile: "87%",
      status: "In Review",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/star_fill.png" alt="" />
      ,
      img_star2: '',
      score: '4.0',
      profile: "87%",
      status: "Shortlisted",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/star_fill.png" alt="" />
      ,
      img_star2: '',
      score: '5.0',
      profile: "87%",
      status: "Hired",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/star_fill.png" alt="" />
      ,
      img_star2: '',
      score: '2.0',
      profile: "87%",
      status: "Rejected",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/star_fill.png" alt="" />
      ,
      img_star2: '',
      score: '4.0',
      profile: "87%",
      status: "Rejected",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/star_fill.png" alt="" />
      ,
      img_star2: '',
      score: '3.0',
      profile: "87%",
      status: "Interview",

      date: '13 July, 2021'
    },
    {
      img: <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
      ,
      name: 'John Doe',
      img_star1: <img className="w-[24px] " src="/images/employer/star_fill.png" alt="" />
      ,
      img_star2: '',
      score: '4.0',
      profile: "87%",
      status: "Rejected",


      date: '13 July, 2021'
    },
  ]

  const widths = ['20%', '10%', '15%', '20%', '15%', '20%'];

  return (
    <div className=" mb-4 ">

      <div className="w-[100%] ml:max-h-[78vh] flex flex-col  relative   ">
        <div className="">
          <div className="flex w-[100%] scr700:px-[32px] px-[8px] py-[24px] justify-between rounded-t-[8px] items-center bg-[#fff] ">
            <div className="flex items-center scr700:gap-[24px] gap-2">
              <img onClick={() => setToggle(0)} className=" ms:w-[40px] ms:h-[40px] w-[24px] h-[24px] cursor-pointer" src="/images/employer/Icon_left.png" alt="" />
              <div className="flex flex-col items-start gap-[8px]">
                <p className="text-[#333]  font-[600] ms:text-[24px] text-[18px] leading-relaxed">Assistant Manager</p>
                <div className="flex justify-center items-center gap-[8px]">
                  <p className="font-[600] ms:text-[16px] text-[10px]">Customer Support</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#333333" />
                  </svg>
                  <p className="font-[600] ms:text-[16px] text-[10px]">Full-Time</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                    <circle cx="2" cy="2" r="2" fill="#333333" />
                  </svg>
                  <p className="font-[500] ms:text-[16px] text-[10px]">4 / <span className="text-[#646464]">11 Hired</span></p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-[8px]">
              <img className="w-[24px] " src="/images/employer/share.png" alt="" />
              <p className="text-[20px] web600 text-[#646464]">Share</p>
            </div>
          </div>
          <div>
            <div className="flex px-[16px] ms:text-[16px] text-[14px]  items-start  ml:gap-[40px] gap-2 bg-[#fff]">
              <div className="flex flex-col items-center gap-[7px] shadow-border">
                <p onClick={() => { setOption(0), setActiveOption("Applicants") }} className={` ${activeOption === 'Applicants' ? "":"text-[#646464]"}  font-[600]`}>Applicants</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="4" viewBox="0 0 89 4" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z" fill={activeOption === 'Applicants' ? '#06A9EF' : 'white'} />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-[7px] shadow-border">
                <p onClick={() => { setOption(1), setActiveOption("JobDetails") }} className={` ${activeOption === 'JobDetails' ? "":"text-[#646464]"}  font-[600]`}>Job Details</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="4" viewBox="0 0 89 4" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z" fill={activeOption === 'JobDetails' ? '#06A9EF' : 'white'} />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-[7px] shadow-border">
                <p onClick={() => { setOption(2), setActiveOption("Analytics") }}className={` ${activeOption === 'Analytics' ? "":"text-[#646464]"}  font-[600]`}>Analytics</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="4" viewBox="0 0 89 4" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z" fill={activeOption === 'Analytics' ? '#06A9EF' : 'white'} />
                </svg>
              </div>


            </div>
            <div className='h-[1px] bg-[#D6DDEB] w-full'></div>

          </div>
        </div>
        {option === 0 &&
          <>

            <div className="flex scr700:flex-row flex-col-reverse  p-[16px] justify-between scr700:items-center gap-4  bg-[#fff]">
              <p className="font-[600] text-[16px]">Total Applicants : 19</p>
              <div className="flex items-start gap-[8px]">
                <div className="w-[314px] flex py-[12px] px-[16px] gap-[16px] rounded-[6px] border border-[#D6DDEB] bg-[#fff]">
                  <img className="w-[24px] h-[24px]" src="/images/employer/icon_search.png" alt="" />
                  <input type="text" placeholder="Search" />
                </div>
                <div className="flex py-[12px] px-[16px] justify-center gap-[8px] rounded-[6px] border border-[#D6DDEB]">
                  <img className="w-[24px]" src="/images/employer/Icon_filter.png" alt="" />
                  <p className="font-[600]">Filter</p>
                </div>
              </div>
            </div>
            <div className="web">
              <div className="flex p-[16px] items-center justify-between  gap-[24px] bg-[#06A9EF] border border-[#D6DDEB] ">
                {applicant_head.map((applicant_head, index) => (
                  <div key={index}
                    className="flex   items-center w-full text-white gap-[8px]"
                    style={{ width: widths[index] }}>
                    <p className="text-[16px] font-[600]">{applicant_head.name}</p>
                    <img className="w-[24px]" src="/images/employer/expand_more.png" alt="" />
                  </div>
                ))
                }
              </div>

              <div className="flex flex-col gap-[16px] items-start bg-[#fff]  overflow-y-auto">


                {applicants.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((applicants, index) => (
                  < >


                    <div className="flex w-[100%] p-[16px] justify-between items-center " style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}>

                      <div className="  gap-[24px]  w-full justify-between flex items-center">
                        <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                          <input className="w-[24px] h-[24px]" type="checkbox" />
                          <img className="w-[40px]" src="/images/employer/profile_icon.png" alt="" />
                          <p className="text-[16px] font-[600]">{applicants.name}</p>
                        </div>
                        <div className="flex w-[10%] items-center  gap-[8px]">
                          {applicants.img_star1}
                          {applicants.img_star2}


                          <p className="text-[14px] font-[600]">{applicants.score}</p>
                        </div>

                        <div className="flex w-[15%] items-center px-4  gap-[8px]">



                          <p className="text-[14px] font-[600]">{applicants.profile}</p>
                        </div>
                        <div className="w-[20%]">
                          <div className={`flex py-[6px] min-w-[110px]  w-[60%] justify-center px-[10px] text-[14px] font-semibold items-center gap-[8px] rounded-[80px] border ${applicants.status === "Interview" ? 'text-[#26A4FF] border-[#26A4FF]' :
                            applicants.status === "Hired" ? 'text-[#56CDAD] border-[#56CDAD]' :
                              applicants.status === "Shortlisted" ? 'text-[#4640DE] border-[#4640DE]' : applicants.status === "Rejected" ? 'text-[#FF6550] border-[#FF6550]' :
                                applicants.status === "In Review" ? 'text-[#FFB836] border-[#FFB836]' : ''}`}>

                            {applicants.status}

                          </div>
                        </div>
                        <div className=" flex text-[14px] w-[15%]  font-[600]">
                          <p >{applicants.date}</p>
                        </div>
                        <div className="flex  w-[20%] items-center gap-[16px]">
                          <button onClick={toggleContentt} className="flex py-[12px] px-[24px] justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#E7F8FF] ">See Application</button>
                          <img className="w-[24px]" src="/images/employer/three-dot.png" alt="" />
                        </div>
                      </div>
                    </div>
                  </>
                ))
                }
              </div>
            </div>
            <div className="mobile">
              <div className="flex flex-col items-start gap-4 self-stretch w-full">
                <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
                  {applicants
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((applicants, index) => (
                      <>
                        <div
                          className="flex w-[100%] p-[8px] justify-between items-center border border-[#DEDEDE] rounded-xl"
                          style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff" }}
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
                                <div className="flex items-center gap-2">
                                  <img
                                    className="w-[24px] h-[24px]"
                                    src="/images/employer/st.png"
                                    alt=""
                                  />
                                  <p className="text-[14px] font-semibold text-[#333]">
                                    0.0
                                  </p>
                                  {applicants.img_star2}
                                </div>
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
                              <p className="text-[14px] text-[#333] font-[600]">
                                20 Nov, 2023{" "}
                              </p>
                              <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                                <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                                  In Review
                                </p>
                              </div>
                            </div>
                            <div className="flex justify-center w-[100%]">
                              <div
                                className="flex px-6 py-3 min-w-[257px] justify-center items-center gap-[10px] bg-[#E7F8FF]"
                                style={{
                                  borderRadius: "8px",
                                  border: " 1px solid var(--primary, #06A9EF)",
                                }}
                              >
                                <p onClick={toggleContentt} className="text-[14px]  text-[#333] font-[600] font-Montserrat">
                                  See Application
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


            <div >
              <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                className="h-[64px] rounded-b-[12px] py-[12px] px-[16px]  bg-white sticky bottom-0 w-[100%]"
                count={applicants.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </>
        }

        {option === 1 &&
          <>
            <JobDetails />
          </>

        }

        {option === 2 &&
          <>
            <Analytics />
          </>

        }
      </div>


    </div>
  )
}
export default JobPost