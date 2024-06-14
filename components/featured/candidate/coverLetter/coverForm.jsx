import React, { useRef, useState, useEffect } from "react";
import { coverLetters } from "../../../../utils/middleware";
import ThemeForm from "../createResume/components/themeForm";
import { StandaredForm } from "./StandaredForm";
import CoustomForm from "./CoustomForm";
import axios from "axios";
import CustomTextEditor from "./CoustomFormat/CustomTextEditor";
import { SparklingStarts } from "../../../../utils/svg";
import MainTextEditor from "./CoustomFormat/MainTextEditor";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";

function CoverForm({
  selectedResumeIndex,
  setSelectedResumeIndex,
  selectedColor,
  setSelectedColor,
  setSelectedFont,
  selectedFont,
  data,
  setData,
}) {
  const [isAll, setIsAll] = useState(false);
  const router = useRouter();
  const [isFormat, setIsFormat] = useState("standard");
  const [FieldError, setFieldError] = useState("");
  const [isError, setError] = useState(null);
  const userDataGlobal = useSelector((state) => state.userData);
  const taskRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [letterData, setLetterData] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [contentSituation, setContentSituation] = useState("Experienced");
  const [loading, setLoading] = useState(false);
  const handleImageClick = (template) => {
    togglePreview(true, template.index);
    setSelectedColor(template.themeColor);
    setSelectedFont(template.fontFamily);
  };

  const togglePreview = (isVisible, index) => {
    setSelectedResumeIndex(index);
  };

  const renderTemplates = () => {
    const selectedStyle = {
      border: " 4px solid #06A9EF",
      height: " 210px",
      width: "auto",
    };
    return coverLetters.map((template, index) => (
      <img
        style={selectedResumeIndex == template.index ? selectedStyle : {}}
        key={index}
        src={template.imgUrl}
        className="h-[200px] w-[140.91px] rounded-[6px]"
        alt=""
        onClick={() => handleImageClick(template)}
      />
    ));
  };

  const handleSaveData = () => {
    console.log(7865);
  };
  const renderAllTemplates = () => {
    return coverLetters.map((template, index) => (
      <img
        key={index}
        src={template.imgUrl}
        className="h-[330px] w-[234px] rounded-[6px] transition-transform duration-300 ease-in-out hover:scale-105"
        style={{ boxShadow: "0px 0px 26.499px 0px rgba(0, 0, 0, 0.25)" }}
        alt=""
        onClick={() => {
          handleImageClick(template);
          setIsAll(false);
        }}
      />
    ));
  };

  // Function to validate required fields
  function validateRequiredFields(data) {
    const requiredFields = [
      "firstName",
      "lastName",
      "mobileNumber",
      "email",
      "dial_code",
      "address",
      "employerName",
      "employerOrganizationName",
      "employerAddress",
      "employerCityState",
      "employerCountry",
    ];

    let errors = {};

    requiredFields.forEach((field) => {
      if (!data[field]) {
        errors[field] = `${field} is missing`;
      }
    });

    return errors;
  }

  const fetchCoverLetter = async () => {
    setLoading(true);
    try {
      if (data) {
        const errors = validateRequiredFields(data);
        setError(errors);

        if (Object.keys(errors).length === 0) {
          const response = await axios.post(
            "http://localhost:2000/api/cover-letter/transform",
            data
          );
          const letterData = response.data;
          setData({ ...data, passages: letterData.passages });
          setLoading(false);
          setIsShow(true);
        } else {
          toast.error("please fill required fields!");
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching cover letter:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setData({ ...data, letterDate: selectedDate });
  }, [selectedDate]);

  const handleNavigate = () => {
    if (data) {
      localStorage.setItem("customLetterData", JSON.stringify(data));
    }
  };

  const handleCustomTextEditor = () => {
    setIsShow(true);
  };

  return (
    <div className="flex flex-col pr-[10px] ml:w-[100%] w-[100%] h-[88vh] relative  pb-4 gap-4 rounded-lg overflow-y-auto  bg-white ">
      <div className="ml:flex hidden  flex-row gap-4 sticky top-0 z-[20] bg-white pb-2">
        <button
          className="p-[8px] border-[1px] bg-blue border-[#DEDEDE] rounded-[6px]  "
          style={{}}
        >
          <svg
            className=" cursor-pointer"
            onClick={() => router.push("/home")}
            width="24"
            height="24"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g mask="url(#mask0_629_16604)">
              <path
                d="M11.9583 21.3892L21.9584 31.3892L20 33.3337L6.66669 20.0003L20 6.66699L21.9584 8.61141L11.9583 18.6115H33.3334V21.3892H11.9583Z"
                fill="white"
              />
            </g>
          </svg>
        </button>
        <div className="text-[18px] font-medium text-[#FFFFFF]  header1 w-[100%] flex justify-start px-4 py-[6px] ">
          Create Cover Letter
        </div>
      </div>
      <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px]  ">
        <div
          className="flex gap-4 pb-[10px]  items-center"
          style={{ overflowX: "auto" }}
        >
          {renderTemplates()}
        </div>
      </div>
      <div
        onClick={() => setIsAll(true)}
        className="flex justify-end text-[16px] font-[500] text-[#06A9EF] cursor-pointer"
      >
        See All Templates
      </div>
      {isAll && (
        <div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
            <div
              ref={taskRef}
              onWheel={(e) => e.stopPropagation()}
              className=" absolute top-[42px] flex p-6 bg-white rounded-[24px] shadow-md  gap-6 flex-wrap justify-center items-center ml:w-[65%] w-[90%] h-[90vh] overflow-y-auto "
            >
              {renderAllTemplates()}
              <div
                className="absolute top-[12px] right-[10px]  cursor-pointer  web "
                onClick={() => setIsAll(false)}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g mask="url(#mask0_3995_39638)">
                    <path
                      d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
                      fill="#333333"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              className="absolute bottom-[35px] mobile cursor-pointer  "
              onClick={() => setIsAll(false)}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_d_3995_39637)">
                  <rect
                    x="4"
                    y="3"
                    width="40"
                    height="40"
                    rx="20"
                    fill="white"
                  />

                  <g mask="url(#mask0_3995_39637)">
                    <path
                      d="M18.4 30L17 28.6L22.6 23L17 17.4L18.4 16L24 21.6L29.6 16L31 17.4L25.4 23L31 28.6L29.6 30L24 24.4L18.4 30Z"
                      fill="#333333"
                    />
                  </g>
                </g>
                <defs>
                  <filter
                    id="filter0_d_3995_39637"
                    x="0"
                    y="0"
                    width="48"
                    height="48"
                    filterUnits="userSpaceOnUse"
                    color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha"
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="1" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix
                      type="matrix"
                      values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                    />
                    <feBlend
                      mode="normal"
                      in2="BackgroundImageFix"
                      result="effect1_dropShadow_3995_39637"
                    />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="effect1_dropShadow_3995_39637"
                      result="shape"
                    />
                  </filter>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      )}
      {isShow === false && (
        <div className="flex flex-col gap-[16px] sticky top-[40px] z-[10] bg-white pt-5 pb-4">
          <ThemeForm
            selectedResumeIndex={selectedResumeIndex}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            setSelectedFont={setSelectedFont}
            selectedFont={selectedFont}
          />
          <div className="bg-[#DEDEDE] w-full h-[1px]"> </div>
          <div className="bg-[#F9F9F9] w-full flex rounded-[8px] text-[14px] font-semibold  ">
            <button
              className={`${
                isFormat === "standard"
                  ? "bg-[#06A9EF] py-[8px] px-[16px] flex justify-center items-center rounded-[8px] w-[50%] text-white"
                  : "py-[8px] px-[16px] flex justify-center items-center rounded-[8px] w-[50%]"
              }`}
              onClick={() => setIsFormat("standard")}
            >
              Standard Format
            </button>
            <button
              className={`${
                isFormat === "custom"
                  ? "bg-[#06A9EF] py-[8px] px-[16px] flex justify-center items-center rounded-[8px] w-[50%] text-white"
                  : "py-[8px] px-[16px] flex justify-center items-center rounded-[8px] w-[50%]"
              }`}
              onClick={() => setIsFormat("custom")}
            >
              Custom Format
            </button>
          </div>
        </div>
      )}
      <div>
        {isShow === false && (
          <div className="flex flex-col gap-[16px] overflow-y-auto">
            <div className="bg-[#DEDEDE] w-full h-[1px]"> </div>
            <div className="flex flex-col gap-[16px] text-[14px] font-medium">
              <label className="font-montserrat text-[14px] font-[500] leading-[17.07px] text-left w-full">
                Content Situation
              </label>

              <div className="w-full flex gap-[16px] text-[14px] font-montserrat items-center font-medium">
                <div className="flex gap-[10px] w-[50%] items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 custom-radio "
                    value={contentSituation}
                    checked={contentSituation == "Experienced"}
                    onChange={() => {
                      setContentSituation("Experienced");
                    }}
                  />
                  <label>Experienced</label>
                </div>
                <div className="flex gap-2 w-[50%] items-center">
                  <input
                    type="radio"
                    className="h-4 w-4 custom-radio"
                    value={contentSituation}
                    checked={contentSituation == "Fresher"}
                    onChange={() => {
                      setContentSituation("Fresher");
                    }}
                  />
                  <label>Fresher</label>
                </div>
              </div>
            </div>
            <div className="w-full h-[0px] gap-0 border-t rotate-0 border-[#DEDEDE] "></div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor="letter-date"
                className="font-montserrat text-[14px] font-[500] leading-[17.07px] text-left w-full"
              >
                Letter Date
              </label>
              <div className="relative flex gap-2 justify-between">
                <DatePicker
                  id="letter-date"
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  placeholderText="Select Date"
                  className="w-full px-4 py-2 gap-2 border border-[#646464] rounded-[8px] shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                />

                <span className="absolute inset-y-0 left-[180px] flex items-center pointer-events-none gap-3  py-2">
                  <div className="h-full w-[1px] bg-[#DEDEDE]"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 4h10M5 11h14m-7 4h.01m-6 0h.01M6 17h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            {isFormat === "standard" && (
              <div className="flex flex-col gap-2">
                <StandaredForm
                  contentSituation={contentSituation}
                  data={data}
                  setData={setData}
                  setSelectedFont={setSelectedFont}
                  selectedFont={selectedFont}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedResumeIndex={selectedResumeIndex}
                  setSelectedResumeIndex={setSelectedResumeIndex}
                  isFormat={isFormat}
                  isError={isError}
                />
              </div>
            )}

            {isFormat === "custom" && (
              <>
                <CoustomForm
                  contentSituation={contentSituation}
                  data={data}
                  setData={setData}
                  setSelectedFont={setSelectedFont}
                  selectedFont={selectedFont}
                  selectedColor={selectedColor}
                  setSelectedColor={setSelectedColor}
                  selectedResumeIndex={selectedResumeIndex}
                  setSelectedResumeIndex={setSelectedResumeIndex}
                  isFormat={isFormat}
                />
              </>
            )}
          </div>
        )}
      </div>
      <div className="p-[12px] pr-[16px] pb-[12px] pl-[16px] gap-[10px] z-[100] sticky h-[100px] bottom-[-20px] bg-white">
        {isShow === false && (
          <div className="flex justify-end ">
            {isFormat === "standard" && (
              <button
                className="bg-[#06A9EF] w-[126px] h-[34px] py-[8px] px-[16px] text-[12px] flex justify-center items-center rounded-[8px]  text-white"
                onClick={fetchCoverLetter}
              >
                {loading ? (
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4  animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="#E5E7EB"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  "Generate Letter"
                )}
              </button>
            )}
          </div>
        )}
      </div>

      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed z-[3000] min-w-[508px] w-[34%] mt-[22rem] flex flex-col gap-4"
            style={{
              background: "white",
              boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
            }}
          >
            <CustomTextEditor data={data} setData={setData} />
            <div className="flex flex-row justify-between ite3ms-center gap-[10px]">
              <div>
                <div
                  className="flex flex-row bg-[#F5F5F5] py-[8px] px-[16px] text-[12px] justify-between items-center rounded-[8px] gap-[8px] cursor-pointer"
                  onClick={() => {
                    handleNavigate();
                    setIsShow(false);
                  }}
                >
                  <svg
                    className="min-h-[16px] min-w-[16px]"
                    width="7"
                    height="14"
                    viewBox="0 0 7 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.93333 7.00026L0.233333 2.30026C0.0777778 2.1447 0 1.95582 0 1.73359C0 1.51137 0.0777778 1.32248 0.233333 1.16693C0.388889 1.01137 0.577778 0.933594 0.8 0.933594C1.02222 0.933594 1.21111 1.01137 1.36667 1.16693L6.35 6.15026C6.47222 6.27248 6.56111 6.40582 6.61667 6.55026C6.67222 6.69471 6.7 6.84471 6.7 7.00026C6.7 7.15582 6.67222 7.30582 6.61667 7.45026C6.56111 7.59471 6.47222 7.72804 6.35 7.85026L1.36667 12.8336C1.21111 12.9891 1.02222 13.0669 0.8 13.0669C0.577778 13.0669 0.388889 12.9891 0.233333 12.8336C0.0777778 12.678 0 12.4892 0 12.2669C0 12.0447 0.0777778 11.8558 0.233333 11.7003L4.93333 7.00026Z"
                      fill="#1C1B1F"
                    />
                  </svg>
                  <span className="text-[12px] text-[#333333] font-[600] font-Montserrat leading-[16px]">
                    Edit
                  </span>
                </div>
              </div>
              <div className="flex flex-row justify-between items-center gap-[10px]">
                <button className="flex items-center font-montserrat text-xs font-semibold btn_outline gap-[6px]">
                  <SparklingStarts />
                  <span className="text-[12px] text-[#333333] font-[600] font-Montserrat leading-[16px]">
                    Rephrase with AI
                  </span>
                </button>
                <button className="font-montserrat text-white font-medium text-[12px] px-[16px] py-[8px] rounded-[8px] bg-[#DEDEDE] w-[60px] h-[32px]">
                  Save
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CoverForm;
