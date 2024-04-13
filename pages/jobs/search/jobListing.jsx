import React, { useState } from "react";
import { DesignationSVG } from "../../../utils/svg";
import Progress_bar from "../../../components/featured/jobMatching/ProgressBar";
import Details from "./details";
import axios from "axios";
import { useSelector } from "react-redux";
import JobCard from "./jobCard";

const JobListing = ({ jobs, resume, resumeCount }) => {
  const [jd, setJd] = useState(null);

  return (
    <div className="flex flex-col gap-4 min-h-[70vh] overflow-auto ">
      {jd && <Details data={jd} setJd={setJd} resume={resume} />}
      <div className="flex ml:flex-row flex-col gap-12 w-[100%] ">
        <div className="ml:w-[100%] w-[100%]  flex flex-col gap-[16px] ">
          <div>Total Results </div>
          <div className=" flex flex-row flex-wrap ml:justify-between justify-center  gap-[24px] ">
            {jobs?.length > 0 ? (
              <>
                {jobs
      
                  ?.map((data, index) => (
                    <div key={index} className=" md:w-[48%] max-w-[380px]">
                      <JobCard
                        data={data}
                        setJd={setJd}
                        resume={resume}
                        jd={jd}
                      />
                    </div>
                  ))}
              </>
            ) : (
              <div className="w-full flex flex-col items-center justify-center h-full">
                <img src="/images/NoMatch.png" alt="" className="w-[40%] " />
                <span className="text-[#808080]">No Match Found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
