import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Services() {
  const router = useRouter();
  const [candidate, setCandidate] = useState(true);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [isServices, setServices] = useState(true);
  const [isMove, setIsMove] = useState(false);
  const isLogin = useSelector((state) => state.auth.isLogin);
  useEffect(() => {

    const imagedownTimer = setTimeout(() => {
      setIsMove(true);
    }, 200);

    return () => {
      clearTimeout(imagedownTimer);
    };

  }, []);


  const loginListCandidate = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
      desc: "Provides concise, customized resumes for your career success.",
      color: "#06A9EF",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/cover.png",
      desc: "Highlight your application, key qualifications, and best skills",
      color: "#9747FF",
    },
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/collection.png",
      desc: "Save multiple resumes & cover letters in cloud storage",
      color: "#45ABA0",
    },
    // {
    //   name: "My Resumes",
    //   imgSrc: "/images/resumeBuilder/myResume.png",
    //   desc: "Save multiple resumes with multiple folders in cloud storage.",
    //   color: "#00D2EF",
    // },
    // {
    //   name: "Transform CV",
    //   imgSrc: "/images/resumeBuilder/transform_cv.png",
    //   desc: "Modify CV with AI to match any job description & get shortlisted.",
    //   color: "#428FF5",
    // },
    {
      name: "Skill Assessments & Certification",
      imgSrc: "/images/resumeBuilder/skill_assessments.png",
      desc: "Test your skills and improve knowledge to crack job interviews.",
      color: "#FE7701",
    },
    {
      name: "Ask Krut",
      imgSrc: "/images/resumeBuilder/bot1.png",
      desc: "Ask for anything and generate fast responses with our bot.",
      color: "#7994D8",
      new: "New",
    },
    {
      name: "My Website",
      imgSrc: "/images/resumeBuilder/website.png",
      desc: "Generate link to your profile preview to be seen anywhere.",
      color: "#FD3A84",
      new: "New",
    },
    // {
    //   name: "My Purchases",
    //   imgSrc: "/images/resumeBuilder/my_purchases.png",
    //   desc: "Details of subscription plan and paid services.",
    //   color: "#8901FF",
    // },
    {
      name: "Search Jobs",
      imgSrc: "/images/resumeBuilder/job.png",
      desc: "Find jobs matching to a particular resume and apply easily.",
      color: "#6441A5",
      new: "New",
    },
  ];

  const loginListRecruiter = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
      desc: "Provides concise, customized resumes for your career success.",
      color: "#06A9EF",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/cover.png",
      desc: "Highlight your application, key qualifications, and best skills",
      color: "#9747FF",
    },
    {
      name: "My Clients",
      imgSrc: "/images/resumeBuilder/my_clients.png",
      desc: "Business empowerment through customized care & strategy.",
      color: "#FE7701",
    },
    // {
    //   name: "Transform CV",
    //   imgSrc: "/images/resumeBuilder/transform_cv.png",
    //   desc: "Modify CV with AI to match any job description & get shortlisted.",
    //   color: "#428FF5",
    // },
    {
      name: "Job Description Matching",
      imgSrc: "/images/resumeBuilder/job_description_matching.png",
      desc: "Check eligibility level of multiple resumes with a job description.",
      color: "#B847FF",
    },
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/collection.png",
      desc: "Save multiple resumes & cover letters in cloud storage",
      color: "#45ABA0",
    },
    {
      name: "Ask Krut",
      imgSrc: "/images/resumeBuilder/bot1.png",
      desc: "Save multiple resumes with multiple clients in cloud storage.",
      color: "#7994D8",
      new: "New",
    },
    // {
    //   name: "My Purchases",
    //   imgSrc: "/images/resumeBuilder/my_purchases.png",
    //   desc: "Details of subscription plan and paid services.",
    //   color: "#8901FF",
    // },
    {
      name: "Post Jobs",
      imgSrc: "/images/resumeBuilder/job.png",
      desc: "Post new job openings to connect with more candidates.",
      color: "#6441A5",
      new: "New",
    },
  ];
  const [visible, setVisible] = useState(false);

  const handleNavigation = (page) => {
    router.push(page);
  };

  const list = () => {
    if (userDataGlobal?.role === "user") {
      return loginListCandidate;
    } else if (userDataGlobal?.role === "recruiter") {
      return loginListRecruiter;
    } else if (candidate) {
      return loginListCandidate;
    } else {
      return loginListRecruiter;
    }
  };

  function getServiceItemClassName(itemName) {
    switch (itemName) {
      case "Create New Resume":
        return "createResume";
      case "Create New Cover Letter":
        return "createCover";
      case "My Clients":
        return "myClinet";
      case "My Resumes":
        return "MyResume";
      case "Transform CV":
        return "TransFormCV";
      case "Job Description Matching":
        return "JobDes";
      case "My Collection":
        return "MyCollection";
      case "Skill Assessments & Certification":
        return "SkillAss";
      case "My Purchases":
        return "MyPurchase";
      case "Search Jobs":
        return "searchJobs";
      case "Post Jobs":
        return "postJobs";
      case "Ask Krut":
        return "chatBot";
      case "My Website":
        return "myWebsite";
      default:
        return "";
    }
  }

  function handleItemClick(itemName) {
    switch (itemName) {
      case "Create New Resume":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/createResume/BuildResume"
            : "/myClients/ClientResume"
        );
        break;
      case "Create New Cover Letter":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/coverLetter"
            : `/myClients/ClientResume?cover=true`
        );
        break;
      case "My Clients":
        handleNavigation("/myClients");
        break;
      case "My Resumes":
        handleNavigation("/candidate/MyCollection");
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
        handleNavigation(
          userDataGlobal.role === "user" ? "/candidate/MyCollection" : "/collection"
        );
        break;
      case "Skill Assessments & Certification":
        handleNavigation("/candidate/SkillAssessment");
        break;
      case "Ask Krut":
        handleNavigation("/chatbot");
        break;
      case "My Website":
        handleNavigation("/candidate/myWebsite");
        break;
      case "Search Jobs":
      case "Post Jobs":
        handleNavigation(
          userDataGlobal.role === "user" ? "/jobs/candidate" : "/jobs/list"
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="fixed z-[2000]  top-[71px] left-0 right-0 bottom-0 flex  justify-center w-full bg-[#FFF]  overflow-y-auto   ">
      <div className=" py-10  w-full  overflow-y-auto">
        <div
          className={`scr1400:px-[4%] flex gap-9 justify-center w-full transform transition-transform px-4  ease-in-out ${isMove
            ? "translate-y-0  opacity-100"
            : "translate-y-[30px] opacity-0 move"
            }`}
          style={{ transition: " all .2s linear" }}
        >
          <div className="flex flex-col gap-4">
            {(userDataGlobal?.role === "user"  || !isLogin) &&
              <button onClick={() => setCandidate(true)} className="w-[228px] bg-blue h-[42px] rounded-[8px] text-[#FFFFFF] flex items-center px-4 text-[14px] font-medium">
                Candidate

              </button>
            }
            {(userDataGlobal?.role === "recruiter" || !isLogin) &&
              <button onClick={() => setCandidate(false)} className="w-[228px] bg-[#FFDA1D] h-[42px] rounded-[8px] flex items-center px-4 text-[14px] font-medium">
                Recruiter

              </button>
            }
          </div>
          <div className="flex flex-col gap-6 w-[800px]  ">
            <div className="header1 text-[16px] font-semibold px-4 py-2 h-[36px] leading-tight text-[#FFF] w-[180px] ">
              Services
            </div>
            <div className="flex gap-6 flex-wrap">
              {list().map((item, index) => (
                <div
                  key={index}
                  className={`group rounded-[16px] ${(() =>
                    getServiceItemClassName(item.name))()}`}
                  onClick={() =>{isLogin && handleItemClick(item.name)}}
                  onMouseEnter={() => {
                    setVisible(index);
                  }}
                  onMouseLeave={() => setVisible(false)}
                >
                  <div
                    className={`flex items-start gap-[20px] px-4 py-3  ${visible !== index
                      ? "border border-[#DEDEDE]"
                      : "border border-[#FFF]"
                      } rounded-[8px]  w-[370px] h-[66px] ${isLogin ? "cursor-pointer" :"cursor-default"}`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imgSrc}
                        alt=""
                        className="w-[30px] h-[30px]"
                      />
                      <div className="w-[270px] flex flex-col gap-1 h-[43px]  ">
                        <div className="flex gap-3 items-center">
                          <span className="text-[12px] font-medium leading-tight">
                            {item.name}
                          </span>
                          {item.new && (
                            <div className="flex justify-center items-center px-1 h-[15px] bg-[#F72C2C] rounded-[4px] text-[#FFF] text-[10px] font-normal leading-tight">
                              {item.new}
                            </div>
                          )}
                        </div>

                        <p className="text-[10px] font-normal text-[#808080] leading-tight">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <div
                      className="opacity-0 group-hover:opacity-100 transform translate-x-[-16px] group-hover:translate-x-0 move"
                      style={{ transition: " all .3s linear" }}
                    >
                      <svg
                        width="24"
                        height="25"
                        viewBox="0 0 24 25"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g mask="url(#mask0_1897_29995)">
                          <path
                            d="M12.6 12.5L8 7.9L9.4 6.5L15.4 12.5L9.4 18.5L8 17.1L12.6 12.5Z"
                            fill={item.color}
                          />
                        </g>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
