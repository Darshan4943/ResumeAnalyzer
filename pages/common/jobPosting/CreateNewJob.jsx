import React, { useEffect, useRef, useState, useCallback } from "react";

import CreateProfileFields from "../CreateProfileFields";
import { useRouter } from "next/router";
import axios from "axios";
import MiniLoader from "../../../components/common/miniLoader";
import MiniLoader1 from "../../../components/common/mini-loader";
import ReactSelect from "react-select";
import { currencyMap, SkillList, telCode } from "../../../utils/data";
import { camelCase } from "../../../utils/middleware";
import { toast } from "react-toastify";
import CreatableSelect from "react-select/creatable";
import { useSelector } from "react-redux";
import Description from "../../../components/featured/candidate/jobs/Description";
import ImageCropper from "../../../components/featured/candidate/createResume/components/imageCropper";
import debounce from "lodash.debounce";
import NormalJobCard from "../../../components/featured/candidate/jobs/NormalJobCard";
import { Close_svg, PlusAddLogo } from "../../../utils/svg";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Select from "react-select";
import PreviewCard from "../../../components/featured/candidate/jobs/PreviewCard";
function CreateNewJob() {
  const [file, setFile] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const router = useRouter();
  const { id, companyId, reqId } = router.query;
  const [loading, setLoading] = useState(true);
  const [loadingg, setLoadingg] = useState(false);
  const [skills, setSkills] = useState(SkillList);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [formError, setFormError] = useState({});
  const [model, openModel] = useState(false);
  const [modelView, setModelView] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isSetting, setIsSetting] = useState(false);
  const taskRef = useRef(null);
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [error, setError] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const fileRef = useRef();
  const [loactionText, setLoactionText] = useState("");
  const [KeywordsText, setKeywordsText] = useState("");
  const [dragging, setDragging] = useState(false);
  const [data, setData] = useState({
    jobTitle: "",
    companyName: "",
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
    totalExperience: "",
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
  const countryOptions = telCode.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const handleCountryChange = (selectedCountries) => {
    setFormError((prevErrors) => ({
      ...prevErrors,
      country: "",
    }));
    setData({
      ...data,
      country: selectedCountries
        ? selectedCountries.map((country) => country.value)
        : [],
    });
  };
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

  const handleSectorChange = (selectedJobSector) => {
    setFormError((prevErrors) => ({
      ...prevErrors,
      jobSector: "",
    }));
    setData({
      ...data,
      jobSector: selectedJobSector ? selectedJobSector.value : null,
    });
  };

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: "1px solid #DEDEDE",
      padding: 2,
      boxShadow: "none",
      hight: "42px",
      "&:hover": {},
    }),
  };

  useEffect(() => {
    setData({ ...data, logo: croppedImage?.blob });
  }, [croppedImage]);

  const validateFormData = (data) => {
    console.log("Validating form data...");
    const newFormError = {};

    const isValidString = (value) =>
      typeof value === "string" && value.trim() !== "";
    const isValidArray = (value) => Array.isArray(value) && value.length > 0;
    const isValidDate = (value) => {
      const date = new Date(value);
      return !isNaN(date.getTime());
    };

    if (!isValidString(data.jobTitle)) {
      newFormError.jobTitle = "Job Title is required";
      return newFormError;
    }

    if (!isValidString(data.companyName)) {
      newFormError.companyName = "Company Name is required";
      return newFormError;
    }

    if (!data.location || !isValidArray(data.location)) {
      newFormError.location = "Location is required";
      return newFormError;
    } else {
      data.location.forEach((item, index) => {
        if (!isValidString(item)) {
          newFormError.location = `Location item ${index + 1} is required`;
          return newFormError;
        }
      });
    }

    if (!data.country || !isValidArray(data.country)) {
      newFormError.country = "Country is required";
      return newFormError;
    } else {
      data.country.forEach((item, index) => {
        if (!isValidString(item)) {
          newFormError.country = `Country item ${index + 1} is required`;
          return newFormError;
        }
      });
    }

    if (!isValidString(data.description)) {
      newFormError.description = "Job Description is required";
      return newFormError;
    }

    if (!isValidString(data.jobType)) {
      newFormError.jobType = "Job Type is required";
      return newFormError;
    }

    if (!isValidDate(data.deadLine)) {
      newFormError.deadLine = "Valid Deadline is required";
      return newFormError;
    }

    const currentDate = new Date().setHours(0, 0, 0, 0);
    const inputDate = new Date(data.deadLine).setHours(0, 0, 0, 0);

    if (inputDate < currentDate) {
      newFormError.deadLine = "Deadline cannot be earlier than today's date";
      return newFormError;
    }

    if (!isValidArray(data.mustSkills)) {
      newFormError.mustSkills = "Must have Skills are required";
      return newFormError;
    }
    if (!isValidArray(data.goodSkills)) {
      newFormError.goodSkills = "Must have Skills are required";
      return newFormError;
    }

    return newFormError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingg(true);
    const formErrors = await validateFormData(data);
    console.log("formErrors", formErrors);
    if (Object.keys(formErrors).length > 0) {
      setFormError(formErrors);
      toast.error("All fields are Required");
      setLoadingg(false);
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
    if(reqId){
      formData.append("reqId",reqId);
    }
    if(userDataGlobal?.companyId){
      formData.append("companyId",userDataGlobal?.companyId);
    }

    formData.append("createdBy", userDataGlobal?._id);

    try {
      const response = await axios.post(
        `https://dev.api.skilotech.com/api/job/add/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      router.push("/common/jobPosting");
      toast.success(
        id ? "Job Post Updated Successfully" : "Job Post Created Successfully"
      );
      setLoadingg(false);
    } catch (error) {
      console.error("Error:", error);
      setLoadingg(false);
      toast.error(
        error.response?.data?.message ||
        "An error occurred while adding the job."
      );
    }
  };

  const getData = () => {
    setLoading(true);
    axios
      .get("https://dev.api.skilotech.com/api/job/getByJobId/" + id)
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
          jobSector,
          openPositions,
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
          totalExperience,
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
          jobSector,
          openPositions: openPositions === null ? "" : openPositions,
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
          totalExperience,
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
      getData(id);
    } else if (companyId) {
      getcompaniesdetails(companyId);
    } else if (reqId) {
      getJobDetails(reqId);
    } else {
      setLoading(false);
    }
  }, [id, companyId, reqId]);

  const getcompaniesdetails = (id) => {
    setLoading(true);

    axios
      .get(`https://dev.api.skilotech.com/api/company/fetchCompaniDetails/${id}`)
      .then((res) => {
        setLoading(false);

        const {
          companyName,
          companyLogo: logo,
          companyDescription: aboutOrganization,
          createdAt,
          updatedAt,
        } = res.data;

        setData({
          ...data,
          companyName,
          logo,
          aboutOrganization,
          createdAt,
          updatedAt,
        });
      })
      .catch((err) => {
        setLoading(false);
        setError("Error fetching company details");
        console.error(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (value.trim() !== "") {
      setFormError((prevError) => {
        const { [name]: removedError, ...rest } = prevError;
        return rest;
      });
    }
  };

  const debounceUpdate = useCallback(
    debounce((value) => {
      //   const plainText = value?.replace(/<[^>]*>/g, "");
      setData((prev) => ({ ...prev, description: value }));
    }, 500),
    []
  );

  const handleChange1 = (value) => {
    // const plainText = value?.replace(/<[^>]*>/g, "");
    if (value?.length < 200) {
      setData({ ...data, description: value.slice(0, 200) });
      debounceUpdate(value.slice(0, 200));
    } else {
      setData({ ...data, description: value });
      debounceUpdate(value);
    }
  };

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
      totalExperience: "",
      mustSkills: [],
      goodSkills: [],
      qualificationType: [],
      status: "Live",
    });

    setCroppedImage(null);
    setFile(null);
  };

  // const handleClick = () => {
  //   router.push("/recruiter/jobPosting");
  // };

  const handleButtonClick = () => {
    fileRef.current?.click();
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    let selectedFile;

    if (event.dataTransfer) {
      selectedFile = event.dataTransfer.files[0];
    } else {
      selectedFile = event.target.files[0];
    }

    if (selectedFile) {
      if (selectedFile.type.includes("image")) {
        setFile(selectedFile);
        setModelView(true);
      } else {
        toast.error("Only Image files are allowed");
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    handleFileChange(event);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

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

  const currencyOptions = currencyMap.map((item) => ({
    value: item.currency,
    label: item.currency,
  }));

  const handleItemClick = (selectedOption) => {
    setSelectedCurrency(selectedOption);
  };

  const experienceOptions = [
    { value: "", label: "Select" },
    { value: "0-2 years", label: "0-2 years" },
    { value: "2-5 years", label: "2-5 years" },
    { value: "5-10 years", label: "5-10 years" },
    { value: "10-20 years", label: "10-20 years" },
    { value: "20 +", label: "20 +" },
  ];

  const experienceIndices = experienceOptions.map((option) => option.value);

  const isRelevantAllowed = (totalExpIndex, relevantExpIndex) => {
    return relevantExpIndex <= totalExpIndex;
  };
 

  const getJobDetails = async (reqId) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://dev.api.skilotech.com/api/getRequisitionById/${reqId}`
      );
      const fetchedData = response.data.data;
      setData({
        ...data,
        jobTitle: fetchedData.jobTitle || "",
        minSalary: fetchedData.budgetFrom || "",
        maxSalary: fetchedData.budgetTo || "",
        jobSector: fetchedData.department || "",
        experience: fetchedData.experience || "",
        jobType: fetchedData.jobType || "",
        location: fetchedData.location || [],
        currency: fetchedData.currency || "",
        openPositions: fetchedData.positions || "",
        description: fetchedData.description || "",
        deadLine: fetchedData.hiringDate
          ? new Date(fetchedData.hiringDate).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!isCreate && (
        <div>
          {model && (
            <>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
              <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins">
                <div className="ml:w-[612px] w-full flex flex-col gap-3 rounded-[12px] bg-white">
                  <PreviewCard
                    croppedImage={croppedImage}
                    item={data}
                    openModel={openModel}
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
                  onClick={() => router.back()}
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
                    <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-11 gap-[16px] p-[10px] md:p-[16px] w-full">
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-2">
                        <div className="text-[14px] font-[500]">
                          Job Status <span className="text-[#ff0000]">*</span>
                        </div>
                        <div>
                          <select
                            style={{
                              WebkitAppearance: "none",
                              MozAppearance: "none",
                              appearance: "none",
                              position: "relative",
                            }}
                            className={`border-[1px] px-[16px] rounded-[8px] h-[38px] w-full text-[#767676] text-[12px] font-[400] ${formError.status
                              ? "border-red"
                              : "border-[#DEDEDE]"
                              }`}
                            value={data?.status}
                            onChange={(e) => {
                              setData({ ...data, status: e.target.value });
                            }}
                          >
                            <option value="Select">Select</option>
                            <option value="Live">Live</option>
                            <option value="Hold">Hold</option>
                            {id && <option value="Closed">Closed</option>}
                          </select>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3 ">
                        <div className="text-[14px] font-[500]">
                          Job Title <span className="text-[#ff0000]">*</span>
                        </div>
                        <div>
                          <input
                            className={`border-[1px] h-[38px] px-[16px] rounded-[8px] w-full text-[12px] font-[400] outline-none ${formError.jobTitle
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
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">Job Link</div>
                        <div>
                          <input
                            className="border-[1px] border-[#DEDEDE] text-[12px] font-[400] h-[38px] px-[16px] rounded-[8px] w-full outline-none"
                            placeholder="Add Job Link"
                            type="text"
                            name="jobLink"
                            value={data.jobLink}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">
                          Keywords <span className="text-[red]">*</span>
                        </div>
                        <div
                          className={`w-full flex ${data?.Keywords ? "justify-between" : ""
                            } gap-2 border rounded-[8px] px-2 h-[38px]  ${formError.Keywords
                              ? "border-red"
                              : "border-[#DEDEDE]"
                            }`}
                        >
                          <div className="flex gap-4 w-[90%] items-center">
                            {data?.Keywords.length > 0 && (
                              <div
                                style={{
                                  scrollbarWidth: "none",
                                  msOverflowStyle: "none",
                                }}
                                id="scroll"
                                className="overflow-x-auto flex gap-2 "
                              >
                                {data?.Keywords?.map((item, index) => (
                                  <div
                                    key={index}
                                    className="h-[28px] px-[8px] bg-[#E5E5E5] rounded-[4px] flex flex-row gap-1 items-center text-[14px]"
                                  >
                                    <span className="flex  text-nowrap">
                                      {item}
                                    </span>
                                    <svg
                                      className="text-[14px]  cursor-pointer font-medium "
                                      onClick={() =>
                                        setData({
                                          ...data,
                                          Keywords: data?.Keywords.filter(
                                            (data) => data != item
                                          ),
                                        })
                                      }
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
                                  </div>
                                ))}
                              </div>
                            )}
                            <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Enter Keywords"
                              className="input w-[130px] placeholder:text-[12px] placeholder:font-[400] outline-none"
                              value={KeywordsText}
                              onChange={(e) => {
                                setKeywordsText(e.target.value);
                              }}
                            />
                          </div>
                          <button
                            disabled={KeywordsText?.length == 0}
                            onClick={() => {
                              setData({
                                ...data,
                                Keywords: [...data.Keywords, KeywordsText],
                              });
                              setKeywordsText("");

                              // setFormError(formError => {
                              //   delete formError.location;
                              //   return formError;
                              // });
                              setTimeout(() => {
                                const scrollDiv =
                                  document.getElementById("scroll");
                                if (scrollDiv) {
                                  scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                                }
                              }, 100);
                              setFormError((prevErrors) => ({
                                ...prevErrors,
                                Keywords: "",
                              }));
                            }}
                          >
                            <PlusAddLogo
                              color={
                                KeywordsText?.length > 0 ? "#646464" : "#bebebe"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col-reverse scr500:grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-11 gap-[16px] p-[10px] md:p-[16px] w-full">
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-2">
                        <div className="text-[14px] font-[500]">
                          About Company
                        </div>
                        <input
                          className="border-[1px] border-[#DEDEDE] text-[12px] font-[400] h-[38px] px-[16px] outline-none rounded-[8px]"
                          placeholder="Brief description for your company."
                          type="text"
                          name="aboutOrganization"
                          value={data.aboutOrganization.replace(
                            /<[^>]*>?/gm,
                            ""
                          )}
                          onChange={handleChange}
                          disabled={!!companyId}
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">
                          Company Name <span className="text-[red]">*</span>
                        </div>
                        <input
                          className={`border-[1px] h-[38px] px-[16px] rounded-[8px] w-full text-[12px] outline-none font-[400] ${formError.companyName
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
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">
                          Country <span className="text-[red]">*</span>
                        </div>

                        <Select
                          isMulti
                          options={countryOptions}
                          onChange={handleCountryChange}
                          value={countryOptions.filter((country) =>
                            data?.country?.includes(country.value)
                          )}
                          classNamePrefix="select"
                          placeholder="Select countries..."
                          styles={customStyles}
                          className={`border rounded-[8px]   withoutBorder ${formError.country ? "border-red" : "border-[#DEDEDE]"
                            }`}
                          onMenuClose={() => {
                            setTimeout(() => {
                              const scrollDiv = document.getElementById("scroll");
                              if (scrollDiv) {
                                scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                              }
                            }, 100);
                          }}
                        />

                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">
                          Location <span className="text-[red]">*</span>
                        </div>
                        <div
                          className={`w-full flex gap-2 relative border rounded-[8px] px-2  h-[38px] ${formError.location
                            ? "border-red"
                            : "border-[#DEDEDE]"
                            }`}
                        >
                          <div className="flex gap-4 w-[90%] items-center">
                            {data?.location.length > 0 && (
                              <div
                                id="scroll1"
                                className="flex flex-row  overflow-x-auto gap-2 "
                              >
                                {data?.location?.map((item, index) => (
                                  <div
                                    key={index}
                                    className=" h-[28px] py-[2px] px-[8px] bg-[#E5E5E5] rounded-[4px] flex flex-row gap-1 items-center text-[14px] "
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
                            )}
                            <input
                              type="text"
                              placeholder="Location"
                              className="input w-[100px] placeholder:text-[12px] placeholder:font-[400] outline-none"
                              value={loactionText}
                              onChange={(e) => {
                                setLoactionText(e.target.value);
                              }}
                            />
                          </div>
                          <button
                            className=" absolute bg-[#FFFFFF] right-2 top-[8px] "
                            disabled={loactionText?.length == 0}
                            onClick={() => {
                              setData({
                                ...data,
                                location: [...data.location, loactionText],
                              });
                              setLoactionText("");
                              setTimeout(() => {
                                const scrollDiv =
                                  document.getElementById("scroll1");
                                if (scrollDiv) {
                                  scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                                }
                              }, 100);
                              setFormError((prevErrors) => ({
                                ...prevErrors,
                                location: "",
                              }));
                            }}
                          >
                            <PlusAddLogo
                              color={
                                loactionText?.length > 0 ? "#646464" : "#bebebe"
                              }
                            />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-[10px] md:p-4 flex flex-col gap-4 md:flex-row">
                      <div className=" w-full md:w-[34.91%] lg:w-[30.91%] scr1100:w-[26.91%] scr1250:w-[20.91%]  flex  flex-col items-center">
                        <div className="flex w-full flex-col gap-[8px]">
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
                          <div
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className="w-[144px] max-h-[60px] "
                          >
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
                          <div
                            ref={fileRef}
                            onDrop={handleFileChange}
                            className="border-dashed border-[3px] bg-[#EFFAFF] border-[#06A9EF] flex flex-row w-full justify-center rounded-[12px] px-[8px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[126px]"
                          >
                            <input
                              className="outline-none placeholder:text-[12px] placeholder:font-[400]"
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
                                    <rect width="40" height="40" fill="white" />
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
                        </div>
                      </div>
                      <div className="w-full md:w-[62.09%] lg:w-[68.09%] scr1100:w-[72.09%] scr1250:w-[78.09%] flex flex-col">
                        <div className="flex flex-col gap-[8px] w-full">
                          <div className="text-[14px] font-[500]">
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
                              <Editor
                                value={data.description}
                                className="editor-container"
                                onTextChange={(e) => handleChange1(e.htmlValue)}
                                style={{
                                  border: formError.description
                                    ? "2px solid red"
                                    : "2px solid #DEDEDE",
                                  fontSize: "16px",
                                  color: "#333",
                                  padding: "10px",
                                  minHeight: "196px",
                                  borderBottomLeftRadius: "8px",
                                  borderBottomRightRadius: "8px",
                                }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="p-[10px] md:p-4 gap-4 flex flex-col">
                      <div className="text-lg font-semibold">Salary</div>
                      <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-11 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-2">
                          <label className="leading-[20px] text-[14px] font-medium">
                            Currency
                          </label>
                          <div className="flex flex-col items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px] font-montserrat font-small relative min-w-[100px] overflow-visible h-[40px]">
                            <ReactSelect
                              options={currencyOptions}
                              className="w-[100%] flex  items-center CurrencyClass py-1 rounded-[8px] text-[12px] font-montserrat font-small text-black h-[40px]"
                              placeholder="Select Currency"
                              value={
                                currencyOptions.find(
                                  (option) => option.value === data?.currency
                                ) || null
                              }
                              onChange={(value) => {
                                setData({ ...data, currency: value.value });
                                setFormError({});
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
                          <div className="flex flex-row items-start justify-start">
                            {formError && (
                              <p className="text-[12px] text-[red] font-[500] text-left">
                                {formError.currency}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">Salary Type</div>
                          <div className="flex justify-between items-center">
                            <select
                              style={{
                                height: "38px",
                                border: "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "5px",
                              }}
                              className="w-full text-[12px] text-[#767676] font-[400]"
                              type="text"
                              name="salaryType"
                              value={data.salaryType}
                              onChange={handleChange}
                            >
                              <option value="Select" disabled selected>
                                Select
                              </option>

                              <option value="Annual">Annual</option>
                              <option value="Monthly">Monthly</option>
                              <option value="Weekly">Weekly</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">Min Salary</div>
                          <input
                            className="border border-[#DEDEDE] outline-none placeholder:text-[12px] placeholder:font-[400] w-full h-[38px] rounded-lg px-2 text-[12px] font-[400]"
                            type="text"
                            name="minSalary"
                            value={data.minSalary}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            placeholder="Enter Min Salary"
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">Max Salary</div>
                          <input
                            className="border border-[#DEDEDE] w-full h-[38px] outline-none placeholder:text-[12px] placeholder:font-[400] rounded-lg px-2 text-[12px] font-[400]"
                            type="text"
                            name="maxSalary"
                            value={data.maxSalary}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            placeholder="Enter Max Salary"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex flex-col gap-4 p-[10px] md:p-4">
                      <div className="text-lg font-semibold">
                        Job Information
                      </div>

                      <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-11 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-2">
                          <div className="text-sm font-medium">
                            Open Positions
                          </div>
                          <input
                            className="border border-[#DEDEDE] w-full h-[38px] outline-none placeholder:text-[12px] placeholder:font-[400] rounded-lg px-2 text-[12px] font-[400]"
                            type="text"
                            name="openPositions"
                            value={data.openPositions}
                            onChange={(e) => {
                              const value = e.target.value;
                              if (/^\d*$/.test(value)) {
                                handleChange(e);
                              }
                            }}
                            placeholder="Open Positions"
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3 ">
                          <div className="text-sm font-medium">Job Sector</div>
                          <Select
                            options={jobSectors}
                            onChange={handleSectorChange}
                            value={jobSectors.find(
                              (jobSector) => jobSector.value === data?.jobSector
                            )}
                            classNamePrefix="select "
                            placeholder="Select Job Sector"
                            styles={{
                              control: (provided, state) => ({
                                ...provided,
                                border: `borderradius-[8px] ${state.isFocused ? "#DEDEDE" : "#DEDEDE"
                                  }`,
                                borderRadius: "8px",
                                justifyContent: "space-between",
                                boxShadow: state.isFocused
                                  ? "0 0 0 2px rgba(0, 0, 0, 0.1)"
                                  : "none",
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                color: "#999",
                                fontSize: "12px",
                              
                              }),
                              container: (provided) => ({
                                ...provided,
                                border: "none",
                               minHeight: "40px",
                               paddingVertical: "4px",
                               
                              }),
                             
                            }}
                            className={`border jobSectorInput min-h-[40px] JobSectorPlaceHolder ${formError.jobSector
                              ? "border-red"
                              : "border-[#DEDEDE]"
                              }`}
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">
                            Job Type <span className="text-[red]">*</span>
                          </div>
                          <select
                            className="text-[12px] outline-none text-[#767676] font-[400]"
                            style={{
                              width: "100%",
                              height: "38px",
                              border: formError.jobType
                                ? "1px solid red"
                                : "1px solid #DEDEDE",
                              borderRadius: "8px",
                              padding: "5px",
                            }}
                            type="text"
                            name="jobType"
                            value={data.jobType}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="Full Time">Full Time</option>
                            <option value="Part Time">Part Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internships">Internships</option>
                          </select>
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">Work From</div>
                          <select
                            className="text-[12px] outline-none text-[#767676] font-[400]"
                            style={{
                              width: "100%",
                              height: "38px",
                              border: "1px solid #DEDEDE",
                              borderRadius: "8px",
                              padding: "5px",
                            }}
                            type="text"
                            name="workFrom"
                            value={data.workFrom}
                            onChange={handleChange}
                          >
                            <option value="" disabled selected>
                              Select
                            </option>
                            <option value="On-Site">On-Site</option>
                            <option value="Remote">Remote</option>
                            <option value="Hybrid">Hybrid</option>
                            <option value="International">International</option>
                            <option value="Jobs for Women">
                              Jobs for Women
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 scr500:grid-cols-10 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5">
                          <div className="text-sm font-medium">
                            Required Qualification
                          </div>
                          <input
                            className={`border-[1px] h-[38px] py-[10px] px-[16px] rounded-[8px] w-full text-[12px] outline-none placeholder:text-[12px] placeholder:font-[400] font-[400] ${formError.requiredQualification
                              ? "border-red"
                              : "border-[#DEDEDE]"
                              }`}
                            placeholder="Required Qualification"
                            type="text"
                            name="requiredQualification"
                            value={data.requiredQualification}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5">
                          <div className="text-sm font-medium">
                            Application Deadline{" "}
                            <span className="text-[red]">*</span>
                          </div>
                          <input
                            type="date"
                            style={{
                              width: "100%",
                              height: "38px",
                              fontSize: "12px",
                              fontWeight: "400",
                              color: "#646464",
                              border: formError.deadLine
                                ? "1px solid red"
                                : "1px solid #DEDEDE",
                              borderRadius: "8px",
                              padding: "5px",
                            }}
                            name="deadLine"
                            value={data.deadLine}
                            min={new Date().toISOString().split("T")[0]}
                            onChange={handleChange}
                            onClick={(e) =>
                              e.target.showPicker && e.target.showPicker()
                            }
                            className=" outline-none placeholder:text-[12px] placeholder:text-[#646464] placeholder:font-[400] h-[38px]"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 scr500:grid-cols-10 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5">
                          <div className="text-sm font-medium">
                            Must have Skills
                            <span className="text-[red]">*</span>
                          </div>
                          <ReactSelect
                            isMulti
                            onInputChange={(data) => { }}
                            options={skills
                              .filter((item) => item.trim() !== "")
                              .map((item) => ({
                                value: item,
                                label: camelCase(item),
                              }))}
                            className={`w-full withoutBorder ${formError.mustSkills
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
                              const newMustSkills = selectedOptions
                                ? selectedOptions.map((option) => option.value)
                                : [];

                              if (
                                newMustSkills.length > data?.mustSkills?.length
                              ) {
                                setFormError((prevErrors) => ({
                                  ...prevErrors,
                                  mustSkills: "",
                                }));
                              }

                              setData({
                                ...data,
                                mustSkills: newMustSkills,
                              });
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" &&
                                event.target.value.trim()
                              ) {
                                const newSkill = event.target.value.trim();

                                if (!skills.includes(newSkill)) {
                                  setSkills((prevSkills) => [
                                    ...prevSkills,
                                    newSkill,
                                  ]);
                                }

                                event.target.value = "";
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
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5">
                          <div className="text-sm font-medium">
                            Good to have Skills{" "}
                            <span className="text-[red]">*</span>
                          </div>
                          <ReactSelect
                            isMulti
                            onInputChange={(data) => { }}
                            options={[
                              ...new Set(
                                skills
                                  .map((item) => item.trim().toLowerCase())
                                  .filter((item) => item !== "")
                              ),
                            ].map((item) => ({
                              value: item,
                              label: camelCase(item),
                            }))}
                            className={`w-full withoutBorder ${formError.goodSkills
                              ? "border-red"
                              : "border-[#DEDEDE]"
                              }`}
                            value={
                              data.goodSkills
                                ? data.goodSkills.map((skill) => ({
                                  value: skill,
                                  label: camelCase(skill),
                                }))
                                : []
                            }
                            onChange={(selectedOptions) => {
                              const newGoodSkills = selectedOptions
                                ? selectedOptions.map((option) => option.value)
                                : [];

                              if (
                                newGoodSkills.length > data?.goodSkills?.length
                              ) {
                                setFormError((prevErrors) => ({
                                  ...prevErrors,
                                  goodSkills: "",
                                }));
                              }

                              setData({
                                ...data,
                                goodSkills: newGoodSkills,
                              });
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" &&
                                event.target.value.trim()
                              ) {
                                const newSkill = event.target.value.trim();
                                setSkills((prevSkills) => [
                                  ...prevSkills,
                                  newSkill,
                                ]);
                                event.target.value = "";
                              }
                            }}
                            styles={{
                              control: (base) => ({
                                ...base,
                                borderColor: formError.goodSkills
                                  ? "red"
                                  : "#DEDEDE",
                                borderRadius: "8px",
                              }),
                              container: (base) => ({
                                ...base,
                                
                              }),
                            }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 scr500:grid-cols-10 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5">
                          <label className="text-[#333333] text-[14px] font-medium">
                            Total Experience
                          </label>
                          <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px] font-montserrat font-small relative min-w-[100px] overflow-hidden h-[38px]">
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
                              }}
                              className="w-outline-none focus-visible:outline-none text-[12px] font-[400] text-[#767676] outline-none p-2 w-full h-[38px]"
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
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5">
                          <label className="text-[#333333] text-[14px] font-medium">
                            Relevant Experience
                          </label>
                          <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[12px] font-[400] text-[#767676] outline-none font-montserrat font-small relative min-w-[100px] overflow-hidden h-[38px]">
                            <select
                              style={{
                                WebkitAppearance: "none",
                                MozAppearance: "none",
                                appearance: "none",
                                position: "relative",
                                background: "transparent",
                              }}
                              value={data?.revalentExp}
                              onChange={(e) => {
                                const newRelevantExp = e.target.value;

                                const totalExpIndex = experienceIndices.indexOf(
                                  data?.experience
                                );
                                const relevantExpIndex =
                                  experienceIndices.indexOf(newRelevantExp);

                                // Allow selection only if the relevant experience index is less than or equal to the total experience index
                                if (
                                  isRelevantAllowed(
                                    totalExpIndex,
                                    relevantExpIndex
                                  )
                                ) {
                                  setData({
                                    ...data,
                                    revalentExp: newRelevantExp,
                                  });
                                } else {
                                  toast.error(
                                    " Cannot be greater than total experience."
                                  );
                                  setData((prevData) => ({
                                    ...prevData,
                                    revalentExp: "",
                                  }));
                                }
                              }}
                              className="w-outline-none focus-visible:outline-none p-2 w-full h-[38px]"
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
                      </div>
                    </div>

                    {/* <div className="flex flex-wrap gap-4 p-4 w-full justify-between">
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
                            onClick={() => {
                              openModel(true);
                            }}
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
                    </div> */}
                    <div className="flex justify-end p-[10px] md:p-4 w-full">
                      {/* <div>
                        <button
                          onClick={handleClick}
                          className="text-sm cursor-pointer flex justify-start font-semibold px-6 py-1 sm:px-9 sm:py-3 border-2 text-[#B3261E] border-[#B3261E] rounded-full"
                        >
                          Cancel
                        </button>
                      </div> */}
                      <div className="flex gap-[4px] md:gap-[14px]">
                        <button
                          onClick={resetFormData}
                          className="text-[12px] items-center  md:text-[14px]  cursor-pointer flex justify-start font-semibold px-4 py-1 sm:px-9 sm:py-3 border-2 border-[#06A9EF] rounded-full"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => {
                            openModel(true);
                          }}
                          className="text-[12px]  md:text-[14px] items-center cursor-pointer flex justify-start font-semibold px-4 py-1 sm:px-9 sm:py-3 border-2 border-[#06A9EF] rounded-full"
                        >
                          Preview
                        </button>
                        {loadingg ? (
                          <div className="flex justify-center items-center text-sm font-semibold text-white px-6 py-1 sm:px-9 sm:py-3 bg-[#06A9EF] border-[#06A9EF] rounded-full hover:bg-white border-2 border-transparent hover:text-black cursor-pointer transition duration-300 w-[158.25px]">
                            <MiniLoader1 />
                          </div>
                        ) : (
                          <button
                            onClick={handleSubmit}
                            className="text-[12px] md:text-[14px] font-semibold text-white px-6 py-1 sm:px-9  bg-[#06A9EF] border-[#06A9EF] rounded-full hover:bg-white border-2 border-transparent hover:text-black cursor-pointer transition duration-300 h-[48.2px]"
                          >
                            {id ? "Update Job" : "Post Job"}
                          </button>
                        )}
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
