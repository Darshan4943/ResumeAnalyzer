import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Description from "./Description";
import axios from "axios";
import { toast } from "react-toastify";
import { reCallUserData } from "../../../Redux/actions/user";
import { CountPostingDays } from "../../../utils/data";
import MiniLoader from "../../../components/common/miniLoader";
import SavedJobCard from "./SavedJobCard";
import NoJobs from "./noJobs";
function SavedJobs({ setLimitPopup, appliedJobs,
}) {
  const [selectedJob, setSelectedJob] = useState();
  const jobData = useSelector((state) => state.getAllJobs.data);
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
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




  const getData = () => {
    setMiniloading(true)
    axios
      .post("http://localhost:2000/api/job/getSaveJobByIds", {
        ids: userDataGlobal?.savedJobs
          ?.map((item) => item.id)
          .filter((item) => item != "undefined"),
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
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        setTimeout(() => {
          setLoading(false);
          setMiniloading(false)
        }, 1000);
      });
  };


  useEffect(() => {

    getData();

  }, [userDataGlobal, limit, page]);

  // const isSaved = (id) => {
  //   return userDataGlobal?.savedJobs?.find((item) => item.id == id);
  // };



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
            <div className="grid grid-cols-12 gap-[24px]">
              {!isDescription && (
                <div
                  onClick={() => setIsDescription(true)}
                  className={`mobile1024 ml:mt-4  ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                    }`}
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
                    appliedJobs={appliedJobs}

                  />
                </div>
              )}

              <div
                className={`web1024 col-span-5
           ml:mt-4`}
              >
                <SavedJobCard
                 miniLoading={miniLoading}
                  selectedJob={selectedJob}
                  setIsDescription={setIsDescription}
                  setSelectedJob={setSelectedJob}
                  setLimit={setLimit}
                  limit={limit}
                  setTotalpages={setTotalpages}
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                  savedJobList={savedJobList}
                  appliedJobs={appliedJobs}

                />
              </div>

              <div
                className={`web1024  col-span-7
            ml:mt-4 sticky top-[156px] overflow-y-auto h-[calc(100vh-180px)] `}
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

export default SavedJobs;
