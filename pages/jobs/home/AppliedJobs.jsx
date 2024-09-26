
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
import axios from "axios";
import { toast } from "react-toastify";
import { reCallUserData } from "../../../Redux/actions/user";
import { CountPostingDays } from "../../../utils/data";
import NoJobs from "./noJobs";
import AppliedJobCard from "./AppliedJobCard";
import Description from "./Description";
import MiniLoader from "../../../components/common/miniLoader";
function AppliedJobs({  setLimitPopup }) {
  const [selectedJob, setSelectedJob] = useState();
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [page, setPage] = useState(1);
  const [appliedJobs, setAppliedJobs] = useState()
  const [isDescription, setIsDescription] = useState(false);
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const dispatch = useDispatch();

  const getAppliedData = () => {

    axios
      .get(`http://localhost:2000/api/job/getAppliedJobs/${userDataGlobal._id}`,{
        params: { page, limit },
      })
      .then((res) => {
       
        setAppliedJobs(res.data.jobs)
        setTotalCount(res.data.totalCount);
        setTotalpages(res.data.totalPages);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err)
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });

  }

  useEffect(() => {
  
      getAppliedData()

   
  }, [userDataGlobal,page, limit]);


  useEffect(() => {
    if (appliedJobs?.length > 0) {
      setSelectedJob(appliedJobs[0]);
    }
  }, [appliedJobs]);

  return (
    <>
      {!loading ?
        <>
          {appliedJobs?.length > 0 ?
            <div className="grid grid-cols-12 gap-[24px]">
              {!isDescription && (
                <div
                  onClick={() => setIsDescription(true)}
                  className={`mobile1024 ml:mt-4  ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                    }`}
                >
                  <AppliedJobCard
                    selectedJob={selectedJob}
                    setIsDescription={setIsDescription}
                    setSelectedJob={setSelectedJob}

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
              )}

              <div
                className={`web1024 col-span-5
               ml:mt-4`}
              >
                <AppliedJobCard
                  selectedJob={selectedJob}
                  setIsDescription={setIsDescription}
                  setSelectedJob={setSelectedJob}
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

              <div
                className={`web1024  col-span-7
                ml:mt-4 sticky top-[336px] overflow-y-auto h-[calc(100vh-360px)] `}
              >
                <Description selectedJob={selectedJob} setLimitPopup={setLimitPopup} />
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

                  <Description selectedJob={selectedJob} setLimitPopup={setLimitPopup} />
                </div>
              )}
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
