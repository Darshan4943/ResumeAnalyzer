
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Select from "react-select";
import axios from "axios";

import { useSelector } from "react-redux";
import debounce from "lodash.debounce";
import JobCard from "../../common/hiring/jobCard";


function CompanyDetails() {
    const router = useRouter();
    const query = router.query;
    
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalJobs: 0,
    });
    const [toggle, setToggle] = useState(0);
    const [filters, setFilters] = useState({
        Department: "",
        Location: "",
        companyId: query.companyId,
        Status: "",
    });
    console.log(filters)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [totalCount, setTotalCount] = useState(0);
    const [selectedJob, setSelectedJob] = useState("");
    const [openSort, setOpenSort] = useState(false);
    const [loading, setLoading] = useState(false);
    const [id, setId] = useState();
    const [attributes, setAttributes] = useState([]);

    useEffect(() => {
        if (query.content === "ApplicantDetails") {
            setToggle(2);
        } else if (query.content === "JobPost") {
            setToggle(1);
        } else {
            setToggle(0);
        }
    }, [router.query]);

    const toggleContent = (job, applicantId) => {
        const JobPost = toggle ? "ApplicantDetails" : "JobPost";
        const jobId = job._id ? job._id : query._id;

        const queryParams = {
            content: JobPost,
            id: jobId,
        };

        if (JobPost === "ApplicantDetails") {
            queryParams.applicantId = applicantId;
        }

        setSelectedJob(jobId);

        router.push({
            pathname: "Hiring/",
            query: queryParams,
        });

        setToggle((prevToggle) => !prevToggle);
    };

    const fetchAttributes = async () => {
        try {
            const response = await axios.get(
                `http://localhost:2000/api/jobs/getDistinctJobTitlesAndLocations/${userDataGlobal?._id}`
            );

            const data = {
                jobTitles: [
                    ...new Set(response.data.jobTitles.map((title) => title.trim())),
                ],
                companyNames: [
                    ...new Set(response.data.companyNames.map((title) => title.trim())),
                ],
                locations: [
                    ...new Set(
                        response.data.locations.map((location) =>
                            location.trim().toLowerCase()
                        )
                    ),
                ],
                deadLines: [...new Set(response.data.deadLines)],
            };

            setAttributes(data);

            setHeadings((prevHeadings) =>
                prevHeadings.map((item) => {
                    if (item.heading === "JobTitle") {
                        return {
                            ...item,
                            options: data.jobTitles,
                        };
                    } else if (item.heading === "Location") {
                        return {
                            ...item,
                            options: data.locations,
                        };
                    }
                    return item;
                })
            );
        } catch (error) {
            console.error("Error fetching job attributes:", error);
        }
    };

    useEffect(() => {
        fetchAttributes();
    }, []);

    const [headings, setHeadings] = useState([
        {
            heading: "JobTitle",
            options: [],
        },

        {
            heading: "Location",
            options: [],
        },
        {
            heading: "Status",
            options: ["All", "Active", "Inactive", "Closed"],
        },
    ]);

    useEffect(() => {
        if (userDataGlobal && userDataGlobal?._id) {
            setId(userDataGlobal?._id);
        }
    }, [userDataGlobal]);

    const handleFilterChange = (heading, value) => {
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters };



            if (value) {
                updatedFilters[heading] = value;
            } else {
                delete updatedFilters[heading];
            }

            return updatedFilters;
        });
    };

    const handleFilterChangemobile = (heading, value) => {
        setFilters(() => {
            const updatedFilters = value ? { [heading]: value } : {};
            return updatedFilters;
        });
        setOpenSort(false);
    };

    const nextPage = (e) => {
        e.stopPropagation();
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
            setPage(currentPage + 1);
        }
    };

    const prevPage = (e) => {
        e.stopPropagation();
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPage(currentPage - 1);
        }
    };

    const handleChange = (e) => {
        setLimit(parseInt(e.target.value));
        setPage(1);
        setCurrentPage(1);
    };

    useEffect(() => {
        if (query.content === "ApplicantDetails") {
            setToggle(2);
        } else if (query.content === "JobPost") {
            setToggle(1);
        } else {
            setToggle(0);
        }
    }, [query.content]);

    const handelclear = () => {
        setFilters({
            Department: "",
            Location: "",
            Status: "",
        });
    };

    const handelclearmobile = () => {
        setFilters("");
        setOpenSort(false);
    };

    const getResponsiveWidth = () => {
        const width = window.innerWidth;
        if (width <= 480) {
            return "100px";
        } else if (width <= 768) {
            return "120px";
        } else if (width <= 1024) {
            return "150px";
        } else if (width <= 1440) {
            return "200px";
        } else {
            return "250px";
        }
    };

    const [width, setWidth] = useState(getResponsiveWidth());

    const handleResize = useCallback(
        debounce(() => {
            setWidth(getResponsiveWidth());
        }, 300),
        []
    );

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: "none",
            boxShadow: "none",
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            padding: 0,
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            display: "none",
        }),
        menu: (provided) => ({
            ...provided,
        }),
        option: (provided) => ({
            ...provided,
        }),
    };
    const sortRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sortRef.current && !sortRef.current.contains(event.target)) {
                setOpenSort(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <>
            <div>
                {toggle === 0 && (
                    <div className="flex flex-col gap-[16px] w-[100%] pb-[24px]  relative ">
                        <div className=" mobile">
                            <div ref={sortRef} className="flex relative  ">
                                <div
                                    onClick={() => setOpenSort(true)}
                                    className=" w-full py-[12px] px-[16px] text-[#333] text-[14px] font-[600] flex gap-[10px] items-center bg-[#fff] justify-end"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                    >
                                        <g clip-path="url(#clip0_7540_118191)">
                                            <path
                                                d="M3.33203 5H16.6654"
                                                stroke="#333333"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M5 10H15"
                                                stroke="#333333"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M6.66797 15H13.3346"
                                                stroke="#333333"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_7540_118191">
                                                <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div>Sort</div>
                                </div>
                                {openSort && (
                                    <div
                                        style={{ boxShadow: " 0 4px 6px rgba(0, 0, 0, 0.4)" }}
                                        className="absolute w-[180px] top-[48px] right-[5px] flex flex-col gap-[14px] rounded-[6px] bg-[#FFFFFF] p-[12px] z-[100]"
                                    >
                                        {headings.map((filter, index) => (
                                            <select
                                                key={index}
                                                className=" bg-whites outline-none py-[4px]"
                                                onChange={(e) =>
                                                    handleFilterChange(filter.heading, e.target.value)
                                                }
                                            >
                                                <option value=""> {filter.heading}</option>
                                                {filter.options.map((option, optIndex) => (
                                                    <option key={optIndex} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>
                                        ))}
                                        <div className="flex justify-between ">
                                            <button
                                                onClick={handelclearmobile}
                                                className="bg-[#06A9EF] px-[16px] py-[8px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]"
                                            >
                                                Clear
                                            </button>
                                            <button
                                                onClick={handleFilterChangemobile}
                                                className="bg-[#06A9EF] px-[16px] py-[8px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]"
                                            >
                                                Search
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="hidden ml:flex w-full   gap-12 rounded-[6px] px-[12px] py-[10px] bg-[#FFFFFF]  justify-between">
                            <div className="w-full flex justify-between items-center">
                                {headings.map((filter, index) => (
                                    <>
                                        <Select
                                            key={index}
                                            className="scr1067:w-[25%] w-[30%] overflow-visible"
                                            options={filter.options.map((option) => ({
                                                value: option,
                                                label: option,
                                            }))}
                                            onChange={(selectedOption) =>
                                                handleFilterChange(
                                                    filter.heading,
                                                    selectedOption ? selectedOption.value : ""
                                                )
                                            }
                                            value={
                                                filters[filter.heading]
                                                    ? {
                                                        value: filters[filter.heading],
                                                        label:
                                                            filters[filter.heading] === "Live"
                                                                ? "Active"
                                                                : filters[filter.heading] === "Closed"
                                                                    ? "Inactive"
                                                                    : filters[filter.heading],
                                                    }
                                                    : ""
                                            }
                                            placeholder={
                                                filter.heading === "JobTitle"
                                                    ? "Job Title"
                                                    : filter.heading === "CompanyName"
                                                        ? "Company Name" : filter.heading
                                            }
                                            isSearchable={true}
                                            noOptionsMessage={() => "No options available"}
                                            menuPortalTarget={document.body}
                                            menuPosition="absolute"
                                            styles={{
                                                ...customStyles,
                                                menu: (base) => ({
                                                    ...base,
                                                    minWidth: "320px",
                                                    maxWidth: "150px",
                                                    zIndex: 9999,
                                                }),
                                                menuList: (base) => ({
                                                    ...base,
                                                    fontSize: "12px",
                                                    padding: "4px",
                                                }),
                                                option: (base) => ({
                                                    ...base,
                                                    padding: "4px 8px",
                                                    fontSize: "16px",
                                                }),
                                                menuPortal: (base) => ({
                                                    ...base,
                                                    zIndex: 9999,
                                                }),
                                            }}
                                        />
                                        <div className="bg-[#E0E0E0] min-w-[1px] h-[20px]"></div>
                                    </>
                                ))}
                            </div>
                            <div className=" flex justify-end gap-3">
                                {/* <button
                  onClick={handleFilterChange}
                  className="scr1067:px-[36px] px-4 scr1067:py-[12px] py-2 rounded-[30px]  flex items-center justify-center bg-[#06A9EF] text-[14px] font-[600] text-[#FFFFFF]"
                >
                  Search
                </button> */}
                                <button
                                    onClick={handelclear}
                                    className="scr1067:px-[24px] px-4 scr1067:py-[6px] py-2 rounded-[30px]  border-[1px] border-[#06A9EF] flex items-center justify-center text-[14px] font-[600] text-[#000000]"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <JobCard filters={filters} setFilters={setFilters} />
                    </div>
                )}
            </div>
        </>
    );
}

export default CompanyDetails;
