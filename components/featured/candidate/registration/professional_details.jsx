
import React, { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import ImageContainer from "../../../common/image";
import { noticePeriods } from "../../../../utils/data";

const ProfessionalDetails = ({

  data,
  setData,
  setTabIndex,
  tabindex,
  skills,
  register_cadidate,
  certificate,
  setCertificate,
}) => {
  console.log(data)
  const [formError, setFormError] = useState({});

  

  const validateInput = (fieldName, value) => {
    const errors = { ...formError };

    switch (fieldName) {
      case "workExperiance":
        if (!value.workExperiance?.years) {
          errors.workExperiance = "Work Experience is required";
        } else {
          delete workExperiance.stream;
        }
        break;
      case "companyName":
        if (!value.trim()) {
          errors.companyName = "Company Name Name is required";
        } else {
          delete errors.companyName;
        }
        break;
      case "jobTitle":
        if (!value.trim()) {
          errors.jobTitle = "Job Title is required";
        } else {
          delete errors.jobTitle;
        }
        break;
      case "jobLocation":
        if (!value.trim()) {
          errors.jobLocation = "Job location is required";
        } else {
          delete errors.jobLocation;
        }
        break;
      // case "keySkills":
      //   if (!value.keySkills?.length > 0) {
      //     errors.keySkills = "Key Skill is required";
      //   } else {
      //     delete errors.keySkills;
      //   }
      //   break;
      case "dateOfJoining":
        if (!value.trim()) {
          errors.dateOfJoining = "Date of Joining is required";
        } else {
          delete errors.dateOfJoining;
        }
        break;
      case "noticePeriod":
        if (!value.trim()) {
          errors.noticePeriod = "Notice Period is required";
        } else {
          delete errors.noticePeriod;
        }
        break;
      case "currentCTC":
        if (!value.trim()) {
          errors.currentCTC = "Current CTC is required";
        } else {
          delete errors.currentCTC;
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
    console.log(errors)
    const requiredFields = ["workExperiance", "noticePeriod"];
    const emptyFields = requiredFields.filter(field => !data[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      return;
    }

    const hasErrors = Object.keys(errors).length > 0;
    if (data.workStatus == "fresher") {
      register_cadidate();
    }
    else {
      if (hasErrors) {
        toast.error("Please enter valid information");
        setFormError(errors);
      } else {
        register_cadidate();

      }
    }
  };


  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   const errors = validateForm();
  //   if (data.workStatus == "fresher") {
  //     register_cadidate();
  //   } else {
  //     if (Object.keys(errors).length === 0) {
  //       register_cadidate();
  //     } else {
  //       console.log(Object.keys(errors));
  //       toast.error("Please enter all required fields");
  //     }
  //   }
  // };
  return (
    <>
      {tabindex == 4 && (
        <div className="personal_details_all">
          <div className="personal_details p-4 pb-[96px]" >
            <div className="personal_details_form education_page">


              <div className="flex gap-6 w-[100%]">
                <div className="personal_single_input">
                  <div className="personal_name gap-2">
                    <p className="form_text_heading">
                      Employment Status <span className="star">*</span>
                    </p>
                    <div className="gender_button">
                      <button
                        className={`gen_button ${data.employmentStatus == "employed" &&
                          "gen_button_active"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setData({ ...data, employmentStatus: "employed" });
                        }}
                      >
                        Employed
                      </button>
                      <button
                        className={`gen_button ${data.employmentStatus == "unemployed" &&
                          "gen_button_active"
                          }`}
                        onClick={(e) => {
                          e.preventDefault();
                          setData({ ...data, employmentStatus: "unemployed" });
                        }}
                      >
                        Unemployed
                      </button>

                    </div>


                  </div>
                </div>


                <div className="personal_single_input w-[50%]">
                  <div className="personal_name" style={{ gap: "10px" }}>
                    <p className="form_text_heading">
                      Work Experience <span className="star">*</span>
                    </p>
                    <div className="flex flex-row gap-[24px]">
                      <div>

                        <input
                          type="text"
                          placeholder="Years"
                          id="single_input"
                          style={{ width: "100px" }}
                          value={data?.workExperiance?.years}
                          onChange={(e) => {
                            setData({
                              ...data,
                              workExperiance: {
                                ...data.workExperiance,
                                years: e.target.value,
                              },
                            });
                          }}
                        />
                        {formError && (
                          <p className="text-[12px] text-[red] font-[500]">
                            {formError?.workExperiance}
                          </p>
                        )}
                      </div>
                      <div>

                        <input
                          type="text"
                          placeholder="Months"
                          id="single_input"
                          style={{ width: "100px" }}
                          value={data?.workExperiance?.months}
                          onChange={(e) => {
                            setData({
                              ...data,
                              workExperiance: {
                                ...data.workExperiance,
                                months: e.target.value,
                              },
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-6 w-[100%]">
                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      Company Name <span className="star">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                      id="single_input"
                      placeholder="Enter Company Name"
                      value={data.companyName}
                      onChange={(e) => handleInputChange("companyName", e.target.value)}
                    />
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.companyName}</p>}
                  </div>
                </div>

                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      {data.workStatus == "fresher" ? (
                        <>
                          Role<span className="star">*</span>
                        </>
                      ) : (
                        <>
                          Job tittle <span className="star">*</span>
                        </>
                      )}
                    </p>
                    <input
                      type="text"
                      name=""
                      id="single_input"
                      placeholder={
                        data.workStatus == "fresher"
                          ? "Enter Role"
                          : "Enter job tittle"
                      }
                      value={data.jobTitle}
                      onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                    />
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.jobTitle}</p>}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 w-[100%]">
                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      Job location <span className="star">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                      id="single_input"
                      placeholder="Enter job location"
                      value={data.jobLocation}
                      onChange={(e) => handleInputChange("jobLocation", e.target.value)}
                    />
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.jobLocation}</p>}
                  </div>
                </div>

                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      Date Of joining <span className="star">*</span>
                    </p>
                    <input
                      type="date"
                      name=""
                      id="single_input"
                      placeholder="Enter date of joining"
                      value={data.dateOfJoining}
                      onChange={(e) => handleInputChange("dateOfJoining", e.target.value)}
                    />
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.dateOfJoining}</p>}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 w-[100%]">
                <div className="personal_single_input w-[100%]">
                  <p className="form_text_heading w-[100%]">
                    Key skills <span className="star">*</span>
                  </p>
                  <ReactSelect
                    options={skills}
                    isMulti
                    className="w-full"
                    onChange={(data) => handleInputChange("keySkills", data)}
                    // onChange={(data) => {
                    //   setData({ ...data, keySkills: data });
                    // }}
                    value={data.keySkills}
                  />
                  {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.keySkills}</p>}
                </div>



                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      Current CTC <span className="star">*</span>
                    </p>
                    <input
                      type="text"
                      name=""
                      id="single_input"
                      placeholder="Yearly LPA"
                      value={data.currentCTC}
                      onChange={(e) => handleInputChange("currentCTC", e.target.value)}
                    />
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.currentCTC}</p>}

                  </div>
                </div>


              </div>

              <div className="personal_single_input w-[100%] ">
                <div className="personal_name w-[100%]">
                  <p className="form_text_heading">
                    Notice Period <span className="star">*</span>
                  </p>
                  <form className="notice_period ">
                    {noticePeriods.map((item, index) => (
                      <div className="radio" key={index}>
                        <input
                          type="radio"
                          value={item.value}
                          checked={data.noticePeriod == item.value}
                          onChange={(e) => handleInputChange("noticePeriod", e.target.value)}
                        />
                        {item.title}
                      </div>
                    ))}
                    {formError && <p className="text-[12px] text-[red] font-[500]">{formError?.noticePeriod}</p>}

                  </form>
                </div>
              </div>

              <div className="personal_single_input w-[100%]">
                <div className="personal_name w-[100%] gap-4">
                  <p className="form_text_heading">
                    Internship Details (Optional) 
                  </p>
                  <div className="flex gap-6 w-[100%]">
                    <div className="personal_single_input w-[100%]">
                      <div className="personal_name w-[100%]">
                        <p className="form_text_heading">
                          Company Name 
                        </p>
                        <input
                          type="text"
                          name=""
                          id="single_input"
                          placeholder="Enter Company Name"
                        
                          
                        />
                    
                      </div>
                    </div>

                    <div className="personal_single_input w-[100%]">
                      <div className="personal_name w-[100%]">
                        <p className="form_text_heading">
                          location 
                        </p>
                        <input
                          type="text"
                          name=""
                          id="single_input"
                          placeholder="Enter job location"
                         
                        />
                     
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="bottom_buttons">
                <button
                  className="buttons"
                  id="border_button"
                  onClick={() => {
                    setTabIndex(3);

                    window.scroll(0, 0);
                  }}
                >
                  Go Back
                </button>
                <button
                  className="buttons"
                  id="border_button"
                  onClick={submitHandler}
                // router.push("/candidate/afterLogin/home/candidateHome");
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

export default ProfessionalDetails;
