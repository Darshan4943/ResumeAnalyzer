import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import { telCode } from "../../utils/data";
import { useRouter } from "next/router";
import { UploadSvg } from "../../utils/svg";
function CompanyDetails({
  tog,
  updateTog,
  setIsCompleted,
  setProgress,
  setIsCompleted1,
  setProgress1,
  formData,
  setFormData,
}) {
  const [formError, setFormError] = useState({});
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
 
  const companyFields = [
    {
      title: "Company Name",
      placeholder: "Enter Company Name",
      name: "companyName",
    },
    {
      title: "Company Email",
      placeholder: "Enter Company Email",
      name: "companyEmail",
    },
    // { title: "Password", placeholder: "Create new password", name: "password", isVisible: true },
    {
      title: "Contact Number",
      placeholder: "Enter Contact Number",
      name: "contactNumber",
    },
    {
      title: "Company Website URL",
      placeholder: "Enter Company Website",
      name: "companyWebsite",
    },
    {
      title: "Year of Establishment",
      placeholder: "Enter Year of Establishment",
      name: "YearOfEstablish",
    },
    {
      title: "Company Location",
      placeholder: "Enter Current Location",
      name: "CompanyLocation",
      isLocation: true,
    },
    {
      title: "About Company",
      placeholder: "Enter About Company",
      name: "CompanyDetails",
    
    },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setFormData({
      ...formData,
      companyDialCode: item.dial_code,
      country: item.name,
    });
    setSearchTerm("");
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      delete updatedErrors.dial_code;
      return updatedErrors;
    });
  };
  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);
    const filteredCodes = telCode.filter(filterLogic);
    const firstSixCodes = filteredCodes.slice(0, 6);
    const remainingCodes = filteredCodes.slice(6);

    const sortedRemainingCodes = remainingCodes.sort((a, b) => {
      const numA = parseInt(a.dial_code.replace("+", ""), 10);
      const numB = parseInt(b.dial_code.replace("+", ""), 10);
      return numA - numB;
    });
    const combinedCodes = [...firstSixCodes, ...sortedRemainingCodes];
    setFilteredTelCode(combinedCodes);
  }, [telCode, searchTerm]);

  const customFilterOption = ({ label, value, data }, inputValue) => {
    const lowercasedInput = inputValue.toLowerCase();
    return (
      data.code.toLowerCase().includes(lowercasedInput) ||
      data.dial_code.includes(inputValue)
    );
  };

  const validateCompanyInput = (fieldName, value) => {
    let newErrors = { ...errors };

    switch (fieldName) {
      case "companyName":
        if (!value.trim()) {
          newErrors.companyName = "Company Name is required";
        } else {
          delete newErrors.companyName;
        }
        break;
      case "companyRegistration":
        if (!value.trim()) {
          newErrors.companyRegistration = "company Registration Number is required";
        } else {
          delete newErrors.companyRegistration;
        }
        break;


      case "companyEmail":
        if (!value.trim()) {
          newErrors.companyEmail = "Company Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors.companyEmail = "Invalid email format";
        } else {
          delete newErrors.companyEmail;
        }
        break;

      case "contactNumber":
        if (!value.trim()) {
          newErrors.contactNumber = "Contact Number is required";
        } else if (isNaN(value)) {
          newErrors.contactNumber = "Contact Number cannot be text";
        } else if (value.length < 10) {
          newErrors.contactNumber = "Contact Number must be at least 10 digits";
        } else {
          delete newErrors.contactNumber;
        }
        break;

      case "companyWebsite":
        if (!value.trim()) {
          newErrors.companyWebsite = "Company Website URL is required";
        } else if (
          !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2}(\/\S*)?$/.test(
            value
          )
        ) {
          newErrors.companyWebsite = "Invalid website URL";
        } else {
          delete newErrors.companyWebsite;
        }
        break;

      case "YearOfEstablish":
        if (!value.trim()) {
          newErrors.YearOfEstablish = "Year of Establishment is required";
        } else if (!/^\d{4}$/.test(value)) {
          newErrors.YearOfEstablish = "Enter a valid year (e.g., 2000)";
        } else {
          delete newErrors.YearOfEstablish;
        }
        break;

      case "CompanyLocation":
        if (!value.trim()) {
          newErrors.CompanyLocation = "Company Location is required";
        } else {
          delete newErrors.CompanyLocation;
        }
        break;
        case "CompanyDetails":
          if (!value.trim()) {
            newErrors.CompanyDetails = "Company Details are required";
          } else {
            delete newErrors.CompanyDetails;
          }
          break;
      default:
        break;
    }
    setErrors(newErrors);
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateCompanyInput(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};
    companyFields.forEach((field) => {
      const fieldError = validateCompanyInput(
        field.name,
        formData[field.name] || ""
      );
      if (Object.keys(fieldError).length > 0) {
        newErrors = { ...newErrors, ...fieldError };
      }
    });
    if (!formData.companyRegistration) {
      newErrors = { ...newErrors, companyRegistration: "Company Registration Number is required" }
    }
    if (!formData.certificate) {
      newErrors = { ...newErrors, certificate: "Company Certificate is required" }
    }
    if (!formData.companyLogo) {
      newErrors = { ...newErrors, companyLogo: "Company Logo is required" }
    }

    console.log(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);

      Object.values(newErrors).forEach((errorMessage) => {
        // toast.error("All fields are requireds");
      });

      return;
    }

    axios
      .post("http://localhost:2000/api/skiloteckuser/companyCheck", {
        companyEmail: formData.companyEmail,
      })
      .then((res) => {
        if (res.data.success) {
          updateTog(2);
          setProgress(100);
          setTimeout(() => setIsCompleted(true), 2000);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          toast.error("Company already exists");
        } else {
          console.error("API Error:", err.response?.data || err.message);
          toast.error("Something went wrong. Please try again later.");
        }
      });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      if (file.size > 1048576) {
        // setFormError((prev) => ({
        //   ...prev,
        //   [name]: "File size must be less than 1MB",
        // }));
        toast.error("File size must be less than 1MB")
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));
      delete errors.certificate;
      delete errors.companyLogo;
      setFormError((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };

  // console.log(formData)
  return (
    <div

      className={`flex  w-full rounded-[8px]  flex-col gap-3 md:gap-4 `}
    >
      {companyFields.map((field, index) => (
        <div key={index} className="flex w-full flex-col gap-1">
          <div className="text-[14px] md:text-[16px] font-[500] text-[#333333]">
            {field.title} <span className="text-red">*</span>
          </div>

          {field.name === "contactNumber" ? (
            <div className="flex gap-2">
              <ReactSelect
                options={filteredTelCode}
                className={`flex  items-center min-w-[160px] text-[14px] font-normal border border-[#9D9D9D] justify-center  rounded-[8px]  ${errors.contactNumber ? "border-red" : "border-[#9D9D9D]"
                  } `}
                name=""
                placeholder="Select"
                value={selectedItem}
                onChange={handleItemClick}
                getOptionLabel={(option) => (
                  <div className="flex items-center  ">
                    <img
                      src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                      width="20px"
                    />
                    <span className="ml-2 text-[#333333] text-[14px] font-[400]">
                      {option.code} {option.dial_code}
                    </span>
                  </div>
                )}
                // getOptionValue={(option) => option.code}
                filterOption={customFilterOption}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",

                    minWidth: "120px",
                    outline: "none",
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    // primary25: 'hotpink',
                    primary: "neutral0",
                  },
                })}
              />

              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  if (value.length <= 10) {
                    handleChange({ target: { name: "contactNumber", value } });
                  }
                }}
                placeholder={field.placeholder}
                className={`bg-[transparent] w-full outline-none text-[14px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border border-[#9D9D9D] rounded-[8px] py-[8px] px-4 ${errors.contactNumber ? "border-red" : "border-[#9D9D9D]"
                  } `}
              />
            </div>
          ) : (
            <div
              className={`flex rounded-[8px] py-[8px] px-4 border ${errors[field.name] ? "border-red" : "border-[#9D9D9D]"
                } `}
            >
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-[transparent] outline-none text-[14px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464]"
              />
            </div>
          )}



        </div>
      ))}

      <div className="grid grid-cols-12 gap-[20px]">
        <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6 items-start ">
          <p className="text-[14px] md:text-[16px] font-[500] text-[#333333]">Company Registration Number <span className="text-red">*</span></p>
          <input
            type="text"
            name="companyRegistration"
            value={formData.companyRegistration}
            onChange={handleChange}
            placeholder="Enter Company Registration Number"
            className={` bg-[transparent] w-full outline-none text-[14px] placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464] border border-[#9D9D9D] rounded-[8px] py-[8px] px-4 ${errors.companyRegistration ? "border-red" : "border-[#9D9D9D]"
              } `}
          />
        </div>
        <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6">
          <label className="text-[14px] md:text-[16px] font-[500] text-[#333333]">
            Certificate<span className="text-red">*</span>
          </label>
          <div className={`h-[38.6px] rounded-[8px] py-[5.6px] px-4 border flex items-center justify-between cursor-pointer ${errors.certificate ? "border-red" : "border-[#9D9D9D]"} upload-btn-wrapper`}>
            <input
              type="file"
              id="certificateInput"
              name="certificate"
              onChange={handleFileChange}
              className="w-full h-[38.6px] cursor-pointer text-[14px] font-[400] text-[#646464] py-2"
            />
            {formData.certificate ?
              <p className=" ">
                {formData?.certificate?.name?.length > 20
                  ? formData.certificate.name.slice(0, 20) + "..."
                  : formData?.certificate?.name}
              </p>


              :
              <p className="text-[14px] text-[#646464]">Upload certificate</p>
            }
            <UploadSvg />
          </div>
          {formError.certificate && <span className="text-red text-sm">{formError.certificate}</span>}

        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <label className="text-[14px] md:text-[16px] font-[500] text-[#333333]">
          Company Logo <span className="text-red">*</span>
        </label>
        <div className={`h-[38.6px] rounded-[8px] py-[5.6px] px-4 border flex items-center justify-between cursor-pointer  ${errors.companyLogo ? "border-red" : "border-[#9D9D9D]"} upload-btn-wrapper`}>
          <input
            type="file"
            id="companyLogoInput"
            name="companyLogo"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,"
            className="w-full cursor-pointer text-[14px] font-[400] text-[#646464] "
          />
          {formData.companyLogo ?
            <p>
              {formData?.companyLogo?.name?.length > 40
                ? formData.companyLogo.name.slice(0, 40) + "..."
                : formData?.companyLogo?.name}
            </p>
            :
            <p className="text-[14px] text-[#646464]">Upload Company Logo</p>
          }
          <UploadSvg />
        </div>
        {formError.companyLogo && <span className="text-red text-sm">{formError.companyLogo}</span>}
      </div>
      <div className="w-full flex justify-between">
        <button
          onClick={() => {
            router.push("/auth?signup=true");
          }}
          className="px-4 md:px-6  rounded-[30px] md:rounded-[30px] text-[14px] md:text-[16px] font-[500] h-[38px] blue_border_Button"
        >
          Go Back
        </button>
        <button
          onClick={handleSubmit}
          className=" px-4 md:px-6  rounded-[30px]  md:rounded-[30px] text-[14px] md:text-[16px] font-[500] bg_Button h-[38px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default CompanyDetails;
