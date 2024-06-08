import React, { useEffect, useState } from "react";
import DateSelector from "../../../../common/dateSelector";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";
import CustomSection from "./customSection";
import CustomDate from "../../../../common/customDate";
import ContinueWorkingOn from "../../../../common/continueWorkingOn";

const Project = ({
  data,
  setData,
  setProjectView,
  projectView,
  setCustomOptions,
}) => {
  const [isChecked, setIsChecked] = useState(true);
  const [toggleOn, setToggleOn] = useState(true);

  const [editingIndex, setEditingIndex] = useState(null);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [error, setError] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showProject: !isChecked });
  };

  useEffect(() => {
    if (data) {
      if (data.showProject === true) {
        setIsChecked(true);
      } else {
        setIsChecked(false);
      }
    }
  }, [data]);

  const [projectData, setProjectData] = useState({
    title: "",
    organization: "",
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
      if (value?.length >= 1000 || projectData?.description === 1000) {
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
        value?.trim() === ""
          ? `${name?.charAt(0)?.toUpperCase() + name?.slice(1)} is required`
          : "",
    }));
  };

  const handleSave = () => {
    if (validateForm()) {
      if (isModified?.status === true) {
        const dummyData = [...data?.project];
        const index = isModified?.index;
        dummyData?.splice(index, 1, projectData);
        setData({ ...data, project: dummyData });
        setProjectView(false);
      } else {
        setData({
          ...data,
          project: [projectData, ...data?.project],
        });
        {
          validateForm ? setProjectView(false) : setProjectView(true);
        }
      }
      setIsModified({ status: false, index: 0 });
      setProjectData({
        title: "",
        organization: "",
        description: "",
        currentlyWorking: true,

        duration: {
          start: { year: "Year", month: "Month" },
          end: { year: "Year", month: "Month" },
        },
      });
    } else {
      setProjectView(true);
    }
  };

  const handleEditExperience = (index) => {
    const dataToEdit = data?.project[index];

    if (dataToEdit) {
      setProjectView(true);
      setProjectData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };
  const handleDeleteExperience = (index) => {
    setData({
      ...data,
      project: data?.project?.filter((item, i) => i !== index),
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

    if (!projectData?.title?.trim()) {
      newErrors.title = "Title is required";
    }

    if (!projectData?.organization?.trim()) {
      newErrors.organization = "Organization is required";
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
      className="flex flex-col py-4 gap-2 rounded-lg bg-white"
      style={{
        // boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        opacity: isChecked ? 1 : 0.5,
      }}
    >
      <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
        <p> Projects</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleSwitchChange}
          />
          <span className="slider round"></span>
        </label>

        {/* <div onClick={() => {
          setCustomOptions((prevState) => ({
            ...prevState,
            ["Project"]: false,
          })); setData({
            ...data,
            project: [],
          })
        }} className="w-[36px] h-[36px] rounded-[50%] border border-[#DEDEDE] bg-[#F7F7F7] flex justify-center items-center cursor-pointer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

            <g mask="url(#mask0_3986_38982)">
              <path d="M7.30775 20.5002C6.81058 20.5002 6.385 20.3232 6.031 19.9692C5.677 19.6152 5.5 19.1896 5.5 18.6925V6.00022H5.25C5.0375 6.00022 4.85942 5.92831 4.71575 5.78447C4.57192 5.64064 4.5 5.46247 4.5 5.24997C4.5 5.03731 4.57192 4.85922 4.71575 4.71572C4.85942 4.57206 5.0375 4.50022 5.25 4.50022H9C9 4.25539 9.08625 4.04672 9.25875 3.87422C9.43108 3.70189 9.63967 3.61572 9.8845 3.61572H14.1155C14.3603 3.61572 14.5689 3.70189 14.7413 3.87422C14.9138 4.04672 15 4.25539 15 4.50022H18.75C18.9625 4.50022 19.1406 4.57214 19.2843 4.71597C19.4281 4.85981 19.5 5.03797 19.5 5.25047C19.5 5.46314 19.4281 5.64122 19.2843 5.78472C19.1406 5.92839 18.9625 6.00022 18.75 6.00022H18.5V18.6925C18.5 19.1896 18.323 19.6152 17.969 19.9692C17.615 20.3232 17.1894 20.5002 16.6923 20.5002H7.30775ZM17 6.00022H7V18.6925C7 18.7823 7.02883 18.8561 7.0865 18.9137C7.14417 18.9714 7.21792 19.0002 7.30775 19.0002H16.6923C16.7821 19.0002 16.8558 18.9714 16.9135 18.9137C16.9712 18.8561 17 18.7823 17 18.6925V6.00022ZM10.1543 17.0002C10.3668 17.0002 10.5448 16.9284 10.6885 16.7847C10.832 16.6409 10.9037 16.4627 10.9037 16.2502V8.75022C10.9037 8.53772 10.8318 8.35956 10.688 8.21572C10.5443 8.07206 10.3662 8.00022 10.1535 8.00022C9.941 8.00022 9.76292 8.07206 9.61925 8.21572C9.47575 8.35956 9.404 8.53772 9.404 8.75022V16.2502C9.404 16.4627 9.47583 16.6409 9.6195 16.7847C9.76333 16.9284 9.94158 17.0002 10.1543 17.0002ZM13.8465 17.0002C14.059 17.0002 14.2371 16.9284 14.3807 16.7847C14.5242 16.6409 14.596 16.4627 14.596 16.2502V8.75022C14.596 8.53772 14.5242 8.35956 14.3805 8.21572C14.2367 8.07206 14.0584 8.00022 13.8458 8.00022C13.6333 8.00022 13.4552 8.07206 13.3115 8.21572C13.168 8.35956 13.0962 8.53772 13.0962 8.75022V16.2502C13.0962 16.4627 13.1682 16.6409 13.312 16.7847C13.4557 16.9284 13.6338 17.0002 13.8465 17.0002Z" fill="#C00000" />
            </g>
          </svg>

        </div> */}
      </div>

      {
        data?.project?.length > 0 &&
        data?.project?.map((exp, index) => (
          <div
            key={index}
            className={`flex flex-col gap-1 py-[12px] px-[16px] rounded-[6px]  border break-all ${
              editingIndex === index
                ? "border-[#06A9EF] border-[2px]"
                : "border-[#DEDEDE]"
            }`}
          >
            <div className="flex justify-between">
              <p className="text-[14px]">{exp?.title} </p>
              <div className="flex gap-2 cursor-pointer">
                <div onClick={() => handleEditClick(index)}>
                  <Edit_icon />
                </div>
                <div onClick={() => handleDeleteExperience(index)}>
                  <Delete_icon />
                </div>
              </div>
            </div>
            <p className="text-[12px]">
              {exp?.organization}{" "}
              {exp?.duration?.start?.year !== "Year" &&
                ` ${"|"} ${exp?.duration?.start?.year} 
              ${exp?.duration?.start?.year && "-"}
              ${exp?.currentlyWorking ? "Present" : exp?.duration?.end?.year}`}
            </p>
            <p className="text-[12px]">{exp?.description}</p>
          </div>
        ))}

      {(projectView || data.project.length <= 0) && (
        <div>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 w-full">
              <div className="w-full border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[12px] ">
                <input
                  type="text"
                  name="title"
                  placeholder="Enter Title"
                  className="w-full text-[14px] font-montserrat font-small "
                  value={projectData?.title}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>
              {errors?.title && (
                <span className="text-[red] text-[12px]">{errors?.title}</span>
              )}
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
                  value={projectData?.organization}
                  onChange={handleInputChange}
                  disabled={!isChecked}
                  maxLength={200}
                />
              </div>

              {errors?.organization && (
                <span className="text-[red] text-[12px]">
                  {errors?.organization}
                </span>
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
                  {projectData?.description}
                </textArea>
              </div>
            </div>
          </div>
          <div className="flex justify-end ">
            <div className="flex justify-between  py-2 gap-2">
              <button
                className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                onClick={() => {
                  setProjectData({
                    title: "",
                    organization: "",
                    description: "",
                    currentlyWorking: true,
                    duration: {
                      start: { year: "Year", month: "Month" },
                      end: { year: "Year", month: "Month" },
                    },
                  });
                  setProjectView(false);
                  if (data.project.length <= 0) {
                    setCustomOptions((prevState) => ({
                      ...prevState,
                      ["Project"]: false,
                    }));
                    setData({
                      ...data,
                      project: [],
                    });
                  }
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

      {!projectView && data.project.length > 0 && (
        <div
          className="flex gap-1"
          onClick={() => isChecked && setProjectView(true)}
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
            // onClick={() => setProjectView(true)}
            className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
            disabled={!isChecked}
          >
            Add Project
          </p>
        </div>
      )}
    </div>
  );
};

export default Project;
