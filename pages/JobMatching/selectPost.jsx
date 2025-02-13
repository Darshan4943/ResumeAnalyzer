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

  localStorage.setItem("jdApplicantFilenames", JSON.stringify(""));

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:2000/api/job/getByCreatedId/${userDataGlobal?._id}`,
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
    <div className=" flex flex-col gap-[16px]  ">
      <div className="flex ml:flex-row flex-col gap-4 justify-between ml:items-center items-end w-full">
        <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-full ">
          Select Job
        </span>

        <div className="flex items-center gap-2 border-[1px] bg-[#ffffff]  text-white py-[8px] px-[12px] rounded-lg min-w-[190px]">
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

        <div className="flex ms:flex-row flex-col-reverse gap-4  ms:items-center items-end justify-end relative">
          <select
            className="text-[14px] font-medium text-[#333333] bg-white rounded-[8px] py-[8px] px-[12px] cursor-pointer"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Live">Live</option>
            <option value="Closed">Closed</option>
            <option value="Hold">Hold</option>
          </select>
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
                      className="job-card sm:min-w-[300px] w-full  sm:max-w-[380px] relative bg-white"
                      onClick={() => {
                        router.push(`/JobMatching?selectedJob=${item?._id}`);
                      }}
                    >
                      <div className="px-[16px] flex flex-row justify-between items-start ">
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
                            <span className="text-[16px]  font-[600]">
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

                        <div className="flex justify-center items-center flex-row gap-2">
                          {item.status === "Live" ? (
                            <>
                              <div className="w-[6px] h-[6px] bg-[#0C8A0A] rounded-full"></div>
                              <div className="text-[12px] font-[500] text-[#0C8A0A]">
                                Active
                              </div>
                            </>
                          ) : item.status === "Hold" ? (
                            <>
                              <div className="w-[6px] h-[6px] bg-[#ddda40] rounded-full"></div>
                              <div className="text-[12px] font-[500] text-[#ddda40]">
                                On Hold
                              </div>
                            </>
                          ) : item.status === "Closed" ? (
                            <>
                              <div className="w-[6px] h-[6px] bg-[#B3261E] rounded-full"></div>
                              <div className="text-[12px] font-[500] text-[#B3261E]">
                                Inactive
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="px-[16px] flex flex-row justify-around  items-center">
                        <div className="text-[18px] font-[600] text-[#333333] w-[50%] text-left">
                          Total Applications
                        </div>
                        <div className="text-[36px] font-semibold text-[#333333] w-[50%] text-center">
                          {item?.totalApplications}
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
  );
};

export default SelectPost;
