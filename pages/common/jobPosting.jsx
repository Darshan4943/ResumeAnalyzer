import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MiniLoader from "../../components/common/miniLoader";
import JobCard from "./hiring/jobCard";
import { useSelector } from "react-redux";
import Select from "react-select";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import BulkUploadPopUp from "../../components/common/bulkUploadPopUp";
function JobPosting() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [filters, setFilters] = useState({
    Department: "",
    Location: "",
    Status: "",
  });

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:2000/api/company/getCompaniesById/${userDataGlobal?._id}`,
          {
            params: { page: 1, limit: 100 },
          }
        );
        setCompanyData(response.data.companies);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } catch (err) {
        console.error("Error fetching company data:", err);
        setError("Error fetching company data.");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchCompanyData();
  }, []);

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

      setHeadings((prevHeadings) =>
        prevHeadings.map((item) => {
          if (item.heading === "JobTitle") {
            return {
              ...item,
              options: data.jobTitles,
            };
          } else if (item.heading === "CompanyName") {
            return {
              ...item,
              options: data.companyNames,
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
      heading: "CompanyName",
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

  const handleCompanyChange = (event) => {
    const selectedId = event.target.value;

    router.push(`/common/jobPosting/CreateNewJob?companyId=${selectedId}`);
  };

 

  




  return (
    <>
      {/* {loading ? (
        <div className="w-full justify-center">
          <MiniLoader />
        </div>
      ) : ( */}
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 flex-col  scr1024:flex-row">
              {companyData?.length > 0 && (
                <div className="flex flex-col bg-white rounded-[16px] p-4">
                  <p className="text-[16px] font-medium">
                    Choose an existing company <br />
                    from the dropdown list
                  </p>
                  <div className="flex gap-2 items-end">
                    {loading ? (
                      <p>Loading...</p>
                    ) : error ? (
                      <p className="text-red-500">{error}</p>
                    ) : (
                      <select
                        onChange={handleCompanyChange}
                        className="border border-[#DEDEDE] outline-none rounded-[8px] p-2 text-[12px]  font-normal w-[204px]"
                      >
                        <option value="">Select a company</option>
                        {companyData?.map((company) => (
                          <option key={company._id} value={company._id}>
                            {company.companyName}
                          </option>
                        ))}
                      </select>
                    )}
                    <img
                      className="max-w-[98px] max-h-[78px] object-cover"
                      src={"/images/company.png"}
                      alt=""
                    />
                  </div>
                </div>
              )}

              <div className="flex flex-col bg-white rounded-[16px] p-4">
                <p className="text-[16px] font-medium">
                  Enter job descriptions, requirements, <br />
                  and other necessary details
                </p>
                <div className="flex gap-2 items-end">
                  <button
                    onClick={() =>
                      router.push(`/common/jobPosting/CreateNewJob`)
                    }
                    className="w-[212px] rounded-[30px] flex text-[14px] font-semibold bg-blue text-white h-[42px] items-center justify-center"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_6706_94226)">
                        <path
                          d="M8.25 9.75H4.5C4.2875 9.75 4.10938 9.67812 3.96562 9.53438C3.82187 9.39062 3.75 9.2125 3.75 9C3.75 8.7875 3.82187 8.60938 3.96562 8.46562C4.10938 8.32188 4.2875 8.25 4.5 8.25H8.25V4.5C8.25 4.2875 8.32188 4.10938 8.46562 3.96562C8.60938 3.82187 8.7875 3.75 9 3.75C9.2125 3.75 9.39062 3.82187 9.53438 3.96562C9.67812 4.10938 9.75 4.2875 9.75 4.5V8.25H13.5C13.7125 8.25 13.8906 8.32188 14.0344 8.46562C14.1781 8.60938 14.25 8.7875 14.25 9C14.25 9.2125 14.1781 9.39062 14.0344 9.53438C13.8906 9.67812 13.7125 9.75 13.5 9.75H9.75V13.5C9.75 13.7125 9.67812 13.8906 9.53438 14.0344C9.39062 14.1781 9.2125 14.25 9 14.25C8.7875 14.25 8.60938 14.1781 8.46562 14.0344C8.32188 13.8906 8.25 13.7125 8.25 13.5V9.75Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    Manual Job Post
                  </button>
                  <img
                    className="max-w-[98px] max-h-[78px] object-cover"
                    src={"/images/manualPost.png"}
                    alt=""
                  />
                </div>
              </div>

              <div className="flex flex-col bg-white rounded-[16px] p-4">
                <p className="text-[16px] font-medium">
                  Download the template, fill in job <br />
                  details & upload in one click
                </p>
                <div className="flex gap-2 items-end">
                  <button
                    onClick={() => setOpenPopup(true)}
                    className="w-[212px] gap-1 rounded-[30px] flex text-[14px] font-semibold bg-blue text-white h-[42px] items-center justify-center"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g mask="url(#mask0_9696_113372)">
                        <path
                          d="M4.875 15C3.7375 15 2.76562 14.6062 1.95938 13.8188C1.15313 13.0312 0.75 12.0688 0.75 10.9312C0.75 9.95625 1.04375 9.0875 1.63125 8.325C2.21875 7.5625 2.9875 7.075 3.9375 6.8625C4.25 5.7125 4.875 4.78125 5.8125 4.06875C6.75 3.35625 7.8125 3 9 3C10.4625 3 11.7031 3.50938 12.7219 4.52813C13.7406 5.54688 14.25 6.7875 14.25 8.25C15.1125 8.35 15.8281 8.72188 16.3969 9.36563C16.9656 10.0094 17.25 10.7625 17.25 11.625C17.25 12.5625 16.9219 13.3594 16.2656 14.0156C15.6094 14.6719 14.8125 15 13.875 15H9.75C9.3375 15 8.98438 14.8531 8.69063 14.5594C8.39688 14.2656 8.25 13.9125 8.25 13.5V9.6375L7.05 10.8L6 9.75L9 6.75L12 9.75L10.95 10.8L9.75 9.6375V13.5H13.875C14.4 13.5 14.8438 13.3188 15.2062 12.9563C15.5687 12.5938 15.75 12.15 15.75 11.625C15.75 11.1 15.5687 10.6563 15.2062 10.2938C14.8438 9.93125 14.4 9.75 13.875 9.75H12.75V8.25C12.75 7.2125 12.3844 6.32812 11.6531 5.59688C10.9219 4.86563 10.0375 4.5 9 4.5C7.9625 4.5 7.07812 4.86563 6.34688 5.59688C5.61562 6.32812 5.25 7.2125 5.25 8.25H4.875C4.15 8.25 3.53125 8.50625 3.01875 9.01875C2.50625 9.53125 2.25 10.15 2.25 10.875C2.25 11.6 2.50625 12.2188 3.01875 12.7313C3.53125 13.2438 4.15 13.5 4.875 13.5H6.75V15H4.875Z"
                          fill="white"
                        />
                      </g>
                    </svg>
                    Bulk Job Upload
                  </button>
                  <img
                    className="max-w-[98px] max-h-[78px] object-cover"
                    src={"/images/bulkupload1.png"}
                    alt=""
                  />
                </div>
              </div>
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
                        ? "Company Name"
                        : filter.heading
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
                        fontSize: "14px",
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
      {/* )} */}
      {openPopup && (
       <BulkUploadPopUp setOpenPopup={setOpenPopup} />
      )}
    </>
  );
}

export default JobPosting;
