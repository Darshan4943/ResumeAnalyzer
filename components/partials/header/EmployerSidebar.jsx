import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ALink from "../../alink";
import { useSelector } from "react-redux";

function EmployerSidebar() {
  const router = useRouter();
  const [selectedPage, setSelectedPage] = useState("");
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  useEffect(() => {
    setSelectedPage(router.pathname);
    setOpenSubmenuIndex(null);
  }, [router.pathname]);

  const recruiterList = [
    {
      title: "Home",
      img: "/images/employer/sidebar/home.png",
      img1: "/images/employer/sidebar/home2.png",
      route: "/",
    },
     {
      img: "/images/employer/sidebar/jdcreation.png",
      img1: "/images/employer/sidebar/jdcreation2.png",
      title: "JD Builder",
      route: "/jdCreation",
    },
    {
      title: "Job Management",
      img: "/images/employer/sidebar/jobPosting.png",
      img1: "/images/employer/sidebar/jobPosting2.png",
      children: [
        {
          title: "Companies",
          route: "/recruiter/companies",
          img: "/images/employer/sidebar/companies.png",
          img1: "/images/employer/sidebar/companies2.png",
        },
        {
          title: "Job Posting",
          route: "/common/jobPosting",
          img: "/images/employer/sidebar/jobPosting.png",
          img1: "/images/employer/sidebar/jobPosting2.png",
        },
        {
          title: "Hiring",
          route: "/common/hiring",
          img: "/images/employer/sidebar/hiring.png",
          img1: "/images/employer/sidebar/hiring2.png",
        },
      ],
    },
    {
      img: "/images/employer/sidebar/jdMatching.png",
      img1: "/images/employer/sidebar/jdMatching2.png",
      title: "JD Matching",
      route: "/JobMatching",
    },
   
    {
      img: "/images/employer/sidebar/myCollection.png",
      img1: "/images/employer/sidebar/myCollection2.png",
      title: "My Collection",
      route: "/myCollection?folders=true",
    },
    {
      img: "/images/employer/sidebar/findCandidate.png",
      img1: "/images/employer/sidebar/findCandidate1.png",
      title: "Find Candidates",
      route: "/findCandidates",
    },
    {
      img: "/images/employer/sidebar/mailTemplate.png",
      img1: "/images/employer/sidebar/mailTemplate2.png",
      title: "Mail Templates",
      route: "/template",
    },
    {
      img: "/images/employer/sidebar/resumes.png",
      img1: "/images/employer/sidebar/resumes2.png",
      title: "Resumes",
      route: "/recruiter/resumeCreation",
      route1: "/createResume"
    },
  ];

  const employerList = [
    {
      title: "Home",
      img: "/images/employer/sidebar/home.png",
      img1: "/images/employer/sidebar/home2.png",
      route: "/",
    },
    {
      title: "Job Management",
      img: "/images/employer/sidebar/jobPosting.png",
      img1: "/images/employer/sidebar/jobPosting2.png",
      children: [
        {
          title: "Requisition",
          route: "/employer/requisition",
          img: "/images/employer/sidebar/requisition.png",
          img1: "/images/employer/sidebar/Requisition2.png",
        },
        {
          title: "Job Posting",
          route: "/common/jobPosting/JobPosting",
          img: "/images/employer/sidebar/jobPosting.png",
          img1: "/images/employer/sidebar/jobPosting2.png",
          route1: "/common/jobPosting",
        },
        {
          title: "Hiring",
          route: "/common/hiring",
          img: "/images/employer/sidebar/hiring.png",
          img1: "/images/employer/sidebar/hiring2.png",
        },
        {
          title: "Preboarding",
          route: "/employer/Preboarding",
          img: "/images/employer/sidebar/preboarding.png",
          img1: "/images/employer/sidebar/Preboarding2.png",
        },
      ],
    },
    {
      img: "/images/employer/sidebar/jdMatching.png",
      img1: "/images/employer/sidebar/jdMatching2.png",
      title: "JD Matching",
      route: "/JobMatching",
    },
    {
      img: "/images/employer/sidebar/jdcreation.png",
      img1: "/images/employer/sidebar/jdcreation2.png",
      title: "JD Builder",
      route: "/jdCreation",
    },
    {
      img: "/images/employer/sidebar/myCollection.png",
      img1: "/images/employer/sidebar/myCollection2.png",
      title: "My Collection",
      route: "/myCollection?folders=true",
    },
    {
      img: "/images/employer/sidebar/findCandidate.png",
      img1: "/images/employer/sidebar/findCandidate1.png",
      title: "Find Candidates",
      route: "/findCandidates",
    },
    {
      img: "/images/employer/sidebar/mailTemplate.png",
      img1: "/images/employer/sidebar/mailTemplate2.png",
      title: "Mail Templates",
      route: "/template",
    },
  ];

  const bpoList = [
    {
      img: "/images/employer/sidebar/template1.png",
      img1: "/images/employer/sidebar/template.png",
      title: "Resumes",
      route: "/",
    },
    {
      img: "/images/employer/sidebar/myCollection.png",
      img1: "/images/employer/sidebar/myCollection2.png",
      title: "My Collection",
      route: "/myCollection?folders=true",
    },
  ];

  const menuList =
    userDataGlobal?.role === "recruiter"
      ? recruiterList
      : userDataGlobal?.role === "employer"
        ? employerList
        : bpoList;

  return (
    <div className="flex flex-col bg-white w-[120px] pt-[64px] h-full relative overflow-visible z-20">
      {menuList.map((item, index) => {
        const isActive =
          item.route === "/"
            ? selectedPage === item.route
            : selectedPage.startsWith(item.route?.split("?")[0] || "") ||
            (item.route1 &&
              selectedPage.startsWith(item.route1.split("?")[0]));

        if (item.children) {
          const isChildActive = item.children.some(
            (child) =>
              selectedPage.startsWith(child.route?.split("?")[0]) ||
              (child.route1 &&
                selectedPage.startsWith(child.route1.split("?")[0]))
          );

          return (
            <div
              key={index}
              className="relative group"
            // onMouseEnter={() => setBlurContent(true)}
            // onMouseLeave={() => setBlurContent(false)}
            >
              <div className="p-2 cursor-pointer">
                <div
                  className={`w-full flex flex-col gap-2 py-2 items-center rounded-[8px] ${isChildActive ? "bg-[#DFF4FD]" : ""
                    }`}
                >
                  <img
                    src={isChildActive ? item.img1 : item.img}
                    alt={item.title}
                    className="w-[24px] h-[24px]"
                  />
                  <div
                    className={`text-center text-[12px] font-medium ${isChildActive ? "text-blue" : "text-[#646464]"
                      }`}
                  >
                    {item.title}
                  </div>
                </div>
              </div>

              {/* Submenu */}
              <div style={{
                boxShadow: "0px 2px 10px 1px #00000040"
              }} className="absolute top-0 left-[115px] bg-white rounded-md  w-[180px] py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-150 z-50">
                {item.children.map((child, cIdx) => (
                  <ALink href={child.route} key={cIdx}>
                    <div className="flex items-center gap-2 px-4 py-2 hover:bg-[#C2E7FF]">
                      <img
                        src={child.img}
                        alt={child.title}
                        className="w-[20px] h-[20px]"
                      />
                      <span className="text-[15px] font-medium text-[#333]">{child.title}</span>
                    </div>
                  </ALink>
                ))}
              </div>
            </div>
          );
        }

        return (
          <ALink href={item.route} key={index}>
            <div className="p-2">
              <div
                className={`w-full flex flex-col gap-2 py-2 justify-center items-center rounded-[8px] ${isActive ? "bg-[#DFF4FD]" : ""
                  }`}
              >
                <img
                  src={isActive ? item.img1 : item.img}
                  alt={item.title}
                  className="w-[24px] h-[24px]"
                />
                <div
                  className={`text-center text-[12px] font-medium ${isActive ? "text-blue" : "text-[#646464]"
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
