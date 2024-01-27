import React, { useEffect, useRef, useState } from "react";
import { TablePagination } from '@mui/material';
import JobDetails from "./JobDetails";
import Analytics from "./Analytics";
import { CloudSearch } from "aws-sdk";
import { AnimatePresence, motion } from "framer-motion";

function JobPost({ toggleContentt, setToggle }) {
  const [option, setOption] = useState(0);
  const [moreOption, setMoreOption] = useState(false);
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
                <p onClick={() => { setOption(0), setActiveOption("Applicants") }} className={` ${activeOption === 'Applicants' ? "" : "text-[#646464]"} cursor-pointer  font-[600]`}>Applicants</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="4" viewBox="0 0 89 4" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z" fill={activeOption === 'Applicants' ? '#06A9EF' : 'white'} />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-[7px] shadow-border">
                <p onClick={() => { setOption(1), setActiveOption("JobDetails") }} className={` ${activeOption === 'JobDetails' ? "" : "text-[#646464]"} cursor-pointer font-[600]`}>Job Details</p>
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="4" viewBox="0 0 89 4" fill="none">
                  <path d="M0 4C0 1.79086 1.79086 0 4 0H85C87.2091 0 89 1.79086 89 4H0Z" fill={activeOption === 'JobDetails' ? '#06A9EF' : 'white'} />
                </svg>
              </div>
              <div className="flex flex-col items-center gap-[7px] shadow-border">
                <p onClick={() => { setOption(2), setActiveOption("Analytics") }} className={` ${activeOption === 'Analytics' ? "" : "text-[#646464]"} cursor-pointer font-[600]`}>Analytics</p>
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
                        <div className="flex  w-[20%] items-center gap-[16px] relative">
                          <button onClick={toggleContentt} className="flex py-[12px] px-[24px] justify-center items-center gap-[10px] rounded-[6px] border border-[#06A9EF] bg-[#E7F8FF] ">See Application</button>
                          <img onClick={() => handleDotClick(index)} className="w-[24px] cursor-pointer" src="/images/employer/three-dot.png" alt="" />
                          <AnimatePresence>
                            {moreOption && selectedDotIndex === index && (
                              <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ duration: 0.5 }}
                                ref={taskRef}
                                className='absolute flex flex-col  rounded-[8px] left-0 right-0 z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-2 bg-white' style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
                              >

                                <div className="flex gap-[8px]  p-2 items-center flex-row">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_6622_123448)">
                                      <path d="M17.25 21.7501V18.7501H14.25V17.2501H17.25V14.2501H18.75V17.2501H21.75V18.7501H18.75V21.7501L17.25 21.7501ZM5.3077 19.5001C4.80257 19.5001 4.375 19.3251 4.025 18.9751C3.675 18.6251 3.5 18.1975 3.5 17.6924V6.30784C3.5 5.80271 3.675 5.37514 4.025 5.02514C4.375 4.67514 4.80257 4.50014 5.3077 4.50014H6.69233V2.38477H8.23075V4.50014H13.8077V2.38477H15.3076V4.50014H16.6922C17.1974 4.50014 17.625 4.67514 17.975 5.02514C18.325 5.37514 18.5 5.80271 18.5 6.30784V12.2155C18.25 12.1847 18 12.1694 17.75 12.1694C17.5 12.1694 17.25 12.1847 17 12.2155V10.3078H4.99997V17.6924C4.99997 17.7693 5.03202 17.8398 5.09612 17.904C5.16024 17.9681 5.23077 18.0001 5.3077 18.0001H12.1442C12.1442 18.2501 12.1596 18.5001 12.1904 18.7501C12.2211 19.0001 12.2776 19.2501 12.3596 19.5001H5.3077ZM4.99997 8.80787H17V6.30784C17 6.23091 16.9679 6.16038 16.9038 6.09627C16.8397 6.03217 16.7692 6.00012 16.6922 6.00012H5.3077C5.23077 6.00012 5.16024 6.03217 5.09612 6.09627C5.03202 6.16038 4.99997 6.23091 4.99997 6.30784V8.80787Z" fill="#333333" />
                                    </g>
                                  </svg>
                                  <div

                                    className="block py-1 justify-start text-[14px]"
                                  >
                                    Schedule Interview
                                  </div>
                                </div>
                                <div className="flex gap-[8px] p-2 items-center flex-row">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_6622_123454)">
                                      <path d="M9.3077 18.7503V17.2504H20.5V18.7503H9.3077ZM9.3077 12.7503V11.2504H20.5V12.7503H9.3077ZM9.3077 6.75031V5.25036H20.5V6.75031H9.3077ZM5.16345 19.6638C4.706 19.6638 4.3144 19.5009 3.98865 19.1751C3.66288 18.8494 3.5 18.4578 3.5 18.0003C3.5 17.5429 3.66288 17.1513 3.98865 16.8255C4.3144 16.4998 4.706 16.3369 5.16345 16.3369C5.6209 16.3369 6.0125 16.4998 6.33825 16.8255C6.664 17.1513 6.82687 17.5429 6.82687 18.0003C6.82687 18.4578 6.664 18.8494 6.33825 19.1751C6.0125 19.5009 5.6209 19.6638 5.16345 19.6638ZM5.16345 13.6638C4.706 13.6638 4.3144 13.5009 3.98865 13.1751C3.66288 12.8494 3.5 12.4578 3.5 12.0003C3.5 11.5429 3.66288 11.1513 3.98865 10.8255C4.3144 10.4998 4.706 10.3369 5.16345 10.3369C5.6209 10.3369 6.0125 10.4998 6.33825 10.8255C6.664 11.1513 6.82687 11.5429 6.82687 12.0003C6.82687 12.4578 6.664 12.8494 6.33825 13.1751C6.0125 13.5009 5.6209 13.6638 5.16345 13.6638ZM5.16345 7.66376C4.706 7.66376 4.3144 7.50089 3.98865 7.17514C3.66288 6.84939 3.5 6.45779 3.5 6.00034C3.5 5.54289 3.66288 5.15129 3.98865 4.82554C4.3144 4.49979 4.706 4.33691 5.16345 4.33691C5.6209 4.33691 6.0125 4.49979 6.33825 4.82554C6.664 5.15129 6.82687 5.54289 6.82687 6.00034C6.82687 6.45779 6.664 6.84939 6.33825 7.17514C6.0125 7.50089 5.6209 7.66376 5.16345 7.66376Z" fill="#333333" />
                                    </g>
                                  </svg>
                                  <div

                                    className="block py-1 justify-start break-words"
                                  >
                                    Send Assessment
                                  </div>
                                </div>
                                <div className="flex gap-[8px] p-2 items-center flex-row">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">

                                    <g mask="url(#mask0_6622_123460)">
                                      <path d="M17.4 12.6539L16.3461 11.6L18.4307 9.50003L16.3461 7.42503L17.4 6.35583L19.5 8.45583L21.575 6.35583L22.6442 7.42503L20.5538 9.50003L22.6442 11.6L21.575 12.6539L19.5 10.5789L17.4 12.6539ZM8.99995 11.6923C8.03747 11.6923 7.21352 11.3496 6.5281 10.6642C5.84268 9.97879 5.49997 9.15484 5.49997 8.19236C5.49997 7.22986 5.84268 6.40591 6.5281 5.72051C7.21352 5.03509 8.03747 4.69238 8.99995 4.69238C9.96243 4.69238 10.7864 5.03509 11.4718 5.72051C12.1572 6.40591 12.4999 7.22986 12.4999 8.19236C12.4999 9.15484 12.1572 9.97879 11.4718 10.6642C10.7864 11.3496 9.96243 11.6923 8.99995 11.6923ZM1.5 19.3077V17.0846C1.5 16.5949 1.633 16.1414 1.899 15.7241C2.16503 15.3068 2.52048 14.986 2.96535 14.7616C3.95382 14.277 4.95093 13.9135 5.9567 13.6712C6.96247 13.4289 7.97688 13.3078 8.99995 13.3078C10.023 13.3078 11.0374 13.4289 12.0432 13.6712C13.049 13.9135 14.0461 14.277 15.0345 14.7616C15.4794 14.986 15.8349 15.3068 16.1009 15.7241C16.3669 16.1414 16.4999 16.5949 16.4999 17.0846V19.3077H1.5ZM2.99995 17.8077H15V17.0846C15 16.8821 14.9413 16.6946 14.824 16.5221C14.7067 16.3497 14.5474 16.209 14.3461 16.1C13.4846 15.6757 12.6061 15.3542 11.7107 15.1356C10.8152 14.917 9.91165 14.8077 8.99995 14.8077C8.08825 14.8077 7.18468 14.917 6.28925 15.1356C5.39382 15.3542 4.51533 15.6757 3.6538 16.1C3.45252 16.209 3.29323 16.3497 3.17593 16.5221C3.05861 16.6946 2.99995 16.8821 2.99995 17.0846V17.8077ZM8.99995 10.1924C9.54995 10.1924 10.0208 9.99653 10.4124 9.60486C10.8041 9.21319 11 8.74236 11 8.19236C11 7.64236 10.8041 7.17153 10.4124 6.77986C10.0208 6.38819 9.54995 6.19236 8.99995 6.19236C8.44995 6.19236 7.97912 6.38819 7.58745 6.77986C7.19578 7.17153 6.99995 7.64236 6.99995 8.19236C6.99995 8.74236 7.19578 9.21319 7.58745 9.60486C7.97912 9.99653 8.44995 10.1924 8.99995 10.1924Z" fill="#C00000" />
                                    </g>
                                  </svg>

                                  <a

                                    className="block py-1 text-[#C00000]"
                                  >
                                    Reject Candidate
                                  </a>
                                </div>

                              </motion.div>
                            )}
                          </AnimatePresence>
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