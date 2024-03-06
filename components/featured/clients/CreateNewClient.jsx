import "react-phone-input-2/lib/bootstrap.css";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";
import React, { useEffect, useRef, useState } from "react";
import ReactSelect from 'react-select';
import { telCode } from "../../../utils/data";

import { toast } from "react-toastify";
import axios from "axios";
import { useSelector } from "react-redux";
function CreateNewClient({setTabIndex,}) {
    const userDataGlobal = useSelector((state) => state.userData);
    const isViewportBelow850 = useMediaQuery("(max-width:850px)");

    const [data, setData] = useState({

        firstName: "",
        lastName: "",
        mobileNo: "",
        designation: "",
        email: "",
        location: "",
        gender: "male",

    });


    const router = useRouter();

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
                } else if (isNaN(value)) {
                    errors.mobileNo = "Mobile Number cannot be text";
                } else {
                    delete errors.mobileNo;
                }
                break;
            case "designation":
                if (!value.trim()) {
                    errors.designation = "Designation Name is required";
                } else if (!isNaN(value)) {
                    errors.designation = "Designation Name cannot be a number";
                } else if (/\d/.test(value)) {
                    errors.designation = "Designation Name cannot contain numbers";
                } else {
                    delete errors.designation;
                }
                break;
            case "location":
                if (!value.trim()) {
                    errors.location = "Current Location is required";
                } else {
                    delete errors.location;
                }
                break;

            default:
                break;
        }

        setFormError(errors);

        return errors;
    };
    {
        console.log(124, formError);
    }
    const handleInputChange = (fieldName, value) => {
        console.log(value.replace(/\D/g, "").length <= 10);
        if (fieldName == "mobileNo") {
            if (value.replace(/\D/g, "").length <= 10) {
                setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
            }
        } else {
            setData({ ...data, [fieldName]: value });
            validateInput(fieldName, value);
        }
    };
    const submitHandler = async (e) => {
        e.preventDefault();
    
        const errors = validateInput();
    
        const requiredFields = [
            "firstName",
            "lastName",
            "email",
            "designation",
            "location",
            "mobileNo",
            "gender",
        ];
        const emptyFields = requiredFields.filter((field) => !data[field]);
    
        if (emptyFields.length > 0) {
            toast.error("Please fill in all required fields");
            return;
        }
    
        const hasErrors = Object.keys(errors).length > 0;
    
        if (hasErrors) {
            toast.error("Please enter valid information");
            setFormError(errors);
        } else {
            try {
                const response = await axios.post('http://localhost:2000/api/client/create', {...data,recruiterId:userDataGlobal._id});

                console.log('Response:', response.data);
    
                setData({
                    firstName: "",
                    lastName: "",
                    mobileNo: "",
                    designation: "",
                    email: "",
                    location: "",
                    gender: "male",
                });
    
                setFormError({});
    
                setTabIndex(0);
                window.scrollTo(0, 0);
    
                toast.success("Client created successfully");
            } catch (error) {
                console.error('Error:', error);
                toast.error("Failed to create client");
            }
        }
    };
    

    const [selectedItem, setSelectedItem] = useState(telCode[telCode.length - 2]);
    const [searchTerm, setSearchTerm] = useState("");


    const handleItemClick = (item) => {
        setSelectedItem(item);
        setData({ ...data, dial_code: item.dial_code });
        setSearchTerm("");

    };


    const [filteredTelCode, setFilteredTelCode] = useState([]);

    useEffect(() => {
        const filterLogic = (item) =>
            item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.dial_code.includes(searchTerm);

        const filteredCodes = telCode.filter(filterLogic);
        setFilteredTelCode(filteredCodes);
    }, [telCode, searchTerm]);

    const taskRef = useRef(null);

    const handleOutsideClick = (event) => {
        if (taskRef.current && !taskRef.current.contains(event.target)) {

        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);


    return (
        <div className='flex flex-col gap-4 sm:p-6 p-2 scr1200:w-[70%] sm:w-[90%] w-[100%] '>
            <p className='text-[24px] font-semibold'>Create New Client</p>
            <div className='flex flex-col gap-9 rounded-[16px] sm:p-6 p-2' style={{ boxShadow: "0px 1px 6px 0px #00000040" }}>
                <div className='flex flex-col gap-4'>
                    <p className='text-[16px] font-medium'>Profile Photo</p>
                    <div className='flex sm:gap-6 gap-3'>
                        <svg width="112" height="112" viewBox="0 0 112 112" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M56 112C86.9279 112 112 86.9279 112 56C112 25.0721 86.9279 0 56 0C25.0721 0 0 25.0721 0 56C0 86.9279 25.0721 112 56 112Z" fill="#EFFAFF" />
                            <path d="M72.8478 57.683C82.1816 49.1898 82.1816 35.4196 72.8478 26.9264C63.5141 18.4332 48.3811 18.4332 39.0473 26.9264C29.7136 35.4196 29.7136 49.1898 39.0473 57.683C48.3811 66.1762 63.5141 66.1762 72.8478 57.683Z" fill="#D4E5EF" />
                            <path d="M55.9998 112C73.0336 112 88.2888 104.393 98.5598 92.3928C93.1094 75.6573 76.1191 66.7705 55.9998 66.7705C35.8805 66.7705 18.8902 75.6573 13.4398 92.3928C23.7107 104.393 38.966 112 55.9998 112Z" fill="#D4E5EF" />
                        </svg>

                        <div className='flex flex-col gap-3 w-[168px] text-center items-center'>
                            <p className='text-[12px] font-normal'>Allowed file formats: jpg, jpeg | up to 1.5 MB</p>
                            <button className='text-[12px] font-semibold px-4 py-2 rounded-[8px] bg-[#06A9EF] text-white w-[135px]'>
                                Upload Picture
                            </button>
                            <button className='text-[12px] font-semibold px-4 py-2 rounded-[8px]  border border-[#06A9EF]  w-[135px]'>
                                Remove Picture
                            </button>


                        </div>


                    </div>

                    <div>
                        <div className="flex flex-col gap-4">
                            <div className=" flex justify-center pt-4  pb-2">
                                <form className="personal_details_form w-[100%]  education_page ">
                                    <>
                                        <div className="flex gap-6 w-[100%] ml:flex-row flex-col ">
                                            <div className="personal_name_parent flex ml:flex-row flex-col ml:w-[49%] w-[100%]">
                                                <div className="personal_name ml:w-[46%] w-[100%]">
                                                    <p className="form_text_heading">
                                                        First name <span className="star">*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id="first_name"
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

                                                <div className="personal_name ml:w-[46%] w-[100%]">
                                                    <p className="form_text_heading">
                                                        Last name <span className="star">*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id="first_name"
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

                                            <div className="personal_single_input ml:w-[50%] w-[100%]">
                                                <p className="form_text_heading">
                                                    Email <span className="star">*</span>
                                                </p>
                                                <input
                                                    type="email"
                                                    name=""
                                                    id="single_input"
                                                    placeholder="Enter Email"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        handleInputChange("email", e.target.value)
                                                    }
                                                />
                                                {formError && (
                                                    <p className="text-[12px] text-[red] font-[500]">
                                                        {formError?.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-6 ml:flex-row flex-col  w-[100%]  ">
                                            <div className="personal_single_input ml:w-[50%] w-[100%]">
                                                <p className="form_text_heading">
                                                    Contact Number <span className="star">*</span>
                                                </p>
                                                <div
                                                    className={`flex w-[100%] items-start ${isViewportBelow850 ? "gap-[4px] " : "gap-[16px] "
                                                        }`}
                                                    id="single_input"
                                                >
                                                    <div
                                                        className={`relative min-w-[150px] ${isViewportBelow850 ? "w-[65%] " : "w-[40%] "
                                                            } items-center`}
                                                    >
                                                        <div
                                                            className="  w-[100%] text-[14px] justify-center items-center  flex font-[500] text-[#646464]"

                                                        >
                                                            <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[140px] w-[100%]">
                                                                <div
                                                                    className="flex items-center  gap-1 cursor-pointer  w-[100%] "

                                                                >

                                                                    <ReactSelect

                                                                        options={filteredTelCode}
                                                                        className="w-[100%] flex  items-center py-1  rounded-[8px]"
                                                                        name=""
                                                                        placeholder="Search"
                                                                        value={selectedItem}
                                                                        onChange={handleItemClick}
                                                                        getOptionLabel={(option) => (
                                                                            <div className="flex items-center  ">
                                                                                <img
                                                                                    src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                                                                    width="20px"
                                                                                />
                                                                                <span className="ml-2">{option.code} {option.dial_code}</span>
                                                                            </div>
                                                                        )}
                                                                        getOptionValue={(option) => option.code}
                                                                        styles={{
                                                                            control: (provided) => ({
                                                                                ...provided,
                                                                                border: 'none',

                                                                                minWidth: "130px"
                                                                            }),
                                                                        }}
                                                                    />

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <input
                                                        className="w-full mobileNo "
                                                        type="text"
                                                        name=""
                                                        // id="single_input"
                                                        placeholder={`${isViewportBelow850
                                                            ? "Enter Number "
                                                            : "Enter Contact Number "
                                                            }`}
                                                        value={data.mobileNo}
                                                        onChange={(e) =>
                                                            handleInputChange("mobileNo", e.target.value)
                                                        }
                                                    />
                                                </div>

                                                {/* Display error message if any */}
                                                {formError && (
                                                    <p className="text-[12px] text-[red] font-[500]">
                                                        {formError?.mobileNo}
                                                    </p>
                                                )}
                                            </div>

                                            <div className="personal_name ml:w-[50%] w-[100%]">
                                                    <p className="form_text_heading">
                                                        Designation<span className="star">*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id="first_name"
                                                        placeholder="Enter Designation"
                                                        value={data.designation}
                                                        onChange={(e) =>
                                                            handleInputChange("designation", e.target.value)
                                                        }
                                                    />
                                                    {formError && (
                                                        <p className="text-[12px] text-[red] font-[500]">
                                                            {formError?.designation}
                                                        </p>
                                                    )}
                                                </div>
                                        </div>

                                        <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                                           
                                            <div className="personal_single_input">
                                                <p className="form_text_heading">
                                                    Gender <span className="star">*</span>
                                                </p>
                                                <div className="gender_button">
                                                    <button
                                                        className={`gen_button ${data.gender == "male" && "gen_button_active"
                                                            }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setData({ ...data, gender: "male" });
                                                        }}
                                                    >
                                                        Male
                                                    </button>
                                                    <button
                                                        className={`gen_button ${data.gender == "female" && "gen_button_active"
                                                            }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setData({ ...data, gender: "female" });
                                                        }}
                                                    >
                                                        Female
                                                    </button>
                                                    <button
                                                        className={`gen_button ${data.gender == "other" && "gen_button_active"
                                                            }`}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setData({ ...data, gender: "other" });
                                                        }}
                                                    >
                                                        Other
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="personal_single_input">
                                                <div className="personal_name w-[100%]">
                                                    <p className="form_text_heading">
                                                        Current Location <span className="star">*</span>
                                                    </p>
                                                    <input
                                                        type="text"
                                                        name=""
                                                        id="single_input"
                                                        placeholder="Enter Your Location"
                                                        value={data.location}
                                                        onChange={(e) =>
                                                            handleInputChange("location", e.target.value)
                                                        }
                                                    />
                                                    {formError && (
                                                        <p className="text-[12px] text-[red] font-[500]">
                                                            {formError?.location}
                                                        </p>
                                                    )}
                                                    <img
                                                        className="icon"
                                                        src="/images/auth/candidate/location_on.png"
                                                        alt=""
                                                    />
                                                </div>
                                            </div>


                                        </div>

                                        <div className="bottom_buttons font-[500]">
                                            <button
                                                className="buttons"
                                                id="border_button"
                                                onClick={() => {
                                                    setTabIndex(0);
                                                    window.scroll(0, 0);
                                                }}
                                            >
                                                Go Back
                                            </button>
                                            <button
                                                className="buttons font-[500] bg-[#06A9EF] text-white"
                                                id="border_button"
                                                onClick={submitHandler}
                                            >
                                                Create Client
                                            </button>
                                        </div>
                                    </>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default CreateNewClient
