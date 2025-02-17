import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import DateSelector from "../../common/dateSelector";
import { ClosedIcon } from "../../../utils/svg";
import { toast } from "react-toastify";
import { fetchUserData } from "../../../Redux/slices/userSlice";

function AddEducation({
  setOpenAddEducation,

  setEducation,
  userData,
  editEducation,
  Education,
}) {
  const dispatch = useDispatch();
  const { userDataGlobal } = useSelector((state) => state.user.userData);

  // Initialize the state
  const [educationData, setEducationData] = useState(() => {
    return editEducation && Education
      ? {
        type: Education?.type || "",
        stream: Education?.stream || "",
        education: Education?.education || "",
        university: Education?.university || "",
        institute: Education?.institute || "",
        specialization: Education?.specialization || "",
        location: Education?.location || "",
        currentlyWorking: Education?.isPursuing || false,
        score: Education?.gradingSystem?.score || "",
        gradingSystem: Education?.gradingSystem?.type || "",
        duration: {
          start: {
            year: Education?.duration?.startDate?.year || "Year",
            month: Education?.duration?.startDate?.month || "Month",
          },
          end: {
            year: Education?.duration?.endDate?.year || "Year",
            month: Education?.duration?.endDate?.month || "Month",
          },
        },
      }
      : {
        type: "",
        stream: "",
        education: "",
        university: "",
        institute: "",
        specialization: "",
        location: "",
        currentlyWorking: false,
        score: "",
        gradingSystem: "",
        duration: {
          start: { year: "Year", month: "Month" },
          end: { year: "Year", month: "Month" },
        },
      };
  });



  // Handle input change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEducationData((prev) => ({
      ...prev,
      [name]: name === "currentlyWorking" ? value === "true" : value,
    }));
  };

  // Save changes
  const handleSaveChanges = (e) => {
    e.preventDefault();

    // Ensure `education` is an array
    const updatedEducation = Array.isArray(Education) ? [...Education] : [];
    updatedEducation.push(educationData);

    setEducation(updatedEducation);

    const obj = {
      type: educationData.type,
      education: educationData.education,
      university: educationData.university,
      stream: educationData.stream,
      institute: educationData.institute,
      isPursuing: educationData.currentlyWorking,
      specialization: educationData.specialization,
      location: educationData.location,
      score: educationData.score,
      gradingSystem: educationData.gradingSystem,
      duration: {
        startDate: {
          year: educationData.duration?.start.year,
          month: educationData.duration?.start.month,
        },
        endDate: {
          year: educationData.duration?.end.year,
          month: educationData.duration?.end.month,
        },
      },
    };

    if (editEducation) {
      axios
        .put(
          `https://dev.api.skilotech.com/api/candidate/${userDataGlobal?._id}/updateEducation/${Education._id}`,
          obj
        )
        .then((res) => {
          dispatch(fetchUserData());
          setOpenAddEducation(false);
          toast.success("Education Updated successfully");
        })
        .catch((err) => {
          console.error("Error saving education:", err);
          toast.error("Failed to add education. Please try again.");
        });
    }
    else {
      axios
        .post(
          `https://dev.api.skilotech.com/api/candidate/addEducation/${userDataGlobal?._id}`,
          obj
        )
        .then((res) => {
          dispatch(fetchUserData());
          setOpenAddEducation(false);
          toast.success("Education Added successfully");
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
          <div className="flex justify-between w-full items-center ">
            <p className=" text-[18px] font-semibold min-w-[160px]">  {editEducation ? "Edit Education" : "Add Education"}</p>
            <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
            <div onClick={() => setOpenAddEducation(false)}>
              <ClosedIcon />
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="text-[14px] font-medium">What is your Education type?</p>
            <div className="w-[70%] flex justify-between text-[14px] font-montserrat items-start font-medium  flex_column">
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="type"
                  value="fullTime"
                  checked={educationData.type === "fullTime"}
                  onChange={handleInputChange}
                />
                <label>Full Time</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="type"
                  value="partTime"
                  checked={educationData.type === "partTime"}
                  onChange={handleInputChange}
                />
                <label>Part Time</label>
              </div>
              <div className="flex gap-2">
                <input
                  type="radio"
                  name="type"
                  value="No"
                  checked={educationData.type === "No"}
                  onChange={handleInputChange}
                />
                <label>Correspondence/Distance learning</label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 ">
          <div className="text-[14px] font-montserrat font-medium">Education</div>
          <div className="border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
            <select
              name="education"
              className="w-full text-[12px] font-montserrat font-small"
              value={educationData.education}
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select your education level
              </option>
              <option value="PhD / Doctorate">PhD / Doctorate</option>
              <option value="Masters / Post-Graduation">Masters / Post-Graduation</option>
              <option value="Bachelor’s / Under-Graduation">
                Bachelor’s / Under-Graduation
              </option>
              <option value="12th / Junior College">12th / Junior College</option>
              <option value="10th / School">10th / School</option>
            </select>
          </div>
        </div>

        {[
          // { label: "Education", name: "education", placeholder: "Enter your education" },
          { label: "University", name: "university", placeholder: "Enter your university" },
          { label: "Institute", name: "institute", placeholder: "Enter your institute" },
          { label: "Course", name: "stream", placeholder: "Enter your Course" },
          { label: "Specialization", name: "specialization", placeholder: "Enter your specialization" },
          { label: "Location", name: "location", placeholder: "Enter your location" },
        ].map(({ label, name, placeholder }) => (
          <div key={name} className="flex flex-col gap-2 ">
            <div className="text-[14px] font-montserrat font-medium">{label}</div>
            <div className="border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px]">
              <input
                type="text"
                name={name}
                placeholder={placeholder}
                className="w-full text-[12px] font-montserrat font-small"
                value={educationData[name]}
                onChange={handleInputChange}
              />
            </div>
          </div>
        ))}

        <div className="flex flex-col gap-3">
          <p className="text-[14px] font-medium">Are you currently pursuing?</p>
          <div className="w-full flex gap-4 text-[14px] font-montserrat items-center font-medium">
            <div className="flex gap-2">
              <input
                type="radio"
                name="currentlyWorking"
                value={true}
                checked={educationData.currentlyWorking === true}
                onChange={handleInputChange}
              />
              <label>Yes</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="currentlyWorking"
                value={false}
                checked={educationData.currentlyWorking === false}
                onChange={handleInputChange}
              />
              <label>No</label>
            </div>
          </div>
        </div>

        <div className="w-full">
          <DateSelector
            isRow={true}
            idPrefix="addEducation"
            data={educationData}
            dataSeter={setEducationData}
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <p className="text-[14px] font-medium">Grading System</p>
          <div className="flex flex-wrap gap-4 items-center">
            {["Percentage", "CGPA", "GPA", "Grade"].map((grading) => (
              <button
                key={grading}
                style={{ boxShadow: "0px 1px 3px 1px #00000026" }}
                className={`px-4 h-[32px] rounded-[30px] text-[12px] font-normal ${educationData.gradingSystem === grading.toLowerCase()
                  ? "bg-blue text-white"
                  : "bg-white"
                  }`}
                onClick={() =>
                  setEducationData((prev) => ({
                    ...prev,
                    gradingSystem: grading.toLowerCase(),
                  }))
                }
              >
                {grading}
              </button>
            ))}
            <input
              type="text"
              className="px-4 py-[6px] border rounded-[8px] border-[#DEDEDE] text-[12px] w-[120px]"
              placeholder="Enter Score"
              value={educationData.score}
              onChange={(e) =>
                setEducationData((prev) => ({
                  ...prev,
                  score: e.target.value,
                }))
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="sm:px-9 py-2 px-4 text-[14px] bg-white-600 border border-[#06A9EF] font md:font-medium rounded-[30px]"
            id="button"
            onClick={() => setOpenAddEducation(false)}
          >
            Cancel
          </button>

          <button
            className={`sm:px-9 py-2 px-4 text-[14px] bg-[#06A9EF] border rounded-[30px] font-semibold text-white `}
            onClick={(e) => handleSaveChanges(e)}
          >
            {editEducation ? "Save Changes" : "Add Education"}

          </button>
        </div>
      </div>
    </div>
  );
}

export default AddEducation;
