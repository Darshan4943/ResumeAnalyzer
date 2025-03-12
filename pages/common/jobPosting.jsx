import axios from "axios";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MiniLoader from "../../components/common/miniLoader";
import JobCard from "./hiring/jobCard";
import { useSelector } from "react-redux";
import Select from "react-select";
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
function JobPosting() {
  const router = useRouter();
  const [companyData, setCompanyData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
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
          `http://192.168.1.161:2000/api/company/getCompaniesById/${userDataGlobal?._id}`,
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
        `http://192.168.1.161:2000/api/jobs/getDistinctJobTitlesAndLocations/${userDataGlobal?._id}`
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

  const [file, setFile] = useState(null);

  const allowedFileTypes = [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "text/csv", // .csv
  ];

  const handleDrop = (e) => {
    e.preventDefault();
    setError(""); // Reset error
    const droppedFile = e.dataTransfer.files[0];
    validateFile(droppedFile);
  };

  const handleFileChange = (e) => {
    setError(""); // Reset error
    setFile(e.target.files[0]);

    const selectedFile = e.target.files[0];
    validateFile(selectedFile);
  };

  const validateFile = (file) => {
    if (file) {
      if (allowedFileTypes.includes(file.type)) {
        setFile(file);
        setError("");
      } else {
        setError("Invalid file type. Please upload a .xls or .csv file.");
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file");
      return;
    }

    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `http://localhost:2000/api/job/bulkUploadJobs/${userDataGlobal?._id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setMessage(response.data.message);

      toast.success(response.data.message);

      setOpenPopup(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error uploading file");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      {loading ? (
        <div className="w-full justify-center">
          <MiniLoader />
        </div>
      ) : (
        
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-col gap-6">
            <div className="flex gap-6 flex-col  scr1024:flex-row">
              {companyData?.length > 0 && (
                <div className="flex flex-col bg-white rounded-[16px] p-4">
                  <p className="text-[16px] font-medium">
                    Choose an existing company <br />
                    from the dropdown list.
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
                  details & upload in one click.
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
      )}
      {openPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[9999] flex justify-center items-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setOpenPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>

            <h2 className="text-[18px] font-[600] text-center mb-4">
              Upload Bulk Jobs
            </h2>

            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-blue bg-[#EFFAFF]  rounded-md p-6 text-center mb-4"
            >
              <div className="flex items-center gap-[16px] justify-center">
                <div>
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_9696_113401)">
                      <path
                        d="M21.7975 12.9867V7.30933C21.7975 7.14683 21.7225 6.99668 21.6163 6.87789L15.2511 0.193863C15.1323 0.0688933 14.9634 0 14.7947 0H4.70285C2.83975 0 1.35156 1.51932 1.35156 3.38264V22.4656C1.35156 24.329 2.83975 25.8233 4.70285 25.8233H12.6688C14.1756 28.3243 16.9144 30 20.0342 30C24.7737 30 28.6441 26.1483 28.6441 21.4027C28.6505 17.2572 25.6741 13.7933 21.7975 12.9867ZM15.42 2.19475L19.6905 6.69021H16.9205C16.0952 6.69021 15.42 6.00883 15.42 5.18348V2.19475ZM4.70285 24.5727C3.53372 24.5727 2.60217 23.6348 2.60217 22.4656V3.38264C2.60217 2.2071 3.53372 1.25061 4.70285 1.25061H14.1694V5.18348C14.1694 6.7028 15.4012 7.94082 16.9205 7.94082H20.5469V12.824C20.3595 12.8178 20.2093 12.7991 20.0468 12.7991C17.8647 12.7991 15.8576 13.637 14.3445 14.9501H6.40366C6.05966 14.9501 5.77836 15.2314 5.77836 15.5752C5.77836 15.9192 6.05966 16.2005 6.40366 16.2005H13.1815C12.7375 16.8258 12.3685 17.4511 12.0811 18.1389H6.40366C6.05966 18.1389 5.77836 18.4202 5.77836 18.7642C5.77836 19.1079 6.05966 19.3895 6.40366 19.3895H11.6746C11.5182 20.0148 11.437 20.7087 11.437 21.4027C11.437 22.5281 11.6558 23.6412 12.0497 24.5791H4.70285V24.5727ZM20.0407 28.7558C15.989 28.7558 12.6938 25.4606 12.6938 21.4089C12.6938 17.3572 15.9826 14.062 20.0407 14.062C24.0985 14.062 27.3873 17.3572 27.3873 21.4089C27.3873 25.4606 24.0923 28.7558 20.0407 28.7558Z"
                        fill="#06A9EF"
                      />
                      <path
                        d="M6.40655 13.067H12.7404C13.0844 13.067 13.3657 12.7855 13.3657 12.4417C13.3657 12.0977 13.0844 11.8164 12.7404 11.8164H6.40655C6.06255 11.8164 5.78125 12.0977 5.78125 12.4417C5.78125 12.7855 6.06255 13.067 6.40655 13.067Z"
                        fill="#06A9EF"
                      />
                      <path
                        d="M20.4868 16.7938C20.3681 16.6688 20.2055 16.5938 20.0305 16.5938C19.8554 16.5938 19.6929 16.6688 19.5741 16.7938L15.9099 20.7267C15.6723 20.9768 15.6911 21.3769 15.9413 21.6083C16.1914 21.8459 16.5977 21.8271 16.8353 21.5772L19.4239 18.8073V25.635C19.4239 25.979 19.7052 26.2603 20.0492 26.2603C20.393 26.2603 20.6745 25.979 20.6745 25.635V18.8073L23.2442 21.5772C23.3694 21.7083 23.5319 21.7772 23.7008 21.7772C23.8507 21.7772 24.0009 21.7209 24.1258 21.6083C24.376 21.3707 24.3948 20.9768 24.1572 20.7267L20.4868 16.7938Z"
                        fill="#06A9EF"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_9696_113401">
                        <rect width="30" height="30" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

                <div>
                  <div className="flex text-[12px] gap-1 font-[400]">
                    <label
                      htmlFor="file-upload"
                      className="text-[#06A9EF] cursor-pointer hover:underline"
                    >
                      Browse
                    </label>
                    file or drag and drop
                  </div>
                  <div className="flex text-[12px] font-[400]">
                    Allowed file formats: XLS, CSV
                  </div>
                </div>
              </div>

              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".xls, .xlsx, .csv"
              />
            </div>

            {file && (
              <div className="text-green-500 text-sm mb-2">
                {file.name} uploaded successfully!
              </div>
            )}

            {error && <div className="text-red-500 text-sm mb-2"> {error}</div>}

            <div className="flex justify-center gap-4 mb-4">
              <a
                href="https://freedygo-storage-bucket-production.s3.ap-south-1.amazonaws.com/Skilotech/job_details.xlsx"
                download="job_details.xlsx"
                className="border-[#06A9EF] border-[1px] text-[12px] font-[600] px-4 py-2 rounded-[30px] flex gap-2 items-center"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 8.68125C5.9 8.68125 5.80625 8.66562 5.71875 8.63437C5.63125 8.60312 5.55 8.55 5.475 8.475L2.775 5.775C2.625 5.625 2.55313 5.45 2.55938 5.25C2.56563 5.05 2.6375 4.875 2.775 4.725C2.925 4.575 3.10312 4.49688 3.30937 4.49063C3.51562 4.48438 3.69375 4.55625 3.84375 4.70625L5.25 6.1125V0.75C5.25 0.5375 5.32188 0.359375 5.46562 0.215625C5.60938 0.071875 5.7875 0 6 0C6.2125 0 6.39063 0.071875 6.53438 0.215625C6.67813 0.359375 6.75 0.5375 6.75 0.75V6.1125L8.15625 4.70625C8.30625 4.55625 8.48438 4.48438 8.69063 4.49063C8.89688 4.49688 9.075 4.575 9.225 4.725C9.3625 4.875 9.43438 5.05 9.44063 5.25C9.44688 5.45 9.375 5.625 9.225 5.775L6.525 8.475C6.45 8.55 6.36875 8.60312 6.28125 8.63437C6.19375 8.66562 6.1 8.68125 6 8.68125ZM1.5 12C1.0875 12 0.734375 11.8531 0.440625 11.5594C0.146875 11.2656 0 10.9125 0 10.5V9C0 8.7875 0.071875 8.60938 0.215625 8.46563C0.359375 8.32188 0.5375 8.25 0.75 8.25C0.9625 8.25 1.14062 8.32188 1.28437 8.46563C1.42813 8.60938 1.5 8.7875 1.5 9V10.5H10.5V9C10.5 8.7875 10.5719 8.60938 10.7156 8.46563C10.8594 8.32188 11.0375 8.25 11.25 8.25C11.4625 8.25 11.6406 8.32188 11.7844 8.46563C11.9281 8.60938 12 8.7875 12 9V10.5C12 10.9125 11.8531 11.2656 11.5594 11.5594C11.2656 11.8531 10.9125 12 10.5 12H1.5Z"
                    fill="#333333"
                  />
                </svg>
                Download CSV File
              </a>

              <button
                onClick={() => {
                  handleUpload();
                }}
                className="bg-blue text-white text-[12px] font-[600] px-4 py-2 rounded-[30px] "
              >
                Upload
              </button>
            </div>

            <p className="text-red text-center text-[12px] font-[400] cursor-pointer hover:underline">
              Download a blank CSV file with the required headers
            </p>
          </div>
        </div>
      )}
      
    </>
  );
}

export default JobPosting;
