import React, { useEffect, useRef, useState } from "react";
import ALink from "@/components/alink";
import { toast } from "react-toastify";
import ImageContainer from "@/components/common/image";
import axios from "axios";
import MiniLoader from "@/components/common/mini-loader";
import { camelCase, dateFormatter } from "@/utils/middleware";
import { useRouter } from "next/router";

const CandidateAiPower = ({
  setTabIndex,
  tabindex,
  setfile,
  file,
  setData,
  data,
}) => {
  const router = useRouter();
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const handleButtonClick = () => {
    fileRef.current.click();
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile?.type == "application/pdf" || "application/docs") {
        sendFile(selectedFile);
      } else {
        toast.error("Only PDF and DOC files are allowed");
      }
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const sendFile = (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("https://freedygoservices.in/api/resumeParser", formData)
      .then((res) => {
        setLoading(false);
        setfile(file);
        setToState(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  function convertMonthsToYearsAndMonths(totalMonths) {
    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    return {
      years: years ? years : 1,
      months: remainingMonths,
    };
  }

  const setToState = (dataFromApi) => {
    const {
      first_name,
      last_name,
      gender,
      emails,
      phone_numbers,
      address,
      summary,
      skills,
      date_of_birth,
    } = dataFromApi.data.basics;
    const { end_year, issuing_organization, description } =
      dataFromApi.data.educations[0];

    const trainings_and_certifications =
      dataFromApi.data.trainings_and_certifications;
    const professional_experiences = dataFromApi.data.professional_experiences;
    const total_experience_in_months = professional_experiences.reduce(
      (total, experience) => total + experience.duration_in_months,
      0
    );
    const isCurrentlyWorking = professional_experiences.find(
      (item) => item.is_current == true
    );
    let jobTitle = "";
    let companyName = "";
    if (isCurrentlyWorking) {
      const { title, company } = isCurrentlyWorking;
      jobTitle = title;
      companyName = company;
    }
    console.log("first", description.split("\n"));

    setData({
      ...data,
      firstName: camelCase(first_name),
      lastName: camelCase(last_name),
      mobileNo: phone_numbers[0],
      // mobileNo: `91${phone_numbers[0]}`,
      email: emails[0],
      password: "",
      dob:
        date_of_birth.year != null &&
        dateFormatter(
          new Date(
            date_of_birth.year,
            date_of_birth.month - 1,
            date_of_birth.day
          )
        ),
      gender: gender ? gender : "male",
      currentLocation: "",
      workStatus:
        professional_experiences.length > 0 ? "experianced" : "fresher",
      education: "10th or below",
      stream: description.split("\n")[0],
      university: "",
      institute: issuing_organization,
      dateOfComplition: "",
      courses: trainings_and_certifications
        .map((entry) => entry.issuing_organization)
        .join("\n"),
      awards: "",
      workExperiance: {
        ...convertMonthsToYearsAndMonths(total_experience_in_months),
      },
      companyName: companyName,
      jobTitle: jobTitle,
      jobLocation: "",
      dateOfJoining: "",
      keySkills: skills.map((item) => ({
        value: item,
        label: camelCase(item),
      })),
      currentCTC: null,
      noticePeriod: "15 days or less",
      isCurrentlyWorking: isCurrentlyWorking ? true : false,
      employmentStatus: isCurrentlyWorking ? "employed" : "unemployed",
      summary: summary,
      url: dataFromApi.url,
    });
  };

  return (
    <>
      {tabindex == 1 && (
        <>
          <div className="flex justify-center items-center  relative ">
            <div className="last_img_parent_head top-[100px]">
              <div className="lastfour_img_cont">
                <div className="last_img_contener1">
                  <img
                    src="/images/auth/employer/last1.png"
                    alt=""
                    className="last_img_1"
                  />
                </div>
                <div className="last_img_contener2">
                  <img
                    src="/images/auth/employer/last2.png"
                    alt=""
                    className="last_img_2"
                  />
                </div>
                <div className="last_img_contener3">
                  <img
                    src="/images/auth/employer/last3.png"
                    alt=""
                    className="last_img_3"
                  />
                </div>
                <div className="last_img_contener4">
                  <img
                    src="/images/auth/employer/last4.png"
                    alt=""
                    className="last_img_4"
                  />
                </div>
                <div className="last_img_contener5">
                  <img
                    src="/images/auth/employer/last5.png"
                    alt=""
                    className="five_img_div"
                  />
                </div>
                <div className="last_img_contener6">
                  <img
                    src="/images/auth/employer/last6.png"
                    alt=""
                    className="six_img_div"
                  />
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-[36px] p-[24px] justify-center items-center rounded-[12px] w-[33%] shadow_of_box  z-50 "
              style={{
                borderRadius: "12px",
                background: "#FFF",
                boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div className="flex flex-col gap-4">
                <p className="text-center font-semibold text-black-600 text-3xl">
                  Ai Powered profile creation
                </p>
                <p className=" text-center font-medium text-lg not-italic	">
                  Easy process to create your profile
                </p>
                <div className="flex flex-col gap-2">
                  <p className="text-center font-medium text-sm	not-italic">
                    1.Upload your CV/Resume.
                  </p>
                  <p className="text-center font-medium	text-sm	not-italic	">
                    2.Let system scan it and make your profile almost ready.
                  </p>
                </div>
              </div>
              {loading ? (
                <div class="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]">
                  <MiniLoader />
                </div>
              ) : (
                <div
                  ref={fileRef}
                  onDragOver={handleDragOver}
                  onDrop={handleFileChange}
                  class="border-dashed border-[3px] border-[#333] flex flex-col w-full rounded-[12px] px-[42px] py-[24px] items-center gap-[8px] upload-btn-wrapper min-h-[6rem]"
                >
                  <input
                    type="file"
                    name="myfile"
                    onChange={handleFileChange}
                  />
                  {file ? (
                    <div>
                      <div className="flex flex-row gap-[16px] items-center">
                        <ImageContainer
                          src={"/images/icons/pdf_icon.png"}
                          className={"h-[24px] w-[24px]"}
                        />
                        <span className="text-[12px] w-[40%]">{file.name}</span>
                        <button className="px-[16px] py-[8px] border border-[#06A9EF]  rounded-[12px]">
                          Browse file
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="  flex  flex-col  items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                          onClick={handleButtonClick}
                        >
                          <g clipPath="url(#clip0_4121_52475)">
                            <path
                              d="M25 13.3333H25.0167"
                              stroke="#06A9EF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M28.3327 6.66669H11.666C8.90459 6.66669 6.66602 8.90526 6.66602 11.6667V28.3334C6.66602 31.0948 8.90459 33.3334 11.666 33.3334H28.3327C31.0941 33.3334 33.3327 31.0948 33.3327 28.3334V11.6667C33.3327 8.90526 31.0941 6.66669 28.3327 6.66669Z"
                              stroke="#06A9EF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M6.66602 25L13.3327 18.3333C14.0928 17.6019 14.955 17.2169 15.8327 17.2169C16.7104 17.2169 17.5726 17.6019 18.3327 18.3333L26.666 26.6666"
                              stroke="#06A9EF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M23.334 23.3334L25.0007 21.6667C25.7607 20.9353 26.623 20.5502 27.5007 20.5502C28.3783 20.5502 29.2406 20.9353 30.0006 21.6667L33.334 25"
                              stroke="#06A9EF"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4121_52475">
                              <rect width="40" height="40" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                      <div class="flex flex-col gap-[4px]	font-normal	">
                        <div class="flex text-center justify-center  text-[14px] text-[#515B6F]">
                          drag and drop or{" "}
                          <p onClick={handleButtonClick} class="text-[#06A9EF]">
                            &nbsp;Browse file{" "}
                          </p>
                          &nbsp;to upload
                        </div>
                        <p class="text-center text-[12px] font-normal text-[#7C8493]">
                          PDF or DOCS
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}

              <div class="flex flex-row gap-[24px]">
                <button
                  className="px-9 py-3 bg-white-600 border border-[#06A9EF] font font-medium rounded-[12px]"
                  id="button"
                  onClick={() => {
                    setTabIndex(2);
                  }}
                >
                  Skip
                </button>

                {/* <ALink href="/auth/candidate_register"> */}

                <button
                  disabled={file && !loading ? false : true}
                  className={`px-9 py-3 bg-[#06A9EF] border rounded-[12px] font-semibold text-white ${
                    file && !loading ? "opacity-100" : "opacity-50"
                  } `}
                  onClick={() => {
                    setTabIndex(2);
                  }}
                >
                  Continue
                </button>
                {/* </ALink> */}
              </div>
            </div>
          </div>
          <div className="already_text_parent">
            <p className="already_text">
              Already have an account?{" "}
              <span id="sign_in">
                <a href="">Sign In</a>
              </span>
            </p>
          </div>
        </>
      )}
    </>
  );
};

export default CandidateAiPower;
