// import StackedBarChart from "@/components/common/StackedBarChart";
// import StackedBarChart from "@/components/common/Bars";
// import ChartComponent, { Bars } from "@/components/common/Bars";
// import StackedBarChart from "@/components/common/StackedBarChart";
import { TablePagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import StackedBarChart from "../../components/common/StackedBarChart";
import { useSelector } from "react-redux";
import { camelCase } from "../../utils/middleware";
import { useRouter } from "next/router";
import SubscriptionPlans from "../../components/featured/home/SubscriptionPlans";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

function Dashboard({ toggleContentt }) {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [page, setPage] = useState(0);
  const [moreOption, setMoreOption] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const router = useRouter();
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const applicant_head = [
    {
      name: "Name of Candidate",
      check: <input className="w-[24px] h-[24px]" type="checkbox" />,
    },
    {
      name: "source",
      check: "",
    },
    {
      name: "Profile Match",
      check: "",
    },
    {
      name: "Hiring stage",
      check: "",
    },
    {
      name: "Applied Date",
      check: "",
    },
    {
      name: "Action",
      check: "",
    },
  ];

  const applicants = [
    {
      img: (
        <img
          className="w-[40px]"
          src="./images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] h-[24px]"
          src="/images/employer/st.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",
      source: "Skilotech collection",
      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="./images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="./images/employer/empty_star.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "0.0",

      status: "In Review",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Shortlisted",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "5.0",

      status: "Hired",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "2.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "3.0",

      status: "Interview",

      date: "13 July, 2021",
    },
    {
      img: (
        <img
          className="w-[40px]"
          src="/images/employer/profile_icon.png"
          alt=""
        />
      ),
      name: "John Doe",
      img_star1: (
        <img
          className="w-[24px] "
          src="/images/employer/star_fill.png"
          alt=""
        />
      ),
      img_star2: "",
      score: "4.0",

      status: "Rejected",

      date: "13 July, 2021",
    },
  ];

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
    { name: "My Clients", imgSrc: "/images/resumeBuilder/my_clients.png" },
    // { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
    {
      name: "Job Description Matching",
      imgSrc: "/images/resumeBuilder/job_description_matching.png",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/collection.png",
    },
    { name: "Ask Krut", imgSrc: "/images/resumeBuilder/bot1.png", new: "New" },
    { name: "Post Jobs", imgSrc: "/images/resumeBuilder/job.png", new: "New" },
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
          userDataGlobal.role === "user"
            ? "/home/BuildResume"
            : "/myClients/ClientResume"
        );
        break;
      case "Create New Cover Letter":
        handleNavigation(userDataGlobal.role === "user" ? "/coverLetter" : `/myClients/ClientResume?cover=true`);
        break;
      case "My Clients":
        handleNavigation("/myClients");
        break;
      case "Resume":
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
      case "My Website":
        handleNavigation("/myWebsite");
        break;
      case "Ask Krut":
        handleNavigation("/chatbot");
        break;
      case "My Collection":
        handleNavigation(userDataGlobal.role === "user" ? "/home/MyCollection" : "/collection");
        break;
      case "Skill Assessments & Certification":
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
  const [checkedApplicants, setCheckedApplicants] = useState({});

  const widths = ["20%", "10%", "15%", "20%", "15%", "20%"];
  const handleCheckboxChange = (index) => {
    setCheckedApplicants((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const [id, setId] = useState("");

  useEffect(() => {
    if (userDataGlobal && userDataGlobal._id) {
      setId(userDataGlobal._id);
    }
  }, [userDataGlobal]);

  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`http://localhost:2000/api/job/getJobById/${id}`)
        setJobs(response.data)
      }
      catch (err) {
        console.error("Error:", err)
        setError("Failed to fetch jobs.")
      }
    }
    if (id) {
      fetchJobs()
    }
  }, [id])
  console.log("jobs", jobs)
  return (
    <div className=" ml:h-[calc(100vh-100px)] pt-6 w-[100%]  overflow-y-auto "
      style={{ scrollbarWidth: "none" }}
    >
      <div className=" lg:flex flex lg:flex-row flex-col flex-wrap items-start lg:justify-between gap-3  ">
        <div
          className="flex flex-col gap-6 p-4 rounded-[16px] w-full lg:w-[32%] scr1067:w-[24%] "
          style={{
            background:
              "linear-gradient(31.62deg, #06A9EF 14.94%, #A2E3FF 99.61%)",
          }}
        >
          <div className="flex gap-4 items-center">
            <img
              src="/images/resumeBuilder/Illustration.png"
              alt=""
              className="w-[35.33%] max-w-[106px] h-[98px]"
            />
            <div className="flex w-[62.67%] flex-col gap-3">
              <div
                className="text-[18px] font-semibold p-2 rounded-l-[6px] leading-tight text-[#06A9EF] w-full mr-[-16px]"
                style={{
                  background:
                    "linear-gradient(89.03deg, #FFFFFF 0.83%, rgba(255, 254, 254, 0) 98.41%)",
                }}
              >
                Hello,
              </div>
              {userDataGlobal?.firstName && (
                <div className="text-[18px] flex scr540:gap-2 flex-col scr540:flex-row lg:flex-col lg:gap-0 text-[#FFFFFF] font-semibold leading-tight break-all">
                  <p> {camelCase(userDataGlobal?.firstName)}</p>
                  <p> {camelCase(userDataGlobal?.lastName)}!</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start w-[100%] lg:w-[32%] scr1067:w-[24%] gap-[6px]  ml:gap-4 h-[130px]"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #57697B",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px]  font-semibold leading-normal">
              77
            </p>
            <div className="w-[69%]">
              <p className=" text-[16px] leading-4 font-medium font-montserrat ">
                New candidates to review
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-[3px]">
            <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md bg-[#FFD6D6]">
              <svg
                xlgns="http://www.w3.org/2000/svg"
                width="19"
                height="13"
                viewBox="0 0 19 13"
                fill="none"
              >
                <path
                  d="M1.3267 0.751982L0 2.09319L7.01254 9.23033L10.8031 5.39831L15.7308 10.332H13.267V12.248H18.9528V6.50001H17.0575V8.99083L10.8031 2.66799L7.01254 6.50001L1.3267 0.751982Z"
                  fill="#C00000"
                />
              </svg>
            </div>
            <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
              {" "}
              <span className="text-[12px] font-Montserrat font-normal text-[#C00000]">
                {" "}
                0.6%
              </span>{" "}
              from last Week
            </p>
          </div>
        </div>
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[32%] scr1067:w-[24%] w-[100%] gap-[6px]  ml:gap-4 h-[130px]"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #FFDA1D",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px] font-semibold leading-normal">
              03
            </p>
            <div className="w-[69%]">
              <p className="text-[16px] leading-4 font-medium font-montserrat ">
                Interview Schedule for
                today
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-[3px]">
            <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md "
              style={{ backgroundColor: "rgba(0, 175, 18, 0.30)" }}
            >
              <svg
                xlgns="http://www.w3.org/2000/svg"
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
              >
                <path
                  d="M1.6597 12.248L0.333008 10.9068L7.34554 3.76967L11.1361 7.60169L16.0638 2.66796H13.6V0.751953H19.2858V6.49999H17.3905V4.00917L11.1361 10.332L7.34554 6.49999L1.6597 12.248Z"
                  fill="#00AF12"
                />
              </svg>
            </div>
            <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
              {" "}
              <span className="text-[12px] font-Montserrat font-normal text-[#00AF12]">
                {" "}
                0.5%
              </span>{" "}
              from last Week
            </p>
          </div>
        </div>
        <div
          className="flex py-2 px-4 ml:p-4 flex-col justify-center items-start lg:w-[32%] scr1067:w-[24%] w-[100%] gap-[6px]  ml:gap-4 h-[130px]"
          style={{
            borderRadius: "12px",
            borderLeft: "4px solid #06A9EF",
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div className="flex items-center justify-between self-stretch">
            <p className="text-[#333] font-feature-settings-cv11 font-montserrat text-[26px]  font-semibold leading-normal">
              04
            </p>
            <div className="w-[69%]">
              <p className=" text-[16px] leading-4 font-medium font-montserrat ">
                In Preboarding
                process
              </p>
            </div>
            <img
              src="/images/afterLoginHome/arrow_forward_ios.png"
              className="h-[24px] w-[24px]"
              alt=""
            />
          </div>
          <div className="flex items-center gap-[3px]">
            <div className="flex py-[6px] px-[2px] justify-center items-center rounded-md "
              style={{ backgroundColor: "rgba(0, 175, 18, 0.30)" }}

            >
              <svg
                xlgns="http://www.w3.org/2000/svg"
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
              >
                <path
                  d="M1.6597 12.248L0.333008 10.9068L7.34554 3.76967L11.1361 7.60169L16.0638 2.66796H13.6V0.751953H19.2858V6.49999H17.3905V4.00917L11.1361 10.332L7.34554 6.49999L1.6597 12.248Z"
                  fill="#00AF12"
                />
              </svg>
            </div>
            <p className="text-[14px] font-Montserrat font-normal text-[#5B5B5B]">
              {" "}
              <span className="text-[12px] font-Montserrat font-normal text-[#00AF12]">
                {" "}
                1.6%
              </span>{" "}
              from last Week
            </p>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-row flex flex-col w-full pt-6 justify-between">
        <div className=" pt-6 lg:pt-0 lg:w-[31.26%]  w-[100%] flex flex-col gap-4 lg:justify-between items-start  ">
          <div
            className="flex justify-between items-center px-6 py-[16px] lg:py-[16px]   w-full"
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
                      25
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
                      654
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
                      10
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
                    Declined
                  </p>

                  <div className="flex px-1 py-[18px] gap-[10px] items-center rounded-[6px] ">
                    <p className="text-[#333333] text-[20px] font-[600] font-[Montserrat]">
                      148
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="lg:w-[66.17%] w-[100%] bg-[#fff] flex flex-col items-center gap-4 sm:p-4 p-2"
          style={{
            borderRadius: "16px",
            boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          }}
        >
          <div
            className="flex pb-4 flex-col gap-4 self-stretch"
            style={{
              borderBottom: " 1px solid var(--Text-Secondary, #646464)",
            }}
          >
            <div className="flex justify-between items-center self-stretch">
              <div className="flex flex-col items-start lg:gap-1 gap-[2px]">
                <p className="text-[#333333] font-Montserrat text-[12px] lg:text-[28px] font-medium">
                  {" "}
                  Job statistics
                </p>
                <p className="text-[#646464] lg:text-[12px] text-[10px] font-medium">
                  Showing Job statistics Nov 19-25
                </p>
              </div>
              <div className="flex items-end lg:gap-[6px] gap-1">
                {/* <div
                  className="flex lg:px-2 px-[6px] bg-[#fff] py-1 items-center"
                  style={{
                    borderRadius: "6px",
                    border: " 0.5px solid var(--Text-Secondary, #646464)",
                  }}
                >
                  <p className="text-[#333] items-center font-Montserrat lg:text-[12px] text-[10px] font-medium">
                    Daily
                  </p>
                </div> */}
                <button className="px-2 p-1 border-[0.5px] border-solid border-[#DEDEDE] rounded-[6px] text-[12px] font-[500] text-[#333333]">Daily</button>
                <button className="px-2 p-1 border-[0.5px] border-solid border-[#06A9EF] rounded-[6px] text-[12px] font-[500] text-[#FFFFFF] bg-[#06A9EF]">Weekly</button>
                <button className="px-2 p-1 border-[0.5px] border-solid border-[#DEDEDE] rounded-[6px] text-[12px] font-[500] text-[#333333]">Monthly</button>
              </div>
            </div>
          </div>
          <div className="lg:flex w-full ml:flex-row-reverse flex-col flex gap-2 justify-between">
            <div className="flex ml:flex-col flex-row items-start gap-2 ml:gap-4 lg:w-[32.23%] w-[100%]">


              <div
                className="flex ml:p-4 p-2 flex-col items-start ml:gap-4 gap-1 bg-[#fff] self-stretch w-full"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "16px",
                }}
              >
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-[#333] font-Montserrat text-[12px] ml:text-[18px] font-semibold">
                    {" "}
                    Job Applied
                  </p>
                  <div className="flex p-[2px] ml:p-[6px] rounded-[32px] bg-[#FFDA1D]">
                    <svg
                      xlgns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                    >
                      <path
                        d="M18.266 9.66634C16.5827 5.75801 13.416 3.33301 9.99932 3.33301C6.58266 3.33301 3.41599 5.75801 1.73266 9.66634C1.68677 9.77148 1.66309 9.88496 1.66309 9.99967C1.66309 10.1144 1.68677 10.2279 1.73266 10.333C3.41599 14.2413 6.58266 16.6663 9.99932 16.6663C13.416 16.6663 16.5827 14.2413 18.266 10.333C18.3119 10.2279 18.3356 10.1144 18.3356 9.99967C18.3356 9.88496 18.3119 9.77148 18.266 9.66634ZM9.99932 14.9997C7.34932 14.9997 4.85766 13.0913 3.41599 9.99967C4.85766 6.90801 7.34932 4.99967 9.99932 4.99967C12.6493 4.99967 15.141 6.90801 16.5827 9.99967C15.141 13.0913 12.6493 14.9997 9.99932 14.9997ZM9.99932 6.66634C9.34005 6.66634 8.69559 6.86184 8.14742 7.22811C7.59926 7.59438 7.17202 8.11498 6.91972 8.72406C6.66743 9.33315 6.60142 10.0034 6.73004 10.65C6.85866 11.2966 7.17613 11.8905 7.6423 12.3567C8.10848 12.8229 8.70242 13.1403 9.34902 13.269C9.99563 13.3976 10.6658 13.3316 11.2749 13.0793C11.884 12.827 12.4046 12.3997 12.7709 11.8516C13.1372 11.3034 13.3327 10.6589 13.3327 9.99967C13.3327 9.11562 12.9815 8.26777 12.3563 7.64265C11.7312 7.01753 10.8834 6.66634 9.99932 6.66634ZM9.99932 11.6663C9.66969 11.6663 9.34745 11.5686 9.07337 11.3855C8.79929 11.2023 8.58567 10.942 8.45952 10.6375C8.33338 10.3329 8.30037 9.99783 8.36468 9.67452C8.42899 9.35122 8.58772 9.05425 8.82081 8.82116C9.0539 8.58808 9.35087 8.42934 9.67417 8.36503C9.99747 8.30072 10.3326 8.33373 10.6371 8.45988C10.9417 8.58602 11.202 8.79964 11.3851 9.07372C11.5682 9.34781 11.666 9.67004 11.666 9.99967C11.666 10.4417 11.4904 10.8656 11.1778 11.1782C10.8653 11.4907 10.4414 11.6663 9.99932 11.6663Z"
                        fill="#333333"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px]">
                  <p className="text-[#333] flex items font-Montserrat font-semibold text-[20px] ml:text-[36px]">
                    2,324
                  </p>
                  <div className="flex gap-2 items-start">
                    <p className="text-[#646464] text-[12px] ml:text-[18px] font-Montserrat font-Medium">
                      This Week{" "}
                    </p>
                    <div className="flex items-center">
                      <p className="text-[#06A9EF] items-center ml:text-[18px]  text-[10px] font-medium">
                        6.4%
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 21 21" fill="none">
                        <g clip-path="url(#clip0_6622_117270)">
                          <path d="M15.7344 13L10.7344 8L5.73438 13H15.7344Z" fill="#06A9EF" stroke="#06A9EF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </g>
                        <defs>
                          <clipPath id="clip0_6622_117270">
                            <rect width="20" height="20" fill="white" transform="translate(0.734375 0.5)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="flex ml:p-4 p-2 flex-col items-start ml:gap-4 gap-1 bg-[#fff] self-stretch w-full"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                  borderRadius: "16px",
                }}
              >
                <div className="flex justify-between items-center self-stretch">
                  <p className="text-[#333] font-Montserrat text-[12px] ml:text-[18px] font-semibold">
                    {" "}
                    Job Applied
                  </p>
                  <div className="flex p-[2px] ml:p-[6px] rounded-[32px] bg-[#3E6B7E]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                    >
                      <g mask="url(#mask0_7540_117295)">
                        <path
                          d="M2.15385 10.2499C1.90128 10.2499 1.6875 10.1624 1.5125 9.98745C1.3375 9.81245 1.25 9.59867 1.25 9.3461V4.15383C1.25 3.90126 1.3375 3.68747 1.5125 3.51247C1.6875 3.33747 1.90128 3.24997 2.15385 3.24997H4.25V2.40384C4.25 2.15128 4.3375 1.9375 4.5125 1.7625C4.6875 1.5875 4.90128 1.5 5.15385 1.5H6.84613C7.09869 1.5 7.31248 1.5875 7.48748 1.7625C7.66248 1.9375 7.74998 2.15128 7.74998 2.40384V3.24997H9.84613C10.0987 3.24997 10.3125 3.33747 10.4875 3.51247C10.6625 3.68747 10.75 3.90126 10.75 4.15383V9.3461C10.75 9.59867 10.6625 9.81245 10.4875 9.98745C10.3125 10.1624 10.0987 10.2499 9.84613 10.2499H2.15385ZM2.15385 9.49996H9.84613C9.88459 9.49996 9.91986 9.48394 9.95191 9.45189C9.98396 9.41983 9.99999 9.38457 9.99999 9.3461V4.15383C9.99999 4.11536 9.98396 4.0801 9.95191 4.04804C9.91986 4.01599 9.88459 3.99996 9.84613 3.99996H2.15385C2.11538 3.99996 2.08012 4.01599 2.04806 4.04804C2.01601 4.0801 1.99999 4.11536 1.99999 4.15383V9.3461C1.99999 9.38457 2.01601 9.41983 2.04806 9.45189C2.08012 9.48394 2.11538 9.49996 2.15385 9.49996ZM4.99999 3.24997H6.99999V2.40384C6.99999 2.36537 6.98396 2.33011 6.95191 2.29806C6.91985 2.266 6.88459 2.24997 6.84613 2.24997H5.15385C5.11538 2.24997 5.08012 2.266 5.04806 2.29806C5.01601 2.33011 4.99999 2.36537 4.99999 2.40384V3.24997Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-[2px]">
                  <p className="text-[#333] flex items font-Montserrat font-semibold text-[20px] ml:text-[36px]">
                    654
                  </p>
                  <div className="flex gap-2 items-center">
                    <p className="text-[#646464] text-[12px] ml:text-[18px] font-Montserrat font-Medium">
                      This Week{" "}
                    </p>
                    <div className="flex text-center">
                      <p className="text-[#C00000] items-center ml:text-[18px] text-[10px] font-medium leading-5">
                        0.5%
                      </p>
                      <svg
                        xlgns="http://www.w3.org/2000/svg"
                        width="21"
                        height="21"
                        viewBox="0 0 21 21"
                        fill="none"
                      >
                        <g clip-path="url(#clip0_6622_117282)">
                          <path
                            d="M5.73438 8L10.7344 13L15.7344 8L5.73438 8Z"
                            fill="#C00000"
                            stroke="#C00000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_6622_117282">
                            <rect
                              width="20"
                              height="20"
                              fill="white"
                              transform="matrix(-1 0 0 -1 20.7344 20.5)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[100%]  flex py-2 ">
              <StackedBarChart />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <div
          className="flex py-4 px-4 flex-col bg-[#fff] items-center w-full"
          style={{
            boxShadow: " 0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        >
          <div className="flex lg:flex-row flex-col  w-[100%] ml:py-[24px] ml:px-[16px] gap-4 lg:justify-between items-start lg:items-center bg-[#fff]">
            <p className="font-[600] text-[16px]">Recent Applications</p>

            <div className="flex gap-2 items-start justify-between sm:w-[430px]   ">
              <div
                className="flex py-3 px-4 gap-4 bg-white sm:w-[314px] xsm:w-[214px] w-[170px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/employer/icon_search.png"
                  className="sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />
                <input type="text" placeholder="Search" className="w-full" />
              </div>
              <div
                className="flex py-3 px-4 gap-2 justify-center items-center bg-white sm:w-[108px] w-[98px]"
                style={{ borderRadius: "6px", border: " 1px solid #D6DDEB" }}
              >
                <img
                  src="/images/profile/fil.png"
                  className=" sm:w-[22px] sm:h-[22px] w-[20px] h-[20px]"
                  alt=""
                />

                <p className="font-Montserrat text-[14px] sm:text-base font-semibold leading-6 text-[#333]">
                  Filter
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="web">
        <div className="flex p-[16px] items-center   gap-[20px] bg-[#EFFAFF]  ">
          <input className="w-[16px] h-[16px]" type="checkbox" />

          {applicant_head.map((applicant_head, index) => (
            <div
              key={index}
              className="flex items-center w-full text-[#333333] gap-[8px]"
              style={{ width: widths[index] }}
            >
              <p className="text-[14px] font-[600]">
                {applicant_head.name}
              </p>
              <img
                className="w-[24px]"
                src="/images/employer/expand_more.png"
                alt=""
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  overflow-y-auto w-[100%]">
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicants, index) => (
                <>
                  <div
                    className={`flex w-[100%] p-[16px] justify-between items-center ${checkedApplicants[index] ? "bg-[#D3F1FF]" : "bg-[#FFFFFF]"}`}
                    key={applicants._id}
                  >
                    <div className="  gap-[24px]  w-full justify-between flex items-center">
                      <div className="flex  w-[20%] justify-start text-[14px] font-[600] items-center gap-[16px]">
                        <input
                          className="w-[16px] h-[16px]"
                          type="checkbox"
                          checked={!!checkedApplicants[index]}
                          onChange={() => handleCheckboxChange(index)}
                        />
                        <img
                          className="w-[40px]"
                          src="/images/employer/profile_icon.png"
                          alt=""
                        />
                        <p className="text-[14px] font-[600]">
                          {applicants.name}
                        </p>
                      </div>
                      <div className="flex w-[10%] items-center justify-center   gap-[8px]">
                        <p className="text-[14px] font-[600]">
                          {applicants.source}
                        </p>
                      </div>

                      <div className="flex w-[15%] items-center justify-center   gap-[8px]">
                        <p className="text-[14px] font-[600]">
                          {applicants.score} %
                        </p>
                      </div>
                      <div className="w-[20%]">
                        <button
                          className={`flex py-[6px] justify-center px-[10px] text-[12px] font-[600] items-center gap-[8px] rounded-[80px] ${checkedApplicants[index]
                            ? "bg-[#FFFFFF]"
                            : applicants.status === "Interview"
                              ? "bg-[#26A4FF1A]"
                              : applicants.status === "Hired"
                                ? "bg-[#56CDAD1A]"
                                : applicants.status === "Shortlisted"
                                  ? "bg-[#4640DE1A]"
                                  : applicants.status === "Rejected"
                                    ? "bg-[#FF65501A]"
                                    : applicants.status === "In Review"
                                      ? "bg-[#EB85331A]"
                                      : ""
                            } ${applicants.status === "Interview"
                              ? "text-[#26A4FF]"
                              : applicants.status === "Hired"
                                ? "text-[#56CDAD]"
                                : applicants.status === "Shortlisted"
                                  ? "text-[#4640DE]"
                                  : applicants.status === "Rejected"
                                    ? "text-[#FF6550]"
                                    : applicants.status === "In Review"
                                      ? "text-[#FFB836]"
                                      : "text-[#333333]"
                            }`}
                        >
                          {applicants.status}
                        </button>
                      </div>
                      <div className=" flex text-[14px] w-[15%]  font-[600]">
                        <p>
                          {new Date(applicants.appliedOn)
                            .toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(",", "")}
                        </p>
                      </div>
                      <div className="flex  w-[20%] items-center gap-[16px] relative">
                        <div
                          className="cursor-pointer"
                          onClick={() =>
                            toggleContentt(jobDetails, applicants._id)
                          }
                        >
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13.0911 24H2.8901C2.13396 24 1.40878 23.6996 0.874111 23.165C0.339438 22.6303 0.0390625 21.9051 0.0390625 21.149L0.0390625 2.85103C0.0390625 2.09489 0.339438 1.36972 0.874111 0.835048C1.40878 0.300376 2.13396 0 2.8901 0L16.0904 0C16.8465 0 17.5717 0.300376 18.1064 0.835048C18.641 1.36972 18.9414 2.09489 18.9414 2.85103V11.2844C18.9498 11.3737 18.9395 11.4638 18.9111 11.5489C18.8827 11.634 18.8369 11.7123 18.7765 11.7786C18.7161 11.845 18.6425 11.898 18.5604 11.9343C18.4784 11.9705 18.3897 11.9893 18.2999 11.9893C18.2102 11.9893 18.1215 11.9705 18.0394 11.9343C17.9574 11.898 17.8838 11.845 17.8234 11.7786C17.763 11.7123 17.7171 11.634 17.6887 11.5489C17.6603 11.4638 17.65 11.3737 17.6584 11.2844V2.85103C17.6585 2.64763 17.6183 2.44622 17.5403 2.25837C17.4623 2.07052 17.3479 1.89991 17.2038 1.75635C17.0597 1.61278 16.8887 1.49908 16.7006 1.42176C16.5124 1.34444 16.3109 1.30502 16.1075 1.30577H2.8901C2.68573 1.30351 2.48295 1.34181 2.2935 1.41845C2.10404 1.4951 1.93166 1.60856 1.78636 1.75228C1.64105 1.89599 1.52569 2.06711 1.44697 2.25571C1.36825 2.44431 1.32772 2.64666 1.32773 2.85103V21.1661C1.32772 21.3704 1.36825 21.5728 1.44697 21.7614C1.52569 21.95 1.64105 22.1211 1.78636 22.2648C1.93166 22.4085 2.10404 22.522 2.2935 22.5987C2.48295 22.6753 2.68573 22.7136 2.8901 22.7113H13.0911C13.262 22.7113 13.4259 22.7792 13.5467 22.9001C13.6675 23.0209 13.7354 23.1848 13.7354 23.3557C13.7354 23.5266 13.6675 23.6904 13.5467 23.8113C13.4259 23.9321 13.262 24 13.0911 24Z"
                              fill="#224D90"
                            />
                            <path
                              d="M14.8904 6.88738H4.05644C3.96712 6.89581 3.87702 6.88549 3.79191 6.85709C3.70681 6.82869 3.62857 6.78282 3.56222 6.72243C3.49586 6.66205 3.44285 6.58847 3.40657 6.50641C3.3703 6.42435 3.35156 6.33562 3.35156 6.2459C3.35156 6.15618 3.3703 6.06744 3.40657 5.98538C3.44285 5.90332 3.49586 5.82974 3.56222 5.76936C3.62857 5.70897 3.70681 5.66311 3.79191 5.6347C3.87702 5.6063 3.96712 5.59598 4.05644 5.60441H14.8904C15.0501 5.61949 15.1984 5.69358 15.3064 5.81222C15.4143 5.93085 15.4742 6.08549 15.4742 6.2459C15.4742 6.4063 15.4143 6.56094 15.3064 6.67957C15.1984 6.79821 15.0501 6.87231 14.8904 6.88738Z"
                              fill="#224D90"
                            />
                            <path
                              d="M10.0327 11.898H4.07402C3.90313 11.898 3.73924 11.8302 3.61841 11.7093C3.49757 11.5885 3.42969 11.4246 3.42969 11.2537C3.42969 11.0828 3.49757 10.9189 3.61841 10.7981C3.73924 10.6773 3.90313 10.6094 4.07402 10.6094H10.0327C10.2036 10.6094 10.3675 10.6773 10.4883 10.7981C10.6091 10.9189 10.677 11.0828 10.677 11.2537C10.677 11.4246 10.6091 11.5885 10.4883 11.7093C10.3675 11.8302 10.2036 11.898 10.0327 11.898Z"
                              fill="#224D90"
                            />
                            <path
                              d="M18.02 22.0655C13.9887 22.0655 12.1925 18.2964 12.1184 18.1367C12.0809 18.0548 12.0649 17.9648 12.0719 17.875C12.0789 17.7852 12.1086 17.6987 12.1583 17.6236C12.2552 17.4753 14.5361 14.0312 18.02 14.0312C21.504 14.0312 23.7848 17.4525 23.8818 17.6178C23.9354 17.7033 23.9639 17.8021 23.9639 17.903C23.9639 18.0038 23.9354 18.1026 23.8818 18.1881C23.819 18.3306 21.7093 22.0655 18.02 22.0655ZM13.2303 17.96C13.6808 18.7526 15.2089 20.9992 18.02 20.9992C20.5518 20.9992 22.2624 18.7469 22.7927 17.9372C22.2225 17.1845 20.375 15.0861 18.02 15.0861C15.6651 15.0861 13.7891 17.2244 13.2303 17.96Z"
                              fill="#224D90"
                            />
                            <path
                              d="M18.1621 19.2071C18.7479 19.2071 19.2227 18.7323 19.2227 18.1465C19.2227 17.5608 18.7479 17.0859 18.1621 17.0859C17.5764 17.0859 17.1016 17.5608 17.1016 18.1465C17.1016 18.7323 17.5764 19.2071 18.1621 19.2071Z"
                              fill="#224D90"
                            />
                          </svg>
                        </div>
                        <button className="text-[10px] font-[500] py-[4px] px-[8px] rounded-[30px] bg-[#06A9EF] text-[#FFFFFF]">
                          Shortlist
                        </button>
                        <button className="text-[10px] font-[500] py-[4px] px-[8px] rounded-[30px] border-[1px] border-[#B3261E]  text-[#B3261E]">
                          Shortlist
                        </button>

                        <AnimatePresence>
                          {moreOption && selectedDotIndex === index && (
                            <motion.div
                              initial={{ x: "100%" }}
                              animate={{ x: 0 }}
                              exit={{ x: "100%" }}
                              transition={{ duration: 0.5 }}
                              ref={taskRef}
                              className="absolute flex flex-col  rounded-[8px] left-0 right-0 z-10 top-[100%] border-l border-r border-b border-[#06A9EF] p-2 bg-white"
                              style={{
                                boxShadow:
                                  "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                              }}
                            >
                              <div className="flex gap-[8px]  p-2 items-center flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_6622_123448)">
                                    <path
                                      d="M17.25 21.7501V18.7501H14.25V17.2501H17.25V14.2501H18.75V17.2501H21.75V18.7501H18.75V21.7501L17.25 21.7501ZM5.3077 19.5001C4.80257 19.5001 4.375 19.3251 4.025 18.9751C3.675 18.6251 3.5 18.1975 3.5 17.6924V6.30784C3.5 5.80271 3.675 5.37514 4.025 5.02514C4.375 4.67514 4.80257 4.50014 5.3077 4.50014H6.69233V2.38477H8.23075V4.50014H13.8077V2.38477H15.3076V4.50014H16.6922C17.1974 4.50014 17.625 4.67514 17.975 5.02514C18.325 5.37514 18.5 5.80271 18.5 6.30784V12.2155C18.25 12.1847 18 12.1694 17.75 12.1694C17.5 12.1694 17.25 12.1847 17 12.2155V10.3078H4.99997V17.6924C4.99997 17.7693 5.03202 17.8398 5.09612 17.904C5.16024 17.9681 5.23077 18.0001 5.3077 18.0001H12.1442C12.1442 18.2501 12.1596 18.5001 12.1904 18.7501C12.2211 19.0001 12.2776 19.2501 12.3596 19.5001H5.3077ZM4.99997 8.80787H17V6.30784C17 6.23091 16.9679 6.16038 16.9038 6.09627C16.8397 6.03217 16.7692 6.00012 16.6922 6.00012H5.3077C5.23077 6.00012 5.16024 6.03217 5.09612 6.09627C5.03202 6.16038 4.99997 6.23091 4.99997 6.30784V8.80787Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                <div className="block py-1 justify-start text-[14px]">
                                  Schedule Interview
                                </div>
                              </div>
                              <div className="flex gap-[8px] p-2 items-center flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_6622_123454)">
                                    <path
                                      d="M9.3077 18.7503V17.2504H20.5V18.7503H9.3077ZM9.3077 12.7503V11.2504H20.5V12.7503H9.3077ZM9.3077 6.75031V5.25036H20.5V6.75031H9.3077ZM5.16345 19.6638C4.706 19.6638 4.3144 19.5009 3.98865 19.1751C3.66288 18.8494 3.5 18.4578 3.5 18.0003C3.5 17.5429 3.66288 17.1513 3.98865 16.8255C4.3144 16.4998 4.706 16.3369 5.16345 16.3369C5.6209 16.3369 6.0125 16.4998 6.33825 16.8255C6.664 17.1513 6.82687 17.5429 6.82687 18.0003C6.82687 18.4578 6.664 18.8494 6.33825 19.1751C6.0125 19.5009 5.6209 19.6638 5.16345 19.6638ZM5.16345 13.6638C4.706 13.6638 4.3144 13.5009 3.98865 13.1751C3.66288 12.8494 3.5 12.4578 3.5 12.0003C3.5 11.5429 3.66288 11.1513 3.98865 10.8255C4.3144 10.4998 4.706 10.3369 5.16345 10.3369C5.6209 10.3369 6.0125 10.4998 6.33825 10.8255C6.664 11.1513 6.82687 11.5429 6.82687 12.0003C6.82687 12.4578 6.664 12.8494 6.33825 13.1751C6.0125 13.5009 5.6209 13.6638 5.16345 13.6638ZM5.16345 7.66376C4.706 7.66376 4.3144 7.50089 3.98865 7.17514C3.66288 6.84939 3.5 6.45779 3.5 6.00034C3.5 5.54289 3.66288 5.15129 3.98865 4.82554C4.3144 4.49979 4.706 4.33691 5.16345 4.33691C5.6209 4.33691 6.0125 4.49979 6.33825 4.82554C6.664 5.15129 6.82687 5.54289 6.82687 6.00034C6.82687 6.45779 6.664 6.84939 6.33825 7.17514C6.0125 7.50089 5.6209 7.66376 5.16345 7.66376Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                <div className="block py-1 justify-start break-words">
                                  Send Assessment
                                </div>
                              </div>
                              <div className="flex gap-[8px] p-2 items-center flex-row">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_6622_123460)">
                                    <path
                                      d="M17.4 12.6539L16.3461 11.6L18.4307 9.50003L16.3461 7.42503L17.4 6.35583L19.5 8.45583L21.575 6.35583L22.6442 7.42503L20.5538 9.50003L22.6442 11.6L21.575 12.6539L19.5 10.5789L17.4 12.6539ZM8.99995 11.6923C8.03747 11.6923 7.21352 11.3496 6.5281 10.6642C5.84268 9.97879 5.49997 9.15484 5.49997 8.19236C5.49997 7.22986 5.84268 6.40591 6.5281 5.72051C7.21352 5.03509 8.03747 4.69238 8.99995 4.69238C9.96243 4.69238 10.7864 5.03509 11.4718 5.72051C12.1572 6.40591 12.4999 7.22986 12.4999 8.19236C12.4999 9.15484 12.1572 9.97879 11.4718 10.6642C10.7864 11.3496 9.96243 11.6923 8.99995 11.6923ZM1.5 19.3077V17.0846C1.5 16.5949 1.633 16.1414 1.899 15.7241C2.16503 15.3068 2.52048 14.986 2.96535 14.7616C3.95382 14.277 4.95093 13.9135 5.9567 13.6712C6.96247 13.4289 7.97688 13.3078 8.99995 13.3078C10.023 13.3078 11.0374 13.4289 12.0432 13.6712C13.049 13.9135 14.0461 14.277 15.0345 14.7616C15.4794 14.986 15.8349 15.3068 16.1009 15.7241C16.3669 16.1414 16.4999 16.5949 16.4999 17.0846V19.3077H1.5ZM2.99995 17.8077H15V17.0846C15 16.8821 14.9413 16.6946 14.824 16.5221C14.7067 16.3497 14.5474 16.209 14.3461 16.1C13.4846 15.6757 12.6061 15.3542 11.7107 15.1356C10.8152 14.917 9.91165 14.8077 8.99995 14.8077C8.08825 14.8077 7.18468 14.917 6.28925 15.1356C5.39382 15.3542 4.51533 15.6757 3.6538 16.1C3.45252 16.209 3.29323 16.3497 3.17593 16.5221C3.05861 16.6946 2.99995 16.8821 2.99995 17.0846V17.8077ZM8.99995 10.1924C9.54995 10.1924 10.0208 9.99653 10.4124 9.60486C10.8041 9.21319 11 8.74236 11 8.19236C11 7.64236 10.8041 7.17153 10.4124 6.77986C10.0208 6.38819 9.54995 6.19236 8.99995 6.19236C8.44995 6.19236 7.97912 6.38819 7.58745 6.77986C7.19578 7.17153 6.99995 7.64236 6.99995 8.19236C6.99995 8.74236 7.19578 9.21319 7.58745 9.60486C7.97912 9.99653 8.44995 10.1924 8.99995 10.1924Z"
                                      fill="#C00000"
                                    />
                                  </g>
                                </svg>

                                <a className="block py-1 text-[#C00000]">
                                  Reject Candidate
                                </a>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>

      <div className="mobile">
        <div className="flex flex-col items-start gap-4 self-stretch w-full">
          <div className="flex flex-col gap-[16px] items-start bg-[#fff]  p-4  overflow-y-auto w-[100%]">
            {applicants
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((applicants, index) => (
                <>
                  <div
                    className="flex w-[100%] p-[8px] justify-between items-center  rounded-xl"
                    style={{ background: index % 2 == 0 ? "#EFFAFF" : "#fff", border: '1px solid #DEDEDE' }}
                  >
                    <div className="w-[100%]  flex flex-col justify-center gap-[14px] items-start"
                    >
                      <div className="flex justify-between items-center self-stretch">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-[40px] h-[40px]"
                            src="/images/profile/john_doe.png"
                            alt=""
                          />
                          <p className="text-[14px] text-[#333] font-[600]">
                            {applicants.name}
                          </p>
                        </div>
                        <div className="flex justify-end items-center gap-4">
                          <div className="flex items-center gap-2">
                            <img
                              className="w-[24px] h-[24px]"
                              src="/images/employer/st.png"
                              alt=""
                            />
                            <p className="text-[14px] font-semibold text-[#333]">
                              0.0
                            </p>
                            {applicants.img_star2}
                          </div>
                          <svg
                            xlgns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_7540_117410)">
                              <path
                                d="M11 5C11 5.55228 11.4477 6 12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                              <path
                                d="M11 19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19Z"
                                stroke="#333333"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_7540_117410">
                                <rect
                                  width="24"
                                  height="24"
                                  fill="white"
                                  transform="matrix(0 1 -1 0 24 0)"
                                />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>

                      <div className="flex justify-between items-center self-stretch">
                        <p className="text-[14px] text-[#333] font-[600]">
                          20 Nov, 2023{" "}
                        </p>
                        <div className="px-3 py-[6px] rounded-full border border-solid border-[#FF7A00] p-4">
                          <p className="text-[#FF7A00] font-Montserrat font-semibold text-[14px]">
                            In Review
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-center w-[100%]">
                        <div
                          className="flex px-6 py-3 justify-center items-center gap-[10px] bg-[#E7F8FF]"
                          style={{
                            borderRadius: "8px",
                            border: " 1px solid var(--primary, #06A9EF)",
                          }}
                        >
                          <p className="text-[14px] text-[#333] font-[600] font-Montserrat">
                            See Application
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
          </div>
        </div>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        className=" rounded-b-[12px] px-[16px]  border-t bg-white w-[100%]"
        count={applicants.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
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
        <p className="text-[20px] font-semibold text-[#333333]">Purchase Plans</p>
        <SubscriptionPlans />
      </div>
    </div>

  );
}

export default Dashboard;
