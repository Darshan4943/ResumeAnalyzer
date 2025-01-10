import React, { useEffect, useRef, useState } from "react";

import { motion } from "framer-motion";

import { toast } from "react-toastify";



import { useRouter } from "next/navigation";
import { useMediaQuery } from "@react-hook/media-query";

import { telCode } from "../../../../utils/data";
import ReactSelect from "react-select";

const PersonalDetails = ({
  data,
  setData,
  setTabIndex,
  tabindex,
  setfile,
  file,
  error,
  setError,
  isResume,
  selectedItem, setSelectedItem
}) => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const [formError, setFormError] = useState({});

  function togglePasswordVisibility(e) {
    e.preventDefault();
    setIsPasswordVisible((prevState) => !prevState);
  }

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
      case "currentLocation":
        if (!value.trim()) {
          errors.currentLocation = "Current Location is required";
        } else {
          delete errors.currentLocation;
        }
        break;

      default:
        break;
    }

    setFormError(errors);

    return errors;
  };

  const handleInputChange = (fieldName, value) => {

    if (fieldName == "mobileNo") {
      if (value.replace(/\D/g, "").length <= 10) {
        setData({ ...data, [fieldName]: value.replace(/\D/g, "") });
      }
    } else {
      setData({ ...data, [fieldName]: value });
      validateInput(fieldName, value);
    }
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validateInput();

    const requiredFields = [
      "firstName",
      "lastName",
      "email",

      "currentLocation",
      "mobileNo",
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
      setTabIndex(3);
      window.scroll(0, 0);
    }
  };

  const [dropdown, setDropdown] = useState(false);
 
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setData({ ...data, dial_code: item.dial_code });
    setSearchTerm("");
    setDropdown(false);
    setShowInput(false);
  };

  const handleInputClick = () => {
    setDropdown(true);
    setSearchTerm("");
    setShowInput(true);
    // window.scrollTo({
    //   top: 300,
    //   behavior: "smooth",
    // });
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
      setDropdown(false);
      setShowInput(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const isViewportBelow850 = useMediaQuery("(max-width:850px)");

  return (
    <>
      {tabindex == 2 && (
        <div className={" pb-8  "}>
          <div className="flex flex-col gap-4">
            <motion.div className=" flex justify-center pt-4  pb-2">
              <div className="personal_details_form scr1250:w-[60%] sm:w-[80%] w-[95%] education_page ">
                <>
                  <div className="flex gap-6 w-[100%] ml:flex-row flex-col ">
                    <div className="personal_name_parent flex ml:flex-row flex-col ml:w-[50%] w-[100%]">
                      <div className="personal_name ml:w-[48%] w-[100%]">
                        <p className="form_text_heading">
                          First Name <span className="star">*</span>
                        </p>
                        <input
                          type="text"
                          name=""
                          className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                          placeholder="Enter First Name"
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

                      <div className="personal_name ml:w-[48%] w-[100%]">
                        <p className="form_text_heading">
                          Last Name <span className="star">*</span>
                        </p>
                        <input
                          type="text"
                          name=""
                          className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                          placeholder="Enter Last Name"
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

                    <div className="personal_single_input gap-2">
                      <p className="form_text_heading">
                        Email <span className="star">*</span>
                      </p>
                      <input
                        type="email"
                        name=""
                        className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
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
                    <div className="personal_single_input">
                      <p className="form_text_heading">
                        Contact Number <span className="star">*</span>
                      </p>
                      <div
                        className={`flex w-[100%] px-2 text-[14px] font-normal  rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] ${isViewportBelow850 ? "gap-[4px] " : "gap-[16px] "
                          }`}

                      >
                        <div
                          className={`relative min-w-[150px] ${isViewportBelow850 ? "w-[65%] " : "w-[40%] "
                            } items-center`}
                        >
                          <div
                            className="  w-[100%] text-[14px] justify-center items-center  flex font-[500] text-[#646464]"
                            onClick={handleInputClick}
                          >
                            <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[140px] w-[100%]">
                              <div
                                className="flex items-center  gap-1 cursor-pointer  w-[100%] "
                                onClick={handleInputClick}
                              >
                                <ReactSelect
                                  options={filteredTelCode}
                                  className="w-[100%] flex  items-center py-1  rounded-[8px]"
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
                                      <span className="ml-2 text-[#333333] text-[14px] font-normal">
                                        {option.code} {option.dial_code}
                                      </span>
                                    </div>
                                  )}
                                  getOptionValue={(option) => option.code}
                                  styles={{
                                    control: (provided) => ({
                                      ...provided,
                                      border: "none",

                                      minWidth: "130px",
                                    }),
                                  }}
                                  theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                    colors: {
                                      ...theme.colors,
                                      // primary25: "hotpink",
                                      primary: "neutral0",
                                    },
                                  })}
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

                    <div className="personal_single_input">
                      <div className="personal_name w-[100%]">
                        <p className="form_text_heading">
                          Current Location <span className="star">*</span>
                        </p>
                        <input
                          type="text"
                          name=""
                          className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                          placeholder="Enter Your Location"
                          value={data.currentLocation}
                          onChange={(e) =>
                            handleInputChange("currentLocation", e.target.value)
                          }
                        />
                        {formError && (
                          <p className="text-[12px] text-[red] font-[500]">
                            {formError?.currentLocation}
                          </p>
                        )}
                        <img
                          className="icon max-h-[20px] max-w-[20px]"
                          src="/images/auth/candidate/location_on.png"
                          alt=""
                        />
                      </div>
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
                      <div className="personal_name gap-2 w-[100%]">
                        <p className="form_text_heading">
                          Work Status <span className="star">*</span>
                        </p>
                        <div className="gender_button">
                          <button
                            className={`gen_button ${data.workStatus == "Experienced" &&
                              "gen_button_active"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setData({
                                ...data,
                                workStatus: "Experienced",
                              });
                            }}
                          >
                            Experienced
                          </button>
                          <button
                            className={`gen_button ${data.workStatus == "Fresher" &&
                              "gen_button_active"
                              }`}
                            onClick={(e) => {
                              e.preventDefault();
                              setData({
                                ...data,
                                workStatus: "Fresher",
                              });
                            }}
                          >
                            Fresher
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between w-full font-[500] pt-4">
                    <button
                      className="text-[14px] font-semibold border rounded-[30px] px-9 py-[11.25px] border-blue"
                  
                      onClick={() => {
                       
                        router.back("/createResume/BuildResume/")
                      }  
                      }
                    >
                      Back
                    </button>
                    <button
                      className=" font-[600] bg-[#06A9EF] text-white px-9 py-[11.25px] rounded-[30px] text-[14px] leading-tight"
                     
                      onClick={submitHandler}
                    >
                      Continue
                    </button>
                  </div>
                </>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </>
  );
};

export default PersonalDetails;
