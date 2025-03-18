import React, { useEffect, useState } from "react";
import { camelCase } from "../../../../../utils/middleware";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { currencyMap, telCode } from "../../../../../utils/data";

const PersonalDetails = ({
  setData,
  data,
  selectedFont,
  selectedColor,
  selectedResumeIndex,
}) => {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [isChecked, setIsChecked] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
  };

  const [profileDataa, setProfileDataa] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    location: "",
    country: "",
    designation: "",
    dial_code: "",
  });
  console.log(111, profileDataa);

  useEffect(() => {
    if (profileData?.basics) {
      const { firstName, lastName, mobileNo, email, country } =
        profileData?.basics;

      setProfileDataa((prevState) => ({
        ...prevState,
        firstName: firstName || "",
        lastName: lastName || "",
        mobileNumber: mobileNo || "",
        email: email || "",
        country: country || "",
      }));
    }
  }, [profileData]);
  useEffect(() => {
    setSelectedItem(data?.dial_code);
  }, []);

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
    email: false,
    location: false,
    designation: false,
    dial_code: false,
  });

  const [touched, setTouched] = useState({
    firstName: false,
    lastName: false,
    mobileNumber: false,
    email: false,
    location: false,
    designation: false,
    dial_code: false,
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
    setData({ ...data, dial_code: item.dial_code });
    setProfileDataa({ ...profileDataa, dial_code: item.dial_code });
    setIsModified(true);
    setTouched({ ...touched, dial_code: true });
  };

  const handleCountryChange = (selectedCountry) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      country: "",
    }));

    setProfileDataa((prev) => ({
      ...prev,
      country: selectedCountry.value,
    }));

    setIsModified(true);
  };

  const countryOptions = telCode
    .filter((country) => country.name)
    .map((country) => ({
      value: country.name,
      label: country.name,
    }));

  const countryValue = countryOptions.find(
    (option) => option.value === profileDataa.country
  );

  const inputFields = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      placeholder: "Enter First Name",
      value: profileDataa.firstName,
      className: " ",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      placeholder: "Enter Last Name",
      value: profileDataa.lastName,
      className: " ",
    },
    {
      label: "Designation",
      type: "text",
      name: "designation",
      placeholder: "Enter Designation",
      value: profileDataa.designation,
      className: " col-span-2",
    },
    {
      label: "Mobile Number",
      type: "text",
      name: "mobileNumber",
      placeholder: "Enter Mobile Number",
      value: profileDataa.mobileNumber,
      className: " col-span-2 ",
    },
    {
      label: "Email Address",
      type: "email",
      name: "email",
      placeholder: "Enter Email Address",
      value: profileDataa.email,
      className: " col-span-2",
    },
    {
      label: "Country",
      type: "country",
      name: "country",
      component: (
        <ReactSelect
          options={countryOptions}
          onChange={handleCountryChange}
          value={countryValue}
          placeholder="Select countries"
          className="border rounded-[8px] withoutBorder"
          classNamePrefix="select"
          onMenuClose={() => {
            setTimeout(() => {
              const scrollDiv = document.getElementById("scroll");
              if (scrollDiv) {
                scrollDiv.scrollLeft = scrollDiv.scrollWidth;
              }
            }, 100);
          }}
          isDisabled={!isChecked}
        />
      ),
      className: "col-span-2",
    },
    {
      label: "Current Location",
      type: "text",
      name: "location",
      placeholder: "Current Location",
      value: profileDataa.location,
      className: " col-span-2",
    },
  ];

  const validateFields = () => {
    const newErrors = {};
    let allFieldsValid = true;

    inputFields.forEach((field) => {
      const { name } = field;
      const value = profileDataa[name];

      switch (name) {
        case "firstName":
          if (!value?.trim() && touched[name]) {
            newErrors[name] = "First Name is required";
            allFieldsValid = false;
          }
          break;
        case "lastName":
          if (!value?.trim() && touched[name]) {
            newErrors[name] = "Last Name is required";
            allFieldsValid = false;
          }
          break;
        case "mobileNumber":
          if ((!value || !value?.toString().trim()) && touched[name]) {
            newErrors[name] = "Mobile Number is required";
            allFieldsValid = false;
          }
          break;
        case "email":
          if (!value?.trim() && touched[name]) {
            newErrors[name] = "Email is required";
            allFieldsValid = false;
          }
          break;
        case "location":
          if (!value?.trim() && touched[name]) {
            newErrors[name] = "Location is required";
            allFieldsValid = false;
          }
          break;
        case "designation":
          if (!value?.trim() && touched[name]) {
            newErrors[name] = "Designation is required";
            allFieldsValid = false;
          }
          break;
        case "dial_code":
          if (!value?.trim() && touched[name]) {
            newErrors[name] = "Country Code is required";
            allFieldsValid = false;
          }
          break;
        default:
          break;
      }
    });

    setFormErrors(newErrors);
    return allFieldsValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setTouched({ ...touched, [name]: true });

    if (name === "mobileNumber") {
      if (value.replace(/\D/g, "").length <= 10) {
        setProfileDataa({
          ...profileDataa,
          [name]: value.replace(/\D/g, ""),
        });
        setIsModified(true);
        setFormErrors({ ...formErrors, [name]: value.trim() === "" });
      }
    } else {
      setProfileDataa({
        ...profileDataa,
        [name]: value,
      });
      setIsModified(true);
      setFormErrors({ ...formErrors, [name]: value.trim() === "" });
    }
  };

  const isDisabled = () => {
    if (!isChecked || !isModified) return true;

    const isAnyFieldEmpty = Object.values(profileDataa).some((value) => {
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
        firstName: camelCase(profileDataa.firstName),
        lastName: camelCase(profileDataa.lastName),
        mobileNumber: profileDataa.mobileNumber,
        dial_code: profileDataa.dial_code,
        email: profileDataa.email.toLowerCase(),
        location: camelCase(profileDataa.location),
        designation: profileDataa.designation,
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
  }, [profileDataa]);

  useEffect(() => {
    const {
      firstName,
      lastName,
      email,
      mobileNumber,
      location,
      designation,
      dial_code,
    } = data;
    setSelectedItem(telCode.find((item) => item.dial_code === dial_code));
    setProfileDataa({
      firstName,
      lastName,
      email,
      mobileNumber,
      location,
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
        className="flex flex-col  p-4 gap-2 rounded-xl bg-white"
        style={{
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Personal Details</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {inputFields.map((item, index) => (
            <div
              className={`flex flex-col gap-2 w-full ${item.className}`}
              key={index}
            >
              <div className="text-[14px] font-medium">
                {item.label} <span className="star">*</span>
              </div>
              {item.component ? (
                <div className="w-full">{item.component}</div>
              ) : item.name === "mobileNumber" ? (
                <div
                  className={`rounded-[8px] ${
                    formErrors[item.name]
                      ? "border-[#C00000]"
                      : "border-[#9D9D9D]"
                  }`}
                >
                  <div
                    className="flex w-[100%] items-start gap-2"
                    id="single_input"
                  >
                    <div className="relative items-center cursor-pointer">
                      <div className="w-[100%] text-[14px] justify-center items-center flex font-[500] text-[#646464]">
                        <div className="flex items-center justify-center gap-2 cursor-pointer min-w-[160px] w-[100%]">
                          <div className="flex items-center gap-1 cursor-pointer w-[100%]">
                            <ReactSelect
                              options={filteredTelCode}
                              className="w-[100%] flex items-center py-2 rounded-[8px] outline-none border-none cursor-pointer"
                              name=""
                              placeholder="Select"
                              value={selectedItem}
                              onChange={handleItemClick}
                              getOptionLabel={(option) => (
                                <div className="flex items-center cursor-pointer">
                                  <img
                                    src={`https://hatscripts.github.io/circle-flags/flags/${option.code.toLowerCase()}.svg`}
                                    width="20px"
                                  />
                                  <span className="ml-2 text-[#333333] cursor-pointer">
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
                              theme={(theme) => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                  ...theme.colors,
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
                      className="w-full text-[14px]"
                      value={profileDataa[item.name]}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>
                </div>
              ) : (
                <div
                  className={`border-[1px] rounded-[8px] px-[16px] py-2 ${
                    formErrors[item.name]
                      ? "border-[#C00000]"
                      : "border-[#9D9D9D]"
                  }`}
                >
                  <input
                    type={item.type}
                    name={item.name}
                    placeholder={item.placeholder}
                    className="w-full text-[14px]"
                    value={profileDataa[item.name]}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                    maxLength={
                      item.name === "firstName" || item.name === "lastName"
                        ? 25
                        : 60
                    }
                  />
                </div>
              )}
              {formErrors[item.name] && (
                <span className="text-[#C00000] text-[12px]">
                  {formErrors[item.name]}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end ">
          <div className="flex justify-between py-2 gap-2">
            <button
              className={`font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px] bg-[#06A9EF] w-[60px] h-[32px] ${
                isChecked ? "bg_Button" : ""
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
