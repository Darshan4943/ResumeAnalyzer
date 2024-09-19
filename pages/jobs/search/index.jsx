// import AppliedJobs from "@/components/featured/candidate/afterLogin/home/AppliedJobs";
// import SavedJobs from "@/components/featured/candidate/afterLogin/home/SavedJobs";
import React, { useEffect, useReducer, useRef, useState } from "react";
import AppliedJobs from "../home/AppliedJobs";
import SavedJobs from "../home/SavedJobs";
// import { inputData } from "../../../utils/data";
// import { inputData } from "@/utils/data";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
// import Description from "@/components/featured/candidate/afterLogin/home/Description";
// import AllJobs from "@/components/featured/candidate/afterLogin/home/AllJobs";
// import Filter from "@/components/featured/candidate/afterLogin/home/Filter";
import { AnimatePresence, motion } from "framer-motion";
// import ApplicationStatus from "@/components/featured/candidate/afterLogin/home/ApplicationStatus";
import Description from "../home/Description";
import AllJobs from "../home/AllJobs";
import Filter from "../home/Filter";
import ApplicationStatus from "../home/ApplicationStatus";
// import { recallUser } from "./reducers/userReducer";
import { reCallUser } from "../../../Redux/reducers/reducer";
import axios from "axios";
import { setJob } from "../../../Redux/actions";
import InputBox from "../home/InputBox";
import { Page } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import MiniLoader from "../../../components/common/miniLoader";
import NoJobs from "../home/noJobs";
import LimitUsedModal from "../../../components/models/limitUsedModal";

// import { btns } from "~/utils/data";

