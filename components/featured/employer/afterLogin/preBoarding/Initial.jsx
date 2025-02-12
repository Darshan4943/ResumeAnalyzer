import React, { useCallback, useEffect, useState } from "react";
import StartPreboarding from "./StartPreboarding";
import { applicantsMobile } from "../../../../../utils/preboardArray";
import { TablePagination } from "@mui/material";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSelector } from "react-redux";
import CustomPagination from "../../../../common/CustomPagination";
import { toast } from "react-toastify";

const Initial = ({ setToggle, setHeadings, headings }) => {
  const [page, setPage] = useState(0);
  const [startPreboarding, setStartPreboarding] = useState(false);
  const [openSort, setOpenSort] = useState(false);
  const [checkedjob, setCheckedJob] = useState({});
  const [applicant, selectedApplicant] = useState();
  const [openThreeDots, setOpenThreeDts] = useState(false);
  const [limit, setLimit] = useState(10);
  const [miniLoading, setMiniloading] = useState(true);
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [searchQuery, setSearchQuery] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const fetchJobs = useCallback(async () => {
    if (!userDataGlobal?._id) return;

    setMiniloading(true);
    try {
      const response = await axios.get(
        `http://localhost:2000/api/getInPreboadingCandidates/${userDataGlobal._id}`,
        {
          params: {
            page: page,
            limit: limit,
            search: searchQuery.trim(),
          },
        }
      );

      setJobs(response.data.applications || []);
      setTotalCount(response.data.pagination?.totalApplications || 0);
      setTotalPages(response.data.pagination?.totalPages || 0);

      toast.dismiss();
    } catch (err) {
      console.error("Error fetching job applications:", err);
      toast.error("Failed to fetch job applications. Please try again later.");
    } finally {
      setMiniloading(false);
    }
  }, [userDataGlobal?._id, page, limit, searchQuery, isUpdate]);

  useEffect(() => {
    if (userDataGlobal?._id) {
      fetchJobs();
    }
  }, [fetchJobs, limit, page]);

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
          `http://localhost:2000/api/jobs/getDistinctJobTitlesAndLocations/${userDataGlobal?._id}`
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
              setIsUpdate={setIsUpdate}
              isUpdate={isUpdate}
            />
          </div>
        </>
      )}
      <div className="web w-full">
        <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px] mb-6">
          <div className="w-full flex items-center justify-between  border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
            <div
              className="flex py-3 px-4 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
              style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
            >
              <img
                src="/images/employer/icon_search.png"
                className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                alt=""
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full"
              />
            </div>
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
            {jobs.map((job, index) => (
              <>
                <div
                  className={`flex w-[100%] border-b border-[#D4D4D480] p-[16px] justify-between items-center ${
                    checkedjob[index]
                      ? "bg-[#D3F1FF]"
                      : "bg-[#FFFFFF] hover:bg-[#D3F1FF]"
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
                        {job.jobTitle}
                      </p>
                    </div>
                    <div className="flex items-center justify-start col-span-1">
                      <p className="text-[12px] font-[500] text-[#333333] font-Montserrat"></p>
                    </div>
                    <div className="flex items-center justify-start col-span-1 pl-5">
                      <div
                        className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${
                          checkedjob[index]
                            ? "bg-[#FFFFFF]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Pending"
                            ? "bg-[#FFF9ED]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Initiated"
                            ? "bg-[#E7F8FF]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Hired"
                            ? "bg-[#E8FFE8]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Rejected"
                            ? "bg-[#FFE6E2]"
                            : ""
                        } ${
                          job?.preboardingDetails?.preboardingStatus ===
                          "Pending"
                            ? "text-[#FFB836]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Initiated"
                            ? "text-[#06A9EF]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Hired"
                            ? "text-[#0C8A0A]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Rejected"
                            ? "text-[#FF6550]"
                            : "text-[#333333]"
                        }`}
                      >
                        {job?.preboardingDetails?.preboardingStatus}
                      </div>
                    </div>
                    <div className="flex items-center justify-start col-span-1 ">
                      <div className="flex   items-center w-full  justify-between">
                        <div key={index}>
                          {job?.preboardingDetails?.preboardingStatus ===
                          "Initiated" ? (
                            <div className="flex lg:py-[6px] lg:px-2 xxlg:px-14  px-1 py-1 justify-center items-center content-center rounded-[30px] border border-[#DEDEDE]  text-[#DEDEDE] lg:text-[12px] xxlg:text-[14px] text-[10px] font-[600] font-Montserrat">
                              Initiated
                            </div>
                          ) : job?.preboardingDetails?.preboardingStatus ===
                            "Hired" ? (
                            <div className="flex lg:py-[6px] lg:px-2 xxlg:px-14  px-1 py-1 justify-center items-center content-center rounded-[30px] border border-[#DEDEDE]  text-[#DEDEDE] lg:text-[12px] xxlg:text-[14px] text-[10px] font-[600] font-Montserrat">
                              Hired
                            </div>
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
        {totalCount > 9 && (
          <CustomPagination
            setMiniloading={setMiniloading}
            miniLoading={miniLoading}
            setPage={setPage}
            title={"preboarding"}
            setLimit={setLimit}
            defaultLimit={2}
            totalPages={totalPages}
            limit={limit}
            page={page}
          />
        )}
      </div>

      <div className="mobile relative overflow-y-scroll  w-full">
        <div className="sticky top-0">
          <div className="w-full flex items-center justify-between  border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
            <div
              className="flex py-3 px-4 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
              style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
            >
              <img
                src="/images/employer/icon_search.png"
                className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                alt=""
              />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                type="text"
                placeholder="Search"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-4 items-start bg-[#fff] p-4 overflow-y-auto w-full">
            {jobs.map((job, index) => (
              <div
                key={index}
                className="flex w-full p-2 justify-between items-center rounded-xl bg-[#fff]"
                style={{ boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)" }}
              >
                <div className="w-full flex flex-col justify-center gap-4 items-start">
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-10 h-10"
                        src="/images/profile/john_doe.png"
                        alt="Profile"
                      />
                      <p className="text-[14px] text-[#333] font-[600]">
                        {job.details.personal.firstName
                          ? `${job.details.personal.firstName} ${job.details.personal.lastName}`
                          : "-"}
                      </p>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <g clipPath="url(#clip0_7540_117410)">
                          <path
                            d="M11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5Z"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19Z"
                            stroke="#333"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
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

                  <div className="flex justify-between items-center w-full">
                    <p className="text-[14px] text-[#646464] font-[500]">
                      Job Role
                    </p>
                    <p className="text-[14px] text-[#333] font-semibold">
                      {job.jobTitle}
                    </p>
                  </div>
                  {/* <div className="flex justify-between items-center w-full">
                    <p className="text-[14px] text-[#646464] font-[500]">
                      Recruiter
                    </p>
                    <p className="text-[14px] text-[#333] font-semibold">
                      {job.role}
                    </p>
                  </div> */}

                  <div className="flex justify-between items-center w-full">
                  <p className="text-[14px] text-[#646464] font-[500]">
                     Preboarding Status
                    </p>
                    <p className="text-[14px] text-[#646464] font-[500]">
                      {job.proboard}
                    </p>
                    <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00]">
                      <p
                        className={`text-[#FF7A00] font-semibold text-[14px] ${
                          job?.preboardingDetails?.preboardingStatus ===
                          "Pending"
                            ? "bg-[#FFF9ED] text-[#FFB836]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Initiated"
                            ? " text-[#06A9EF]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Hired"
                            ? " text-[#0C8A0A]"
                            : job?.preboardingDetails?.preboardingStatus ===
                              "Rejected"
                            ? " text-[#FF6550]"
                            : "text-[#333]"
                        }`}
                      >
                        {job?.preboardingDetails?.preboardingStatus}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center w-full">
                    {job?.preboardingDetails?.preboardingStatus ===
                      "Initiated" ||
                    job?.preboardingDetails?.preboardingStatus === "Hired" ? (
                      <div className="flex w-[120px] h-[40px] justify-center items-center rounded-[30px] border border-[#DEDEDE] text-[#DEDEDE] font-semibold text-[14px]">
                        {job?.preboardingDetails?.preboardingStatus}
                      </div>
                    ) : (
                      <button
                        onClick={() => {
                          setStartPreboarding(true);
                          selectedApplicant(job);
                        }}
                        className="flex w-[140px] h-[40px] justify-center items-center gap-2 rounded-[30px] border border-[#06A9EF] bg-[#06A9EF] text-white font-semibold text-[14px]"
                      >
                        Start Preboarding
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {totalCount > 9 && (
          <CustomPagination
            setMiniloading={setMiniloading}
            miniLoading={miniLoading}
            setPage={setPage}
            title={"preboarding"}
            setLimit={setLimit}
            defaultLimit={2}
            totalPages={totalPages}
            limit={limit}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default Initial;
