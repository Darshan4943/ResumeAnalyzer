import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function CompanyDetails({ tog, updateTog, setIsCompleted, setProgress, setIsCompleted1, setProgress1, formData, setFormData }) {
    const [errors, setErrors] = useState({});
    const companyFields = [
        { title: "Company Name", placeholder: "Enter company name", name: "companyName" },
        { title: "Company Email", placeholder: "Enter company email", name: "companyEmail" },
        // { title: "Password", placeholder: "Create new password", name: "password", isVisible: true },
        { title: "Contact Number", placeholder: "Enter contact number", name: "contactNumber" },
        { title: "Company Website URL", placeholder: "Enter company website", name: "companyWebsite" },
        { title: "Year of Establish", placeholder: "Enter year of establish", name: "YearOfEstablish" },
        { title: "Company Location", placeholder: "Enter your current location", name: "CompanyLocation", isLocation: true },
    ];

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

            case "companyEmail":
                if (!value.trim()) {
                    newErrors.companyEmail = "Company Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    newErrors.companyEmail = "Invalid email format";
                } else {
                    delete newErrors.companyEmail;
                }
                break;

            // case "password":
            //     if (!value.trim() || value.length < 6) {
            //         newErrors.password = "Password must be at least 6 characters long";
            //     } else if (!validatePassword(value)) {
            //         newErrors.password =
            //             "Password should include one uppercase letter, one lowercase letter, one number, and one special character.";
            //     } else {
            //         delete newErrors.password;
            //     }
            //     break;

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
                    !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,}){1,2}(\/\S*)?$/.test(value)
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
            const fieldError = validateCompanyInput(field.name, formData[field.name] || "");
            if (Object.keys(fieldError).length > 0) {
                newErrors = { ...newErrors, ...fieldError };
            }
        });
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);

            Object.values(newErrors).forEach((errorMessage) => {
                // toast.error("All fields are requireds");
            });

            return;
        }

        axios
        .post("https://dev.api.skilotech.com/api/skiloteckuser/companyCheck", {
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

    const handleBack1 = () => {
        setProgress1(0);
        setIsCompleted1(false);
        updateTog(2)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div style={{ boxShadow: "0px 1px 6px 0px #00000040" }} className={`${tog === 1 ? "flex" : "hidden"} bg-white w-[95%] md:w-[65%] scr1024:w-[55%] scr1067:w-[45%] rounded-[8px] md:rounded-[16px] p-3 md:p-6 flex-col gap-3 md:gap-6 `}>
            {companyFields.map((field, index) => (
                <div key={index} className="flex w-full flex-col gap-1">
                    <div className="text-[14px] md:text-[16px] font-[500] text-[#333333]">{field.title} <span className="text-red">*</span></div>
                    <div className={`flex rounded-[8px] py-[12px] px-4 border ${errors[field.name] ? 'border-red' : 'border-[#9D9D9D]'} `}>
                        <input
                            type="text"
                            // type={(visiblePass && field.isVisible) ? "password" : "text"}
                            name={field.name}
                            id=""
                            value={formData[field.name]}
                            onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full bg-[transparent] outline-none text-[12px] placeholder:text-[12px] placeholder:font-[400] placeholder:text-[#646464]"
                        />
                        {(field.isLocation) &&
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g mask="url(#mask0_3761_54801)">
                                    <path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 19.35C14.0333 17.4833 15.5417 15.7875 16.525 14.2625C17.5083 12.7375 18 11.3833 18 10.2C18 8.38333 17.4208 6.89583 16.2625 5.7375C15.1042 4.57917 13.6833 4 12 4C10.3167 4 8.89583 4.57917 7.7375 5.7375C6.57917 6.89583 6 8.38333 6 10.2C6 11.3833 6.49167 12.7375 7.475 14.2625C8.45833 15.7875 9.96667 17.4833 12 19.35ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z" fill="#646464" />
                                </g>
                            </svg>
                        }
                    </div>
                    {errors[field.name] && (
                        <p className="text-[12px] text-red font-[500]">
                            {errors[field.name]}
                        </p>
                    )}
                </div>
            ))}
            <div className="w-full flex justify-between">
                <button onClick={() => { router.back() }} className="py-2 md:py-[8px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] md:rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#333333]">Go Back</button>
                <button onClick={handleSubmit} className="py-2 md:py-[8px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] bg-blue md:rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#FFFFFF]">Continue</button>
            </div>
        </div>
    )
}

export default CompanyDetails