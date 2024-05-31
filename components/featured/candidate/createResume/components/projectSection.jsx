import React, { useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";
import CustomSection from "./customSection";
import CustomDate from "../../../../common/customDate";
import ContinueWorkingOn from "../../../../common/continueWorkingOn";

const ProjectSection = ({ data, setData }) => {
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
  const [projectData, setProjectData] = useState({
    title: "",
    organization: "",
    description: " ",

    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "description") {
      if (value.length >= 1000 || projectData.description === 1000) {
        setError("Maximum 1000 characters allowed");
      } else {
        setError("");
      }
    }
    setProjectData((prevData) => ({
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
        const dummyData = [...data.project];
        const index = isModified.index;
        dummyData.splice(index, 1, projectData);
        setData({ ...data, project: dummyData });
        setView(false);
      } else {
        setData({
          ...data,
          project: [projectData, ...data.project],
        });
        {
          validateForm ? setView(false) : setView(true);
        }
      }
      setIsModified({ status: false, index: 0 });
      setProjectData({
        title: "",
        organization: "",
        description: " ",

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
    const dataToEdit = data.project[index];

    if (dataToEdit) {
      setView(true);
      setProjectData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteExperience = (index) => {
    setData({
      ...data,
      project: data.project.filter((item, i) => i !== index),
    });
  };

  const [errors, setErrors] = useState({
    title: "",
    organization: "",
    description: "",
  });

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!projectData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!projectData.organization.trim()) {
      newErrors.organization = "Organization is required";
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
        <p> Internships & Projects</p>
        <div className=" flex flex-row w-[30%] justify-end items-end float-end ">
          {toggleOn ? (
            <div
              onClick={() => {
                setToggleOn(false);
              }}
              className="w-[52px] h-[24px] p-[2px] g-[10px] rounded-[100px] border-[#06A9EF] border-[1px] bg-[#06A9EF]"
            >
              <div className="w-[20px] h-[20px] flex flex-col justify-end items-end float-end">
                <img className="w-full h-full" src="/images/check_circle.png" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => {
                setToggleOn(true);
              }}
              className="w-[52px] h-[24px] p-[2px] g-[10px] rounded-[100px] border-[#646464] border-[1px] bg-[#FFFFFF]"
            >
              <div className="w-[20px] h-[20px] flex flex-col justify-start items-start float-start">
                <img className="w-full h-full" src="/images/cancel.png" />
              </div>
            </div>
          )}
        </div>
      </div>

      {!view &&
        data?.project?.length > 0 &&
        data?.project?.map((exp, index) => (
          <div
            key={index}
            className="flex flex-col gap-1 p-2 rounded-[6px]  border break-all "
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
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={projectData.title}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-medium">
                Organization Name
              </div>
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="organization"
                  placeholder="Type here"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={projectData.organization}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
              {errors.title && (
                <span className="text-[red] text-[12px]">{errors.title}</span>
              )}
            </div>

            <div>
              <ContinueWorkingOn
                idPrefix="project"
                data={projectData}
                dataSeter={setProjectData}
                fromCreate={true}
              />
            </div>

            <div className="flex flex-col gap-2 w-full">
              <div className="w-full text-[14px] font-montserrat  font-small">
                Description
              </div>
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[140px]">
                <textArea
                  type="text"
                  name="description"
                  id=""
                  className="w-full text-[14px] font-montserrat font-small h-full  outline-none  min-h-[140px] "
                  placeholder="Type here"
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={1000}
                >
                  {projectData.description}
                </textArea>
              </div>
              {error && <span className="text-[red] text-[12px]">{error}</span>}
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
      <div className="flex justify-end ">
        <div className="flex justify-between  py-2 gap-2">
          <button
            className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
            onClick={() => {
              setProjectData({
                title: "",
                organization: "",
                description: " ",
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
  );
};

export default ProjectSection;
