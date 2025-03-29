import React, { useEffect, useState } from "react";
import { TablePagination } from "@mui/material";
import Select from "react-select";
import { useRouter } from "next/router";
import CreateNewJob from "./CreateNewJob";
import axios from "axios";
import MiniLoader from "../../../components/common/miniLoader";
import CustomPagination from "../../../components/common/CustomPagination";
import { useSelector } from "react-redux";
import { currenciesWithIcons } from "../../../utils/data";

function JobPosting() {
  const router = useRouter();
  const query = router.query;
  const [openSort, setOpenSort] = useState(false);
  const [toggle, setToggle] = useState(0);
  const [filterData, setFilterData] = useState({ Status: "Approved" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [requisitions, setRequisitions] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalpages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [miniLoading, setMiniloading] = useState(true);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
 const [company, setCompany] = useState();
  // useEffect(() => {
  //   setFilterData((prev) => ({
  //     ...prev,
  //     ["Status"]: "Approved",
  //   }));
  // }, []);


 

  useEffect(() => {
    if (query.content === "CreateNewJob") {
      setToggle(1);
    } else {
      setToggle(0);
    }
  }, [router.query]);

  const toggleContent = () => {
    const CreateNewJob = toggle ? "" : "CreateNewJob";
    router.push(`JobPosting/?content=${CreateNewJob}`);
    setToggle((prevToggle) => !prevToggle);
  };

  const headings = [
    "Job Title",
    "No. of Openings",
    "Location",
    "Budget",
    "Requested by",
    "Hiring Period",
  ];

  useEffect(() => {
    const fetchAttributes = async () => {
      try {
        const response = await axios.get(
          `https://dev.api.skilotech.com/api/getRequisitionTitel/${userDataGlobal?._id}`
        );
        const data = response.data;

        if (data && Array.isArray(data)) {
          const departments = [
            ...new Map(
              data.map((item) => [
                item.jobTitle.trim().toLowerCase(),
                item.jobTitle,
              ])
            ).values(),
          ];

          const locations = [
            ...new Map(
              data.flatMap((item) =>
                item.location.map((loc) => [loc.trim().toLowerCase(), loc])
              )
            ).values(),
          ];

          const priorities = [
            ...new Set(
              data.map((item) => (item.isPriority ? "Yes" : "No").toLowerCase())
            ),
          ].map((priority) => (priority === "yes" ? "Yes" : "No"));

          setHeadings((prevHeadings) => [
            {
              ...prevHeadings[0],
              options: departments,
            },
            {
              ...prevHeadings[1],
              options: locations,
            },
            // {
            //   ...prevHeadings[2],
            //   options: ["Approved"],
            // },
            {
              ...prevHeadings[3],
              options: priorities,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching job attributes:", error);
      }
    };

    if (userDataGlobal?._id) {
      fetchAttributes();
    }
  }, [userDataGlobal?._id]);

  const [search, setHeadings] = useState([
    {
      key: "Department",
      heading: "Job Title",
      options: [],
    },
    {
      key: "location",
      heading: "Location",
      options: [],
    },
    {
      key: "status",
      heading: "Status",
      options: ["Approved"],
    },
    {
      key: "priority",
      heading: "Priority",
      options: ["Yes", "No"],
    },
  ]);

  const handleHeadingChange = (selectedOption, index) => {
    const selectedKey = search[index]?.key;

    setFilterData((prev) => ({
      ...prev,
      [selectedKey]: selectedOption ? selectedOption.value : "",
    }));

    setHeadings((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              heading: selectedOption ? selectedOption.value : item.key,
            }
          : item
      )
    );
  };

  useEffect(() => {
    setLoading(true);
    setMiniloading(true);
    const fetchRequisitions = async () => {
      try {
        const response = await axios.get(
          `https://dev.api.skilotech.com/api/getrequisitions/${userDataGlobal._id}`,
          {
            params: {
              ...filterData,
              page,
              limit,
            },
          }
        );
        setRequisitions(response.data.data);
        setTimeout(() => {
          setMiniloading(false);
          setLoading(false);
        }, 500);
        setTotalCount(response.data.pagination.totalCount);
        setTotalpages(response.data.pagination.totalPages);
      } catch (error) {
        setError("Failed to fetch requisitions");
        setTimeout(() => {
          setMiniloading(false);
          setLoading(false);
        }, 500);
        console.error("Error fetching requisitions:", error);
      }
    };

    fetchRequisitions();
  }, [filterData, page, limit]);

  const handleChangePage = (event, newPage) => {
    console.log("New Page:", newPage);
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
  };

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
  };

  const getCurrencyIcon = (currency) => {
    const icon = currenciesWithIcons?.find(
      (item) => item?.icon?.toLowerCase() === currency?.toLowerCase()
    );

    return icon?.symbol || "";
  };

  return (
    <>
      <div>
        {toggle === 0 && (
          <div>
            <div className="hidden ml:block">
              <div className="flex flex-col gap-[16px]">
                <div className="h-[74px] w-full bg-[#fff] p-[16px] rounded-[6px] flex flex-row items-center justify-between sticky top-0">
                  <p className="  text-[18px] font-[500px]">
                    Approved Job Requisitions
                  </p>
                  <button
                    onClick={toggleContent}
                    className=" bg-[#06A9EF] rounded-[30px] text-[14px] font-[600] text-white px-[36px] py-[12px]"
                  >
                    + Create New Job
                  </button>
                </div>

                <div className=" flex flex-col gap-[16px] ">
                  <div className="w-full p-[16px] bg-[#FFFFFF] rounded-[6px]">
                    <div className="w-full flex items-center gap-[10px] border-[1px] border-[#D3D3D3] border-solid px-[12px] py-[10px] rounded-[6px]">
                      {search.map((headingObj, index) => (
                        <div className="w-full" key={index}>
                          <Select
                            options={headingObj.options.map((option) => ({
                              value: option,
                              label: option,
                            }))}
                            onChange={(selectedOption) =>
                              handleHeadingChange(selectedOption, index)
                            }
                            value={
                              filterData[headingObj.heading]
                                ? {
                                    label: filterData[headingObj.heading],
                                    value: filterData[headingObj.heading],
                                  }
                                : null
                            }
                            placeholder={headingObj.heading}
                            isSearchable={true}
                            noOptionsMessage={() => "No options available"}
                            styles={customStyles}
                          />
                          {index < headings.length - 1 && <div></div>}
                        </div>
                      ))}

                      {/* <button className="bg-[#06A9EF] px-[36px] py-[12px] rounded-[36px] text-[#FFFFFF] text-[14px] font-[600]">
                        Search
                      </button> */}
                    </div>
                  </div>

                  <div>
                    <div className="bg-[#E0F6FF] flex flex-row p-[16px] gap-4 justify-center items-center">
                      {headings.map((req, index) => (
                        <div
                          key={index}
                          className="w-[14%] text-[16px] font-[600] text-start"
                        >
                          {req}
                        </div>
                      ))}
                      <div className="min-w-[115px] text-[16px] font-[600] text-end">
                        <p>Action</p>
                      </div>
                    </div>

                    {loading ? (
                      <div className="min-h-[360px] flex justify-center items-center">
                        <MiniLoader />
                      </div>
                    ) : (
                      <div>
                        {requisitions.length > 0 ? (
                          requisitions.map((requisition, index) => (
                            <div
                              key={index}
                              className={`w-full bg-[#FFFFFF] p-[16px] flex justify-between items-center border-b-[1px] border-b-[#DEDEDE] ${
                                index % 2 === 0 ? "bg-[#FFF]" : "bg-[#E0F6FF]"
                              }`}
                            >
                              <div className="w-[14%] text-start">
                                <p className="text-[14px] font-[500] text-[#06A9EF]">
                                  {requisition.requisitionType}
                                </p>
                                <p className="text-[14px] font-[500] text-[#333333]">
                                  {requisition.jobTitle}
                                </p>
                              </div>
                              <p className="text-[14px] w-[14%] text-start font-[500] text-[#333333]">
                                {requisition.positions
                                  ? `${requisition.positions} positions`
                                  : "-"}
                              </p>
                              <p className="text-[14px] w-[14%] text-strat font-[500] text-[#333333] flex flex-col">
                                {requisition.location &&
                                requisition.location.length > 0 ? (
                                  requisition.location.length > 2 ? (
                                    <div className="flex flex-col">
                                      {requisition.location.map(
                                        (loc, index) => (
                                          <span key={index}>
                                            {loc}
                                            {index !==
                                              requisition.location.length - 1 &&
                                              ","}
                                          </span>
                                        )
                                      )}
                                    </div>
                                  ) : (
                                    requisition.location.join(", ")
                                  )
                                ) : (
                                  "Not Available"
                                )}
                              </p>

                              <p className="text-[14px] w-[14%] text-start font-[500] text-[#333333]">
                                <>
                                  {getCurrencyIcon(requisition.currency)}{" "}
                                  {requisition.budgetFrom || 0} -{" "}
                                  {getCurrencyIcon(requisition.currency)}{" "}
                                  {requisition.budgetTo || ""}
                                </>
                              </p>
                              <p className="text-[14px] w-[14%] text-start font-[500] text-[#333333]">
                                {requisition?.createdByName || "-"}
                              </p>

                              <p className="text-[14px] w-[14%] text-start font-[500] text-[#333333]">
                                {requisition.hiringDate ? (
                                  <>
                                    {new Date(
                                      requisition.hiringDate
                                    ).toLocaleDateString("en-GB", {
                                      day: "numeric",
                                      month: "short",
                                      year: "numeric",
                                    })}
                                  </>
                                ) : (
                                  <>-</>
                                )}
                              </p>

                              {requisition?.jobStatus ? (
                                <div className="rounded-[30px]  border border-blue px-[26px] py-1 text-[14px] font-medium opacity-50">
                                  Posted
                                </div>
                              ) : (
                                <button
                                  onClick={() =>
                                    router.push(
                                      `/common/jobPosting/CreateNewJob?reqId=${requisition?._id}`
                                    )
                                  }
                                  className="bg-white px-[14px] py-[6px] flex justify-center items-center min-w-[90px] gap-[4px] border-[1px] border-solid border-[#06A9EF] rounded-[20px] text-[12px] font-[600]"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                  >
                                    <g mask="url(#mask0_4754_60413)">
                                      <path
                                        d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z"
                                        fill="#333333"
                                      />
                                    </g>
                                  </svg>
                                  Post Job
                                </button>
                              )}
                            </div>
                          ))
                        ) : (
                          <div className="p-12 flex items-center justify-center">
                            <img
                              className="h-[114px] w-[200px]"
                              src="/images/employer/OBJECTS.png"
                              alt="No data available"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mobile ml:hidden relative flex flex-col gap-3 overflow-y-scroll ">
              <div className="sticky top-0">
                <div className=" bg-[#fff] p-[12px]  flex flex-col ms:flex-row gap-[12px] z-[500] justify-between rounded-t-[12px] ">
                  <p className="h-[29px] text-[18px] ml:text-[24px] font-[500px]">
                    Approved Job Requisitions
                  </p>

                  <button
                    onClick={toggleContent}
                    className=" py-[8px] px-[12px] bg-[#06A9EF] rounded-lg text-[14px] ml:text-[16px] w-[159px] text-white "
                  >
                    + Create New Job
                  </button>
                </div>
                <div className="flex relative gap-[1px] pt-2 ml:w-[20%] w-full">
                  <div
                    onClick={() => setOpenSort(true)}
                    className=" w-full py-[12px] px-[16px] text-[#333] text-[14px] font-[600] justify-end flex gap-[8px] items-center bg-[#fff]"
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
                      style={{ boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)" }}
                      className="absolute top-[50px] right-0 flex flex-col gap-4 rounded-md bg-white p-4 z-50 w-64"
                    >
                      {search.map((headingObj, index) => (
                        <div className="w-full" key={index}>
                          <Select
                            options={headingObj.options.map((option) => ({
                              value: option,
                              label: option,
                            }))}
                            onChange={(selectedOption) =>
                              handleHeadingChange(selectedOption, index)
                            }
                            value={
                              filterData[headingObj.heading]
                                ? {
                                    label: filterData[headingObj.heading],
                                    value: filterData[headingObj.heading],
                                  }
                                : null
                            }
                            placeholder={headingObj.heading}
                            isSearchable={true}
                            noOptionsMessage={() => "No options available"}
                            styles={customStyles}
                          />
                        </div>
                      ))}

                      <button
                        onClick={() => setOpenSort(false)}
                        className="bg-[#06A9EF] px-6 py-3 rounded-md text-white text-sm font-semibold hover:bg-[#048ccf] transition"
                      >
                        Search
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {requisitions.length > 0 ? (
                requisitions.map((requisition, index) => (
                  <div
                    key={index}
                    className="p-[12px] bg-[#fff] rounded-[12px] gap-[16px] border-[0.5px] border-solid border-[#DEDEDE] mb-[8px]"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex flex-col gap-[2px]">
                        <div className="text-[12px] font-[500] text-[#06A9EF]">
                          {requisition.requisitionType}
                        </div>
                        <div className="text-[#646464] text-[10px] font-[500]">
                          {requisition.jobTitle}
                        </div>
                      </div>
                      <div className="text-[#333] text-[12px] font-[500]">
                        {requisition.location &&
                        requisition.location.length > 0 ? (
                          requisition.location.length > 2 ? (
                            <div className="flex flex-col">
                              {requisition.location.map((loc, index) => (
                                <span key={index}>
                                  {loc}
                                  {index !== requisition.location.length - 1 &&
                                    ","}
                                </span>
                              ))}
                            </div>
                          ) : (
                            requisition.location.join(", ")
                          )
                        ) : (
                          "Not Available"
                        )}
                      </div>
                    </div>
                    <div className="flex justify-evenly">
                      <div className="text-center">
                        <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                          Requested by
                        </div>
                        <div className="text-[#333] text-[12px] font-[500]  ">
                          {requisition?.createdByName || "-"}
                          <div className="text-[#646464] text-[10px] font-[500]"></div>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="py-[6px] px-[12px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                          Budget
                        </div>
                        <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                          <>
                            {getCurrencyIcon(requisition.currency)}{" "}
                            {requisition.budgetFrom || 0} -{" "}
                            {getCurrencyIcon(requisition.currency)}{" "}
                            {requisition.budgetTo || ""}
                          </>
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="p-[6px] rounded-[2px] bg-[#FFFADD] text-[#333] text-[12px] font-[500]">
                          Open Position
                        </div>
                        <div className="text-[#333] text-[12px] font-[500] py-[6px] ">
                          {requisition.positions
                            ? `${requisition.positions} positions`
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-center py-[6px] px-[12px] border-[1px] border-solid border-[#FF7A00] text-[14px] font-[600] text-[#FF7A00] rounded-[80px]">
                        {new Date(requisition.hiringDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </div>
                      {requisition?.jobStatus ? (
                        <div className="rounded-[30px] px-[12px] py-[6px] border border-blue">
                          Posted
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            router.push(
                              `/common/jobPosting/CreateNewJob?reqId=${requisition?._id}`
                            )
                          }
                          className="px-[12px] py-[6px] flex  min-w-[115px] items-center  gap-[4px] border-[1px] border-solid border-[#06A9EF] rounded-[8px] text-[12px] text-[#333] font-[500] "
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g mask="url(#mask0_4754_60413)">
                              <path
                                d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                          Post Job
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-3 w-full flex items-center justify-center">
                  <img
                    src="/images/employer/OBJECTS.png"
                    className="h-[114px] w-[200px]"
                    alt="No data available"
                  />
                </div>
              )}
            </div>
            {requisitions.length > 10 && (
              <CustomPagination
                setMiniloading={setMiniloading}
                miniLoading={miniLoading}
                setPage={setPage}
                title={"Jobs"}
                setLimit={setLimit}
                totalPages={totalPages}
                limit={limit}
                page={page}
                isBackground={true}
              />
            )}
          </div>
        )}

        {toggle === 1 && <CreateNewJob setToggle={setToggle} />}
      </div>
    </>
  );
}

export default JobPosting;
