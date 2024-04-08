import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { camelCase } from "../../utils/middleware";
import Summery from "../../components/featured/candidate/createResume/components/summery";
import { useRouter } from "next/router";
import { plans } from "../../utils/data";
import axios from "axios";
function Dashboard() {
  const userDataGlobal = useSelector((state) => state.userData);
  const router = useRouter();
  const [limits, setLimits] = useState({
    used: { uploads: 0, download: 0, save: 0, clients: 0 },
    total: { uploads: 0, download: 0, save: 0, clients: 0 },
  });

  const [isActive, setIsActive] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const handleNavigation = (page) => {
    router.push(page);
  };
  const toggle = () => {
    if (userDataGlobal.role === "user") {
      router.push("/home/BuildResume");
    } else if (userDataGlobal.role === "recruiter") {
      router.push("/myClients/ClientResume");
    }
  };

  const loginListCandidate = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
    },
    { name: "My Resumes", imgSrc: "/images/resumeBuilder/myResume.png" },
    { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
    {
      name: "Skill Assessments",
      imgSrc: "/images/resumeBuilder/skill_assessments.png",
    },
    { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png" },
    { name: "Search Jobs", imgSrc: "/images/resumeBuilder/job.png" },
  ];

  const loginListRecruiter = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
    },
    { name: "My Clients", imgSrc: "/images/resumeBuilder/my_clients.png" },
    { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
    {
      name: "Job Description Matching",
      imgSrc: "/images/resumeBuilder/job_description_matching.png",
    },
    { name: "My Collection", imgSrc: "/images/resumeBuilder/collection.png" },
    { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png" },
    { name: "Post Jobs", imgSrc: "/images/resumeBuilder/job.png" },
  ];

  const list = () => {
    if (userDataGlobal.role === "user") {
      return loginListCandidate;
    } else if (userDataGlobal.role === "recruiter") {
      return loginListRecruiter;
    } else return loginListRecruiter;
  };

  function handleItemClick(itemName) {
    switch (itemName) {
      case "Create New Resume":
        handleNavigation(
          userDataGlobal.role === "user"
            ? "/home/BuildResume"
            : "/myClients/ClientResume"
        );
        break;
      case "My Clients":
        handleNavigation("/myClients");
        break;
      case "My Resumes":
        handleNavigation("/home/MyCollection");
        break;
      case "Transform CV":
        handleNavigation("/transform/TransformJob");
        break;
      case "Job Description Matching":
        handleNavigation("/transform/JobMatching");
        break;
      case "My Purchases":
        handleNavigation("/purchase/MyPurchase");
        break;
      case "My Collection":
        handleNavigation("/collection");
        break;
      case "Skill Assessments":
        handleNavigation("/home/SkillAssessment");
        break;
      case "Search Jobs":
      case "Post Jobs":
        handleNavigation(
          userDataGlobal.role === "user" ? "/jobs/search" : "/jobs/list"
        );
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    const selectedPlan = localStorage.getItem("activePlan");
    const uploadCount = localStorage.getItem("uploadCount");
    const downloadCount = localStorage.getItem("downloadCount");
    const saveCount = localStorage.getItem("saveCount");
    const clientCount = localStorage.getItem("clientCount");
    const planActive = localStorage.getItem("planActive");
    const plan = plans.find((item) => item.index == selectedPlan);
    if (plan) {
      setSelectedPlan(plan);
    
    if (planActive == "true") {
      setIsActive(true);
      setLimits({
        used: {
          uploads: plan.limits.uploads - parseInt(uploadCount),
          download: plan.limits.download - parseInt(saveCount),
          save: plan.limits.save - parseInt(saveCount),
          clients: plan.limits.clients - parseInt(clientCount),
        },
        total: plan.limits,
      });
    }
}
  }, []);

  return (
    <div className="customMargins flex flex-col gap-12 py-6 min-h-[70vh]">
      <div className="flex ml:flex-row flex-col gap-4">
        <div
          className="flex flex-col gap-6 p-4 rounded-[16px] ml:min-w-[336px] ml:max-w-[336px] ml:h-[297px]"
          style={{
            background:
              "linear-gradient(31.62deg, #06A9EF 14.94%, #A2E3FF 99.61%)",
          }}
        >
          <div className="flex gap-4 items-center">
            <img
              src="/images/resumeBuilder/Illustration.png"
              alt=""
              className="w-[118px] h-[110px]"
            />
            <div className="flex flex-col gap-3">
              <div
                className="text-[18px] font-semibold p-2 rounded-l-[6px] leading-tight text-[#06A9EF] scr360:w-[186px] w-[156px] mr-[-16px]"
                style={{
                  background:
                    "linear-gradient(89.03deg, #FFFFFF 0.83%, rgba(255, 254, 254, 0) 98.41%)",
               
                }}
              >
                Hello,
              </div>
              {userDataGlobal?.firstName && (
                <div className="text-[24px] text-[#FFFFFF] font-semibold leading-tight">
                  <p> {camelCase(userDataGlobal?.firstName)}</p>
                  <p> {camelCase(userDataGlobal?.lastName)}!</p>
                </div>
              )}
            </div>
          </div>
          <div className="text-[14px] font-medium text-[#FFFFFF] flex flex-col gap-4">
            Unleash the power of AI to build a resume that speaks volumes and
            lands your dream job effortlessly.
            <div
              onClick={() => toggle()}
              className="rounded-[8px] bg-[#FFFFFF] px-4 py-3 text-[16px] flex gap-1 text-[#06A9EF] justify-center items-center leading-tight ml:w-full w-[150px] cursor-pointer"
            >
              Get Started
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g mask="url(#mask0_1787_24766)">
                  <path
                    d="M13.124 10.7493H3.99902V9.24927H13.124L8.93652 5.06177L9.99902 3.99927L15.999 9.99927L9.99902 15.9993L8.93652 14.9368L13.124 10.7493Z"
                    fill="#06A9EF"
                  />
                </g>
              </svg>
            </div>
          </div>
        </div>
        <Summery
          limits={limits}
          selectedPlan={selectedPlan}
          isActive={isActive}
        />
      </div>
      <div className="flex gap-12 flex-wrap justify-center">
        {list().map((item, index) => (
          <div
            key={index}
            className={
              "job-card scr420:w-[162.67px] w-[120px] scr420:h-[154px] h-[120px] scr420:p-4 p-3 cursor-pointer flex flex-col items-center scr420:gap-3 gap-2 justify-center text-center"
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
