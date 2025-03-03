import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Services() {
  const router = useRouter();
  const [candidate, setCandidate] = useState("user");
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
      imgSrc: "/images/resumeBuilder/servicesResume.png",
      desc: "Provides concise, customized resumes for your career success.",
      color: "#06A9EF",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/servicesCover.png",
      desc: "Highlight your application, key qualifications, and best skills",
      color: "#06A9EF",
    },
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/servicesCollection.png",
      desc: "Save multiple resumes & cover letters in cloud storage",
      color: "#06A9EF",
    },
 
    {
      name: "Skill Assessments & Certification",
      imgSrc: "/images/resumeBuilder/servicesSkill.png",
      desc: "Test your skills and improve knowledge to crack job interviews.",
      color: "#06A9EF",
    },
    {
      name: "Ask Krut",
      imgSrc: "/images/resumeBuilder/servicesChat.png",
      desc: "Ask for anything and generate fast responses with our bot.",
      color: "#06A9EF",
      new: "New",
    },
    {
      name: "My Website",
      imgSrc: "/images/resumeBuilder/servicesWebsite.png",
      desc: "Generate link to your profile preview to be seen anywhere.",
      color: "#06A9EF",
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
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      desc: "Find jobs matching to a particular resume and apply easily.",
      color: "#06A9EF",
      new: "New",
    },
  ];

  const loginListRecruiter = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/servicesResume.png",
      desc: "Provides concise, customized resumes for your career success.",
      color: "#06A9EF",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/servicesCover.png",
      desc: "Highlight your application, key qualifications, and best skills",
      color: "#06A9EF",
    },
    {
      name: "My Candidates",
      imgSrc: "/images/resumeBuilder/servicesCandidate.png",
      desc: "Business empowerment through customized care & strategy.",
      color: "#06A9EF",
    },

    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/servicesJd.png",
      desc: "Check eligibility level of multiple resumes with a job description.",
      color: "#06A9EF",
    },
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/servicesCollection.png",
      desc: "Save multiple resumes & cover letters in cloud storage",
      color: "#06A9EF",
    },

    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      desc: "Post new job openings to connect with more candidates.",
      color: "#06A9EF",
      new: "New",
    },
    {
      name: "Hiring",
      imgSrc: "/images/resumeBuilder/servicesHiring.png",
      desc: "Find top talent faster with our advanced hiring tools.",
      color: "#06A9EF",
      new: "New",
    },


  ];
  const loginListEmployer = [


    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/servicesJd.png",
      desc: "Check eligibility level of multiple resumes with a job description.",
      color: "#06A9EF",
    },
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/servicesCollection.png",
      desc: "Save multiple resumes & cover letters in cloud storage",
      color: "#06A9EF",
    },
   
    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      desc: "Post new job openings to connect with more candidates.",
      color: "#06A9EF",
      new: "New",
    },
    {
      name: "Requisition",
      imgSrc: "/images/resumeBuilder/servicesRequisition.png",
      desc: "simplify your hiring requests with our requisition management tools.",
      color: "#06A9EF",
      new: "New",
    },
    {
      name: "Hiring",
      imgSrc: "/images/resumeBuilder/servicesHiring.png",
      desc: "Find top talent faster with our advanced hiring tools.",
      color: "#06A9EF",
      new: "New",
    },
    {
      name: "Preboarding",
      imgSrc: "/images/resumeBuilder/servicesPreboarding.png",
      desc: "Create a seamless transition for your new hires with our preboarding solutions.",
      color: "#06A9EF",
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
    } else if (userDataGlobal?.role === "employer") {
      return loginListEmployer;
    } else if (candidate === "user") {
      return loginListCandidate;
    } else if (candidate === "recruiter") {
      return loginListRecruiter;
    } else if (candidate === "employer") {
      return loginListEmployer;
    } else {
      return loginListRecruiter;
    }
  };

  function getServiceItemClassName(itemName) {
    switch (itemName) {
      case "Create New Resume":
        return "createResume";
      case "Create New Cover Letter":
        return "createResume";
      case "My Candidates":
        return "createResume";
      case "My Resumes":
        return "createResume";
      case "Transform CV":
        return "createResume";
      case "JD Matching":
        return "createResume";
      case "My Collection":
        return "createResume";
      case "Skill Assessments & Certification":
        return "createResume";
      case "My Purchases":
        return "createResume";
      case "Search Jobs":
        return "createResume";
      case "Job Posting":
        return "createResume";
      case "Ask Krut":
        return "createResume";
      case "My Website":
        return "createResume";
      case "Hiring":
        return "createResume";
      case "Preboarding":
        return "createResume";
        case "Requisition":
          return "createResume";
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
            : "/candidates/ClientResume"
        );
        break;

      case "Create New Cover Letter":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/coverLetter"
            : `/myClients/ClientResume?cover=true`
        );
        break;
      case "My Candidates":
        handleNavigation("/candidates");
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
          userDataGlobal?.role === "user" ? "/candidate/MyCollection" : "/collection"
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
          userDataGlobal?.role === "user" ? "/jobs/candidate" : "/jobs/list"
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="fixed z-[2000]  top-[61px] left-0 right-0 bottom-0 flex  justify-center w-full bg-[#FFF]  overflow-y-auto   ">
      <div className=" py-10  w-full  overflow-y-auto">
        <div
          className={`scr420:px-4 px-2 flex scr700:flex-row flex-col scr700:gap-9 gap-6 justify-center w-full transform transition-transform   ease-in-out ${isMove
            ? "translate-y-0  opacity-100"
            : "translate-y-[30px] opacity-0 move"
            }`}
          style={{ transition: " all .2s linear" }}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-row scr700:flex-col gap-4">
              {(userDataGlobal?.role === "user" || !isLogin) &&
                <button onClick={() => setCandidate("user")} className={`w-[228px] ${candidate === "user" ? "bg-blue text-white " : "border border-blue hover:border-[#0275A7] hover:text-white"} h-[36px] rounded-[8px]  hover:bg-[#0275A7] flex items-center px-4 text-[14px] font-medium`}>
                  Candidate

                </button>
              }
              {(userDataGlobal?.role === "recruiter" || !isLogin) &&
                <button onClick={() => setCandidate("recruiter")} className={`w-[228px] ${candidate === "recruiter" ? "bg-blue text-white" : "border border-blue hover:border-[#0275A7] hover:text-white"} h-[36px] rounded-[8px]  flex items-center hover:bg-[#0275A7]  px-4 text-[14px] font-medium`}>
                  Recruiter

                </button>
              }
              {(userDataGlobal?.role === "employer" || !isLogin) &&
                <button onClick={() => setCandidate("employer")} className={`w-[228px] ${candidate === "employer" ? "bg-blue text-white" : "border border-blue hover:border-[#0275A7] hover:text-white"} h-[36px] rounded-[8px]  flex items-center hover:bg-[#0275A7] px-4 text-[14px] font-medium`}>
                  Employer

                </button>
              }
            </div>
            {(candidate === "employer" || candidate === "recruiter") ?
              <img
                src="/images/serviceLeftRecruiter.png"
                alt=""
                className="w-[228px] h-[346px] rounded-[8px]"
                
              />



              :
              <img
                src="/images/serviceLeftCandidate.png"
                alt=""
                className="w-[228px] h-[346px]"
              />
            }
          </div>
          <div className="flex flex-col gap-6 scr700:w-[800px]  ">
            <div className="header1 text-[16px] font-semibold px-4 py-2 h-[36px] leading-tight text-[#FFF] w-[180px] ">
              Services
            </div>
            <div className="flex gap-6 flex-wrap">
              {list().map((item, index) => (
                <div
                  key={index}
                  className={`group rounded-[16px] ${(() =>
                    getServiceItemClassName(item.name))()}`}
                  onClick={() => { isLogin && handleItemClick(item.name) }}
                  onMouseEnter={() => {
                    setVisible(index);
                  }}
                  onMouseLeave={() => setVisible(false)}
                >
                  <div
                    className={`flex items-start gap-[20px] scr420:px-4 px-2 scr420:py-3 py-2  ${visible !== index
                      ? "border border-[#DEDEDE]"
                      : "border border-[#FFF]"
                      } rounded-[8px]  scr420:w-[370px] h-[66px] ${isLogin ? "cursor-pointer" : "cursor-default"}`}
                  >
                    <div className="flex items-center scr420:gap-3 gap-2">
                      <img
                        src={item.imgSrc}
                        alt=""
                        className="w-[30px] h-[30px]"
                      />
                      <div className="scr420:w-[270px] w-full flex flex-col gap-1 h-[43px]  ">
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
