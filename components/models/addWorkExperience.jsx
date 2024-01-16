import { ClosedIcon } from "@/utils/svg";
import React, { useState } from "react";
import DateSelector from "../common/dateSelector";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { reCallUserData } from "@/Redux/actions/user";
import { toast } from "react-toastify";
import { SkillList } from "@/utils/data";
import ReactSelect from "react-select";
import { camelCase } from "@/utils/middleware";

function AddWorkExperience({
  setOpenAddExperience,
  userData,
  editExperience,
  Experience
}) {
 
 console.log(Experience)
  const userDataGlobal = useSelector((state) => state.userData);
  const [experiences, setExperiences] = useState([]);

  const [experienceData, setExperienceData] = useState({
    isCurrentJob: "",
    jobType: "",
    jobMode: "",
    designation: "",
    organisation: "",
    location: "",
    noticePeriod: "",
    skillsLearned: [],
    workDescription: "",
    duration: {
      start: { year: "Year", month: "Month" },
      end: { year: "Year", month: "Month" },
    },
      
      ...(editExperience && { 
        isCurrentJob: Experience?.isCurrent,
        jobType: Experience?.jobType,
        jobMode: Experience?.jobMode,
      
        organisation: Experience?.companyName,
        location: Experience?.jobLocation,
        noticePeriod: Experience?.noticePeriod,
       
        workDescription: Experience?.workDescription,
        duration: {
          start: { year: Experience?.duration?.startDate?.year, month:  Experience?.duration?.startDate?.month },
          end: { year: Experience?.duration?.endDate?.year, month: Experience?.duration?.endDate?.month },
    
      }
    }) 
    
  });


  const dispatch = useDispatch();
  const [skill, setSkills] = useState([...SkillList]);
  const handleInputChange = (event) => {
    if (event && event.target) {
      const { name, value } = event.target;
      setExperienceData({
        ...experienceData,
        [name]: value,
      });
    }
  };
const isEditing =!!editExperience
console.log(isEditing)

  const handleSaveChanges = (e) => {
    e.preventDefault();
    const updatedExperiences = [...experiences, experienceData];
    setExperiences(updatedExperiences);
    console.log("hello", experienceData);

    const obj = {
      isCurrent: experienceData.isCurrentJob === "True" ? true : false,
      jobType: experienceData.jobType,
      jobMode: experienceData.jobMode,

      companyName: experienceData.organisation,
      jobTitle: experienceData.designation,
      jobLocation: experienceData.location,
      skills: experienceData.skillsLearned,
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

    // if (userData) {
    //   axios
    //     .post(
    //       `https://freedygoservices.in/api/candidate/addWorkExperience/${userData._id}`,
    //       obj
    //     )
    //     .then((res) => {
    //       dispatch(reCallUserData());
    //       console.log(444, res.data);
    //       setOpenAddExperience(false);
    //       toast.success("Experience Added successfully");
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }


    if (isEditing) {
      axios
        .put(
          `https://freedygoservices.in/api/candidate/${userDataGlobal._id}/updateWorkExperience/${Experience._id}`,
          obj
        )
        .then((res) => {
          console.log(444, res.data);
        dispatch(reCallUserData());
        setOpenAddExperience(false);
        toast.success("Experience updated successfully");
        })
        .catch((err) => {

          console.error(err);
        });
    } else {
    
        axios
          .post(
            `https://freedygoservices.in/api/candidate/addWorkExperience/${userDataGlobal._id}`,
            obj
          )
          .then((res) => {
            dispatch(reCallUserData());
            console.log(444, res.data);
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
      className="flex flex-col gap-4 p-6 bg-white rounded-[16px]"
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex justify-between w-full items-center">
        <p className="ml:text-[24px] text-[18px] font-medium">Add Work Experience</p>
        <div className="bg-[#DEDEDE] h-[1px] w-[54.54%]"></div>
        <div onClick={() => setOpenAddExperience(false)}>
          <ClosedIcon />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="md:text-[16px] text-[14px] font-medium">Is this your current Job? </p>
        <div className="w-full flex gap-2 text-[14px] font-montserrat items-center font-medium">
          <input
            type="radio"
            name="isCurrentJob"
            value={true}
            onChange={handleInputChange}
          />
          <label>Yes</label>
          <input
            type="radio"
            name="isCurrentJob"
            value={false}
            onChange={handleInputChange}
          />
          <label>No</label>
        </div>
      </div>
      <div className="flex w-full gap-4 flex_column">
        <div className="flex flex-col gap-2 ">
          <div className="md:text-[16px] text-[14px] font-montserrat  font-medium">
            Job Type
          </div>
          <div className=" ">
            <select
              className="w-[150px] md:text-[16px] text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
              name="jobType"
              onChange={handleInputChange}
            >
              <option value="" disabled selected className="">
                Select
              </option>
              <option value="partTime">Part Time</option>
              <option value="fullTime">Full Time</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-2 ">
          <div className="w-full md:text-[16px] text-[14px] font-montserrat  font-medium">
            Job Mode
          </div>
          <div className="">
            <select
              className="w-[150px]  border-[1px] md:text-[16px] text-[14px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
              name="jobMode"
              onChange={handleInputChange}
            >
              <option value="" disabled selected className="">
                Select
              </option>
              <option value="remoteWork">Remote</option>
              <option value="onSiteWork">Office</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="md:text-[16px] text-[14px] font-montserrat  font-medium">
          Designation
        </div>
        <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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
        <div className="md:text-[16px] text-[14px] font-montserrat  font-medium">
          Organisation
        </div>
        <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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
        <div className="md:text-[16px] text-[14px] font-montserrat  font-medium">Location</div>
        <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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
        {" "}
        <DateSelector
          idPrefix="workExperience"
          data={experienceData}
          dataSeter={setExperienceData}
        />
      </div>

      <div className="flex flex-col gap-2 ">
        <div className="text-[16px] font-montserrat  font-medium">
          Notice Period
        </div>
        <div className="">
          <select
            className="w-[46.51%] md:text-[16px] text-[14px] border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]"
            name="noticePeriod"
            onChange={handleInputChange}
          >
            <option value="" disabled selected className="">
              Select
            </option>
            <option value="15 Days">15 Days</option>
            <option value="1 month">1 month</option>
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="md:text-[16px] text-[14px] font-montserrat  font-medium">
          Skills Learned
        </div>

        {/* <input
                        type='text'
                        name='skillsLearned'
                        placeholder='Enter your learned skills here'
                        className='w-full text-[14px] font-montserrat font-small'
                        value={experienceData.skillsLearned}
                        onChange={handleInputChange}
                    /> */}
        <ReactSelect
          options={skill.map((item) => ({
            value: item,

            label: camelCase(item),
          }))}
          isMulti
          className="w-full"
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col gap-2 ">
        <div className="md:text-[16px] text-[14px] font-montserrat  font-medium">
          Work Description
        </div>
        <div className=" border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
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

      <div class="flex justify-end gap-3">
        <button
          className="px-4 py-2 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]"
          id="button"
          onClick={() => {
           
            setOpenAddExperience(false);
          }}
        >
          Cancel
        </button>

        <button
          className={`px-4 py-2 bg-[#06A9EF] border rounded-[12px] font-semibold text-white`}
          onClick={(e) => handleSaveChanges(e)}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AddWorkExperience;
