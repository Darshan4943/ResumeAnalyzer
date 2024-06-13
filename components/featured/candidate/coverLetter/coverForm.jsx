import React, { useRef, useState, useEffect } from "react";
import { coverLetters } from "../../../../utils/middleware";
import ThemeForm from "../createResume/components/themeForm";
import { StandaredForm } from "./StandaredForm";
import CoustomForm from "./CoustomForm";
import axios from "axios";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

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
  console.log(data)
  const [isAll, setIsAll] = useState(false);
  const [isFormat, setIsFormat] = useState("standard");
  const userDataGlobal = useSelector((state) => state.userData);
  const taskRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [contentSituation, setContentSituation] = useState("Experienced");
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

  const addCoverLetter = async () => {
    try {
     
      const formData = { ...data, userId:userDataGlobal._id };
  
      const response = await axios.post('http://localhost:2000/api/cover/add', formData);
      toast.success("Cover Letter added successfully");
      return response.data;
    } catch (error) {
      console.error('Error adding cover letter:', error);
      toast.error("Error adding cover letter");
      throw error;
    }
  };
  console.log("data", data);

  useEffect(() => {
    setData({ ...data, letterDate: selectedDate });
  }, [selectedDate]);

  return (
    <div className="flex flex-col pr-[10px] ml:w-[100%] w-[100%]  pb-4 gap-4 rounded-lg ">
      <div className="ml:flex hidden  flex-row gap-4 ">
        <button
          className="p-[8px] border-[1px] bg-blue border-[#DEDEDE] rounded-[6px]  "
          style={{}}
        >
          <svg
            className=" cursor-pointer"
            onClick={() => router.push("/home/BuildResume")}
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
      <div className="rounded-[8px] bg-[#BCEBFF]  px-4 pt-[10px] ">
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

      <ThemeForm
        selectedResumeIndex={selectedResumeIndex}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
        setSelectedFont={setSelectedFont}
        selectedFont={selectedFont}
      />
      <div className="bg-[#DEDEDE] w-full h-[1px]"> </div>
      <div className="bg-[#F9F9F9] w-full flex rounded-[8px] text-[14px] font-semibold">
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

      <div className="flex flex-end justify-end">
        <button
          className={`${
            isFormat === "standard"
              ? "bg-[#06A9EF] py-[8px] px-[16px] text-[12px] flex justify-center items-center rounded-[8px]  text-white"
              : "py-[8px] px-[16px] flex justify-center items-center rounded-[8px]  text-[12px]"
          }`}
     
        >
          Generate Letter
        </button>
        <button
          className={`${
            isFormat === "standard"
              ? "bg-[#06A9EF] py-[8px] px-[16px] text-[12px] flex justify-center items-center rounded-[8px]  text-white"
              : "py-[8px] px-[16px] flex justify-center items-center rounded-[8px]  text-[12px]"
          }`}
          onClick={addCoverLetter}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default CoverForm;
