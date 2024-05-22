import React, { useEffect, useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";
import { useSelector } from "react-redux";

const Education = ({ setData, data }) => {
  const [isChecked, setIsChecked] = useState(true);
  const [view, setView] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const currentYear = currentDate.getFullYear();
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [editingIndex, setEditingIndex] = useState(null);
  const [educationData, setEducationData] = useState({
    qualification: "",
    specialization: "",
    instituteName: "",
    type: "full-time",
    location: "",
    duration: {
      start: { year: currentYear, month: currentMonth },
      end: { year: currentYear, month: currentMonth },
    },
  });

  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showEducation: !isChecked });
  };
  const handleInputChangeEducation = (e) => {
    const { name, value } = e.target;
    setEducationData({
      ...educationData,
      [name]: value,
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        value.trim() === ""
          ? `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
          : "",
    }));
  };
  const handleDeleteEducation = (index) => {
    setData({
      ...data,
      education: data.education.filter((item, i) => i !== index),
    });
  };

  const handleEditEducation = (index) => {
    const educationToEdit = data.education[index];

    if (educationToEdit) {
      setView(true);
      setEducationData({ ...educationToEdit });
      setIsModified({ status: true, index });
      // setEducationData(updatedEducationData);
    }
  };

  const [errors, setErrors] = useState({
    qualification: "",
    specialization: "",
    instituteName: "",
  });

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!educationData.qualification.trim()) {
      newErrors.qualification = "Course name is required";
    }

    if (!educationData.specialization.trim()) {
      newErrors.specialization = "Specialization / Board is required";
    }

    if (!educationData.instituteName.trim()) {
      newErrors.instituteName = "University Name is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      if (isModified.status === true) {
        const dumyData = data.education;
        const index = isModified.index;
        dumyData.splice(index, 1, educationData);
        setData({ ...data, education: dumyData });
        setView(false);
      } else {
        setData({
          ...data,
          education: [educationData, ...data.education],
        });
        setView(false);
      }
      window.scrollTo(0, 0);
    }
  };
  const handleEditClick = (index) => {
    setEditingIndex(index);
    handleEditEducation(index);
  };
  return (
    <>
      <div
        className="flex flex-col p-4 gap-2 rounded-lg bg-white"
        style={{
          boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25) ",
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> Education</p>

          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
        {data?.education?.map((edu, index) => (
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
                {edu.qualification}{" "}
                {edu.duration?.start?.year != "Year" &&
                  ` ${"|"} ${edu.duration?.start?.year} 
              ${edu.duration?.start?.year && "-"}
              ${
                edu.duration?.end?.year === "Year"
                  ? "Present"
                  : edu.duration?.end?.year
              }`}
              </p>
              <div className="flex gap-2">
                <button>
                  <div onClick={() => handleEditClick(index)}>
                    <Edit_icon />
                  </div>
                </button>
                <button>
                  <div onClick={() => handleDeleteEducation(index)}>
                    <Delete_icon />
                  </div>
                </button>
              </div>
            </div>
            <div className="flex gap-8 text-[12px]">
              <p>
                {edu.specialization}{" "}
                {edu.specialization && edu.instituteName && `|`}{" "}
                {edu.instituteName}
              </p>
              {/* <p>University : {edu.instituteName}</p> */}
            </div>
          </div>
        ))}

        {view && (
          <div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 w-full">
                <div className=" text-[14px] font-montserrat  font-medium">
                  Course name
                </div>
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                  <input
                    type="text"
                    name="qualification"
                    placeholder="Enter Course name"
                    className="w-full text-[14px]  leading-tight"
                    value={educationData.qualification}
                    onChange={handleInputChangeEducation}
                    disabled={!isChecked}
                  />
                </div>
                {errors.qualification && (
                  <span className="text-[red] text-[12px]">
                    {errors.qualification}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Specialization / Board
                </div>
                <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Enter your specialization/board"
                    className="w-full text-[14px]  "
                    value={educationData.specialization}
                    onChange={handleInputChangeEducation}
                    disabled={!isChecked}
                  />
                </div>
                {errors.specialization && (
                  <span className="text-[red] text-[12px]">
                    {errors.specialization}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className=" text-[14px] font-montserrat  font-medium">
                  University Name
                </div>
                <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px]">
                  <input
                    type="text"
                    name="instituteName"
                    placeholder="Enter University Name"
                    className="w-full text-[14px] font-montserrat font-small "
                    value={educationData.instituteName}
                    onChange={handleInputChangeEducation}
                    disabled={!isChecked}
                  />
                </div>
                {errors.instituteName && (
                  <span className="text-[red] text-[12px]">
                    {errors.instituteName}
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Passing Year
                </div>
                <div>
                  <DateSelector
                    idPrefix="education"
                    data={educationData}
                    dataSeter={setEducationData}
                    fromCreate={true}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <div className="w-full text-[14px] font-montserrat  font-medium">
                  Education Type
                </div>
                <div className="w-full flex gap-2 text-[14px] font-montserrat items-center font-medium">
                  <input
                    type="radio"
                    className="h-4 w-4 custom-radio"
                    value={educationData.type}
                    checked={educationData.type == "full-time"}
                    onChange={() => {
                      setEducationData({ ...educationData, type: "full-time" });
                    }}
                  />
                  <label>Full-Time</label>

                  <input
                    disabled={!isChecked}
                    type="radio"
                    className="h-4 w-4 custom-radio"
                    value={educationData.type}
                    checked={educationData.type == "part-time"}
                    onChange={() => {
                      setEducationData({ ...educationData, type: "part-time" });
                    }}
                  />
                  <label>Part-Time</label>
                </div>
              </div>
            </div>

            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => setView(false)}
                >
                  Cancel
                </button>
                {/* <button className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[137px] h-[32px]">
                  Update to Profile
                </button> */}
                <button
                  onClick={handleSave}
                  className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
        {!view && (
          <div
            className="flex gap-1"
            onClick={() => {
              setEducationData({
                qualification: "",
                specialization: "",
                instituteName: "",
                type: "full-time",
                location: "",
                duration: {
                  start: { year: "Year", month: "Month" },
                  end: { year: "Year", month: "Month" },
                },
              });
              setIsModified({
                status: false,
                index: 0,
              });
              setView(true);
            }}
          >
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
              // onClick={() => {
              //   setEducationData({
              //     qualification: "",
              //     specialization: "",
              //     instituteName: "",
              //     type: "full-time",
              //     location: "",
              //     duration: {
              //       start: { year: "Year", month: "Month" },
              //       end: { year: "Year", month: "Month" },
              //     },
              //   });
              //   setIsModified({
              //     status: false,
              //     index: 0,
              //   });
              //   setView(true);
              // }}
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add Education
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Education;
