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

    // {
    //   name: "Create New Cover Letter",
    //   imgSrc: "/images/resumeBuilder/servicesCover.png",
    // },
    // { name: "My Candidates", imgSrc: "/images/resumeBuilder/servicesCandidate.png" },



    //  {
    //   name: "Mail Template",
    //   imgSrc: "/images/resumeBuilder/template2.png",
    //   // new: "AI",
    // },
    {
      name: "JD Builder",
      imgSrc: "/images/resumeBuilder/jdCreation1.png",
      new: "AI",
    },
    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      // new: "AI",
    },
    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/servicesJd.png",
      new: "AI",
    },



    {
      name: "Hiring",
      imgSrc: "/images/resumeBuilder/hiring.png",
      // new: "AI",
    },

    {
      name: "Find Candidates",
      imgSrc: "/images/resumeBuilder/servicesHiring.png",
      new: "AI",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/servicesCollection.png",
      // new: "AI",
    },
    {
      name: "Create Resume",
      imgSrc: "/images/resumeBuilder/servicesResume.png",
      new: "AI",
    },


  ];
  const loginListEmployer = [


    //   {
    //   name: "Mail Template",
    //   imgSrc: "/images/resumeBuilder/template2.png",
    //   // new: "AI",
    // },
    {
      name: "JD Builder",
      imgSrc: "/images/resumeBuilder/jdCreation1.png",
      new: "AI",
    },
    {
      name: "Job Posting",
      imgSrc: "/images/resumeBuilder/servicesJob.png",
      // new: "AI",
    },

    {
      name: "JD Matching",
      imgSrc: "/images/resumeBuilder/servicesJd.png",
      new: "AI",
    },
    // {
    //   name: "Requisition",
    //   imgSrc: "/images/resumeBuilder/servicesRequisition.png",

    // },

    {
      name: "Hiring",
      imgSrc: "/images/resumeBuilder/hiring.png",
      // new: "AI",
    },
    {
      name: "Find Candidates",
      imgSrc: "/images/resumeBuilder/servicesHiring.png",
      new: "AI",
    },
    {
      name: "My Collection",

      imgSrc: "/images/resumeBuilder/servicesCollection.png",
      // new: "AI",
    },

    // {
    //   name: "Preboarding",
    //   imgSrc: "/images/resumeBuilder/servicesPreboarding.png",
    //   // new: "AI",
    // },


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
      case "Create Resume":
        handleNavigation(
          userDataGlobal?.role === "user"
            ? "/home/BuildResume"
            : "/createResume/BuildResume"
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
      case "JD Builder":
        handleNavigation("/jdCreation");
        break;
      case "Mail Template":
        handleNavigation("/template");
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
        className="flex gap-[16px] scr420:gap-6 flex-wrap justify-start "
      >
        {list().map((item, index) => (
          <div
            key={index}
            className={
              "job-card relative scr420:w-[150px] w-[132px] scr420:h-[140px] h-[124px] scr420:p-4 p-3 cursor-pointer flex flex-col items-center scr420:gap-3 gap-2 justify-center text-center bg-white"
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
              <div
                style={{
                  backgroundColor: "#4C43CD",
                  backgroundImage: `
      radial-gradient(65.28% 65.28% at 26.39% 20.83%, rgba(255, 255, 255, 0.413) 0%, rgba(255, 255, 255, 0) 69.79%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(92.09% 85.42% at 86.3% 87.5%, rgba(0, 0, 0, 0.23) 0%, rgba(0, 0, 0, 0) 86.18%)
    `,
                }}
                className=" absolute gap-1 scr420:right-4  scr420:top-4 right-2 top-2 flex justify-center items-center px-2  py-2 scr420:h-[19px] h-[15px] rounded-[30px] text-[#FFF] scr420:text-[12px] text-[10px] font-medium leading-tight"
              >
                <svg
                  width="11"
                  height="10"
                  viewBox="0 0 11 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.93291 2.29406C5.26133 3.80704 6.1156 4.71906 7.51333 5.0809C7.53093 5.08513 7.5407 5.10418 7.53679 5.12111C7.53484 5.1338 7.52506 5.14438 7.51333 5.1465C6.10388 5.49565 5.26329 6.42883 4.93096 7.94392C4.92705 7.96296 4.90946 7.97354 4.89186 7.96931C4.88013 7.9672 4.87036 7.95662 4.8684 7.94392C4.54585 6.41825 3.69158 5.50623 2.28994 5.14227C2.27235 5.13803 2.26257 5.11899 2.26648 5.09995C2.26844 5.08725 2.27821 5.07667 2.28994 5.07455C3.69158 4.7254 4.53803 3.80492 4.87231 2.29194C4.87622 2.2729 4.89382 2.26232 4.91141 2.26655C4.92118 2.27502 4.93096 2.28348 4.93291 2.29406Z"
                    fill="#FFDA1D"
                  />
                  <path
                    d="M8.23025 0.0407713C8.40423 0.836407 8.8519 1.31675 9.58693 1.5072C9.5967 1.50931 9.60061 1.51989 9.59865 1.52836C9.5967 1.5347 9.59279 1.54105 9.58693 1.54105C8.84603 1.72515 8.40228 2.21607 8.2283 3.01171C8.22634 3.02229 8.21657 3.02652 8.20875 3.02441C8.20288 3.02229 8.19702 3.01806 8.19702 3.01171C8.02694 2.20973 7.57733 1.72938 6.84034 1.53682C6.83057 1.5347 6.82666 1.52412 6.82861 1.51566C6.83057 1.50931 6.83448 1.50296 6.84034 1.50296C7.57733 1.31887 8.02303 0.836407 8.19897 0.0386553C8.20093 0.0280751 8.20875 0.0217269 8.21852 0.0238429C8.22439 0.025959 8.2283 0.0323071 8.23025 0.0407713Z"
                    fill="#FFDA1D"
                  />
                  <path
                    d="M1.40994 1.37472C1.58197 2.17035 2.03158 2.6507 2.76661 2.84114C2.77639 2.84326 2.7803 2.85384 2.77834 2.8623C2.77639 2.86865 2.77248 2.875 2.76661 2.875C2.02572 3.05909 1.58197 3.55002 1.40798 4.34565C1.40603 4.35623 1.39625 4.36047 1.38843 4.35835C1.38257 4.35623 1.37671 4.352 1.37671 4.34565C1.20663 3.54367 0.757014 3.06333 0.0200304 2.87077C0.0102561 2.86865 0.00634635 2.85807 0.00830122 2.8496C0.0102561 2.84326 0.0141658 2.83691 0.0200304 2.83691C0.757014 2.65281 1.20272 2.17035 1.37866 1.3726C1.38061 1.36202 1.39039 1.35779 1.39821 1.3599C1.40407 1.36414 1.40994 1.36837 1.40994 1.37472Z"
                    fill="#FFDA1D"
                  />
                  <path
                    d="M8.53494 7.01733C8.70892 7.81297 9.15658 8.29331 9.89161 8.48376C9.90139 8.48587 9.9053 8.49645 9.90334 8.50492C9.90139 8.51127 9.89748 8.51762 9.89161 8.51762C9.15072 8.70171 8.70697 9.19264 8.53298 9.98827C8.53103 9.99885 8.52125 10.0031 8.51343 10.001C8.50757 9.99885 8.50171 9.99462 8.50171 9.98827C8.33163 9.18629 7.88201 8.70594 7.14503 8.51338C7.13526 8.51127 7.13135 8.50069 7.1333 8.49222C7.13526 8.48587 7.13917 8.47953 7.14503 8.47953C7.88201 8.29543 8.32772 7.81297 8.50366 7.01522C8.50561 7.00464 8.51539 6.99829 8.52321 7.00041C8.52907 7.00675 8.53494 7.01099 8.53494 7.01733Z"
                    fill="#FFDA1D"
                  />
                  <path
                    d="M9.14583 4.56582C9.2553 5.06732 9.53876 5.37203 10.0021 5.49265C10.0079 5.49477 10.0099 5.50111 10.0079 5.50746C10.006 5.50958 10.004 5.51169 10.0021 5.51381C9.53289 5.63019 9.25335 5.93914 9.14387 6.44276C9.14192 6.44911 9.13605 6.45334 9.13019 6.45122C9.12628 6.45122 9.12237 6.44699 9.12237 6.44276C9.01485 5.9349 8.7314 5.63231 8.26614 5.51169C8.26028 5.50958 8.25637 5.50323 8.25832 5.49688C8.25832 5.49265 8.26223 5.48842 8.26614 5.48842C8.7314 5.37203 9.0129 5.06732 9.12433 4.5637C9.12628 4.55735 9.13214 4.55312 9.13801 4.55524C9.14192 4.55735 9.14583 4.56159 9.14583 4.56582Z"
                    fill="#FFDA1D"
                  />
                  <path
                    d="M2.41927 7.67308C2.52874 8.17458 2.81219 8.47929 3.2755 8.59991C3.28136 8.60202 3.28527 8.60837 3.28332 8.61472C3.28332 8.61895 3.27941 8.62318 3.2755 8.62318C2.80828 8.73957 2.52874 9.05063 2.41731 9.55213C2.41536 9.55848 2.40949 9.56271 2.40363 9.5606C2.39972 9.55848 2.39776 9.55636 2.39581 9.55213C2.28829 9.04428 2.00484 8.74168 1.53958 8.62107C1.53371 8.61895 1.5298 8.6126 1.53176 8.60626C1.53176 8.60202 1.53567 8.59779 1.53958 8.59779C2.00484 8.48141 2.28634 8.1767 2.39776 7.67308C2.39972 7.66673 2.40558 7.6625 2.41145 7.66461C2.41731 7.66673 2.41927 7.66884 2.41927 7.67308Z"
                    fill="#FFDA1D"
                  />
                  <path
                    d="M3.59492 0.00902704C3.68485 0.423773 3.91943 0.675584 4.30454 0.775038C4.30845 0.777154 4.31236 0.781386 4.3104 0.785618C4.3104 0.78985 4.30649 0.791966 4.30454 0.791966C3.91748 0.887189 3.68485 1.14535 3.59297 1.56221C3.59101 1.56644 3.5871 1.57067 3.58124 1.56856C3.57733 1.56856 3.57537 1.56433 3.57537 1.56221C3.48741 1.14323 3.25087 0.891421 2.86576 0.791966C2.86185 0.78985 2.85794 0.785618 2.85989 0.77927C2.85989 0.775038 2.8638 0.772922 2.86576 0.772922C3.25087 0.6777 3.4835 0.423773 3.57733 0.00691098C3.57928 0.00267888 3.58319 -0.00155321 3.58906 0.000562842C3.59101 0.00267889 3.59492 0.00479494 3.59492 0.00902704Z"
                    fill="#FFDA1D"
                  />
                </svg>
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
