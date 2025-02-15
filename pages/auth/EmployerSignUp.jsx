import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { toast } from "react-toastify";
import AdminDetails from "./adminDetails";
const EmployerSignUp = () => {
    const router = useRouter();
    const [tog, setTog] = useState(1);
    const [visiblePass, setVisiblePass] = useState(false);
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [progress, setProgress] = useState(0);
    const [progress1, setProgress1] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [isCompleted1, setIsCompleted1] = useState(false);
    const companyFields = [
        { title: "Company Name", placeholder: "Enter company name", name: "companyName" },
        { title: "Company Email", placeholder: "Enter company email", name: "companyEmail" },
        // { title: "Password", placeholder: "Create new password", name: "password", isVisible: true },
        { title: "Contact Number", placeholder: "Enter contact number", name: "contactNumber" },
        { title: "Company Website URL", placeholder: "Enter company website", name: "companyWebsite" },
        { title: "Year of Establish", placeholder: "Enter year of establish", name: "YearOfEstablish" },
        { title: "Company Location", placeholder: "Enter your current location", name: "CompanyLocation", isLocation: true },
    ];
    function validatePassword(password) {
        const strongPasswordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%*?&])[A-Za-z\d@#$!%*?&]{6,}$/;
        return strongPasswordRegex.test(password);
    }
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

    function updateTog(id) {
        setTog(id);
    }


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
                toast.error("All fields are requireds");
            });

            return;
        }


        updateTog(2);
        setProgress(100);
        setTimeout(() => {
            setIsCompleted(true);
        }, 2000);

    };

    const handleBack = () => {
        setProgress(0);
        setIsCompleted(false);
        updateTog(1)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    const handleBack1 = () => {
        setProgress1(0);
        setIsCompleted1(false);
        updateTog(2)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    useEffect(() => {
        if (tog === 2) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [tog]);
console.log(12,formData)
    return (
        <div className="w-full relative flex items-center flex-col gap-[18px] pb-[62px]">
            <div className="sticky z-[100] w-full top-[47px] bg-[#F3F4F5] pt-[10px] md:pt-[24px]">
                <div className="w-full bg-[#FFDA1D] flex items-center flex-col gap-2 py-[6px] ">
                    <span className="text-[24px] md:text-[30px] font-[600] text-[#333333]">Register as Employer</span>
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333]">Start your Search with Skilotech</span>
                </div>
            </div>
            <div className="flex w-full items-center flex-col gap-1 pb-[18px]">
                <div className="flex w-full px-[44px] justify-center items-center">
                    <svg className="min-w-[16px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="#C7C7C7" />
                        <circle cx="12" cy="12" r="8" fill="#FFDA1D" />
                    </svg>
                    <div className="relative h-[2px] w-full md:w-[312px]">
                        <div className=" w-full h-full bg-[#C7C7C7] "></div>
                        <div style={{ width: `${progress}%`, transition: "width 2s ease-in-out" }} className="absolute top-0 h-full bg-[#FFDA1D] "></div>
                    </div>
                    <svg className="min-w-[16px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="#C7C7C7" />
                        {isCompleted && <circle cx="12" cy="12" r="8" fill="#FFDA1D" />}
                    </svg>
                    <div className="relative h-[2px] w-full md:w-[312px]">
                        <div className=" w-full h-full bg-[#C7C7C7] "></div>
                        <div style={{ width: `${progress1}%`, transition: "width 2s ease-in-out" }} className="absolute top-0 h-full bg-[#FFDA1D] "></div>
                    </div>
                    <svg className="min-w-[16px]" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="11.5" fill="transparent" stroke="#C7C7C7" />
                        {isCompleted1 && <circle cx="12" cy="12" r="8" fill="#FFDA1D" />}
                    </svg>
                </div>
                <div className="flex w-full items-center justify-between md:justify-center  md:gap-[188px] px-1">
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">Company Details</span>
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">Admin Details</span>
                    <span className="text-[12px] md:text-[16px] font-[500] text-[#333333] text-center w-[100px] md:w-auto">Upload Documents</span>
                </div>
            </div>


            {/* Company Details */}
            <div style={{ boxShadow: "0px 1px 6px 0px #00000040" }} className={`${tog === 1 ? "flex" : "hidden"} bg-white w-[95%] md:w-[45%] rounded-[8px] md:rounded-[16px] p-3 md:p-6 flex-col gap-3 md:gap-6 `}>
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
                            {/* {(field.isVisible && !visiblePass) &&
                                <svg onClick={() => { setVisiblePass(true) }} className="cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g mask="url(#mask0_3761_54785)">
                                        <path d="M16.1 13.2998L14.65 11.8498C14.8 11.0665 14.575 10.3331 13.975 9.64981C13.375 8.96647 12.6 8.69981 11.65 8.84981L10.2 7.39981C10.4833 7.26647 10.7708 7.16647 11.0625 7.0998C11.3542 7.03314 11.6667 6.9998 12 6.9998C13.25 6.9998 14.3125 7.4373 15.1875 8.3123C16.0625 9.1873 16.5 10.2498 16.5 11.4998C16.5 11.8331 16.4667 12.1456 16.4 12.4373C16.3333 12.729 16.2333 13.0165 16.1 13.2998ZM19.3 16.4498L17.85 15.0498C18.4833 14.5665 19.0458 14.0373 19.5375 13.4623C20.0292 12.8873 20.45 12.2331 20.8 11.4998C19.9667 9.81647 18.7708 8.47897 17.2125 7.48731C15.6542 6.49564 13.9167 5.9998 12 5.9998C11.5167 5.9998 11.0417 6.03314 10.575 6.0998C10.1083 6.16647 9.65 6.26647 9.2 6.39981L7.65 4.8498C8.33333 4.56647 9.03333 4.35397 9.75 4.2123C10.4667 4.07064 11.2167 3.9998 12 3.9998C14.5167 3.9998 16.7583 4.69564 18.725 6.08731C20.6917 7.47897 22.1167 9.28314 23 11.4998C22.6167 12.4831 22.1125 13.3956 21.4875 14.2373C20.8625 15.079 20.1333 15.8165 19.3 16.4498ZM19.8 22.5998L15.6 18.4498C15.0167 18.6331 14.4292 18.7706 13.8375 18.8623C13.2458 18.954 12.6333 18.9998 12 18.9998C9.48333 18.9998 7.24167 18.304 5.275 16.9123C3.30833 15.5206 1.88333 13.7165 1 11.4998C1.35 10.6165 1.79167 9.79564 2.325 9.03731C2.85833 8.27897 3.46667 7.5998 4.15 6.9998L1.4 4.1998L2.8 2.7998L21.2 21.1998L19.8 22.5998ZM5.55 8.39981C5.06667 8.83314 4.625 9.30814 4.225 9.82481C3.825 10.3415 3.48333 10.8998 3.2 11.4998C4.03333 13.1831 5.22917 14.5206 6.7875 15.5123C8.34583 16.504 10.0833 16.9998 12 16.9998C12.3333 16.9998 12.6583 16.979 12.975 16.9373C13.2917 16.8956 13.6167 16.8498 13.95 16.7998L13.05 15.8498C12.8667 15.8998 12.6917 15.9373 12.525 15.9623C12.3583 15.9873 12.1833 15.9998 12 15.9998C10.75 15.9998 9.6875 15.5623 8.8125 14.6873C7.9375 13.8123 7.5 12.7498 7.5 11.4998C7.5 11.3165 7.5125 11.1415 7.5375 10.9748C7.5625 10.8081 7.6 10.6331 7.65 10.4498L5.55 8.39981Z" fill="#646464" />
                                    </g>
                                </svg>
                            }
                            {(field.isVisible && visiblePass) &&
                                <svg onClick={() => { setVisiblePass(false) }} className="cursor-pointer" width="24" height="24" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g mask="url(#mask0_8664_91247)">
                                        <path d="M8.00156 11.166C8.8349 11.166 9.54323 10.8743 10.1266 10.291C10.7099 9.70768 11.0016 8.99935 11.0016 8.16602C11.0016 7.33268 10.7099 6.62435 10.1266 6.04102C9.54323 5.45768 8.8349 5.16602 8.00156 5.16602C7.16823 5.16602 6.4599 5.45768 5.87656 6.04102C5.29323 6.62435 5.00156 7.33268 5.00156 8.16602C5.00156 8.99935 5.29323 9.70768 5.87656 10.291C6.4599 10.8743 7.16823 11.166 8.00156 11.166ZM8.00156 9.96602C7.50156 9.96602 7.07656 9.79102 6.72656 9.44102C6.37656 9.09102 6.20156 8.66602 6.20156 8.16602C6.20156 7.66602 6.37656 7.24102 6.72656 6.89102C7.07656 6.54102 7.50156 6.36602 8.00156 6.36602C8.50156 6.36602 8.92656 6.54102 9.27656 6.89102C9.62656 7.24102 9.80156 7.66602 9.80156 8.16602C9.80156 8.66602 9.62656 9.09102 9.27656 9.44102C8.92656 9.79102 8.50156 9.96602 8.00156 9.96602ZM8.00156 13.166C6.51267 13.166 5.15434 12.766 3.92656 11.966C2.69878 11.166 1.72934 10.1105 1.01823 8.79935C0.962674 8.69935 0.921007 8.59657 0.893229 8.49102C0.865451 8.38546 0.851562 8.27713 0.851562 8.16602C0.851562 8.0549 0.865451 7.94657 0.893229 7.84102C0.921007 7.73546 0.962674 7.63268 1.01823 7.53268C1.72934 6.22157 2.69878 5.16602 3.92656 4.36602C5.15434 3.56602 6.51267 3.16602 8.00156 3.16602C9.49045 3.16602 10.8488 3.56602 12.0766 4.36602C13.3043 5.16602 14.2738 6.22157 14.9849 7.53268C15.0405 7.63268 15.0821 7.73546 15.1099 7.84102C15.1377 7.94657 15.1516 8.0549 15.1516 8.16602C15.1516 8.27713 15.1377 8.38546 15.1099 8.49102C15.0821 8.59657 15.0405 8.69935 14.9849 8.79935C14.2738 10.1105 13.3043 11.166 12.0766 11.966C10.8488 12.766 9.49045 13.166 8.00156 13.166ZM8.00156 11.8327C9.25712 11.8327 10.4099 11.5021 11.4599 10.841C12.5099 10.1799 13.3127 9.28824 13.8682 8.16602C13.3127 7.04379 12.5099 6.15213 11.4599 5.49102C10.4099 4.8299 9.25712 4.49935 8.00156 4.49935C6.74601 4.49935 5.59323 4.8299 4.54323 5.49102C3.49323 6.15213 2.69045 7.04379 2.1349 8.16602C2.69045 9.28824 3.49323 10.1799 4.54323 10.841C5.59323 11.5021 6.74601 11.8327 8.00156 11.8327Z" fill="#646464" />
                                    </g>
                                </svg>
                            } */}
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
                    <button onClick={() => { router.back() }} className="py-2 md:py-[12px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] md:rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#333333]">Go Back</button>
                    <button onClick={handleSubmit} className="py-2 md:py-[12px] px-4 md:px-[36px] border border-[#06A9EF] rounded-[30px] bg-blue md:rounded-[30px] text-[12px] md:text-[16px] font-[500] text-[#FFFFFF]">Continue</button>
                </div>
            </div>

            {/* Admin Details */}
            <AdminDetails tog={tog} setProgress={setProgress} setIsCompleted={setIsCompleted} updateTog={updateTog} setIsCompleted1={setIsCompleted1} setProgress1={setProgress1} />
            {/* Upload Documents */}
            <div style={{ boxShadow: "0px 1px 6px 0px #00000040" }} className={`${tog === 3 ? "flex" : "hidden"} bg-white w-[45%] rounded-[16px] p-6 flex-col gap-6`}>
                <div className="w-full flex gap-[20px]">
                    <div className="flex w-full flex-col gap-1">
                        <div className="text-[16px] font-[500] text-[#333333]">GST No<span className="text-red">*</span></div>
                        <div className="rounded-[8px] py-[12px] px-4 border border-[#9D9D9D]">
                            <input type="text" name="" id="" placeholder="Enter GST number" className="w-full bg-[transparent] outline-none placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464]" />
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        <div className="text-[16px] font-[500] text-[#333333]">Upload Certificate<span className="text-red">*</span></div>
                        <div className="rounded-[8px] py-[12px] px-4 border border-[#9D9D9D] flex">
                            <input type="text" name="" id="" placeholder="Upload certificate" className="w-full bg-[transparent] outline-none placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464]" />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g mask="url(#mask0_3761_55114)">
                                    <path d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#333333" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="w-full flex gap-[20px]">
                    <div className="flex w-full flex-col gap-1">
                        <div className="text-[16px] font-[500] text-[#333333]">PAN No<span className="text-red">*</span></div>
                        <div className="rounded-[8px] py-[12px] px-4 border border-[#9D9D9D]">
                            <input type="text" name="" id="" placeholder="Enter PAN number" className="w-full bg-[transparent] outline-none placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464]" />
                        </div>
                    </div>
                    <div className="flex w-full flex-col gap-1">
                        <div className="text-[16px] font-[500] text-[#333333]">Upload PAN<span className="text-red">*</span></div>
                        <div className="rounded-[8px] py-[12px] px-4 border border-[#9D9D9D] flex">
                            <input type="text" name="" id="" placeholder="Upload PAN" className="w-full bg-[transparent] outline-none placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464]" />
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g mask="url(#mask0_3761_55114)">
                                    <path d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#333333" />
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-1">
                    <div className="text-[16px] font-[500] text-[#333333]">Company Logo<span className="text-red">*</span></div>
                    <div className="rounded-[8px] py-[12px] px-4 border border-[#9D9D9D] flex">
                        <input type="text" name="" id="" placeholder="Upload company logo" className="w-full bg-[transparent] outline-none placeholder:text-[14px] placeholder:font-[400] placeholder:text-[#646464]" />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g mask="url(#mask0_3761_55114)">
                                <path d="M11 16V7.85L8.4 10.45L7 9L12 4L17 9L15.6 10.45L13 7.85V16H11ZM6 20C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V15H6V18H18V15H20V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20H6Z" fill="#333333" />
                            </g>
                        </svg>
                    </div>
                </div>
                <div className="w-full flex justify-between">
                    <button onClick={handleBack1} className="py-[12px] px-[36px] border border-[#06A9EF] rounded-[12px] text-[16px] font-[500] text-[#333333]">Go Back</button>
                    <button onClick={() => { router.push("/employer/afterLogin/EmployerHome") }} className="py-[12px] px-[36px] border border-[#06A9EF] bg-blue rounded-[12px] text-[16px] font-[500] text-[#FFFFFF]">Continue</button>
                </div>
            </div>
            <div className="text-[14px] font-[500] text-[#646464]">Already have an account? <span onClick={() => router.push("/auth/Sign_in?role=employer")} className="text-[#06A9EF] cursor-pointer">Sign In</span></div>
        </div >
    );
};

export default EmployerSignUp;