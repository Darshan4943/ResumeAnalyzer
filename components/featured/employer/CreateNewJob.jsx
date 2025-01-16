import React, { useEffect, useRef, useState, useCallback } from "react";

import CreateProfileFields from "../../../pages/common/CreateProfileFields";
import { useRouter } from "next/router";
import axios from "axios";
import MiniLoader from "../../../components/common/miniLoader";
import ReactSelect from "react-select";
import { SkillList } from "../../../utils/data";
import { camelCase } from "../../../utils/middleware";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import "react-quill/dist/quill.snow.css";
import Description from "../candidate/jobs/Description";
import ImageCropper from "../candidate/createResume/components/imageCropper";
import dynamic from "next/dynamic";
import debounce from "lodash.debounce";
import NormalJobCard from "../candidate/jobs/NormalJobCard";
import { Close_svg } from "../../../utils/svg";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

function CreateNewJob({ setToggle }) {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const [jobPost, setJobPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loactionText, setLoactionText] = useState("");
  const [skills, setSkills] = useState(SkillList);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [formError, setFormError] = useState({});
  const [model, openModel] = useState(false);
  const [modelView, setModelView] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const taskRef = useRef(null);
  const [data, setData] = useState({
    companyName: "",
    jobTitle: "",
    Keywords: [],
    jobLink: "",
    jobType: "",
    workFrom: "",
    location: [],
    country: [],
    aboutOrganization: "",
    description: "",
    salaryType: "",
    minSalary: "",
    maxSalary: "",
    openPositions: "",
    jobSector: "",
    currency: "",
    requiredQualification: "",
    requiredSkills: "",
    deadLine: "",
    experience: "",
    revalentExp: "",
    mustSkills: [],
    goodSkills: [],
    qualificationType: [],
    status: "Live",
    logo: "",
  });
  useEffect(() => {
    setData({ ...data, logo: croppedImage?.blob });
  }, [croppedImage]);

  const handleSubmit = async (e) => {
    console.log("object");
    e.preventDefault();
    const newFormError = {};
    const isValidString = (value) =>
      typeof value === "string" && value.trim() !== "";
    const isValidArray = (value) => Array.isArray(value) && value.length > 0;
    const isValidDate = (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    };

    if (!data.jobTitle || !isValidString(data.jobTitle)) {
      newFormError.jobTitle = "Job Title is required";
    }

    if (!data.companyName || !isValidString(data.companyName)) {
      newFormError.companyName = "Company Name is required";
    }
    if (!data.country || !isValidString(data.country)) {
      newFormError.country = "Country Name is required";
    }

    if (
      !data.location ||
      (Array.isArray(data.location) && data.location.length === 0)
    ) {
      newFormError.location = "Location is required";
    } else if (Array.isArray(data.location)) {
      data.location.forEach((item, index) => {
        if (!isValidString(item)) {
          newFormError.location = `Location item ${index + 1} is required`;
        }
      });
    } else if (!isValidString(data.location)) {
      newFormError.location = "Location is required";
    }

    if (!data.description || !isValidString(data.description)) {
      newFormError.description = "Job Description Is Required";
    }

    if (!data.jobType || !isValidString(data.jobType)) {
      newFormError.jobType = "Job Type is required";
    }

    if (!data.mustSkills || !isValidArray(data.mustSkills)) {
      newFormError.mustSkills = "Must have Skills are required";
    }

    if (!data.deadLine || !isValidDate(data.deadLine)) {
      newFormError.deadLine = "Valid Deadline is required";
    } else {
      const currentDate = new Date();
      const inputDate = new Date(data.deadLine);
      const currentDateOnly = new Date(currentDate.setHours(0, 0, 0, 0));
      const inputDateOnly = new Date(inputDate.setHours(0, 0, 0, 0));

      if (inputDateOnly < currentDateOnly) {
        newFormError.deadLine = "Deadline cannot be earlier than today's date";
      }
    }

    const requiredFields = [
      "jobTitle",
      "companyName",
      "country",
      "location",
      "description",
      "jobType",
      "mustSkills",
      "deadLine",
    ];

    const emptyFields = requiredFields.filter(
      (field) =>
        !data[field] ||
        (Array.isArray(data[field])
          ? data[field].length === 0
          : data[field].trim() === "")
    );

    if (emptyFields.length > 0) {
      toast.error("Please fill all required fields.");
    }

    if (Object.keys(newFormError).length > 0) {
      setFormError(newFormError);
      return;
    }

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key].forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, data[key]);
      }
    });

    if (croppedImage) {
      formData.append("fileName", file?.name);
    }

    formData.append("createdBy", userDataGlobal?._id);

    try {
      const response = await axios.post(
        `http://localhost:2000/api/job/add/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Success:", response.data);
      // router.push("/employer/JobPosting");
      toast.success(
        id ? "Job Post Updated Successfully" : "Job Post Created Successfully"
      );
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        error.response?.data?.message ||
        "An error occurred while adding the job."
      );
    }
  };

  const getData = () => {
    setLoading(true);
    axios
      .get("http://localhost:2000/api/job/getByJobId/" + id)
      .then((res) => {
        setLoading(false);
        const formattedDeadLine = res.data.deadLine
          ? new Date(res.data.deadLine).toISOString().split("T")[0]
          : "";
        const {
          companyName,
          jobTitle,
          jobType,
          Keywords,
          jobLink,
          aboutOrganization,
          jobMode,
          location,
          country,
          description,
          salaryType,
          minSalary,
          maxSalary,
          requiredQualification,
          requiredSkills,
          deadLine,
          experience,
          mustSkills,
          goodSkills,
          currency,
          revalentExp,
          status,
          qualificationType,
          logo,
        } = res.data;
        setData({
          ...data,
          companyName,
          jobTitle,
          Keywords,
          jobLink,
          jobType,
          aboutOrganization,
          workFrom: jobMode,
          country,
          location,
          deadLine,
          description,
          salaryType,
          minSalary: minSalary === null ? "" : minSalary,
          maxSalary: maxSalary === null ? "" : maxSalary,
          requiredQualification,
          requiredSkills,
          deadLine: formattedDeadLine,
          experience,
          mustSkills,
          goodSkills,
          currency,
          revalentExp,
          status,
          logo,
          qualificationType,
        });
        if (logo) {
          setCroppedImage({ url: logo });
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (id) {
      getData();
    } else {
      setLoading(false);
    }
  }, [id]);

  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "companyName":
        if (!value.trim()) {
          errors.companyName = "Company Name is required";
        } else if (!isNaN(value)) {
          errors.companyName = "Company Name cannot be a number";
        } else if (/\d/.test(value)) {
          errors.companyName = "Company Name cannot contain numbers";
        } else {
          delete errors.companyName;
        }
        break;

      case "jobTitle":
        if (!value || value.length === 0) {
          errors.jobTitle = "Job Title is required";
        } else {
          delete errors.jobTitle;
        }
        break;

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleChange1 = (value) => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     description: value,
  //   }));
  // };
  const handleChange1 = useCallback(
    debounce((value) => {
      const plainText = value.replace(/<[^>]*>/g, "");
      setData((prevData) => ({
        ...prevData,
        description: plainText,
      }));
    }, 500),
    []
  );

  const resetFormData = () => {
    setData({
      companyName: "",
      jobTitle: "",
      Keywords: [],
      jobLink: "",
      jobType: "",
      workFrom: "",
      location: [],
      country: [],
      aboutOrganization: "",
      description: "",
      salaryType: "",
      minSalary: "",
      maxSalary: "",
      openPositions: "",
      jobSector: "",
      currency: "",
      requiredQualification: "",
      requiredSkills: "",
      deadLine: "",
      experience: "",
      revalentExp: "",
      mustSkills: [],
      goodSkills: [],
      qualificationType: [],
      status: "Live",
    });
  };

  const toggleModal = () => {
    console.log("object");
    openModel(!model);
  };

  const handleClick = () => {
    router.push("/employer/JobPosting");
  };

  const fileRef = useRef();

  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile?.type.includes("image")) {
        setFile(selectedFile);
        setModelView(true);
      } else {
        toast.error("Only Image files are allowed");
      }
    }
  };

  const borderColor = formError.description ? "red" : "#DEDEDE";
  const [showEditor, setShowEditor] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowEditor(true);
    }, 300);
  }, []);

  const handleOutsideClick = (event) => {
    if (taskRef.current && !taskRef.current.contains(event.target)) {
      setIsSetting(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleNavigate = () => {
    router.push("/employer/CreateProfileFields");
  };

  return (
    <>
      {!isCreate && (
        <div>
          {model && (
            <>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
                <div className="ml:w-[612px] w-full flex flex-col gap-6 p-5 rounded-[12px] bg-white">
                  <div className="w-full flex justify-end">
                  <Close_svg/>
                  </div>
                
                  <NormalJobCard item={data} />
                  <Description
                    selectedJob={data}
                    openModel={openModel}
                    isPreview={true}
                  />
                </div>
              </div>
            </>
          )}
          {modelView && (
            <ImageCropper
              setModelView={setModelView}
              file={file}
              setCroppedImage={setCroppedImage}
            />
          )}
          {loading ? (
            <div className="w-full flex items-center justify-center h-[80vh]">
              <MiniLoader />
            </div>
          ) : (
            <>
              <div className=" flex w-full flex-col gap-[16px]">
                <div
                  onClick={handleClick}
                  className="gap-[12px] flex cursor-pointer  "
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g mask="url(#mask0_6262_72954)">
                      <path
                        d="M7.37295 12.7481L12.5422 17.9174C12.6909 18.066 12.7643 18.24 12.7625 18.4394C12.7605 18.6387 12.682 18.8159 12.527 18.9711C12.3718 19.1159 12.1961 19.1909 12 19.1961C11.8038 19.2013 11.6281 19.1263 11.473 18.9711L5.1327 12.6309C5.03904 12.5372 4.97304 12.4384 4.9347 12.3346C4.8962 12.2308 4.87695 12.1186 4.87695 11.9981C4.87695 11.8776 4.8962 11.7654 4.9347 11.6616C4.97304 11.5578 5.03904 11.459 5.1327 11.3654L11.473 5.0251C11.6115 4.8866 11.783 4.81577 11.9875 4.8126C12.192 4.80943 12.3718 4.88027 12.527 5.0251C12.682 5.18027 12.7595 5.35844 12.7595 5.5596C12.7595 5.76094 12.682 5.93918 12.527 6.09435L7.37295 11.2481H18.75C18.9628 11.2481 19.141 11.3199 19.2845 11.4636C19.4281 11.6071 19.5 11.7853 19.5 11.9981C19.5 12.2109 19.4281 12.3891 19.2845 12.5326C19.141 12.6763 18.9628 12.7481 18.75 12.7481H7.37295Z"
                        fill="#1C1B1F"
                      />
                    </g>
                  </svg>
                  <div className="text-[20px] font-[500]">Post a Job</div>
                </div>

                <div className="bg-[#FFFFFF] flex flex-col rounded-[16px] gap-[16px] ">
                  <div>
                    <div className="flex flex-col  ms:flex ms:flex-row   gap-[16px] p-[16px] w-full">
                      <div className="flex flex-col gap-[8px] w-full  ">
                        <div className="text-[14px] font-[500]">
                          Job Title <span className="text-[red]">*</span>
                        </div>
                        <div>
                          <input
                            className={`border-[1px] py-[12px] px-[16px] rounded-[8px] w-full text-[12px] font-[400] ${formError.jobTitle
                              ? "border-red"
                              : "border-[#DEDEDE]"
                              }`}
                            placeholder="Add job title / role"
                            type="text"
                            name="jobTitle"
                            value={data.jobTitle}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-[8px] w-full  ">
                        <div className="text-[14px] font-[500]">Keywords</div>
                        <div>
                          <CreatableSelect
                            isClearable
                            isMulti
                            className="w-full min-w-[150px] rounded-[8px] text-[14px] font-montserrat font-small text-black leading-tight"
                            placeholder="Job keyword, tags etc"
                            value={
                              data.Keywords
                                ? data.Keywords.map((keyword) => ({
                                  value: keyword,
                                  label: keyword,
                                }))
                                : []
                            }
                            onChange={(selectedOptions) => {
                              setData({
                                ...data,
                                Keywords: selectedOptions
                                  ? selectedOptions.map(
                                    (option) => option.value
                                  )
                                  : [],
                              });
                            }}
                            styles={{
                              valueContainer: (provided) => ({
                                ...provided,
                                display: "flex",
                                flexWrap: "nowrap",
                                overflowX: "auto",
                                gap: "8px",
                                padding: "4px",
                                whiteSpace: "nowrap",
                                alignItems: "center",
                              }),
                              multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: "#EFFAFF",
                                color: "#06A9EF",
                                marginRight: "12px",
                              }),
                              multiValueLabel: (provided) => ({
                                ...provided,
                                color: "#06A9EF",
                                overflowX: "scroll",
                              }),
                              multiValueRemove: (provided) => ({
                                ...provided,
                                color: "#06A9EF",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 1,
                                position: "absolute",
                              }),
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-[8px] w-full">
                        <div className="text-[14px] font-[500]">Job Link</div>
                        <div>
                          <input
                            className="border-[1px] border-[#DEDEDE] text-[12px] font-[400] py-[12px] px-[16px] rounded-[8px] w-full"
                            placeholder="Add Job Link"
                            type="text"
                            name="jobLink"
                            value={data.jobLink}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col gap-4 md:flex-row">
                      <div className=" w-full  md:w-[266px]  flex  flex-col items-center">
                        <div className="flex w-full flex-col gap-[8px]">
                          <div className="flex flex-col gap-[8px]">
                            <div className="text-[14px] font-[500]">
                              About Company
                            </div>
                            <input
                              className="border-[1px] border-[#DEDEDE] text-[12px] font-[400] py-[12px] px-[16px] rounded-[8px]"
                              placeholder=" Brief description for your company. URLs are hyperlinked."
                              type="text"
                              name="aboutOrganization"
                              value={data.aboutOrganization}
                              onChange={handleChange}
                            />
                          </div>
                          <div className="flex flex-col gap-[8px]">
                            <div className="text-[14px] font-[500]">
                              Company logo
                            </div>
                            <div className="text-[12px] font-[400]">
                              This image will be shown publicly as company logo.
                            </div>
                          </div>
                        </div>
                        <div className="flex w-full flex-col pt-[16px] gap-[8px] items-center">
                          <div className="w-[144px] max-h-[60px] ">
                            {croppedImage ? (
                              <img
                                className="w-[144px] max-h-[60px] "
                                src={croppedImage?.url}
                                alt="logo"
                              />
                            ) : (
                              <>
                                <img
                                  className="w-[144px] max-h-[60px] "
                                  src={
                                    data?.logo
                                      ? data?.logo
                                      : "/images/jobs/logo.png"
                                  }
                                  alt="logo"
                                />
                              </>
                            )}
                          </div>
                          <>
                            <div
                              ref={fileRef}
                              onDrop={handleFileChange}
                              className="border-dashed border-[3px] bg-[#EFFAFF] border-[#06A9EF] flex flex-row w-[266px] justify-center rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
                            >
                              <input
                                type="file"
                                name="myfile"
                                onChange={handleFileChange}
                                multiple
                                accept="image/png, image/jpeg, image/jpg"
                              />

                              <div className="  flex  flex-col  items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="40"
                                  height="40"
                                  viewBox="0 0 40 40"
                                  fill="none"
                                  onClick={handleButtonClick}
                                >
                                  <g clipPath="url(#clip0_4121_52475)">
                                    <path
                                      d="M25 13.3333H25.0167"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                                      stroke="#06A9EF"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_4121_52475">
                                      <rect
                                        width="40"
                                        height="40"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                                <div className="flex flex-col	font-[400]	">
                                  <div className="flex gap-[2px]">
                                    <span
                                      onClick={handleButtonClick}
                                      className="text-[#06A9EF] text-[12px]"
                                    >
                                      Click to replace
                                    </span>
                                    <div className="text-[12px] font-[400]">
                                      or drag and drop
                                    </div>
                                  </div>
                                  <p className="text-center text-[10px] font-[400] text-[#333333]">
                                    SVG, PNG, JPG or GIF (max. 400 x 400px)
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>

                      <div className="w-full max-w-full flex flex-col">
                        <div className="flex flex-col scr1024:flex-row gap-[16px] w-full">
                          <div className="flex w-full flex-col md:flex-row scr1024:w-[66.66%] gap-[16px]">
                            <div className="flex flex-col gap-[8px] w-full">
                              <div className="text-[14px] font-[500]">
                                Company Name{" "}
                                <span className="text-[red]">*</span>
                              </div>
                              <input
                                className={`border-[1px] py-[12px] px-[16px] rounded-[8px] w-full text-[12px] font-[400] ${formError.companyName
                                  ? "border-red"
                                  : "border-[#DEDEDE]"
                                  }`}
                                placeholder="Enter Company name"
                                type="text"
                                name="companyName"
                                value={data.companyName}
                                onChange={handleChange}
                              />
                            </div>
                            <div className="flex flex-col gap-[8px]  w-full ">
                              <div className="text-[14px] font-[500]">
                                Location <span className="text-[red]">*</span>
                              </div>
                              <ReactSelect
                                options={[
                                  { value: "New York", label: "New York" },
                                  {
                                    value: "Los Angeles",
                                    label: "Los Angeles",
                                  },
                                  { value: "Chicago", label: "Chicago" },
                                  {
                                    value: "San Francisco",
                                    label: "San Francisco",
                                  },
                                  { value: "Boston", label: "Boston" },
                                ]}
                                isMulti
                                className="w-full rounded-[8px] text-[14px] font-montserrat font-small text-black "
                                placeholder="Select locations"
                                value={
                                  data.location
                                    ? data.location.map((location) => ({
                                      value: location,
                                      label: location,
                                    }))
                                    : []
                                }
                                onChange={(selectedOptions) => {
                                  setData({
                                    ...data,
                                    location: selectedOptions.map(
                                      (option) => option.value
                                    ),
                                  });
                                }}
                                styles={{
                                  valueContainer: (provided) => ({
                                    ...provided,
                                    display: "flex",
                                    flexWrap: "nowrap",
                                    overflowX: "auto",
                                    gap: "8px",
                                    padding: "4px",
                                    whiteSpace: "nowrap",
                                    alignItems: "center",
                                  }),
                                  control: (provided) => ({
                                    ...provided,
                                    border: formError.location
                                      ? "1px solid red"
                                      : "1px solid #DEDEDE",
                                    borderRadius: "8px",
                                    padding: "0 12px",
                                  }),
                                  multiValue: (provided) => ({
                                    ...provided,
                                    backgroundColor: "#EFFAFF",
                                    color: "#06A9EF",
                                    marginRight: "12px",
                                  }),
                                  multiValueLabel: (provided) => ({
                                    ...provided,
                                    color: "#06A9EF",
                                    overflowX: "scroll",
                                  }),
                                  multiValueRemove: (provided) => ({
                                    ...provided,
                                    color: "#06A9EF",
                                  }),
                                  menu: (provided) => ({
                                    ...provided,
                                    zIndex: 1,
                                    position: "absolute",
                                  }),
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col gap-[8px] w-full scr1024:w-[33.33%]">
                            <div className="text-[14px] font-[500]">
                              Country <span className="text-[red]">*</span>
                            </div>
                            <select
                              className={`border-[1px] py-[12px] px-[16px] rounded-[8px] w-full text-[12px] font-[400] ${formError.country
                                ? "border-red"
                                : "border-[#DEDEDE]"
                                }`}
                              name="country"
                              value={data.country}
                              onChange={handleChange}
                            >
                              <option value="" disabled>
                                Select Country
                              </option>
                              <option value="USA">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="India">India</option>
                              <option value="Australia">Australia</option>
                              <option value="UK">United Kingdom</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px] w-full">
                          <div className="text-[14px] pt-[16px] font-[500]">
                            Job Description{" "}
                            <span className="text-[red]">*</span>
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column-reverse",
                              maxWidth: "100%",
                              width: "100%",
                            }}
                          >
                            {showEditor && (
                              <ReactQuill
                                value={data.description}
                                onChange={handleChange1}
                                readOnly={false}
                                modules={{
                                  toolbar: [
                                    [
                                      { header: "1" },
                                      { header: "2" },
                                      { font: [] },
                                    ],
                                    [{ list: "ordered" }, { list: "bullet" }],
                                    ["bold", "italic", "underline", "strike"],
                                    [{ align: [] }],
                                    ["link", "image"],
                                  ],
                                }}
                                style={{
                                  border: `1px #DEDEDE`,
                                  height: "238px",
                                  borderRadius: "20px",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="p-4 gap-4 flex flex-col">
                      <div className="text-lg font-semibold">Salary</div>
                      <div className="flex flex-col md:flex-row w-full gap-5">
                        <div className="flex flex-col gap-2 w-full">
                          <div className="text-sm font-medium">Salary Type</div>
                          <div className="flex justify-between items-center">
                            <select
                              style={{
                                height: "40px",
                                border: "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "5px",
                              }}
                              className="w-full"
                              type="text"
                              name="salaryType"
                              value={data.salaryType}
                              onChange={handleChange}
                            >
                              <option value="Annual">Annual</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                            </select>
                          </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full ">
                          <div className="text-sm font-medium">Min Salary</div>
                          <input
                            className="border border-[#DEDEDE] w-full h-10 rounded-lg px-2"
                            type="number"
                            name="minSalary"
                            value={data.minSalary}
                            onChange={handleChange}
                            placeholder="Enter Min Salary"
                          />
                        </div>

                        <div className="flex flex-col gap-2 w-full ">
                          <div className="text-sm font-medium">Max Salary</div>
                          <input
                            className="border border-[#DEDEDE] w-full h-10 rounded-lg px-2"
                            type="number"
                            name="maxSalary"
                            value={data.maxSalary}
                            onChange={handleChange}
                            placeholder="Enter Max Salary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col gap-4 p-4">
                      <div className="text-lg font-semibold">
                        Job Information
                      </div>
                      <div className="flex flex-col scr700:flex-row w-full  gap-[20px]">
                        <div className="flex flex-col scr540:flex-row w-full scr700:w-[50%] xxlg:w-[40%] gap-[20px]">
                          <div className="flex flex-col gap-2">
                            <div className="text-sm font-medium">
                              Open Positions
                            </div>
                            <select
                              style={{
                                width: "109px",
                                height: "40px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "5px",
                              }}
                              type="number"
                              name="openPositions"
                              value={data.openPositions}
                              onChange={handleChange}
                            >
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2 w-full ">
                            <div className="text-sm font-medium">
                              Job Sector
                            </div>
                            <select
                              style={{
                                width: "100%",
                                height: "40px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "5px",
                              }}
                              type="number"
                              name="jobSector"
                              value={data.jobSector}
                              onChange={handleChange}
                            >
                              <option value="Accounting">Accounting</option>
                              <option value="Finance">Finance</option>
                              <option value="HR">HR</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col scr540:flex-row w-full scr700:w-[50%] xxlg:w-[60%] gap-[20px]">
                          <div className="flex flex-col gap-2 w-full ">
                            <div className="text-sm font-medium">
                              Job Type <span className="text-[red]">*</span>
                            </div>
                            <select
                              style={{
                                width: "100%",
                                height: "40px",
                                border: formError.jobType
                                  ? "1px solid red"
                                  : "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "5px",
                              }}
                              type="text"
                              name="jobType"
                              value={data.jobType}
                              onChange={handleChange}
                            >
                              <option value="Full Time">Full Time</option>
                              <option value="Part Time">Part Time</option>
                              <option value="Contract">Contract</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-2 w-full ">
                            <div className="text-sm font-medium">Work From</div>
                            <select
                              style={{
                                width: "100%",
                                height: "40px",
                                border: "1px solid #ccc",
                                borderRadius: "5px",
                                padding: "5px",
                              }}
                              type="text"
                              name="workFrom"
                              value={data.workFrom}
                              onChange={handleChange}
                            >
                              <option value="Office">Office</option>
                              <option value="Hybrid">Hybrid</option>
                              <option value="Remote">Remote</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col scr540:flex-row gap-[16px]">
                        <div className="flex flex-col gap-2 w-full ">
                          <div className="text-sm font-medium">
                            Required Qualification
                          </div>
                          <select
                            style={{
                              width: "100%",
                              height: "40px",
                              border: "1px solid #DEDEDE",
                              borderRadius: "8px",
                              padding: "5px",
                            }}
                            type="text"
                            name="requiredQualification"
                            value={data.requiredQualification}
                            onChange={handleChange}
                          >
                            <option value="Bachelor's">Bachelors</option>
                            <option value="Master's">Masters</option>
                            <option value="PhD">PhD</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-2 w-full ">
                          <div className="text-sm font-medium">
                            Required Skills{" "}
                            <span className="text-[red]">*</span>
                          </div>
                          <ReactSelect
                            isMulti
                            onInputChange={(data) => {
                              if (data.trim()) {
                                setSkills((prevSkills) => [
                                  data,
                                  ...prevSkills.filter(
                                    (skill) => skill.trim() !== ""
                                  ),
                                ]);
                              }
                            }}
                            options={skills
                              .filter((item) => item.trim() !== "")
                              .map((item) => ({
                                value: item,
                                label: camelCase(item),
                              }))}
                            className={`w-full ${formError.mustSkills
                              ? "border-red"
                              : "border-[#DEDEDE]"
                              }`}
                            value={
                              data.mustSkills
                                ? data.mustSkills.map((skill) => ({
                                  value: skill,
                                  label: camelCase(skill),
                                }))
                                : []
                            }
                            onChange={(selectedOptions) => {
                              if (selectedOptions) {
                                setData({
                                  ...data,
                                  mustSkills: selectedOptions.map(
                                    (option) => option.value
                                  ),
                                });
                              }
                            }}
                            styles={{
                              control: (base) => ({
                                ...base,
                                borderColor: formError.mustSkills
                                  ? "red"
                                  : "#DEDEDE",
                                borderRadius: "8px",
                              }),
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col scr540:flex-row  gap-[16px]">
                        <div className="flex flex-col gap-2 w-full ">
                          <div className="text-sm font-medium">
                            Application Deadline{" "}
                            <span className="text-[red]">*</span>
                          </div>
                          <input
                            type="date"
                            style={{
                              width: "100%",
                              height: "40px",
                              border: formError.deadLine
                                ? "1px solid red"
                                : "1px solid #DEDEDE",
                              borderRadius: "8px",
                              padding: "5px",
                            }}
                            name="deadLine"
                            value={data.deadLine}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-2 w-full ">
                          <div className="text-sm font-medium">Experience</div>
                          <select
                            style={{
                              width: "100%",
                              height: "40px",
                              border: "1px solid #DEDEDE",
                              borderRadius: "8px",
                              padding: "5px",
                            }}
                            name="revalentExp"
                            value={data.revalentExp}
                            onChange={handleChange}
                          >
                            <option value="0-2 `Years">0-2 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 p-4 w-full justify-between">
                      <div className="flex gap-4">
                        <button className="scr700:hidden text-sm font-semibold cursor-pointer px-6 py-1 sm:px-9 sm:py-3 border-2 border-[#06A9EF] rounded-full">
                          Create Basic Profile Form
                        </button>
                      </div>

                      <div className="flex justify-between w-full gap-2 sm:gap-4">
                        <div className="flex w-full justify-between gap-1">
                          <button
                            onClick={handleNavigate}
                            className=" min-w-[258px] hidden scr700:block text-sm font-semibold cursor-pointer px-6 py-1 sm:px-9 sm:py-3 border-2 border-[#06A9EF] rounded-full"
                          >
                            Create Basic Profile Form
                          </button>
                          <div
                            onClick={() => { openModel(true) }}
                            className="text-sm cursor-pointer flex justify-start font-semibold px-6 py-1 sm:px-9 sm:py-3 border-2 text-[#B3261E] border-[#B3261E] rounded-full"
                          >
                            Preview
                          </div>
                          <div className="flex w-full justify-between gap-3">
                            <div
                              onClick={handleClick}
                              className="text-sm cursor-pointer flex justify-start font-semibold px-6 py-1 sm:px-9 sm:py-3 border-2 text-[#B3261E] border-[#B3261E] rounded-full"
                            >
                              Cancel
                            </div>
                            <button
                              onClick={handleSubmit}
                              className="text-sm font-semibold text-white px-6 py-1 sm:px-9 sm:py-3 bg-[#06A9EF] border-[#06A9EF] rounded-full hover:bg-white border-2 border-transparent hover:text-black cursor-pointer transition duration-300"
                            >
                              Comfirm
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
      {isCreate && <CreateProfileFields />}
    </>
  );
}

export default CreateNewJob;
