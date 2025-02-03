import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { CountPostingDays } from "../../../../utils/data";
import MiniLoader from "../../../common/mini-loader";
import { fetchSavedJobIds } from "../../../../Redux/slices/jobSlice";
import NormalJobCard from "./NormalJobCard";
import NoJobs from "./noJobs";
;

function AllJobCard({
  totalCount,
 
  setLimit,
  limit,

  totalPages,
  page,
  setPage,


  jobData,

  miniLoading,

}) {

  const [selectedJob, setSelectedJob] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { appliedJobData, savedJobIds } = useSelector((state) => state.job.jobData);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();
  // const [isLogin, setIsLogin] = useState(false);

  const router = useRouter();
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token && token != "undefined") {
  //     if (token) {
  //       setIsLogin(true);
  //     } else {
  //       setIsLogin(false);
  //     }
  //   }
  // }, []);


  const posters = [
    {
      title: "Craft a Winning CV in Minutes with AI",
      description: "Don't let a subpar CV hold you back. Our AI-powered CV builder creates professional, impactful CVs that land you interviews.",
      path: "/home",
      img: "/images/jobs/posters/poster1.png",
      isBgImg: false,

      background: " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      backgroundImg: "",
      no: 2,
      page: 1,
      isCircle: true
    },
    {
      title: "Skill Assessmentt",
      description: "Uncover Your Potential with Effortless Skill Assessment. Elevate Your Abilities, Elevate Your Success!",
      path: "/about",
      img: "/images/jobs/posters/poster2.png",
      background: " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      backgroundImg: "/images/jobs/posters/bg1.png",
      isBgImg: true,

      no: 2,
      page: 2
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      path: "/contact",
      background: " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      img: "/images/jobs/posters/poster3.png",
      backgroundImg: "/images/jobs/posters/bg2.png",
      isBgImg: true,

      no: 2,
      page: 3
    }
  ];
  const pagePoster = posters.find((poster) => poster.page === page);


  const combinedData = jobData?.reduce((acc, job, index) => {
    acc.push(job);

    if (pagePoster && index + 1 === pagePoster.no) {
      acc.push({ ...pagePoster, isPoster: true });
    }

    return acc;
  }, []);


  const nextPage = (e) => {
    e.stopPropagation();
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      setPage(currentPage + 1);
    }
  };

  const prevPage = (e) => {
    e.stopPropagation();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      setPage(currentPage - 1);
    }
  };
  const handleChange = (e) => {

    setLimit(parseInt(e.target.value));
    setPage(1);
    setCurrentPage(1);
  };



  return (
    <div className="flex flex-col gap-4 w-full max-w-[548px] items-center">

      {totalCount > 0 ?
        <>

          <div className="flex flex-col gap-4 w-full">
            {combinedData?.map((item, index) => {
              if (item._id) {

                return (
                  < div key={index}>
                    <NormalJobCard item={item} />

                  </div>
                )
              }
              else {
                return (
                  <div style={{
                    background: item.isBgImg
                      ? `url(${item.backgroundImg}) center/cover no-repeat`
                      : item.background

                  }}
                    key={index}
                    className='p-[16px] flex   sm:flex-row flex-col-reverse relative scr1100:gap-[80px] gap-8  justify-between items-center  rounded-[12px]  min-h-[169px] overflow-hidden ' >
                    <div className='flex flex-col gap-2 sm:items-start items-center justify-between h-full'>
                      <div className='flex flex-col gap-2 sm:items-start items-center '>
                        <p className=' text-[16px] font-[600] sm:text-start text-center'>
                          {item?.title}
                        </p>
                        <p className='text-[10px] font-[500] sm:text-start text-center'> {item?.description}</p>
                      </div>
                      <button className='scr1100:py-3 scr1100:px-9 px-6 py-2 text-[#FFFFFF] bg-blue text-[14px] leading-tight font-[600] rounded-[30px] scr1100:h-[42px] h-[34px] scr1100:w-[155px]'>
                        Know More
                      </button>
                    </div>
                    {item?.isCircle &&
                      <div style={{
                        background: "linear-gradient(249.4deg, #FCE1AA 10.64%, #FFE8B5 98.56%)"
                      }} className=" h-[206px] w-[206px] rounded-[206px] absolute right-[-50px] top-[-20px]   sm:block hidden">

                      </div>
                    }
                    <img
                      src={item?.img}
                      alt=""
                      className="h-[118px] w-[118px]  object-cover z-[10]"

                    />
                  </div>

                )
              }
            })}
          </div>
          {totalCount > 10 &&
            <div className="sm:px-[16px] px-0 w-full justify-between flex ">
              <div className="flex items-center sm:gap-4 gap-2">
                <p className="text-[14px] text-[#646464] font-600">View</p>
                <div className="flex gap-[8px] items-center">
                  {/* <p className="text-[14px] px-[16px] py-[12px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600">{limit}</p> */}

                  <select
                    value={limit}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleChange(e)}
                    className="text-[14px] px-[16px] py-[10px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600"
                  >

                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <p className="text-[14px] sm:block hidden text-[#646464] font-[600]">
                  Jobs per page
                </p>
              </div>

              <div
                className="flex items-center"
                style={{ radious: "0px 0px 16px 16px" }}
              >
                <div className="mr-4">{miniLoading && <MiniLoader />}</div>

                <p className="text-[14px] text-[#646464] font-[500]">
                  pages
                  <span className="text-[#333] px-[10px] font-[600]">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="text-[#333] px-[10px]  font-[600]">
                    {totalPages}
                  </span>
                </p>
                <button disabled={currentPage === 1}>
                  <svg
                    onClick={(e) => prevPage(e)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2529_10517)">
                      <path
                        d="M15 6L9 12L15 18"
                        stroke={currentPage !== 1 ? "#333333" : "#646464"}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2529_10517">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <button disabled={currentPage === totalPages}>
                  <svg
                    width="25"
                    height="24"
                    onClick={(e) => nextPage(e)}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2529_10530)">
                      <path
                        d="M9.375 6L15.625 12L9.375 18"
                        stroke={currentPage !== totalPages ? "#333333" : "#646464"}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2529_10530">
                        <rect width="25" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          }
        </>
        :
        <NoJobs />
      }
    </div>
  );
}

export default AllJobCard;
