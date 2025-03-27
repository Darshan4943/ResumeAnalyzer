import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function HeaderSidebar({
  selectedPage,
  setIsSidebar,
  setIsLogin,
  isLogin,
  isSidebar,
}) {
  const boforeLoginList = ["Home", "Jobs", "Services"];
  const loginListCandidate = [
    "Home",
    "Create New Resume",
    "Create New Cover Letter",
    // "My Resumes",
    "My Collection",
    // "Transform CV",
    "Skill Assessments & Certification",
    "Search Jobs",
    "Ask Krut",
    "My Website",
    "My Purchases",
  ];
  const loginListRecruiter = [
    "Home",
    "Companies",
    "Job Posting",
    "Hiring",
    "Candidates",

    "My Collection",

    "JD Matching",

  ];
  const loginListEmployer = [
    "Home",
    "Requisition",
    "Job Posting",
    "Hiring",
    "Preboarding",

    "My Collection",

    "JD Matching",

  ];
  const router = useRouter();
  const [visible, setvisible] = useState(false);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  const handleNavigation = (page) => {
    setIsSidebar(false);
    router.push(page);
  };

  const list = () => {
    if (userDataGlobal?.role === "user") {
      return loginListCandidate;
    } else if (userDataGlobal?.role === "recruiter") {
      return loginListRecruiter;
    } else if (userDataGlobal?.role === "employer") {
      return loginListEmployer;
    } else return boforeLoginList;
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setvisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const getListItemStyles = (page) => {
    const isSelected = selectedPage === page || (page !== "/" && selectedPage.startsWith(page + "/"));



    const backgroundColor = isSelected
      ? "rgba(6, 169, 239, 0.50)"
      : "rgba(255, 255, 255, 0.50)";
    const textColor = isSelected ? "#FFF" : "#000";
    const fontSize = isSelected ? "18px" : "16px";
    const fontWeight = isSelected ? "600" : "500";
    return {
      backgroundColor,
      color: textColor,
      cursor: "pointer",
      fontSize,
      fontWeight,
    };
  };

  const handleLogOut = () => {
    // setIsLogin(false);
    localStorage.clear();

    if (userDataGlobal?.role === "user") {
      router.push("/");
    } else {
      router.push("/");
    }
    window.location.href = "/";
  };

  return (
    <div className="  flex flex-col  pt-[3.5rem] relative overflow-y-auto mb-8 ">
      <div className="sticky top-0">
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-100%)",
            transition: "transform 0.5s ease-in-out",
          }}
          className="flex justify-between px-4 mt-3 py-2 "
        >
          <div onClick={() => router.push("/home")}>
            <img
              src="/images/logo_skilotech.png"
              alt=""
              className="w-[123px] h-[40px] object-contain"
            />
          </div>
          <div
            className=""
            onClick={() => {
              setIsSidebar(false), window.scroll(0, 0);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <g mask="url(#mask0_5925_108792)">
                <path
                  d="M8 23.75L6.25 22L13.25 15L6.25 8L8 6.25L15 13.25L22 6.25L23.75 8L16.75 15L23.75 22L22 23.75L15 16.75L8 23.75Z"
                  fill="#1C1B1F"
                />
              </g>
            </svg>
          </div>
        </div>
        <div className="flex flex-col" style={{ listStyle: "none" }}>
          {isLogin && (
            <div
              onClick={() =>
                router.push("/profile")}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.6s ease-in-out",
              }}
              className="flex gap-4 p-4 items-center "
            >
              {userDataGlobal?.profilePicture ? (
                <img
                  className=" rounded-full object-cover h-[36px] w-[36px]"
                  src={
                    userDataGlobal?.profilePicture ||
                    "/images/profile/profileNew.png"
                  }
                />
              ) : (
                <div
                  className="rounded-[40px] h-[40px] w-[40px] bg-[#06A9EF] flex items-center justify-center text-white font-semibold text-[20px] "
                  style={{ textTransform: "capitalize" }}
                  alt=""
                >
                  {userDataGlobal?.email?.slice(0, 1)}
                </div>
              )}
              <div className="text-[20px] font-medium">
                {userDataGlobal?.firstName} {userDataGlobal?.lastName}
              </div>
            </div>
          )}
          {list().map((item, index) => (
            <li
              key={index}
              className="px-4 py-6 border-b-2 border-[#06A9EF] text-[16px] "
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-100%)",
                ...(item === "Candidate" && {
                  ...getListItemStyles("/"),
                  transition: "transform 0.7s ease-in-out",
                }),
                ...(item === "Recruiter" && {
                  ...getListItemStyles("/recruiter"),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "Services" && {
                  ...getListItemStyles("/services"),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "Jobs" && {
                  ...getListItemStyles("/jobs/candidate"),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "Home" && {
                  ...getListItemStyles("/"),
                  transition: "transform 0.7s ease-in-out",
                }),
                ...(item === "Candidates" && {
                  ...getListItemStyles("/candidates"),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "Create New Resume" && {
                  ...getListItemStyles("/createResume/BuildResume"),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "Create New Cover Letter" && {
                  ...getListItemStyles(userDataGlobal?.role === "user" ? "/coverLetter" : `/myClients/ClientResume?cover=true`),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "My Resumes" && {
                  ...getListItemStyles("/home/MyCollection"),
                  transition: "transform 0.8s ease-in-out",
                }),
                ...(item === "Transform CV" && {
                  ...getListItemStyles("/transform/TransformJob"),
                  transition: "transform 0.9s ease-in-out",
                }),
                ...(item === "JD Matching" && {
                  ...getListItemStyles("/JobMatching/SelectJob"),
                  transition: "transform 1s ease-in-out",
                }),
                ...(item === "My Collection" && {
                  ...getListItemStyles(userDataGlobal?.role === "user" ? "/candidate/MyCollection" : "/myCollection"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Skill Assessments & Certification" && {
                  ...getListItemStyles("/candidate/SkillAssessment"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Search Jobs" && {
                  ...getListItemStyles("/jobs/candidate"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Job Posting" && {
                  ...getListItemStyles("/common/jobPosting"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Ask Krut" && {
                  ...getListItemStyles("/chatbot"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "My Website" && {
                  ...getListItemStyles("/candidate/myWebsite"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "My Purchases" && {
                  ...getListItemStyles("/purchase/MyPurchase"),
                  transition: "transform 1.2s ease-in-out",
                }),
                ...(item === "Hiring" && {
                  ...getListItemStyles("/common/hiring"),
                  transition: "transform 1.2s ease-in-out",
                }),
                ...(item === "Companies" && {
                  ...getListItemStyles("/recruiter/companies"),
                  transition: "transform 1.2s ease-in-out",
                }),
                ...(item === "Requisition" && {
                  ...getListItemStyles("/employer/requisition"),
                  transition: "transform 1.2s ease-in-out",
                }),
                ...(item === "Preboarding" && {
                  ...getListItemStyles("/employer/Preboarding"),
                  transition: "transform 1.2s ease-in-out",
                }),

              }}
              onClick={() => {
                switch (item) {
                  case "Candidate":
                    handleNavigation("/");
                    break;
                  case "Recruiter":
                    handleNavigation("/recruiter");
                    break;
                  case "Jobs":
                    handleNavigation("/jobs/candidate");
                    break;
                  case "Services":
                    handleNavigation("/services");
                    break;
                  case "Home":
                    handleNavigation("/");
                    break;
                  case "Companies":
                    handleNavigation("/recruiter/companies");
                    break;
                  case "Candidates":
                    handleNavigation("/candidates");
                    break;
                  case "Create New Resume":
                    handleNavigation(userDataGlobal?.role === "user"
                      ? "/createResume/BuildResume"
                      : "/myClients/ClientResume");
                    break;
                  case "Create New Cover Letter":
                    handleNavigation(userDataGlobal?.role === "user" ? "/coverLetter" : `/myClients/ClientResume?cover=true`);
                    break;
                  case "My Resumes":
                    handleNavigation("/home/MyCollection");
                    break;
                  case "Transform CV":
                    handleNavigation("/transform/TransformJob");
                    break;
                  case "JD Matching":
                    handleNavigation("/JobMatching/SelectJob");
                    break;
                  case "Hiring":
                    handleNavigation("/common/hiring");
                    break;

                  case "My Purchases":
                    handleNavigation("/purchase/MyPurchase");
                    break;
                  case "Ask Krut":
                    handleNavigation("/chatbot");
                    break;
                  case "My Website":
                    handleNavigation("/candidate/myWebsite");
                    break;
                  case "My Collection":
                    handleNavigation(userDataGlobal?.role === "user" ? "/candidate/MyCollection" : "/myCollection?folders=true");
                    break;
                  case "Skill Assessments & Certification":
                    handleNavigation("/candidate/SkillAssessment");
                    break;
                  case "Job Posting":
                    handleNavigation(userDataGlobal?.role === "recruiter" ? "/common/jobPosting" : "/common/jobPosting/JobPosting");
                    break;
                  case "Search Jobs":
                    handleNavigation("/jobs/candidate");
                    break;
                  case "Requisition":
                    handleNavigation("/employer/requisition");
                    break;
                  case "Preboarding":
                    handleNavigation("/employer/Preboarding");
                    break;
                  default:
                    break;
                }
              }}
            >
              {item}
            </li>
          ))}
          {isLogin && (
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 1.3s ease-in-out",
              }}
              onClick={() => handleLogOut()}
              className="px-4 py-7 border-b-2 border-[#06A9EF] bg-backgroundColor text-[18px] font-medium text-[#C00000]"
            >
              Log Out
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderSidebar;
