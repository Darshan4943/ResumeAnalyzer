import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";


import { PencilLineIcon } from "lucide-react";
import { toast } from "react-toastify";
import MiniLoader from "../../components/common/miniLoader";
import { dateSeter } from "../../utils/middleware";

const SelectPost = ({setTab,setSelectedJob}) => {
  const router = useRouter();
   const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [filterStatus, setFilterStatus] = useState("All");
  const [loading, setLoading] = useState(false);
  const [jobPost, setJobPost] = useState([]);
  const getData = () => {
    setLoading(true);
    axios
      .get("http://localhost:2000/api/job/getByCreatedId/" + userDataGlobal._id)
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
    Closed: 3,
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


 
  return (


    <div className="job-list customMargins flex flex-col gap-[16px]  ">
      <div className="flex ml:flex-row flex-col gap-4 justify-between ml:items-center items-end w-full">
        <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] header w-full ">
         Select Job 
        </span>

        {/* <button
          className="text-[16px] font-medium text-[#FFFFFF] bg-[#06A9EF] px-[12px] py-[8px] rounded-[8px] flex flex-row items-center gap-[4px] min-w-[190px] "
          onClick={() => router.push("/jobs/create")}
        >
          <AddIcon color={"#fff"} /> Create New Job
        </button> */}
       
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
                      onClick={() =>{
                       setTab(1);setSelectedJob(item._id)}
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
                          {item.status === "Closed" &&
                            <div className="border border-[#C00000] text-[#C00000] text-[12px] font-medium px-[16px] bg-[#FFEBEB] h-[24px] rounded-[6px] flex items-center justify-center">
                              Closed
                            </div>
                          }
                          {item.status === "Hold" &&
                            <div className="border border-[#FF9900] text-[#FF9900] text-[12px] font-medium px-[16px] bg-[#FFFFFF] h-[24px] rounded-[6px] flex items-center justify-center">
                              Hold
                            </div>
                          }
                          {/* <div
                            className="cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation(); // prevent
                              router.push("/jobs/create?id=" + item?._id);
                            }}
                          >
                            <PencilLineIcon color="#646464" />
                          </div> */}
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

export default SelectPost;
