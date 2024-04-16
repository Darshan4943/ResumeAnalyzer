import React, { useState } from "react";
import { AddIcon } from "../../../utils/svg";
import JobListing from "./jobListing";
import Files from "./files";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import EarthLoader from "../../../components/common/EarthLoader";

const Index = () => {
  const [resumeCount, setResumeCount] = useState(5);
  const [threshold, setThreshold] = useState(100);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selected, setSelected] = useState(false);
  let retryCount = 0;
  const maxRetries = 3;

  const fetchData = () => {
    setLoading(true);
    axios
      .post("http://localhost:2000/api/job/search", {
        ...selected,
        resumeCount,
        threshold,
      })
      .then((res) => {
        if (res.data.success) {
          const result = res.data?.data;
          setJobs(result?.sort((a, b) => b.percentage - a.percentage)
            ?.slice(0, resumeCount));
          setLoading(false);
        } else {
          setLoading(false);
          fetchData();
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log("err", err);
        fetchData();
      });
  };

  const searchJob = () => {
    fetchData();
  };
  const jobFilter = () => {
    return jobs;
  };
  console.log(jobFilter());
  return (
    <>
      {loading && <EarthLoader />}
      <div className="job-list customMargins flex flex-col gap-[16px] ">
        <div className="flex justify-between items-center header w-full">
          <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] ">
            Search Jobs
          </span>
        </div>
        <div className="flex ml:flex-row flex-col gap-4 justify-between">
          <div className="ml:w-[40%] w-full flex  flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-[16px] text-[#333333] font-medium">
                Select Resume from Collection
              </span>
              <Files setSelected={setSelected} selected={selected} />
            </div>

            <div className="flex flex-row gap-3 items-center">
              <span className="text-[16px] text-[#333333] font-medium">
                Select search Results Limit
              </span>
              <input
                type="number"
                placeholder="5"
                value={resumeCount}
                onChange={(e) => setResumeCount(e.target.value)}
                className="md:h-[44px] h-[40px]  w-[80px] p-[8px] text-[16px] text-[#646464] border border-[#DEDEDE] rounded-[8px] leading-tight"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[16px] text-[#333333] font-medium">
                Set Matching Threshold
              </span>
              <div className="w-full flex flex-row justify-between items-center">
                <input
                  id="default-range"
                  type="range"
                  min="0"
                  max="100"
                  value={threshold}
                  onChange={(e) => {
                    setThreshold(e.target.value);
                  }}
                  className="w-[88%] h-2 bg-[#DEDEDE] rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                />
                <div className="w-[10%] text-[14px]">{threshold}%</div>
              </div>
            </div>
            <button
              className="px-4 py-3 bg-[#06A9EF] text-[16px] text-white font-semibold rounded-[12px] md:w-[166px] scr420:w-[200px] w-full"
              style={{ opacity: loading || !selected ? 0.5 : 1 }}
              disabled={loading || !selected}
              onClick={searchJob}
            >
              {loading ? (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-4 h-4  text-white animate-spin"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              ) : (
                <div className="flex gap-[8px] w-full justify-center">
                  Search Jobs
                </div>
              )}
            </button>
          </div>

          <div className="bg-[#DEDEDE] ml:h-full h-[1px] ml:w-[1px] w-full"></div>
          <div className="ml:w-[56%] w-full">
            <JobListing jobs={jobs} resume={selected} resumeCount={resumeCount} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
