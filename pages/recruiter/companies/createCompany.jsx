import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import debounce from "lodash.debounce";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import ImageContainer from "../../../components/common/image";
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import MiniLoader from "../../../components/common/miniLoader";
import MiniLoader1 from "../../../components/common/mini-loader";
import ImageCropper from "../../../components/featured/candidate/createResume/components/imageCropper";
import Select from "react-select";
function CreateCompany() {
  const [id, setId] = useState("");
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [file, setFile] = useState(null);
  const [modelView, setModelView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const router = useRouter();
  const [hrEmailText, setHrEmailText] = useState("");
  const [hrContactText, setHrContactText] = useState("");
  const { companyId } = router.query;
  const [errors, setErrors] = useState({});
  const [buttonLoading, setButtonLoading] = useState(false);
  const [data, setData] = useState({
    companyName: "",
    companySector: [],
    companyLogo: "",
    companyDescription: "",
    companyAddress: "",
    companyWebsite: "",
    companyMail: "",
    companySize: "",
    hrEmail: [],
    hrContact: [],
  });


  const [dragging, setDragging] = useState(false);
  const fileRef = useRef(null);

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleClick = () => {
    if (!isButtonDisabled) {
      setIsButtonDisabled(true);
      (companyId ? handleUpdate() : handleSubmit()).finally(() => {
        setIsButtonDisabled(false);
      });
    }
  };

  useEffect(() => {
    if (userDataGlobal?.id) {
      setId(userDataGlobal?._id);
    }
  }, [userDataGlobal]);


  useEffect(() => {
    if (!companyId) return;
    const fetchCompanyDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.skilotech.com/api/company/fetchCompaniDetails/${companyId}`
        );

        if (response.data) {
          setData({
            companyName: response.data.companyName,
            companySector: response.data.companySector
              ? response.data.companySector.map((sector) => ({
                value: sector,
                label: sector,
              }))
              : [],
            companyLogo: response.data.companyLogo,
            companyDescription: response.data.companyDescription,
            companyAddress: response.data.companyAddress,
            companyWebsite: response.data.companyWebsite,
            companyMail: response.data.companyMail,
            companySize: response.data.companySize,
            hrEmail: response.data.hrEmail,
            hrContact: response.data.hrContact,
          });
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanyDetails();
  }, [companyId]);

  const debounceUpdate = useCallback(
    debounce((value) => {
      setData((prev) => ({ ...prev, companyDescription: value }));
    }, 500),
    []
  );

  const handleCompanyDescriptionChange = (value) => {
    if (value?.length < 200) {
      setData({ ...data, companyDescription: value.slice(0, 200) });
      debounceUpdate(value.slice(0, 200));
    } else {
      setData({ ...data, companyDescription: value });
      debounceUpdate(value);
    }
  };

  const handleSelect = (selectedOptions) => {
    setData({ ...data, companySector: selectedOptions });
    setShowDropdown(false);
  };
  const handleSelectSize = (selectedOption) => {
    console.log(selectedOption);
    setData({ ...data, companySize: selectedOption?.value || "" });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };
  const handleInputChangee = (inputValue) => {
    if (!inputValue.trim()) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option) =>
          option?.label?.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  };

  const camelCaseToWords = (str) => {
    return str
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/^./, (char) => char.toUpperCase());
  };

  const validateForm = () => {
    const newErrors = {};
    let initialErrorShown = false;

    if (!data?.companyName?.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (data?.companySector?.length < 1) {
      newErrors.companySector = "Company sector is required.";
    }
    if (!data?.companyDescription?.replace(/<[^>]*>/g, "").trim()) {
      newErrors.companyDescription = "Company description is required.";
    }

    if (Object.keys(newErrors).length > 0) {
      if (!initialErrorShown && Object.keys(newErrors).length > 1) {
        toast.error("All fields are required.");
        initialErrorShown = true;
      } else if (Object.keys(newErrors).length === 1) {
        const field = Object.keys(newErrors)[0];
        toast.error(`${camelCaseToWords(field)} is required.`);
      }
    }

    setErrors(newErrors);
    setButtonLoading(false);
    return Object.keys(newErrors).length === 0;
  };

  const handleReset = () => {
    setData({
      companyName: "",
      companySector: [],
      companyLogo: "",
      companyDescription: "",
      companyAddress: "",
      companyWebsite: "",
      companyMail: "",
      companySize: "",
      hrEmail: [],
      hrContact: [],
    });
    setCroppedImage(null);
    setFile(null);
    setErrors({});
  };

  const handleFileChange = (event) => {
    event?.preventDefault();
    const selectedFile = event.target.files
      ? event.target.files[0]
      : event.dataTransfer.files[0];
    if (selectedFile) {
      if (
        selectedFile.size <= 3 * 1024 * 1024 &&
        selectedFile.type.includes("image")
      ) {
        setFile(selectedFile);
        setModelView(true);
        setErrors((prev) => ({ ...prev, companyLogo: "" }));
      } else {
        toast.error("Only image files up to 3MB are allowed.");
      }
      event.target.value = "";
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

  const handleSubmit = async () => {
    setButtonLoading(true);
    if (!validateForm()) return;
    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append(
        "companySector",
        JSON.stringify(data.companySector.map((sector) => sector.value))
      );
      formData.append("companyDescription", data.companyDescription);
      formData.append("companyAddress", data.companyAddress);
      formData.append("companyWebsite", data.companyWebsite);
      formData.append("companyMail", data.companyMail);
      formData.append("companySize", data.companySize);
      formData.append("hrEmail", data.hrEmail);
      formData.append("hrContact", data.hrContact);
      if (croppedImage) {
        const response = await fetch(croppedImage.url);
        const blob = await response.blob();
        const file = new File([blob], "companyLogo.jpg", {
          type: "image/jpeg",
        });
        formData.append("croppedImage", file);
      }
      const response = await axios.post(
        `https://api.skilotech.com/api/company/addCompany/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      if (response.data.success) {
        setButtonLoading(false);
        toast.success(response.data.message);
        router.push("/recruiter/companies");
      } else {
        setButtonLoading(false);
        toast.error("Failed to add company.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setButtonLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleUpdate = async () => {
    setButtonLoading(true);
    if (!validateForm()) return;

    // setData(prev => ({ ...prev, hrContact: [...prev.hrContact, hrContactText] }))

    try {
      const formData = new FormData();
      formData.append("companyName", data.companyName);
      formData.append(
        "companySector",
        JSON.stringify(data.companySector.map((sector) => sector.value))
      );
      formData.append("companyDescription", data.companyDescription);
      formData.append("companyAddress", data.companyAddress);
      formData.append("companyWebsite", data.companyWebsite);
      formData.append("companyMail", data.companyMail);
      formData.append("companySize", data.companySize);
      formData.append("hrEmail", hrEmailText.length > 0 ? [...data.hrEmail, hrEmailText] : data.hrEmail);
      formData.append("hrContact", hrContactText.length > 0 ? [...data.hrContact, hrContactText] : data.hrContact);
      if (croppedImage) {
        const response = await fetch(croppedImage.url);
        const blob = await response.blob();
        const file = new File([blob], "companyLogo.jpg", {
          type: "image/jpeg",
        });
        formData.append("croppedImage", file);
      }

      const response = await axios.put(
        `https://api.skilotech.com/api/company/updateCompanyDetails/${companyId}/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.success) {
        setButtonLoading(false);
        toast.success(response.data.message);
        router.push("/recruiter/companies");
      } else {
        setButtonLoading(false);
        toast.error(response.data.message || "Failed to update company.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setButtonLoading(false);
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const previousPage = () => router.back();

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
        <button className="ql-align" value="" aria-label="Align Left"></button>
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

  const [options, setOptions] = useState([
    "Aerospace & Defense",
    "Agriculture",
    "Artificial Intelligence",
    "Automotive",
    "Banking",
    "Biotechnology",
    "Blockchain",
    "Chemicals",
    "Cloud Computing",
    "Construction",
    "Consulting",
    "Consumer Electronics",
    "Cybersecurity",
    "Defense",
    "Design",
    "E-commerce",
    "EdTech",
    "Education",
    "Electrical & Electronics",
    "Energy",
    "Engineering",
    "Entertainment",
    "Environmental Services",
    "Fashion & Apparel",
    "Finance",
    "FinTech",
    "Food & Beverage",
    "Gaming",
    "Government",
    "Healthcare",
    "HealthTech",
    "Hospitality",
    "Human Resources",
    "Import & Export",
    "Industrial Automation",
    "Information Technology",
    "Insurance",
    "InsurTech",
    "Interior Design",
    "IT Services",
    "Legal Services",
    "Logistics",
    "Manufacturing",
    "MarTech",
    "Marketing & Advertising",
    "Media & Entertainment",
    "Mining & Metals",
    "Nonprofit & NGOs",
    "Oil & Gas",
    "Pharmaceuticals",
    "Photography",
    "Professional Services",
    "PropTech",
    "Real Estate",
    "Renewable Energy",
    "Retail",
    "Robotics",
    "Scientific Research",
    "Security Services",
    "Shipping & Ports",
    "Social Media",
    "Software Development",
    "Sports & Recreation",
    "Supply Chain",
    "Telecommunications",
    "Tourism",
    "Toys & Games",
    "Transportation",
    "Travel",
    "Utilities",
    "Veterinary",
    "Waste Management",
    "Wholesale & Distribution"
  ]);
  const companySizeOptions = [
    { value: "1-10", label: "1–10 employees" },
    { value: "11-50", label: "11–50 employees" },
    { value: "51-200", label: "51–200 employees" },
    { value: "201-500", label: "201–500 employees" },
    { value: "501-1000", label: "501–1000 employees" },
    { value: "1001-5000", label: "1001–5000 employees" },
    { value: "5001-10000", label: "5001–10,000 employees" },
    { value: "10000+", label: "10,000+ employees" },
  ];


  const [filteredOptions, setFilteredOptions] = useState(options);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full relative flex flex-col gap-5">
      <div className="flex gap-3 scr340:text-[16px] text-[16px] font-[600] text-[#333333] items-center">
        <svg
          onClick={previousPage}
          viewBox="0 0 24 24"
          fill="none"
          className="cursor-pointer w-[20px] h-[24px] scr340:w-[24px]"
        >
          <path
            d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z"
            fill="#1C1B1F"
          />
        </svg>
        Add Company Profile
      </div>
      {loading ? (
        <div className=" min-h-[360px] ">
          <MiniLoader />
        </div>
      ) : (
        <div
          className=" gap-[32px] bg-[#FFFFFF] rounded-[16px] w-full scr800:p-6 p-3"
          style={{ boxShadow: "0px 1px 2px 0px #00000040" }}
        >
          <div className=" flex flex-col  gap-[24px] bg-[#FFFFFF]">
            <div className="flex flex-col gap-4 ">
              <div className="flex gap-4 w-full sm:min-w-[310px]  flex-col justify-between">
                <div className="flex w-full md:flex-row  flex-col md:gap-[24px] gap-4">
                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1">
                      {" "}
                      Company Name <span className="text-red">*</span>
                    </div>
                    <input
                      type="text"
                      name="companyName"
                      value={data.companyName}
                      onChange={handleInputChange}
                      placeholder="Enter Company Name"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div>
                  {/* <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1"> Company Mail</div>
                    <input
                      type="text"
                      name="companyMail"
                      value={data.companyMail}
                      onChange={handleInputChange}
                      placeholder="Enter Company Mail"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div> */}
                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1">
                      Company Sector <span className="text-red">*</span>
                    </div>
                    <Select
                      isMulti
                      name="companySector"
                      options={options.map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      value={data.companySector}
                      onChange={handleSelect}
                      onInputChange={handleInputChangee}
                      placeholder="Enter or Select Company Sector"
                      className="w-full"
                      classNamePrefix="select"
                    />
                  </div>


                </div>
                <div className="flex w-full flex-col md:flex-row gap-4 md:gap-[24px]">
                  {/* <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <label className="gap-1">HR POC Contact</label>
                    <input
                      type="text"
                      name="hrContact"
                      value={data.hrContact}
                      onChange={handleInputChange}
                      placeholder="Enter HR Contact Number"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border border-[#DEDEDE] outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div>

                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <label className="gap-1">HR POC Email</label>
                    <input
                      type="email"
                      name="hrEmail"
                      value={data.hrEmail}
                      onChange={handleInputChange}
                      placeholder="Enter HR Email Address"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border border-[#DEDEDE] outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div> */}
                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <label className="gap-1">HR POC Contact</label>
                    <div
                      className={`w-full flex ${data?.hrContact ? "justify-between" : ""
                        } gap-2 border-[1px] rounded-[8px] px-2 h-[38px]  ${"border-[#DEDEDE]"
                        }`}
                    >
                      <div className="flex gap-4 w-[90%]  items-center">
                        {data?.hrContact.length > 0 && (
                          <div
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            id="scroll"
                            className="overflow-x-auto flex gap-2 "
                          >
                            {Array.isArray(data?.hrContact) &&
                              data.hrContact.map((item, index) => (
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
                                        hrContact: data?.hrContact.filter(
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
                          placeholder="Enter Contact "
                          className="input w-[130px] placeholder:text-[12px] placeholder:font-[400] outline-none"
                          value={hrContactText}
                          onChange={(e) => {
                            setHrContactText(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        disabled={hrContactText?.length == 0}
                        onClick={() => {
                          setData({
                            ...data,
                            hrContact: [...data.hrContact, hrContactText],
                          });
                          setHrContactText("");

                          setTimeout(() => {
                            const scrollDiv =
                              document.getElementById("scroll");
                            if (scrollDiv) {
                              scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                            }
                          }, 100);

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
                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <label className="gap-1">HR POC Email</label>
                    <div
                      className={`w-full flex ${data?.hrEmail ? "justify-between" : ""
                        } gap-2 border-[1px] rounded-[8px] px-2 h-[38px]  ${"border-[#DEDEDE]"
                        }`}
                    >
                      <div className="flex gap-4 w-[90%]  items-center">
                        {data?.hrEmail.length > 0 && (
                          <div
                            style={{
                              scrollbarWidth: "none",
                              msOverflowStyle: "none",
                            }}
                            id="scroll"
                            className="overflow-x-auto flex gap-2 "
                          >
                            {Array.isArray(data?.hrEmail) &&
                              data.hrEmail.map((item, index) => (
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
                                        hrEmail: data?.hrEmail.filter(
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
                          placeholder="Enter email"
                          className="input w-[130px] placeholder:text-[12px] placeholder:font-[400] outline-none"
                          value={hrEmailText}
                          onChange={(e) => {
                            setHrEmailText(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        disabled={hrEmailText?.length == 0}
                        onClick={() => {
                          setData({
                            ...data,
                            hrEmail: [...data.hrEmail, hrEmailText],
                          });
                          setHrEmailText("");

                          setTimeout(() => {
                            const scrollDiv =
                              document.getElementById("scroll");
                            if (scrollDiv) {
                              scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                            }
                          }, 100);

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
                <div className="flex w-full md:flex-row  flex-col  md:gap-[24px] gap-4">

                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1"> Company Website</div>
                    <input
                      type="text"
                      name="companyWebsite"
                      value={data.companyWebsite}
                      onChange={handleInputChange}
                      placeholder="Enter Company Website"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div>

                  {/* <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1"> Company Size</div>
                    <input
                      type="text"
                      name="companySize"
                      value={data.companySize}
                      onChange={handleInputChange}
                      placeholder="Enter Company Size"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div> */}
                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1">
                      Company Size <span className="text-red">*</span>
                    </div>
                    <Select
                      name="companySize"
                      options={companySizeOptions}
                      value={companySizeOptions.find(opt => opt.value === data.companySize)}
                      onChange={handleSelectSize}
                      placeholder="Enter or Select Company Size"
                      className="w-full"
                      classNamePrefix="select"
                      styles={{
                        singleValue: (base) => ({
                          ...base,
                          whiteSpace: "normal",
                          overflow: "visible",
                          textOverflow: "unset",
                          wordBreak: "break-word",
                        }),

                      }}
                    />

                  </div>




                </div>
                <div className="flex w-full  md:flex-row  flex-col  md:gap-[24px] gap-4">
                  <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                    <div className="gap-1"> Company Address</div>
                    <input
                      type="text"
                      name="companyAddress"
                      value={data.companyAddress}
                      onChange={handleInputChange}
                      placeholder="Enter Company Address"
                      className="placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border-[1px] border-[#DEDEDE] border-solid outline-none rounded-[8px] px-4 py-2 h-[44px]"
                    />
                  </div>

                </div>

              </div>
            </div>

            <div className="flex w-full md:flex-row  flex-col  gap-[16px]">
              <div className=" w-[310px] flex flex-col  items-center  gap-[40px]">
                <div className=" w-full flex flex-col gap-[8px] text-[#333333] text-[14px] font-[500]">
                  Company Logo
                  <div className="text-[#7C8493] text-[12px] font-[400]">
                    This image will be shown publicly as company logo.
                  </div>
                </div>
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className=" w-full flex flex-col gap-[26px] items-center justify-between"
                >
                  {(croppedImage ||
                    data?.companyLogo ||
                    "/images/jobs/logo.png") && (
                      <ImageContainer
                        value={data?.companyLogo}
                        src={
                          croppedImage?.url ||
                          data?.companyLogo ||
                          "/images/jobs/logo.png"
                        }
                        alt="Selected File"
                        className="w-[143.95%] h-[60px] object-contain"
                      />
                    )}

                  <input
                    type="file"
                    ref={fileRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-logo"
                  />
                  <label
                    htmlFor="upload-logo"
                    className="px-4 py-2 bg-[#EFFAFF] rounded-lg flex flex-col items-center border-dashed border-[1px] border-[#06A9EF] cursor-pointer"
                  >
                    <div className="text-[12px] font-[400] text-[#333333]">
                      <span className="text-[#06A9EF]">Click to replace</span>{" "}
                      or drag and drop
                    </div>
                    <div className="text-[10px] font-[400] text-[#333333]">
                      SVG, PNG, JPG or GIF (max. 400 x 400px)
                    </div>
                  </label>
                </div>
              </div>
              <div className="flex w-full flex-col gap-2 text-[14px] font-[500] text-[#333333]">
                <div className="gap-1 ">
                  {" "}
                  About Company <span className="text-red">*</span>
                </div>
                <Editor
                  headerTemplate={header}
                  value={data.companyDescription}
                  onTextChange={(e) =>
                    handleCompanyDescriptionChange(e.htmlValue)
                  }
                  maxLength={200}
                  style={{
                    border: "0px solid #dedede",
                    fontSize: "16px",
                    color: "#333",
                    padding: "10px",
                    // borderBottomLeftRadius: "8px",
                    // borderBottomRightRadius: "8px",
                    minHeight: "296px",
                    height: "212px",
                  }}
                  className={`editor-container ${window.location.pathname ===
                    "/recruiter/companies/createCompany"
                    ? "create-company-height"
                    : ""
                    } editor-container `}
                  onPaste={(e) => e.preventDefault()}
                />
                <div className="text-[12px] text-gray-500">
                  {data.companyDescription
                    ? data.companyDescription.replace(/<[^>]*>/g, "").length >
                      200
                      ? 200
                      : data.companyDescription.replace(/<[^>]*>/g, "").length
                    : 0}{" "}
                  / 200 characters
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex justify-between pt-5">
            <button
              onClick={router.back}
              className="rounded-[30px] px-2 ms:px-6 h-[38px] red text-[14px] font-[600] red_border_Button"
            >
              Cancel
            </button>
            <div className="flex gap-[2px] scr340:gap-[14px]">
              <button
                onClick={handleReset}
                className="rounded-[30px]  px-3 ms:px-6 text-[14px] font-[600] blue_border_Button h-[38px]"
              >
                Reset
              </button>
              <button
                onClick={handleClick}
                disabled={isButtonDisabled}
                className="rounded-[30px]  px-3 ms:px-6 text-[14px] font-[600] bg_Button h-[38px]"
              >
                {isButtonDisabled ? (
                  <MiniLoader1 />
                ) : companyId ? (
                  "Update Details"
                ) : (
                  "Save Details"
                )}
              </button>
            </div>
          </div>
        </div>
      )}



      {modelView && (
        <ImageCropper
          setModelView={setModelView}
          file={file}
          isLogo={true}
          setCroppedImage={setCroppedImage}
        />
      )}
    </div>
  );
}

export default CreateCompany;
