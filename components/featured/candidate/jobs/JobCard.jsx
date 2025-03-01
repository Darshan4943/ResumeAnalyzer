import React, { useEffect, useState } from "react";
import { CountPostingDays } from "../../../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchUserData } from "../../../../Redux/slices/userSlice";
import { useRouter } from "next/router";
import { camelCase } from "../../../../utils/middleware";
function Job_card({
  jobData,
  setSaved,
  save,
  setSimilarJobsVisible,
  similarJobsVisible,
  getData,
}) {
  const [limitPopup, setLimitPopup] = useState(false);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  const isLogin = useSelector((state) => state.auth.isLogin);
  const router = useRouter();

  const jobApplyCount = localStorage.getItem("jobsApplyLimit");
  const dispatch = useDispatch();
  const SaveJob = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.post(
        `http://localhost:2000/api/saveJob/${userDataGlobal?._id}/${id}`
      );
      getData();
      setSaved((prevState) => !prevState);
      //  dispatch(fetchUserData());
      // setTimeout(() => {
      //
      // }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const removeSavedJob = async (e, id) => {
    e.stopPropagation();
    try {
      await axios.post(
        `http://localhost:2000/api/removeSavedJob/${userDataGlobal?._id}/${id}`
      );
      setSaved((prevState) => !prevState);
      getData();
      //  dispatch(fetchUserData());

      // setTimeout(() => {
      //
      // }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {jobData?.map((item, index) => (
        <div
          className={`p-2 scr700:p-[16px] flex flex-col gap-[8px] relative justify-between  rounded-[12px]   bg-[#FFFFFF]  `}
          style={{
            boxShadow: "0px 0px 14px 0px #00000005",
          }}
          key={index}
        >
          <div className=" flex flex-col gap-[8px] ">
            <div className="flex flex-row">
              <div className="flex flex-col gap-[4px] w-full">
                <div className="xxsm:text-[14px] sm:text-[14px] font-[600]">
                  {item?.jobTitle}
                </div>

                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    {
                      item.role === "employer" ?
                        router.push(`/jobs/candidate/aboutcompanies?createdBy=${item?.createdBy}&id=${item.companyId}&role=${item.role}`)
                        : router.push(`/jobs/candidate/aboutcompanies?companyName=${item?.companyName}&createdBy=${item?.createdBy}&role=${item.role}`)
                    }

                  }}
                  className="text-[12px] font-normal cursor-pointer w-fit"
                >
                  {item?.companyName}
                </div>
                {item?.role === "recruiter" &&
                  <div onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/jobs/candidate/aboutcompanies?createdBy=${item?.createdBy}&role=${item.role}&isRec=true`);

                  }} className="text-[12px] font-normal cursor-pointer w-fit">
                    posted by Recruiter ({camelCase(item?.createdByName)})
                  </div>
                }
              </div>
              {item?.logo && (
                <div className="flex flex-row  items-end">
                  <img
                    src={item?.logo}
                    alt=""
                    style={{
                      height: "56px",
                      width: "56px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-row gap-[11px] items-center leading-tight  flex-wrap ">
              {item?.experience && (
                <>
                  {" "}
                  <div className="flex flex-row gap-[4px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <g mask="url(#mask0_4135_57914)">
                        <path
                          d="M2.33073 12.7503C2.0099 12.7503 1.73524 12.6361 1.50677 12.4076C1.2783 12.1792 1.16406 11.9045 1.16406 11.5837V5.16701C1.16406 4.84617 1.2783 4.57152 1.50677 4.34305C1.73524 4.11458 2.0099 4.00034 2.33073 4.00034H4.66406V2.83367C4.66406 2.51284 4.7783 2.23819 5.00677 2.00972C5.23524 1.78124 5.5099 1.66701 5.83073 1.66701H8.16406C8.48489 1.66701 8.75955 1.78124 8.98802 2.00972C9.21649 2.23819 9.33073 2.51284 9.33073 2.83367V4.00034H11.6641C11.9849 4.00034 12.2595 4.11458 12.488 4.34305C12.7165 4.57152 12.8307 4.84617 12.8307 5.16701V11.5837C12.8307 11.9045 12.7165 12.1792 12.488 12.4076C12.2595 12.6361 11.9849 12.7503 11.6641 12.7503H2.33073ZM2.33073 11.5837H11.6641V5.16701H2.33073V11.5837ZM5.83073 4.00034H8.16406V2.83367H5.83073V4.00034Z"
                          fill="#646464"
                        />
                      </g>
                    </svg>

                    <div className="text-[#262626] text-[12px] font-[400] ">
                      {item.experience}
                    </div>
                  </div>
                  <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                </>
              )}
              {item?.jobType && (
                <>
                  <div className="flex flex-row gap-[4px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 14 15"
                      fill="none"
                    >
                      <g mask="url(#mask0_4135_57920)">
                        <path
                          d="M4.66732 12.167H9.33398V10.417C9.33398 9.77534 9.10551 9.22604 8.64857 8.76909C8.19162 8.31215 7.64232 8.08367 7.00065 8.08367C6.35898 8.08367 5.80968 8.31215 5.35273 8.76909C4.89579 9.22604 4.66732 9.77534 4.66732 10.417V12.167ZM7.00065 6.91701C7.64232 6.91701 8.19162 6.68854 8.64857 6.23159C9.10551 5.77465 9.33398 5.22534 9.33398 4.58367V2.83367H4.66732V4.58367C4.66732 5.22534 4.89579 5.77465 5.35273 6.23159C5.80968 6.68854 6.35898 6.91701 7.00065 6.91701ZM2.33398 13.3337V12.167H3.50065V10.417C3.50065 9.82395 3.63919 9.26735 3.91628 8.74722C4.19336 8.22708 4.57982 7.81145 5.07565 7.50034C4.57982 7.18923 4.19336 6.77361 3.91628 6.25347C3.63919 5.73333 3.50065 5.17673 3.50065 4.58367V2.83367H2.33398V1.66701H11.6673V2.83367H10.5007V4.58367C10.5007 5.17673 10.3621 5.73333 10.085 6.25347C9.80794 6.77361 9.42148 7.18923 8.92565 7.50034C9.42148 7.81145 9.80794 8.22708 10.085 8.74722C10.3621 9.26735 10.5007 9.82395 10.5007 10.417V12.167H11.6673V13.3337H2.33398Z"
                          fill="#646464"
                        />
                      </g>
                    </svg>
                    <div className="text-[#262626] text-[12px] font-[400]">
                      {item.jobType}
                    </div>
                  </div>
                  <div className="w-[1px] h-[12px] bg-[#AFAFAF]"></div>
                </>
              )}
              {item?.location && (
                <div className="flex flex-row gap-[4px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 14 15"
                    fill="none"
                  >
                    <g mask="url(#mask0_4135_57926)">
                      <path
                        d="M7.00065 7.50034C7.32148 7.50034 7.59614 7.38611 7.82461 7.15763C8.05308 6.92916 8.16732 6.65451 8.16732 6.33367C8.16732 6.01284 8.05308 5.73819 7.82461 5.50972C7.59614 5.28124 7.32148 5.16701 7.00065 5.16701C6.67982 5.16701 6.40516 5.28124 6.17669 5.50972C5.94822 5.73819 5.83398 6.01284 5.83398 6.33367C5.83398 6.65451 5.94822 6.92916 6.17669 7.15763C6.40516 7.38611 6.67982 7.50034 7.00065 7.50034ZM7.00065 11.7878C8.18676 10.699 9.06662 9.70972 9.64023 8.82013C10.2138 7.93055 10.5007 7.14062 10.5007 6.45034C10.5007 5.39062 10.1628 4.52291 9.48711 3.84722C8.81141 3.17152 7.9826 2.83367 7.00065 2.83367C6.01871 2.83367 5.18989 3.17152 4.51419 3.84722C3.8385 4.52291 3.50065 5.39062 3.50065 6.45034C3.50065 7.14062 3.78746 7.93055 4.36107 8.82013C4.93468 9.70972 5.81454 10.699 7.00065 11.7878ZM7.00065 13.3337C5.43537 12.0017 4.26628 10.7646 3.49336 9.62222C2.72044 8.47986 2.33398 7.42256 2.33398 6.45034C2.33398 4.99201 2.80308 3.8302 3.74128 2.96492C4.67947 2.09965 5.76593 1.66701 7.00065 1.66701C8.23537 1.66701 9.32183 2.09965 10.26 2.96492C11.1982 3.8302 11.6673 4.99201 11.6673 6.45034C11.6673 7.42256 11.2809 8.47986 10.5079 9.62222C9.73503 10.7646 8.56593 12.0017 7.00065 13.3337Z"
                        fill="#646464"
                      />
                    </g>
                  </svg>
                  <div className="text-[#262626] text-[12px] font-[400] ">
                    {item?.country?.join(", ")} {item?.country && "||"}{" "}
                    {item?.location?.join(", ")}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-row gap-[4px]">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <g mask="url(#mask0_4135_57931)">
                    <path
                      d="M4.375 10.675H9.625V9.45H4.375V10.675ZM4.375 8.225H9.625V7H4.375V8.225ZM3.0625 13.125C2.70156 13.125 2.39258 13.0051 2.13555 12.7652C1.87852 12.5253 1.75 12.2369 1.75 11.9V2.1C1.75 1.76313 1.87852 1.47474 2.13555 1.23484C2.39258 0.994948 2.70156 0.875 3.0625 0.875H8.3125L12.25 4.55V11.9C12.25 12.2369 12.1215 12.5253 11.8645 12.7652C11.6074 13.0051 11.2984 13.125 10.9375 13.125H3.0625ZM7.65625 5.1625V2.1H3.0625V11.9H10.9375V5.1625H7.65625Z"
                      fill="#646464"
                    />
                  </g>
                </svg>
              </div>
              <div className="text-[#262626] font-[400] text-[12px] h-[36px] overflow-hidden">
                {item?.description?.length > 100 ? (
                  <>
                    <div
                      className=""
                      dangerouslySetInnerHTML={{
                        __html: item.description.slice(0, 100),
                      }}
                    />
                    <span>...</span>
                  </>
                ) : (
                  <div
                    className=""
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center">
            {/* <div className="border border-[#B506EF] text-[#B506EF] rounded-[30px] flex gap-1 px-2 py-1 items-center text-[14px] font-medium">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">

                <g mask="url(#mask0_5959_78834)">
                  <path d="M8.4375 14.0625H7.5C7.34063 14.0625 7.20706 14.0086 7.09931 13.9007C6.99144 13.7928 6.9375 13.6592 6.9375 13.4998C6.9375 13.3403 6.99144 13.2067 7.09931 13.0991C7.20706 12.9914 7.34063 12.9375 7.5 12.9375H8.4375V11.0164C7.46438 10.875 6.65862 10.4344 6.02025 9.6945C5.38175 8.95463 5.0625 8.09044 5.0625 7.10194C5.0625 6.01256 5.44638 5.08781 6.21413 4.32769C6.982 3.56756 7.91062 3.1875 9 3.1875C10.0894 3.1875 11.018 3.56756 11.7859 4.32769C12.5536 5.08781 12.9375 6.01256 12.9375 7.10194C12.9375 8.09044 12.6182 8.95463 11.9797 9.6945C11.3414 10.4344 10.5356 10.875 9.5625 11.0164V12.9375H10.5C10.6594 12.9375 10.7929 12.9914 10.9007 13.0993C11.0086 13.2072 11.0625 13.3408 11.0625 13.5002C11.0625 13.6597 11.0086 13.7933 10.9007 13.9009C10.7929 14.0086 10.6594 14.0625 10.5 14.0625H9.5625V15C9.5625 15.1594 9.50856 15.2929 9.40069 15.4007C9.29281 15.5086 9.15919 15.5625 8.99981 15.5625C8.84031 15.5625 8.70675 15.5086 8.59912 15.4007C8.49137 15.2929 8.4375 15.1594 8.4375 15V14.0625ZM9.00113 9.9375C9.77825 9.9375 10.4411 9.66281 10.9897 9.11344C11.5382 8.56419 11.8125 7.901 11.8125 7.12388C11.8125 6.34675 11.5378 5.68388 10.9884 5.13525C10.4392 4.58675 9.776 4.3125 8.99888 4.3125C8.22175 4.3125 7.55888 4.58719 7.01025 5.13656C6.46175 5.68581 6.1875 6.349 6.1875 7.12613C6.1875 7.90325 6.46219 8.56612 7.01156 9.11475C7.56081 9.66325 8.224 9.9375 9.00113 9.9375Z" fill="#B506EF" />
                </g>
              </svg>

              Woman Candidate Preffered
            </div> */}
            <p
              onClick={() => setSimilarJobsVisible(!similarJobsVisible)}
              className="text-[14px] font-semibold text-[#06A9EF] cursor-pointer"
            >
              Find similar jobs openings
            </p>
          </div>

          <div className="bg-[#AFAFAF99] h-[1px] w-full my-1"></div>

          <div className="flex w-full  gap-2 flex-col scr700:flex-row justify-between items-center px-1 ">
            <div className="flex w-full flex-col scr390:flex-row gap-[6px] scr700:gap-3 justify-between scr700:justify-start items-start">
              {jobData?.some(
                (job) =>
                  job?.matchedApplication?.applicantId === userDataGlobal?._id
              ) && isLogin ? (
                <div className="text-[12px] text-[#333333] font-[500] font-Montserrat flex flex-row gap-1 scr700:gap-2 items-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_5716_127442)">
                      <path
                        d="M7.22917 18.5L5.66667 15.9167L2.72917 15.25L3 12.25L1 10L3 7.75L2.72917 4.75L5.66667 4.08333L7.22917 1.5L10 2.6875L12.7708 1.5L14.3333 4.08333L17.2708 4.75L17 7.75L19 10L17 12.25L17.2708 15.25L14.3333 15.9167L12.7708 18.5L10 17.3125L7.22917 18.5ZM7.83333 16.6042L10 15.6875L12.1667 16.6042L13.375 14.5833L15.6667 14.0625L15.4583 11.75L17 10L15.4583 8.25L15.6667 5.9375L13.375 5.41667L12.1667 3.39583L10 4.3125L7.83333 3.39583L6.625 5.41667L4.33333 5.91667L4.54167 8.25L3 10L4.5625 11.75L4.33333 14.0833L6.625 14.6042L7.83333 16.6042ZM8.9375 13L13.8958 8.0625L12.8333 7L8.9375 10.875L7.16667 9.125L6.10417 10.1875L8.9375 13Z"
                        fill="#0C8A0A"
                      />
                    </g>
                  </svg>
                  Applied
                  <div className="text-[12px] text-[#646464] font-[500] font-Montserrat flex flex-row gap-2 items-center">
                    {CountPostingDays(
                      jobData[0]?.matchedApplication?.appliedOn
                    ) || ""}
                  </div>
                </div>
              ) : (
                <div className="text-[12px] text-[#646464] font-[500] font-Montserrat">
                  Posted : {CountPostingDays(item.createdAt)}
                </div>
              )}
              <div className="flex gap-[6px] scr700:gap-3">
                <div className="text-[12px] text-[#646464] font-[500] font-Montserrat">
                  Applicants : {jobData[0]?.totalApplicationCount}
                </div>
                {jobData[0]?.openPositions && (
                  <div className="text-[12px] text-[#646464] font-[500] font-Montserrat">
                    Openings: {jobData[0]?.openPositions}
                  </div>
                )}
              </div>
            </div>
            <div className="flex w-full scr700:w-[250px] justify-end gap-2 h-[42px]">
              {isLogin && (
                <div>
                  {item?.isSaved ? (
                    <button
                      onClick={(e) => removeSavedJob(e, item._id)}
                      className="border border-[#AFAFAF99] rounded-[30px] text-[14px] font-[600] px-9 py-3  leading-tight text-[#AFAFAF99]"
                    >
                      Saved
                    </button>
                  ) : (
                    <button
                      onClick={(e) => SaveJob(e, item._id)}
                      className="border border-blue rounded-[30px] text-[14px] font-[600] px-9 py-3  leading-tight"
                    >
                      Save
                    </button>
                  )}
                </div>
              )}
              <button
                disabled={
                  (jobData?.some(
                    (job) =>
                      job?.matchedApplication?.applicantId ===
                      userDataGlobal?._id
                  ) &&
                    isLogin) ||
                  item?.status === "Hold"
                }
                onClick={() => {
                  if (isLogin) {
                    if (jobApplyCount > 0) {
                      if (
                        !jobData?.some(
                          (job) =>
                            job?.matchedApplication?.applicantId ===
                            userDataGlobal?._id
                        )
                      ) {
                        router.push(`/jobs/candidate/ApplyForm?id=${item._id}`);
                      }
                    } else {
                      router.push(`/jobs/candidate/ApplyForm?id=${item._id}`);
                      // setLimitPopup(true);
                    }
                  } else {
                    router.push(`/jobs/easyApply?id=${item._id}`);
                  }
                }}
                className={`text-[14px] font-[600] text-[#fff] flex items-center bg-[#06A9EF] py-[12px] px-[36px] rounded-[30px] ${(jobData?.some(
                  (job) =>
                    job?.matchedApplication?.applicantId ===
                    userDataGlobal?._id
                ) &&
                  isLogin) ||
                  item.status === "Hold"
                  ? "cursor-not-allowed"
                  : " cursor-pointer"
                  }`}
              >
                {jobData?.some(
                  (job) =>
                    job?.matchedApplication?.applicantId === userDataGlobal?._id
                ) && isLogin
                  ? "Applied"
                  : "Apply"}
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default Job_card;
