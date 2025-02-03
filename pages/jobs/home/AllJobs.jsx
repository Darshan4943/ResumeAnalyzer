import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import AllJobCard from "../../../components/featured/candidate/jobs/AllJobCard";
import Description from "../../../components/featured/candidate/jobs/Description";
import MiniLoader from "../../../components/common/miniLoader";
import NoJobs from "../../../components/featured/candidate/jobs/noJobs";

function AllJobs({
  setLimitPopup,
  setLimit,
  limit,
  setTotalpages,
  totalPages,
  page,
  setPage,
  isLogin,
  appliedJobs,
  jobData,
  loading,
  setMiniloading,
  miniLoading,
}) {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isDescription, setIsDescription] = useState(false);
  const [selectedJob, setSelectedJob] = useState();

  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const [savedJobList, setSavedJobList] = useState([]);

 
  useEffect(() => {
    if (userDataGlobal?._id) {
      getData();
    }
  }, [userDataGlobal]);

  useEffect(() => {
    if (jobData?.length > 0) {
      setSelectedJob(jobData[0]);
    }
  }, [jobData]);

  return (
    <>
      {!loading ? (
        <>
          {jobData?.length > 0 ? (
            <div className="grid grid-cols-12 gap-[24px]">
              {!isDescription && (
                <div
                  onClick={() => setIsDescription(true)}
                  className={`mobile1024 ml:mt-4  ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                    }`}
                >
                  <AllJobCard
                    miniLoading={miniLoading}
                    selectedJob={selectedJob}
                    setIsDescription={setIsDescription}
                    setSelectedJob={setSelectedJob}
                 
                   
                    setCurrentPage={setPage}
                    isLogin={isLogin}
                    appliedJobs={appliedJobs}
                    setLimit={setLimit}
                    limit={limit}
                    setTotalpages={setTotalpages}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                    jobData={jobData}
                  />
                </div>
              )}

              <div className={`web1024 col-span-5 ml:mt-4`}>
                <AllJobCard
                  miniLoading={miniLoading}
                  selectedJob={selectedJob}
                  setIsDescription={setIsDescription}
                  setSelectedJob={setSelectedJob}
                
                 
                  setCurrentPage={setPage}
                  isLogin={isLogin}
                  appliedJobs={appliedJobs}
                  setLimit={setLimit}
                  limit={limit}
                  setTotalpages={setTotalpages}
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                  jobData={jobData}
                />
              </div>

              <div
                className={`web1024 col-span-7
             ml:mt-4 sticky ${isLogin ? "top-[240px]" : "top-[180px]"}  overflow-y-auto h-[calc(100vh-200px)] `}
              >
                <Description
                  selectedJob={selectedJob}
                  setLimitPopup={setLimitPopup}
                />
              </div>

              {isDescription && (
                <div
                  className={`mobile1024 ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                    } flex flex-col gap-3 ml:mt-4 `}
                >
                  <div
                    onClick={() => setIsDescription(false)}
                    className="flex gap-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_5925_96419)">
                        <path
                          d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                    Back
                  </div>

                  <Description
                    selectedJob={selectedJob}
                    setLimitPopup={setLimitPopup}
                  />
                </div>
              )}
            </div>
          ) : (
            <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
              <NoJobs name={""} />
            </div>
          )}
        </>
      ) : (
        <div className=" h-[70vh] ">
          <MiniLoader />
        </div>
      )}
    </>
  );
}

export default AllJobs;
