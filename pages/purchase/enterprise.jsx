import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { telCode } from '../../utils/data';
import { useMediaQuery } from "@react-hook/media-query";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

function Index() {
    const isViewportBelow850 = useMediaQuery("(max-width:850px)");
    const userDataGlobal = useSelector((state) => state.userData);
    const [successModel, setSuccessModel] = useState(false)
    const router = useRouter();
    const [data, setData] = useState({
        firstName: userDataGlobal.firstName || '',
        lastName: userDataGlobal.lastName || '',
        mobileNo: userDataGlobal.mobileNo ? String(userDataGlobal.mobileNo) : '',
        email: userDataGlobal.email || '',
        dial_code: userDataGlobal.dial_code || '',
        role: userDataGlobal.role || '',
    });

    const [filteredTelCode, setFilteredTelCode] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        const filteredCodes = telCode;
        const firstSixCodes = filteredCodes.slice(0, 6);
        const remainingCodes = filteredCodes.slice(6);

        const sortedRemainingCodes = remainingCodes.sort((a, b) => {
            const numA = parseInt(a.dial_code.replace("+", ""), 10);
            const numB = parseInt(b.dial_code.replace("+", ""), 10);
            return numA - numB;
        });

        const combinedCodes = [...firstSixCodes, ...sortedRemainingCodes];
        setFilteredTelCode(combinedCodes);


        const initialDialCode = combinedCodes.find(
            (code) => code.dial_code === userDataGlobal.dial_code
        );


        if (initialDialCode) {
            setSelectedItem(initialDialCode);
        }
    }, [userDataGlobal.dial_code]);

    const handleItemClick = (item) => {
        setSelectedItem(item);
        setData({ ...data, dial_code: item.dial_code });
    };

    const [formError, setFormError] = useState({});
    const validateInput = (fieldName, value) => {
        let error;
        switch (fieldName) {
            case "firstName":
                if (!value.trim()) {
                    error = "First Name is required";
                } else if (!isNaN(value)) {
                    error = "First Name cannot be a number";
                } else if (/\d/.test(value)) {
                    error = "First Name cannot contain numbers";
                }
                break;
            case "lastName":
                if (!value.trim()) {
                    error = "Last Name is required";
                } else if (!isNaN(value)) {
                    error = "Last Name cannot be a number";
                } else if (/\d/.test(value)) {
                    error = "Last Name cannot contain numbers";
                }
                break;
            case "email":
                if (!value.trim()) {
                    error = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "Invalid email format";
                }
                break;
            case "mobileNo":
                if (!value.trim()) {
                    error = "Mobile Number is required";
                } else if (value.trim().length < 10) {
                    error = "Mobile Number should be 10 digits";
                } else if (isNaN(value)) {
                    error = "Mobile Number cannot be text";
                }
                break;
            case "dial_code":
                if (!value.trim()) {
                    error = "Dial code is required";
                }
                break;
            default:
                break;
        }

        setFormError((prevErrors) => ({
            ...prevErrors,
            [fieldName]: error,
        }));

        return error;
    };


    const handleInputChange = (fieldName, value) => {
        if (fieldName === "mobileNo") {
            if (value.replace(/\D/g, "").length <= 10) {
                setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
            }
        } else {
            setData({ ...data, [fieldName]: value });
        }
        validateInput(fieldName, value);
    };

    const customFilterOption = ({ label, value, data }, inputValue) => {
        const lowercasedInput = inputValue.toLowerCase();
        return (
            data.code.toLowerCase().includes(lowercasedInput) ||
            data.dial_code.includes(inputValue)
        );
    };

    const planEnquiry = async (e) => {
        e.preventDefault();


        const errors = {};
        errors.firstName = validateInput("firstName", data.firstName);
        errors.lastName = validateInput("lastName", data.lastName);
        errors.email = validateInput("email", data.email);
        errors.mobileNo = validateInput("mobileNo", data.mobileNo);
        errors.dial_code = validateInput("dial_code", data.dial_code);


        const hasErrors = Object.values(errors).some((error) => error !== undefined);
        if (hasErrors) {
            toast.error("Please fix the errors in the form.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:2000/api/planEnquiry/create",
                data
            );
            // toast.success("Contacted Successfully");
            setSuccessModel(true)

        } catch (error) {
            console.error("Error:", error);
            toast.error("Something went wrong. Please try again.");
        }
    };


    return (
        <div className=" flex flex-col gap-9">
            <div className="flex flex-col justify-center items-center bg-blue h-[89px]  py-3">
                <div className=" font-semibold text-[30px] text-white leading-tight">
                    Purchase
                </div>
                <div className=" font-medium text-[16px] text-white">
                    Purchase plan and make payment
                </div>
            </div>
            {successModel &&
                <>
                    <div className="fixed z-[300] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
                    <div className="fixed z-[300] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
                        <div

                            className=" absolute rounded-[16px] bg-white shadow-lg pt-[60px] pb-6 px-6 flex flex-col gap-6 ml:min-w-[350px] ml:w-[30%] ms:w-[50%] scr420:w-[80%] w-[90%] "
                        >
                            <svg
                                className="absolute top-[-40px]  left-[40%] right-[60%] flex"
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

                            <div className="text-center flex flex-col gap-2">
                                <div className="scr420:text-[24px] text-[20px] font-[500] text-[#333]">
                                    Plan Enquiry Submitted!
                                </div>
                                <div className="text-[16px] font-[500] text-[#333]">
                                    Your enquiry has been submitted successfully. We will contact you shortly.
                                </div>
                            </div>
                            <div className="flex justify-center">
                                <button
                                    onClick={() => {
                                        setSuccessModel(false);
                                        router.push("/home")

                                    }}
                                    className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                                >
                                    Done
                                </button>

                            </div>
                        </div>
                    </div>
                </>


            }

            <div className="flex items-center justify-center pb-12  px-2 customMargins xxlg:w-[60%] scr700:w-[80%] sm:w-[90%] w-full">
                <div
                    // style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
                    className=" flex scr700:flex-row flex-col scr700:p-6 p-3 rounded-[16px] items-top w-[100%] gap-[32px] border border-[#00000040]"
                >
                    <div

                        className={`group relative p-4 z-20 bg-white  flex flex-col gap-4 items-center justify-between rounded-[16px] purchase-plan-card scr700:w-[40%] w-full scr700:max-w-[23vw] 
                            } `}
                        style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
                    >
                        <div className="flex text-center flex-col gap-9 text-[#333333] items-center  justify-between">
                            <p className="scr700:text-[1.4vw] text-[24px] font-[600]">
                                <span className="text-[#06A9EF]">Enterprise </span>{" "}
                                Plan
                            </p>
                            <p className="scr700:text-[1vw] text-[20px] font-[500]">Tailored Solutions for Organizations</p>
                            <div className="bg-[#DEDEDE] h-[2px] w-[90%]" />
                        </div>
                        <div className="flex gap-3 flex-col text-center items-center scr700:w-[168px] w-[260px]">
                            <img
                                src="/images/support_agent.png"
                                className="h-[80px] w-[80px]"
                                alt=""
                            />
                            <span className="text-[16px] font-[500] text-center">
                                Contact Us for Custom Plan as per your needs
                            </span>
                        </div>

                    </div>

                    <div className=" flex flex-col gap-4 justify-center scr700:w-[60%] ">
                        <div className="text-[18px] font-[600] ">User Details</div>
                        <div className="flex flex-col gap-6 w-[100%] text-[14px]">
                            <div className="flex gap-5 w-[100%] ">
                                <div className=" w-[50%]">
                                    <p className="">
                                        First Name <span className="star">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name=""
                                        id="single_input"
                                        placeholder="Enter first name"
                                        value={data.firstName}
                                        onChange={(e) =>
                                            handleInputChange("firstName", e.target.value)
                                        }
                                    />
                                    {formError && (
                                        <p className="text-[12px] text-[red] font-[500]">
                                            {formError.firstName}
                                        </p>
                                    )}
                                </div>

                                <div className="w-[50%]">
                                    <p className=" ">
                                        Last Name <span className="star">*</span>
                                    </p>
                                    <input
                                        type="text"
                                        name=""
                                        id="single_input"
                                        placeholder="Enter Last name"
                                        value={data.lastName}
                                        onChange={(e) =>
                                            handleInputChange("lastName", e.target.value)
                                        }
                                    />
                                    {formError && (
                                        <p className="text-[12px] text-[red] font-[500]">
                                            {formError?.lastName}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="">
                                <p className="">
                                    Email <span className="star">*</span>
                                </p>
                                <input
                                    type="email"
                                    name=""
                                    id="single_input"
                                    placeholder="Enter Email"
                                    value={data.email}
                                    onChange={(e) => handleInputChange("email", e.target.value)}
                                />
                                {formError && (
                                    <p className="text-[12px] text-[red] font-[500]">
                                        {formError?.email}
                                    </p>
                                )}
                            </div>

                            <div className="">
                                <p className="">
                                    Contact Number <span className="star">*</span>
                                </p>
                                <div
                                    className={`flex w-[100%]  items-start ${isViewportBelow850 ? "gap-[4px] " : "gap-[16px] "
                                        }`}
                                    id="single_input"
                                    style={{
                                        padding: "0px 8px",
                                    }}
                                >
                                    <div
                                        className={`relative  min-w-[120px] ${isViewportBelow850 ? "w-[65%] " : "w-[18%] "
                                            } items-center`}
                                    >
                                        <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                                            <ReactSelect
                                                options={filteredTelCode}
                                                className="w-[100%] flex min-w-[150px] items-center py-1 rounded-[8px]"
                                                placeholder="Select"
                                                value={selectedItem}
                                                onChange={handleItemClick}
                                                theme={(theme) => ({
                                                    ...theme,
                                                    borderRadius: 0,
                                                    colors: {
                                                        ...theme.colors,
                                                        primary: "neutral0",
                                                    },
                                                })}
                                                getOptionLabel={(option) => (
                                                    <div className="flex items-center">
                                                        <img
                                                            src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                                            width="20px"
                                                            alt=""
                                                        />
                                                        <span className="ml-2 text-[#333333]">
                                                            {option.code} {option.dial_code}
                                                        </span>
                                                    </div>
                                                )}
                                                filterOption={customFilterOption}
                                                styles={{
                                                    control: (provided) => ({
                                                        ...provided,
                                                        border: "none",
                                                        minWidth: "130px",
                                                    }),
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <input
                                        placeholder={`${isViewportBelow850
                                            ? "Enter Number "
                                            : "Enter Contact Number "
                                            }`}
                                        value={data.mobileNo}
                                        maxLength={10}
                                        onChange={(e) =>
                                            handleInputChange("mobileNo", e.target.value)
                                        }
                                        className="w-full mobileNo h-full pl-[20px] "
                                        type="text"
                                        name=""
                                    // id="single_input"
                                    />
                                </div>

                                {/* Display error message if any */}
                                {formError && (
                                    <p className="text-[12px] text-[red] font-[500]">
                                        {formError?.mobileNo}
                                    </p>
                                )}


                            </div>
                            <button
                                // disabled={true}
                                onClick={(e) => planEnquiry(e)}
                                className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] scr700:text-[1.2vw] text-[20px] font-semibold w-full hover:bg-[#ffda1d] hover:text-[#333] transition-all "
                            // style={{ opacity: 0.6 }}
                            >
                                Enquiry
                            </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Index
