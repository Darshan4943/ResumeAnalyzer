
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

    const [filters, setFilters] = useState({
        Department: "",
        Location: "",
        companyId: query.companyId,
        Status: "",
    });

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
    const [data, setData] = useState()




    console.log(data)

    const fetchCompanyDetails = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                `https://jamblix.com/api/company/fetchCompaniDetails/${query.companyId}`
            );
            if (response.data) {
                setData({
                    companyName: response.data.companyName,
                    companySector: response.data.companySector,
                    companyLogo: response.data.companyLogo,
                    companyDescription: response.data.companyDescription,
                    companyAddress: response.data.companyAddress,
                    companyWebsite: response.data.companyWebsite,
                    companyMail: response.data.companyMail,
                    companySize: response.data.companySize,
                });
            }
        } catch (error) {
            setLoading(false);
            console.error("Error fetching company details:", error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCompanyDetails();
    }, []);


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
                `https://jamblix.com/api/jobs/getDistinctJobTitlesAndLocations/${userDataGlobal?._id}`
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

                <div className="flex flex-col gap-[16px] w-[100%] pb-[24px]  relative ">

                    <div className="p-3 bg-white rounded-[6px] flex gap-6 w-[60%] min-w-fit">
                        <div style={{ boxShadow: "0px 1.62px 6.46px 0px #4D4D4D40" }} className="border border-[#DEDEDE] p-2 h-[84px] w-[84px] rounded-[6px] flex justify-center items-center">
                            {data?.companyLogo ? (
                                <img
                                    src={data?.companyLogo}
                                    className=" object-contain  h-[40px]"
                                    alt="Profile"
                                />
                            ) : (
                                <svg
                                    width="98"
                                    height="40"
                                    viewBox="0 0 74 74"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clip-path="url(#clip0_9091_108707)">
                                        <path
                                            d="M37 0C29.6821 0 22.5285 2.17001 16.4439 6.23562C10.3593 10.3012 5.61692 16.0798 2.81647 22.8407C0.0160314 29.6016 -0.716692 37.041 0.710961 44.2183C2.13861 51.3956 5.66252 57.9884 10.8371 63.163C16.0116 68.3375 22.6044 71.8614 29.7817 73.2891C36.959 74.7167 44.3984 73.984 51.1593 71.1835C57.9202 68.3831 63.6988 63.6407 67.7644 57.5561C71.83 51.4715 74 44.3179 74 37C73.987 27.191 70.0847 17.7874 63.1486 10.8514C56.2126 3.91534 46.809 0.0129712 37 0ZM37 17.3438C39.2869 17.3438 41.5224 18.0219 43.4238 19.2924C45.3252 20.5629 46.8072 22.3687 47.6824 24.4815C48.5575 26.5942 48.7865 28.9191 48.3403 31.162C47.8942 33.4049 46.793 35.4651 45.1759 37.0822C43.5589 38.6992 41.4987 39.8004 39.2558 40.2466C37.0128 40.6927 34.688 40.4637 32.5752 39.5886C30.4625 38.7135 28.6567 37.2315 27.3862 35.33C26.1156 33.4286 25.4375 31.1931 25.4375 28.9062C25.4386 25.84 26.6572 22.8997 28.8253 20.7315C30.9935 18.5634 33.9338 17.3449 37 17.3438ZM55.5 56.6562C55.1955 56.6593 54.8934 56.6015 54.6115 56.4864C54.3296 56.3713 54.0734 56.201 53.8581 55.9857C53.6427 55.7703 53.4725 55.5142 53.3574 55.2323C53.2422 54.9503 53.1845 54.6483 53.1875 54.3438C53.1887 53.4324 53.0101 52.5297 52.6619 51.6874C52.3137 50.8452 51.8027 50.0799 51.1583 49.4355C50.5138 48.791 49.7486 48.2801 48.9063 47.9319C48.0641 47.5836 47.1614 47.405 46.25 47.4062H27.75C26.8386 47.405 25.936 47.5836 25.0937 47.9319C24.2515 48.2801 23.4862 48.791 22.8417 49.4355C22.1973 50.0799 21.6863 50.8452 21.3381 51.6874C20.9899 52.5297 20.8113 53.4324 20.8125 54.3438C20.8125 54.9571 20.5689 55.5453 20.1352 55.9789C19.7015 56.4126 19.1133 56.6562 18.5 56.6562C17.8867 56.6562 17.2985 56.4126 16.8648 55.9789C16.4312 55.5453 16.1875 54.9571 16.1875 54.3438C16.1886 51.2775 17.4072 48.3372 19.5753 46.169C21.7435 44.0009 24.6838 42.7824 27.75 42.7812H46.25C49.3162 42.7824 52.2566 44.0009 54.4247 46.169C56.5929 48.3372 57.8114 51.2775 57.8125 54.3438C57.8155 54.6483 57.7578 54.9503 57.6427 55.2323C57.5275 55.5142 57.3573 55.7703 57.142 55.9857C56.9266 56.201 56.6705 56.3713 56.3885 56.4864C56.1066 56.6015 55.8045 56.6593 55.5 56.6562Z"
                                            fill="#B8B8B8"
                                        />
                                        <path
                                            d="M37 35.8438C40.8315 35.8438 43.9375 32.7377 43.9375 28.9062C43.9375 25.0748 40.8315 21.9688 37 21.9688C33.1685 21.9688 30.0625 25.0748 30.0625 28.9062C30.0625 32.7377 33.1685 35.8438 37 35.8438Z"
                                            fill="#B8B8B8"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_9091_108707">
                                            <rect width="74" height="74" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            )

                            }

                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-[14px] font-semibold">{data?.companyName}</p>
                            <div className="flex gap-2 flex-wrap">
                                {data?.companySector?.map((sector, index) => (
                                    <div
                                        key={index}
                                        className=" px-2 border border-[#DEDEDE] py-[6px] rounded-[30px] text-[12px] text-[#646464] font-medium leading-tight"
                                    >
                                        {sector}
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {data?.companyMail &&
                                    <div className="flex gap-2 text-[12px] font-medium">
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <g mask="url(#mask0_9452_111455)">
                                                <path d="M3 15.5C2.5875 15.5 2.23438 15.3531 1.94063 15.0594C1.64688 14.7656 1.5 14.4125 1.5 14V5C1.5 4.5875 1.64688 4.23438 1.94063 3.94063C2.23438 3.64688 2.5875 3.5 3 3.5H15C15.4125 3.5 15.7656 3.64688 16.0594 3.94063C16.3531 4.23438 16.5 4.5875 16.5 5V14C16.5 14.4125 16.3531 14.7656 16.0594 15.0594C15.7656 15.3531 15.4125 15.5 15 15.5H3ZM15 6.5L9.39375 10.0063C9.33125 10.0438 9.26562 10.0719 9.19687 10.0906C9.12812 10.1094 9.0625 10.1187 9 10.1187C8.9375 10.1187 8.87188 10.1094 8.80313 10.0906C8.73438 10.0719 8.66875 10.0438 8.60625 10.0063L3 6.5V14H15V6.5ZM9 8.75L15 5H3L9 8.75ZM3 6.6875V5.58125V5.6V5.59063V6.6875Z" fill="#333333" />
                                            </g>
                                        </svg>
                                        {data?.companyMail}

                                    </div>
                                }
                                {data?.companyWebsite &&
                                    <div className="flex gap-2 text-[12px] font-medium">
                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">

                                            <g mask="url(#mask0_9452_111458)">
                                                <path d="M5.25 13.25C4.2125 13.25 3.32812 12.8844 2.59687 12.1531C1.86562 11.4219 1.5 10.5375 1.5 9.5C1.5 8.4625 1.86562 7.57812 2.59687 6.84687C3.32812 6.11562 4.2125 5.75 5.25 5.75H7.5C7.7125 5.75 7.89063 5.82187 8.03438 5.96562C8.17813 6.10938 8.25 6.2875 8.25 6.5C8.25 6.7125 8.17813 6.89062 8.03438 7.03437C7.89063 7.17813 7.7125 7.25 7.5 7.25H5.25C4.625 7.25 4.09375 7.46875 3.65625 7.90625C3.21875 8.34375 3 8.875 3 9.5C3 10.125 3.21875 10.6562 3.65625 11.0938C4.09375 11.5312 4.625 11.75 5.25 11.75H7.5C7.7125 11.75 7.89063 11.8219 8.03438 11.9656C8.17813 12.1094 8.25 12.2875 8.25 12.5C8.25 12.7125 8.17813 12.8906 8.03438 13.0344C7.89063 13.1781 7.7125 13.25 7.5 13.25H5.25ZM6.75 10.25C6.5375 10.25 6.35938 10.1781 6.21562 10.0344C6.07188 9.89062 6 9.7125 6 9.5C6 9.2875 6.07188 9.10938 6.21562 8.96562C6.35938 8.82187 6.5375 8.75 6.75 8.75H11.25C11.4625 8.75 11.6406 8.82187 11.7844 8.96562C11.9281 9.10938 12 9.2875 12 9.5C12 9.7125 11.9281 9.89062 11.7844 10.0344C11.6406 10.1781 11.4625 10.25 11.25 10.25H6.75ZM10.5 13.25C10.2875 13.25 10.1094 13.1781 9.96563 13.0344C9.82188 12.8906 9.75 12.7125 9.75 12.5C9.75 12.2875 9.82188 12.1094 9.96563 11.9656C10.1094 11.8219 10.2875 11.75 10.5 11.75H12.75C13.375 11.75 13.9062 11.5312 14.3438 11.0938C14.7812 10.6562 15 10.125 15 9.5C15 8.875 14.7812 8.34375 14.3438 7.90625C13.9062 7.46875 13.375 7.25 12.75 7.25H10.5C10.2875 7.25 10.1094 7.17813 9.96563 7.03437C9.82188 6.89062 9.75 6.7125 9.75 6.5C9.75 6.2875 9.82188 6.10938 9.96563 5.96562C10.1094 5.82187 10.2875 5.75 10.5 5.75H12.75C13.7875 5.75 14.6719 6.11562 15.4031 6.84687C16.1344 7.57812 16.5 8.4625 16.5 9.5C16.5 10.5375 16.1344 11.4219 15.4031 12.1531C14.6719 12.8844 13.7875 13.25 12.75 13.25H10.5Z" fill="#333333" />
                                            </g>
                                        </svg>

                                        {data?.companyWebsite}

                                    </div>
                                }


                            </div>

                        </div>

                    </div>
                    <div className="p-3 bg-white rounded-[6px] flex flex-col gap-1 w-[60%] min-w-fit">
                        <p className="text-[14px] font-semibold">About Company</p>
                        <div
                            className=" text-[12px]  font-[500] text-[#646464]"
                            dangerouslySetInnerHTML={{
                                __html: data?.companyDescription,
                            }}
                        />

                    </div>
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
                                            className=" px-[16px]  rounded-[6px]  text-[12px] blue_border_Button font-[600]"
                                        >
                                            Clear
                                        </button>
                                        {/* <button
                                                onClick={handleFilterChangemobile}
                                                className="bg-[#06A9EF] px-[16px] py-[8px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]"
                                            >
                                                Search
                                            </button> */}
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
                                className="scr1067:px-[24px] px-6 rounded-[30px]   flex items-center justify-center text-[12px] font-[600] blue_border_Button"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                    <JobCard filters={filters} setFilters={setFilters} />
                </div>

            </div>
        </>
    );
}

export default CompanyDetails;
