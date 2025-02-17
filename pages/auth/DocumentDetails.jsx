import React, { useState } from "react";
import { UploadSvg } from "../../utils/svg";
import axios from "axios";
import { toast } from "react-toastify";


function DocumentDetails({
  fileData,
  setFileData,
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
  const [loading, setLoading] = useState(false);

  const handleBack1 = () => {
    setProgress1(0);
    setIsCompleted1(false);
    updateTog(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
    validateInput(name, value.trim());
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      const file = files[0];

      if (file.size > 1048576) {
        setFormError((prev) => ({
          ...prev,
          [name]: "File size must be less than 1MB",
        }));
        return;
      }

      setFormData((prev) => ({ ...prev, [name]: file }));
      setFormError((prev) => {
        const updatedErrors = { ...prev };
        delete updatedErrors[name];
        return updatedErrors;
      });
    }
  };


  const validateInput = (fieldName, value) => {
    const errors = { ...formError };


    const fieldNames = {
      gstNo: "GST No",
      panNo: "PAN No",
      certificate: "Certificate",
      panFile: "PAN File",
      companyLogo: "Company Logo",
    };

    if (!value || (typeof value === "string" && !value.trim())) {
      errors[fieldName] = `${fieldNames[fieldName] || "This field"} is required`;
    }
    else if (
      (fieldName === "gstNo" && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/.test(value))
      ||
      (fieldName === "panNo" && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value))
    ) {
      errors[fieldName] = fieldName === "gstNo" ? "Invalid GST Number" : "Invalid PAN Number";
    } else if (
      value instanceof File &&
      !["image/png", "image/jpeg", "application/pdf"].includes(value.type)
    ) {
      errors[fieldName] = "Only PNG, JPEG, or PDF files are allowed";
    } else {
      delete errors[fieldName];
    }

    setFormError(errors);
  };

  const handleSubmit = () => {
    const requiredFields = ["gstNo", "panNo", "certificate", "panFile", "companyLogo"];
  
    const fieldNames = {
      gstNo: "GST No",
      panNo: "PAN No",
      certificate: "Certificate",
      panFile: "PAN File",
      companyLogo: "Company Logo",
    };
  
    let errors = {};
  
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        errors[field] = `${fieldNames[field]} is required`;
      }
    });
  
    setFormError(errors);
  
    if (Object.keys(errors).length > 0) {
      return; // Stop submission if there are errors
    }
  
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSend.append(key, value);
      }
    });
    
  
    const url = "http://localhost:2000/api/skiloteckuser/employerSignUp";
  
    axios
      .post(url, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const response = res.data;
        try {
          if (response?.success) {
            localStorage.setItem("authToken", JSON.stringify(response));
            window.location.href = `/?signIn=false`;
            toast.success("Sign up Successfully");
          } else {
            setLoading(false);
            if (response.message === "User already exists") {
              toast.error("User already exists");
            } else {
              toast.error("Something went wrong");
            }
          }
        } catch (err) {
          toast.error("Something went wrong");
          console.log(err);
        }
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Something went wrong");
        setLoading(false);
      });
  };
  

  console.log(formData)
  return (
    <div
      style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
      className={`${tog === 3 ? "flex" : "hidden"
        } bg-white w-[95%] md:w-[65%] scr1024:w-[55%] scr1067:w-[45%] rounded-[8px] md:rounded-[16px] p-3 md:p-6 flex-col gap-3 md:gap-6`}
    >
      <div className="w-full  gap-[20px] grid grid-cols-12">
        <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6">
          <label className="text-[16px] font-[500] text-[#333333]">
            GST No<span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="gstNo"
            value={formData.gstNo || ""}
            onChange={handleChange}
            placeholder="Enter GST number"
            className={`rounded-[8px] py-[8.2px] placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464] px-4 border w-full outline-none ${formError.gstNo ? "border-red" : "border-[#9D9D9D]"
              }`}
          />
          {formError.gstNo && <span className="text-red text-sm">{formError.gstNo}</span>}
        </div>
        <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6">
          <label className="text-[16px] font-[500] text-[#333333]">
            PAN No<span className="text-red">*</span>
          </label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo || ""}
            onChange={handleChange}
            placeholder="Enter PAN number"
            className={`rounded-[8px] py-[8.2px] px-4 placeholder:text-[14px] text-[14px] placeholder:font-[400] font-[400] placeholder:text-[#646464] text-[#646464] border w-full outline-none ${formError.panNo ? "border-red" : "border-[#9D9D9D]"
              }`}
          />
          {formError.panNo && <span className="text-red text-sm">{formError.panNo}</span>}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-[20px]">
        <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6">
          <label className="text-[16px] font-[500] text-[#333333]">
            Upload Certificate<span className="text-red">*</span>
          </label>
          <div className="h-[39px] rounded-[8px] py-[5.6px] px-4 border flex items-center justify-between cursor-pointer border-[#9D9D9D] upload-btn-wrapper">
            <input
              type="file"
              id="certificateInput"
              name="certificate"
              onChange={handleFileChange}
              className="w-full cursor-pointer text-[14px] font-[400] text-[#646464]"
            />
            {formData.certificate ?
            <p>{formData?.certificate?.name}</p>

              :
              <p className="text-[14px] text-[#646464]">Upload certificate</p>
            }
            <UploadSvg />
          </div>

          {formError.certificate && <span className="text-red text-sm">{formError.certificate}</span>}
        </div>

        <div className="flex flex-col gap-1 col-span-12 xlg:col-span-6">
          <label className="text-[16px] font-[500] text-[#333333]">
            Upload PAN<span className="text-red">*</span>
          </label>
          <div className="h-[39px] rounded-[8px] py-[5.6px] px-4 border flex items-center justify-between cursor-pointer border-[#9D9D9D] upload-btn-wrapper">
            <input
              type="file"
              id="panFileInput"
              name="panFile"
              onChange={handleFileChange}
              className="w-full cursor-pointer text-[14px] font-[400] text-[#646464]"
            />
             {formData.panFile ?
            <p>{formData?.panFile?.name}</p>

              :
              <p className="text-[14px] text-[#646464]">Upload Pan</p>
            }
            <UploadSvg />
          </div>
          {formError.panFile && <span className="text-red text-sm">{formError.panFile}</span>}
        </div>
      </div>

      <div className="flex w-full flex-col gap-1">
        <label className="text-[16px] font-[500] text-[#333333]">
          Company Logo<span className="text-red">*</span>
        </label>
        <div className="h-[39px] rounded-[8px] py-[5.6px] px-4 border flex items-center justify-between cursor-pointer border-[#9D9D9D] upload-btn-wrapper">
          <input
            type="file"
            id="companyLogoInput"
            name="companyLogo"
            onChange={handleFileChange}
              accept=".jpg,.jpeg,.png,"
            className="w-full cursor-pointer text-[14px] font-[400] text-[#646464] "
          />
           {formData.companyLogo ?
            <p>{formData?.companyLogo?.name}</p>

              :
              <p className="text-[14px] text-[#646464]">Upload Company Logo</p>
            }
            <UploadSvg />
        </div>
        {formError.companyLogo && <span className="text-red text-sm">{formError.companyLogo}</span>}
      </div>

      <div className="w-full flex justify-between">
        <button
          onClick={handleBack1}
          className="py-2 md:py-[8px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#333333]"
        >
          Go Back
        </button>
        <button
          onClick={handleSubmit}
          className="py-2 md:py-[8px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] bg-blue text-[12px] md:text-[16px] font-[500] text-[#FFFFFF]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default DocumentDetails;
