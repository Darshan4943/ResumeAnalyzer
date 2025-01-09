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
  Experience
}) {
 

  const { userDataGlobal, profileData } = useSelector(
    (state) => state.user.userData
  );
  const [experiences, setExperiences] = useState([]);

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
        value: skill.value || skill.label, // Use either `value` or `label`
        label: skill.label || skill.value, // Ensure a proper label
      }))
    : [],
    workDescription: editExperience ? Experience?.workDescription || "" : "",
    duration: {
      start: {
        year: editExperience ? Experience?.jobDuration?.startDate?.year || "Year" : "Year",
        month: editExperience ? Experience?.jobDuration?.startDate?.month || "Month" : "Month",
      },
      end: {
        year: editExperience ? Experience?.jobDuration?.endDate?.year || "Year" : "Year",
        month: editExperience ? Experience?.jobDuration?.endDate?.month || "Month" : "Month",
      },
    },
  }));
  console.log(888, experienceData);

  const dispatch = useDispatch();
  const [skill, setSkills] = useState([...SkillList]);

  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setExperienceData({
        ...experienceData,
        [name]: name === "currentlyWorking" ? value === "true" : value,
      });
    }
  };
  const isEditing = !!editExperience;


  const handleSaveChanges = (e) => {
    e.preventDefault();
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
          `http://localhost:2000/api/candidate/${userDataGlobal?._id}/updateWorkExperience/${Experience._id}`,
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
          `http://localhost:2000/api/candidate/addWorkExperience/${userDataGlobal?._id}`,
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
    <div className="bg-white rounded-[16px] py-3 "
    style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}>
      <div
        className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto "
    
      >
      <div className="flex flex-col gap-1">
      <div className="flex justify-between w-full items-center">
        <p className=" text-[18px] font-semibold min-w-[220px]">Add Work Experience</p>
        <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
        <div onClick={() => setOpenAddExperience(false)}>
          <ClosedIcon />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className=" text-[14px] font-medium">Is this your current Job? </p>
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
            Job Type
          </div>
          <div className=" ">
            <select
              className="w-[150px]  text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
              name="jobType"
              value={experienceData.jobType} // Prefill jobType
              onChange={handleInputChange}
            >
              <option value="" disabled>Select</option>
              <option value="partTime">Part Time</option>
              <option value="fullTime">Full Time</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="w-full  text-[14px] font-montserrat  font-medium">
            Job Mode
          </div>
          <div className="">
            <select
              className="w-[150px]  border-[1px]  text-[14px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
              name="jobMode"
              value={experienceData.jobMode} // Prefill jobMode
              onChange={handleInputChange}
            >
              <option value="" disabled>Select</option>
              <option value="remoteWork">Remote</option>
              <option value="onSiteWork">Office</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 ">
        <div className=" text-[14px] font-montserrat  font-medium">
          Designation
        </div>
        <div className="border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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
          Organisation
        </div>
        <div className="border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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
        <div className=" text-[14px] font-montserrat  font-medium">Location</div>
        <div className="border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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

      <div className="w-full">
        <DateSelector
        isRow={true}
          idPrefix="workExperience"
          data={experienceData}
          dataSeter={setExperienceData}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="text-[14px] font-montserrat  font-medium">Notice Period</div>
        <div className="">
          <select
            className="scr700:w-[46.51%] w-full  text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
            name="noticePeriod"
            value={experienceData.noticePeriod} // Prefill noticePeriod
            onChange={handleInputChange}
          >
            <option value="" disabled>Select</option>
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
          value={experienceData.skillsLearned} // Prefill skills
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
