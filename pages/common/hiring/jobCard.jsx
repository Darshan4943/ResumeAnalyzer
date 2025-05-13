import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import MiniLoader from "../../../components/common/miniLoader";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import CustomPagination from "../../../components/common/CustomPagination";
import { toast } from "react-toastify";
import CopyLink from "../../../components/common/copyLink";

const JobCard = ({ filters, setFilters }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState();
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [totalPages, setTotalPages] = useState();
  const [totalCount, setTotalCount] = useState(0);
  const [miniloading, setMiniloading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(9);
  const [statusToggle, setStatusToggle] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [deletePopup, setDeletePopup] = useState(false);

  const router = useRouter();
  useEffect(() => {
    if (userDataGlobal && userDataGlobal?._id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);

  const fetchJobs = async () => {
    try {
      const response = await axios.get(
        `https://jamblix.com/api/job/getAllJobDetails/${id}`,
        {
          params: { page, limit, ...filters },
        }
      );
      const { jobs, pagination } = response.data;
      setData(jobs);
      setTimeout(() => {
        setLoading(false);
        setMiniloading(false);
      }, 500);
      setTotalCount(pagination.totalCount);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error.message || error);
      setTimeout(() => {
        setMiniloading(false);
        setLoading(false);
      }, 500);
    }
  };
  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchJobs();
    }
  }, [id, filters]);

  useEffect(() => {
    if (id) {
      setMiniloading(true);
      fetchJobs();
    }
  }, [limit, page]);

  const handleClick = (jobId) => {
    const link = `https://www.skilotech.com/jobs/candidate/JobDetails?id=${jobId}&isShared=true`;
    setCopied(false);
    setGeneratedLink(link);
    setShowPopup(true);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
  };
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
        // setStatusToggle({})
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowPopup]);
  const hasLongTitle = data?.some((job) => job?.jobTitle?.length > 20);

  const handleChangeStatus = async (id, newStatus) => {
    try {
      if (!id) {
        toast.error("Job ID is missing!");
        return;
      }

      const response = await axios.post(
        `https://jamblix.com/api/job/handleChangeStatus`,
        { jobId: id, status: newStatus }
      );

      if (response.data.success) {
        toast.success("Job status updated successfully");
        setStatusToggle({});
        fetchJobs();
      } else {
        toast.error(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating job status:", error);
      toast.error("Error updating job status. Please try again.");
    }
  };

  const handleToggle = (jobId) => {
    setStatusToggle((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const handleOpenDeletePopup = (jobId) => {
    setSelectedJobId(jobId);
    setDeletePopup(true);
  };

  const handleDelete = async () => {
    try {
      const response = await axios.post(
        `https://jamblix.com/api/jobs/deletejob/${selectedJobId}`
      );

      if (response.data.success) {
        fetchJobs();
        toast.success("Job deleted successfully");
      } else {
        toast.error(response.data.message || "Failed to delete the job");
      }
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Error deleting the job. Please try again.");
    } finally {
      setDeletePopup(false);
      setSelectedJobId(null);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="flex gap-4 flex-shrink-0 w-full col-span-4">
          {[1, 2, 3].map((item, index) => (
            <div
              key={index}
              className="h-[192px] w-full sm:w-[380px] bg-white rounded-[12px] p-4 flex flex-col gap-1"
            >
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
          {data?.length === 0 ? (
            <div className="p-12  flex items-center justify-center">
              <img
                className="w-[20%] min-w-[200px]"
                src="/images/employer/OBJECTS.png"
                alt="No data available"
              />
            </div>
          ) : (
            <div className=" flex flex-wrap justify-center md:justify-start cursor-pointer  gap-5">
              {data?.map((job, index) => (
                <div
                  key={index}
                  onClick={() =>
                    router.push(`/common/hiring/JobPost?id=${job._id}`)
                  }
                  className="flex w-full sm:w-[380px] py-[12px] px-[16px] md:py-[16px] md:px-[24px] flex-col items-start gap-[12px] flex-shrink-0 rounded-lg bg-[#fff] shadow-md col-span-4"
                >
                  <div
                    className={`flex justify-between w-[100%] gap-2 ${
                      hasLongTitle ? "h-[42px]" : ""
                    }`}
                  >
                    <div
                      className={`flex justify-between ${
                        job?.jobTitle?.length > 35 && "group"
                      } relative gap-[20px] items-start`}
                    >
                      <p className="text-[14px] font-[600]">
                        {job?.jobTitle?.length > 35
                          ? `${job.jobTitle.slice(0, 35)} ...`
                          : job.jobTitle}
                      </p>
                      <div className="absolute text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100  word-break top-[20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                        {job.jobTitle}
                      </div>

                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggle(job._id);
                        }}
                        className="flex gap-[3px] items-center relative"
                      >
                        {job.status === "Active" ? (
                          <>
                            <div className="min-w-[6px] h-[6px] bg-[#0C8A0A] rounded-full"></div>
                            <div className="text-[12px] font-[500] text-[#0C8A0A]">
                              Active
                            </div>
                          </>
                        ) : job.status === "Inactive" ? (
                          <>
                            <div className="min-w-[6px] h-[6px] bg-[#FF7802] rounded-full"></div>
                            <div className="text-[12px] font-[500] text-[#FF7802]">
                              Inactive
                            </div>
                          </>
                        ) : job.status === "Closed" ? (
                          <>
                            <div className="min-w-[6px] h-[6px] bg-[#B3261E] rounded-full"></div>
                            <div className="text-[12px] font-[500] text-[#B3261E]">
                              Closed
                            </div>
                          </>
                        ) : null}
                        <svg
                          className={statusToggle[job._id] ? "rotate-180" : ""}
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g mask="url(#mask0_9445_111500)">
                            <path
                              d="M8.00366 11.0213C7.88316 11.0213 7.771 11.002 7.66716 10.9635C7.56333 10.925 7.46458 10.859 7.37091 10.7655L2.87666 6.27125C2.73833 6.13275 2.6675 5.95867 2.66416 5.749C2.661 5.5395 2.73183 5.36225 2.87666 5.21725C3.02166 5.07242 3.19733 5 3.40366 5C3.61 5 3.78566 5.07242 3.93066 5.21725L8.00366 9.2905L12.0767 5.21725C12.2152 5.07892 12.3892 5.00808 12.5989 5.00475C12.8084 5.00158 12.9857 5.07242 13.1307 5.21725C13.2755 5.36225 13.3479 5.53792 13.3479 5.74425C13.3479 5.95058 13.2755 6.12625 13.1307 6.27125L8.63641 10.7655C8.54275 10.859 8.444 10.925 8.34016 10.9635C8.23633 11.002 8.12416 11.0213 8.00366 11.0213Z"
                              fill="#646464"
                            />
                          </g>
                        </svg>
                        {statusToggle[job._id] && (
                          <div
                            ref={popupRef}
                            className="absolute top-5 z-[3000] bg-white rounded-[6px] shadow-md py-1"
                          >
                            <p
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus(job._id, "Active");
                              }}
                              className={`${
                                job.status === "Active" ? "hidden" : "block"
                              } text-[12px] font-[500] text-[#0C8A0A] hover:bg-[#ccffcb] px-4 cursor-pointer`}
                            >
                              Active
                            </p>
                            <p
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus(job._id, "Inactive");
                              }}
                              className={`${
                                job.status === "Inactive" ? "hidden" : "block"
                              } text-[12px] font-[500] text-[#FF7802] hover:bg-[#ffffe5] px-4 cursor-pointer`}
                            >
                              Inactive
                            </p>
                            <p
                              onClick={(e) => {
                                e.stopPropagation();
                                handleChangeStatus(job._id, "Closed");
                              }}
                              className={`${
                                job.status === "Closed" ? "hidden" : "block"
                              } text-[12px] font-[500] text-[#B3261E] hover:bg-[#ffe2e1] px-4 cursor-pointer`}
                            >
                              Closed
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-[6px] cursor-pointer">
                      <svg
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClick(job._id);
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_6706_100913)">
                          <path
                            d="M14.0072 17.9154C13.3834 17.9154 12.8539 17.6972 12.4184 17.261C11.9832 16.8247 11.7655 16.295 11.7655 15.6718C11.7655 15.5885 11.7943 15.386 11.852 15.0643L5.92573 11.5756C5.7249 11.7839 5.48628 11.9471 5.2099 12.0652C4.93351 12.1832 4.6374 12.2422 4.32156 12.2422C3.70059 12.2422 3.17274 12.0232 2.73802 11.5852C2.3033 11.1471 2.08594 10.6183 2.08594 9.9987C2.08594 9.37911 2.3033 8.85029 2.73802 8.41224C3.17274 7.97418 3.70059 7.75516 4.32156 7.75516C4.6374 7.75516 4.93351 7.81418 5.2099 7.93224C5.48628 8.05029 5.7249 8.21349 5.92573 8.42182L11.852 4.94099C11.8189 4.83849 11.7962 4.73807 11.7839 4.63974C11.7716 4.54141 11.7655 4.43668 11.7655 4.32557C11.7655 3.70238 11.9838 3.17266 12.4203 2.73641C12.857 2.30016 13.3872 2.08203 14.0109 2.08203C14.6347 2.08203 15.1642 2.30036 15.5995 2.73703C16.0349 3.17356 16.2526 3.7037 16.2526 4.32745C16.2526 4.9512 16.0345 5.48078 15.5982 5.9162C15.162 6.35148 14.6323 6.56911 14.0091 6.56911C13.6917 6.56911 13.3966 6.50877 13.1236 6.38807C12.8506 6.26738 12.6136 6.10286 12.4128 5.89453L6.48656 9.38328C6.51962 9.48592 6.54233 9.58634 6.55469 9.68453C6.56691 9.78286 6.57302 9.88759 6.57302 9.9987C6.57302 10.1098 6.56691 10.2145 6.55469 10.3129C6.54233 10.4111 6.51962 10.5115 6.48656 10.6141L12.4128 14.1029C12.6136 13.8945 12.8506 13.73 13.1236 13.6093C13.3966 13.4886 13.6917 13.4283 14.0091 13.4283C14.6323 13.4283 15.162 13.6465 15.5982 14.0831C16.0345 14.5197 16.2526 15.0499 16.2526 15.6737C16.2526 16.2974 16.0343 16.827 15.5976 17.2622C15.1611 17.6977 14.6309 17.9154 14.0072 17.9154ZM14.0091 16.6654C14.2906 16.6654 14.5266 16.5702 14.717 16.3797C14.9074 16.1893 15.0026 15.9534 15.0026 15.6718C15.0026 15.3903 14.9074 15.1543 14.717 14.9639C14.5266 14.7734 14.2906 14.6781 14.0091 14.6781C13.7275 14.6781 13.4916 14.7734 13.3011 14.9639C13.1106 15.1543 13.0153 15.3903 13.0153 15.6718C13.0153 15.9534 13.1106 16.1893 13.3011 16.3797C13.4916 16.5702 13.7275 16.6654 14.0091 16.6654ZM4.32156 10.9922C4.60531 10.9922 4.84316 10.897 5.0351 10.7066C5.22719 10.5162 5.32323 10.2802 5.32323 9.9987C5.32323 9.71717 5.22719 9.4812 5.0351 9.29078C4.84316 9.10036 4.60531 9.00516 4.32156 9.00516C4.04226 9.00516 3.80816 9.10036 3.61927 9.29078C3.43038 9.4812 3.33594 9.71717 3.33594 9.9987C3.33594 10.2802 3.43038 10.5162 3.61927 10.7066C3.80816 10.897 4.04226 10.9922 4.32156 10.9922ZM14.0091 5.31932C14.2906 5.31932 14.5266 5.22404 14.717 5.03349C14.9074 4.84307 15.0026 4.6071 15.0026 4.32557C15.0026 4.04405 14.9074 3.80807 14.717 3.61766C14.5266 3.42724 14.2906 3.33203 14.0091 3.33203C13.7275 3.33203 13.4916 3.42724 13.3011 3.61766C13.1106 3.80807 13.0153 4.04405 13.0153 4.32557C13.0153 4.6071 13.1106 4.84307 13.3011 5.03349C13.4916 5.22404 13.7275 5.31932 14.0091 5.31932Z"
                            fill="#646464"
                          />
                        </g>
                      </svg>
                      <svg
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(
                            `/common/jobPosting/CreateNewJob?id=${job._id}`
                          );
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_7897_106800)">
                          <path
                            d="M11.6693 17.5013V16.1263C11.6693 16.0152 11.6901 15.9076 11.7318 15.8034C11.7734 15.6992 11.8359 15.6055 11.9193 15.5221L16.2734 11.1888C16.3984 11.0638 16.5373 10.9735 16.6901 10.918C16.8429 10.8624 16.9957 10.8346 17.1484 10.8346C17.3151 10.8346 17.4748 10.8659 17.6276 10.9284C17.7804 10.9909 17.9193 11.0846 18.0443 11.2096L18.8151 11.9805C18.9262 12.1055 19.013 12.2444 19.0755 12.3971C19.138 12.5499 19.1693 12.7027 19.1693 12.8555C19.1693 13.0082 19.1415 13.1645 19.0859 13.3242C19.0304 13.4839 18.9401 13.6263 18.8151 13.7513L14.4818 18.0846C14.3984 18.168 14.3047 18.2305 14.2005 18.2721C14.0964 18.3138 13.9887 18.3346 13.8776 18.3346H12.5026C12.2665 18.3346 12.0686 18.2548 11.9089 18.0951C11.7491 17.9353 11.6693 17.7374 11.6693 17.5013ZM12.9193 17.0846H13.7109L16.2318 14.543L15.4609 13.7721L12.9193 16.293V17.0846ZM5.0026 18.3346C4.54427 18.3346 4.15191 18.1714 3.82552 17.8451C3.49913 17.5187 3.33594 17.1263 3.33594 16.668V3.33464C3.33594 2.8763 3.49913 2.48394 3.82552 2.15755C4.15191 1.83116 4.54427 1.66797 5.0026 1.66797H10.9818C11.204 1.66797 11.4158 1.70964 11.6172 1.79297C11.8186 1.8763 11.9957 1.99436 12.1484 2.14714L16.1901 6.1888C16.3429 6.34158 16.4609 6.51866 16.5443 6.72005C16.6276 6.92144 16.6693 7.13325 16.6693 7.35547V8.54297C16.6693 8.77908 16.5894 8.977 16.4297 9.13672C16.27 9.29644 16.072 9.3763 15.8359 9.3763C15.5998 9.3763 15.4019 9.29644 15.2422 9.13672C15.0825 8.977 15.0026 8.77908 15.0026 8.54297V7.5013H11.6693C11.4332 7.5013 11.2352 7.42144 11.0755 7.26172C10.9158 7.102 10.8359 6.90408 10.8359 6.66797V3.33464H5.0026V16.668H9.16927C9.40538 16.668 9.6033 16.7478 9.76302 16.9076C9.92274 17.0673 10.0026 17.2652 10.0026 17.5013C10.0026 17.7374 9.92274 17.9353 9.76302 18.0951C9.6033 18.2548 9.40538 18.3346 9.16927 18.3346H5.0026ZM15.8568 14.1471L15.4609 13.7721L16.2318 14.543L15.8568 14.1471Z"
                            fill="#646464"
                          />
                        </g>
                      </svg>

                      <svg
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDeletePopup(job._id);
                          // handleDelete(job._id);
                        }}
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_7809_106599)">
                          <path
                            d="M5.83594 17.5C5.3776 17.5 4.98524 17.3368 4.65885 17.0104C4.33247 16.684 4.16927 16.2917 4.16927 15.8333V5H3.33594V3.33333H7.5026V2.5H12.5026V3.33333H16.6693V5H15.8359V15.8333C15.8359 16.2917 15.6727 16.684 15.3464 17.0104C15.02 17.3368 14.6276 17.5 14.1693 17.5H5.83594ZM14.1693 5H5.83594V15.8333H14.1693V5ZM7.5026 14.1667H9.16927V6.66667H7.5026V14.1667ZM10.8359 14.1667H12.5026V6.66667H10.8359V14.1667Z"
                            fill="#646464"
                          />
                        </g>
                      </svg>
                    </div>
                  </div>

                  <div className="flex w-[100%] justify-between items-center ">
                    <p className="text-[#333] text-[18px] font-[600]">
                      Total Applications
                    </p>
                    <p className="text-[#333] items-center text-[36px] font-[600]  leading-tight">
                      {job.totalApplicationCount}
                    </p>
                  </div>

                  <div className="flex w-[100%] justify-between items-center ">
                    <div className="flex flex-col items-start gap-[4px]">
                      <p className="text-[12px] font-[600] text-[#646464]">
                        Date Posted
                      </p>
                      <p className="text-[#333] font-[500] text-[12px]">
                        {new Date(job.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-[4px]">
                      <p className="text-[12px] font-[600] text-[#646464]">
                        Due Date
                      </p>
                      <p className="text-[#333] font-[500] text-[12px]">
                        {new Date(job.deadLine).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-[10px] flex-wrap">
                    {job.revalentExp && (
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
                          {job.revalentExp}
                        </div>
                      </div>
                    )}
                    {job.revalentExp && (
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
                        {job.jobType}
                      </div>
                    </div>
                    {job.location.length > 0 && (
                      <div className="border-[1px] border-[#AFAFAF]"></div>
                    )}{" "}
                    {job.location.length > 0 && (
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
                        <div
                          className={`text-[12px] font-[400] ${
                            job.location.length > 1 && "group"
                          } relative`}
                        >
                          {job.location.length > 1
                            ? job.location
                                .map((loc) => loc.split(",")[0]) // Get the first part before the comma (e.g., "Pune" or "Nashik")
                                .join(", ") // Join them with commas
                            : job.location[0]?.split(",")[0]}{" "}
                          {/* If only one location, show the first part */}
                          <div className="absolute w-[150px] text-[10px] opacity-0 transition-opacity duration-500 group-hover:opacity-100 word-break bottom-[-20px] text-[#fff] bg-[#333] px-[6px] py-[3px] rounded-[5px]">
                            {job?.location
                              ?.map((loc) => loc.split(",")[0]) // Get the first part before the comma
                              .join(", ")}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {deletePopup && (
                    <>
                      <div className="opacity-25 fixed inset-0 z-[99998] bg-black"></div>

                      <div className="fixed top-0 left-0 w-full h-full z-[99999] flex justify-center items-center">
                        <div className="bg-white rounded-[12px] p-6 flex flex-col gap-4 justify-center items-center max-w-[330px]">
                          <img
                            src="/images/icons/delete_icon.png"
                            className="h-[60px] w-[60px]"
                            alt="Delete"
                          />
                          <div className="w-full flex flex-col justify-center items-center">
                            <h1 className="text-[24px] text-center">Delete</h1>
                            <p className="text-[16px] text-center">
                              Are you sure you want to delete this Job?
                            </p>
                          </div>
                          <div className="w-full flex justify-between">
                            <button
                              className="blue_border_Button h-[38px] px-6 rounded-[30px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeletePopup(false);
                              }}
                            >
                              No
                            </button>
                            <button
                              className="red_border_Button h-[38px] px-6 rounded-[30px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete();
                              }}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}

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
        </>
      )}

      {showPopup && (
        <CopyLink
          generatedLink={generatedLink}
          setShowPopup={setShowPopup}
          popupRef={popupRef}
        />
      )}
    </div>
  );
};

export default JobCard;
