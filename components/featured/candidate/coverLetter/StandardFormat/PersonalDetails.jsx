import React, { useState, useEffect } from "react";
import { telCode } from "../../../../../utils/data";
import ReactSelect from "react-select";
import { camelCase } from "../../../../../utils/middleware";

const PersonalDetails = ({ data, setData }) => {
  const [isShow, setIsShow] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [selectedItem, setSelectedItem] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    dial_code: "",
    address: "",
  });
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

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setProfileData({ ...profileData, dial_code: item.dial_code });
    setIsModified(true);
    setTouched({ ...touched, dial_code: true });
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

  const inputFields = [
    {
      label: "First Name",
      type: "text",
      name: "firstName",
      placeholder: "First Name",
      value: personalData.firstName,
      className: " ",
    },
    {
      label: "Last Name",
      type: "text",
      name: "lastName",
      placeholder: "Last Name",
      value: personalData.lastName,
      className: " ",
    },
    {
      label: "Mobile Number",
      type: "text",
      name: "mobileNumber",
      placeholder: "Enter Mobile Number",
      value: personalData.mobileNumber,
      className: " ",
    },
    {
      label: "Email ID",
      type: "text",
      name: "email",
      placeholder: "Enter Email Address",
      value: personalData.email,
      className: " ",
    },
    {
      label: "Address",
      type: "text",
      name: "address",
      placeholder: "Current or Permanent Address",
      value: personalData.address,
      className: " ",
    },
  ];

  const validateFields = () => {
    const newErrors = {};
    let allFieldsValid = true;

    inputFields.forEach((field) => {
      const { name } = field;
      const value = profileData[name];

      switch (name) {
        case "firstName":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "First name is required";
            allFieldsValid = false;
          }
          break;
        case "lastName":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Last name is required";
            allFieldsValid = false;
          }
          break;
        case "mobileNumber":
          if ((!value || !value.toString().trim()) && touched[name]) {
            newErrors[name] = "Mobile number is required";
            allFieldsValid = false;
          }
          break;
        case "email":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Email is required";
            allFieldsValid = false;
          }
          break;
        case "location":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Location is required";
            allFieldsValid = false;
          }
          break;
        case "designation":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Designation is required";
            allFieldsValid = false;
          }
          break;
        case "dial_code":
          if (!value.trim() && touched[name]) {
            newErrors[name] = "Dial code is required";
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
        setProfileData({
          ...personalData,
          [name]: value.replace(/\D/g, ""),
        });
        setIsModified(true);
        setFormErrors({ ...formErrors, [name]: value.trim() === "" });
      }
    } else {
      setPersonalData({
        ...personalData,
        [name]: value,
      });
      setIsModified(true);
      setFormErrors({ ...formErrors, [name]: value.trim() === "" });
    }
  };

  const customFilterOption = ({ label, value, data }, inputValue) => {
    const lowercasedInput = inputValue.toLowerCase();
    return (
      data.code.toLowerCase().includes(lowercasedInput) ||
      data.dial_code.includes(inputValue)
    );
  };

  return (
    <div className="flex flex-col gap-[16px] w-full bg-white p-4">
      <div className="flex flex-row justify-between gap-[8px] items-center">
        <div>
          <span className="font-montserrat text-[18px] font-[600] leading-[21.94px] text-left text-[#333333]">
            Personal Details
          </span>
        </div>
        <div>
          {isShow ? (
            <div onClick={() => setIsShow(!isShow)}>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00078 2.7999L2.10078 6.6749C1.91745 6.85824 1.68828 6.95407 1.41328 6.9624C1.13828 6.97074 0.900781 6.8749 0.700781 6.6749C0.517448 6.49157 0.425781 6.25824 0.425781 5.9749C0.425781 5.69157 0.517448 5.45824 0.700781 5.2749L5.30078 0.674902C5.40078 0.574902 5.50911 0.504069 5.62578 0.462402C5.74245 0.420736 5.86745 0.399902 6.00078 0.399902C6.13411 0.399902 6.25911 0.420736 6.37578 0.462402C6.49245 0.504069 6.60078 0.574902 6.70078 0.674902L11.3008 5.2749C11.4841 5.45824 11.5799 5.6874 11.5883 5.9624C11.5966 6.2374 11.5008 6.4749 11.3008 6.6749C11.1174 6.85824 10.8841 6.9499 10.6008 6.9499C10.3174 6.9499 10.0841 6.85824 9.90078 6.6749L6.00078 2.7999Z"
                  fill="#333333"
                />
              </svg>
            </div>
          ) : (
            <div onClick={() => setIsShow(!isShow)}>
              <svg
                width="12"
                height="7"
                viewBox="0 0 12 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.00011 6.95021C5.86678 6.95021 5.74178 6.92937 5.62511 6.88771C5.50844 6.84604 5.40011 6.77521 5.30011 6.67521L0.700109 2.07521C0.516776 1.89187 0.420943 1.66271 0.412609 1.38771C0.404276 1.11271 0.500109 0.875207 0.700109 0.675207C0.883443 0.491874 1.11678 0.400207 1.40011 0.400207C1.68344 0.400207 1.91678 0.491874 2.10011 0.675207L6.00011 4.55021L9.90011 0.675207C10.0834 0.491874 10.3126 0.39604 10.5876 0.387707C10.8626 0.379374 11.1001 0.475207 11.3001 0.675207C11.4834 0.85854 11.5751 1.09187 11.5751 1.37521C11.5751 1.65854 11.4834 1.89187 11.3001 2.07521L6.70011 6.67521C6.60011 6.77521 6.49178 6.84604 6.37511 6.88771C6.25844 6.92937 6.13344 6.95021 6.00011 6.95021Z"
                  fill="#333333"
                />
              </svg>
            </div>
          )}
        </div>
      </div>

      {isShow && (
        <div className="flex flex-col gap-[8px]">
          <div className="flex flex-row gap-[16px]">
            {inputFields
              .filter(
                (employer) =>
                  employer.label === "First Name" ||
                  employer.label === "Last Name"
              )
              .map((employer, index) => (
                <div className="flex flex-col gap-[8px] w-full" key={index}>
                  <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
                    {employer.label}
                  </label>
                  <input
                    type={employer.type}
                    name={employer.name}
                    placeholder={employer.placeholder}
                    value={personalData[employer.name]}
                    onChange={handleInputChange}
                    className="w-full pt-[12px]  pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid border-[#DEDEDE] rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400]"
                  />
                </div>
              ))}
          </div>

          <div className={`flex flex-col gap-2 w-full`}>
            <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left flex-wrap">
              Mobile Number
            </label>

            <div className="w-[60%] flex pr-[16px] h-[40px] pl-[16px] gap-2 border border-solid border-[#DEDEDE] rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400]">

                <ReactSelect
                  options={filteredTelCode}
                  className="w-[45%] flex items-center  rounded-[8px] outline-none border-none cursor-pointer"
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
          

              <input
                type="number"
                name="mobileNumber"
                placeholder="Enter Mobile Number"
                className="w-full text-[12px] leading-[14px] px-2"
                value={personalData["mobileNumber"]}
                onChange={handleInputChange}
                disabled={!isChecked}
              />
            </div>

          </div>

          <div className="flex flex-col gap-[8px]">
            {inputFields
              .filter(
                (employer) =>
                  employer.label === "Address" ||
                  employer.label === "Mobile Number"
              )
              .map((employer, index) => (
                <div className="flex flex-col gap-[8px] w-full" key={index}>
                  <label className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left flex-wrap">
                    {employer.label}
                  </label>
                  <input
                    type={employer.type}
                    name={employer.name}
                    placeholder={employer.placeholder}
                    value={personalData[employer.name]}
                    onChange={handleInputChange}
                    className="w-full pt-[12px] pr-[16px] pb-[12px] pl-[16px] gap-0 border border-solid border-[#DEDEDE] rounded-[8px] text-[12px] leading-[16px] text-[#646464] font-[400]"
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalDetails;
