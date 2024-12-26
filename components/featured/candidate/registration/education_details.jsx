import React, { useState } from "react";
import { toast } from "react-toastify";
import DateSelector from "../../../common/dateSelector";

const EducationDetails = ({ data, setData, setTabIndex, tabindex }) => {
  const [formError, setFormError] = useState({});
  const [duration, setDuration] = useState({});
  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "stream":
        if (!value.trim()) {
          errors.stream = "Degree is required";
        } else {
          delete errors.stream;
        }
        break;
      case "university":
        if (!value.trim()) {
          errors.university = "University Name is required";
        } else {
          delete errors.university;
        }
        break;
      case "specialization":
        if (!value.trim()) {
          errors.specialization = "specialization is required";
        } else {
          delete errors.specialization;
        }
        break;

      default:
        break;
    }

    setFormError(errors);
    return errors;
  };

  const handleInputChange = (fieldName, value) => {
    setData({ ...data, [fieldName]: value });
    validateInput(fieldName, value);
  };
  const submitHandler = (e) => {
    e.preventDefault();

    const errors = validateInput();

    const requiredFields = ["stream", "university", "specialization"];
    const emptyFields = requiredFields.filter((field) => !data[field]);
    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (duration?.duration) {
      // if (Object.keys(duration.duration).length < 2) {
      //   toast.error("Please fill duration");
      //   return;
      // } 
      // else {
        if (Object.keys(duration.duration.start).length < 2) {
          toast.error("Please fill start duration");
          return;
        } 
        // else if (
        //   duration.duration.end &&
        //   Object.keys(duration.duration.end).length < 2
        // ) {
        //   toast.error("Please fill end duration");
        //   return;
        // }
      // }
    } else {
      toast.error("Please fill duration");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;
    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    } else {
      setTabIndex(4);
      setData({ ...data, educationDuration: duration.duration });
      window.scroll(0, 0);
    }
  };

  return (
    <>
      {tabindex == 3 && (
        <div className="show-content">
          <div className="personal_details  sm:p-4 p-2  pb-[96px] ">
            <div className="personal_details_form education_page scr1250:w-[60%] sm:w-[80%] w-[100%] ">
              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      Education <span className="star">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                       className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                      placeholder="Select Degree"
                      value={data.stream}
                      onChange={(e) =>
                        handleInputChange("stream", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.stream}
                      </p>
                    )}
                  </div>
                </div>

                <div className="personal_single_input w-[100%]">
                  <div className="personal_name  w-[100%]">
                    <p className="form_text_heading">
                      Specialization <span className="star">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                     className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                      placeholder="Enter Specialization"
                      value={data.specialization}
                      onChange={(e) =>
                        handleInputChange("specialization", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.specialization}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                <div className="personal_single_input  w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      University / Institute Name{" "}
                      <span className="star">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                       className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                      placeholder="Enter University Name"
                      value={data.university}
                      onChange={(e) =>
                        handleInputChange("university", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.university}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="personal_single_input w-[100%]">
                <div className="personal_name w-[100%] flex flex-col gap-2">
                  <p className="form_text_heading">
                    Duration <span className="star">*</span>
                  </p>
                  {/* <input
                      type="date"
                      name=""
                      id="single_input"
                      placeholder="Enter Contact Number"
                      value={data.dateOfComplition}
                      onChange={(e) => handleInputChange("dateOfComplition", e.target.value)}
                    />
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.dateOfComplition}</p>} */}
                  <DateSelector
                    idPrefix="education"
                    data={duration}
                    dataSeter={setDuration}
                    isRow={true}
                  />
                </div>
              </div>
              <div className="w-full flex justify-between pt-4">
                <button
                    className="text-[14px] font-semibold border rounded-[30px] px-9 py-[11.25px] border-blue"
                  onClick={() => {
                    setTabIndex(2);
                    window.scroll(0, 0);
                  }}
                >
                  Back
                </button>
                <button
                   className=" font-[600] bg-[#06A9EF] text-white px-9 py-[11.25px] rounded-[30px] text-[14px] leading-tight"
                  onClick={submitHandler}
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EducationDetails;
