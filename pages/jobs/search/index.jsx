import React, { useEffect, useReducer, useState } from 'react'
import Filter from '../home/Filter'
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from '@react-hook/media-query';
import { useRouter } from 'next/router';
import axios from 'axios';
import AllJobCard from '../home/AllJobCard';

function Index() {
    const [recall, forceUpdate] = useReducer((x) => x + 1, 0);
    const [filter, setFilter] = useState(false);
    const [mobileFilter, setMobileFilter] = useState(false);
    const [jobData, setJobData] = useState([]);

    const [toggleHeadings, setToggleHeadings] = useState(0);

    const userDataGlobal = useSelector((state) => state.userData);
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
    const [miniLoading, setMiniloading] = useState(false);
    const { loc, jobTit, search } = router.query;
    const [hiddenFilters, setHiddenFilters] = useState({});
   
    const toggleFilterVisibility = (filterId) => {
        setHiddenFilters((prev) => ({
            ...prev,
            [filterId]: !prev[filterId],
        }));
    };


    useEffect(() => {
        setCountry(userDataGlobal.country);

        setIsCountrySet(true);

        axios
            .get("http://localhost:2000/api/jobs/getJobAttributes")
            .then((res) => {
                setJobTypeData(res.data);
                setTimeout(() => {
                    setLoadingg(false)
                }, 500);

            })
            .catch((err) => console.error(err));

    }, []);

    const handleDropdownClick = (id) => {
        setOpenDropdown(openDropdown === id ? null : id);
    };
    const handleCheckboxChange = (e, filterType, value) => {
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
            child: jobtypeData?.jobModes || [],
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
        setMiniloading(true);
        try {
            const res = await axios.post(
                "http://localhost:2000/api/job/getAll",
                {
                    requiredSkills: jobTitle || location ? [] : userSkills?.map((item) => item),
                    jobTitle: jobTitle.trim() || "",
                    country: location ? "" : country,
                    location: location.trim(),
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
            getAllData();
        }
    }, [page, limit, country, search]);

    return (
        <div className='customMargins py-6 flex gap-6'>


            <div style={{ boxShadow: "0px 0px 14px 0px #00000005" }} className='bg-white w-[262px]  px-4 py-2 rounded-[8px] flex flex-col gap-4 h-full  '>
                <div className="flex justify-between   items-center  p-2 border-b border-[#AFAFAF80] ">
                    <p className=" font-montserrat text-base font-medium text-[10px] text-black ">
                        All Filters
                    </p>

                    <button
                        // onClick={() => {
                        //   setFilters({});
                        //   setClear(!clear);

                        // }}
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
                        isHidden={hiddenFilters[index] || false}
                        toggleVisibility={toggleFilterVisibility}
                    />
                ))}
            </div>
            <AllJobCard
                setMiniloading={setMiniloading}
                miniLoading={miniLoading}
                loading={loading}
                setLoading={setLoading}
                setLimitPopup={setLimitPopup}
                setCurrentPage={setPage}
                isLogin={isLogin}
                appliedJobs={appliedJobs}
                setLimit={setLimit}
                limit={limit}
                setTotalpages={setTotalpages}
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                jobData={jobData}
            />
            <div className='flex flex-col gap-6 rounded-[12px]'>
                <img
                    src="/images/jobs/jobPoster1.png"
                    alt=""
                    className=" w-[262px] h-[356px] object-cover "

                />
                <img
                    src="/images/jobs/jobPoster1.png"
                    alt=""
                    className=" w-[262px] h-[356px] object-cover "

                />
            </div>
        </div>
    )
}

export default Index