const btns = [
  "Linkedin (101)",

  "Naukri.com (109)",

  "Indeed (119)",

  "Glassdoor (82)",
];
{
  /**
const InputBox = ({ item }) => {
  const { title, child, img } = item;

  return (
    <>
      <div className="rounded-md bg-white shadow-md flex  justify-center items-center group relative  ">
        <div className="text-[#333] justify-center items-center text-[14px] flex font-medium w-auto px-4 py-3 gap-1">
          <div class="">
            <div class=" transition-transform transform  flex items-center justify-center gap-1">
              {title}
              <img src={img} className=" h-[20px] w-[20px]  object-cover" />
            </div>
            <div
              class="  hidden dropdown mt-1 bg-[#fff] p-4 group-hover:block  rounded-[6px] dropdown-hover:block absolute bottom-100 left-[1px] w-[340px] gap-[10px] top-[46px]"
              style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" }}
            >
              <div className="flex flex-col gap-5 items-start">
                <div className="flex   items-start self-stretch gap-1 p-1 border border-text-secondary rounded-md bg-white">
                  <div className="w-[24px] h-[24px]">
                    <img src="/images/jobs/ser.png" alt="" />
                  </div>
                  <input
                    type="text"
                    placeholder="search"
                    className="font-montserrat font-normal text-[14px] text-black "
                    onChange={(e) =>
                      handleCheckboxChange(item.title, e.target.value)
                    }
                  />
                </div>

                <div className="flex  gap-2 self-stretch flex-col items-start ">
                  {child.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded-md border h-[20px] w-[20px] border-blue bg-white object-cover"
                      />
                      <div className="flex flex-col items-start">
                        <p className="font-montserrat font-medium text-[12px] text-black flex flex-col">
                          {item}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center items-start w-full gap-2">
                  <button className="rounded-[8px] border border-blue w-[49%] text-black  py-[12px]">
                    <p className="text-[12px] font-[700px] text-black ">
                      clear
                    </p>
                  </button>
                  <button className="rounded-[8px] border border-blue bg-blue w-[49%]  text-black  py-[12px]">
                    <p className="text-[12px] font-[700px] text-white  ">
                      Apply
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
 */
}
function Index() {
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filter, setFilter] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const jobData = useSelector((state) => state.getAllJobs.data);
  const [selectedJob, setSelectedJob] = useState();
  const [toggleHeadings, setToggleHeadings] = useState(0);
  const [savedJobList, setSavedJobList] = useState([]);
  const isViewportBelow1024 = useMediaQuery("(max-width:1024px)");
  const isViewportBelow600 = useMediaQuery("(max-width:600px)");
  const userDataGlobal = useSelector((state) => state.userData);
  const [userSkills, setUserSkills] = useState();
  const isViewportBelow850 = useMediaQuery("(max-width:850px)");
  const dispatch = useDispatch();
  const [isDescription, setIsDescription] = useState(false);
  const [page, setPage] = useState(1);
  const [clear, setClear] = useState(false)
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [country, setCountry] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({

  });
  const [appliedJobs, setAppliedJobs] = useState()
  const router = useRouter();
  const { applied } = router.query;
  const [jobtypeData, setJobTypeData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [limitPopup, setLimitPopup] = useState(false)

  useEffect(() => {
    if (applied == "true") {
      setToggleHeadings(1)
    }
  }, [applied]);

 

  useEffect(() => {
    const storedCountry = localStorage.getItem("country");
    if (storedCountry) {
      setCountry(storedCountry)

    }
    axios
      .get("http://localhost:2000/api/jobs/getJobAttributes")
      .then((res) => {
        setJobTypeData(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (toggleHeadings >= 3) {
      setFilter(false);
    }
  }, [toggleHeadings]);


  const inputData = [
    // {
    //   title: "Sort by",
    //   img: "/images/jobs/arw.png",
    //   child: ["Recommended", "Relevant", "Recently Posted"],
    // },
    {
      title: "Job Type",
      img: "/images/jobs/arw.png",
      child: jobtypeData?.jobTypes || [],
    },
    {
      title: "Date Posted",
      img: "/images/jobs/arw.png",
      child: ["Anytime", "Past Month", "Past Week", "Past 24 hrs"],
    },
    {
      title: "Industry",
      img: "/images/jobs/arw.png",
      child: jobtypeData?.industryTypes || [],
    },
    {
      title: "Salary",
      img: "/images/jobs/arw.png",
      child: Array.isArray(jobtypeData?.salaries)
        ? jobtypeData.salaries.map(salary => ({
          label: `${salary.minSalary} - ${salary.maxSalary}`,
          value: salary,
        }))
        : [],
    },
    {
      title: "Experience",
      img: "/images/jobs/arw.png",
      child: jobtypeData?.experiences || [],
    },
    {
      title: "Education",
      img: "/images/jobs/arw.png",
      child: jobtypeData?.educations || [],
    },
    {
      title: "Job Mode",
      img: "/images/jobs/arw.png",
      child: jobtypeData?.jobModes || [],
    },
  ];

  const filteredInputData = inputData.filter(item =>
    item.child && item.child.length > 0 && item.child.some(childItem =>
      typeof childItem === 'string' ? childItem.trim() !== '' : childItem
    )
  );


  // useEffect(() => {

  //   setFilter(false);

  // }, [isViewportBelow851]);

  const taskRef = useRef(null);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setMobileFilter(false);
      setOpenDropdown(false)
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const numberOfDivs = 5;

  const [status, setStatus] = React.useState(false);



  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
        if (token) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
    }
}, []);

  useEffect(() => {
    if (isLogin) {
      axios
        .get("http://localhost:2000/api/resume/skills/" + userDataGlobal?._id)
        .then((res) => {
          const data = res.data.data;
          const skillsSet = new Set();
          if (data) {
            data.forEach((item) => {
              item.skills.forEach((skillObj) => {
                skillsSet.add(skillObj.skill);
              });
            });

            setUserSkills(Array.from(skillsSet));
          }
        })
        .catch((err) => console.error("err", err));
    }
  }, [userDataGlobal, recall]);

  const getAllData = async () => {

    try {
      const res = await axios.post(
        "http://localhost:2000/api/job/getAll",
        {
          requiredSkills: (jobTitle || location) ? [] : userSkills?.map((item) => item),
          jobTitle: jobTitle || "",
          country: location || country,
        },
        {
          params: { page },
        }
      );

      dispatch(setJob(res.data));
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  useEffect(() => {
    getAllData();
  }, [userSkills]);

  const getData = () => {
    axios
      .get(`http://localhost:2000/api/job/getAppliedJobs/${userDataGlobal._id}`)
      .then((res) => setAppliedJobs(res.data))
      .catch((err) => console.error(err));

  }
  useEffect(() => {
    if (userDataGlobal._id) {
      getData();
    }
  }, [userDataGlobal]);


  // const getJobData = () => {
  //   if (userSkills) {
  //     // console.log("globalskills", userDataGlobal.skills)
  //     axios
  //       .post("http://localhost:2000/api/job/getAll", {
  //         requiredSkills: userSkills?.map((item) => item),
  //       })
  //       .then((res) => {
  //         console.log(11, res.data);

  //         dispatch(setJob(res.data));
  //       })
  //       .catch((err) => {
  //         console.log(11, err);
  //       });
  //   } else {
  //   }
  // };

  const headings = [
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g mask="url(#mask0_5716_131089)">
            <path
              d="M3 22C2.45 22 1.97917 21.8042 1.5875 21.4125C1.19583 21.0208 1 20.55 1 20V9H3V20H20V22H3ZM7 18C6.45 18 5.97917 17.8042 5.5875 17.4125C5.19583 17.0208 5 16.55 5 16V5H10V3C10 2.45 10.1958 1.97917 10.5875 1.5875C10.9792 1.19583 11.45 1 12 1H16C16.55 1 17.0208 1.19583 17.4125 1.5875C17.8042 1.97917 18 2.45 18 3V5H23V16C23 16.55 22.8042 17.0208 22.4125 17.4125C22.0208 17.8042 21.55 18 21 18H7ZM12 5H16V3H12V5Z"
              fill={toggleHeadings === 0 ? "#FFF" : " #333"}
            />
          </g>
        </svg>
      ),
      title: "All Jobs",
    },
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_5716_131110)">
            <path
              d="M19.3486 13.2906C20.3484 13.2906 21.293 13.5339 22.125 13.9651V10.3042L14.595 12.272C14.5481 12.4998 14.4764 12.7183 14.3827 12.9245C13.8909 14.0092 12.7973 14.7658 11.5312 14.7658C10.0238 14.7658 8.76188 13.6937 8.4675 12.272L0.9375 10.3042V17.7944C0.9375 19.1486 2.03906 20.2501 3.39328 20.2501H13.3575C13.3134 19.9562 13.2905 19.6548 13.2905 19.3487C13.2905 16.0084 16.0083 13.2906 19.3486 13.2906Z"
              fill={toggleHeadings === 1 ? "#FFF" : " #333"}
            />
            <path
              d="M8.40234 9.33984C8.40234 8.24813 9.29109 7.35938 10.3828 7.35938H12.6797C13.7714 7.35938 14.6602 8.24813 14.6602 9.33984V10.8014L22.537 8.74266C22.8464 8.66203 23.0625 8.38219 23.0625 8.0625V3.51562C23.0625 3.1275 22.7475 2.8125 22.3594 2.8125H16.2656V2.29781C16.2656 1.03078 15.2348 0 13.9678 0H9.09469C7.82766 0 6.79688 1.03078 6.79688 2.29781V2.8125H0.703125C0.315 2.8125 0 3.1275 0 3.51562V8.0625C0 8.38219 0.216094 8.66203 0.525469 8.74266L8.40234 10.8014V9.33984ZM8.20312 2.29781C8.20312 1.80609 8.60297 1.40625 9.09469 1.40625H13.9678C14.4595 1.40625 14.8594 1.80609 14.8594 2.29781V2.8125H8.20312V2.29781Z"
              fill={toggleHeadings === 1 ? "#FFF" : " #333"}
            />
            <path
              d="M10.3828 8.76562C10.0658 8.76562 9.80859 9.02288 9.80859 9.3398V11.6365C9.80859 12.5862 10.5814 13.359 11.5311 13.359C12.4808 13.359 13.2536 12.5862 13.2536 11.6365V9.3398C13.2536 9.02288 12.9964 8.76562 12.6795 8.76562H10.3828Z"
              fill={toggleHeadings === 1 ? "#FFF" : " #333"}
            />
            <path
              d="M19.3491 14.6968C16.7841 14.6968 14.6973 16.7837 14.6973 19.3487C14.6973 21.9137 16.7841 24.0001 19.3491 24.0001C21.9141 24.0001 24.0005 21.9137 24.0005 19.3487C24.0005 16.7837 21.9141 14.6968 19.3491 14.6968ZM21.3905 18.9324L19.5648 20.7582C19.2973 21.0298 18.8421 21.0346 18.5701 20.7582L17.3082 19.4958C17.0335 19.2216 17.0335 18.7763 17.3082 18.5016C17.5824 18.2269 18.0277 18.2269 18.3024 18.5016L19.0674 19.2666L20.3959 17.9382C20.6705 17.6635 21.1159 17.6635 21.3905 17.9382C21.6648 18.2129 21.6648 18.6582 21.3905 18.9324Z"
              fill={toggleHeadings === 1 ? "#FFF" : " #333"}
            />
          </g>
          <defs>
            <clipPath id="clip0_5716_131110">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Applied Jobs",
    },
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M13.9322 0.714355H2.70242C1.60925 0.714355 0.714844 1.60877 0.714844 2.70193V20.0435C0.714844 20.5156 0.988136 20.9628 1.4105 21.1616C1.8577 21.3603 2.3546 21.3106 2.72727 21.0125L2.75211 20.9876L8.31733 16.292L13.8825 20.9876L13.9074 21.0125C14.131 21.1864 14.4043 21.2858 14.6776 21.2858C14.8515 21.2858 15.0502 21.2361 15.2242 21.1367C15.6465 20.938 15.9198 20.4908 15.9198 20.0187V2.70193C15.9198 1.60877 15.0254 0.714355 13.9322 0.714355Z"
            fill={toggleHeadings === 2 ? "#FFF" : " #333"}
          />
        </svg>
      ),
      title: "Saved Jobs",
    },
    {
      /**
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_5716_131095)">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02165 11.0703L6.64046 11.0702C6.96564 10.7395 7.32118 10.4389 7.70251 10.1726C7.18473 8.81671 5.87204 7.85362 4.33426 7.85362C2.57087 7.85362 1.10335 9.11999 0.791214 10.7929C0.764167 10.9379 0.874182 11.0703 1.02165 11.0703ZM12.0006 9.57281C15.7182 9.57281 18.7682 12.5827 18.7682 16.3404C18.7682 20.0781 15.7382 23.1081 12.0006 23.1081C8.26295 23.1081 5.23295 20.0781 5.23295 16.3404C5.2329 12.5827 8.28292 9.57281 12.0006 9.57281ZM11.3019 17.6445C10.0605 17.598 8.87729 17.426 8.11576 17.1274V19.1222C8.11576 19.4656 8.39668 19.7465 8.74004 19.7465H15.2611C15.6045 19.7465 15.8853 19.4656 15.8853 19.1222V17.127C15.1254 17.4242 13.9419 17.5969 12.6994 17.6441C12.5687 17.897 12.3048 18.0699 12.0006 18.0699C11.6964 18.0699 11.4327 17.8972 11.3019 17.6445ZM12.6839 16.895C14.0755 16.8444 15.3556 16.639 15.9225 16.2804C16.1251 16.1509 16.2655 15.8366 16.2655 15.5997V14.0779C16.2655 13.9017 16.1218 13.758 15.9457 13.758H13.8732V13.0242C13.8732 12.4868 13.4349 12.0484 12.8974 12.0484H11.1038C10.5664 12.0484 10.128 12.4868 10.128 13.0242V13.758H8.05548C7.87932 13.758 7.73565 13.9017 7.73565 14.0779V15.5997C7.73565 15.8368 7.87604 16.1507 8.07868 16.2804C8.64868 16.641 9.92776 16.8455 11.3171 16.8954C11.4521 16.6582 11.707 16.4977 12.0006 16.4977C12.294 16.4977 12.5488 16.6581 12.6839 16.895ZM13.1232 13.758V13.0242C13.1232 12.9007 13.0209 12.7984 12.8974 12.7984H11.1038C10.9804 12.7984 10.878 12.9007 10.878 13.0242V13.758H13.1232ZM4.33426 3.90173C5.34076 3.90173 6.15671 4.71768 6.15671 5.72418C6.15671 6.73068 5.34076 7.54663 4.33426 7.54663C3.32776 7.54663 2.51181 6.73068 2.51181 5.72418C2.51185 4.71763 3.32781 3.90173 4.33426 3.90173ZM12.0006 0.891602C13.0071 0.891602 13.823 1.70755 13.823 2.71405C13.823 3.72055 13.0071 4.53651 12.0006 4.53651C10.9941 4.53651 10.1781 3.72055 10.1781 2.71405C10.1781 1.70755 10.9941 0.891602 12.0006 0.891602ZM19.6669 3.90173C20.6734 3.90173 21.4893 4.71768 21.4893 5.72418C21.4893 6.73068 20.6734 7.54663 19.6669 7.54663C18.6604 7.54663 17.8444 6.73068 17.8444 5.72418C17.8445 4.71763 18.6604 3.90173 19.6669 3.90173ZM17.3607 11.0703L22.9795 11.0702C23.127 11.0702 23.237 10.9378 23.2099 10.7929C22.8978 9.11999 21.4303 7.85362 19.6669 7.85362C18.1291 7.85362 16.8164 8.81671 16.2986 10.1726C16.68 10.439 17.0355 10.7396 17.3607 11.0703ZM8.68796 8.06019L15.3132 8.06015C15.4606 8.06015 15.5707 7.92777 15.5436 7.78279C15.2315 6.10991 13.764 4.84354 12.0006 4.84354C10.2372 4.84354 8.76967 6.10991 8.45752 7.78279C8.43048 7.92777 8.54049 8.06019 8.68796 8.06019Z"
              fill={toggleHeadings === 1 ? "#FFF" : " #333"}
            />
          </g>
          <defs>
            <clipPath id="clip0_5716_131095">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "Internal Jobs",
    },
    {
      img: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g clip-path="url(#clip0_5716_131100)">
            <path
              d="M1.60078 19.1999H9.60078V14.7999H9.20078C8.77643 14.7999 8.36947 14.6314 8.06941 14.3313C7.76935 14.0313 7.60078 13.6243 7.60078 13.1999V11.1999H1.60078C1.31908 11.1983 1.04292 11.1215 0.800781 10.9775V18.3999C0.800781 18.6121 0.885067 18.8156 1.0351 18.9656C1.18512 19.1157 1.38861 19.1999 1.60078 19.1999Z"
              fill={toggleHeadings === 2 ? "#FFF" : " #333"}
            />
            <path
              d="M9.60039 14.0002V11.6002C9.60026 11.4659 9.61366 11.3318 9.64039 11.2002H8.40039V13.2002C8.40039 13.4124 8.48468 13.6159 8.63471 13.7659C8.78473 13.9159 8.98822 14.0002 9.20039 14.0002H9.60039Z"
              fill={toggleHeadings === 2 ? "#FFF" : " #333"}
            />
            <path
              d="M11.6008 9.5999H20.8008V5.1999C20.8008 4.98773 20.7165 4.78425 20.5665 4.63422C20.4164 4.48419 20.213 4.3999 20.0008 4.3999H1.60078C1.38861 4.3999 1.18512 4.48419 1.0351 4.63422C0.885067 4.78425 0.800781 4.98773 0.800781 5.1999V9.5999C0.800781 9.81208 0.885067 10.0156 1.0351 10.1656C1.18512 10.3156 1.38861 10.3999 1.60078 10.3999H10.0112C10.1959 10.1524 10.4357 9.95125 10.7116 9.8124C10.9875 9.67355 11.2919 9.6008 11.6008 9.5999Z"
              fill={toggleHeadings === 2 ? "#FFF" : " #333"}
            />
            <path
              d="M14.8008 3.5998V2.3998C14.8008 1.97546 14.6322 1.56849 14.3322 1.26843C14.0321 0.968376 13.6251 0.799805 13.2008 0.799805H8.40078C7.97643 0.799805 7.56947 0.968376 7.26941 1.26843C6.96935 1.56849 6.80078 1.97546 6.80078 2.3998V3.5998H7.60078V2.3998C7.60078 2.18763 7.68507 1.98415 7.8351 1.83412C7.98513 1.68409 8.18861 1.5998 8.40078 1.5998H13.2008C13.413 1.5998 13.6164 1.68409 13.7665 1.83412C13.9165 1.98415 14.0008 2.18763 14.0008 2.3998V3.5998H14.8008Z"
              fill={toggleHeadings === 2 ? "#FFF" : " #333"}
            />
            <path
              d="M19.1938 14.5202C19.1232 14.458 19.0358 14.4179 18.9426 14.405C18.8493 14.392 18.7544 14.4068 18.6694 14.4474C18.59 14.4816 18.5222 14.538 18.4742 14.6099C18.4262 14.6819 18.4001 14.7661 18.399 14.8526V15.6002C18.399 15.7063 18.3569 15.808 18.2819 15.883C18.2069 15.958 18.1051 16.0002 17.999 16.0002H16.799C15.8156 16.0044 14.8609 16.3322 14.0822 16.9328C13.3035 17.5335 12.7441 18.3737 12.4902 19.3238C12.6973 19.1579 12.9133 19.0037 13.1374 18.8618C14.6046 17.9865 16.2914 17.5488 17.999 17.6002C18.1051 17.6002 18.2069 17.6423 18.2819 17.7173C18.3569 17.7924 18.399 17.8941 18.399 18.0002V18.7482C18.3999 18.8346 18.4258 18.9189 18.4735 18.9909C18.5213 19.0629 18.589 19.1194 18.6682 19.1538C18.7532 19.1941 18.8482 19.2087 18.9414 19.196C19.0346 19.1832 19.122 19.1435 19.193 19.0818L21.4442 17.1346C21.4927 17.0933 21.5316 17.042 21.5582 16.9842C21.5849 16.9263 21.5987 16.8634 21.5987 16.7998C21.5987 16.7361 21.5849 16.6732 21.5582 16.6154C21.5316 16.5576 21.4927 16.5063 21.4442 16.465L19.1938 14.5202Z"
              fill={toggleHeadings === 2 ? "#FFF" : " #333"}
            />
            <path
              d="M23.2004 11.5999C23.2004 11.2816 23.074 10.9764 22.8489 10.7514C22.6239 10.5263 22.3187 10.3999 22.0004 10.3999H11.6004C11.2821 10.3999 10.9769 10.5263 10.7519 10.7514C10.5268 10.9764 10.4004 11.2816 10.4004 11.5999V21.9999C10.4004 22.3182 10.5268 22.6234 10.7519 22.8484C10.9769 23.0735 11.2821 23.1999 11.6004 23.1999H22.0004C22.3187 23.1999 22.6239 23.0735 22.8489 22.8484C23.074 22.6234 23.2004 22.3182 23.2004 21.9999V11.5999ZM21.9732 17.7367L21.9712 17.7387L19.7204 19.6863C19.534 19.8493 19.3042 19.9545 19.059 19.9891C18.8138 20.0237 18.5638 19.9862 18.3396 19.8811C18.1196 19.7845 17.9325 19.6258 17.8012 19.4246C17.67 19.2233 17.6002 18.9882 17.6004 18.7479V18.4071C16.1786 18.4178 14.7855 18.8082 13.5652 19.5379C13.2463 19.7384 12.947 19.9685 12.6712 20.2251C12.5555 20.3367 12.4012 20.3993 12.2404 20.3999C12.1483 20.3993 12.0574 20.379 11.9738 20.3403C11.8903 20.3016 11.816 20.2454 11.756 20.1755C11.696 20.1056 11.6517 20.0237 11.6261 19.9352C11.6005 19.8468 11.5942 19.7538 11.6076 19.6627C11.8008 18.4227 12.4298 17.2923 13.3816 16.4743C14.3333 15.6564 15.5455 15.2045 16.8004 15.1999H17.6004V14.8523C17.6003 14.6124 17.67 14.3776 17.801 14.1765C17.9319 13.9755 18.1185 13.8168 18.338 13.7199C18.5622 13.6149 18.8122 13.5774 19.0574 13.612C19.3026 13.6467 19.5324 13.752 19.7188 13.9151L21.9712 15.8623C22.1059 15.9786 22.214 16.1224 22.2881 16.2842C22.3623 16.4459 22.4008 16.6217 22.4009 16.7996C22.4011 16.9776 22.363 17.1535 22.2892 17.3153C22.2154 17.4772 22.1076 17.6214 21.9732 17.7379V17.7367Z"
              fill={toggleHeadings === 2 ? "#FFF" : " #333"}
            />
          </g>
          <defs>
            <clipPath id="clip0_5716_131100">
              <rect width="24" height="24" fill="white" />
            </clipPath>
          </defs>
        </svg>
      ),
      title: "External Jobs",
    },

    */
    },
  ];
  // useEffect(() => {
  //   if (jobData.length > 0) {
  //     setSelectedJob(jobData[0]);
  //   }
  // }, [jobData]);


  const handleDropdownClick = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleCheckboxChange = (e, filterType, value) => {
    if (e === null) {

      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [],
      }));
      setClear(!clear);
    } else {
      const isChecked = e.target.checked;
      setFilters((prevFilters) => {
        const currentFilter = Array.isArray(prevFilters[filterType])
          ? prevFilters[filterType]
          : [];

        return {
          ...prevFilters,
          [filterType]: isChecked
            ? [...currentFilter, value]
            : currentFilter.filter((item) => item !== value),
        };
      });
    }
  };

  const getFilterData = async () => {

    const mappedFilters = {
      sortBy: filters.SortBy,
      jobType: filters.JobType,
      datePosted: filters.DatePosted,
      industryType: filters.Industry,
      salaries: filters.Salary,
      experience: filters.Experience,
      education: filters.Education,
      industryType: filters.IndustryType,
      jobMode: filters.JobMode,
    };

    try {
      if (country) {
        const response = await axios.post(
          "http://localhost:2000/api/job/getFilterData",
          {
            requiredSkills: userSkills?.map((item) => item),
            country,
            ...mappedFilters,
          },
          {
            params: { page },
          }
        );

        dispatch(setJob(response.data.data));
        setMobileFilter(false);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error fetching filter data", error);
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   getFilterData()
  // }, [clear]);

  return (
    <>
      {limitPopup &&
        <div className='z-[200000]'>

          <LimitUsedModal visible={limitPopup} setVisible={setLimitPopup} />
        </div>
      }

      <div className="relative ">
        <div
          className={` ${isViewportBelow850 ? " sticky top-[2.5rem]" : " sticky top-[56.8px]"
            } z-50`}
        >

          <div className="bg-[#E0F6FF] px-4 ">
            <div className="flex justify-center items-center py-[10px] sm:py-[15px]">
              <div className="flex sm:flex-row flex-col justify-between sm:items-center  gap-2 items-start sm:py-[8px] sm:px-[10px] scr540:px-[24px] rounded-[8px] sm:bg-white w-[50%] scr540:min-w-[530px] ms:min-w-[570px] sm:min-w-[470px] min-w-[100%]">
                <div className="flex flex-row gap-[12px] sm:gap-[16.82px] items-center bg-white sm:w-[45%] w-full rounded-[8px] p-2 sm-p-0">
                  <svg
                    className="w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] min-w-[28px]  "
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.25 23.25L28.5 28.5L23.25 23.25ZM7.5 16.5C7.5 17.6819 7.73279 18.8522 8.18508 19.9441C8.63738 21.0361 9.30031 22.0282 10.136 22.864C10.9718 23.6997 11.9639 24.3626 13.0558 24.8149C14.1478 25.2672 15.3181 25.5 16.5 25.5C17.6819 25.5 18.8522 25.2672 19.9441 24.8149C21.0361 24.3626 22.0282 23.6997 22.864 22.864C23.6997 22.0282 24.3626 21.0361 24.8149 19.9441C25.2672 18.8522 25.5 17.6819 25.5 16.5C25.5 14.1131 24.5518 11.8239 22.864 10.136C21.1761 8.44821 18.8869 7.5 16.5 7.5C14.1131 7.5 11.8239 8.44821 10.136 10.136C8.44821 11.8239 7.5 14.1131 7.5 16.5V16.5Z"
                      stroke="#333333"
                      strokeWidth="3.1544"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <input
                    type="text"
                    placeholder="Job title"
                    className="text-[14px] sm:text-[16px] font-[400] font-Montserrat w-full min-w-[80px]"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                  <svg
                    onClick={getAllData}
                    className="w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] sm:hidden block  min-w-[28px] cursor-pointer"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.25 23.25L28.5 28.5L23.25 23.25ZM7.5 16.5C7.5 17.6819 7.73279 18.8522 8.18508 19.9441C8.63738 21.0361 9.30031 22.0282 10.136 22.864C10.9718 23.6997 11.9639 24.3626 13.0558 24.8149C14.1478 25.2672 15.3181 25.5 16.5 25.5C17.6819 25.5 18.8522 25.2672 19.9441 24.8149C21.0361 24.3626 22.0282 23.6997 22.864 22.864C23.6997 22.0282 24.3626 21.0361 24.8149 19.9441C25.2672 18.8522 25.5 17.6819 25.5 16.5C25.5 14.1131 24.5518 11.8239 22.864 10.136C21.1761 8.44821 18.8869 7.5 16.5 7.5C14.1131 7.5 11.8239 8.44821 10.136 10.136C8.44821 11.8239 7.5 14.1131 7.5 16.5V16.5Z"
                      stroke="#333333"
                      strokeWidth="3.1544"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {/* <div className="hidden sm:block w-[42.06px] h-0 border-t-[3.15px] border-solid border-[#E0E0E0] rotate-90"></div> */}

                <div className="flex flex-row justify-between items-center gap-[12px] sm:gap-[16px] bg-white sm:w-[55%] w-full  rounded-[8px] p-2 sm:p-0">
                  <div className=" bg-[#E0E0E0] min-w-[3px] h-[40px] sm:block hidden"></div>
                  <div className="flex flex-row gap-[12px] sm:gap-[16.82px]  items-center">
                    <svg
                      className="w-[24px] h-[24px] sm:w-[31px] sm:h-[30px]  min-w-[24px]"
                      viewBox="0 0 31 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.5879 12.5C25.5879 18.0225 15.5879 27.5 15.5879 27.5C15.5879 27.5 5.58789 18.0225 5.58789 12.5C5.58789 9.84784 6.64146 7.3043 8.51682 5.42893C10.3922 3.55357 12.9357 2.5 15.5879 2.5C18.2401 2.5 20.7836 3.55357 22.659 5.42893C24.5343 7.3043 25.5879 9.84784 25.5879 12.5V12.5Z"
                        stroke="#333333"
                        strokeWidth="3.1544"
                      />
                      <path
                        d="M15.5879 13.75C15.9194 13.75 16.2374 13.6183 16.4718 13.3839C16.7062 13.1495 16.8379 12.8315 16.8379 12.5C16.8379 12.1685 16.7062 11.8505 16.4718 11.6161C16.2374 11.3817 15.9194 11.25 15.5879 11.25C15.2564 11.25 14.9384 11.3817 14.704 11.6161C14.4696 11.8505 14.3379 12.1685 14.3379 12.5C14.3379 12.8315 14.4696 13.1495 14.704 13.3839C14.9384 13.6183 15.2564 13.75 15.5879 13.75Z"
                        fill="white"
                        stroke="#333333"
                        strokeWidth="3.1544"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>

                    <input
                      type="text"
                      placeholder="Location"
                      className="text-[14px] sm:text-[16px] font-[400] w-full font-Montserrat min-w-[80px]"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <svg
                    onClick={getAllData}
                    className="w-[28px] h-[28px] sm:w-[36px] sm:h-[36px] sm:hidden block cursor-pointer "
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M23.25 23.25L28.5 28.5L23.25 23.25ZM7.5 16.5C7.5 17.6819 7.73279 18.8522 8.18508 19.9441C8.63738 21.0361 9.30031 22.0282 10.136 22.864C10.9718 23.6997 11.9639 24.3626 13.0558 24.8149C14.1478 25.2672 15.3181 25.5 16.5 25.5C17.6819 25.5 18.8522 25.2672 19.9441 24.8149C21.0361 24.3626 22.0282 23.6997 22.864 22.864C23.6997 22.0282 24.3626 21.0361 24.8149 19.9441C25.2672 18.8522 25.5 17.6819 25.5 16.5C25.5 14.1131 24.5518 11.8239 22.864 10.136C21.1761 8.44821 18.8869 7.5 16.5 7.5C14.1131 7.5 11.8239 8.44821 10.136 10.136C8.44821 11.8239 7.5 14.1131 7.5 16.5V16.5Z"
                      stroke="#333333"
                      strokeWidth="3.1544"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <button
                    onClick={getAllData}
                    className="border border-blue bg-blue text-black  py-[8px] px-[20px] scr540:py-[12px] scr540:px-[36px] gap-0 rounded-[12px] border-opacity-0 sm:block hidden"
                  >
                    <p className="text-[14px] scr540:text-[16px] font-[600] text-white font-Montserrat">
                      Search
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: "#BCECFF", overflowX: "auto" }}>
            <div className=" customMargins overflow-x-auto  ">
              <div
                className={`flex items-start lg:gap-4 gap-3 py-3 overflow-x-auto `}
              >
                {headings.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-2 py-2 lg:px-4 px-2 items-center min-w-[165px]  ${toggleHeadings === index && "bg-[#06A9EF] rounded-[6px]"
                      }`}
                  >
                    {item.img}
                    <p
                      className={`text-[16px] text-black font-semibold cursor-pointer  ${toggleHeadings === index && " text-white"
                        }`}
                      onClick={() => {
                        forceUpdate();
                        setToggleHeadings(index);
                        setSelectedJob()
                      }}
                    >
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {toggleHeadings <= 2 && (
            <div style={{ backgroundColor: "#E0F6FF" }} className="">
              <div className="customMargins web">
                <div className="flex items-center py-5  gap-3 flex-wrap ">
                  {filteredInputData.map((item, index) => (
                    <InputBox

                      key={index}
                      item={item}
                      filterType={item.title.replace(/ /g, "")}
                      setClear={setClear}
                      clear={clear}
                      onChange={handleCheckboxChange}
                      country={country}
                      page={page}
                      filters={filters}
                      userSkills={userSkills}
                      setLoading={setLoading}
                      className="text-[14px] font-medium flex items-center w-auto"
                      isOpen={openDropdown === index}
                      onDropdownClick={handleDropdownClick}
                      id={index}
                    />
                  ))}
                  <button onClick={() => { setFilters({}); setClear(!clear) }} className="text-primary font-montserrat text-sm font-medium text-blue">
                    Reset all
                  </button>
                  {/* <button
                  onClick={() => setFilter(!filter)}
                  className="px-4 py-3  rounded-[6px] bg-[#FFF] "
                >
                  <img
                    className="h-[24px] w-[24px]"
                    src="/images/jobs/fil.png"
                    alt=""
                  />
                </button> */}
                </div>
              </div>

              <div
                onClick={() => setMobileFilter(!mobileFilter)}
                className="p-2 mobile "
              >
                <button className="px-4 py-3  rounded-[6px] bg-[#FFF]   flex gap-2">
                  <img
                    className="h-[24px] w-[24px]"
                    src="/images/jobs/fil.png"
                    alt=""
                  />
                  Filter
                </button>
              </div>
            </div>
          )}
          {/* {toggleHeadings === 2 &&
          <div style={{ backgroundColor: "#f9f9f9" }}>
            <div className=" customMargins  ">
              <div className="inline-flex pt-6 justify-center items-center gap-2">
                {btns.map((item) => (
                  <button className="rounded-full border border-blue bg-white">
                    <p className="font-medium text-[14px] text-black py-2 px-4">
                      {item}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        } */}
        </div>

        <div className="bg-[#F9F9F9] min-h-[calc(100vh-303px)]">
          <div className=" customMargins">
            <div className="grid grid-cols-12 py-[16px] gap-[24px] relative  ">
              {/* <div className=" mobile600 col-span-12 ">
              <ApplicationStatus />
            </div> */}
              {/* 
            {filter ? (
              <AnimatePresence>
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ duration: 0.5 }}
                  ref={taskRef}
                  className={`web ${
                    isViewportBelow1024 ? "col-span-4" : "col-span-3"
                  } mt-4`}
                >
                  <Filter
                    setFilters={setFilters}
                    jobtypeData={jobtypeData}
                    handleCheckboxChange={handleCheckboxChange}
                    country={country}
                    page={page}
                    filters={filters}
                    userSkills={userSkills}
                    setLoading={setLoading}
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div
                className={`${
                  isViewportBelow1024 ? "col-span-4" : "col-span-3"
                } web600 ml:mt-4`}
              >
                <ApplicationStatus />
              </div>
            )} */}

              <AnimatePresence>
                {mobileFilter && (
                  <>
                    <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-40"></div>

                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={{ x: 0 }}
                      exit={{ x: "-100%" }}
                      transition={{ duration: 0.5 }}
                      ref={taskRef}
                      className="fixed z-[2000]  rounded-[8px] h-[calc(95vh-283px)] overflow-y-auto"
                      style={{
                        background: "white",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div className="flex justify-between  p-4 bg-white shadow-md  items-center rounded-t-[8px] mb-4 ">
                        <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                          All Filters
                        </p>

                        <button onClick={() => { setFilters({}); setClear(!clear) }} className="text-primary font-montserrat text-sm font-medium text-blue">
                          Reset all
                        </button>
                        <button
                          className="rounded-[8px] border border-blue bg-blue w-[30%] text-black py-[8px]"
                          onClick={getFilterData}
                        >
                          <p className="text-[12px] font-[700] text-white">Apply</p>
                        </button>
                      </div>

                      {filteredInputData.map((item, index) => (
                        <Filter

                          key={index}
                          item={item}
                          filterType={item.title.replace(/ /g, "")}
                          setClear={setClear}
                          clear={clear}
                          onChange={handleCheckboxChange}
                          country={country}
                          page={page}
                          filters={filters}
                          userSkills={userSkills}
                          setLoading={setLoading}
                          className="text-[14px] font-medium flex items-center w-auto bg-white"
                          isOpen={openDropdown === index}
                          onDropdownClick={handleDropdownClick}
                          id={index}
                        />
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              {!loading ?
                <>
                  {(toggleHeadings === 0 && (
                    <>
                      {jobData.length > 0 ?
                        <>
                          {!isDescription && (
                            <div
                              onClick={() => setIsDescription(true)}
                              className={`mobile1024 ml:mt-4  ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                                }`}
                            >
                              <AllJobs
                                selectedJob={selectedJob}
                                setIsDescription={setIsDescription}
                                setSelectedJob={setSelectedJob}
                                savedJobList={savedJobList}
                                setSavedJobList={setSavedJobList}
                                setCurrentPage={setPage}
                              />
                            </div>
                          )}

                          <div
                            className={`web1024 min-h-[calc(100vh-301.66px)]  ${filter ? "col-span-5" : "col-span-5"
                              } ml:mt-4`}
                          >
                            <AllJobs
                              selectedJob={selectedJob}
                              setIsDescription={setIsDescription}
                              setSelectedJob={setSelectedJob}
                              savedJobList={savedJobList}
                              setSavedJobList={setSavedJobList}
                              setCurrentPage={setPage}
                            />
                          </div>

                          <div
                            className={`web1024   ${filter ? "col-span-7" : "col-span-7"
                              } ml:mt-4 sticky top-[335px] h-[calc(95vh-335px)] overflow-y-auto p-1`}
                          >
                            <Description selectedJob={selectedJob} setLimitPopup={setLimitPopup}/>
                          </div>


                          {isDescription && (
                            <div
                              className={`mobile1024 ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                                } flex flex-col gap-3 ml:mt-4 `}
                            >
                              <div
                                onClick={() => setIsDescription(false)}
                                className="flex gap-3"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_5925_96419)">
                                    <path
                                      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                Back
                              </div>

                              <Description selectedJob={selectedJob}  setLimitPopup={setLimitPopup}/>
                            </div>
                          )}
                        </>
                        :
                        <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
                          <NoJobs name={""} />
                        </div>

                      }
                    </>
                  ))}

                  {toggleHeadings === 1 && (

                    <>
                      {appliedJobs?.length > 0 ?
                        <>
                          {!isDescription && (
                            <div
                              // onClick={() => setIsDescription(true)}
                              className={`mobile1024 ml:mt-4  ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                                }`}
                            >
                              <AppliedJobs
                                selectedJob={selectedJob}
                                setIsDescription={setIsDescription}
                                setSelectedJob={setSelectedJob}
                                savedJobList={savedJobList}
                                setSavedJobList={setSavedJobList}
                                setCurrentPage={setPage}
                                appliedJobs={appliedJobs}
                                setAppliedJobs={setAppliedJobs}
                              />
                            </div>
                          )}

                          <div
                            className={`web1024  ${filter ? "col-span-5" : "col-span-5"
                              } ml:mt-4`}
                          >
                            <AppliedJobs
                              selectedJob={selectedJob}
                              setIsDescription={setIsDescription}
                              setSelectedJob={setSelectedJob}
                              savedJobList={savedJobList}
                              setSavedJobList={setSavedJobList}
                              setCurrentPage={setPage}
                              appliedJobs={appliedJobs}
                              setAppliedJobs={setAppliedJobs}
                            />
                          </div>

                          <div
                            className={`web1024   ${filter ? "col-span-7" : "col-span-7"
                              } ml:mt-4 sticky top-[335px] h-[calc(95vh-335px)] overflow-y-auto p-1`}
                          >
                            <Description selectedJob={selectedJob}  setLimitPopup={setLimitPopup}/>
                          </div>


                          {isDescription && (
                            <div
                              className={`mobile1024 ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                                } flex flex-col gap-3 ml:mt-4 `}
                            >
                              <div
                                onClick={() => setIsDescription(false)}
                                className="flex gap-3"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_5925_96419)">
                                    <path
                                      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                Back
                              </div>

                              <Description selectedJob={selectedJob}  setLimitPopup={setLimitPopup}/>
                            </div>
                          )}
                        </>
                        :
                        <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
                          <NoJobs name={"Applied"} />
                        </div>


                      }
                    </>

                  )}

                  {toggleHeadings === 2 && (
                    <>


                      {savedJobList?.length > 0 ?
                        <>
                          {!isDescription && (
                            <div
                              onClick={() => setIsDescription(true)}
                              className={`mobile1024 ml:mt-4  ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                                }`}
                            >
                              <SavedJobs
                                selectedJob={selectedJob}
                                setIsDescription={setIsDescription}
                                setSelectedJob={setSelectedJob}
                                savedJobList={savedJobList}
                                setSavedJobList={setSavedJobList}
                                setCurrentPage={setPage}
                              />
                            </div>
                          )}

                          <div
                            className={`web1024  ${filter ? "col-span-5" : "col-span-5"
                              } ml:mt-4`}
                          >
                            <SavedJobs
                              selectedJob={selectedJob}
                              setIsDescription={setIsDescription}
                              setSelectedJob={setSelectedJob}
                              savedJobList={savedJobList}
                              setSavedJobList={setSavedJobList}
                              setCurrentPage={setPage}
                            />
                          </div>

                          <div
                            className={`web1024   ${filter ? "col-span-7" : "col-span-7"
                              } ml:mt-4 sticky top-[335px] h-[calc(95vh-335px)] overflow-y-auto p-1`}
                          >
                            <Description selectedJob={selectedJob}  setLimitPopup={setLimitPopup}/>
                          </div>
                          {/* LAST SECTION   */}

                          {isDescription && (
                            <div
                              className={`mobile1024 ${isViewportBelow600 ? "col-span-12" : "col-span-12"
                                } flex flex-col gap-3 ml:mt-4 `}
                            >
                              <div
                                onClick={() => setIsDescription(false)}
                                className="flex gap-3"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <g mask="url(#mask0_5925_96419)">
                                    <path
                                      d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
                                      fill="#333333"
                                    />
                                  </g>
                                </svg>
                                Back
                              </div>

                              <Description selectedJob={selectedJob}  setLimitPopup={setLimitPopup}/>
                            </div>
                          )}
                        </>
                        :
                        // <div className=" object-contain justify-center items-center p-12 w-[100%] flex h-full col-span-12">
                        //   <img
                        //     className="ms:w-[360px] w-[260px] ms:h-[277px] h-[210px]"
                        //     src="/images/jobs/noSaved.png"
                        //     alt=""
                        //   />
                        // </div>
                        <div className=" object-contain justify-center items-center py-12 w-[100%] flex h-full col-span-12">
                          <NoJobs name={"Saved"} />
                        </div>
                      }
                    </>
                  )}
                </>
                :
                <div className="flex justify-center items-center w-full col-span-12">
                  <MiniLoader />
                </div>
              }

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Index;
