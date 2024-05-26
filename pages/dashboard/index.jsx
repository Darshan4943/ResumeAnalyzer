import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { camelCase } from "../../utils/middleware";
import Summery from "../../components/featured/candidate/createResume/components/summery";
import { useRouter } from "next/router";
import { plans, templates } from "../../utils/data";

import axios from "axios";

function Dashboard() {
  const userDataGlobal = useSelector((state) => state.userData);
  const router = useRouter();
  const [limits, setLimits] = useState({
    used: { uploads: 0, download: 0, save: 0, clients: 0 },
    total: { uploads: 0, download: 0, save: 0, clients: 0 },
  });
  const [data, setData] = useState({});
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
    { name: "Chat Bot", imgSrc: "/images/resumeBuilder/bot.png" },
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
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/collechttps://jamblix.comMy Purchases",
      imgSrc: "/images/resumeBuilder/my_purchases.png",
    },
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
      case "Chat Bot":
        handleNavigation("/chatbot");
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

    // const plan = plans.find((item) => item.index == selectedPlan);
    // console.log(118, plan);
    // if (plan) {
    //   setSelectedPlan(plan);

    if (userDataGlobal) {
      axios
        .get("https://jamblix.com/api/subscription/" + userDataGlobal._id)
        .then((res) => {
          const plan = plans.find(
            (item) =>
              item.duration + " " + item.limit == res.data.findIsActive?.plan
          );
          if (res.data.findIsActive.isActive === true) {
            setIsActive(true);
          }

          if (plan) {
            setSelectedPlan(plan);

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
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // if (planActive == "true") {
    //   setIsActive(true);
    // setLimits({
    //   used: {
    //     uploads: plan.limits.uploads - parseInt(uploadCount),
    //     download: plan.limits.download - parseInt(saveCount),
    //     save: plan.limits.save - parseInt(saveCount),
    //     clients: plan.limits.clients - parseInt(clientCount),
    //   },
    //   total: plan.limits,
    // });
    // }
    // }
  }, [userDataGlobal]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
      // setIsClient(true);
    }
  }, []);

  // const MyComponent = ({ selectedResumeIndex }) => {
  //   console.log(220, selectedResumeIndex);
  //   return (
  //     <PDFViewer width="220" height="226" showToolbar={false}>
  //       <Document>{selectResumeTemplate(selectedResumeIndex)}</Document>
  //     </PDFViewer>
  //   );
  // };

  function formatDate(inputDate) {
    const dateObj = new Date(inputDate);
    const day = dateObj.getUTCDate().toString().padStart(2, "0");
    const month = (dateObj.getUTCMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = dateObj.getUTCFullYear();

    return `${day}/${month}/${year}`;
  }

  function hasNonEmptyKey(obj) {
    for (let key in obj) {
      if (key !== "") {
        return true;
      }
    }
    return false;
  }

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
              className="  rounded-[8px] bg-[#FFFFFF] px-4 py-3 text-[16px] flex gap-1 text-[#06A9EF] justify-center items-center leading-tight ml:w-full w-[152px] cursor-pointer"
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
      <div
        // style={{ border: "2px solid red" }}
        className="flex gap-12 flex-wrap justify-center"
      >
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

      {userDataGlobal.role === "user" &&
        data !== undefined &&
        hasNonEmptyKey(data) && (
          <div className="flex gap-6 flex-wrap flex-col sm:items-start items-center ">
            <div className="text-[24px] font-Montserrat font-medium">
              Continue where you left
            </div>
            <div className="w-[35%] sm:min-w-[400px] min-w-[250px] items-start justify-center gap-[36px] sm:gap-[12px] p-[24px] bg-[#F9F9F9] rounded-[24px] flex sm:flex-row flex-col">
              <div className="w-[50%] min-w-[200px] h-full">
                {templates.find(
                  (item) => item.index === data.selectedResumeIndex
                ) && (
                    <img
                      src={
                        templates.find(
                          (item) => item.index === data.selectedResumeIndex
                        ).imgUrl
                      }
                      style={{
                        height: "100%",
                        width: "90%",
                        objectFit: "cover",
                      }}
                      alt={`Resume template ${data.selectedResumeIndex}`} // Adding an alt attribute for accessibility
                    />
                  )}
              </div>

              <div className="w-[40%] flex flex-col gap-4 min-w-[160px]">
                <span className="font-Montserrat text-[18px] font-medium text-[#333333] break-all">
                  {data.firstName}_resume.pdf
                </span>
                {data?.createdAt && data.createdAt !== "" && (
                  <span className="font-Montserrat text-[14px] text-[#808080]">
                    Updated on {formatDate(data.createdAt)}
                  </span>
                )}

                <div
                  onClick={() => {
                    localStorage.removeItem("parsedResume");
                    // router.push(
                    //   `/home/createResume?clientId=${
                    //     data?.clientId
                    //   }&continueEdit=${true}`
                    // );

                    router.push(
                      `/home/createResume?clientId=${data?.clientId}&continueEdit=true`
                    );
                  }}
                >
                  <div className="flex flex-row gap-2 cursor-pointer">
                    <svg
                      width="25"
                      height="24"
                      viewBox="0 0 25 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_2918_34640)">
                        <path
                          d="M5.86719 19H7.29219L17.0672 9.225L15.6422 7.8L5.86719 17.575V19ZM3.86719 21V16.75L17.0672 3.575C17.2672 3.39167 17.488 3.25 17.7297 3.15C17.9714 3.05 18.2255 3 18.4922 3C18.7589 3 19.0172 3.05 19.2672 3.15C19.5172 3.25 19.7339 3.4 19.9172 3.6L21.2922 5C21.4922 5.18333 21.638 5.4 21.7297 5.65C21.8214 5.9 21.8672 6.15 21.8672 6.4C21.8672 6.66667 21.8214 6.92083 21.7297 7.1625C21.638 7.40417 21.4922 7.625 21.2922 7.825L8.11719 21H3.86719ZM16.3422 8.525L15.6422 7.8L17.0672 9.225L16.3422 8.525Z"
                          fill="#06A9EF"
                        />
                      </g>
                    </svg>

                    <p className="font-Montserrat text-[16px] font-medium text-[#333333]">
                      Edit
                    </p>
                  </div>
                </div>
                <button
                  className="w-[154px] h-[36px] px-[6px] py-[6px] rounded-[8px] bg-[#06A9EF] text-[#FFFFFF] text-[14px]"
                  onClick={() => {
                    localStorage.removeItem("userData");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}

export default Dashboard;
