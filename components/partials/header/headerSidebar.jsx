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
  const boforeLoginList = ["Candidate", "Recruiter"];
  const loginListCandidate = [
    "Home",
    "My Resumes",
    "Transform CV",
    "Skill Assessments",
    "Search Jobs",
    "My Purchases",
  ];
  const loginListRecruiter = [
    "Home",
    "My Clients",
    "Transform CV",
    "Job Description Matching",
    "Collection",
    "Post Jobs",
    "My Purchases",
  ];
  const router = useRouter();
  const [visible, setvisible] = useState(false);
  const userDataGlobal = useSelector((state) => state.userData);

  const handleNavigation = (page) => {
    setIsSidebar(false);
    router.push(page);
  };

  const list = () => {
    if (userDataGlobal.role === "user") {
      return loginListCandidate;
    } else if (userDataGlobal.role === "recruiter") {
      return loginListRecruiter;
    } else return boforeLoginList;
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setvisible(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const getListItemStyles = (page) => {
    const isSelected = selectedPage === page;

    const backgroundColor = isSelected
      ? "rgba(6, 169, 239, 0.50)"
      : "rgba(255, 255, 255, 0.50)";
    const textColor = isSelected ? "#FFF" : "#000";
    const fontSize = isSelected ? "20px" : "18px";
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
    setIsLogin(false);
    localStorage.clear();

    if (userDataGlobal.role === "user") {
      router.push("/");
    } else {
      router.push("/recruiter");
    }
    window.location.href = "/";
  };

  return (
    <div className=" h-[114vh] flex flex-col  pt-[3.5rem] relative overflow-y-auto ">
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
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateX(0)" : "translateX(-100%)",
                transition: "transform 0.6s ease-in-out",
              }}
              className="flex gap-4 p-4 items-center "
            >
              {userDataGlobal?.profilePicture ? (
                <img
                  className=" rounded-full object-cover h-[40px] w-[40px]"
                  src={
                    userDataGlobal?.profilePicture?.img ||
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
                {userDataGlobal?.name}
              </div>
            </div>
          )}
          {list().map((item, index) => (
            <li
              key={index}
              className="px-4 py-6 border-b-2 border-[#06A9EF] "
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
                ...(item === "Home" && {
                  ...getListItemStyles("/home"),
                  transition: "transform 0.7s ease-in-out",
                }),
                ...(item === "My Clients" && {
                  ...getListItemStyles("/myClients"),
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
                ...(item === "Job Description Matching" && {
                  ...getListItemStyles("/transform/JobMatching"),
                  transition: "transform 1s ease-in-out",
                }),
                ...(item === "Collection" && {
                  ...getListItemStyles("/collection"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Skill Assessments" && {
                  ...getListItemStyles("/home/SkillAssessment"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Search Jobs" && {
                  ...getListItemStyles("/jobs/search"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "Post Jobs" && {
                  ...getListItemStyles("/jobs/list"),
                  transition: "transform 1.1s ease-in-out",
                }),
                ...(item === "My Purchases" && {
                  ...getListItemStyles("/purchase/MyPurchase"),
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
                  case "Home":
                    handleNavigation("/home");
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
                  case "Collection":
                    handleNavigation("/collection");
                    break;
                  case "Skill Assessments":
                    handleNavigation("/home/SkillAssessment");
                    break;
                  case "Post Jobs":
                    handleNavigation("/jobs/list");
                    break;
                  case "Search Jobs":
                    handleNavigation("/jobs/search");
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
