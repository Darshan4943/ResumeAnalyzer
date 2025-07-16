import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Job_card from "../../../components/featured/candidate/jobs/JobCard";
import Description from "../../../components/featured/candidate/jobs/Description";
import MiniLoader from "../../../components/common/miniLoader";
import { useDispatch, useSelector } from "react-redux";
import JobsForYou from "../../../components/featured/candidate/jobs/JobsForYou";
import RelevantJobs from "../../../components/featured/candidate/jobs/RelevantJobs";
import SimilarJobs from "../../../components/featured/candidate/jobs/SimilarJobs";
import { setShareJobOpen } from "../../../Redux/slices/shareJobSlice";
import ApplicationStatus from "./ApplicationStatus";

function JobDetails() {
  const [jobData, setJobData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();
  dispatch(setShareJobOpen());
  const [limitPopup, setLimitPopup] = useState(false);
  const { id, isShared ,w,t,f,l} = router.query;
  const [loading, setLoading] = useState(true);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [save, setSaved] = useState(false);
  const [isdata, setIsData] = useState(true);
  const [similarJobsVisible, setSimilarJobsVisible] = useState(false);
  const [noLink, setnoLink] = useState(false);
  const similarJobsRef = useRef(null);

  useEffect(() => {
    if (similarJobsRef.current) {
      const offset = 60;
      const elementPosition = similarJobsRef.current.offsetTop;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  }, [similarJobsVisible]);

  const getData = () => {
    axios
      .get(`https://api.skilotech.com/api/job/${id}/user/${userDataGlobal?._id}`)
      .then((res) => {
        setJobData([res.data.data]);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch((err) => {
        setnoLink(true);
        console.error(err);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {noLink ? (
        <div className="customMargins flex flex-col gap-[28px] justify-center items-center  min-h-[600px]">
          <img
            src="/images/noMore.png"
            className=" h-[250px] w-[250px]"
            alt=""
          />
          <p className="text-[#B3261E] text-[24px] font-[600]">Link is not valid any more</p>

        
        </div>
      ) : (
        <>
          {!loading ? (
            <div className="customMargins py-6 flex gap-5">
              <div className="flex flex-col gap-4 ml:max-w-[700px] w-full">
                <Job_card
                  jobData={jobData}
                  getData={getData}
                  setSaved={setSaved}
                  save={save}
                  setSimilarJobsVisible={setSimilarJobsVisible}
                  similarJobsVisible={similarJobsVisible}
                  isShared={isShared}
                />
                {/* <ApplicationStatus/> */}
                <Description
                  selectedJob={jobData[0]}
                  setLimitPopup={setLimitPopup}
                />

                <div ref={similarJobsRef}>
                  <SimilarJobs jobData={jobData[0]} />
                </div>
              </div>
              {isdata ? (
                <div className="w-[400px]  hidden ml:flex flex-col px-2 rounded-[16px] bg-[#FFFFFF]  pt-3  gap-1 h-fit">
                  <RelevantJobs
                    jobData={jobData[0]}
                    isdata={isdata}
                    setIsData={setIsData}
                  />
                </div>
              ) : (
                <div className="w-[262px] hidden scr1200:flex flex-col gap-6">
                  <img
                    src="/images/home/CandidatePoster1.png"
                    className="w-full"
                    alt="Event Flyer"
                  />
                  <img
                    src="/images/home/CandidatePoster2.png"
                    className="w-full"
                    alt="Generative AI"
                  />
                </div>
              )}
            </div>
          ) : (
            <div className="customMargins py-6 flex gap-5 w-full ">
              <div className="flex flex-col ju gap-4 ml:max-w-[700px] w-full ">
                <div className="h-[212px] w-full justify-between bg-white rounded-[12px] p-4 flex flex-col gap-1">
                  <div className="skeleton-line h-[24px] max-w-[140px]"></div>

                  <div className="skeleton-subtitle h-[20px]"></div>

                  <div className="skeleton-line h-[50px] w-full"></div>
                  <div className="skeleton-line h-[20px] max-w-[140px]"></div>

                  <div className="skeleton-line h-[1px] w-full"></div>
                  <div className="flex justify-between items-center">
                    <div className="skeleton-line h-[24px] max-w-[240px]"></div>
                    <div className="flex gap-2 ">
                      <div className="skeleton-line h-[40px] rounded-[30px] w-[90px] mb-0"></div>
                      <div className="skeleton-line h-[40px] rounded-[30px] w-[90px] mb-0"></div>
                    </div>
                  </div>
                </div>

                <div className="w-full bg-white rounded-[12px] p-4 flex flex-col gap-4 ">
                  <div className="flex flex-col gap-2 ">
                    <div className="skeleton-subtitle h-[20px]"></div>
                    <div className="skeleton-line h-[20px] max-w-[70%]"></div>
                    <div className="skeleton-line h-[50px] w-full"></div>
                    <div className="skeleton-line h-[20px] max-w-[140px]"></div>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 ">
                    <div className="skeleton-subtitle h-[20px]"></div>
                    <div className="skeleton-line h-[20px] max-w-[70%]"></div>
                    <div className="skeleton-line h-[50px] w-full"></div>
                    <div className="skeleton-line h-[20px] max-w-[140px]"></div>
                  </div>
                </div>
              </div>
              <div className="w-[400px]  hidden ml:flex flex-col px-2 pt-6 bg-[#FFFFFF] rounded-[16px] gap-1 h-fit">
                {[1, 2, 3, 4].map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-1 flex-col  justify-center items-center"
                  >
                    <div className="h-[169px] w-full bg-white rounded-[12px] p-4 flex flex-col gap-1">
                      <div className="skeleton-line h-[24px] max-w-[140px]"></div>

                      <div className="skeleton-subtitle h-[18px] min-w-[100%]"></div>

                      <div className="skeleton-subtitle h-[18px] min-w-[90%]"></div>
                      <div className="skeleton-subtitle h-[18px] min-w-[60%]"></div>
                    </div>
                    <div className="skeleton-subtitle h-[1px] min-w-[90%] "></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default JobDetails;
