import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-toastify";
import { CountPostingDays } from "../../../../utils/data";
import MiniLoader from "../../../common/miniLoader";
import { fetchSavedJobIds } from "../../../../Redux/slices/jobSlice";
import NormalJobCard from "./NormalJobCard";
import NoJobs from "./noJobs";
import CustomPagination from "../../../common/CustomPagination";
function AllJobCard({
  setMiniloading,
  miniLoading,
  loading,
  setLimit,
  limit,
  totalPages,
  page,
  setPage,
  jobData,
  totalCount,
}) {
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
      description:
        "Don't let a subpar CV hold you back. Our AI-powered CV builder creates professional, impactful CVs that land you interviews.",
      path1: "/createResume/BuildResume",

      path2: "/auth/Sign_in?role=user",
      img: "/images/jobs/posters/poster1.png",
      isBgImg: false,

      background:
        " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      backgroundImg: "",
      no: 2,
      page: 2,
      isCircle: true,
    },
    {
      title: "Skill Assessmentt",
      description:
        "Uncover Your Potential with Effortless Skill Assessment. Elevate Your Abilities, Elevate Your Success!",
      path1: "/candidate/SkillAssessment",
      path2: "/auth/Sign_in?role=user",
      img: "/images/jobs/posters/poster2.png",
      background:
        " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      backgroundImg: "/images/jobs/posters/bg1.png",
      isBgImg: true,

      no: 2,
      page: 3,
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      path1: "/contact",
      path2: "/auth/Sign_in?role=user",
      background:
        " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      img: "/images/jobs/posters/poster3.png",
      backgroundImg: "/images/jobs/posters/bg2.png",
      isBgImg: true,

      no: 2,
      page: 4,
    },
  ];
  const pagePoster = posters.find((poster) => poster.page === page);

  const combinedData = jobData?.reduce((acc, job, index) => {
    acc.push(job);

    if (pagePoster && index + 1 === pagePoster.no) {
      acc.push({ ...pagePoster, isPoster: true });
    }

    return acc;
  }, []);

  return (
    <div className="flex flex-col gap-4 w-full max-w-[548px] items-center">
      {loading ? (
        <div className="w-full max-w-[548px]">
          <div className="flex gap-4 flex-col w-full">
              {[1, 2, 3, 4,5].map((item, index) => (
                <div key={index} className="flex gap-4 flex-col w-full">
                  <div className="h-[169px] w-full max-w-[548px] bg-white rounded-[12px] p-4 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div className="skeleton-line h-[24px] max-w-[140px]"></div>
                      {/* <div className="skeleton-img h-[36px] w-[36px] rounded-[50%]"></div> */}
                    </div>

                    <div className="skeleton-subtitle h-[20px]"></div>
                    <div className="skeleton-line h-[20px] max-w-[70%]"></div>
                    <div className="skeleton-line h-[50px] w-full"></div>
                    <div className="skeleton-line h-[20px] max-w-[140px]"></div>
                  </div>
                </div>
              ))}
            </div>
        </div>
      ) : (
        <>
          {totalCount > 0 ? (
            <>
              <div className="flex flex-col gap-4 w-full">
                {combinedData?.map((item, index) => {
                  if (item._id) {
                    return (
                      <div key={index}>
                        <NormalJobCard item={item} />
                      </div>
                    );
                  } else {
                    return (
                      <div
                        style={{
                          background: item.isBgImg
                            ? `url(${item.backgroundImg}) center/cover no-repeat`
                            : item.background,
                        }}
                        key={index}
                        className="p-[16px] flex   sm:flex-row flex-col-reverse relative scr1100:gap-[80px] gap-8  justify-between items-center  rounded-[12px]  min-h-[169px] overflow-hidden "
                      >
                        <div className="flex flex-col gap-2 sm:items-start items-center justify-between h-full">
                          <div className="flex flex-col gap-2 sm:items-start items-center ">
                            <p className=" text-[16px] font-[600] sm:text-start text-center">
                              {item?.title}
                            </p>
                            <p className="text-[10px] font-[500] sm:text-start text-center">
                              {" "}
                              {item?.description}
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              router.push(
                                isLogin ? posters[0].path1 : posters[0].path2
                              )
                            }
                            className="  px-6  text-[#FFFFFF] bg-blue text-[14px] leading-tight font-[600] rounded-[30px]  h-[38px] w-[135px] bg_Button"
                          >
                            Know More
                          </button>
                        </div>
                        {item?.isCircle && (
                          <div
                            style={{
                              background:
                                "linear-gradient(249.4deg, #FCE1AA 10.64%, #FFE8B5 98.56%)",
                            }}
                            className=" h-[206px] w-[206px] rounded-[206px] absolute right-[-50px] top-[-20px]   sm:block hidden"
                          ></div>
                        )}
                        <img
                          src={item?.img}
                          alt=""
                          className="h-[118px] w-[118px]  object-cover z-[10]"
                        />
                      </div>
                    );
                  }
                })}
              </div>
            </>
          ) : (
            <NoJobs />
          )}

          {totalCount > 10 && (
            <CustomPagination
              setMiniloading={setMiniloading}
              miniLoading={miniLoading}
              setPage={setPage}
              title={"Jobs"}
              setLimit={setLimit}
              defaultLimit={10}
              totalPages={totalPages}
              limit={limit}
              page={page}
            />
          )}
        </>
      )}
    </div>
  );
}

export default AllJobCard;
