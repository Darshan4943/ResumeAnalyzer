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
  const [errorMessage, setErrorMessage] = useState("");
  const [errorObj, setErrorObj] = useState({
    type: false,
    stream: false,
    education: false,
    university: false,
    institute: false,
    specialization: false,
    location: false,
    currentlyWorking: false,
    score: false,
    duration: { start: false, end: false },
  });

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
          duration: {
            start: { year: "Year", month: "Month" },
            end: { year: "Year", month: "Month" },
          },
        };
  });

  const handleInputChange = (event) => {
    if (!event || !event.target) return;

    const { name, value } = event.target;
    setEducationData((prevData) => ({
      ...prevData,
      [name]: name === "currentlyWorking" ? value === "true" : value.trim(),
    }));
    setErrorObj((prev) => {
      const updatedErrorObj = { ...prev };
      updatedErrorObj[name] = false;
      return updatedErrorObj;
    });
    validateField(name, value.trim());
  };

  const validateField = (fieldName, value) => {
    setErrorObj((prev) => {
      const updatedErrorObj = { ...prev };

      switch (fieldName) {
        case "type":
          updatedErrorObj.type = !value;
          break;
        case "score":
          updatedErrorObj.score = !value;
          break;
        case "stream":
          updatedErrorObj.stream = !value;
          break;
        case "education":
          updatedErrorObj.education = !value;
          break;
        case "university":
          updatedErrorObj.university = !value;
          break;
        case "institute":
          updatedErrorObj.institute = !value;
          break;
        default:
          break;
      }

      return updatedErrorObj;
    });
  };

  const validateForm = () => {
    let updatedErrorObj = { ...errorObj };

    Object.keys(educationData).forEach((key) => {
      if (!educationData[key] && typeof educationData[key] !== "object") {
        updatedErrorObj[key] = true;
      }
      if (typeof educationData[key] === "object") {
        Object.keys(educationData[key]).forEach((nestedKey) => {
          if (!educationData[key][nestedKey]) {
            updatedErrorObj[key][nestedKey] = true;
          }
        });
      }
    });

    setErrorObj(updatedErrorObj);

    if (Object.values(updatedErrorObj).some((val) => val === true)) {
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    const educationObj = {
      type: educationData.type,
      education: educationData.education,
      university: educationData.university,
      stream: educationData.stream,
      institute: educationData.institute,
      isPursuing: educationData.currentlyWorking,
      specialization: educationData.specialization,
      location: educationData.location,
      score: educationData.score,
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

    const apiUrl = editEducation
      ? `http://localhost:2000/api/candidate/${userDataGlobal?._id}/updateEducation/${Education._id}`
      : `http://localhost:2000/api/candidate/addEducation/${userDataGlobal?._id}`;

    const apiMethod = editEducation ? axios.put : axios.post;

    apiMethod(apiUrl, educationObj)
      .then(() => {
        dispatch(fetchUserData());
        setOpenAddEducation(false);
        toast.success(
          `Education ${editEducation ? "Updated" : "Added"} successfully`
        );
      })
      .catch((err) => {
        console.error("Error saving education:", err);
        toast.error("Failed to save education. Please try again.");
      });
  };

  return (
    <div
      className="bg-white rounded-[16px] py-3 "
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-4 rounded-[16px] max-h-[calc(100vh-140px)] py-3 px-6 overflow-y-auto ">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between w-full items-center ">
            <p className=" text-[18px] font-semibold min-w-[160px]">
              {" "}
              {editEducation ? "Edit Education" : "Add Education"}
            </p>
            <div className="bg-[#DEDEDE] h-[1px] w-full"></div>
            <div onClick={() => setOpenAddEducation(false)}>
              <ClosedIcon />
            </div>
          </div>
          <div className="flex flex-col gap-3 ">
            <p className="text-[14px] font-medium">
              What is your Education type?
            </p>
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
          <div className="text-[14px] font-montserrat font-medium">
            Education <span className="text-red">*</span>
          </div>
          <div
            className={`border-[1px] border-[#9D9D9D] rounded-[8px] px-[16px] py-[8px] ${
              errorObj.education === true ? "border-red" : "border-[#9D9D9D]"
            } `}
          >
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
              <option value="Masters / Post-Graduation">
                Masters / Post-Graduation
              </option>
              <option value="Bachelor’s / Under-Graduation">
                Bachelor’s / Under-Graduation
              </option>
              <option value="12th / Junior College">
                12th / Junior College
              </option>
              <option value="10th / School">10th / School</option>
            </select>
          </div>
        </div>

        {[
          {
            label: "University",
            name: "university",
            placeholder: "Enter your university",
          },
          {
            label: "Institute",
            name: "institute",
            placeholder: "Enter your institute",
          },
          { label: "Course", name: "stream", placeholder: "Enter your Course" },
          {
            label: "Specialization",
            name: "specialization",
            placeholder: "Enter your specialization",
          },
          {
            label: "Location",
            name: "location",
            placeholder: "Enter your location",
          },
        ].map(({ label, name, placeholder }) => (
          <div key={name} className="flex flex-col gap-2 ">
            <div className="text-[14px] font-montserrat font-medium">
              {label} <span className="text-red">*</span>
            </div>
            <div
              className={`border-[1px]  rounded-[8px] px-[16px] py-[8px]  ${
                errorObj[name] === true ? "border-red" : "border-[#9D9D9D]"
              } `}
            >
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
                className={`px-4 h-[32px] rounded-[30px] text-[12px] font-normal ${
                  educationData.gradingSystem === grading.toLowerCase()
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
              className={`px-4 py-[6px] border rounded-[8px] text-[12px] w-[120px]  ${
                errorObj.score === true ? "border-red" : "border-[#9D9D9D]"
              }`}
              placeholder="Enter Score"
              value={educationData.score}
              onChange={(e) => {
                const { value } = e.target;

                setEducationData((prevData) => ({
                  ...prevData,
                  score: value,
                }));
                validateField("score", value.trim());
              }}
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
