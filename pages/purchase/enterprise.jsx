import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ReactSelect from 'react-select';
import { telCode } from '../../utils/data';
import { useMediaQuery } from "@react-hook/media-query";
import axios from 'axios';
import { toast } from 'react-toastify';

function Index() {
    const isViewportBelow850 = useMediaQuery("(max-width:850px)");
    const userDataGlobal = useSelector((state) => state.userData);
    const [data, setData] = useState({
        firstName: userDataGlobal.firstName || '',
        lastName: userDataGlobal.lastName || '',
        mobileNo: userDataGlobal.mobileNo || '',
        email: userDataGlobal.email || '',
        dial_code: userDataGlobal.dial_code || '',
        role:userDataGlobal.role || '',
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

        // Find the initial dial code object that matches the user data
        const initialDialCode = combinedCodes.find(
            (code) => code.dial_code === userDataGlobal.dial_code
        );

        // Set the selected item to the matched object
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
        const errors = { ...formError };

        switch (fieldName) {
            case "firstName":
                if (!value.trim()) {
                    errors.firstName = "First Name is required";
                } else if (!isNaN(value)) {
                    errors.firstName = "First Name cannot be a number";
                } else if (/\d/.test(value)) {
                    errors.firstName = "First Name cannot contain numbers";
                } else {
                    delete errors.firstName;
                }
                break;
            case "lastName":
                if (!value.trim()) {
                    errors.lastName = "Last Name is required";
                } else if (!isNaN(value)) {
                    errors.lastName = "Last Name cannot be a number";
                } else if (/\d/.test(value)) {
                    errors.lastName = "Last Name cannot contain numbers";
                } else {
                    delete errors.lastName;
                }
                break;
            case "email":
                if (!value.trim()) {
                    errors.email = "Email is required";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    errors.email = "Invalid email format";
                } else {
                    delete errors.email;
                }
                break;

            case "mobileNo":
                if (!value.trim()) {
                    errors.mobileNo = "Mobile Number is required";
                } else if (value.trim().length < 10) {
                    errors.mobileNo = "Mobile Number should be 10 digits";
                } else if (isNaN(value)) {
                    errors.mobileNo = "Mobile Number cannot be text";
                } else {
                    delete errors.mobileNo;
                }
                break;
            case "dial_code":
                if (!value.trim()) {
                    errors.dial_code = "Dial code is required";
                } else {
                    delete errors.dial_code;
                }
                break;

            default:
                break;
        }

        setFormError(errors);

        return errors;
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
        try {
          const response = await axios.post(
            "http://localhost:2000/api/planEnquiry/create",
            data
          );
          
          toast.success("Contacted Successfully");
         
        } catch (error) {
          console.error("Error:", error);
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

            <div className="flex items-center justify-center pb-12  px-2 customMargins ">
                <div
                    style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
                    className=" flex scr700:flex-row flex-col scr700:p-6 p-3 rounded-[16px] items-top w-[100%] gap-[32px]"
                >
                    <div

                        className={`group relative p-4 z-20 bg-white  flex flex-col gap-4 items-center justify-between rounded-[16px] purchase-plan-card w-[40%] max-w-[23vw] 
                            } `}
                        style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
                    >
                        <div className="flex text-center flex-col gap-9 text-[#333333] items-center  justify-between">
                            <p className="text-[1.4vw] font-[600]">
                                <span className="text-[#06A9EF]">Enterprise </span>{" "}
                                Plan
                            </p>
                            <p className="text-[1vw] font-[500]">Tailored Solutions for Organizations</p>
                            <div className="bg-[#DEDEDE] h-[2px] w-[90%]" />
                        </div>
                        <div className="flex gap-3 flex-col text-center items-center w-[168px]">
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

                    <div className=" flex flex-col gap-4 justify-center w-[60%] ">
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
                                className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[1.2vw] font-semibold w-full hover:bg-[#ffda1d] hover:text-[#333] transition-all "
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
