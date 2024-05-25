import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Services({ isServices, isMove, setIsMove }) {
  const router = useRouter();

  useEffect(() => {
    if (isServices) {
      const imagedownTimer = setTimeout(() => {
        setIsMove(true);
      }, 200);

      return () => {
        clearTimeout(imagedownTimer);
      };
    }
  }, [isServices]);

  const userDataGlobal = useSelector((state) => state.userData);
  const loginListCandidate = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
      desc: "Provides concise, customized resumes for your career success.",
      color: "#06A9EF",
    },
    {
      name: "My Resumes",
      imgSrc: "/images/resumeBuilder/myResume.png",
      desc: "Save multiple resumes with multiple folders in cloud storage.",
      color: "#00D2EF",
    },
    {
      name: "Transform CV",
      imgSrc: "/images/resumeBuilder/transform_cv.png",
      desc: "Modify CV with AI to match any job description & get shortlisted.",
      color: "#428FF5",
    },
    {
      name: "Skill Assessments",
      imgSrc: "/images/resumeBuilder/skill_assessments.png",
      desc: "Test your skills and improve knowledge to crack job interviews.",
      color: "#FE7701",
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
      name: "My Clients",
      imgSrc: "/images/resumeBuilder/my_clients.png",
      desc: "Business empowerment through customized care & strategy.",
      color: "#FE7701",
    },
    {
      name: "Transform CV",
      imgSrc: "/images/resumeBuilder/transform_cv.png",
      desc: "Modify CV with AI to match any job description & get shortlisted.",
      color: "#428FF5",
    },
    {
      name: "Job Description Matching",
      imgSrc: "/images/resumeBuilder/job_description_matching.png",
      desc: "Check eligibility level of multiple resumes with a job description.",
      color: "#B847FF",
    },
    {
      name: "My Collection",
      imgSrc: "/images/resumeBuilder/collection.png",
      desc: "Save multiple resumes with multiple clients in cloud storage.",
      color: "#45ABA0",
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
    if (userDataGlobal.role === "user") {
      return loginListCandidate;
    } else if (userDataGlobal.role === "recruiter") {
      return loginListRecruiter;
    } else return loginListRecruiter;
  };

  function getServiceItemClassName(itemName) {
    switch (itemName) {
      case "Create New Resume":
        return "createResume";
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
      case "Skill Assessments":
        return "SkillAss";
      case "My Purchases":
        return "MyPurchase";
      case "Search Jobs":
        return "searchJobs";
      case "Post Jobs":
        return "postJobs";
      default:
        return "";
    }
  }

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

  return ( 
    <div className="fixed z-[2000] top-[57px] left-0 right-0 bottom-0 flex  justify-center w-full bg-[#FFF]  overflow-y-auto  ">
      <div className=" py-10  w-full  overflow-y-auto">
        <div
          className={`scr1400:px-[4%] flex gap-9 justify-center w-full transform transition-transform  ease-in-out ${isMove
              ? "translate-y-0  opacity-100"
              : "translate-y-[30px] opacity-0 move"
            }`}
          style={{ transition: " all .2s linear" }}
        >
          <div className="flex flex-col gap-[24px]">
            <div
              onClick={() => router.push("/home")}
              className={` group min-w-[272px] h-[186px] `}
            >
              <div className="border border-[#DEDEDE] group-hover:border group-hover:border-[#F9F9F9] rounded-[24px] bg-[#F9F9F9] flex flex-col justify-between gap-2 p-6  leading-tight cursor-pointer">
                <div
                  className=" flex justify-end opacity-0 group-hover:opacity-100 transform translate-x-[-16px] group-hover:translate-x-0 move"
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
                        fill="#06A9EF"
                      />
                    </g>
                  </svg>
                </div>

                <div className="flex flex-col gap-2 w-[124px] ">
                  <svg
                    className="min-w-[32px]"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_2038_22277)">
                      <path
                        className="icon-path"
                        d="M7.99997 25.3332H12.4615V17.4101H19.5384V25.3332H24V13.3332L16 7.30755L7.99997 13.3332V25.3332ZM6 27.3331V12.3332L16 4.80762L25.9999 12.3332V27.3331H17.5384V19.4101H14.4615V27.3331H6Z"
                        fill="#808080"
                      />
                    </g>
                  </svg>
                  <p className="text-[14px] font-medium">Dashboard</p>
                  <p className="text-[12px] font-medium text-[#808080]">
                    Go to your personalised home page
                  </p>
                </div>
              </div>
            </div>

            <button className="flex flex-row gap-[8px] w-full border border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] py-[10px] px-[8px] items-center" onClick={() => router.push('/jobs/saved')}>
              <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.166504 15.5V2.16667C0.166504 1.70833 0.329698 1.31597 0.656087 0.989583C0.982476 0.663194 1.37484 0.5 1.83317 0.5H10.1665C10.6248 0.5 11.0172 0.663194 11.3436 0.989583C11.67 1.31597 11.8332 1.70833 11.8332 2.16667V15.5L5.99984 13L0.166504 15.5ZM1.83317 12.9583L5.99984 11.1667L10.1665 12.9583V2.16667H1.83317V12.9583Z"
                  fill="#808080"
                />
              </svg>
              <span className="text-[#33333] text-[16px] font-normal">
                Saved Jobs
              </span>
            </button>
            {/* <button className="flex flex-row gap-[8px] w-full border border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] py-[10px] px-[8px] items-center">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2.33317 16.5001C1.87484 16.5001 1.48248 16.3369 1.15609 16.0105C0.829698 15.6841 0.666504 15.2917 0.666504 14.8334V5.66675C0.666504 5.20841 0.829698 4.81605 1.15609 4.48966C1.48248 4.16328 1.87484 4.00008 2.33317 4.00008H5.6665V2.33341C5.6665 1.87508 5.8297 1.48272 6.15609 1.15633C6.48248 0.829943 6.87484 0.666748 7.33317 0.666748H10.6665C11.1248 0.666748 11.5172 0.829943 11.8436 1.15633C12.17 1.48272 12.3332 1.87508 12.3332 2.33341V4.00008H15.6665C16.1248 4.00008 16.5172 4.16328 16.8436 4.48966C17.17 4.81605 17.3332 5.20841 17.3332 5.66675V14.8334C17.3332 15.2917 17.17 15.6841 16.8436 16.0105C16.5172 16.3369 16.1248 16.5001 15.6665 16.5001H2.33317ZM2.33317 14.8334H15.6665V5.66675H2.33317V14.8334ZM7.33317 4.00008H10.6665V2.33341H7.33317V4.00008Z"
                  fill="#808080"
                />
              </svg>

              <span className="text-[#33333] text-[16px] font-normal">
                Applied Jobs
              </span>
            </button> */}
          </div>
          <div className="flex flex-col gap-6 w-[750px]   ">
            <div className="header1 text-[16px] font-semibold px-4 py-2 h-[36px] leading-tight text-[#FFF] w-[180px] ">
              Services
            </div>
            <div className="flex gap-6 flex-wrap">
              {list().map((item, index) => (
                <div
                  key={index}
                  className={`group rounded-[16px] ${(() =>
                    getServiceItemClassName(item.name))()}`}
                  onClick={() => handleItemClick(item.name)}
                  onMouseEnter={() => {
                    setVisible(index);
                  }}
                  onMouseLeave={() => setVisible(false)}
                >
                  <div
                    className={`flex items-start gap-[20px] p-4  ${visible !== index
                        ? "border border-[#DEDEDE]"
                        : "border border-[#FFF]"
                      } rounded-[16px] cursor-pointer w-[359.33px] `}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={item.imgSrc}
                        alt=""
                        className="w-[46px] h-[46px]"
                      />
                      <div className="w-[224px] flex flex-col gap-1  ">
                        <div className="flex gap-3 items-center">
                          <span className="text-[14px] font-medium">
                            {item.name}
                          </span>
                          {item.new && (
                            <div className="flex justify-center items-center px-2 h-[17px] bg-[#F72C2C] rounded-[4px] text-[#FFF] text-[12px] font-medium leading-tight">
                              {item.new}
                            </div>
                          )}
                        </div>

                        <p className="text-[12px] font-normal text-[#808080]">
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
