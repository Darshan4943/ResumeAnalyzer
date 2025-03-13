import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactSelect from "react-select";
import { ClosedIcon } from "../../../utils/svg";
import DateSelector from "../../common/dateSelector";
import { SkillList } from "../../../utils/data";
import { camelCase } from "../../../utils/middleware";
import { fetchUserData } from "../../../Redux/slices/userSlice";

function AddWorkExperience({
  setOpenAddExperience,
  userData,
  editExperience,
  Experience,
}) {
  const { userDataGlobal, profileData } = useSelector(
    (state) => state.user.userData
  );
  const [experiences, setExperiences] = useState([]);
  const [error, setError] = useState(false);
  const [skill, setSkills] = useState([...SkillList]);
  const [errorMessage, setErrorMessage] = useState("");
  const isEditing = !!editExperience;
  const [errorObj, setErrorObj] = useState({
    jobType: false,
    jobMode: false,
    organisation: false,
    designation: false,
    location: false,
  });

  const [experienceData, setExperienceData] = useState(() => ({
    currentlyWorking: editExperience ? !!Experience?.isCurrent : false,
    jobType: editExperience ? Experience?.jobType || "" : "",
    jobMode: editExperience ? Experience?.jobMode || "" : "",
    designation: editExperience ? Experience?.jobTitle || "" : "",
    organisation: editExperience ? Experience?.companyName || "" : "",
    location: editExperience ? Experience?.jobLocation || "" : "",
    noticePeriod: editExperience ? Experience?.noticePeriod || "" : "",
    skillsLearned: editExperience
      ? Experience?.skills?.map((skill) => ({
          value: skill.value || skill.label,
          label: skill.label || skill.value,
        }))
      : [],
    workDescription: editExperience ? Experience?.workDescription || "" : "",
    duration: {
      start: {
        year: editExperience
          ? Experience?.jobDuration?.startDate?.year || "Year"
          : "Year",
        month: editExperience
          ? Experience?.jobDuration?.startDate?.month || "Month"
          : "Month",
      },
      end: {
        year: editExperience
          ? Experience?.jobDuration?.endDate?.year || "Year"
          : "Year",
        month: editExperience
          ? Experience?.jobDuration?.endDate?.month || "Month"
          : "Month",
      },
    },
  }));

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setErrorObj((prev) => ({
        ...prev,
        [name]: false,
      }));
      setExperienceData((prevData) => ({
        ...prevData,
        [name]: name === "currentlyWorking" ? value === "true" : value,
      }));
      validateField(name, value);
    }
  };

  const validateField = (fieldName, value) => {
    let updatedErrorObj = { ...errorObj };

    switch (fieldName) {
      case "jobType":
        updatedErrorObj.jobType = !value;
        setErrorMessage(updatedErrorObj.jobType ? "Job Type is required" : "");
        break;
      case "jobMode":
        updatedErrorObj.jobMode = !value;
        setErrorMessage(updatedErrorObj.jobMode ? "Job Mode is required" : "");
        break;
      case "organisation":
        updatedErrorObj.organisation = !value;
        setErrorMessage(
          updatedErrorObj.organisation ? "Organisation is required" : ""
        );
        break;
      case "designation":
        updatedErrorObj.designation = !value;
        setErrorMessage(
          updatedErrorObj.designation ? "Designation is required" : ""
        );
        break;
      case "location":
        updatedErrorObj.location = !value;
        setErrorMessage(updatedErrorObj.location ? "Location is required" : "");
        break;

      default:
        break;
    }
    setErrorObj(updatedErrorObj);
  };

  const validateForm = () => {
    let updatedErrorObj = { ...errorObj };
    updatedErrorObj.jobType = !experienceData.jobType;
    updatedErrorObj.jobMode = !experienceData.jobMode;
    updatedErrorObj.organisation = !experienceData.organisation;
    updatedErrorObj.designation = !experienceData.designation;
    updatedErrorObj.location = !experienceData.location;

    setErrorObj(updatedErrorObj);
    const hasErrors = Object.values(updatedErrorObj).includes(true);

    if (hasErrors) {
      setErrorMessage("Please fill in all required fields.");

      if (updatedErrorObj.duration) {
        toast.error(
          experienceData.currentlyWorking
            ? "Please select start date only."
            : "Please select both start and end dates.",
          {
            autoClose: 3000,
          }
        );
      }

      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) {
      return;
    }

    const updatedExperiences = [...experiences, experienceData];
    setExperiences(updatedExperiences);

    const obj = {
      isCurrent: experienceData.currentlyWorking,
      jobType: experienceData.jobType,
      jobMode: experienceData.jobMode,
      companyName: experienceData.organisation,
      jobTitle: experienceData.designation,
      jobLocation: experienceData.location,
      skills: experienceData.skillsLearned.map((skill) => ({
        value: skill.value,
        label: skill.label,
      })),
      noticePeriod: experienceData.noticePeriod,
      workDescription: experienceData.workDescription,
      jobDuration: {
        startDate: {
          year: experienceData.duration?.start.year,
          month: experienceData.duration?.start.month,
        },
        endDate: {
          year: experienceData.duration?.end.year,
          month: experienceData.duration?.end.month,
        },
      },
    };

    if (isEditing) {
      axios
        .put(
          `https://dev.api.skilotech.com/api/candidate/${userDataGlobal?._id}/updateWorkExperience/${Experience._id}`,
          obj
        )
        .then((res) => {
          dispatch(fetchUserData());
          setOpenAddExperience(false);
          toast.success("Experience updated successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .post(
          `https://dev.api.skilotech.com/api/candidate/addWorkExperience/${userDataGlobal?._id}`,
          obj
        )
        .then((res) => {
          dispatch(fetchUserData());
          setOpenAddExperience(false);
          toast.success("Experience Added successfully");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-full items-center">
            <p className=" text-[18px] font-semibold min-w-[220px]">
              Add Work Experience
            </p>
            <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
            <div onClick={() => setOpenAddExperience(false)}>
              <ClosedIcon />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <p className=" text-[14px] font-medium">
              Is this your current Job?{" "}
            </p>
            <div className="w-full flex gap-2 text-[14px] font-montserrat items-center font-medium">
              <input
                type="radio"
                name="currentlyWorking"
                value={true}
                checked={experienceData.currentlyWorking === true}
                onChange={handleInputChange}
              />
              <label>Yes</label>
              <input
                type="radio"
                name="currentlyWorking"
                value={false}
                checked={experienceData.currentlyWorking === false}
                onChange={handleInputChange}
              />
              <label>No</label>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-4 flex_column">
          <div className="flex flex-col gap-2 ">
            <div className=" text-[14px] font-montserrat  font-medium">
              Job Type <span className="text-red">*</span>
            </div>
            <div className=" ">
              <select
                className={`w-[150px]  text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px] ${
                  errorObj.jobType === true ? "border-red" : "border-[#9D9D9D]"
                }`}
                name="jobType"
                value={experienceData.jobType}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="partTime">Part Time</option>
                <option value="fullTime">Full Time</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2 ">
            <div className="w-full  text-[14px] font-montserrat  font-medium">
              Job Mode <span className="text-red">*</span>
            </div>
            <div className="">
              <select
                className={`w-[150px]  text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px] ${
                  errorObj.jobMode === true ? "border-red" : "border-[#9D9D9D]"
                }`}
                name="jobMode"
                value={experienceData.jobMode}
                onChange={handleInputChange}
              >
                <option value="" disabled>
                  Select
                </option>
                <option value="remoteWork">Remote</option>
                <option value="onSiteWork">Office</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className=" text-[14px] font-montserrat  font-medium">
            Designation <span className="text-red">*</span>
          </div>
          <div
            className={`border-[1px]  rounded-[8px] px-[16px] py-[8px] border-[#9D9D9D] ${
              errorObj.designation === true ? "border-red" : "border-[#9D9D9D]"
            }  `}
          >
            <input
              type="text"
              name="designation"
              placeholder="Enter your Designation"
              className="w-full text-[14px] font-montserrat font-small"
              value={experienceData.designation}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className=" text-[14px] font-montserrat  font-medium">
            Organisation <span className="text-red">*</span>
          </div>
          <div
            className={` border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px] ${
              errorObj.organisation === true ? "border-red" : "border-[#9D9D9D]"
            }  `}
          >
            <input
              type="text"
              name="organisation"
              placeholder="Enter your Organisation"
              className="w-full text-[14px] font-montserrat font-small"
              value={experienceData.organisation}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className=" text-[14px] font-montserrat  font-medium">
            Location <span className="text-red">*</span>
          </div>
          <div
            className={` border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px] ${
              errorObj.location === true ? "border-red" : "border-[#9D9D9D]"
            }  `}
          >
            <input
              type="text"
              name="location"
              placeholder="Enter your Location"
              className="w-full text-[14px] font-montserrat font-small"
              value={experienceData.location}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <DateSelector
            isRow={true}
            idPrefix="workExperience"
            data={experienceData}
            dataSeter={setExperienceData}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="text-[14px] font-montserrat  font-medium">
            Notice Period
          </div>
          <div className="">
            <select
              className="scr700:w-[46.51%] w-full  text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
              name="noticePeriod"
              value={experienceData.noticePeriod}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select
              </option>
              <option value="15 Days">15 Days</option>
              <option value="1 month">1 month</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className=" text-[14px] font-montserrat  font-medium">
            Skills Learned
          </div>
          <ReactSelect
            options={skill.map((item) => ({
              value: item,
              label: camelCase(item),
            }))}
            isMulti
            className="w-full text-[12px]"
            value={experienceData.skillsLearned}
            onChange={(selectedOptions) => {
              setExperienceData({
                ...experienceData,
                skillsLearned: selectedOptions,
              });
            }}
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <div className=" text-[14px] font-montserrat  font-medium">
            Work Description
          </div>
          <div className="border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
            <textarea
              type="text"
              name="workDescription"
              placeholder="Enter your work description here"
              className="w-full text-[14px] font-montserrat font-small"
              value={experienceData.workDescription}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="sm:px-9 px-4 py-[10px] bg-white-600 border border-[#06A9EF] text-[14px]  font-medium rounded-[30px]"
            onClick={() => setOpenAddExperience(false)}
          >
            Cancel
          </button>

          <button
            className="sm:px-9 px-4 py-[10px] bg-[#06A9EF] text-white text-[14px] font-medium rounded-[130px]"
            onClick={handleSaveChanges}
          >
            {isEditing ? "Save Changes" : "Add Experience"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddWorkExperience;
