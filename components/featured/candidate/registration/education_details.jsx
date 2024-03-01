import React, { useState } from "react";
import { toast } from "react-toastify";

const EducationDetails = ({ data, setData, setTabIndex, tabindex }) => {

  const [formError, setFormError] = useState({})




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
      case "dateOfComplition":
        if (!value.trim()) {
          errors.dateOfComplition = "Date Of Complition is required";
        } else {
          delete errors.dateOfComplition;
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
  
  
    const requiredFields = ["stream", "university", "specialization", "dateOfComplition"];
    const emptyFields = requiredFields.filter(field => !data[field]);
  
    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return; 
    }
  
    const hasErrors = Object.keys(errors).length > 0;
  
    if (hasErrors) {
      toast.error("Please enter valid information");
      setFormError(errors);
    } else {
      setTabIndex(4);
      window.scroll(0, 0);
    }
  };

  return (
    <>
      {tabindex == 3 && (
        <div className="show-content">
          <div className="personal_details  p-4  pb-[96px]" >
            <div className="personal_details_form education_page ">
           

              <div className="flex gap-6 w-[100%]">
              <div className="personal_single_input w-[100%]">
                <div className="personal_name w-[100%]">
                  <p className="form_text_heading">
                    Education <span className="star">*</span>
                  </p>
                  <input
                    type="text"
                    name=""
                    id="single_input"
                    placeholder="Select Degree"
                    value={data.stream}
                    onChange={(e) => handleInputChange("stream", e.target.value)}
                  />
                  {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.stream}</p>}
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
                    id="single_input"
                    placeholder="Enter Specialization"
                    value={data.specialization}
                    onChange={(e) => handleInputChange("specialization", e.target.value)}
                  />
                  {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.specialization}</p>}
                </div>
              </div>
              </div>
              
              <div className="flex gap-6 w-[100%]">
              <div className="personal_single_input  w-[100%]">
                <div className="personal_name w-[100%]">
                  <p className="form_text_heading">
                  University / Institute Name  <span className="star">*</span>
                  </p>
                  <input
                    type="text"
                    name=""
                    id="single_input"
                    placeholder="Enter University Name"
                    value={data.university}
                    onChange={(e) => handleInputChange("university", e.target.value)}
                  />
                  {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.university}</p>}
                </div>
              </div>

              <div className="personal_single_input w-[100%]">
                <div className="personal_name w-[100%]">
                  <p className="form_text_heading">
                    Date Of Completion <span className="star">*</span>
                  </p>
                  <input
                    type="date"
                    name=""
                    id="single_input"
                    placeholder="Enter Contact Number"
                    value={data.dateOfComplition}
                    onChange={(e) => handleInputChange("dateOfComplition", e.target.value)}
                  />
                  {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.dateOfComplition}</p>}
                </div>
              </div>
              </div>
              <div className="bottom_buttons">
                <button
                  className="buttons"
                  id="border_button"
                  onClick={() => {
                    setTabIndex(2);
                    window.scroll(0, 0);
                  }}
                >
                  Go Back
                </button>
                <button
                  className="buttons"
                  id="border_button"
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
