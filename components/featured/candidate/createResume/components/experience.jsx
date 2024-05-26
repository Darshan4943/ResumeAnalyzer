import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Experience = ({ data, setData }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [error, setError] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showExperience: !isChecked });
  };
  const [experienceData, setExperienceData] = useState({
    designation: "",
    organization: "",
    description: " ",
    currentlyWorking: true,
    location: "",
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length >= 1000 || experienceData.description === 1000) {
        setError("Maximum 1000 characters allowed");
      } else {
        setError("");
      }
    }
    setExperienceData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        value.trim() === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          : "",
    }));
  };

  const handleSave = () => {
    if (validateForm()) {
      if (isModified.status === true) {
        const dummyData = [...data.experience];
        const index = isModified.index;
        dummyData.splice(index, 1, experienceData);
        setData({ ...data, experience: dummyData });
        setView(false);
      } else {
        setData({
          ...data,
          experience: [experienceData, ...data.experience],
        });
        {
          validateForm ? setView(false) : setView(true);
        }
      }
      setIsModified({ status: false, index: 0 });
      setExperienceData({
        designation: "",
        organization: "",
        description: "",
        currentlyWorking: true,
        location: "",
        duration: {
          start: { year: "Year", month: "Month" },
          end: { year: "Year", month: "Month" },
        },
      });
    } else {
      setView(true);
    }
  };

  const handleEditExperience = (index) => {
    const dataToEdit = data.experience[index];

    if (dataToEdit) {
      setView(true);
      setExperienceData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteExperience = (index) => {
    setData({
      ...data,
      experience: data.experience.filter((item, i) => i !== index),
    });
  };

  const [errors, setErrors] = useState({
    designation: "",
    organization: "",
    description: "",
  });

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!experienceData.designation.trim()) {
      newErrors.designation = "Designation is required";
    }

    if (!experienceData.organization.trim()) {
      newErrors.organization = "Organization is required";
    }

    if (!experienceData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  const handleEditClick = (index) => {
    setEditingIndex(index);
    handleEditExperience(index);
  };

  return (
    <div
      className="flex flex-col p-4 gap-2 rounded-lg bg-white"
      style={{
        // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
        <p> Experience</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleSwitchChange}
          />
          <span className="slider round"></span>
        </label>
      </div>

      {data?.experience?.map((exp, index) => (
        <div
          key={index}
          className={`flex flex-col gap-1 p-2 rounded-[6px]  border break-all ${
            editingIndex === index
              ? "border-[#06A9EF] border-[2px]"
              : "border-[#DEDEDE]"
          }`}
        >
          <div className="flex justify-between">
            <p className="text-[14px]">
              {exp?.organization}{" "}
              {exp?.duration?.start?.year !== "Year" &&
                ` ${"|"} ${exp.duration?.start?.year} 
              ${exp?.duration?.start?.year && "-"}
              ${exp?.currentlyWorking ? "Present" : exp?.duration?.end?.year}`}
            </p>
            <div className="flex gap-2">
              <div onClick={() => handleEditClick(index)}>
                <Edit_icon />
              </div>
              <div onClick={() => handleDeleteExperience(index)}>
                <Delete_icon />
              </div>
            </div>
          </div>
          <p className="text-[12px]">
            {exp.designation} | {exp.location}
          </p>
        </div>
      ))}

      {view && (
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Designation
              </div>
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="designation"
                  placeholder="Enter your Designation"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={experienceData.designation}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
              {errors.designation && (
                <span className="text-[red] text-[12px]">
                  {errors.designation}
                </span>
              )}
            </div>
            <div className="flex w-full gap-2 ">
              <div className="flex flex-col gap-2 w-[50%]">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Organisation
                </div>
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                  <input
                    type="text"
                    name="organization"
                    placeholder="Enter company name"
                    className="w-full text-[14px] font-montserrat font-small "
                    value={experienceData.organization}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                    maxLength={200}
                  />
                </div>
                {errors.organization && (
                  <span className="text-[red] text-[12px]">
                    {errors.organization}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-[50%]">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Location
                </div>
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                  <input
                    type="text"
                    name="location"
                    placeholder="Enter Work Location"
                    className="w-full text-[14px] font-montserrat font-small "
                    value={experienceData.location}
                    onChange={handleInputChange}
                    disabled={!isChecked}
                    maxLength={200}
                  />
                </div>
                {errors.location && (
                  <span className="text-[red] text-[12px]">
                    {errors.location}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full flex gap-2 text-[14px] font-montserrat  font-medium items-center">
              <input
                type="checkbox"
                className="w-4 h-4 rounded-md border-2 border-[#06A9EF] bg-white"
                checked={experienceData.currentlyWorking}
                onChange={() =>
                  setExperienceData({
                    ...experienceData,
                    currentlyWorking: !experienceData.currentlyWorking,
                    end: {
                      ...data.duration?.end,
                      year: "Present",
                      month: "Present",
                    },
                  })
                }
              />
              <label>Currently working here</label>
            </div>

            <div>
              <DateSelector
                idPrefix="education"
                data={experienceData}
                dataSeter={setExperienceData}
                fromCreate={true}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Work Description
              </div>
              <div className="w-full text-[14px] font-montserrat  font-small">
                Describe about your work
              </div>
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px]">
                <textArea
                  type="text"
                  name="description"
                  id=""
                  className="w-full text-[14px] font-montserrat font-small h-full  outline-none  min-h-[140px] "
                  placeholder="Enter text"
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={1000}
                >
                  {experienceData.description}
                </textArea>
              </div>
              {error && <span className="text-[red] text-[12px]">{error}</span>}
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              <button
                className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                onClick={() => {
                  setExperienceData({
                    designation: "",
                    organization: "",
                    description: " ",
                    currentlyWorking: true,
                    location: "",
                    duration: {
                      start: { year: "Year", month: "Month" },
                      end: { year: "Year", month: "Month" },
                    },
                  });
                  setView(false);
                }}
              >
                Cancel
              </button>
              {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                Update to Profile
              </button> */}
              <button
                onClick={handleSave}
                disabled={!isChecked}
                className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px] btn_hover_effect"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {!view && (
        <div className="flex gap-1" onClick={() => isChecked && setView(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <g mask="url(#mask0_5716_136351)">
              <path
                d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                fill="#06A9EF"
              />
            </g>
          </svg>
          <p
            // onClick={() => setView(true)}
            className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
            disabled={!isChecked}
          >
            Add Experience
          </p>
        </div>
      )}
    </div>
  );
};

export default Experience;
