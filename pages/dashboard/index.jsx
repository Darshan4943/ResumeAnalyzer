import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { camelCase } from "../../utils/middleware";
import Summery from "../../components/featured/candidate/createResume/components/summery";
import { useRouter } from "next/router";
import { plans, templates } from "../../utils/data";
import axios from "axios";
import { useRef } from "react";
import {
  PDFViewer,
  PDFDownloadLink,
  Document,
  Page,
  BlobProvider,
  pdf,
} from "@react-pdf/renderer";

import Template1 from "../../components/featured/resumeTemplates/Template1";
import Template2 from "../../components/featured/resumeTemplates/Template2";
import Template3 from "../../components/featured/resumeTemplates/Template3";
import Template4 from "../../components/featured/resumeTemplates/Template4";
import Template5 from "../../components/featured/resumeTemplates/Template5";
import Template6 from "../../components/featured/resumeTemplates/Template6";
import Template7 from "../../components/featured/resumeTemplates/Template7";
import Template8 from "../../components/featured/resumeTemplates/Template8";
import Template9 from "../../components/featured/resumeTemplates/Template9";
import Template10 from "../../components/featured/resumeTemplates/Template10";
import Template11 from "../../components/featured/resumeTemplates/Template11";
import Template12 from "../../components/featured/resumeTemplates/Template12";
import Template13 from "../../components/featured/resumeTemplates/Template13";
import Template14 from "../../components/featured/resumeTemplates/Template14";
import Template15 from "../../components/featured/resumeTemplates/Template15";
import Template16 from "../../components/featured/resumeTemplates/Template16";
import Template17 from "../../components/featured/resumeTemplates/Template17";
import Template18 from "../../components/featured/resumeTemplates/Template18";
import Template19 from "../../components/featured/resumeTemplates/Template19";
import Template20 from "../../components/featured/resumeTemplates/Template20";
import Template44 from "../../components/featured/resumeTemplates/Template44";
import Template32 from "../../components/featured/resumeTemplates/Template32";
import Template39 from "../../components/featured/resumeTemplates/Template39";
import Template48 from "../../components/featured/resumeTemplates/Template48";
import Template47 from "../../components/featured/resumeTemplates/Template47";
import Template30 from "../../components/featured/resumeTemplates/Template30";
import Template53 from "../../components/featured/resumeTemplates/Template53";
import MiniLoader from "../../components/common/miniLoader";
function Dashboard() {
const {userDataGlobal,profileData} = useSelector((state) => state.user.userData);
  const router = useRouter();
  const { signIn } = router.query;
  const [successful, setIsSuccessful] = useState(false);
  const [editProfilePopUp, setEditProfilePopUp] = useState(false);
  useEffect(() => {
    // Check if the effect has already run by checking localStorage
    const hasEffectRun = sessionStorage.getItem("hasEffectRun");

    if (signIn !== undefined && !hasEffectRun) {
      setIsSuccessful(true);
      const timer = setTimeout(() => {
        // Set the flag in localStorage to indicate the effect has run
        sessionStorage.setItem("hasEffectRun", "true");
      }, 5000);

      // Clear the timeout on cleanup
      return () => clearTimeout(timer);
    }
  }, [signIn]);


  // useEffect(() => {

  //   if (isPopUp === false) {

  //   }
  // }, [isPopUp]);

  const [limits, setLimits] = useState({
    used: { uploads: 0, download: 0, save: 0, clients: 0 },
    total: { uploads: 0, download: 0, save: 0, clients: 0 },
  });

  const [data, setData] = useState({});
  const [isActive, setIsActive] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [allPlans, setAllPlans] = useState([])
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

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsSuccessful(false);
      setEditProfilePopUp(false)
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const loginListCandidate = [
    {
      name: "Create New Resume",
      imgSrc: "/images/resumeBuilder/createResume.png",
    },
    {
      name: "Create New Cover Letter",
      imgSrc: "/images/resumeBuilder/cover.png",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/collection.png",
    },
    // { name: "Resume", imgSrc: "/images/resumeBuilder/myResume.png" },
    // { name: "Transform CV", imgSrc: "/images/resumeBuilder/transform_cv.png" },
    {
      name: "Skill Assessments & Certification",
      imgSrc: "/images/resumeBuilder/skill_assessments.png",
    },

    { name: "Ask Krut", imgSrc: "/images/resumeBuilder/bot1.png", new: "New" },
    {
      name: "My Website",
      imgSrc: "/images/resumeBuilder/website.png",
      new: "New",
    },
    { name: "Search Jobs", imgSrc: "/images/resumeBuilder/job.png", new: "New" },
    { name: "My Purchases", imgSrc: "/images/resumeBuilder/my_purchases.png" },
  ];

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

  useEffect(() => {
    axios
      .get("http://localhost:2000/api/plans/getAllPlans")
      .then((res) => {

        setAllPlans(res.data.data)


      })
      .catch((err) => {
        console.log(err);
      });


  }, [userDataGlobal]);

  useEffect(() => {

    const uploadCount = localStorage.getItem("uploadCount");
    const saveCount = localStorage.getItem("saveCount");
    const clientCount = localStorage.getItem("clientCount");
    const collectionCount = localStorage.getItem("collectionCount");
    const jobsApply = localStorage.getItem("jobsApply");
    const coverSCount = localStorage.getItem("coverSCount");
    const skillTestCount = localStorage.getItem("skillTestCount");
    const skillCertifiedCount = localStorage.getItem("skillCertifiedCount");

    const uploadCountLimit = localStorage.getItem("uploadCountLimit");
    const saveCountLimit = localStorage.getItem("saveCountLimit");
    const clientCountLimit = localStorage.getItem("clientCountLimit");
    const collectionCountLimit = localStorage.getItem("collectionCountLimit");
    const jobsApplyLimit = localStorage.getItem("jobsApplyLimit");
    const coverCountLimit = localStorage.getItem("coverCountLimit");
    const skillTestCountLimit = localStorage.getItem("skillTestCountLimit");
    const skillCertifiedCountLimit = localStorage.getItem("skillCertifiedCountLimit");


    if (userDataGlobal) {
      axios
        .get("http://localhost:2000/api/subscription/" + userDataGlobal._id)
        .then((res) => {
          const plan = allPlans.find(
            (item) =>
              item.index == res.data.findIsActive?.index
          );
          const result = res.data.findIsActive;
         
          if (res.data.findIsActive.isActive === true) {
            setIsActive(true);
          }

          if (plan) {
            setSelectedPlan(plan);

            setLimits({
              used: result.used,
              total: result.limits
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
  }, [userDataGlobal, allPlans]);

  const [loading, setLoading] = useState(true)
  const [resumeData, setResumeData] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        setData(JSON.parse(storedData));
      }
      // setIsClient(true);

      const resume = localStorage.getItem("resumeData");
      if (resume) {
        setResumeData(JSON.parse(resume));
      }
    }

  }, [userDataGlobal]);

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
  const selectResumeTemplate = (index, pageLayout) => {
    switch (index) {
      case 1:
        return (
          <Template1
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );

      case 3:
        return (
          <Template3
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 4:
        return (
          <Template4
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );

      case 11:
        return (
          <Template11
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 12:
        return (
          <Template12
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 13:
        return (
          <Template13
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 14:
        return (
          <Template14
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 15:
        return (
          <Template15
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 16:
        return (
          <Template16
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 17:
        return (
          <Template17
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={dresumeDataata.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 18:
        return (
          <Template18
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 19:
        return (
          <Template19
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 20:
        return (
          <Template20
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 44:
        return (
          <Template44
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 32:
        return (
          <Template32
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 39:
        return (
          <Template39
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 48:
        return (
          <Template48
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 47:
        return (
          <Template47
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 30:
        return (
          <Template30
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      case 53:
        return (
          <Template53
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}
          />
        );
      default:
        return (
          <Template1
            data={data}
            selectedColor={resumeData.selectedColor}
            selectedFont={resumeData.selectedFont}
            pageLayout={pageLayout}

          />
        );
    }
  };

  const MyComponent = ({ pageLayout }) => {
    return (
      <Document dpi={72} >
        {selectResumeTemplate(resumeData.selectedResumeIndex, pageLayout)}
      </Document>
    );
  };

  return (
    <div className="customMargins flex flex-col gap-12 py-6 min-h-[70vh]">

      {editProfilePopUp && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div ref={taskRef} className="absolute ms:w-[28%] w-[60%] flex flex-col gap-6  justify-between items-center text-center rounded-[24px] bg-white py-6 px-10  text-[24px] font-medium">
              Please edit your profile to update the details !
              <button
                onClick={() => {
                  setEditProfilePopUp(false);
                  router.push("/auth/recruiter-signup?isUpdate=true");
                }}
                style={{ borderColor: "#06a9ef" }}
                className={`w-[160px] px-4 py-[8px] rounded-[12px] border-[1px] border-solid border-[#06a9ef] text-[20px] text-white font-[500] bg-blue hover:bg-[#06a9ef] 
             
            } hover:text-[#fff] transition-all duration-200`}
              >
                Edit Profile
              </button>
            </div>
          </div>
        </>
      )}
      {successful && (
        <>
          <div className="fixed z-[300] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[300] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
            <div
              ref={taskRef}
              className=" absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-6 flex flex-col gap-6 ml:min-w-[350px] ml:w-[25%] ms:w-[50%] scr420:w-[80%] w-[90%] "
            >
              <svg
                className="absolute top-[-40px]  left-[38%] right-[62%] flex"
                xmlns="http://www.w3.org/2000/svg"
                width="85"
                height="85"
                viewBox="0 0 85 85"
                fill="none"
              >
                <g clip-path="url(#clip0_6622_116765)">
                  <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                  <g mask="url(#mask0_6622_116765)">
                    <path
                      d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                      fill="white"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_6622_116765">
                    <rect width="85" height="85" rx="42.5" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              <div className="text-center">
                <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
                  Welcome to SkiloTech!
                </div>
                <div className="text-[16px] font-[500] text-[#333]">
                  {signIn === "true"
                    ? "You Have Signed In Successfully."
                    : "You Have Registered Successfully."}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setIsSuccessful(false);
                    if ((signIn !== "true") && (userDataGlobal.role === "user")) {
                      setEditProfilePopUp(true);
                    }
                  }}
                  className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                >
                  Done
                </button>

              </div>
            </div>
          </div>
        </>
      )}

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
                <div className="text-[24px] text-[#FFFFFF] font-semibold leading-tight break-all">
                  <p> {camelCase(userDataGlobal?.firstName)}</p>
                  {/* <p> {camelCase(userDataGlobal?.lastName)}!</p> */}
                </div>
              )}
            </div>
          </div>
          <div className="text-[14px] font-medium text-[#FFFFFF] flex flex-col gap-4">
            Unleash the power of AI to build a resume that speaks volumes and
            lands your dream job effortlessly.
            <div
              onClick={() => toggle()}
              className="  rounded-[8px] bg-[#FFFFFF] px-4 py-3 text-[16px] flex gap-1 text-[#06A9EF] justify-center items-center leading-tight scr460:w-[152px] w-full  cursor-pointer"
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
          loading={loading}
          setLoading={setLoading}


        />

      </div>
      <div
        // style={{ border: "2px solid red" }}
        className="flex gap-[16px] scr420:gap-12 flex-wrap justify-center"
      >
        {list().map((item, index) => (
          <div
            key={index}
            className={
              "job-card relative scr420:w-[162.67px] w-[132px] scr420:h-[154px] h-[124px] scr420:p-4 p-3 cursor-pointer flex flex-col items-center scr420:gap-3 gap-2 justify-center text-center"
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

      {userDataGlobal.role === "user" &&
        data !== undefined &&
        (
          <div className="ms:flex gap-[24px] flex-wrap flex-col sm:items-start items-center hidden ">
            {resumeData.selectedResumeIndex !== undefined &&
              resumeData.selectedColor !== undefined &&
              resumeData.selectedFont !== undefined && (
                <>
                  <div className="text-[18px] font-Montserrat font-semibold">
                    Continue where you left
                  </div>
                  <div className="  min-w-[280px] max-w-[300px] items-center justify-between gap-[46px] sm:gap-[12px] p-[24px] bg-[#F9F9F9] rounded-[24px] flex flex-col">
                    <span className="font-Montserrat text-[18px] font-medium text-[#333333] break-all text-center">
                      {data.firstName}_resume.pdf
                    </span>

                    <div className=" w-[240px] flex items-center justify-center rounded-[8px] relative  group resumes ">


                      <PDFViewer
                        width="240px"
                        height="338px"
                        showToolbar={false}

                      >
                        <MyComponent pageLayout={true} />
                      </PDFViewer>

                      <div className="bg-[#00000099]  absolute top-[0px] left-[0px] h-[338px] w-full  opacity-0 invisible transition-opacity ease-in-out duration-[0.4s]  group-hover:opacity-100 group-hover:visible flex items-center justify-center">
                        <div className="flex flex-col w-98 h-219 top-27.09 left-47.19 p-[12px]  rounded-lg border border-gray-200 gap-[12px] bg-[#333333CC]">


                          <div
                            onClick={() => {
                              localStorage.removeItem("parsedResume");

                              router.push(
                                `/home/createResume?clientId=${data?.clientId}&continueEdit=true`
                              );
                            }}
                            className="flex items-center flex-col cursor-pointer"
                            style={{
                              borderBottom: "1px solid #646464",
                              paddingBottom: "12px",
                            }}
                          >
                            <img
                              src="/images/icons/edit.png"
                              className="h-[24px] w-[24px]"
                              alt=""
                            />
                            <span className="text-[12px] font-semibold text-white ">
                              Edit
                            </span>
                          </div>


                          <a
                            onClick={() => {
                              localStorage.removeItem("userData");
                              localStorage.removeItem("resumeData");
                              window.location.href = "/";
                            }}
                            className="flex items-center flex-col cursor-pointer"
                          >
                            <img
                              src="/images/icons/delete_icon.png"
                              className="h-[24px] w-[24px]"
                              alt=""
                            />
                            <span className="text-[12px] font-semibold text-white ">
                              Delete
                            </span>
                          </a>

                        </div>
                      </div>
                    </div>


                    {/* <div className="w-[40%] flex flex-col gap-4 ms:min-w-[160px] min-w-[200px]">
                      <span className="font-Montserrat text-[18px] font-medium text-[#333333] break-all">
                        {data.firstName}_resume.pdf
                      </span>
                      {data?.createdAt && data.createdAt !== "" && (
                        <span className="font-Montserrat text-[14px] text-[#808080] font-medium">
                          Updated on {formatDate(data.createdAt)}
                        </span>
                      )}

                      <div
                        onClick={() => {
                          localStorage.removeItem("parsedResume");

                          router.push(
                            `/home/createResume?clientId=${data?.clientId}&continueEdit=true`
                          );
                        }}
                      >
                        <div className="flex flex-row gap-2 cursor-pointer">
                          <svg
                            width="24"
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

                          <p className="font-Montserrat text-[14px] font-semibold text-[#333333]">
                            Edit
                          </p>
                        </div>
                      </div>
                      <button
                        className="w-[130px] h-[36px]  flex gap-2  text-red rounded-[8px]  text-[14px] font-medium"
                        onClick={() => {
                          localStorage.removeItem("userData");
                          window.location.href = "/";
                        }}
                      >
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g mask="url(#mask0_2918_34666)">
                            <path
                              d="M6.75772 16.5841C6.38795 16.5841 6.07223 16.4533 5.81053 16.1916C5.54882 15.9299 5.41797 15.6141 5.41797 15.2444V5.50082H4.41797V4.4175H8.00128V3.51367H12.0013V4.4175H15.5846V5.50082H14.5846V15.2353C14.5846 15.6206 14.4551 15.9418 14.1961 16.1987C13.937 16.4557 13.62 16.5841 13.2448 16.5841H6.75772ZM13.5013 5.50082H6.50128V15.2444C6.50128 15.3192 6.52532 15.3806 6.57341 15.4287C6.62149 15.4768 6.68293 15.5008 6.75772 15.5008H13.2448C13.309 15.5008 13.3677 15.4741 13.4212 15.4207C13.4746 15.3673 13.5013 15.3085 13.5013 15.2444V5.50082ZM8.33784 14.0008H9.42116V7.00082H8.33784V14.0008ZM10.5814 14.0008H11.6647V7.00082H10.5814V14.0008Z"
                              fill="#C00000"
                            />
                          </g>
                        </svg>
                        Delete
                      </button>
                    </div> */}
                  </div>
                </>
              )}
          </div>
        )
      }
    </div>
  );
}

export default Dashboard;
