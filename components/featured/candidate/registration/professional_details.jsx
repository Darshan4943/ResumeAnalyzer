import ImageContainer from "@/components/common/image";
import { noticePeriods } from "@/utils/data";
import React from "react";
import ReactSelect from "react-select";
import { toast } from "react-toastify";

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
  const validateForm = () => {
    const errors = {};
    if (!data.companyName?.trim()) {
      errors.companyName = "First Name is required";
    }
    if (!data.jobTitle?.trim()) {
      errors.jobTitle = "Last Name is required";
    }
    if (!data.jobLocation?.trim()) {
      errors.jobLocation = "Last Name is required";
    }
    if (!data.keySkills?.length > 0) {
      errors.keySkills = "Last Name is required";
    }
    if (!data.dateOfJoining?.trim()) {
      errors.dateOfJoining = "Last Name is required";
    }
    if (!data.workExperiance?.years) {
      errors.workExperiance = "Last Name is required";
    }
    return errors;
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (data.workStatus == "fresher") {
      register_cadidate();
    } else {
      if (Object.keys(errors).length === 0) {
        register_cadidate();
      } else {
        console.log(Object.keys(errors));
        toast.error("Please enter all required fields");
      }
    }
  };
  return (
    <>
      {tabindex == 4 && (
        <div className="personal_details_all">
          <div className="personal_details" style={{ paddingBottom: "96px" }}>
            <div className="personal_details_form">
              <>
                <img
                  className="mail_img"
                  src="/images/auth/candidate/Group_7.png"
                  alt=""
                  style={{
                    right: "-13rem",
                    width: "31%",
                    animationDelay: 0.2,
                    top: "11rem",
                  }}
                />

                <img
                  className="phone_img "
                  src="/images/auth/candidate/Group_8.png"
                  alt=""
                  style={{ width: "39%", top: "46rem", right: "-16rem" }}
                />

                <img
                  className="location_img"
                  src="/images/auth/candidate/Group_9.png"
                  alt=""
                  style={{ top: "3rem", left: "-14rem", width: "36%" }}
                />

                <img
                  className="data_img"
                  src="/images/auth/candidate/Group_10.png"
                  alt=""
                  style={{ left: "-17rem", width: "44%", top: "33rem" }}
                />
              </>
              {data.workStatus == "fresher" ? (
                <p className="form_text_heading text-[20px]">
                  Internship Details (optional)
                </p>
              ) : (
                <div className="personal_single_input">
                  <div className="personal_name">
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
                          setData({ ...data, employmentStatus: "unemployed" });
                        }}
                      >
                        Unemployed
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="personal_single_input">
                <div className="personal_name" style={{ gap: "10px" }}>
                  <p className="form_text_heading">
                    Work Experience <span className="star">*</span>
                  </p>
                  <div className="flex flex-row gap-[24px]">
                    <div>
                      <label htmlFor="" className="text-[14px] text-[#404040]">
                        Years
                      </label>
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
                              years: e.target.value,
                              ...data.workExperiance,
                            },
                          });
                        }}
                      />
                    </div>
                    <div>
                      <label htmlFor="" className="text-[14px] text-[#404040]">
                        Months
                      </label>
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
                              months: e.target.value,
                              ...data.workExperiance,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Company Name <span className="star">*</span>
                  </p>
                  <input
                    type="text"
                    name=""
                    id="single_input"
                    placeholder="Enter Company Name"
                    value={data.companyName}
                    onChange={(e) => {
                      setData({ ...data, companyName: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
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
                    onChange={(e) => {
                      setData({ ...data, jobTitle: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Job location <span className="star">*</span>
                  </p>
                  <input
                    type="text"
                    name=""
                    id="single_input"
                    placeholder="Enter job location"
                    value={data.jobLocation}
                    onChange={(e) => {
                      setData({ ...data, jobLocation: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <div className="personal_name">
                  <p className="form_text_heading">
                    Date Of joining <span className="star">*</span>
                  </p>
                  <input
                    type="date"
                    name=""
                    id="single_input"
                    placeholder="Enter date of joining"
                    value={data.dateOfJoining}
                    onChange={(e) => {
                      setData({ ...data, dateOfJoining: e.target.value });
                    }}
                  />
                </div>
              </div>

              <div className="personal_single_input">
                <p className="form_text_heading">
                  Key skills <span className="star">*</span>
                </p>
                <ReactSelect
                  options={skills}
                  isMulti
                  className="w-full"
                  onChange={(data) => {
                    setData({ ...data, keySkills: data });
                  }}
                  value={data.keySkills}
                />
              </div>
              {data.workStatus != "fresher" ? (
                <>
                  {" "}
                  <div className="personal_single_input">
                    <div className="personal_name">
                      <p className="form_text_heading">
                        Current CTC <span className="star">*</span>
                      </p>
                      <input
                        type="text"
                        name=""
                        id="single_input"
                        placeholder="Yearly LPA"
                        value={data.currentCTC}
                        onChange={(e) => {
                          setData({ ...data, currentCTC: e.target.value });
                        }}
                      />
                    </div>
                  </div>
                  <div className="personal_single_input">
                    <div className="personal_name">
                      <p className="form_text_heading">
                        Notice Period <span className="star">*</span>
                      </p>
                      <form className="notice_period">
                        {noticePeriods.map((item, index) => (
                          <div className="radio" key={index}>
                            <input
                              type="radio"
                              value={item.value}
                              checked={data.noticePeriod == item.value}
                              onChange={(e) => {
                                setData({ ...data, noticePeriod: item.value });
                              }}
                            />
                            {item.title}
                          </div>
                        ))}
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <div className="personal_single_input">
                  <p className="form_text_heading">Upload Certificate</p>
                  {certificate ? (
                    <div className="flex flex-row gap-[16px] items-center py-[16px] border border-[#bebebe] justify-center  rounded-[12px] upload-btn-wrapper w-[100%]">
                      <input
                        type="file"
                        name="myfile"
                        onChange={(e) => setCertificate(e.target.files[0])}
                      />
                      <ImageContainer
                        src={"/images/icons/pdf_icon.png"}
                        className={"h-[24px] w-[24px]"}
                        alt=""
                      />

                      <span className="text-[14px] w-[56%]">
                        {certificate.name}
                      </span>
                      <button className="px-[16px] py-[8px] border border-[#06A9EF]  rounded-[12px]">
                        Browse file
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-row gap-[16px] items-center py-[10px] px-[16px] border border-[#bebebe] justify-start  rounded-[12px] w-[100%]">
                      <input
                        type="file"
                        name="myfile"
                        onChange={(e) => setCertificate(e.target.files[0])}
                      />
                    </div>
                  )}
                </div>
              )}

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
