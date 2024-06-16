import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import CustomDate from "../../../../common/customDate";
import ContinueWorkingOn from "../../../../common/continueWorkingOn";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

function CustomSection({ data, setData, setCustomOptions, customOptions }) {
  const [isChecked, setIsChecked] = useState(true);
  const [toggleOn, setToggleOn] = useState(true);
  const [view, setView] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [error, setError] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showExperience: !isChecked });
  };
  const [customData, setCustomData] = useState({
    title: "",
    subtitle: "",
    description: "",
    currentlyWorking: true,

    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value?.length >= 1000 || customData?.description === 1000) {
        setError("Maximum 1000 characters allowed");
      } else {
        setError("");
      }
    }
    setCustomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]:
        value?.trim() === ""
          ? `${name?.charAt(0)?.toUpperCase() + name?.slice(1)} is required`
          : "",
    }));
  };

  const handleSave = () => {
    if (validateForm()) {
      if (isModified?.status === true) {
        const dummyData = [...data?.customDataSection];
        const index = isModified?.index;
        dummyData?.splice(index, 1, customData);
        setData({ ...data, customDataSection: dummyData });
        setView(false);
      } else {
        setData({
          ...data,
          customDataSection: [customData, ...data?.customDataSection],
        });
        {
          validateForm ? setView(false) : setView(true);
        }
      }
      setIsModified({ status: false, index: 0 });
      setCustomData({
        title: "",
        subtitle: "",
        description: "",
        currentlyWorking: true,

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
    const dataToEdit = data?.customDataSection[index];

    if (dataToEdit) {
      setView(true);
      setCustomData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteExperience = (index) => {
    setData({
      ...data,
      customDataSection: data?.customDataSection?.filter(
        (item, i) => i !== index
      ),
    });
  };

  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    organization: "",
    description: "",
  });

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!customData?.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!customData?.subtitle?.trim()) {
      newErrors.subtitle = "Sub Header is required";
    }

    if (!customData?.description?.trim()) {
      newErrors.description = "Description is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors)?.length === 0;
  };
  const handleEditClick = (index) => {
    setEditingIndex(index);
    handleEditExperience(index);
  };
  return (
    <div
      className="flex flex-col p-4 gap-[16px] rounded-lg bg-white"
      style={{
        // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      {!view && data?.customDataSection?.length > 0 && (
        <div className="w-full flex justify-end items-end float-end text-[20px] font-montserrat font-medium ">
          {/* <p> Experience</p> */}
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}

      {!view &&
        data?.customDataSection?.length > 0 &&
        data?.customDataSection?.map((exp, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 py-[12px] px-[16px] rounded-[6px]  border break-all ${
              editingIndex === index
                ? "border-[#06A9EF] border-[2px]"
                : "border-[#DEDEDE]"
            }`}
          >
            <div className="flex  justify-between">
              <p className="text-[14px]">
                {exp?.title}{" "}
                {exp?.duration?.start?.year !== "Year" &&
                  ` ${"|"} ${exp?.duration?.start?.year} 
            ${exp?.duration?.start?.year && "-"}
            ${ exp.duration?.end?.year === "Year" ? "Present" : exp?.duration?.end?.year}`}
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
            <p className="text-[12px]">{exp?.description}</p>
          </div>
        ))}

      {view && (
        <div>
          <div className="flex flex-col p-[16px]  gap-[16px] ">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full border-[1px] border-[#646464] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="title"
                  placeholder=" Enter Header Eg. Activities, Job, Course"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={customData?.title}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
            </div>
            {errors?.title && (
              <span className="text-[red] text-[12px]">{errors?.title}</span>
            )}

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full border-[1px] border-[#646464] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="subtitle"
                  placeholder=" Enter Sub Header Eg. Activities, Job, Course"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={customData?.subtitle}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
            </div>
            {errors?.subtitle && (
              <span className="text-[red] text-[12px]">{errors?.subtitle}</span>
            )}
            <div className="flex flex-col gap-[8px] w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Description
              </div>
              <div className="w-full border-[1px] border-[#646464] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="description"
                  placeholder="Type here"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={customData?.description}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
              {errors?.description && (
                <span className="text-[red] text-[12px]">
                  {errors?.description}
                </span>
              )}
            </div>

            <div>
              <ContinueWorkingOn
                idPrefix="customData"
                data={customData}
                dataSeter={setCustomData}
                fromCreate={true}
              />
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              <button
                className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                onClick={() => {
                  setCustomData({
                    title: "",
                    subtitle: "",
                    description: "",
                    currentlyWorking: true,

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
            Add Section
          </p>
        </div>
      )}
    </div>
  );
}

export default CustomSection;
