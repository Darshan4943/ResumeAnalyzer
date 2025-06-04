import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";

import { dateSeter } from "../../../utils/middleware";
import MiniLoader from "../../../components/common/miniLoader";
import { PencilLineIcon } from "lucide-react";
import { toast } from "react-toastify";

const Index = () => {
  const router = useRouter();
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [jobPost, setJobPost] = useState([]);
  const getData = () => {
    setLoading(true);
    axios
      .get("https://jamblix.com/api/job/getByCreatedId/" + userDataGlobal?._id)
      .then((res) => {
       
        setJobPost(res.data);
        setLoading(false);
        
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    if (userDataGlobal?._id) {
      getData();
    }
  }, [userDataGlobal]);

  const statusPriority = {
    Live: 1,
    Hold: 2,
    Expired: 3,
  };

  const sortedJobs = jobPost
    .filter((job) => filterStatus === "All" ? true : job.status === filterStatus)
    .sort((a, b) => {
      const statusComparison = statusPriority[a.status] - statusPriority[b.status];

      if (statusComparison === 0) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      return statusComparison;
    });


 
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

  const [select, setSelect] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedIndexes, setSelectedIndexes] = useState([]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedIndexes([]);
    } else {
      setSelectedIndexes(jobPost.map((item) => item._id));
    }
    setSelectAll(!selectAll);
  };
  const toggleSelect = (id) => {
    if (selectedIndexes.includes(id)) {
      setSelectedIndexes(selectedIndexes.filter((i) => i !== id));
    } else {
      setSelectedIndexes([...selectedIndexes, id]);
    }
  };

  const deleteJob = (id) => {
    axios
      .post("https://jamblix.com/api/jobs/deleteJobs", {
        ids: selectedIndexes,
      })
      .then((response) => {
        setSelect(false)
        setSelectedIndexes([])
        setSelectAll([]);
        getData();
        toast.success("Post Deleted successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (


    <div className="job-list customMargins flex flex-col gap-[16px]  ">
      <div className="flex ml:flex-row flex-col gap-4 justify-between ml:items-center items-end w-full">
        <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-full ">
          Job Listings
        </span>

        {/* <button
          className="text-[16px] font-medium text-[#FFFFFF] bg-[#06A9EF] px-[12px] py-[8px] rounded-[8px] flex flex-row items-center gap-[4px] min-w-[190px] "
          onClick={() => router.push("/jobs/create")}
        >
          <AddIcon color={"#fff"} /> Create New Job
        </button> */}
       
        <div className="flex ms:flex-row flex-col-reverse gap-4  ms:items-center items-end justify-end relative">
        <select
          className="text-[14px] font-medium text-[#333333] bg-[#E9EEF6] rounded-[8px] py-[8px] px-[12px] cursor-pointer"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Live">Live</option>
          <option value="Expired">Expired</option>
          <option value="Hold">Hold</option>
        </select>
          {!select && (
            <div
              onClick={() => setSelect(!select)}
              className="scr420:py-3 scr420:px-2 px-2 py-2 flex gap-2 text-[16px] h-[40px] font-semibold bg-[#E9EEF6] rounded-[8px] items-center cursor-pointer min-w-[8rem]"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_2185_10021)">
                  <path
                    d="M13.1724 17.0836C12.8315 17.0836 12.538 16.9605 12.2918 16.7142C12.0455 16.468 11.9224 16.1744 11.9224 15.8336V12.34C11.9224 11.9992 12.0455 11.7057 12.2918 11.4595C12.538 11.2132 12.8315 11.0901 13.1724 11.0901H16.666C17.0068 11.0901 17.3003 11.2132 17.5465 11.4595C17.7928 11.7057 17.9159 11.9992 17.9159 12.34V15.8336C17.9159 16.1744 17.7928 16.468 17.5465 16.7142C17.3003 16.9605 17.0068 17.0836 16.666 17.0836H13.1724ZM13.1724 15.8336H16.666V12.34H13.1724V15.8336ZM2.08264 14.7118V13.4618H9.26212V14.7118H2.08264ZM13.1724 8.91053C12.8315 8.91053 12.538 8.78741 12.2918 8.54116C12.0455 8.29491 11.9224 8.00138 11.9224 7.66058V4.16697C11.9224 3.82617 12.0455 3.53264 12.2918 3.28639C12.538 3.04012 12.8315 2.91699 13.1724 2.91699H16.666C17.0068 2.91699 17.3003 3.04012 17.5465 3.28639C17.7928 3.53264 17.9159 3.82617 17.9159 4.16697V7.66058C17.9159 8.00138 17.7928 8.29491 17.5465 8.54116C17.3003 8.78741 17.0068 8.91053 16.666 8.91053H13.1724ZM13.1724 7.66058H16.666V4.16697H13.1724V7.66058ZM2.08264 6.53876V5.28878H9.26212V6.53876H2.08264Z"
                    fill="#333333"
                  />
                </g>
              </svg>
              <span className="text-[12px]">Delete Job</span>
            </div>
          )}
          <div
            className={` ${select ? "flex" : "hidden"
              } gap-12  items-center w-[100%]  `}
          >
            {select && (
              <div className="bg-[#D1EDFF] flex scr420:gap-4  gap-2 rounded-[50px] px-3 scr420:py-3 py-2 items-center w-full scr420:min-w-[316px] min-w-[300px]  scr420:h-[48px] h-[40px]  ">
                <div
                  onClick={() => setSelect(false)}
                  style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
                  className="bg-[#F9F9F9] rounded-[50%] p-[8.5px]  cursor-pointer"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.5 10.5L0.5 9.5L4.5 5.5L0.5 1.5L1.5 0.5L5.5 4.5L9.5 0.5L10.5 1.5L6.5 5.5L10.5 9.5L9.5 10.5L5.5 6.5L1.5 10.5Z"
                      fill="#333333"
                    />
                  </svg>
                </div>
                <div className="flex ms:gap-6 sm:gap-4 gap-2 w-full scr540:justify-start justify-between items-center ">
                  <div className="flex gap-2 text-[14px] font-medium">
                    <label className="flex items-center gap-2 scr420:text-[14px] text-[13px] font-medium">
                      Select All
                      <input
                        type="checkbox"
                        className=" rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox cursor-pointer"
                        style={{ width: "20px", height: "20px" }}
                        checked={selectAll}
                        onChange={toggleSelectAll}
                      />
                    </label>
                  </div>

                  <svg
                    className=" cursor-pointer"
                    onClick={() => deleteJob()}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_1381_18138)">
                      <path
                        d="M5.83594 17.5C5.3776 17.5 4.98524 17.3368 4.65885 17.0104C4.33247 16.684 4.16927 16.2917 4.16927 15.8333V5H3.33594V3.33333H7.5026V2.5H12.5026V3.33333H16.6693V5H15.8359V15.8333C15.8359 16.2917 15.6727 16.684 15.3464 17.0104C15.02 17.3368 14.6276 17.5 14.1693 17.5H5.83594ZM14.1693 5H5.83594V15.8333H14.1693V5ZM7.5026 14.1667H9.16927V6.66667H7.5026V14.1667ZM10.8359 14.1667H12.5026V6.66667H10.8359V14.1667Z"
                        fill="#333333"
                      />
                    </g>
                  </svg>

                  <div className="scr420:text-[14px] text-[13px] font-semibold min-w-[85px] items-center flex justify-end">
                    {selectedIndexes.length} selected
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* {!select && (
            <button
              onClick={() => router.push("/myClients/CreateNewClient")}
              className="ml:hidden scr420:text-[16px] text-[14px] font-semibold scr420:py-3 scr420:px-6 px-2 py-2 scr420:h-[48px]  scr420:min-w-[228px] flex gap-1 bg-[#06A9EF] rounded-[12px] text-white"
              type="button"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_612_10078)">
                  <path
                    d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                    fill="white"
                  />
                </g>
              </svg>
              Create New Client
            </button>
          )} */}

          <button
            onClick={() => router.push("/jobs/create")}
            className=" flex  text-[16px] font-semibold py-3 px-6 h-[48px] min-w-[228px] gap-1 bg-[#06A9EF] rounded-[12px] text-white"
            type="button"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_612_10078)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="white"
                />
              </g>
            </svg>
            Create New Job
          </button>

          {/* {isOptions && (
                  <div
                    ref={taskRef}
                    className="absolute right-5 top-16 bg-white px-2 py-4 flex flex-col gap-1 rounded-[8px]"
                    style={{
                      boxShadow: "0px 1px 2px 0px #00000040",
                    }}
                  >
                    <p className="text-[14px] font-medium">Select All</p>

                    <p className="text-[14px] text-red font-medium">
                      Delete All
                    </p>
                  </div>
                )} */}
        </div>
      </div>
      <div>
        <div className=" flex flex-row flex-wrap gap-x-[34px]  gap-y-[24px] ">
          {loading ? (
            <div className="w-full flex items-center justify-center h-[80vh]">
              <MiniLoader />
            </div>
          ) : (
            <>
              {sortedJobs.length > 0 ? (
                <>
                  {sortedJobs.map((item, index) => (
                    <div
                      key={index}
                      className="job-card sm:min-w-[300px] w-full  sm:max-w-[380px] relative"
                      onClick={() =>
                        router.push("/jobs/details?id=" + item?._id)
                      }
                    >
                      <div className="px-[16px] flex flex-row justify-between ">
                        <div className="flex flex-row items-start  gap-2">
                          {select && (
                            <input
                              type="checkbox"
                              className=" rounded-[4.5px] pl-[4px] pr-[20px] py-[2px] outline-none text-[14px] font-medium custom-checkbox"
                              style={{ width: "20px", height: "20px" }}
                              onClick={(e) => e.stopPropagation()}
                              checked={selectedIndexes.includes(item._id)}
                              onChange={() => toggleSelect(item._id)}
                            />
                          )}
                          <div className="flex flex-col gap-[2px]">
                            <span className="text-[16px] text-[#06A9EF] font-medium">
                              {item?.jobTitle}
                            </span>
                            <span className="text-[12px] text-[#646464] font-medium">
                              {item?.country?.join(", ")}
                            </span>
                            <span className="text-[12px] text-[#646464] font-medium">
                              {item?.location?.join(", ")}
                            </span>
                            <span className="text-[10px] text-[#2706EF] font-medium">
                              {item?.experiance}
                            </span>
                          </div>
                        </div>

                        <div className="flex flex-row gap-2">
                          {item.status === "Live" &&
                            <div className="border border-[#0C8A0A] text-[#0C8A0A] text-[12px] font-medium px-[16px] bg-[#E2FFE1] h-[24px] rounded-[6px] flex items-center justify-center">
                              Live
                            </div>
                          }
                          {item.status === "Expired" &&
                            <div className="border border-[#C00000] text-[#C00000] text-[12px] font-medium px-[16px] bg-[#FFEBEB] h-[24px] rounded-[6px] flex items-center justify-center">
                              Expired
                            </div>
                          }
                          {item.status === "Hold" &&
                            <div className="border border-[#FF9900] text-[#FF9900] text-[12px] font-medium px-[16px] bg-[#FFFFFF] h-[24px] rounded-[6px] flex items-center justify-center">
                              Hold
                            </div>
                          }
                          <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent
                              router.push("/jobs/create?id=" + item?._id);
                            }}
                          >
                            <PencilLineIcon color="#646464" />
                          </div>
                        </div>
                      </div>
                      <div className="px-[16px] flex flex-row justify-around bg-[#EFFAFF] items-center">
                        <div className="text-[14px] font-semibold text-[#333333] w-[50%] text-left">
                          Total Applications
                        </div>
                        <div className="text-[36px] font-semibold text-[#333333] w-[50%] text-center">
                          {item?.applicationsLength}
                        </div>
                      </div>
                      <div className="px-[16px] flex flex-row justify-between items-center">
                        <div className="flex flex-col">
                          <span className="text-[12px] font-semibold text-[#646464]">
                            Date posted
                          </span>
                          <span className="text-[12px] font-semibold text-[#333333]">
                            {dateSeter(item.createdAt)}
                          </span>
                        </div>
                        {item.deadLine && (
                          <div className="flex flex-col">
                            <span className="text-[12px] font-semibold text-[#646464]">
                              Due On
                            </span>

                            <span className="text-[12px] font-semibold text-[#333333]">
                              {dateSeter(item.deadLine)}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="w-full h-[40vh] flex justify-center items-center text-[24px] text-[#bebebe] font-medium">
                  No Job Posted Yet !
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
