import React, { useEffect } from "react";
import TopCompanies from "./topCompanies";
import RecommendedJobs from "../jobs/recommendedJobs";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppliedJob,
  fetchSavedJobIds,
} from "../../../../Redux/slices/jobSlice";

function MiddleSection() {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { appliedJobData, savedJobIds } = useSelector(
    (state) => state.job.jobData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSavedJobIds(userDataGlobal?._id));
    dispatch(fetchAppliedJob(userDataGlobal?._id));
  }, []);

  const router = useRouter();
  const posters = [
    {
      title: "Craft a Winning CV in Minutes with AI",
      description:
        "Don't let a subpar CV hold you back. Our AI-powered CV builder creates professional, impactful CVs that land you interviews.",
      path: "/createResume/BuildResume",
      img: "/images/jobs/posters/poster1.png",
      isBgImg: false,

      background:
        " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      backgroundImg: "",
      no: 2,
      page: 1,
      isCircle: true,
    },
    {
      title: "Skill Assessment",
      description:
        "Uncover Your Potential with Effortless Skill Assessment. Elevate Your Abilities, Elevate Your Success!",
      path: "/candidate/SkillAssessment",
      img: "/images/jobs/posters/poster2.png",
      background:
        " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      backgroundImg: "/images/jobs/posters/bg1.png",
      isBgImg: true,

      no: 2,
      page: 2,
    },
    {
      title: "Contact",
      description: "Get in touch with us",
      path: "/contact",
      background:
        " linear-gradient(178.88deg, #FFFFFF -24.19%, #FFDF9B 131.8%)",
      img: "/images/jobs/posters/poster3.png",
      backgroundImg: "/images/jobs/posters/bg2.png",
      isBgImg: true,

      no: 2,
      page: 3,
    },
  ];
  return (
    <div className="flex flex-col gap-5 w-full ml:max-w-[548px]">
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/jobs/candidate/AppliedJobs")}
          className="flex gap-1 rounded-[6px] px-2 py-2 sm:px-4 sm:py-2 border border-[#C7C7C780] bg-[#FFFFFF] text-[12px] sm:text-[14px] font-[600] items-center leading-tight"
        >
          <svg
            width="20"
            height="20"
            className="sm:w-6 sm:h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.3333 6.16801H16.1667V5.33465C16.1667 4.41547 15.4192 3.66797 14.5 3.66797H9.5C8.58082 3.66797 7.83332 4.41543 7.83332 5.33465V6.16797H3.66668C2.74746 6.16801 2 6.91547 2 7.83465V10.3346C2 11.2539 2.74746 12.0013 3.66668 12.0013H10.3334V11.5846C10.3334 11.3543 10.5197 11.168 10.75 11.168H13.25C13.4804 11.168 13.6667 11.3543 13.6667 11.5846V12.0013H20.3334C21.2525 12.0013 22 11.2539 22 10.3346V7.83465C22 6.91547 21.2525 6.16801 20.3333 6.16801ZM14.5 6.16801H9.5V5.33465H14.5V6.16801Z"
              fill="#06A9EF"
            />
            <path
              d="M21.7689 12.4503C21.6269 12.3799 21.4572 12.3962 21.3318 12.4913C21.0356 12.7156 20.6905 12.834 20.3333 12.834H13.6667V14.084C13.6667 14.3143 13.4803 14.5006 13.25 14.5006H10.75C10.5197 14.5006 10.3333 14.3143 10.3333 14.084V12.834H3.66668C3.30941 12.834 2.96438 12.7156 2.66813 12.4913C2.54238 12.3953 2.37312 12.379 2.23109 12.4503C2.08953 12.5207 2 12.6651 2 12.8234V18.6673C2 19.5865 2.74746 20.334 3.66668 20.334H20.3334C21.2525 20.334 22 19.5865 22 18.6673V12.8234C22 12.6651 21.9105 12.5207 21.7689 12.4503Z"
              fill="#06A9EF"
            />
          </svg>
          Applied Jobs ({appliedJobData?.length})
        </button>

        <button
          onClick={() => router.push("/jobs/candidate/SavedJobs")}
          className="flex gap-1 rounded-[6px] px-2 py-2 sm:px-4 sm:py-2 border border-[#C7C7C780] bg-[#FFFFFF] text-[12px] sm:text-[14px] font-[600] items-center"
        >
          <svg
            width="20"
            height="20"
            className="sm:w-6 sm:h-6"
            viewBox="0 0 19 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.9317 1.71484H3.70193C2.60877 1.71484 1.71436 2.60925 1.71436 3.70242V21.044C1.71436 21.5161 1.98765 21.9633 2.41001 22.1621C2.85721 22.3608 3.35411 22.3111 3.72678 22.013L3.75162 21.9881L9.31684 17.2925L14.8821 21.9881L14.9069 22.013C15.1305 22.1869 15.4038 22.2863 15.6771 22.2863C15.851 22.2863 16.0498 22.2366 16.2237 22.1372C16.646 21.9384 16.9193 21.4912 16.9193 21.0192V3.70242C16.9193 2.60925 16.0249 1.71484 14.9317 1.71484Z"
              fill="#06A9EF"
            />
          </svg>
          Saved Jobs ({savedJobIds?.length})
        </button>
      </div>
      <div
        style={{
          background: posters[0].isBgImg
            ? `url(${posters[0].backgroundImg}) center/cover no-repeat`
            : posters[0].background,
        }}
        className="p-[16px] flex   sm:flex-row flex-col-reverse items-center relative scr1100:gap-[80px] gap-8  justify-between posters[0]s-center  rounded-[12px]  min-h-[169px] overflow-hidden "
      >
        <div className="flex flex-col gap-2 sm:posters[0]s-start posters[0]s-center justify-between sm:items-start items-center h-full">
          <div className="flex flex-col gap-2 sm:posters[0]s-start posters[0]s-center  ">
            <p className=" text-[16px] font-[600] sm:text-start text-center">
              {posters[0]?.title}
            </p>
            <p className="text-[10px] font-[500] sm:text-start text-center">
              {" "}
              {posters[0]?.description}
            </p>
          </div>
          <button
            onClick={() => router.push(posters[0].path)}
            className="scr1100:py-3 max-w-[155px] scr1100:px-9 px-6 py-2 text-[#FFFFFF] bg-blue text-[14px] leading-tight font-[600] rounded-[30px] scr1100:h-[42px] h-[34px] scr1100:w-[155px]"
          >
            Know More
          </button>
        </div>
        {posters[0]?.isCircle && (
          <div
            style={{
              background:
                "linear-gradient(249.4deg, #FCE1AA 10.64%, #FFE8B5 98.56%)",
            }}
            className=" h-[206px] w-[206px] rounded-[206px] absolute right-[-50px] top-[-20px]   sm:block hidden"
          ></div>
        )}
        <img
          src={posters[0]?.img}
          alt=""
          className="h-[118px] w-[118px]  object-cover z-[10]"
        />
      </div>
      <TopCompanies />
      <div
        style={{
          background: posters[1].isBgImg
            ? `url(${posters[1].backgroundImg}) center/cover no-repeat`
            : posters[0].background,
        }}
        className="p-[16px] flex items-center sm:flex-row flex-col-reverse relative scr1100:gap-[80px] gap-8  justify-between posters[0]s-center  rounded-[12px]  min-h-[169px] overflow-hidden "
      >
        <div className="flex flex-col gap-2 sm:posters[0]s-start posters[0]s-center justify-between sm:items-start items-center h-full">
          <div className="flex flex-col gap-2 sm:posters[0]s-start posters[0]s-center ">
            <p className=" text-[16px] font-[600] sm:text-start text-center">
              {posters[1]?.title}
            </p>
            <p className="text-[10px] font-[500] sm:text-start text-center">
              {" "}
              {posters[1]?.description}
            </p>
          </div>
          <button
            onClick={() => router.push(posters[1].path)}
            className=" max-w-[155px] scr1100:py-3 scr1100:px-9 px-6 py-2 text-[#FFFFFF] bg-blue text-[14px] leading-tight font-[600] rounded-[30px] scr1100:h-[42px] h-[34px] scr1100:w-[155px]"
          >
            Know More
          </button>
        </div>

        <img
          src={posters[1]?.img}
          alt=""
          className="h-[118px] w-[118px]  object-cover z-[10]"
        />
      </div>
      <RecommendedJobs />
    </div>
  );
}

export default MiddleSection;
