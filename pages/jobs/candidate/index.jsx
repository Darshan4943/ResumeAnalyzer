import React, { useEffect, useReducer, useRef, useState } from "react";
import Filter from "../../../components/featured/candidate/jobs/Filter";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@react-hook/media-query";
import { useRouter } from "next/router";
import axios from "axios";
import AllJobCard from "../../../components/featured/candidate/jobs/AllJobCard";
import { AnimatePresence, motion } from "framer-motion";
import MiniLoader from "../../../components/common/miniLoader";

function Index() {
  const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
  const [filter, setFilter] = useState(false);
  const [mobileFilter, setMobileFilter] = useState(false);
  const [jobData, setJobData] = useState([]);

  const [toggleHeadings, setToggleHeadings] = useState(0);

  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { appliedJobData, savedJobIds } = useSelector(
    (state) => state.job.jobData
  );
  const [userSkills, setUserSkills] = useState();

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [clear, setClear] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingg, setLoadingg] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [country, setCountry] = useState("");

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [filters, setFilters] = useState({});
  const [appliedJobs, setAppliedJobs] = useState();
  const router = useRouter();
  const { applied } = router.query;
  const [jobtypeData, setJobTypeData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [limitPopup, setLimitPopup] = useState(false);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [isCountrySet, setIsCountrySet] = useState(false);
  const [miniLoading, setMiniloading] = useState(true);
  const { loc, jobTit, exp, search, cat } = router.query;
  const [hiddenFilters, setHiddenFilters] = useState({});
  const taskRef = useRef(null);
  const [experience, setExperience] = useState("");
  const [isFilterUsed, setIsFilterUsed] = useState(false);

  useEffect(() => {
    if (jobTit) {
      setJobTitle(jobTit);
    }
    if (loc) {
      setLocation(loc);
    }
    if (exp) {
      setExperience(exp);
    }
  }, [loc, jobTit, search]);

  useEffect(() => {
    if (profileData?.skills) {
      setUserSkills(profileData?.skills.map((item) => item.value));
    }
  }, [profileData]);

  const toggleFilterVisibility = (filterId) => {
    setHiddenFilters((prev) => ({
      ...prev,
      [filterId]: !prev[filterId],
    }));
  };

  useEffect(() => {
    if (userDataGlobal?.country) {
      setCountry(userDataGlobal?.country);
    } else {
      setCountry(localStorage.getItem("country", country));
    }
    setIsCountrySet(true);

    axios
      .get("https://jamblix.com/api/jobs/getJobAttributes")
      .then((res) => {
        setJobTypeData(res.data);
        setTimeout(() => {
          setLoadingg(false);
        }, 500);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setMobileFilter(false);
      setOpenDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleDropdownClick = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };
  const handleCheckboxChange = (e, filterType, value) => {
    setIsFilterUsed(true);
    if (e === null) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [filterType]: [],
      }));
      setClear(false);
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
  const sortedExperiences = (jobtypeData?.experiences || [])
    .filter(Boolean)
    .sort((a, b) => {
      const getYears = (str) => {
        const match = str?.match(/\d+/g);
        return match ? parseInt(match[0]) : Infinity;
      };
      return getYears(a) - getYears(b);
    });

  const sortedEducations = (jobtypeData?.educations || [])
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

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
    // {
    //   title: "Salary",
    //   img: "/images/jobs/arw.png",
    //   child: Array.isArray(jobtypeData?.salaries)
    //     ? jobtypeData.salaries
    //       .sort((a, b) => a.minSalary - b.minSalary)
    //       .map(salary => ({
    //         label: `${salary.minSalary} - ${salary.maxSalary}`,
    //         value: salary,
    //       }))
    //     : [],
    // }
    // ,
    {
      title: "Experience",
      img: "/images/jobs/arw.png",
      child: sortedExperiences || [],
    },
    {
      title: "Education",
      img: "/images/jobs/arw.png",
      child: sortedEducations || [],
    },
    {
      title: "Job Mode",
      img: "/images/jobs/arw.png",
      child: (jobtypeData?.jobModes || []).filter(
        (item) =>
          item !== "" &&
          item !== null &&
          !(typeof item === "object" && Object.keys(item || {}).length === 0)
      ),
    },
  ];

  const filteredInputData = inputData.filter(
    (item) =>
      item.child &&
      item.child.length > 0 &&
      item.child.some((childItem) =>
        typeof childItem === "string" ? childItem.trim() !== "" : childItem
      )
  );

  
  const getAllData = async () => {
    try {
      const res = await axios.post(
        "https://jamblix.com/api/job/getAll",
        {
          // requiredSkills:
          //   jobTitle || location ? [] : userSkills?.map((item) => item),
          requiredSkills:jobTitle || location ? [] : [],
          jobTitle: jobTitle.trim() || "",
          country: location ? "" : country,
          location: location.trim(),
          // experience: experience ? experience : profileData?.totalExperience?.years,
          experience: experience,
          isExperinceNo: experience ? false : true,
          jobCat: cat ? cat.trim() : "",
        },
        {
          params: { page, limit },
        }
      );

      setJobData(res.data.filteredJobs);
      setTotalCount(res.data.totalCount);
      setTotalpages(res.data.totalPages);
      setTimeout(() => {
        setLoading(false);
        setMiniloading(false);
      }, 500);
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
        setMiniloading(false);
      }, 500);
      console.error(err);
    }
  };

  useEffect(() => {
    if (isCountrySet) {
      // setMiniloading(true);
      getAllData();
    }
  }, [limit, country, search, jobtypeData]);
  useEffect(() => {
    if (isCountrySet) {
      getAllData();
    }
  }, [page]);

  const getFilterData = async () => {
    setLoading(true);
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
      const response = await axios.post(
        "https://jamblix.com/api/job/getFilterData",
        {
          // requiredSkills:
          //   jobTitle || location ? [] : userSkills?.map((item) => item),
          requiredSkills:jobTitle || location ? [] : [],
          jobTitle: jobTitle.trim() || "",
          country: location ? "" : country,
          location: location.trim(),
          // experience: experience ? experience : profileData?.totalExperience?.years,
          experience: experience,
          isExperinceNo: experience ? false : true,
          jobCat: cat ? cat.trim() : "",
          ...mappedFilters,
        },
        {
          params: { page, limit },
        }
      );

      setJobData(response.data.data);
      setTotalCount(response.data.totalCount);
      setTotalpages(response.data.totalPages);

      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error("Error fetching filter data", error);
    }
  };

  useEffect(() => {
    if (isFilterUsed) {
      getFilterData();
    }
  }, [filters]);

  return (
    <>
      {miniLoading ? (
        <div className="jobLoader customMargins">
          <div className=" flex gap-6 flex-row pt-6">

            <div className=" scr700:flex hidden gap-1 flex-col bg-white rounded-[12px]">
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="flex gap-1 flex-col  justify-center items-center">
                  <div className="h-[169px] w-[262px] bg-white rounded-[12px] p-4 flex flex-col gap-1">

                    <div className="skeleton-line h-[24px] max-w-[140px]"></div>


                    <div className="skeleton-subtitle h-[18px] min-w-[100%]"></div>
                    <div className="skeleton-subtitle h-[18px] min-w-[80%]"></div>
                    <div className="skeleton-subtitle h-[18px] min-w-[90%]"></div>
                    <div className="skeleton-subtitle h-[18px] min-w-[60%]"></div>
                    
                  </div>
                  <div className="skeleton-subtitle h-[1px] min-w-[80%] "></div>
                </div>
              ))}


            </div>
            <div className="flex gap-4 flex-col w-full">
              {[1, 2, 3, 4].map((item, index) => (
                <div key={index} className="flex gap-4 flex-col w-full">
                  <div className="h-[169px] w-full max-w-[548px] bg-white rounded-[12px] p-4 flex flex-col gap-1">
                    <div className="flex justify-between">
                      <div className="skeleton-line h-[24px] max-w-[140px]"></div>
                      {/* <div className="skeleton-img h-[36px] w-[36px] rounded-[50%]"></div> */}
                    </div>

                    <div className="skeleton-subtitle h-[20px]"></div>
                    <div className="skeleton-line h-[20px] max-w-[70%]"></div>
                    <div className="skeleton-line h-[50px] w-full"></div>
                    <div className="skeleton-line h-[20px] max-w-[140px]"></div>
                  </div>
                </div>
              ))}
            </div>


            <div className=" scr900:flex hidden gap-4 flex-col">
              <div className="skeleton-image h-[356px] w-[262px]  "></div>
              <div className="skeleton-image h-[356px] w-[262px] "></div>
            </div>

          </div>
        </div>


      ) : (
        <>
          <div className=" flex ms:flex-row flex-col-reverse gap-4 items-center customMargins">

            <div className="w-full  ms:pt-6 scr700:hidden ">
              <button
                stle={{ boxShadow: "0px 0px 14px 0px #00000005" }}
                onClick={() => setMobileFilter(true)}
                className=" px-2 py-2 flex gap-2 bg-[#FFFFFF] rounded-[6px]"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_6317_76206)">
                    <path
                      d="M10.2789 17.5V16H13.7115V17.5H10.2789ZM6.40385 12.75V11.25H17.5865V12.75H6.40385ZM3.5 7.99998V6.5H20.5V7.99998H3.5Z"
                      fill="#646464"
                    />
                  </g>
                </svg>
                Filter
              </button>
            </div>
            <div className="scr1024:gap-4  gap-1 flex ml:hidden justify-end  items-center ml:w-[117%] ms:w-[87%] md:w-[70%] w-full max-w-[643px]  pt-6 ">
              <div className="flex ms:flex-row flex-col justify-between scr1100:h-[62px] ms:h-[48px] ms:items-center  lg:gap-2 ms:gap-1 gap-2 items-start    scr1100:px-3 ms:px-2 px-4 scr1100:py-[10px] ms:py-2 py-4 border border-[#E1E3E3] ms:rounded-[30px] rounded-[12px] bg-white w-[100%]   ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="min-w-[24px] ms:block hidden"
                >
                  <g mask="url(#mask0_5959_68073)">
                    <path
                      d="M9.51955 15.6133C7.81188 15.6133 6.36571 15.0211 5.18105 13.8366C3.99655 12.6519 3.4043 11.2057 3.4043 9.49806C3.4043 7.7904 3.99655 6.34423 5.18105 5.15956C6.36571 3.97506 7.81188 3.38281 9.51955 3.38281C11.2272 3.38281 12.6734 3.97506 13.858 5.15956C15.0425 6.34423 15.6348 7.7904 15.6348 9.49806C15.6348 10.2122 15.515 10.8943 15.2753 11.5443C15.0355 12.1943 14.7155 12.7596 14.3155 13.2403L20.0695 18.9943C20.208 19.1326 20.2789 19.3066 20.282 19.5163C20.2852 19.726 20.2144 19.9032 20.0695 20.0481C19.9247 20.1929 19.749 20.2653 19.5425 20.2653C19.3362 20.2653 19.1606 20.1929 19.0158 20.0481L13.2618 14.2941C12.7618 14.7069 12.1868 15.03 11.5368 15.2633C10.8868 15.4966 10.2144 15.6133 9.51955 15.6133ZM9.51955 14.1136C10.808 14.1136 11.8994 13.6664 12.7935 12.7721C13.6879 11.8779 14.135 10.7866 14.135 9.49806C14.135 8.20956 13.6879 7.11823 12.7935 6.22406C11.8994 5.32973 10.808 4.88256 9.51955 4.88256C8.23105 4.88256 7.13971 5.32973 6.24555 6.22406C5.35121 7.11823 4.90405 8.20956 4.90405 9.49806C4.90405 10.7866 5.35121 11.8779 6.24555 12.7721C7.13971 13.6664 8.23105 14.1136 9.51955 14.1136Z"
                      fill="#333333"
                      fill-opacity="0.5"
                    />
                  </g>
                </svg>

                <input
                  type="text"
                  placeholder="Enter Skill / Designation"
                  className="scr1100:text-[14px] ms:text-[12px] scr460:text-[14px] text-[12px]  font-[500] font-Montserrat scr1100:max-w-[174px] ms:max-w-[148px] placeholder:text-[#889FBA]"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />

                <div className=" bg-[#E0E0E0] ms:w-[2px] ms:h-[22px] h-[1px] w-full"></div>
                <select
                  className={`scr1100:text-[14px] ms:text-[12px] scr460:text-[14px] text-[12px] font-[500] w-full font-Montserrat border-none outline-none appearance-none max-w-[148px] scr900:p-2 min-w-[80px] ${experience ? "text-[#333333]" : "text-[#889FBA]"
                    }`}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                >
                  <option value="" disabled className="text-[#889FBA]">
                    Select Experience
                  </option>
                  {sortedExperiences
                    .filter((exp) => exp)
                    .map((exp, index) => (
                      <option key={index} value={exp} className="text-[#333333]">
                        {exp}
                      </option>
                    ))}
                </select>

                <div className=" bg-[#E0E0E0] ms:w-[2px] ms:h-[22px] h-[1px] w-full"></div>
                <input
                  type="text"
                  placeholder="Enter Location"
                  className="scr1100:text-[14px] ms:text-[12px] scr460:text-[14px] text-[12px]   font-[500]  font-Montserrat scr1100:max-w-[105px] ms:max-w-[90px] placeholder:text-[#889FBA]"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className=" bg-[#E0E0E0]  h-[1px] w-full ms:hidden"></div>
                <div className=" flex items-center ms:justify-end justify-center scr1100:w-[102px] ms:w-[76px] w-full">
                  <button
                    onClick={() => {
                      router.push(
                        `/jobs/candidate?search=${true}&loc=${location}&exp=${experience}&jobTit=${jobTitle}`
                      );
                    }}
                    className="ms:block hidden relative z-[10] scr1100:text-[14px] text-[12px]  font-[600]  h-[38px] scr1100:w-[100px] w-[76px] px-6  bg_Button rounded-[30px]"
                  >
                    Search
                  </button>
                  <button
                    onClick={() => {
                      router.push(
                        `/jobs/candidate?search=${true}&loc=${location}&jobTit=${jobTitle}`
                      );
                    }}
                    className="ms:hidden text-[14px] font-[600] border border-blue rounded-[12px] w-full h-[36px]"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="customMargins py-6 flex gap-6 relative">
            <div
              style={{ boxShadow: "0px 0px 14px 0px #00000005",scrollbarWidth: "none"  }}
              className="bg-white w-[262px]  px-4 py-2 rounded-[8px] scr700:flex hidden flex-col gap-4  min-w-[200px] sticky top-[84px] h-[calc(100vh-60px)] overflow-y-auto  pb-6 "
            >
              <div className="flex justify-between   items-center  py-2 border-b border-[#AFAFAF80] ">
                <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                  All Filters
                </p>

                <button
                  onClick={() => {
                    setFilters({});
                    setClear(!clear);
                  }}
                  className="text-primary font-montserrat text-sm font-medium text-blue"
                >
                  Reset all
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
                  loading={loading}
                  userSkills={userSkills}
                  setLoading={setLoading}
                  className="text-[14px] font-medium flex items-center w-auto bg-white "
                  isOpen={openDropdown === index}
                  onDropdownClick={handleDropdownClick}
                  id={index}
                  isHidden={hiddenFilters[index] || false}
                  toggleVisibility={toggleFilterVisibility}
                />
              ))}
            </div>
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
                    className="fixed z-[2000] flex flex-col gap-4 rounded-[8px] h-[calc(100vh-200px)] top-[100px] overflow-y-auto min-w-[264px] px-4 py-2"
                    style={{
                      background: "white",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="flex justify-between   items-center  py-2 border-b border-[#AFAFAF80] ">
                      <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                        All Filters
                      </p>

                      <button
                        onClick={() => {
                          setFilters({});
                          setClear(!clear);
                        }}
                        className="text-primary font-montserrat text-sm font-medium text-blue"
                      >
                        Reset all
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
                        className="text-[14px] font-medium flex items-center w-auto bg-white "
                        isOpen={openDropdown === index}
                        onDropdownClick={handleDropdownClick}
                        id={index}
                        loading={loading}
                        isHidden={hiddenFilters[index] || false}
                        toggleVisibility={toggleFilterVisibility}
                      />
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>

            <AllJobCard
              setMiniloading={setMiniloading}
              getAllData={getAllData}
              miniLoading={miniLoading}
              loading={loading}
              setLoading={setLoading}
              setLimitPopup={setLimitPopup}
              setCurrentPage={setPage}
              isLogin={isLogin}
              appliedJobs={appliedJobData}
              setLimit={setLimit}
              limit={limit}
              setTotalpages={setTotalpages}
              totalPages={totalPages}
              page={page}
              setPage={setPage}
              jobData={jobData}
              totalCount={totalCount}
            />

            <div className=" flex-col gap-6 rounded-[12px] scr900:flex hidden sticky top-[84px] h-fit">
              <img
                src="/images/home/CandidatePoster2.png"
                alt=""
                className=" scr1100:min-w-[262px] w-[220px] min-w-[200px]  rounded-[12px] scr1100:h-[356px] h-[300px]  "
              />
              <img
                src="/images/home/SearchJobPoster2.png"
                alt=""
                className=" scr1100:min-w-[262px] w-[220px] min-w-[200px] rounded-[12px] scr1100:h-[356px] h-[300px] "
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Index;
