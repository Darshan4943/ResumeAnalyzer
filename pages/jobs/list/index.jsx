import React from "react";
import { AddIcon } from "../../../utils/svg";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <div className="job-list customMargins flex flex-col gap-[16px] ">
      <div className="flex justify-between items-center header w-full">
        <span className="text-[18px] font-medium text-[#FFFFFF] py-[8px] px-[12px] ">
          Job Listings
        </span>
        <button className="text-[16px] font-medium text-[#FFFFFF] bg-[#06A9EF] px-[12px] py-[8px] rounded-[8px] flex flex-row items-center gap-[4px] " onClick={()=>router.push('/jobs/create')}>
          <AddIcon color={"#fff"} /> Create New Job
        </button>
      </div>
      <div>
        <div className="flex flex-row flex-wrap justify-between gap-y-[24px] ">
          {[1, 2, 3, 4].map((item) => (
            <div className="job-card">
              <div className="px-[16px] flex flex-row justify-between">
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[16px] text-[#06A9EF] font-medium">
                    Assistant Manager
                  </span>
                  <span className="text-[12px] text-[#646464] font-medium">
                    Delhi
                  </span>
                  <span className="text-[10px] text-[#2706EF] font-medium">
                    Full-Time
                  </span>
                </div>
                <div className="border border-[#0C8A0A] text-[#0C8A0A] text-[12px] font-medium px-[16px] bg-[#E2FFE1] h-[24px] rounded-[6px] flex items-center justify-center">
                  Live
                </div>
              </div>
              <div className="px-[16px] flex flex-row justify-around bg-[#EFFAFF] items-center">
                <div className="text-[14px] font-semibold text-[#333333] w-[50%] text-left">
                  Total Applications
                </div>
                <div className="text-[36px] font-semibold text-[#333333] w-[50%] text-center">
                  16
                </div>
              </div>
              <div className="px-[16px] flex flex-row justify-between items-center">
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-[#646464]">
                    Date posted
                  </span>
                  <span className="text-[12px] font-semibold text-[#333333]">
                    20 Dec 2023
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-semibold text-[#646464]">
                    Due On
                  </span>
                  <span className="text-[12px] font-semibold text-[#333333]">
                    20 Dec 2023
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
