import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";

import MiniLoader from "../../../components/common/miniLoader";
import SavedJobCard from "../../../components/featured/candidate/jobs/SavedJobCard";
import NoJobs from "../../../components/featured/candidate/jobs/noJobs";

function SavedJobs({ setLimitPopup,
}) {
  const [selectedJob, setSelectedJob] = useState();
  const { savedJobIds } = useSelector(
    (state) => state.job.jobData
  );
  const [loading, setLoading] = useState(true);
  const { userDataGlobal, profileData, appliedJobData } = useSelector((state) => state.user.userData);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [savedJobList, setSavedJobList] = useState([]);

  const [miniLoading, setMiniloading] = useState(false);

  const [isDescription, setIsDescription] = useState(false);
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");

  const posters = [
    { img: "/images/withoutLogin/trusted1.png" },
    { img: "/images/withoutLogin/trusted2.png" },
    { img: "/images/withoutLogin/trusted3.png" },
    { img: "/images/withoutLogin/trusted4.png" },
    { img: "/images/withoutLogin/trusted5.png" },


  ];


  const getData = () => {

    axios
      .post(`http://localhost:2000/api/job/getSaveJobsById/${userDataGlobal?._id}`, {

        page: page,
        limit: limit,
      })
      .then((res) => {
        setSavedJobList(res.data.data);
        setTotalCount(res.data.totalCount);
        setTotalpages(res.data.totalPages);
        setTimeout(() => {
          setLoading(false);
          setMiniloading(false)
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
          setMiniloading(false)
        }, 500);
      });
  };


  useEffect(() => {

    getData();

  }, [userDataGlobal, limit, page]);




  useEffect(() => {
    if (savedJobList?.length > 0) {
      setSelectedJob(savedJobList[0]);
    }
  }, [savedJobList]);


  return (
    <>
      {!loading ?
        <>
          {savedJobList?.length > 0 ?
            <div className="flex flex-col gap-[24px] customMargins py-6">
              <p className=" text-[#000000] text-[18px] font-semibold">Jobs You&apos;ve Saved <span className="col-span-12 text-[#000000] text-[18px] font-medium">( {savedJobList?.length} Jobs )</span></p>
              <div className="flex gap-[24px]">
                <div
                  onClick={() => setIsDescription(true)}
                  className="w-full"
                >
                  <SavedJobCard
                    miniLoading={miniLoading}
                    selectedJob={selectedJob}
                    setIsDescription={setIsDescription}
                    setSelectedJob={setSelectedJob}
                    savedJobList={savedJobList}
                    setLimit={setLimit}
                    limit={limit}
                    setTotalpages={setTotalpages}
                    totalPages={totalPages}
                    page={page}
                    setPage={setPage}
                    appliedJobs={appliedJobData}
                    getData={getData}
                    setMiniloading={setMiniloading}

                  />
                </div>

                {/* <div className=" hidden ml:flex flex-col gap-6   rounded-[12px] bg-[#FFFFFF] p-4 h-fit">
                  <p className="text-[16px] font-semibold">Top Company Jobs</p>
                  <div className="flex gap-[10px] flex-wrap">
                    {posters?.map((item, index) => (
                      <div key={index} className="rounded-[6px] border border-[#E3E3E3] py-[10px]">
                        <img
                          src={item.img}
                          alt=""
                          className="h-[36px] w-[142px]  object-contain "

                        />
                      </div>
                    ))}

                  </div>

                </div> */}
                <div className="w-[40%]"></div>
              </div>
            </div>
            :
            <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
              <NoJobs name={"Saved"} />
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

export default SavedJobs;
