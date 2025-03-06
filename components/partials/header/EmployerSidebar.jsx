import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ALink from "../../alink";
import { useSelector } from "react-redux";

function EmployerSidebar() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  useEffect(() => {
    setSelectedPage(router.pathname);
  }, [router.pathname]);

  const recruiterList = [
    {
      img: "/images/employer/sidebar/home.png",
      img1: "/images/employer/sidebar/home1.png",
      title: "Home",
      route: "/",
    },
    {
      img: "/images/employer/sidebar/companies.png",
      img1: "/images/employer/sidebar/companies1.png",
      title: "Companies",
      route: "/recruiter/companies",
    },
    {
      img: "/images/employer/sidebar/jobPosting.png",
      img1: "/images/employer/sidebar/jobPosting1.png",
      title: "Job Posting",
      route: "/common/jobPosting",
    },
    {
      img: "/images/employer/sidebar/hiring.png",
      img1: "/images/employer/sidebar/hiring1.png",
      title: "Hiring",
      route: "/common/hiring",
    },
    {
      img: "/images/employer/sidebar/jdMatching.png",
      img1: "/images/employer/sidebar/jdMatching1.png",
      title: "JD Matching",
      route: "/JobMatching/SelectJob",
    },
    {
      img: "/images/employer/sidebar/jdcreation.png",
      img1: "/images/employer/sidebar/jdcreation2.png",
      title: "Jd Creation",
      route: "/jdCreation",
    },
    {
      img: "/images/employer/sidebar/candidate.png",
      img1: "/images/employer/sidebar/candidate1.png",
      title: "Candidates",
      route: "/candidates",
    },
    {
      img: "/images/employer/sidebar/myCollection.png",
      img1: "/images/employer/sidebar/myCollection1.png",
      title: "My Collection",
      route: "/myCollection?folders=true",
    },
    
  ];

  const employerList = [
    {
      img: "/images/employer/sidebar/home.png",
      img1: "/images/employer/sidebar/home1.png",
      title: "Home",
      route: "/",
    },
    {
      img: "/images/employer/sidebar/requisition.png",
      img1: "/images/employer/sidebar/requisition1.png",
      title: "Requisition",
      route: "/employer/requisition",
    },
    {
      img: "/images/employer/sidebar/jobPosting.png",
      img1: "/images/employer/sidebar/jobPosting1.png",
      title: "Job Posting",
      route: "/common/jobPosting/JobPosting",
    },
    {
      img: "/images/employer/sidebar/hiring.png",
      img1: "/images/employer/sidebar/hiring1.png",
      title: "Hiring",
      route: "/common/hiring",
    },
    {
      img: "/images/employer/sidebar/jdMatching.png",
      img1: "/images/employer/sidebar/jdMatching1.png",
      title: "JD Matching",
      route: "/JobMatching/SelectJob",
    },
    {
      img: "/images/employer/sidebar/preboarding.png",
      img1: "/images/employer/sidebar/preboarding1.png",
      title: "Preboarding",
      route: "/employer/Preboarding",
    },
    {
      img: "/images/employer/sidebar/myCollection.png",
      img1: "/images/employer/sidebar/myCollection1.png",
      title: "My Collection",
      route: "/myCollection?folders=true",
    },
    
  ];

  const menuList =
    userDataGlobal?.role === "recruiter" ? recruiterList : employerList;

  return (
    <div className="flex flex-col bg-white w-[120px] pt-[86px] h-full">
      {menuList.map((item, index) => {
        const isActive =
          item.route === "/"
            ? selectedPage === item.route
            : selectedPage.startsWith(item.route.split("?")[0]);
        return (
          <ALink href={item.route} key={index}>
            <div className="p-2">
              <div
                className={`w-full flex flex-col gap-2 p-2 justify-center items-center rounded-[8px] ${
                  isActive ? "bg-[#DFF4FD]" : ""
                }`}
              >
                <img
                  src={isActive ? item.img1 : item.img}
                  alt={item.title}
                  className="w-[24px] h-[24px]"
                />
                <div
                  className={`text-center text-[12px] font-medium ${
                    isActive ? "text-blue" : "text-[#646464]"
                  }`}
                >
                  {item.title}
                </div>
              </div>
            </div>
          </ALink>
        );
      })}
    </div>
  );
}

export default EmployerSidebar;
