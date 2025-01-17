import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import MiniLoader from "../../components/common/miniLoader";
import { useSelector } from "react-redux";
import debounce from 'lodash.debounce';

function Hiring() {
  const router = useRouter();
  const query = router.query;
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
  });
  const [toggle, setToggle] = useState(0);
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
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

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          "http://localhost:2000/api/jobs/getDistinctJobTitlesAndLocations"
        );
        const data = response.data;
        setAttributes(data);
        setHeadings((prevHeadings) =>
          prevHeadings.map((item) => {
            if (item.heading === "Department") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.jobTitles])],
              };
            } else if (item.heading === "Location") {
              return {
                ...item,
                options: [...new Set([...item.options, ...data.locations])],
              };
            }
            return item;
          })
        );
      } catch (error) {
        console.error("Error fetching job attributes:", error);
      }
    };

    fetchAttributes();
  }, []);

  const [headings, setHeadings] = useState([
    {
      heading: "Department",
      options: [
        "software development",
        "Backend Developer",
        "React Js Developer",
        "Secretary",
      ],
    },
    {
      heading: "Location",
      options: ["Los Angeles", "New York", "San Francisco"],
    },
    {
      heading: "Status",
      options: ["Live", "Hold", "Closed"],
    },
  ]);

  useEffect(() => {
    if (userDataGlobal && userDataGlobal?._id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:2000/api/job/getAllJobDetails/${id}`,
        {
          params: { page, limit, ...filters },
        }
      );

      const { jobs, pagination } = response.data;
      setData(jobs);
      setTimeout(() => {
        setLoading(false);
      }, 500);
      setTotalCount(pagination.totalCount);
      setTotalPages(pagination.totalPages);
    } catch (error) {
      console.error("Error fetching jobs:", error.message || error);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    if (id) {
      fetchJobs();
    }
  }, [id, filters, limit, page]);

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
    setFilters("");
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
      // width: width,
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
      // width: width,
    }),
    option: (provided) => ({
      ...provided,
      // width: width,
    }),
  };

  return (
    <div>
      {toggle === 0 && (
        <div className="flex flex-col gap-[16px] w-[100%] ml:max-h-[80vh]  relative ">
          <div className=" mobile">
            <div className="flex relative bg-[#06A9EF] gap-[1px] p-4 ml:w-[20%] w-full">
              <div
                onClick={() => setOpenSort(true)}
                className=" w-full py-[12px] px-[16px] text-[#333] text-[14px] font-[600] flex gap-[8px] items-center bg-[#fff]"
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
                  className="absolute top-[48px] right-[5px] flex flex-col gap-[10px] rounded-[6px] bg-[#FFFFFF] p-[12px] z-[100]"
                >
                  {headings.map((filter, index) => (
                    <select
                      key={index}
                      className=" bg-whites"
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
                  <button
                    onClick={handelclearmobile}
                    className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]"
                  >
                    Clear
                  </button>
                  <button
                    onClick={handleFilterChangemobile}
                    className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[6px] text-[#FFFFFF] text-[14px] font-[600]"
                  >
                    Search
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="hidden ml:flex w-full max-w-[1200px]  gap-12 rounded-[6px] px-[12px] py-[10px] bg-[#FFFFFF]  justify-between">
            <div className="w-[75%] flex justify-between items-center">
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
                      filter.value
                        ? {
                          label: filter.value,
                          value: filter.value,
                        }
                        : null
                    }
                    placeholder={filter.heading}
                    isSearchable={true}
                    noOptionsMessage={() => "No options available"}
                    menuPortalTarget={document.body}
                    menuPosition="absolute"
                    styles={{
                      ...customStyles,
                      menu: (base) => ({
                        ...base,
                        width: '200%',
                        zIndex: 9999,
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
            <div className="scr1067:w-[25%] w-[20%] flex justify-end gap-3">
              <button
                onClick={handleFilterChange}
                className="scr1067:px-[36px] px-4 scr1067:py-[12px] py-2 rounded-[30px]  flex items-center justify-center bg-[#06A9EF] text-[14px] font-[600] text-[#FFFFFF]"
              >
                Search
              </button>
              <button
                onClick={handelclear}
                className="scr1067:px-[36px] px-4 scr1067:py-[12px] py-2 rounded-[30px]  border-[1px] border-[#06A9EF] flex items-center justify-center text-[14px] font-[600] text-[#000000]"
              >
                Clear
              </button>
            </div>
          </div>

          {loading ? (
            <MiniLoader />
          ) : data?.length === 0 ? (
            <div className="p-3  flex items-center justify-center">
              <img
                className="w-[40%]"
                src="/images/employer/OBJECTS.png"
                alt="No data available"
              />
            </div>
          ) : (
            <div className=" grid md:grid-cols-12 grid-clos-6 gap-6 ">
              {data?.map((job, index) => (
                <div
                  key={index}
                  // onClick={() => toggleContent(job)}
                  onClick={() =>
                    router.push(`/common/hiring/JobPost?id=${job._id}`)
                  }
                  className="flex py-[16px] px-[24px] flex-col items-start gap-[12px] flex-shrink-0 rounded-lg bg-[#fff] shadow-md col-span-6"
                >
                  <div className="flex justify-between w-[100%]">
                    <div className="flex justify-between gap-[20px] ">
                      <p className=" text-[14px] font-[600]">{job.jobTitle}</p>
                      <div className="flex gap-[3px] items-center">
                        {job.status === "Live" ? (
                          <>
                            <div className="w-[6px] h-[6px] bg-[#364135] rounded-full"></div>
                            <div className="text-[12px] font-[500] text-[#0C8A0A]">
                              Active
                            </div>
                          </>
                        ) : job.status === "Hold" ? (
                          <>
                            <div className="w-[6px] h-[6px] bg-[#ddda40] rounded-full"></div>
                            <div className="text-[12px] font-[500] text-[#ddda40]">
                              On Hold
                            </div>
                          </>
                        ) : job.status === "Closed" ? (
                          <>
                            <div className="w-[6px] h-[6px] bg-[#B3261E] rounded-full"></div>
                            <div className="text-[12px] font-[500] text-[#B3261E]">
                              Inactive
                            </div>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex w-[100%] justify-between items-center ">
                    <p className="text-[#333] text-[18px] font-[600]">
                      Total Applications
                    </p>
                    <p className="text-[#333] items-center text-[36px] font-[600] ">
                      {job.totalApplicationCount}
                    </p>
                  </div>

                  <div className="flex w-[100%] justify-between items-center ">
                    <div className="flex flex-col items-start gap-[4px]">
                      <p className="text-[12px] font-[600] text-[#646464]">
                        Date posted
                      </p>
                      <p className="text-[#333] font-[500] text-[12px]">
                        {new Date(job.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-[4px]">
                      <p className="text-[12px] font-[600] text-[#646464]">
                        Due Date
                      </p>
                      <p className="text-[#333] font-[500] text-[12px]">
                        {new Date(job.deadLine).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-[10px]">
                    <div className="flex gap-[4px] items-center">
                      <div>
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1.33073 11.7474C1.0099 11.7474 0.735243 11.6332 0.506771 11.4047C0.278299 11.1762 0.164062 10.9016 0.164062 10.5807V4.16406C0.164062 3.84323 0.278299 3.56858 0.506771 3.3401C0.735243 3.11163 1.0099 2.9974 1.33073 2.9974H3.66406V1.83073C3.66406 1.5099 3.7783 1.23524 4.00677 1.00677C4.23524 0.778299 4.5099 0.664062 4.83073 0.664062H7.16406C7.48489 0.664062 7.75955 0.778299 7.98802 1.00677C8.21649 1.23524 8.33073 1.5099 8.33073 1.83073V2.9974H10.6641C10.9849 2.9974 11.2595 3.11163 11.488 3.3401C11.7165 3.56858 11.8307 3.84323 11.8307 4.16406V10.5807C11.8307 10.9016 11.7165 11.1762 11.488 11.4047C11.2595 11.6332 10.9849 11.7474 10.6641 11.7474H1.33073ZM1.33073 10.5807H10.6641V4.16406H1.33073V10.5807ZM4.83073 2.9974H7.16406V1.83073H4.83073V2.9974Z"
                            fill="#646464"
                          />
                        </svg>
                      </div>
                      <div className="text-[12px] font-[400]">
                        {job.revalentExp}
                      </div>
                    </div>
                    <div className="border-[1px] border-[#AFAFAF]"></div>
                    <div className="flex gap-[4px] items-center">
                      <div>
                        <svg
                          width="10"
                          height="13"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.66927 11.1641H7.33594V9.41406C7.33594 8.7724 7.10746 8.22309 6.65052 7.76615C6.19358 7.3092 5.64427 7.08073 5.0026 7.08073C4.36094 7.08073 3.81163 7.3092 3.35469 7.76615C2.89774 8.22309 2.66927 8.7724 2.66927 9.41406V11.1641ZM5.0026 5.91406C5.64427 5.91406 6.19358 5.68559 6.65052 5.22865C7.10746 4.7717 7.33594 4.2224 7.33594 3.58073V1.83073H2.66927V3.58073C2.66927 4.2224 2.89774 4.7717 3.35469 5.22865C3.81163 5.68559 4.36094 5.91406 5.0026 5.91406ZM0.335938 12.3307V11.1641H1.5026V9.41406C1.5026 8.82101 1.64115 8.26441 1.91823 7.74427C2.19531 7.22413 2.58177 6.80851 3.0776 6.4974C2.58177 6.18629 2.19531 5.77066 1.91823 5.25052C1.64115 4.73038 1.5026 4.17378 1.5026 3.58073V1.83073H0.335938V0.664062H9.66927V1.83073H8.5026V3.58073C8.5026 4.17378 8.36406 4.73038 8.08698 5.25052C7.8099 5.77066 7.42344 6.18629 6.9276 6.4974C7.42344 6.80851 7.8099 7.22413 8.08698 7.74427C8.36406 8.26441 8.5026 8.82101 8.5026 9.41406V11.1641H9.66927V12.3307H0.335938Z"
                            fill="#646464"
                          />
                        </svg>
                      </div>
                      <div className="text-[12px] font-[400]">
                        {job.jobType}
                      </div>
                    </div>
                    <div className="border-[1px] border-[#AFAFAF]"></div>
                    <div className="flex gap-[4px] items-center">
                      <div>
                        <svg
                          width="10"
                          height="13"
                          viewBox="0 0 10 13"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.0026 6.4974C5.32344 6.4974 5.59809 6.38316 5.82656 6.15469C6.05503 5.92622 6.16927 5.65156 6.16927 5.33073C6.16927 5.0099 6.05503 4.73524 5.82656 4.50677C5.59809 4.2783 5.32344 4.16406 5.0026 4.16406C4.68177 4.16406 4.40712 4.2783 4.17865 4.50677C3.95017 4.73524 3.83594 5.0099 3.83594 5.33073C3.83594 5.65156 3.95017 5.92622 4.17865 6.15469C4.40712 6.38316 4.68177 6.4974 5.0026 6.4974ZM5.0026 10.7849C6.18871 9.69601 7.06858 8.70677 7.64219 7.81719C8.2158 6.9276 8.5026 6.13767 8.5026 5.4474C8.5026 4.38767 8.16476 3.51997 7.48906 2.84427C6.81337 2.16858 5.98455 1.83073 5.0026 1.83073C4.02066 1.83073 3.19184 2.16858 2.51615 2.84427C1.84045 3.51997 1.5026 4.38767 1.5026 5.4474C1.5026 6.13767 1.78941 6.9276 2.36302 7.81719C2.93663 8.70677 3.81649 9.69601 5.0026 10.7849ZM5.0026 12.3307C3.43733 10.9988 2.26823 9.76163 1.49531 8.61927C0.722396 7.47691 0.335938 6.41962 0.335938 5.4474C0.335938 3.98906 0.805035 2.82726 1.74323 1.96198C2.68142 1.0967 3.76788 0.664062 5.0026 0.664062C6.23733 0.664062 7.32378 1.0967 8.26198 1.96198C9.20017 2.82726 9.66927 3.98906 9.66927 5.4474C9.66927 6.41962 9.28281 7.47691 8.5099 8.61927C7.73698 9.76163 6.56788 10.9988 5.0026 12.3307Z"
                            fill="#646464"
                          />
                        </svg>
                      </div>
                      <div className="text-[12px] font-[400]">
                        {job.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <>
            <div className="sm:px-[16px] px-0 w-full justify-between flex ">
              <div className="flex items-center sm:gap-4 gap-2">
                <p className="text-[14px] text-[#646464] font-600">View</p>
                <div className="flex gap-[8px] items-center">
                  <select
                    value={limit}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => handleChange(e)}
                    className="text-[14px] px-[16px] py-[10px] border-[1px] border-[#DEDEDE] bg-[#F9F9F9] rounded-[6px] text-[#333] font-600"
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                  </select>
                </div>
                <p className="text-[14px] sm:block hidden text-[#646464] font-[600]">
                  Jobs per page
                </p>
              </div>

              <div
                className="flex items-center"
                style={{ radious: "0px 0px 16px 16px" }}
              >
                <p className="text-[14px] text-[#646464] font-[500]">
                  pages
                  <span className="text-[#333] px-[10px] font-[600]">
                    {currentPage}
                  </span>{" "}
                  of{" "}
                  <span className="text-[#333] px-[10px]  font-[600]">
                    {totalPages}
                  </span>
                </p>
                <button disabled={currentPage === 1}>
                  <svg
                    onClick={(e) => prevPage(e)}
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2529_10517)">
                      <path
                        d="M15 6L9 12L15 18"
                        stroke={currentPage !== 1 ? "#333333" : "#646464"}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2529_10517">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <button disabled={currentPage === totalPages}>
                  <svg
                    width="25"
                    height="24"
                    onClick={(e) => nextPage(e)}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_2529_10530)">
                      <path
                        d="M9.375 6L15.625 12L9.375 18"
                        stroke={
                          currentPage !== totalPages ? "#333333" : "#646464"
                        }
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_2529_10530">
                        <rect width="25" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </div>
          </>
        </div>
      )}
    </div>
  );
}


export default Hiring;
