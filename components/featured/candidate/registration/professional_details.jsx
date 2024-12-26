import React, { useState } from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";
import ImageContainer from "../../../common/image";
import { noticePeriods } from "../../../../utils/data";
import { useRouter } from "next/router";
import MiniLoader from "../../../common/mini-loader";
import DateSelector from "../../../common/dateSelector";
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
  const [duration, setDuration] = useState({});
  const [formError, setFormError] = useState({});
  const router = useRouter();
  const handleClick = () => {
    if (data.workStatus != "Fresher") {
      const requiredFields = ["companyName", "jobLocation", "jobTitle"];
      const emptyFields = requiredFields.filter((field) => !data[field]);
      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (duration?.duration) {
        if (Object.keys(duration.duration).length < 2) {
          toast.error("Please fill duration");
          return;
        } else {
          if (Object.keys(duration.duration.start).length < 2) {
            toast.error("Please fill start duration");
            return;
          } else if (
            duration.duration.end &&
            Object.keys(duration.duration.end).length < 2
          ) {
            toast.error("Please fill end duration");
            return;
          }
        }
      } else {
        toast.error("Please fill duration");
        return;
      }
    }

    // setLoading(true);
    setData({ ...data, jobDuration: duration.duration });

    router.push({
      pathname: "/createResume",
      query: { ...data, keySkills: JSON.stringify(data.keySkills), jobDuration: JSON.stringify(duration.duration), educationDuration: JSON.stringify(data.educationDuration) },
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
          errors.companyName = "Company Name is required";
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
              {data.workStatus == "Fresher" && (
                <div className="form_text_heading">
                  Internship Details (Optional)
                </div>
              )}
              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                {data.workStatus != "Fresher" && (
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
                            setData({
                              ...data,
                              employmentStatus: "unemployed",
                            });
                          }}
                        >
                          Unemployed
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  className={`personal_single_input  ${data.workStatus == "Fresher" ? "w-full" : "w-[50%]"
                    }`}
                >
                  <div className="personal_single_input w-[100%]">
                    <div className="personal_name w-[100%]">
                      <p className="form_text_heading">
                        Company Name{" "}
                        {data.workStatus != "Fresher" && (
                          <span className="star">*</span>
                        )}
                      </p>
                      <input
                        type="text"
                        name=""
                        className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
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
                </div>
              </div>

              <div className="flex gap-6 w-[100%] ml:flex-row flex-col">
                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      {data.workStatus == "Fresher" ? (
                        <>Role</>
                      ) : (
                        <>
                          Job tittle <span className="star">*</span>
                        </>
                      )}
                    </p>
                    <input
                      type="text"
                      name=""
                      className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
                      placeholder={
                        data.workStatus == "Fresher"
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
                <div className="personal_single_input w-[100%]">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">
                      {data.workStatus == "Fresher" ? (
                        <>Location</>
                      ) : (
                        <>
                          Job location <span className="star">*</span>
                        </>
                      )}
                    </p>
                    <input
                      type="text"
                      name=""
                      className="text-[14px] font-normal px-4 py-3 rounded-[8px] border border-[#DEDEDE] leading-tight h-[40px] w-full"
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
              </div>
              <div className="personal_single_input w-[100%]">
                <div className="personal_name w-[100%]">
                  <p className="form_text_heading">
                    Date of Joining{" "}
                    {data.workStatus != "Fresher" && (
                      <span className="star">*</span>
                    )}
                  </p>
                  <DateSelector
                    idPrefix="education"
                    data={duration}
                    dataSeter={setDuration}
                    isRow={true}
                  />
                </div>
              </div>
              <div
                onWheel={(e) => e.stopPropagation()}
                className="flex gap-6 w-[100%] ml:flex-row flex-col"
              >
                <div className="personal_single_input w-[100%] gap-2">
                  <p className="form_text_heading w-[100%]">Key skills</p>
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
              </div>
              {data.workStatus != "Fresher" && (
                <div className="personal_single_input w-[100%] ">
                  <div className="personal_name w-[100%]">
                    <p className="form_text_heading">Notice Period</p>
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
              )}

              <div className="bottom_buttons pt-4 flex justify-between w-full">
                <button
                  className="text-[14px] font-semibold border rounded-[30px] px-9 py-[11.25px] border-blue"
                  onClick={() => {
                    setTabIndex(3);

                    window.scroll(0, 0);
                  }}
                >
                  Back
                </button>
                <button
                  className=" font-[600] bg-[#06A9EF] text-white px-9 py-[11.25px] rounded-[30px] text-[14px] leading-tight"
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
