import React, { useState } from "react";
import { toast } from "react-toastify";

const EducationDetails = ({ data, setData, setTabIndex, tabindex }) => {

  const [formError, setFormError] = useState({})

  // const validateForm = () => {
  //   const errors = {};
  //   if (!data.stream.trim()) {
  //     errors.stream = "Degree is required";
  //   }
  //   else if (!isNaN(data.stream)) {
  //     errors.stream = "Degree cannot be a number"
  //   }
  //   if (!data.university.trim()) {
  //     errors.university = "University Name is required";
  //   }
  //   else if (!isNaN(data.university)) {
  //     errors.university = "University Name cannot be a number"
  //   }
  //   if (!data.institute.trim()) {
  //     errors.institute = "Collage Name is required";
  //   }
  //   else if (!isNaN(data.institute)) {
  //     errors.institute = "Collage Name cannot be a number"
  //   }
  //   if (!data.dateOfComplition.trim()) {
  //     errors.dateOfComplition = "Date Of Complition is required";
  //   }
  //   setFormError(errors)
  //   return errors;
  // };


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
      case "institute":
        if (!value.trim()) {
          errors.institute = "Collage Name is required";
        } else {
          delete errors.institute;
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
  
  
    const requiredFields = ["stream", "university", "institute", "dateOfComplition"];
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
        <div className="show-content  ">
          <div className="personal_details " style={{ paddingBottom: "96px" }}>
            <div className="personal_details_form education_page">
            <div className="register_back_block">
                <img
                  className="mail_img"
                  src="/images/auth/candidate/Group_1.png"
                  alt=""
                  style={{
                    right: "-14rem",
                    top: "2rem",
                    width: "26%",
                    animationDelay: 0.2,
                  }}
                />

                <img
                  className="group_2"
                  src="/images/auth/candidate/Group_2.png"
                  alt=""
                />

                <img
                  className="phone_img "
                  src="/images/auth/candidate/Group_3.png"
                  alt=""
                  style={{ width: "26%", top: "37rem", right: "-19rem" }}
                />

                <img
                  className="location_img"
                  src="/images/auth/candidate/Group_4.png"
                  alt=""
                  style={{ top: "8rem", left: "-7.2rem", width: "17%" }}
                />

                <img
                  className="data_img"
                  src="/images/auth/candidate/Group_5.png"
                  alt=""
                  style={{ left: "-16rem", top: "22rem", width: "22%" }}
                />

                <img
                  className="group_6"
                  src="/images/auth/candidate/Group_6.png"
                  style={{ position: "absolute" }}
                  alt=""
                />
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">Highest Education</p>
                  <div className="education_button education_page">
                    <button
                      className={`gen_button ${data.education == "10th or below" && "gen_button_active"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setData({ ...data, education: "10th or below" });
                      }}
                    >
                      10th or below
                    </button>
                    <button
                      className={`gen_button ${data.education == "12 pass" && "gen_button_active"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setData({ ...data, education: "12 pass" });
                      }}
                    >
                      12 pass
                    </button>
                    <button
                      className={`gen_button ${data.education == "Diploma" && "gen_button_active"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setData({ ...data, education: "Diploma" });
                      }}
                    >
                      Diploma
                    </button>
                    <button
                      className={`gen_button ${data.education == "Graduate" && "gen_button_active"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setData({ ...data, education: "Graduate" });
                      }}
                    >
                      Graduate
                    </button>
                    <button
                      className={`gen_button ${data.education == "Post Graduate" && "gen_button_active"
                        }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setData({ ...data, education: "Post Graduate" });
                      }}
                    >
                      Post Graduate
                    </button>
                  </div>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Select Degree <span className="star">*</span>
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

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    University Name <span className="star">*</span>
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

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Collage Name <span className="star">*</span>
                  </p>
                  <input
                    type="text"
                    name=""
                    id="single_input"
                    placeholder="Enter Collage Name"
                    value={data.institute}
                    onChange={(e) => handleInputChange("institute", e.target.value)}
                  />
                  {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.institute}</p>}
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
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
