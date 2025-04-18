import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import MiniLoader from "../../components/common/miniLoader";
import { dateSeter } from "../../utils/middleware";
import CustomPagination from "../../components/common/CustomPagination";

const SelectPost = () => {
  const router = useRouter();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(true);
  const [jobPost, setJobPost] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [miniloading, setMiniloading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [searchTerm, setSearchTerm] = useState("");
  const [delayedSearchTerm, setDelayedSearchTerm] = useState("");
  const [select, setSelect] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [toggle, setToggle] = useState(0);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    description: "",
    jobTitle: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!data.jobTitle.trim()) {
      newErrors.jobTitle = "Job title is required";
    }

    if (!data.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const queryData = encodeURIComponent(JSON.stringify(data));
    router.push(`/JobMatching/matchJob?data=${queryData}`);
  };

  localStorage.setItem("jdApplicantFilenames", JSON.stringify(""));

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://jamblix.com/api/job/getByCreatedId/${userDataGlobal?._id}`,
        {
          params: {
            page,
            limit,
            search: delayedSearchTerm,
            status: filterStatus !== "All" ? filterStatus : undefined,
          },
        }
      );
      setJobPost(data);
      setTotalCount(data.totalCount);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching job posts:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDelayedSearchTerm(searchTerm);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    if (userDataGlobal?._id) {
      setLoading(true);
      getData();
    }
  }, [userDataGlobal, page, limit, delayedSearchTerm, filterStatus]);

  const statusPriority = {
    Live: 1,
    Hold: 2,
    Closed: 3,
  };

  const sortedJobs = Array.isArray(jobPost?.jobs)
    ? jobPost.jobs
      .filter((job) =>
        filterStatus === "All" ? true : job.status === filterStatus
      )
      .sort((a, b) => {
        const statusComparison =
          statusPriority[a.status] - statusPriority[b.status];

        if (statusComparison !== 0) {
          return statusComparison;
        }

        return new Date(b.createdAt) - new Date(a.createdAt);
      })
    : [];

  const isLive = (item) => {
    var date1 = new Date(item.deadLine);
    var date2 = new Date();

    date1.setHours(0, 0, 0, 0);
    date2.setHours(0, 0, 0, 0);

    if (date2 <= date1) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="bg-[#F9F9F9] xsm:w-[348px] w-[284px] flex rounded-[30px] text-[14px] font-semibold ">
        <button
          className={`${toggle === 0
              ? "bg-[#06A9EF] py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
              : "py-[8px] px-[28px] flex justify-center items-center rounded-[30px] w-[50%]"
            }`}
          onClick={() => setToggle(0)}
        >
          Select Job
        </button>
        <button
          className={`${toggle === 1
              ? "bg-[#06A9EF] py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%] text-white"
              : "py-[8px] px-[14px] flex justify-center items-center rounded-[30px] w-[50%]"
            }`}
          onClick={() => setToggle(1)}
        >
          Manual
        </button>
      </div>
      {toggle === 0 ? (
        <div className=" flex flex-col gap-[16px] pt-[14px] ">
          <div className="flex ml:flex-row flex-col gap-4 justify-between ml:items-center items-end w-full">
            <span className="text-[18px] font-[500] py-[8px] px-[12px]  w-full ">
              Select Job
            </span>

            <div className="flex gap-3">
              <div className="flex items-center gap-2  bg-[#ffffff]  text-white py-[8px] px-[12px] rounded-lg min-w-[190px]">
                <input
                  type="text"
                  placeholder="Enter Job Title"
                  className="bg-transparent text-black placeholder-[200] outline-none w-full text-[12px] font-medium"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <img
                  src="/images/employer/icon_search.png"
                  className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />
              </div>

              <div className="flex ms:flex-row flex-col-reverse gap-4  ms:items-center items-end justify-end relative h-[39.6px] outline-none">
                <select
                  className="text-[14px] font-medium text-[#333333] bg-white rounded-[8px] py-[8px] px-[12px] cursor-pointer h-[39.6px] outline-none"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <div className=" flex flex-row flex-wrap gap-x-[34px]  gap-y-[24px] ">
              {loading ? (
                
                  <div className="flex gap-[34px] flex-shrink-0 w-full col-span-4">
                    {[1, 2, 3].map((item, index) => (

                      <div key={index} className="h-[201px] w-full sm:w-[380px] bg-white rounded-[12px] p-4 flex flex-col gap-1">
                        <div className="flex justify-between">
                          <div className="skeleton-line h-[24px] max-w-[140px]"></div>
                          {/* <div className="skeleton-img h-[36px] w-[36px] rounded-[50%]"></div> */}
                        </div>

                        <div className="skeleton-subtitle h-[20px]"></div>
                        <div className="skeleton-line h-[20px] max-w-[70%]"></div>
                        <div className="skeleton-line h-[50px] w-full"></div>
                        <div className="skeleton-line h-[20px] max-w-[140px]"></div>
                      </div>

                    ))}
                
                </div>
              ) : (
                <>
                  {sortedJobs.length > 0 ? (
                    <>
                      {sortedJobs.map((item, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            router.push(
                              `/JobMatching/matchJob?selectedJob=${item?._id}`
                            )
                          }
                          className="flex w-full sm:w-[380px] py-3 px-4 md:py-4 md:px-6 flex-col items-start gap-3 flex-shrink-0 rounded-lg bg-white shadow-md col-span-4"
                        >
                          <div className="flex justify-between  w-[100%]">
                            <div className="flex justify-between gap-[20px] items-start">
                              <p className="text-[14px] font-[600]">
                                {item?.jobTitle}
                              </p>
                              <div className="flex gap-[3px] items-center">
                                {item.status === "Active" ? (
                                  <>
                                    <div className="w-[6px] h-[6px] bg-[#0C8A0A] rounded-full"></div>
                                    <div className="text-[12px] font-[500] text-[#0C8A0A]">
                                      Active
                                    </div>
                                  </>
                                ) : item.status === "Inactive" ? (
                                  <>
                                    <div className="w-[6px] h-[6px] bg-[#FF7802] rounded-full"></div>
                                    <div className="text-[12px] font-[500] text-[#FF7802]">
                                      Inactive
                                    </div>
                                  </>
                                ) : item.status === "Closed" ? (
                                  <>
                                    <div className="w-[6px] h-[6px] bg-[#B3261E] rounded-full"></div>
                                    <div className="text-[12px] font-[500] text-[#B3261E]">
                                      Closed
                                    </div>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>

                          <div className="flex w-[100%] justify-between items-center">
                            <p className="text-[#333] text-[18px] font-[600]">
                              Total Applications
                            </p>
                            <p className="text-[#333] items-center text-[36px] font-[600]">
                              {item?.totalApplications}
                            </p>
                          </div>

                          <div className="flex w-[100%] justify-between items-center">
                            <div className="flex flex-col items-start gap-[4px]">
                              <p className="text-[12px] font-[600] text-[#646464]">
                                Date Posted
                              </p>
                              <p className="text-[#333] font-[500] text-[12px]">
                                {new Date(item?.createdAt).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                            <div className="flex flex-col items-end gap-[4px]">
                              <p className="text-[12px] font-[600] text-[#646464]">
                                Due Date
                              </p>
                              <p className="text-[#333] font-[500] text-[12px]">
                                {new Date(item?.deadLine).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "2-digit",
                                    month: "short",
                                    year: "numeric",
                                  }
                                )}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-[10px] flex-wrap">
                            {item?.revalentExp && (
                              <div className="flex gap-[4px] items-center">
                                <div>
                                  <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M1.33073 11.7474C1.0099 11.7474 0.735243 11.6332 0.506771 11.4047C0.278299 11.1762 0.164062 10.9016 0.164062 10.5807V4.16406C0.164062 3.84323 0.278299 3.56858 0.506771 3.3401C0.735243 3.11163 1.0099 2.9974 1.33073 2.9974H3.66406V1.83073C3.66406 1.5099 3.7783 1.23524 4.00677 1.00677C4.23524 0.778299 4.5099 0.664062 4.83073 0.664062H7.16406C7.48489 0.664062 7.75955 0.778299 7.98802 1.00677C8.21649 1.23524 8.33073 1.5099 8.33073 1.83073V2.9974H10.6641C10.9849 2.9974 11.2595 3.11163 11.488 3.3401C11.7165 3.56858 11.8307 3.84323 11.8307 4.16406V10.5807C11.8307 10.9016 11.7165 11.1762 11.488 11.4047C11.2595 11.6332 10.9849 11.7474 10.6641 11.7474H1.33073ZM1.33073 10.5807H10.6641V4.16406H1.33073V10.5807ZM4.83073 2.9974H7.16406V1.83073H4.83073V2.9974Z"
                                      fill="#646464"
                                    />
                                  </svg>
                                </div>
                                <div className="text-[12px] font-[400]">
                                  {item?.revalentExp}
                                </div>
                              </div>
                            )}
                            {item?.revalentExp && (
                              <div className="border-[1px] border-[#AFAFAF]"></div>
                            )}
                            <div className="flex gap-[4px] items-center">
                              <div>
                                <svg
                                  width="10"
                                  height="13"
                                  viewBox="0 0 10 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M2.66927 11.1641H7.33594V9.41406C7.33594 8.7724 7.10746 8.22309 6.65052 7.76615C6.19358 7.3092 5.64427 7.08073 5.0026 7.08073C4.36094 7.08073 3.81163 7.3092 3.35469 7.76615C2.89774 8.22309 2.66927 8.7724 2.66927 9.41406V11.1641ZM5.0026 5.91406C5.64427 5.91406 6.19358 5.68559 6.65052 5.22865C7.10746 4.7717 7.33594 4.2224 7.33594 3.58073V1.83073H2.66927V3.58073C2.66927 4.2224 2.89774 4.7717 3.35469 5.22865C3.81163 5.68559 4.36094 5.91406 5.0026 5.91406ZM0.335938 12.3307V11.1641H1.5026V9.41406C1.5026 8.82101 1.64115 8.26441 1.91823 7.74427C2.19531 7.22413 2.58177 6.80851 3.0776 6.4974C2.58177 6.18629 2.19531 5.77066 1.91823 5.25052C1.64115 4.73038 1.5026 4.17378 1.5026 3.58073V1.83073H0.335938V0.664062H9.66927V1.83073H8.5026V3.58073C8.5026 4.17378 8.36406 4.73038 8.08698 5.25052C7.8099 5.77066 7.42344 6.18629 6.9276 6.4974C7.42344 6.80851 7.8099 7.22413 8.08698 7.74427C8.36406 8.26441 8.5026 8.82101 8.5026 9.41406V11.1641H9.66927V12.3307H0.335938Z"
                                    fill="#646464"
                                  />
                                </svg>
                              </div>
                              <div className="text-[12px] font-[400]">
                                {item?.jobType}
                              </div>
                            </div>
                            <div className="border-[1px] border-[#AFAFAF]"></div>
                            <div className="flex gap-[4px] items-center">
                              <div>
                                <svg
                                  width="10"
                                  height="13"
                                  viewBox="0 0 10 13"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M5.0026 6.4974C5.32344 6.4974 5.59809 6.38316 5.82656 6.15469C6.05503 5.92622 6.16927 5.65156 6.16927 5.33073C6.16927 5.0099 6.05503 4.73524 5.82656 4.50677C5.59809 4.2783 5.32344 4.16406 5.0026 4.16406C4.68177 4.16406 4.40712 4.2783 4.17865 4.50677C3.95017 4.73524 3.83594 5.0099 3.83594 5.33073C3.83594 5.65156 3.95017 5.92622 4.17865 6.15469C4.40712 6.38316 4.68177 6.4974 5.0026 6.4974ZM5.0026 10.7849C6.18871 9.69601 7.06858 8.70677 7.64219 7.81719C8.2158 6.9276 8.5026 6.13767 8.5026 5.4474C8.5026 4.38767 8.16476 3.51997 7.48906 2.84427C6.81337 2.16858 5.98455 1.83073 5.0026 1.83073C4.02066 1.83073 3.19184 2.16858 2.51615 2.84427C1.84045 3.51997 1.5026 4.38767 1.5026 5.4474C1.5026 6.13767 1.78941 6.9276 2.36302 7.81719C2.93663 8.70677 3.81649 9.69601 5.0026 10.7849ZM5.0026 12.3307C3.43733 10.9988 2.26823 9.76163 1.49531 8.61927C0.722396 7.47691 0.335938 6.41962 0.335938 5.4474C0.335938 3.98906 0.805035 2.82726 1.74323 1.96198C2.68142 1.0967 3.76788 0.664062 5.0026 0.664062C6.23733 0.664062 7.32378 1.0967 8.26198 1.96198C9.20017 2.82726 9.66927 3.98906 9.66927 5.4474C9.66927 6.41962 9.28281 7.47691 8.5099 8.61927C7.73698 9.76163 6.56788 10.9988 5.0026 12.3307Z"
                                    fill="#646464"
                                  />
                                </svg>
                              </div>
                              <div className="text-[12px] font-[400]">
                                {item?.location
                                  ?.filter((loc) => loc.trim() !== "")
                                  ?.map((loc) => {
                                    const firstWord = loc.split(" ")[0];
                                    return (
                                      firstWord.charAt(0).toUpperCase() +
                                      firstWord.slice(1).toLowerCase()
                                    );
                                  })
                                  .join(" ")}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="flex justify-center items-center text-xl pt-[100px]">
                      <img
                        className="w-[20%] min-w-[200px]"
                        src="/images/employer/OBJECTS.png"
                        alt="No data available"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            {totalCount > 9 ? (
              <>
                <div>
                  <CustomPagination
                    setMiniloading={setMiniloading}
                    miniLoading={miniloading}
                    setPage={setPage}
                    title={"Jobs"}
                    setLimit={setLimit}
                    defaultLimit={9}
                    totalPages={totalPages}
                    limit={limit}
                    page={page}
                  />
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="pt-[14px] flex flex-col gap-4">
          <div className="text-[18px] font-[500] py-2 px-3">Manual JD</div>
          <div className="w-full bg-[#FFFFFF] flex flex-col rounded-[16px] p-[16px] gap-[16px]">
            <div className="flex flex-col gap-[8px]">
              <div className="text-[14px] font-[500]">Job Title</div>
              <div>
                <input
                  type="text"
                  name="jobTitle"
                  value={data.jobTitle}
                  onChange={handleChange}
                  className={`border-[1px] rounded-[8px] p-[8px] w-full outline-none ${errors.jobTitle ? "border-red" : "border-[#DEDEDE]"
                    }`}
                  placeholder="Enter Job Title"
                />
              </div>{" "}
            </div>
            <div className="flex flex-col gap-[8px]">
              <div className="text-[14px] font-[500]">Job Description</div>
              <div>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className={`w-full h-[200px] border-[1px] rounded-[8px] p-4 outline-none ${errors.description ? "border-red" : "border-[#DEDEDE]"
                    }`}
                  placeholder="Enter description"
                ></textarea>
              </div>
            </div>
            <div className="flex justify-end gap-[16px] pt-[10px]">
              <button className=" px-[36px] rounded-[30px] blue_border_Button h-[38px] text-[14px] font-[600]">
                Reset
              </button>
              <button
                onClick={handleSubmit}
                className="px-[36px] rounded-[30px] h-[38px] bg_Button text-[#fff] text-[14px] font-[600]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectPost;
