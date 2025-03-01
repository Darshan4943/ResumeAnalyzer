import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Services() {
  const router = useRouter();
  const [candidate, setCandidate] = useState(true);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const [isServices, setServices] = useState(true);
  const [isMove, setIsMove] = useState(false);
  const loginListRecruiter = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/servicesResume.png",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/servicesCover.png",
    },
    { name: "My Candidates", imgSrc: "/images/resumeBuilder/servicesCandidate.png" },

    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/servicesJd.png",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/servicesCollection.png",
    },

    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      new: "New",
    },

    {
      name: "Hiring",
      imgSrc: "/images/resumeBuilder/servicesHiring.png",
      new: "New",
    },


  ];
  const loginListEmployer = [

    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/servicesJd.png",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/servicesCollection.png",
    },

    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      new: "New",
    },
    {
      name: "Requisition",
      imgSrc: "/images/resumeBuilder/servicesRequisition.png",
      new: "New",
    },
    {
      name: "Hiring",
      imgSrc: "/images/resumeBuilder/servicesHiring.png",
      new: "New",
    },
    {
      name: "Preboarding",
      imgSrc: "/images/resumeBuilder/servicesPreboarding.png",
      new: "New",
    },

  ];

  
  const handleNavigation = (page) => {
    router.push(page);
  };


  const handleNavigate = (applicantId, jobId) => {
    router.push(
      `/employer/hiring/ApplicantDetails?applicantId=${applicantId}&id=${jobId}`
    );
  };
  const list = () => {
    if (userDataGlobal?.role === "employer") {
      return loginListEmployer;
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
      case "My Candidates":
        handleNavigation("/candidates");
        break;
      case "Resume":
        handleNavigation("/home/MyCollection");
        break;
      case "Transform CV":
        handleNavigation("/transform/TransformJob");
        break;
      case "JD Matching":
        handleNavigation("/JobMatching/SelectJob");
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
      case "Requisition":
        handleNavigation("/employer/requisition");
        break;
        case "Hiring":
        handleNavigation("/common/hiring");
        break;
        case "Preboarding":
          handleNavigation("/employer/Preboarding");
          break;
      default:
        break;
    }
  }

  return (
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
  );
}

export default Services;
