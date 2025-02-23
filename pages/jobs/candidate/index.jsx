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
  const { loc, jobTit, exp, search ,cat} = router.query;
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
      .get("http://localhost:2000/api/jobs/getJobAttributes")
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
        "http://localhost:2000/api/job/getAll",
        {
          requiredSkills:
            jobTitle || location ? [] : userSkills?.map((item) => item),
          jobTitle: jobTitle.trim() || "",
          country: location ? "" : country,
          location: location.trim(),
          // experience: experience ? experience : profileData?.totalExperience?.years,
          experience: experience,
          isExperinceNo: experience ? false : true,
          jobCat: cat ? cat.trim() :""
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
        "http://localhost:2000/api/job/getFilterData",
        {
          requiredSkills:
            jobTitle || location ? [] : userSkills?.map((item) => item),
          jobTitle: jobTitle.trim() || "",
          country: location ? "" : country,
          location: location.trim(),
          // experience: experience ? experience : profileData?.totalExperience?.years,
          experience: experience,
          isExperinceNo: experience ? false : true,
          jobCat: cat ? cat.trim() :"",
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
        <MiniLoader />
      ) : (
        <>
          <div className="w-full customMargins pt-6 scr700:hidden ">
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

          <div className="customMargins py-6 flex gap-6">
            <div
              style={{ boxShadow: "0px 0px 14px 0px #00000005" }}
              className="bg-white w-[262px]  px-4 py-2 rounded-[8px] scr700:flex hidden flex-col gap-4 h-full  min-w-[200px]"
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

            <div className=" flex-col gap-6 rounded-[12px] scr900:flex hidden">
              <img
                src="/images/jobs/jobPoster1.png"
                alt=""
                className=" scr1100:min-w-[262px] w-[220px] min-w-[200px]  rounded-[12px] scr1100:h-[356px] h-[300px] object-contain "
              />
              <img
                src="/images/jobs/jobPoster1.png"
                alt=""
                className=" scr1100:min-w-[262px] w-[220px] min-w-[200px] rounded-[12px] scr1100:h-[356px] h-[300px] object-contain "
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Index;
