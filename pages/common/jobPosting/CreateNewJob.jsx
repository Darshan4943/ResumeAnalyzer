import React, { useEffect, useRef, useState, useCallback } from "react";

import CreateProfileFields from "../CreateProfileFields";
import { useRouter } from "next/router";
import axios from "axios";
import MiniLoader from "../../../components/common/miniLoader";
import MiniLoader1 from "../../../components/common/mini-loader";
import ReactSelect from "react-select";
import {
  currencyMap,
  jobSectorOptions,
  SkillList,
  telCode,
  JobCategories,
} from "../../../utils/data";
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
  const [loading, setLoading] = useState(false);
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
  const [categoryText, setCategoryText] = useState("");
  const [loactionText, setLoactionText] = useState("");
  const [KeywordsText, setKeywordsText] = useState("");
  const [dragging, setDragging] = useState(false);
  const [company, setCompany] = useState();
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
    jobCat: [],
    qualificationType: [],
    status: "Active",
    logo: "",
  });
  const countryOptions = telCode.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  const fetchCompanyDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:2000/api/getEmployerCompanies/${userDataGlobal?.companyId}`
      );
      setCompany(response.data);
      setData((prevData) => ({
        ...prevData,
        companyName: response?.data?.name,
        logo: response?.data?.companyLogo,
        aboutOrganization: response?.data?.about,
      }));
    } catch (err) {
      console.error("Failed to fetch company details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDataGlobal?.role === "employer") {
      fetchCompanyDetails();
    }
  }, []);

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

  const jobSectors = jobSectorOptions.map((sector) => ({
    value: sector.sector,
    label: sector.sector,
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
    }),
  };

  useEffect(() => {
    setData({ ...data, logo: croppedImage?.blob });
  }, [croppedImage]);

  const validateFormData = (data) => {
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

    if (!data.Keywords || !isValidArray(data.Keywords)) {
      newFormError.Keywords = "keywords is required";
      return newFormError;
    } else {
      data.Keywords.forEach((item, index) => {
        if (!isValidString(item)) {
          newFormError.Keywords = `Keywords item ${index + 1} is required`;
          return newFormError;
        }
      });
    }

    if (!isValidString(data.companyName)) {
      newFormError.companyName = "Company Name is required";
      return newFormError;
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

    if (!isValidString(data.description)) {
      newFormError.description = "Job Description is required";
      return newFormError;
    }

    if (!isValidString(data.jobSector)) {
      newFormError.jobSector = "Job Sector is required";
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
    if (Object.keys(formErrors).length > 0) {
      setFormError(formErrors);
      toast.error("All fields are Required");
      setLoadingg(false);
      return;
    }
    const sectorData = jobSectorOptions.find(
      (item) => item.sector === data.jobSector
    );

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
    if (reqId) {
      formData.append("reqId", reqId);
    }
    if (userDataGlobal?.role === "employer") {
      formData.append("companyId", userDataGlobal?.companyId);
    } else if (userDataGlobal?.role === "recruiter" && companyId) {
      formData.append("companyId", companyId);
    }

    formData.append("createdBy", userDataGlobal?._id);
    formData.append("role", userDataGlobal?.role);

    formData.append(
      "createdByName",
      userDataGlobal?.companyId
        ? userDataGlobal?.companyName
        : `${userDataGlobal?.firstName} ${userDataGlobal?.lastName}`
    );

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
          jobCat,
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
          jobCat,
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
      .get(`http://localhost:2000/api/company/fetchCompaniDetails/${id}`)
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
    if (value?.length < 200) {
      setData({ ...data, description: value.slice(0, 200) });
      debounceUpdate(value.slice(0, 200));
      setFormError("");
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
      jobCat: [],
      revalentExp: "",
      totalExperience: "",
      mustSkills: [],
      goodSkills: [],
      qualificationType: [],
      status: "Active",
    });

    setCroppedImage(null);
    setFile(null);
  };
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
        `http://localhost:2000/api/getRequisitionById/${reqId}`
      );
      const fetchedData = response.data.data;
      setData((prevData) => ({
        ...prevData,
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
      }));
    } catch (error) {
      console.error("Error fetching job details:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const options = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  if (id) {
    options.push({ value: "Closed", label: "Closed" });
  }
  const customStyless = {
    control: (provided, state) => ({
      ...provided,
      border: formError.status ? "1px solid red" : "1px solid #DEDEDE",
      // width: "189px",
      borderRadius: "8px",
      padding: "2px 8px",
      boxShadow: state.isFocused ? "0 0 0 1px #DEDEDE" : "none",

      height: "38px",
      fontSize: "12px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#767676",
      fontSize: "12px",
      fontWeight: "400",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
    }),
    singleValue: (provided) => ({
      ...provided,
      width: "100%",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const customStylesss = {
    control: (provided, state) => ({
      ...provided,
      border: formError.country ? "1px solid red" : "1px solid #DEDEDE",
      borderRadius: "8px",
      padding: "2px 8px",
      flexWrap: "wrap",
      overflowX: "auto",
      boxShadow: state.isFocused ? "0 0 0 1px #DEDEDE" : "none",
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      gap: "4px",
      padding: "2px 4px",
      scrollbarWidth: "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#767676",
      fontSize: "12px",
      fontWeight: "400",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
      scrollbarWidth: "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#EFFAFF",
      borderRadius: "4px",
      minWidth: "90px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#06A9EF",
      fontWeight: "500",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#9A4545",
      "&:hover": {
        backgroundColor: "transparent",
      },
    }),
  };

  const optionss = [
    { value: "Annual", label: "Annual" },
    { value: "Monthly", label: "Monthly" },
    { value: "Weekly", label: "Weekly" },
  ];

  const jobOptions = [
    { value: "Full Time", label: "Full Time" },
    { value: "Part Time", label: "Part Time" },
    { value: "Contract", label: "Contract" },
    { value: "Internships", label: "Internships" },
  ];

  const workFromOptions = [
    { value: "On-Site", label: "On-Site" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "International", label: "International" },
  ];

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
                    <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-12 gap-[16px] p-[10px] md:p-[16px] w-full">
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">
                          Job Status <span className="text-[#ff0000]">*</span>
                        </div>
                        <div>
                          <Select
                            options={[
                              {
                                value: "Select",
                                label: "Select",
                                isDisabled: true,
                              },
                              ...options,
                            ]}
                            value={
                              options.find(
                                (option) => option.value === data?.status
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              setData({
                                ...data,
                                status: selectedOption?.value,
                              });
                            }}
                            styles={customStyless}
                            isSearchable={false}
                            className="w-full"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3 ">
                        <div className="text-[14px] font-[500]">
                          Job Title <span className="text-[#ff0000]">*</span>
                        </div>
                        <div>
                          <input
                            className={`border-[1px] h-[38px] px-[16px] rounded-[8px] w-full text-[12px] font-[400] outline-none ${
                              formError.jobTitle
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
                        <div className="text-[14px] font-[500]">
                          Keywords <span className="text-[red]">*</span>
                        </div>
                        <div
                          className={`w-full flex ${
                            data?.Keywords ? "justify-between" : ""
                          } gap-2 border-[1px] rounded-[8px] px-2 h-[38px]  ${
                            formError.Keywords
                              ? "border-red"
                              : "border-[#DEDEDE]"
                          }`}
                        >
                          <div className="flex gap-4 w-[90%]  items-center">
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
                                    className="h-[28px] px-[8px] bg-[#EFFAFF] rounded-[4px] flex flex-row gap-[12px] items-center text-[14px]"
                                  >
                                    <span className="flex text-[#06A9EF] text-[14px] font-[400] text-nowrap">
                                      {item}
                                    </span>

                                    <svg
                                      onClick={() =>
                                        setData({
                                          ...data,
                                          Keywords: data?.Keywords.filter(
                                            (data) => data != item
                                          ),
                                        })
                                      }
                                      width="11"
                                      height="10"
                                      viewBox="0 0 11 10"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0.937354 0.435637C1.08738 0.28566 1.29082 0.201408 1.50295 0.201408C1.71509 0.201408 1.91853 0.28566 2.06855 0.435637L5.50295 3.87004L8.93735 0.435637C9.01115 0.359229 9.09943 0.298283 9.19703 0.256356C9.29463 0.214429 9.39961 0.19236 9.50583 0.191436C9.61206 0.190513 9.7174 0.210755 9.81572 0.250979C9.91403 0.291204 10.0034 0.350607 10.0785 0.425721C10.1536 0.500835 10.213 0.590157 10.2532 0.688474C10.2934 0.786791 10.3137 0.892135 10.3128 0.998358C10.3118 1.10458 10.2898 1.20956 10.2478 1.30716C10.2059 1.40476 10.145 1.49304 10.0686 1.56684L6.63415 5.00124L10.0686 8.43564C10.2143 8.58652 10.2949 8.7886 10.2931 8.99836C10.2913 9.20812 10.2071 9.40877 10.0588 9.55709C9.91048 9.70542 9.70983 9.78955 9.50007 9.79138C9.29032 9.7932 9.08823 9.71256 8.93735 9.56684L5.50295 6.13244L2.06855 9.56684C1.91767 9.71256 1.71559 9.7932 1.50583 9.79138C1.29608 9.78955 1.09543 9.70542 0.947099 9.55709C0.798773 9.40877 0.714637 9.20812 0.712815 8.99836C0.710992 8.7886 0.791628 8.58652 0.937354 8.43564L4.37175 5.00124L0.937354 1.56684C0.787377 1.41681 0.703125 1.21337 0.703125 1.00124C0.703125 0.789106 0.787377 0.585659 0.937354 0.435637V0.435637Z"
                                        fill="#9A4545"
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
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.14286 6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714Z"
                                fill="#333333"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                        <div className="text-[14px] font-[500]">
                          Redirect Job URL
                        </div>
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
                    </div>
                    <div className="flex flex-col-reverse scr500:grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-12 gap-[16px] p-[10px] md:p-[16px] w-full">
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-4">
                        <div className="text-[14px] font-[500]">
                          Company Name <span className="text-[red]">*</span>
                        </div>
                        <input
                          className={`border-[1px] h-[38px] px-[16px] rounded-[8px] w-full text-[12px] outline-none font-[400] ${
                            formError.companyName
                              ? "border-red"
                              : "border-[#DEDEDE]"
                          }`}
                          placeholder="Enter Company name"
                          type="text"
                          name="companyName"
                          value={data.companyName}
                          onChange={handleChange}
                          disabled={
                            (userDataGlobal?.role === "employer" && !reqId) ||
                            companyId
                          }
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-4">
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
                          placeholder="Select countries"
                          styles={customStylesss}
                          className={`border rounded-[8px] withoutBorder ${
                            formError.country
                              ? "border-red"
                              : "border-[#DEDEDE]"
                          }`}
                          classNamePrefix="select"
                          onMenuClose={() => {
                            setTimeout(() => {
                              const scrollDiv =
                                document.getElementById("scroll");
                              if (scrollDiv) {
                                scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                              }
                            }, 100);
                          }}
                        />
                      </div>
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-4">
                        <div className="text-[14px] font-[500]">
                          Location <span className="text-[red]">*</span>
                        </div>
                        <div
                          className={`w-full flex gap-2  items-center border rounded-[8px] px-2  h-[38px] ${
                            formError.location
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
                                    className=" h-[28px] py-[2px] px-[8px] bg-[#EFFAFF] rounded-[4px] flex flex-row gap-[12px] items-center text-[14px] "
                                  >
                                    <span className="text-[#06A9EF]">
                                      {item}
                                    </span>
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
                                        width="11"
                                        height="10"
                                        viewBox="0 0 11 10"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          fill-rule="evenodd"
                                          clip-rule="evenodd"
                                          d="M0.773292 0.435637C0.923314 0.28566 1.12676 0.201408 1.33889 0.201408C1.55102 0.201408 1.75447 0.28566 1.90449 0.435637L5.33889 3.87004L8.77329 0.435637C8.84709 0.359229 8.93536 0.298283 9.03297 0.256356C9.13057 0.214429 9.23555 0.19236 9.34177 0.191436C9.44799 0.190513 9.55334 0.210755 9.65165 0.250979C9.74997 0.291204 9.83929 0.350607 9.91441 0.425721C9.98952 0.500835 10.0489 0.590157 10.0891 0.688474C10.1294 0.786791 10.1496 0.892135 10.1487 0.998358C10.1478 1.10458 10.1257 1.20956 10.0838 1.30716C10.0418 1.40476 9.9809 1.49304 9.90449 1.56684L6.47009 5.00124L9.90449 8.43564C10.0502 8.58652 10.1309 8.7886 10.129 8.99836C10.1272 9.20812 10.0431 9.40877 9.89475 9.55709C9.74642 9.70542 9.54577 9.78955 9.33601 9.79138C9.12625 9.7932 8.92417 9.71256 8.77329 9.56684L5.33889 6.13244L1.90449 9.56684C1.75361 9.71256 1.55153 9.7932 1.34177 9.79138C1.13201 9.78955 0.931363 9.70542 0.783037 9.55709C0.63471 9.40877 0.550575 9.20812 0.548752 8.99836C0.546929 8.7886 0.627565 8.58652 0.773292 8.43564L4.20769 5.00124L0.773292 1.56684C0.623315 1.41681 0.539062 1.21337 0.539062 1.00124C0.539062 0.789106 0.623315 0.585659 0.773292 0.435637V0.435637Z"
                                          fill="#9A4545"
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
                              className="input w-[55px] placeholder:text-[12px] placeholder:font-[400] outline-none"
                              value={loactionText}
                              onChange={(e) => {
                                setLoactionText(e.target.value);
                              }}
                            />
                          </div>
                          <button
                            className="  bg-[#FFFFFF] "
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
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M5.14286 6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714Z"
                                fill="#333333"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-[10px] md:p-4 w-full flex-col gap-4 md:flex-row grid lg:grid-cols-12">
                      <div className=" lg:col-span-3 flex flex-col gap-4 h-full ">
                        <div className="flex flex-col gap-[8px] w-full h-full">
                          <div className="text-[14px] font-[500]">
                            About Company
                          </div>
                          <div
                            className={`border-[1px] text-start border-[#DEDEDE] text-[12px] h-full
    items-start justify-start w-[284px] 
    ${userDataGlobal?.role !== "employer" || reqId ? "h-[177px]" : "h-full"} 
    placeholder:text-[12px] font-[400] p-[16px] 
    outline-none rounded-[8px]`}
                          >
                            <textarea
                              className="w-full h-full outline-none scroll-none"
                              placeholder="Brief description for your company."
                              type="text"
                              name="aboutOrganization"
                              value={data?.aboutOrganization?.replace(
                                /<[^>]*>?/gm,
                                ""
                              )}
                              onChange={handleChange}
                              disabled={
                                !!companyId ||
                                (userDataGlobal?.role === "employer" && !reqId)
                              }
                            ></textarea>
                          </div>
                        </div>
                        <div className=" flex  flex-col w-full">
                          <div className="flex w-[248px] flex-col gap-[8px]">
                            <div className="flex flex-col gap-[8px]">
                              <div className="text-[14px] font-[500]">
                                Company logo
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
                                  className="w-[144px] max-h-[60px] object-contain"
                                  src={croppedImage?.url}
                                  alt="logo"
                                />
                              ) : (
                                <>
                                  <img
                                    className="w-[144px] max-h-[60px] object-contain"
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
                            <div className="text-[10px] font-[400]">
                              This image will be shown publicly as company logo.
                            </div>
                            {!companyId && (
                              <div
                                ref={fileRef}
                                onDrop={handleFileChange}
                                className="border-dashed border-[3px] bg-[#EFFAFF] border-[#06A9EF] flex flex-row w-full justify-center rounded-[12px] px-[16px] py-[8px] items-center gap-[8px] upload-btn-wrapper min-h-[83px]"
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
                                        className="text-[#06A9EF] text-[10px]"
                                      >
                                        Click to replace
                                      </span>
                                      <div className="text-[10px] font-[400]">
                                        or drag and drop
                                      </div>
                                    </div>
                                    <p className="text-center text-[10px] font-[400] text-[#333333]">
                                      SVG, PNG, JPG or GIF (max. 400 x 400px)
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-[8px] w-full lg:col-span-9 h-fit ">
                        <div className="text-[14px] font-[500]">
                          Job Description <span className="text-[red]">*</span>
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
                              headerTemplate={header}
                              value={data.description}
                              className="editor-container h-[416px]"
                              onTextChange={(e) => handleChange1(e.htmlValue)}
                              style={{
                                border: formError.description
                                  ? "2px solid red"
                                  : "0px solid #DEDEDE",
                                fontSize: "16px",
                                color: "#333",
                                padding: "10px",
                                minHeight: "340px",
                                // borderBottomLeftRadius: "8px",
                                // borderBottomRightRadius: "8px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-[10px] md:p-4 gap-4 flex flex-col">
                    <div className="text-lg font-semibold">Salary</div>
                    <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-12 gap-[16px] w-full">
                      <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
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
                          <Select
                            options={optionss}
                            value={options.find(
                              (option) => option.value === data.salaryType
                            )}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "salaryType",
                                  value: selectedOption.value,
                                },
                              })
                            }
                            placeholder="Select"
                            className="w-full font-[400]"
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                height: "38px",
                                border: "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "5px",
                                fontSize: "12px",
                                outline: "none",
                                color: "#767676",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #DEDEDE"
                                  : "none",
                              }),
                              menu: (base) => ({
                                ...base,
                                fontSize: "12px",
                              }),
                            }}
                          />
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
                  <div className="w-full">
                    <div className="flex flex-col gap-4 p-[10px] md:p-4 w-full">
                      <div className="text-lg font-semibold">
                        Job Information
                      </div>
                      <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-12 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
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
                        <div className="flex flex-col gap-[6px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-[14px] font-[500]">
                            Job Category <span className="text-[red]">*</span>
                          </div>

                          <ReactSelect
                            isMulti
                            options={JobCategories.map((item) => ({
                              value: item.value,
                              label: camelCase(item.label),
                            }))}
                            value={
                              data?.jobCat
                                ? data.jobCat.map((cat) => ({
                                    value: cat,
                                    label: camelCase(cat),
                                  }))
                                : []
                            }
                            onChange={(selectedOptions) => {
                              const newCategories = selectedOptions
                                ? selectedOptions.map((option) => option.value)
                                : [];

                              setData({
                                ...data,
                                jobCat: newCategories,
                              });
                            }}
                            onKeyDown={(event) => {
                              if (
                                event.key === "Enter" &&
                                event.target.value.trim()
                              ) {
                                const newCategory = event.target.value.trim();
                                if (
                                  !JobCategories.some(
                                    (category) =>
                                      category.value.toLowerCase() ===
                                      newCategory.toLowerCase()
                                  )
                                ) {
                                  setData((prev) => ({
                                    ...prev,
                                    jobCat: [
                                      ...(prev.jobCat || []),
                                      newCategory,
                                    ],
                                  }));
                                }
                                event.target.value = "";
                              }
                            }}
                            styles={customStylesss}
                            isSearchable={false}
                            className="w-full"
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">
                            Job Sector <span className="text-[red]">*</span>
                          </div>
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
                                outline: "none",
                                border: `1px solid ${
                                  formError.jobSector ? "red" : "#DEDEDE"
                                }`,
                                borderRadius: "8px",
                                justifyContent: "space-between",
                              }),

                              placeholder: (provided) => ({
                                ...provided,
                                color: "#999",
                                fontSize: "12px",
                              }),
                              singleValue: (provided) => ({
                                ...provided,
                                fontSize: "12px",
                                color: "#333",    
                              }),
                              container: (provided) => ({
                                ...provided,
                                border: "none",
                                minHeight: "40px",
                                paddingVertical: "4px",
                              }),
                            }}
                            className={`border-[1px] jobSectorInput min-h-[40px] JobSectorPlaceHolder ${
                              formError.jobSector
                                ? "border-red"
                                : "border-[#DEDEDE]"
                            }`}
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">
                            Job Type <span className="text-[red]">*</span>
                          </div>
                          <Select
                            classNamePrefix="react-select"
                            styles={{
                              control: (base, { isFocused }) => ({
                                ...base,
                                width: "100%",
                                height: "38px",
                                border: formError.jobType
                                  ? "1px solid red"
                                  : "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "2px",
                                fontSize: "12px",
                                color: "#767676",
                                boxShadow: isFocused
                                  ? "0 0 0 1px #767676"
                                  : "none",
                                "&:hover": { borderColor: "#767676" },
                              }),
                            }}
                            options={jobOptions}
                            value={jobOptions.find(
                              (option) => option.value === data.jobType
                            )}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "jobType",
                                  value: selectedOption?.value,
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 scr500:grid-cols-10 md:grid-cols-12 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">Work From</div>
                          <Select
                            classNamePrefix="react-select"
                            styles={{
                              control: (base, { isFocused }) => ({
                                ...base,
                                width: "100%",
                                height: "38px",
                                border: "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "2px",
                                fontSize: "12px",
                                color: "#767676",
                                boxShadow: isFocused
                                  ? "0 0 0 1px #767676"
                                  : "none",
                                "&:hover": { borderColor: "#767676" },
                              }),
                            }}
                            options={workFromOptions}
                            value={workFromOptions.find(
                              (option) => option.value === data.workFrom
                            )}
                            onChange={(selectedOption) =>
                              handleChange({
                                target: {
                                  name: "workFrom",
                                  value: selectedOption?.value,
                                },
                              })
                            }
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">
                            Required Qualification
                          </div>
                          <input
                            className={`border-[1px] h-[38px] py-[10px] px-[16px] rounded-[8px] w-full text-[12px] outline-none placeholder:text-[12px] placeholder:font-[400] font-[400] ${
                              formError.requiredQualification
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
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">
                            Must have Skills
                            <span className="text-[red]">*</span>
                          </div>
                          <ReactSelect
                            isMulti
                            onInputChange={(data) => {}}
                            options={skills
                              .filter((item) => item.trim() !== "")
                              .map((item) => ({
                                value: item,
                                label: camelCase(item),
                              }))}
                            className={`w-full withoutBorder ${
                              formError.mustSkills
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
                              control: (provided, state) => ({
                                ...provided,
                                border: formError.mustSkills
                                  ? "1px solid red"
                                  : "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "2px 8px",
                                flexWrap: "wrap",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #DEDEDE"
                                  : "none",
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                display: "flex",
                                flexWrap: "nowrap",
                                gap: "4px",
                                padding: "2px 4px",
                                overflowX: "auto",
                                scrollbarWidth: "none",
                                "-ms-overflow-style": "none",
                                "&::-webkit-scrollbar": {
                                  display: "none",
                                },
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                color: "#767676",
                                fontSize: "12px",
                                fontWeight: "400",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 10,
                                scrollbarWidth: "none",
                                "-ms-overflow-style": "none",
                                "&::-webkit-scrollbar": {
                                  display: "none",
                                },
                              }),
                              multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: "#EFFAFF",
                                borderRadius: "4px",
                                minWidth: "90px",
                              }),
                              multiValueLabel: (provided) => ({
                                ...provided,
                                color: "#06A9EF",
                                fontWeight: "500",
                              }),
                              multiValueRemove: (provided) => ({
                                ...provided,
                                color: "#9A4545",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }),
                            }}
                          />
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-5 md:col-span-3">
                          <div className="text-sm font-medium">
                            Good to have Skills{" "}
                            <span className="text-[red]">*</span>
                          </div>
                          <ReactSelect
                            isMulti
                            onInputChange={(data) => {}}
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
                            className={`w-full withoutBorder ${
                              formError.goodSkills
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
                              control: (provided, state) => ({
                                ...provided,
                                border: formError.goodSkills
                                  ? "1px solid red"
                                  : "1px solid #DEDEDE",
                                borderRadius: "8px",
                                padding: "2px 8px",
                                flexWrap: "wrap",
                                boxShadow: state.isFocused
                                  ? "0 0 0 1px #DEDEDE"
                                  : "none",
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                display: "flex",
                                flexWrap: "nowrap",
                                gap: "4px",
                                padding: "2px 4px",
                                overflowX: "auto",
                                scrollbarWidth: "none",
                                "-ms-overflow-style": "none",
                                "&::-webkit-scrollbar": {
                                  display: "none",
                                },
                              }),
                              placeholder: (provided) => ({
                                ...provided,
                                color: "#767676",
                                fontSize: "12px",
                                fontWeight: "400",
                              }),
                              menu: (provided) => ({
                                ...provided,
                                zIndex: 10,
                                scrollbarWidth: "none",
                                "-ms-overflow-style": "none",
                                "&::-webkit-scrollbar": {
                                  display: "none",
                                },
                              }),
                              multiValue: (provided) => ({
                                ...provided,
                                backgroundColor: "#EFFAFF",
                                borderRadius: "4px",
                                minWidth: "90px",
                              }),
                              multiValueLabel: (provided) => ({
                                ...provided,
                                color: "#06A9EF",
                                fontWeight: "500",
                              }),
                              multiValueRemove: (provided) => ({
                                ...provided,
                                color: "#9A4545",
                                "&:hover": {
                                  backgroundColor: "transparent",
                                },
                              }),
                            }}
                          />
                        </div>
                      </div>

                                        <div className="grid grid-cols-1 scr500:grid-cols-9 gap-[16px] w-full">
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-3">
                          <label className="text-[#333333] text-[14px] font-medium">
                            Total Experience
                          </label>
                          <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px] font-montserrat font-small  min-w-[100px] h-[38px]">
                            <Select
                              options={experienceOptions}
                              value={experienceOptions.find(
                                (opt) => opt.value === data.experience
                              )}
                              onChange={(selectedOption) =>
                                setData({
                                  ...data,
                                  experience: selectedOption.value,
                                })
                              }
                              placeholder="Select experience"
                              className="w-full text-[12px] font-[400] text-[#767676]"
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "38px",
                                  border: "1px solid #ccc",
                                  background: "transparent",
                                }),
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-3">
                          <label className="text-[#333333] text-[14px] font-medium">
                            Relevant Experience
                          </label>
                          <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[12px] font-[400] text-[#767676] outline-none font-montserrat font-small  min-w-[100px]  h-[38px]">
                            <Select
                              options={experienceOptions}
                              value={experienceOptions.find(
                                (opt) => opt.value === data.revalentExp
                              )}
                              onChange={(selectedOption) => {
                                const newRelevantExp = selectedOption.value;

                                const totalExpIndex = experienceIndices.indexOf(
                                  data.experience
                                );
                                const relevantExpIndex =
                                  experienceIndices.indexOf(newRelevantExp);

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
                                    "Cannot be greater than total experience."
                                  );
                                  setData((prevData) => ({
                                    ...prevData,
                                    revalentExp: "",
                                  }));
                                }
                              }}
                              placeholder="Select relevant experience"
                              className="w-full text-[12px] font-[400] text-[#767676]"
                              styles={{
                                control: (provided) => ({
                                  ...provided,
                                  height: "38px",
                                  border: "1px solid #ccc",
                                  background: "transparent",
                                }),
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-col gap-[8px] col-span-1 scr500:col-span-3">
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
                    </div>

                    <div className="flex justify-end p-[10px] md:p-4 w-full">
                      <div className="flex gap-[4px] md:gap-[14px]">
                        <button
                          onClick={resetFormData}
                          className="text-[12px] items-center  md:text-[12px]  cursor-pointer flex justify-start font-semibold px-6 blue_border_Button rounded-[30px] h-[38px]"
                        >
                          Reset
                        </button>
                        <button
                          onClick={() => {
                            openModel(true);
                          }}
                          className="text-[12px]  md:text-[12px] items-center cursor-pointer flex justify-start font-semibold px-6 blue_border_Button rounded-[30px] h-[38px]"
                        >
                          Preview
                        </button>
                        {loadingg ? (
                          <div className="flex justify-center items-center text-sm font-semibold px-6 bg_Button rounded-full h-[38px] w-[101.19px]">
                            <MiniLoader1 />
                          </div>
                        ) : (
                          <button
                            onClick={handleSubmit}
                            className="text-[12px] md:text-[14px] font-semibold  px-6  bg_Button rounded-[30px] h-[38px]"
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
