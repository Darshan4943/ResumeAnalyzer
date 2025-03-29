import React, { useEffect, useState } from "react";
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
  clientId,
}) => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState({});
  const [isDataUpdated, setIsDataUpdated] = useState(false);
  const [formError, setFormError] = useState({});
  const router = useRouter();
  const handleClick = () => {
    if (data.workStatus === "Experienced") {
      const requiredFields = ["companyName", "jobLocation", "jobTitle"];
      const emptyFields = requiredFields.filter((field) => !data[field]);
  
      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields");
        return;
      }
      if (duration?.duration) {
        if (Object.keys(duration.duration.start).length < 2) {
          toast.error("Please fill start duration");
          return;
        }
      } else {
        toast.error("Please fill duration");
        return;
      }
    }

    setData((prevData) => ({ ...prevData, jobDuration: duration.duration }));
    setIsDataUpdated(true);
  };

  useEffect(() => {
    if (isDataUpdated) {
      localStorage.setItem("preResumeData", JSON.stringify(data));
      router.push(`/createResume?clientId=${clientId}`);
    }
  }, [isDataUpdated]);

  const validateInput = (fieldName, value) => {
    const errors = { ...formError };
    if (data.workStatus === "Fresher") {
      setFormError({});
      return {};
    }
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
                          className={`gen_button ${
                            data.employmentStatus == "employed" &&
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
                          className={`gen_button ${
                            data.employmentStatus == "unemployed" &&
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
                  className={`personal_single_input  ${
                    data.workStatus == "Fresher"
                      ? "w-full"
                      : "ml:w-[50%] w-[100%]"
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
                          Job Title <span className="star">*</span>
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
                          : "Enter job title"
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
                    idPrefix="experience"
                    data={duration}
                    dataSeter={setDuration}
                    isRow={true}
                  />
                </div>
              </div>

              <div className="flex w-full flex-wrap gap-4">
                <div className="w-full md:w-[48%]">
                  <p className="text-[14px] font-medium text-gray-700 mb-1">
                    Key Skills
                  </p>
                  <ReactSelect
                    options={skills}
                    isMulti
                    className="w-full"
                    onChange={(data) => handleInputChange("keySkills", data)}
                    value={data.keySkills}
                    styles={{
                      control: (provided, state) => ({
                        ...provided,
                        border: formError.mustSkills
                          ? "1px solid red"
                          : "1px solid #DEDEDE",
                        borderRadius: "8px",
                        padding: "2px 8px",
                        flexWrap: "wrap",
                        boxShadow: state.isFocused
                          ? "0 0 0 1px #DEDEDE"
                          : "none",
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        display: "flex",
                        flexWrap: "nowrap",
                        gap: "4px",
                        padding: "2px 4px",
                        overflowX: "auto",
                        scrollbarWidth: "none",
                        "-ms-overflow-style": "none",
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                      }),
                      placeholder: (provided) => ({
                        ...provided,
                        color: "#767676",
                        fontSize: "12px",
                        fontWeight: "400",
                      }),
                      menu: (provided) => ({
                        ...provided,
                        zIndex: 10,
                        scrollbarWidth: "none",
                        "-ms-overflow-style": "none",
                        "&::-webkit-scrollbar": {
                          display: "none",
                        },
                      }),
                      multiValue: (provided) => ({
                        ...provided,
                        backgroundColor: "#EFFAFF",
                        borderRadius: "4px",
                        minWidth: "90px",
                      }),
                      multiValueLabel: (provided) => ({
                        ...provided,
                        color: "#06A9EF",
                        fontWeight: "500",
                      }),
                      multiValueRemove: (provided) => ({
                        ...provided,
                        color: "#9A4545",
                        "&:hover": {
                          backgroundColor: "transparent",
                        },
                      }),
                    }}
                  />
                  {formError?.keySkills && (
                    <p className="text-[12px] text-red-500 font-medium mt-1">
                      {formError.keySkills}
                    </p>
                  )}
                </div>

                {data.workStatus !== "Fresher" && (
                  <div className="w-full md:w-[48%]">
                    <p className="text-[14px] font-medium text-gray-700 mb-1">
                      Notice Period
                    </p>
                    <select
                      className="w-full border border-[#DEDEDE] rounded-[8px] p-2 outline-none focus:border-blue-400 transition"
                      value={data.noticePeriod || ""}
                      onChange={(e) =>
                        handleInputChange("noticePeriod", e.target.value)
                      }
                    >
                      <option value="" disabled>
                        Select Notice Period
                      </option>
                      {noticePeriods.map((item, index) => (
                        <option key={index} value={item.value}>
                          {item.title}
                        </option>
                      ))}
                    </select>
                    {formError?.noticePeriod && (
                      <p className="text-[12px] text-red-500 font-medium mt-1">
                        {formError.noticePeriod}
                      </p>
                    )}
                  </div>
                )}
              </div>

              <div className="bottom_buttons pt-4 flex justify-between w-full">
                <button
                  className="text-[14px] font-semibold border rounded-[30px] px-6 blue_border_Button h-[38px] "
                  onClick={() => {
                    setTabIndex(3);

                    window.scroll(0, 0);
                  }}
                >
                  Back
                </button>
                <button
                  className=" font-[600]  text-white px-6 h-[38px] bg_Button rounded-[30px] text-[14px] leading-tight"
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
