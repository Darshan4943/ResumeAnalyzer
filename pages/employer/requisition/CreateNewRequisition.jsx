import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { useSelector } from "react-redux";
import { PlusAddLogo } from "../../../utils/svg";
import { currencyMap } from "../../../utils/data";

const CreateNewRequisition = ({ setToggle }) => {
  const router = useRouter();
  const [successfull, setSuccessfull] = useState(false);
  const jobSectorOptions = [
    "Information Technology",
    "Healthcare",
    "Education",
    "Finance",
    "Manufacturing",
    "Construction",
    "Retail",
    "Hospitality",
    "Transportation",
    "Energy",
    "Government",
    "Entertainment",
    "Real Estate",
    "Agriculture",
    "Telecommunications",
    "Marketing and Advertising",
    "Legal Services",
    "Non-Profit",
    "Science and Research",
    "Aerospace",
  ];

  const jobSectors = jobSectorOptions.map((sector) => ({
    value: sector,
    label: sector,
  }));
  const [levels, setLevels] = useState([
    { id: 1, level: "Level 1", name: "", email: "" },
  ]);

  const [showApprovalChain, setShowApprovalChain] = useState(false);
  const [approvalChoice, setApprovalChoice] = useState("no");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [loactionText, setLoactionText] = useState("");

  const experienceOptions = [
    { value: "", label: "Select" },
    { value: "0-2 years", label: "0-2 years" },
    { value: "2-5 years", label: "2-5 years" },
    { value: "5-10 years", label: "5-10 years" },
    { value: "10-20 years", label: "10-20 years" },
    { value: "20 +", label: "20 +" },
  ];

  const [data, setData] = useState({
    jobTitle: "",
    positions: "",
    isPriority: false,
    budgetFrom: "",
    budgetTo: "",
    experience: "",
    requisitionType: "",
    location: [],
    department: "",
    hiringDate: "",
    jobType: "",
    comments: "",
    description: "",
    isApprovalchain: false,
    RequisitionLevel: [
      {
        id: 1,
        name: "",
        email: "",
        level: "Level 1",
      },
    ],
  });

  const handleClear = () => {
    setData({
      jobTitle: "",
      positions: "",
      isPriority: false,
      budgetFrom: "",
      budgetTo: "",
      experience: "",
      requisitionType: "",
      location: [],
      department: "",
      hiringDate: "",
      jobType: "",
      description: "",
      RequisitionLevel: [
        {
          id: 1,
          name: "",
          email: "",
        },
      ],
    });
    setErrors({});
  };

  const nevigate = () => {
    router.push("/employer/requisition");
  };

  const validateFields = () => {
    let newErrors = {};

    if (!data.jobTitle) newErrors.jobTitle = "Job Title is required.";
    if (!data.positions)
      newErrors.positions = "Number of Positions is required.";
    if (!data.budgetFrom) newErrors.budgetFrom = "Budget From is required.";
    if (!data.budgetTo) newErrors.budgetTo = "Budget To is required.";
    if (!data.experience) newErrors.experience = "Experience is required.";
    if (!data.requisitionType)
      newErrors.requisitionType = "Requisition Type is required.";
    if (!data.location || data.location.length === 0) {
      newErrors.location = "Location is required.";
    }
      if (!data.description)
      newErrors.description = "Job Description is required.";
    if (approvalChoice === "yes") {
      data.RequisitionLevel.forEach((level, index) => {
        if (!level.name)
          newErrors[`name_${index}`] = "Role / Employee is required.";
        if (!level.email) newErrors[`email_${index}`] = "Email is required.";
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!validateFields()) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `https://dev.api.skilotech.com/api/creatrequasetion/${userDataGlobal?._id}`,
        {
          ...data,
          createdBy: userDataGlobal?._id,
          companyId: userDataGlobal?.companyId,
          createdByName: `${userDataGlobal?.firstName} ${userDataGlobal?.lastName}`,
        }
      );

      setSuccessfull(true);
      // toast.success("Requisition created successfully", response.data);
    } catch (error) {
      setLoading(false);
      toast.error(
        `Error creating requisition: ${
          error.response?.data?.message || error.message
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e, name) => {
    const { value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleChange1 = (value) => {
    setData((prevData) => ({
      ...prevData,
      description: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      description: "",
    }));
  };

  const handleChange2 = (e, index, field) => {
    const { value } = e.target;

    setData((prevState) => {
      const updatedLevels = [...prevState.RequisitionLevel];

      if (updatedLevels[index]) {
        updatedLevels[index][field] = value;
      }

      return {
        ...prevState,
        RequisitionLevel: updatedLevels,
      };
    });
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[`${field}_${index}`];
      return newErrors;
    });
  };

  const addLevel = () => {
    const newLevel = {
      id: levels.length + 1,
      // name: `Level ${levels.length + 1}`,
      level: `Level ${levels.length + 1}`,
    };
    setLevels([...levels, newLevel]);
    setData({
      ...data,
      RequisitionLevel: [...data.RequisitionLevel, newLevel],
    });
  };

  const deleteLevel = (id) => {
    if (id === 1) return;
    const updatedLevels = levels.filter((level) => level.id !== id);
    setLevels(updatedLevels);
    setData({
      ...data,
      RequisitionLevel: updatedLevels,
    });
  };

  const handleApprovalChoice = (value) => {
    setApprovalChoice(value);
    setShowApprovalChain(value === "yes");

    setData((prevData) => ({
      ...prevData,
      isApprovalchain: value === "yes",
    }));
  };
  const currencyOptions = currencyMap.map((item) => ({
    value: item.currency,
    label: item.currency,
  }));
  const dateInputRef = useRef(null);

  const renderHeader = () => {
    return (
      <span className="ql-formats">
        <button className="ql-bold" aria-label="Bold"></button>
        <button className="ql-italic" aria-label="Italic"></button>
        <button className="ql-underline" aria-label="Underline"></button>
        <button className="ql-strike" aria-label="Strike"></button>
        <button
          className="ql-list"
          value="ordered"
          aria-label="Ordered List"
        ></button>
        <button
          className="ql-list"
          value="bullet"
          aria-label="Unordered List"
        ></button>
        <button className="ql-align" aria-label="Align Left"></button>
        <button
          className="ql-align"
          value="center"
          aria-label="Align Center"
        ></button>
        <button
          className="ql-align"
          value="right"
          aria-label="Align Right"
        ></button>
      </span>
    );
  };
  const header = renderHeader();
  return (
    <div className="flex ml:flex-row flex-col gap-[20px] ml:max-h-[80vh] pb-[24px] ">
      <div
        className=" ml:w-[60%] w-[100%] flex flex-col gap-4 rounded-[16px] py-2 bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="overflow-y-auto p-4 flex flex-col gap-4 ">
          <div className=" w-[full] text-[24px] font-[500px] flex gap-2 items-center ">
            <img
              onClick={router.back}
              className=" ms:w-[28px] ms:h-[28px] w-[24px] h-[24px] cursor-pointer"
              src="/images/employer/Icon_left.png"
              alt=""
            />
            Create New Requisition
          </div>

          <div className="flex sm:flex-row flex-col gap-4  ">
            <div className="flex flex-col gap-2  sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium">
                Job Title <span className="text-red">*</span>
              </p>
              <input
                type="text"
                value={data.jobTitle}
                onChange={(e) => handleChange(e, "jobTitle")}
                placeholder="Eg: Product Manager"
                className={`h-[38px] px-[16px] py-[8px] border-[1px] border-solid 
                  ${errors.jobTitle ? "border-red" : "border-[#DEDEDE]"} 
                  rounded-[6px] placeholder:text-[12px] text-[12px] text-[#646464] font-[400]`}
              />
            </div>
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className="  text-[14px]  font-medium">
                Number of Positions <span className="text-red">*</span>{" "}
              </p>
              <input
                type="text"
                value={data.positions}
                // onChange={(e) => handleChange(e, "positions")}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleChange(e, "positions");
                  }
                }}
                placeholder="Enter Number"
                className={`h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] placeholder:text-[12px] text-[12px] text-[#646464] font-[400]  ${
                  errors.positions ? "border-red" : "border-[#DEDEDE]"
                }  `}
              />
            </div>
          </div>

          <div className=" flex flex-row gap-2">
            <input
              type="checkbox"
              checked={data.isPriority}
              onChange={(e) => handleChange(e, "isPriority")}
              className="border border-[#06A9EF] text-[14px]  font-medium custom-checkbox"
            />
            <p>Mark as priority</p>
          </div>

          <div className="flex flex-col gap-[8px] justify-between w-full">
            <p className="text-[14px]  font-medium">
              Budget <span className="text-red">*</span>
            </p>
            <div className="flex  sm:flex-row flex-col gap-4 ">
              <div className="sm:w-[49.01%] flex justify-between w-[100%] gap-4">
                <div
                  className={`border-[1px] w-[45%] border-solid rounded-[6px] ${
                    errors.budgetFrom ? "border-red" : "border-[#DEDEDE]"
                  }`}
                >
                  <ReactSelect
                    options={currencyOptions}
                    className="w-[100%] flex  items-center CurrencyClass py-1 rounded-[8px] placeholder:text-[12px] text-[12px] text-[#646464] font-[400] font-montserrat font-small  h-[40px]"
                    placeholder="Select Currency"
                    value={
                      currencyOptions.find(
                        (option) => option.value === data?.currency
                      ) || null
                    }
                    onChange={(value) => {
                      setData({ ...data, currency: value.value });
                      setErrors({});
                    }}
                    styles={{
                      control: (provided) => ({
                        ...provided,
                        border: "none",
                        width: "100%",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 1,
                        position: "absolute",
                      }),
                    }}
                  />
                </div>
                <input
                  type="text"
                  value={data.budgetFrom}
                  // onChange={(e) => handleChange(e, "budgetFrom")}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      handleChange(e, "budgetFrom");
                    }
                  }}
                  placeholder="From"
                  className={`h-[40px] w-[55%] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px]   placeholder:text-[12px] text-[12px] text-[#646464] font-[400]  ${
                    errors.budgetFrom ? "border-red" : "border-[#DEDEDE]"
                  }  `}
                />
              </div>
              <input
                type="text"
                value={data.budgetTo}
                // onChange={(e) => handleChange(e, "budgetTo")}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) {
                    handleChange(e, "budgetTo");
                  }
                }}
                placeholder="To"
                className={`h-[40px]  px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px]  sm:w-[49.01%] w-[100%] placeholder:text-[12px] text-[12px] text-[#646464] font-[400]  ${
                  errors.budgetTo ? "border-red" : "border-[#DEDEDE]"
                }  `}
              />
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className=" text-[14px]  font-medium">
                Experience <span className="text-red">*</span>
              </p>
              <div
                className={`flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px] font-montserrat font-small relative min-w-[100px] overflow-hidden h-[40px] ${
                  errors.experience ? "border-red" : "border-[#DEDEDE]"
                }  `}
              >
                <select
                  style={{
                    WebkitAppearance: "none",
                    MozAppearance: "none",
                    appearance: "none",
                    position: "relative",
                    background: "transparent",
                  }}
                  value={data?.experience}
                  onChange={(e) => {
                    const newExperience = e.target.value;
                    setData({ ...data, experience: newExperience });
                    if (errors.experience) {
                      setErrors((prev) => ({ ...prev, experience: false }));
                    }
                  }}
                  className="w-outline-none focus-visible:outline-none placeholder:text-[12px] text-[12px] text-[#646464] font-[400] p-2 w-full h-[48px]"
                >
                  {experienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <img
                  src="/images/down_arrow.png"
                  className="h-[20px] w-[20px] absolute right-[4px]"
                  alt=""
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium">
                Requisition Type <span className="text-red">*</span>
              </p>
              <select
                value={data.requisitionType}
                onChange={(e) => handleChange(e, "requisitionType")}
                className={`h-[38px] outline-none px-[16px] py-[8px]  border-[1px] border-solid border-[#DEDEDE] placeholder:text-[12px] text-[12px] text-[#646464] font-[400] rounded-[6px]  ${
                  errors.requisitionType ? "border-red" : "border-[#DEDEDE]"
                } `}
              >
                <option value="" disabled selected>
                  Select
                </option>
                <option value="product manager">Product Manager</option>
                <option value="developer">Developer</option>
                <option value="designer">Designer</option>
                <option value="marketing specialist">
                  Marketing Specialist
                </option>
                <option value="hr manager">HR Manager</option>
                <option value="sales representative">
                  Sales Representative
                </option>
                <option value="business analyst">Business Analyst</option>
                <option value="customer support">Customer Support</option>
                <option value="data scientist">Data Scientist</option>
                <option value="project manager">Project Manager</option>
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4  ">
            <div className="flex flex-col gap-2  sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium ">
                Location <span className="text-red">*</span>
              </p>
              <div
                className={`w-full flex gap-2 relative border rounded-[8px] px-2 py-[8px] h-[38px] ${
                  errors.location ? "border-red" : "border-[#DEDEDE]"
                }`}
              >
                <div className="flex flex-row overflow-x-auto gap-2 ">
                  {data?.location?.map((item, index) => (
                    <div
                      key={index}
                      className="py-[2px] px-[8px] bg-[#E5E5E5] rounded-[4px] flex flex-row gap-1 items-center placeholder:text-[12px] text-[12px] text-[#646464] font-[400] "
                    >
                      <span>{item}</span>
                      <span
                        className="text-[14px]  cursor-pointer font-medium "
                        onClick={() =>
                          setData({
                            ...data,
                            location: data.location.filter(
                              (data) => data != item
                            ),
                          })
                        }
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M3.43735 3.43564C3.58738 3.28566 3.79082 3.20141 4.00295 3.20141C4.21509 3.20141 4.41853 3.28566 4.56855 3.43564L8.00295 6.87004L11.4374 3.43564C11.5112 3.35923 11.5994 3.29828 11.697 3.25636C11.7946 3.21443 11.8996 3.19236 12.0058 3.19144C12.1121 3.19051 12.2174 3.21075 12.3157 3.25098C12.414 3.2912 12.5034 3.35061 12.5785 3.42572C12.6536 3.50083 12.713 3.59016 12.7532 3.68847C12.7934 3.78679 12.8137 3.89213 12.8128 3.99836C12.8118 4.10458 12.7898 4.20956 12.7478 4.30716C12.7059 4.40476 12.645 4.49304 12.5686 4.56684L9.13415 8.00124L12.5686 11.4356C12.7143 11.5865 12.7949 11.7886 12.7931 11.9984C12.7913 12.2081 12.7071 12.4088 12.5588 12.5571C12.4105 12.7054 12.2098 12.7896 12.0001 12.7914C11.7903 12.7932 11.5882 12.7126 11.4374 12.5668L8.00295 9.13244L4.56855 12.5668C4.41767 12.7126 4.21559 12.7932 4.00583 12.7914C3.79608 12.7896 3.59543 12.7054 3.4471 12.5571C3.29877 12.4088 3.21464 12.2081 3.21281 11.9984C3.21099 11.7886 3.29163 11.5865 3.43735 11.4356L6.87175 8.00124L3.43735 4.56684C3.28738 4.41681 3.20312 4.21337 3.20312 4.00124C3.20312 3.78911 3.28738 3.58566 3.43735 3.43564Z"
                            fill="#000000"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Location"
                  className="input w-[100px] placeholder:text-[12px] text-[12px] text-[#646464] font-[400]"
                  value={loactionText}
                  onChange={(e) => {
                    setLoactionText(e.target.value);
                  }}
                />
                <button
                  className=" absolute right-3 top-[8px] "
                  disabled={loactionText?.length == 0}
                  onClick={() => {
                    setData({
                      ...data,
                      location: [...data.location, loactionText],
                    });
                    setLoactionText("");

                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      location: "",
                    }));
                  }}
                >
                  <PlusAddLogo
                    color={loactionText?.length > 0 ? "#646464" : "#bebebe"}
                  />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className=" text-[14px]  font-medium">Department</p>
              <select
                value={data.department}
                onChange={(e) => handleChange(e, "department")}
                className="h-[38px] outline-none px-[16px] py-[8px] border-[1px] border-solid placeholder:text-[12px] text-[12px] text-[#646464] font-[400] border-[#DEDEDE] rounded-[6px] "
              >
                <option value="" disabled selected>
                  Select
                </option>
                {jobSectors.map((sector) => (
                  <option key={sector.value} value={sector.value}>
                    {sector.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4  ">
            <div
              onClick={() => dateInputRef.current?.focus()}
              className="flex flex-col gap-2 sm:w-[49.01%] w-[100%]"
            >
              <p className=" text-[14px]  font-medium">Target Hiring Date</p>
              <input
                type="date"
                value={data.hiringDate}
                onChange={(e) => handleChange(e, "hiringDate")}
                min={new Date().toISOString().split("T")[0]}
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] placeholder:text-[12px] text-[12px] text-[#646464] font-[400] rounded-[6px]"
              />
            </div>
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium">Job Type</p>
              <select
                value={data.jobType}
                onChange={(e) => handleChange(e, "jobType")}
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid placeholder:text-[12px] text-[12px] text-[#646464] font-[400] border-[#DEDEDE] rounded-[6px]"
              >
                <option value="" disabled selected>
                  Select{" "}
                </option>
                <option value="Full Time">Full Time </option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>

          <div className="text-[14px]  font-medium">
            <p>
              Job Description <span className="text-red">*</span>
            </p>
            <Editor
              headerTemplate={header}
              value={data.description}
              onTextChange={(e) => handleChange1(e.htmlValue)}
              style={{
                border: errors.description
                  ? "2px solid red"
                  : "2px solid #dedede",
                fontSize: "16px",
                color: "#333",
                padding: "10px",
                minHeight: "196px",
              }}
            />
          </div>
          <div className="flex flex-col  gap-[8px] ">
            <p className="text-[14px]  font-medium">Additional Comments</p>
            <textarea
              value={data.comments}
              onChange={(e) => handleChange(e, "comments")}
              className="h-[148px] outline-none border-[1px] border-solid border-[#DEDEDE] px-[16px] py-[8px] rounded-[6px] placeholder:text-[12px] text-[12px] text-[#646464] font-[400]"
              placeholder="Provide your comment"
            ></textarea>
          </div>
        </div>
      </div>

      <div
        className=" ml:w-[40%]  w-[100%] h-[100%] max-h-[80vh]  flex flex-col gap-4 py-2 rounded-[16px]  bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          <p className="text-[24px] font-medium w-full">
            Requisition Approval Chain
          </p>
          <p className="text[14px] w-full font-medium">
            Do you want to enable approval Chain for Requisition?
          </p>
          <div className="flex gap-[8px] items-center">
            <input
              type="radio"
              name="approvalChoice"
              value="yes"
              className="h-[20px] w-[20px] custom-radio"
              checked={approvalChoice === "yes"}
              onChange={(e) => handleApprovalChoice(e.target.value)}
            />
            <label className="text-[14px] font-medium">Yes</label>

            <input
              type="radio"
              name="approvalChoice"
              value="no"
              className="h-[20px] w-[20px] custom-radio"
              checked={approvalChoice === "no"}
              onChange={(e) => handleApprovalChoice(e.target.value)}
            />
            <label className="text-[14px] font-medium">No</label>
          </div>

          <div
            className="flex flex-col gap-4 "
            style={{
              opacity: showApprovalChain ? 1 : 0.5,
              pointerEvents: showApprovalChain ? "auto" : "none",
            }}
          >
            <p className="text-[14px] font-semibold">Approval Chain</p>
            <div className="flex flex-col ">
              <div className="flex gap-4 w-full">
                <div className="order-tracker mt-1">
                  {levels.map((level, index) => (
                    <div key={level.id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        style={{ animationDelay: "1s" }}
                        className="level"
                      >
                        <circle cx="8" cy="8.5" r="8" fill="#CBEFFF" />
                        <circle cx="8" cy="8.5" r="4" fill="#06A9EF" />
                      </svg>
                      {index !== levels.length - 1 && (
                        <div className="connector-line mt-[-2px] mb-[-3px]">
                          <img
                            className="moving-lineReq"
                            style={{
                              height: "0px",
                              width: "3px",
                              marginLeft: "0.44rem",
                            }}
                            src="/images/employer/tracker_line.png"
                            alt="Line 1"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-[91.5%] flex flex-col gap-4">
                  {data.RequisitionLevel.map((level, index) => (
                    <div
                      className="flex flex-col gap-[8px] w-full level"
                      key={level.id}
                    >
                      <div className="flex gap-2 justify-between">
                        <p>{level.level}</p>
                        {index !== 0 && index === levels.length - 1 && (
                          <svg
                            className="delete-level cursor-pointer"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            onClick={() => deleteLevel(level.id)}
                          >
                            <g mask="url(#mask0_4754_63716)">
                              <path
                                d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                        )}
                      </div>
                      <input
                        type="text"
                        value={level.name || ""}
                        onChange={(e) => handleChange2(e, index, "name")}
                        placeholder="Role / Employee"
                        className={`h-[38px] border-[1px] py-[16px] px-[8px] border-solid rounded-[6px] placeholder:text-[14px] font-[400]   ${
                          errors[`name_${index}`]
                            ? "border-red"
                            : "border-[#DEDEDE]"
                        }`}
                      />
                      <input
                        type="text"
                        value={level.email || ""}
                        onChange={(e) => handleChange2(e, index, "email")}
                        placeholder="Enter Email"
                        className={`h-[38px] border-[1px] py-[16px] px-[8px] border-solid  rounded-[6px] placeholder:text-[14px] font-[400] ${
                          errors[`name_${index}`]
                            ? "border-red"
                            : "border-[#DEDEDE]"
                        }`}
                      />
                    </div>
                  ))}
                  <p
                    className="add-level text-[#06A9EF] text-[14px] font-semibold cursor-pointer"
                    onClick={addLevel}
                  >
                    + Add New Level
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <button
                onClick={() => router.back()}
                className="   border-[1px] border-solid border-[#06A9EF] text-[16px] font-medium px-9 py-2 rounded-[30px] max-scr1100:px-6 "
              >
                Back
              </button>
              <button
                className="  text-[#fff] text-[16px] font-semibold px-9 py-2 max-scr1100:px-6  bg-[#06A9EF] rounded-[30px]"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>

        {successfull && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
              <div
                className="w-[330px] relative rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <svg
                  className="absolute top-[-30px]  left-[38%] right-[62%] flex"
                  xmlns="http://www.w3.org/2000/svg"
                  width="85"
                  height="85"
                  viewBox="0 0 85 85"
                  fill="none"
                >
                  <g clip-path="url(#clip0_6622_116765)">
                    <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                    <g mask="url(#mask0_6622_116765)">
                      <path
                        d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_6622_116765">
                      <rect width="85" height="85" rx="42.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="text-center">
                  <div className="text-[24px] font-[500] text-[#333]">
                    Requisition created Successfully
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => nevigate()}
                    className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNewRequisition;
