import React, { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import ImageContainer from "../../../common/image";
import { noticePeriods } from "../../../../utils/data";
import { useRouter } from "next/router";
import MiniLoader from "../../../common/mini-loader";
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
  const [loading, setLoading] = useState(false);

  const [formError, setFormError] = useState({});

  const router = useRouter();
  const handleClick = () => {
    setLoading(true);
    router.push({
      pathname: "/home/createResume",
      query: { ...data, keySkills: JSON.stringify(data.keySkills) },
    });
  };
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
      case "noticePeriod":
        if (!value.trim()) {
          errors.noticePeriod = "Notice Period is required";
        } else {
          delete errors.noticePeriod;
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

  return (
    <>
      {tabindex == 4 && (
        <div className="personal_details_all">
          <div className="personal_details ml:p-4 p-2 pb-[96px]">
            <div className="personal_details_form education_page scr1250:w-[60%] sm:w-[80%] w-[100%]">
              {/* {
                  data.workStatus == 'Fresher'  && <div className="form_text_heading">Internship Details (Optional)</div>
              } */}
              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                <div className="personal_single_input">
                  <div className="personal_name gap-2 w-[100%]">
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
                  <div
                    className="personal_name w-[100%]"
                    style={{ gap: "10px" }}
                  >
                    <p className="form_text_heading">
                      Work Experience <span className="star">*</span>
                    </p>
                    <div className="flex flex-row gap-[24px] w-[100%] ">
                      <div className="w-[100%]">
                        <input
                          type="text"
                          placeholder="Years"
                          id="single_input"
                          style={{ width: "100%", minWidth: "125px" }}
                          value={data?.workExperiance?.years}
                          onChange={(e) => {
                            setData({
                              ...data,
                              workExperiance: {
                                ...data.workExperiance,
                                years: e.target.value.replace(/\D/g, ""),
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
                      <div className="w-[100%]">
                        <select
                          id="single_inputt"
                          style={{ width: "100%", minWidth: "125px" }}
                          className=" text-xs placeholder-[#646464] px-2"
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
                        >
                          <option className="text-[15px]" value="">
                            Select Month
                          </option>
                          {[...Array(12)].map((_, index) => (
                            <option className="text-[16px]" key={index + 1} value={(index + 1).toString()}>
                              {index + 1}
                            </option>
                          ))}
                        </select>



                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
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
                      onChange={(e) =>
                        handleInputChange("companyName", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.companyName}
                      </p>
                    )}
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
                      onChange={(e) =>
                        handleInputChange("jobTitle", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.jobTitle}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
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
                      onChange={(e) =>
                        handleInputChange("jobLocation", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.jobLocation}
                      </p>
                    )}
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
                      onChange={(e) =>
                        handleInputChange("dateOfJoining", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.dateOfJoining}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div
                onWheel={(e) => e.stopPropagation()}
                className="flex gap-6 w-[100%] ml:flex-row flex-col"
              >
                <div className="personal_single_input w-[100%]">
                  <p className="form_text_heading w-[100%]">
                    Key skills <span className="star">*</span>
                  </p>
                  <ReactSelect
                    options={skills}
                    isMulti
                    className="w-full"
                    onChange={(data) => handleInputChange("keySkills", data)}
                    value={data.keySkills}
                  />
                  {formError && (
                    <p className="text-[12px] text-[red] font-[500]">
                      {formError?.keySkills}
                    </p>
                  )}
                </div>

                {/* <div className="personal_single_input w-[100%]">
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
                      onChange={(e) =>
                        handleInputChange("currentCTC", e.target.value)
                      }
                    />
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.currentCTC}
                      </p>
                    )}
                  </div>
                </div> */}
              </div>

              <div className="personal_single_input w-[100%] ">
                <div className="personal_name w-[100%]">
                  <p className="form_text_heading">
                    Notice Period <span className="star">*</span>
                  </p>
                  <form className="notice_period flex flex-wrap ">
                    {noticePeriods.map((item, index) => (
                      <div className="radio " key={index}>
                        <input
                          type="radio"
                          value={item.value}
                          checked={data.noticePeriod == item.value}
                          onChange={(e) =>
                            handleInputChange("noticePeriod", e.target.value)
                          }
                        />
                        {item.title}
                      </div>
                    ))}
                    {formError && (
                      <p className="text-[12px] text-[red] font-[500]">
                        {formError?.noticePeriod}
                      </p>
                    )}
                  </form>
                </div>
              </div>

              {/* <div className="personal_single_input w-[100%]">
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
              </div> */}

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
                  className="buttons bg-[#06A9EF] text-white"
                  id="border_button"
                  onClick={handleClick}
                >
                  {loading && <MiniLoader />}
                  {!loading && "Continue"}
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
