import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";

import MiniLoader from "../../../components/common/miniLoader";
import NoJobs from "../../../components/featured/candidate/jobs/noJobs";
import AppliedJobCard from "../../../components/featured/candidate/jobs/AppliedJobCard";
function AppliedJobs({ setLimitPopup }) {
  const [selectedJob, setSelectedJob] = useState();
  const [loading, setLoading] = useState(true);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1);
  const [appliedJobs, setAppliedJobs] = useState();
  const [isDescription, setIsDescription] = useState(false);
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const [miniLoading, setMiniloading] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  const getAppliedData = () => {
    setMiniloading(true);
    axios
      .get(
        `https://jamblix.com/api/job/getAppliedJobsWithoutApplications/${userDataGlobal?._id}`,
        {
          params: { page, limit },
        }
      )
      .then((res) => {
        setAppliedJobs(
          res.data.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );

        setTotalCount(res.data.totalCount);
        setTotalpages(res.data.totalPages);
        setTimeout(() => {
          setLoading(false);
          setMiniloading(false);
        }, 500);
      })
      .catch((err) => {
        console.error(err);
        setTimeout(() => {
          setLoading(false);
          setMiniloading(false);
        }, 500);
      });
  };

  useEffect(() => {
    getAppliedData();
  }, [userDataGlobal, page, limit]);

  useEffect(() => {
    if (appliedJobs?.length > 0) {
      setSelectedJob(appliedJobs[0]);
    }
  }, [appliedJobs]);

  return (
    <>
      {!loading ? (
        <>
          {appliedJobs?.length > 0 ? (
            <div className="flex flex-col gap-[24px] customMargins py-6">
              <p className="col-span-12 text-[#000000] text-[18px] font-semibold">
                Jobs You&apos;ve Applied{" "}
                <span className="col-span-12 text-[#000000] text-[18px] font-medium">
                  ( {totalCount} Jobs )
                </span>
              </p>
              <div className="flex w-full gap-6">
                <div
                  onClick={() => setIsDescription(true)}
                  className="w-full scr700:w-[75%]"
                >
                  <AppliedJobCard
                    selectedJob={selectedJob}
                    setIsDescription={setIsDescription}
                    setSelectedJob={setSelectedJob}
                    miniLoading={miniLoading}
                    setLimit={setLimit}
                    limit={limit}
                    setTotalpages={setTotalpages}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                    totalCount={totalCount}
                    setTotalCount={setTotalCount}
                    appliedJobs={appliedJobs}
                    setAppliedJobs={setAppliedJobs}
                  />
                </div>
                <div className="hidden lg:block w-[357px]">
                  <img src="/images/home/JobAppliedPoster.png" alt="" />
                </div>
              </div>
            </div>
          ) : (
            <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
              <NoJobs name={"Applied"} />
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col gap-[24px] customMargins py-6">
          <p className="col-span-12 text-[#000000] text-[18px] font-semibold">
            Jobs You&apos;ve Applied{" "}
          
          </p>
          <div className=" flex justify-between w-full  gap-6 ">
            <div className="flex gap-4 flex-col w-full scr700:w-[75%]">
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="flex gap-4 flex-col w-full">
                  <div className="h-[162px] w-full  bg-white rounded-[12px] p-4 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div className="skeleton-line h-[24px] max-w-[140px]"></div>
                      {/* <div className="skeleton-img h-[36px] w-[36px] rounded-[50%]"></div> */}
                    </div>

                   
                    <div className="skeleton-line h-[20px] max-w-[70%]"></div>
                    <div className="skeleton-line h-[50px] w-full"></div>
                    <div className="skeleton-line h-[20px] max-w-[140px]"></div>
                  </div>
                </div>
              ))}
            </div>


            <div className="hidden lg:block w-[326px] gap-4 flex-col">
              <div className="skeleton-image  w-[326px]  "></div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppliedJobs;
