import React, { useState } from "react";
import { camelCase } from "../../../../../utils/middleware";

const PersonalDetails = ({ setData, data }) => {
  const [isChecked, setIsChecked] = useState(true);

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
  });
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
      type: "number",
      name: "mobileNumber",
      placeholder: "Enter Mobile Number",
      value: profileData.mobileNumber,
      className: " ",
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
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };
  const isDisabled = () => {
    let returnValue = true;
    Object.keys(profileData).forEach((item) => {
      returnValue = profileData[item] == data[item];
    });
    return returnValue;
  };
  const saveData = () => {
    setData({
      ...data,
      firstName: camelCase(profileData.firstName),
      lastName: camelCase(profileData.lastName),
      mobileNumber: profileData.mobileNumber,
      email: profileData.email.toLowerCase(),
      location: camelCase(profileData.location),
      designation: profileData.designation,
    });
  };

  return (
    <>
      <div
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Personal Details</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4 gap-4">
          {inputFields.map((item, index) => (
            <div
              className={`flex flex-col gap-2 w-full ${item.className}`}
              key={index}
            >
              <div className=" text-[14px] font-montserrat  font-medium">
                {item.label}
              </div>
              <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                <input
                  type={item.type}
                  name={item.name}
                  placeholder={item.placeholder}
                  className="w-full text-[14px] font-montserrat font-small"
                  value={profileData[item.name]}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end ">
          <div className="flex justify-between  py-2 gap-2">
            <button
              className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]"
              disabled={!isChecked}
            >
              Update to Profile
            </button>
            <button
              className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
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
