import React, { useEffect, useState } from "react";
import { camelCase } from "../../../../../utils/middleware";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { telCode } from "../../../../../utils/data";

const PersonalDetails = ({
  setData,
  data,
  selectedFont,
  selectedColor,
  selectedResumeIndex,
}) => {
  const userDataGlobal = useSelector((state) => state.userData);

  const [isChecked, setIsChecked] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    location: "",
    designation: "",
    dial_code: "+260",
  });

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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setProfileData({ ...profileData, dial_code: item.dial_code });
  };
  const inputFields = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      placeholder: "Entet First Name",
      value: profileData.firstName,
      className: " ",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      placeholder: "Enter Last Name",
      value: profileData.lastName,
      className: " ",
    },
    {
      label: "Designation",
      type: "text",
      name: "designation",
      placeholder: "Enter designation",
      value: profileData.designation,
      className: " col-span-2",
    },
    {
      label: "Mobile Number",
      type: "text",
      name: "mobileNumber",
      placeholder: "Enter Mobile Number",
      value: profileData.mobileNumber,
      className: " col-span-2 ",
    },
    {
      label: "Email Address",
      type: "email",
      name: "email",
      placeholder: "Enter Email Address",
      value: profileData.email,
      className: " col-span-2",
    },
    {
      label: "Current Location",
      type: "text",
      name: "location",
      placeholder: "Current Location",
      value: profileData.location,
      className: " col-span-2",
    },
  ];

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
    email: false,
    location: false,
    designation: false,
  });

  const validateFields = () => {
    const newErrors = {};
    let allFieldsValid = true;

    inputFields.forEach((field) => {
      const { name } = field;
      const value = profileData[name];

      if (typeof value === "string" && value.trim() === "") {
        newErrors[name] = true;
        allFieldsValid = false;
      } else {
        newErrors[name] = false;
      }
    });

    // setFormErrors({ ...newErrors });
    return allFieldsValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name == "mobileNumber") {
      if (value.replace(/\D/g, "").length <= 10) {
        setProfileData({
          ...profileData,
          [name]: value.replace(/\D/g, ""),
        });
        setIsModified(true);
        setFormErrors({ ...formErrors, [name]: value.trim() === "" });
      }
    } else {
      setProfileData({
        ...profileData,
        [name]: value,
      });
      setIsModified(true);
      setFormErrors({ ...formErrors, [name]: value.trim() === "" });
    }
  };

  const isDisabled = () => {
    if (!isChecked || !isModified) return true;

    const isAnyFieldEmpty = Object.values(profileData).some((value) => {
      if (typeof value === "string") {
        return value.trim() === "";
      }

      if (typeof value === "number") {
        return value.toString().trim() === "";
      }
      return true;
    });

    return isAnyFieldEmpty;
  };

  const saveData = () => {
    const allFieldsValid = validateFields();
    if (allFieldsValid && isModified) {
      setData({
        ...data,
        dial_code: data.dial_code,
        firstName: camelCase(profileData.firstName),
        lastName: camelCase(profileData.lastName),
        mobileNumber: profileData.mobileNumber,
        email: profileData.email.toLowerCase(),
        location: camelCase(profileData.location),
        designation: profileData.designation,
        selectedResumeIndex: selectedResumeIndex,

        createdAt: data.createdAt || new Date().toISOString(),
      });
      setIsModified(false);
    }
  };

  useEffect(() => {
    const allFieldsValid = validateFields();
    if (allFieldsValid && isModified) {
      setIsModified(true);
    }
  }, [profileData]);

  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber: mobileNumber,
      location,
      designation,
      dial_code,
    } = data;
    setSelectedItem(telCode.find((item) => item.dial_code === dial_code));
    setProfileData({
      ...profileData,
      firstName,
      lastName,
      email,
      mobileNumber,
      location: location,
      designation,
      dial_code: dial_code ? dial_code : "+260",
    });
  }, [data]);

  const customFilterOption = ({ label, value, data }, inputValue) => {
    const lowercasedInput = inputValue.toLowerCase();
    return (
      data.code.toLowerCase().includes(lowercasedInput) ||
      data.dial_code.includes(inputValue)
    );
  };

  return (
    <>
      <div
        className="flex flex-col sm:p-4 p-2 gap-2 rounded-lg bg-white"
        style={{
          // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Personal Details</p>
          {/**  <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label> */}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {inputFields.map((item, index) => (
            <div
              className={`flex flex-col gap-2 w-full ${item.className}`}
              key={index}
            >
              <div className=" text-[14px]  font-medium">{item.label}</div>
              {item.name == "mobileNumber" ? (
                <div
                  className={`rounded-[8px] ${
                    formErrors[item.name]
                      ? "border-[#C00000]"
                      : "border-[#9D9D9D]"
                  } `}
                >
                  <div
                    className={`flex w-[100%] items-start  "
                          }`}
                    id="single_input"
                  >
                    <div
                      className={`relative 
                            } items-center`}
                    >
                      <div className="  w-[100%] text-[14px] justify-center items-center  flex font-[500] text-[#646464]">
                        <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[160px] w-[100%]">
                          <div className="flex items-center  gap-1 cursor-pointer  w-[100%] ">
                            <ReactSelect
                              options={filteredTelCode}
                              className="w-[100%] flex  items-center py-2  rounded-[8px] outline-none border-none"
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
                                  <span className="ml-2">
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
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                      className="w-full text-[14px] "
                      value={profileData[item.name]}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`border-[1px] rounded-[8px] px-[16px] py-2   ${
                    formErrors[item.name]
                      ? "border-[#C00000]"
                      : "border-[#9D9D9D]"
                  } `}
                >
                  <input
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="w-full text-[14px] "
                    value={profileData[item.name]}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                    maxLength={
                      item.name === "firstName" || item.name === "lastName"
                        ? 25
                        : 100
                    }
                  />
                </div>
              )}
              {formErrors[item.name] && (
                <span className="text-[#C00000] text-[12px]">
                  Field is required
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-between  py-2 gap-2">
            {/* <button
              className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]"
              disabled={!isChecked}
            >
              Update to Profile
            </button> */}
            <button
              className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px] bg-[#06A9EF] w-[60px] h-[32px] ${
                isChecked ? "btn_hover_effect" : ""
              }`}
              style={{ opacity: isDisabled() ? 0.5 : 1 }}
              onClick={saveData}
              disabled={isDisabled() || !isChecked}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalDetails;
