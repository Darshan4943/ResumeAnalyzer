
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";

import MiniLoader from "../../../components/common/miniLoader";
import NoJobs from "../../../components/featured/candidate/jobs/noJobs";
import AppliedJobCard from "../../../components/featured/candidate/jobs/AppliedJobCard";
function AppliedJobs({ setLimitPopup, }) {
  const [selectedJob, setSelectedJob] = useState();
  const [loading, setLoading] = useState(true);
  const { userDataGlobal, profileData } = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(1);
  const [appliedJobs, setAppliedJobs] = useState()
  const [isDescription, setIsDescription] = useState(false);
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const [miniLoading, setMiniloading] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  const getAppliedData = () => {
    setMiniloading(true)
    axios
      .get(`http://localhost:2000/api/job/getAppliedJobs/${userDataGlobal._id}`, {
        params: { page, limit },
      })
      .then((res) => {

        const sortedJobs = res.data.data.sort((a, b) =>
          new Date(b.applications[0].appliedOn) - new Date(a.applications[0].appliedOn)
        );

        setAppliedJobs(sortedJobs);
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
  }


  useEffect(() => {

    getAppliedData()


  }, [userDataGlobal, page, limit]);


  useEffect(() => {
    if (appliedJobs?.length > 0) {
      setSelectedJob(appliedJobs[0]);
    }
  }, [appliedJobs]);
console.log(appliedJobs)
  return (
    <>
      {!loading ?
        <>
          {appliedJobs?.length > 0 ?
            <div className="grid grid-cols-12 gap-[24px] customMargins py-6">
              <p className="col-span-12 text-[#000000] text-[18px] font-semibold">Jobs You've Applied <span className="col-span-12 text-[#000000] text-[18px] font-medium">( {appliedJobs?.length} Jobs )</span></p>
              <div
                onClick={() => setIsDescription(true)}
                className="col-span-8"
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
                  appliedJobs={appliedJobs}
                  setAppliedJobs={setAppliedJobs}
                />
              </div>

            </div>

            :
            <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
              <NoJobs name={"Applied"} />
            </div>
          }
        </>
        :
        <div className=" h-[70vh] ">
          <MiniLoader />
        </div>
      }

    </>
  );
}

export default AppliedJobs;
