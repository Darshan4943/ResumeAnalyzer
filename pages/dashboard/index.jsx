import React, { useEffect, useRef, useState } from "react";
import StackedBarChart from "../../components/common/StackedBarChart";
import { useSelector } from "react-redux";
import { camelCase } from "../../utils/middleware";
import { useRouter } from "next/router";
import SubscriptionPlans from "../../components/featured/home/SubscriptionPlans";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import TopSection from "../../components/featured/dashboard/TopSection";
import JobStatistics from "../../components/featured/dashboard/JobStatistics";
import RecentApplications from "../../components/featured/dashboard/RecentApplications";
import CountUp from "react-countup";

function Dashboard({ toggleContentt }) {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("Daily");
  const [isPending, setIsPending] = useState("");
  const router = useRouter();
  const [pendingJobs, setPendingJobs] = useState(false);
  const pendingJobsRef = useRef(null);

  const scrollToPendingJobs = () => {
    if (pendingJobsRef.current) {
      const offset = 64;
      const elementPosition = pendingJobsRef.current.offsetTop;
      setIsPending("Pending");
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };
  const scrollToInterviewJobs = () => {
    if (pendingJobsRef.current) {
      const offset = 64;
      const elementPosition = pendingJobsRef.current.offsetTop;
      setIsPending("Interview");
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };


  const handleNavigation = (page) => {
    router.push(page);
  };
  const loginListRecruiter = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/cover.png",
    },
    { name: "Candidates", imgSrc: "/images/resumeBuilder/my_clients.png" },
    // { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/job_description_matching.png",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/collection.png",
    },
    // { name: "Ask Krut", imgSrc: "/images/resumeBuilder/bot1.png", new: "New" },
    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/job.png",
      new: "New",
    },
    { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png" },
  ];
  const list = () => {
    if (userDataGlobal?.role === "user") {
      return loginListCandidate;
    } else if (userDataGlobal?.role === "recruiter") {
      return loginListRecruiter;
    } else return loginListRecruiter;
  };
  function handleItemClick(itemName) {
    switch (itemName) {
      case "Create New Resume":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/home/BuildResume"
            : "/candidates/ClientResume"
        );
        break;
      case "Create New Cover Letter":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/coverLetter"
            : `/candidates/ClientResume?cover=true`
        );
        break;
      case "Candidates":
        handleNavigation("/candidates");
        break;
      case "Resume":
        handleNavigation("/home/MyCollection");
        break;
      case "Transform CV":
        handleNavigation("/transform/TransformJob");
        break;
      case "JD Matching":
        handleNavigation("/JobMatching");
        break;
      case "My Purchases":
        handleNavigation("/purchase/MyPurchase");
        break;
      case "My Website":
        handleNavigation("/myWebsite");
        break;
      case "Ask Krut":
        handleNavigation("/chatbot");
        break;
      case "My Collection":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/home/MyCollection"
            : "/myCollection?folders=true"
        );
        break;
      case "Skill Assessments & Certification":
        handleNavigation("/home/SkillAssessment");
        break;
      case "Search Jobs":
      case "Job Posting":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/jobs/search"
            : "/common/jobPosting"
        );
        break;
      default:
        break;
    }
  }
  const handleNavigate = (applicantId, jobId) => {
    router.push(
      `/employer/hiring/ApplicantDetails?applicantId=${applicantId}&id=${jobId}`
    );
  };

  const fetchJobStatistics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/job/getJobStatistics/${userDataGlobal?._id}`
      );
      setStatistics(response.data);
    } catch (err) {
      setError("Failed to fetch job statistics");
    }
  };

  useEffect(() => {
    fetchJobStatistics();
  }, [userDataGlobal?._id]);

  const fetchJobAnalytics = async () => {
    try {
      const response = await axios.get(
        `http://localhost:2000/api/job/getJobAnalytics/${userDataGlobal?._id}`,
        { params: { selected } }
      );
      setData(response.data);
    } catch (error) {
      console.error(
        "Error fetching job statistics:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (userDataGlobal?._id && selected) fetchJobAnalytics();
  }, [userDataGlobal?._id, selected]);

  return (
    <div
      className="   w-[100%]  overflow-y-auto "
      style={{ scrollbarWidth: "none" }}
    >
      <TopSection
        statistics={statistics}
        scrollToInterviewJobs={scrollToInterviewJobs}
        scrollToPendingJobs={scrollToPendingJobs}
      />
      <div className="scr1300:flex scr1300:flex-row flex flex-col w-full pt-6 justify-between">
        <div className="w-[100%] scr1300:w-[31.26%] flex flex-col scr700:flex-row scr700:justify-between scr1168:justify-start scr1300:flex-col items-start scr1300:pt-0 pb-4 gap-6">
          <div className="w-[100%] scr700:w-[48%] scr1300:w-[100%] flex flex-col scr1168:flex-row scr1300:flex-col gap-6">
            <div
              className="flex justify-between items-center px-6 py-[16px] lg:py-[16px] w-full"
              style={{
                borderRadius: "6px",
                backgroundColor: "#fff",
                boxShadow:
                  "0px 4px 0px 0px #FFB836 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex  items-center w-full">
                <div className="flex gap-2 items-center w-full ">
                  <svg
                    xlgns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle cx="5" cy="5" r="5" fill="#FFB836" />
                  </svg>
                  <div className="flex justify-between items-center w-[100%]">
                    <p className="text-[#646464] text-[16px] font-semibold">
                      Total Jobs Posted
                    </p>

                    <div className="flex px-1 py-[18px] gap-[10px] items-center rounded-[6px] ">
                      <p className="text-[#333333] text-[20px] font-[600] font-[Montserrat]">
                        <CountUp end={statistics.totalJobs} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="flex justify-between items-center px-6 py-[16px] lg:py-[16px]   w-full"
              style={{
                borderRadius: "6px",
                backgroundColor: "#fff",
                boxShadow:
                  "0px 4px 0px 0px #14AEF0 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex  items-center w-full">
                <div className="flex gap-2 items-center w-full ">
                  <svg
                    xlgns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle cx="5" cy="5" r="5" fill="#14AEF0" />
                  </svg>
                  <div className="flex justify-between items-center w-[100%]">
                    <p className="text-[#646464] text-[16px] font-semibold">
                      Total Applications
                    </p>

                    <div className="flex px-1 py-[18px] gap-[10px] items-center rounded-[6px] ">
                      <p className="text-[#333333] text-[20px] font-[600] font-[Montserrat]">
                        <CountUp end={statistics.totalApplications} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[100%] scr700:w-[48%]  scr1300:w-[100%] flex flex-col scr1168:flex-row scr1300:flex-col gap-6">
            {userDataGlobal?.role == "employer" ? (
              <div
                className="flex justify-between items-center px-6 py-[16px] lg:py-[16px]   w-full"
                style={{
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                  boxShadow:
                    "0px 4px 0px 0px #56CDAD inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="flex  items-center w-full">
                  <div className="flex gap-2 items-center w-full ">
                    <svg
                      xlgns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <circle cx="5" cy="5" r="5" fill="#56CDAD" />
                    </svg>
                    <div className="flex justify-between items-center w-[100%]">
                      <p className="text-[#646464] text-[16px] font-semibold">
                        Hired
                      </p>

                      <div className="flex px-1 py-[18px] gap-[10px] items-center rounded-[6px] ">
                        <p className="text-[#333333] text-[20px] font-[600] font-[Montserrat]">
                          <CountUp end={statistics.shortlisted} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="flex justify-between items-center px-6 py-[16px] lg:py-[16px]   w-full"
                style={{
                  borderRadius: "6px",
                  backgroundColor: "#fff",
                  boxShadow:
                    "0px 4px 0px 0px #56CDAD inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <div className="flex  items-center w-full">
                  <div className="flex gap-2 items-center w-full ">
                    <svg
                      xlgns="http://www.w3.org/2000/svg"
                      width="10"
                      height="10"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <circle cx="5" cy="5" r="5" fill="#56CDAD" />
                    </svg>
                    <div className="flex justify-between items-center w-[100%]">
                      <p className="text-[#646464] text-[16px] font-semibold">
                        Shortlisted
                      </p>

                      <div className="flex px-1 py-[18px] gap-[10px] items-center rounded-[6px] ">
                        <p className="text-[#333333] text-[20px] font-[600] font-[Montserrat]">
                          <CountUp end={statistics.shortlisted} />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div
              className="flex justify-between items-center px-6 py-[16px] lg:py-[16px]   w-full"
              style={{
                borderRadius: "6px",
                backgroundColor: "#fff",
                boxShadow:
                  "0px 4px 0px 0px #FF6550 inset, 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex  items-center w-full">
                <div className="flex gap-2 items-center w-full ">
                  <svg
                    xlgns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                  >
                    <circle cx="5" cy="5" r="5" fill="#FF6550" />
                  </svg>
                  <div className="flex justify-between items-center w-[100%]">
                    <p className="text-[#646464] text-[16px] font-semibold">
                      Rejected
                    </p>

                    <div className="flex px-1 py-[18px] gap-[10px] items-center rounded-[6px] ">
                      <p className="text-[#333333] text-[20px] font-[600] font-[Montserrat]">
                        <CountUp end={statistics.rejected} />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <JobStatistics
          statistics={statistics}
          setSelected={setSelected}
          selected={selected}
          data={data}
        />
      </div>
      <div ref={pendingJobsRef}>
        <RecentApplications isPending={isPending} />
      </div>

      <div className="py-6 px-1 flex flex-col gap-6 ">
        <p className="text-[20px] font-semibold text-[#333333]">Services</p>
        <div
          // style={{ border: "2px solid red" }}
          className="flex gap-[16px] scr420:gap-12 flex-wrap justify-start "
        >
          {list().map((item, index) => (
            <div
              key={index}
              className={
                "job-card relative scr420:w-[162.67px] w-[132px] scr420:h-[154px] h-[124px] scr420:p-4 p-3 cursor-pointer flex flex-col items-center scr420:gap-3 gap-2 justify-center text-center bg-white"
              }
              onClick={() => handleItemClick(item.name)}
            >
              <img
                src={item.imgSrc}
                alt=""
                className="scr420:w-[48px] w-[40px]  scr420:h-[48px] h-[40px] "
              />

              <div className="scr420:text-[14px] text-[12px] font-medium">
                {item.name}
              </div>
              {item.new && (
                <div className=" absolute scr420:right-4  scr420:top-4 right-2 top-2 flex justify-center items-center px-2  py-2 scr420:h-[19px] h-[15px] bg-[#F72C2C] rounded-[4px] text-[#FFF] scr420:text-[12px] text-[10px] font-medium leading-tight">
                  {item.new}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="py-6  flex flex-col gap-6">
        <p className="text-[20px] font-semibold text-[#333333]">
          Purchase Plans
        </p>
        <SubscriptionPlans />
      </div>
    </div>
  );
}

export default Dashboard;
