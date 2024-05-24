import React, { useState } from "react";
import { ChromePicker } from "react-color";
function ThemeForm({
  selectedResumeIndex,
  setSelectedColor,
  selectedColor,
  setSelectedFont,
  selectedFont,
}) {
  const [view, setView] = useState(false);
  const [viewFont, setFontView] = useState(false);
  const [showColor, setShowColors] = useState(false);

  const THEME_COLORS = [
    "#414042", //1
    "#F7902B", // 2
    "#00AEEF", // 4
    "#316059", // 5
    "#FFC20E", // 6
    "#0077F9", // 7
    "#646464", // 8
    "#FFD740", // 9
    "#F2BE5C", // 10
    "#E6E7E8", // 11
    "#0C2438", // 12
    "#0E6CC2", // 13
    "#242424", // 14
    "#716D6D", // 15
    "#545554", // 16
    "#D1D2D3", // 17
    "#F1F1F1", // 18
    "#000000", // 19
    "#494949", // 21
    "#FBEDE4", // 24

    "#CB3122", // 27
    "#2AB6BB", // 28
    "#324955", // 29
    "#0054A6", // 30
    "#227CFF", // 31
    "#0072BC", // 32
    "#6C83B7", // 34
    "#B3977F", // 35
    "#F15A29", // 36
    "#3956A3", // 37
    "#C49A6C", // 38
    "#030203", // 39
    "#47484C", // 40
    "#EDEDEE", // 41

    "#F9D3D0", // 43
    "#C7EAFB", // 44
    "#9E071C", // 45

    "#27AAE1", // 47
    "#F7941D", // 48

    "#F1D61B", // 51
    "#304A9F", // 52
    "#AC5428", // 53
    "#83C3C9", // 54
    "#FC9206", // 55
    "#56C8E2", // 56
  ];

  const fontFamily = [
    "Roboto",
    "Lato",
    "Montserrat",

    "Poppins",
    "Barlow",
    "Inter",
    "Outfit",
    "Kanit",
  ];

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };
  const handleColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleFontClick = (font) => {
    setSelectedFont(font);
  };

  const handleShowFont = (label) => {
    if (label === "font") {
      setShowColors(false);
      setView(false);
      setFontView(!viewFont);
    } else if (label === "color") {
      setFontView(false);
      setView(false);
      setShowColors(!showColor);
    } else if (label === "customize") {
      setFontView(false);
      setShowColors(false);
      setView(!view);
    }
  };

  return (
    <div
      className="flex flex-col rounded-lg bg-white p-4"
      style={{
        boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        gap: view ? "6px" : "unset",
      }}
    >
      <div className="flex wrap items-center w-full justify-between gap-2">
        <div className="flex w-full wrap gap-[16px]">
          <div
            className="flex items-center  gap-2 bg-[#06A9EF] py-[8px] px-[16px] rounded-[12px]"
            onClick={() => handleShowFont("customize")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g mask="url(#mask0_2488_45473)">
                <path
                  d="M5.85 12L5.55 10.5C5.35 10.4167 5.1625 10.3292 4.9875 10.2375C4.8125 10.1458 4.63333 10.0333 4.45 9.9L3 10.35L2 8.65L3.15 7.65C3.11667 7.43333 3.1 7.21667 3.1 7C3.1 6.78333 3.11667 6.56667 3.15 6.35L2 5.35L3 3.65L4.45 4.1C4.63333 3.96667 4.8125 3.85417 4.9875 3.7625C5.1625 3.67083 5.35 3.58333 5.55 3.5L5.85 2H7.85L8.15 3.5C8.35 3.58333 8.5375 3.67083 8.7125 3.7625C8.8875 3.85417 9.06667 3.96667 9.25 4.1L10.7 3.65L11.7 5.35L10.55 6.35C10.5833 6.56667 10.6 6.78333 10.6 7C10.6 7.21667 10.5833 7.43333 10.55 7.65L11.7 8.65L10.7 10.35L9.25 9.9C9.06667 10.0333 8.8875 10.1458 8.7125 10.2375C8.5375 10.3292 8.35 10.4167 8.15 10.5L7.85 12H5.85ZM6.85 9C7.4 9 7.87083 8.80417 8.2625 8.4125C8.65417 8.02083 8.85 7.55 8.85 7C8.85 6.45 8.65417 5.97917 8.2625 5.5875C7.87083 5.19583 7.4 5 6.85 5C6.3 5 5.82917 5.19583 5.4375 5.5875C5.04583 5.97917 4.85 6.45 4.85 7C4.85 7.55 5.04583 8.02083 5.4375 8.4125C5.82917 8.80417 6.3 9 6.85 9ZM14.8 23L14.35 20.9C14.0667 20.8 13.8042 20.6792 13.5625 20.5375C13.3208 20.3958 13.0833 20.2333 12.85 20.05L10.85 20.7L9.45 18.3L11.05 16.9C11.0167 16.6 11 16.3 11 16C11 15.7 11.0167 15.4 11.05 15.1L9.45 13.7L10.85 11.3L12.85 11.95C13.0833 11.7667 13.3208 11.6042 13.5625 11.4625C13.8042 11.3208 14.0667 11.2 14.35 11.1L14.8 9H17.6L18.05 11.1C18.3333 11.2 18.5958 11.3208 18.8375 11.4625C19.0792 11.6042 19.3167 11.7667 19.55 11.95L21.55 11.3L22.95 13.7L21.35 15.1C21.3833 15.4 21.4 15.7 21.4 16C21.4 16.3 21.3833 16.6 21.35 16.9L22.95 18.3L21.55 20.7L19.55 20.05C19.3167 20.2333 19.0792 20.3958 18.8375 20.5375C18.5958 20.6792 18.3333 20.8 18.05 20.9L17.6 23H14.8ZM16.2 19C17.0333 19 17.7417 18.7083 18.325 18.125C18.9083 17.5417 19.2 16.8333 19.2 16C19.2 15.1667 18.9083 14.4583 18.325 13.875C17.7417 13.2917 17.0333 13 16.2 13C15.3667 13 14.6583 13.2917 14.075 13.875C13.4917 14.4583 13.2 15.1667 13.2 16C13.2 16.8333 13.4917 17.5417 14.075 18.125C14.6583 18.7083 15.3667 19 16.2 19Z"
                  fill="#fff"
                />
              </g>
            </svg>
            <h1 className="text-[20px] font-medium tracking-wide text-[#fff] cursor-pointer ">
              Customize
            </h1>
          </div>
          {/**   <div className="flex flex-row gap-[16px]">
            <div className="flex items-center  gap-2">
              <svg
                width="16"
                height="18"
                viewBox="0 0 18 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 20V14H10V16H18V18H10V20H8ZM0 18V16H6V18H0ZM3.425 12H5.5L6.6 8.925H11.425L12.5 12H14.575L10.075 0H7.925L3.425 12ZM7.2 7.2L8.95 2.225H9.05L10.8 7.2H7.2Z"
                  fill="#646464"
                />
              </svg>
              <h1 className="text-lg font-medium tracking-wide text-[#646464] cursor-pointer">
                Fonts
              </h1>
            </div>
            <div className="flex items-center  gap-2">
              <svg
                width="18"
                height="18"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.61667 0.270833 7.31667 0.8125 6.1C1.35417 4.88333 2.0875 3.825 3.0125 2.925C3.9375 2.025 5.01667 1.3125 6.25 0.7875C7.48333 0.2625 8.8 0 10.2 0C11.5333 0 12.7917 0.229167 13.975 0.6875C15.1583 1.14583 16.1958 1.77917 17.0875 2.5875C17.9792 3.39583 18.6875 4.35417 19.2125 5.4625C19.7375 6.57083 20 7.76667 20 9.05C20 10.9667 19.4167 12.4375 18.25 13.4625C17.0833 14.4875 15.6667 15 14 15H12.15C12 15 11.8958 15.0417 11.8375 15.125C11.7792 15.2083 11.75 15.3 11.75 15.4C11.75 15.6 11.875 15.8875 12.125 16.2625C12.375 16.6375 12.5 17.0667 12.5 17.55C12.5 18.3833 12.2708 19 11.8125 19.4C11.3542 19.8 10.75 20 10 20ZM4.5 11C4.93333 11 5.29167 10.8583 5.575 10.575C5.85833 10.2917 6 9.93333 6 9.5C6 9.06667 5.85833 8.70833 5.575 8.425C5.29167 8.14167 4.93333 8 4.5 8C4.06667 8 3.70833 8.14167 3.425 8.425C3.14167 8.70833 3 9.06667 3 9.5C3 9.93333 3.14167 10.2917 3.425 10.575C3.70833 10.8583 4.06667 11 4.5 11ZM7.5 7C7.93333 7 8.29167 6.85833 8.575 6.575C8.85833 6.29167 9 5.93333 9 5.5C9 5.06667 8.85833 4.70833 8.575 4.425C8.29167 4.14167 7.93333 4 7.5 4C7.06667 4 6.70833 4.14167 6.425 4.425C6.14167 4.70833 6 5.06667 6 5.5C6 5.93333 6.14167 6.29167 6.425 6.575C6.70833 6.85833 7.06667 7 7.5 7ZM12.5 7C12.9333 7 13.2917 6.85833 13.575 6.575C13.8583 6.29167 14 5.93333 14 5.5C14 5.06667 13.8583 4.70833 13.575 4.425C13.2917 4.14167 12.9333 4 12.5 4C12.0667 4 11.7083 4.14167 11.425 4.425C11.1417 4.70833 11 5.06667 11 5.5C11 5.93333 11.1417 6.29167 11.425 6.575C11.7083 6.85833 12.0667 7 12.5 7ZM15.5 11C15.9333 11 16.2917 10.8583 16.575 10.575C16.8583 10.2917 17 9.93333 17 9.5C17 9.06667 16.8583 8.70833 16.575 8.425C16.2917 8.14167 15.9333 8 15.5 8C15.0667 8 14.7083 8.14167 14.425 8.425C14.1417 8.70833 14 9.06667 14 9.5C14 9.93333 14.1417 10.2917 14.425 10.575C14.7083 10.8583 15.0667 11 15.5 11ZM10 18C10.15 18 10.2708 17.9583 10.3625 17.875C10.4542 17.7917 10.5 17.6833 10.5 17.55C10.5 17.3167 10.375 17.0417 10.125 16.725C9.875 16.4083 9.75 15.9333 9.75 15.3C9.75 14.6 9.99167 14.0417 10.475 13.625C10.9583 13.2083 11.55 13 12.25 13H14C15.1 13 16.0417 12.6792 16.825 12.0375C17.6083 11.3958 18 10.4 18 9.05C18 7.03333 17.2292 5.35417 15.6875 4.0125C14.1458 2.67083 12.3167 2 10.2 2C7.93333 2 6 2.775 4.4 4.325C2.8 5.875 2 7.76667 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
                  fill="#646464"
                />
              </svg>

              <h1 className="text-lg font-medium tracking-wide text-[#646464] cursor-pointer">
                Colors
              </h1>
            </div>
          </div>*/}
          <div className="flex flex-col md:flex-row md:gap-[14px] ">
            <div
              className="flex flex-col md:flex-row md:gap-[8px] cursor-pointer"
              onClick={() => handleShowFont("font")}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="min-w-[16px] min-h-[18px]"
                  width="16"
                  height="18"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 20V14H10V16H18V18H10V20H8ZM0 18V16H6V18H0ZM3.425 12H5.5L6.6 8.925H11.425L12.5 12H14.575L10.075 0H7.925L3.425 12ZM7.2 7.2L8.95 2.225H9.05L10.8 7.2H7.2Z"
                    fill="#646464"
                  />
                </svg>

                <h1 className="text-lg font-medium tracking-wide text-[#646464] cursor-pointer xxlg-text-[0px]">
                  Fonts
                </h1>
              </div>
              <div className="flex items-center h-full">
                <img
                  className="min-w-[14px] min-h-[14px]"
                  src="\images\auth\candidate\arrow_forward_ios.png"
                  style={{
                    height: "14px",
                    width: "14px",
                    objectFit: "contain",
                  }}
                  alt=""
                />
              </div>
            </div>

            <div
              className="flex flex-col md:flex-row md:gap-[8px] mt-4 md:mt-0 cursor-pointer"
              onClick={() => handleShowFont("color")}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="min-w-[16px] min-h-[18px]"
                  width="18"
                  height="18"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3667 0 10C0 8.61667 0.270833 7.31667 0.8125 6.1C1.35417 4.88333 2.0875 3.825 3.0125 2.925C3.9375 2.025 5.01667 1.3125 6.25 0.7875C7.48333 0.2625 8.8 0 10.2 0C11.5333 0 12.7917 0.229167 13.975 0.6875C15.1583 1.14583 16.1958 1.77917 17.0875 2.5875C17.9792 3.39583 18.6875 4.35417 19.2125 5.4625C19.7375 6.57083 20 7.76667 20 9.05C20 10.9667 19.4167 12.4375 18.25 13.4625C17.0833 14.4875 15.6667 15 14 15H12.15C12 15 11.8958 15.0417 11.8375 15.125C11.7792 15.2083 11.75 15.3 11.75 15.4C11.75 15.6 11.875 15.8875 12.125 16.2625C12.375 16.6375 12.5 17.0667 12.5 17.55C12.5 18.3833 12.2708 19 11.8125 19.4C11.3542 19.8 10.75 20 10 20ZM4.5 11C4.93333 11 5.29167 10.8583 5.575 10.575C5.85833 10.2917 6 9.93333 6 9.5C6 9.06667 5.85833 8.70833 5.575 8.425C5.29167 8.14167 4.93333 8 4.5 8C4.06667 8 3.70833 8.14167 3.425 8.425C3.14167 8.70833 3 9.06667 3 9.5C3 9.93333 3.14167 10.2917 3.425 10.575C3.70833 10.8583 4.06667 11 4.5 11ZM7.5 7C7.93333 7 8.29167 6.85833 8.575 6.575C8.85833 6.29167 9 5.93333 9 5.5C9 5.06667 8.85833 4.70833 8.575 4.425C8.29167 4.14167 7.93333 4 7.5 4C7.06667 4 6.70833 4.14167 6.425 4.425C6.14167 4.70833 6 5.06667 6 5.5C6 5.93333 6.14167 6.29167 6.425 6.575C6.70833 6.85833 7.06667 7 7.5 7ZM12.5 7C12.9333 7 13.2917 6.85833 13.575 6.575C13.8583 6.29167 14 5.93333 14 5.5C14 5.06667 13.8583 4.70833 13.575 4.425C13.2917 4.14167 12.9333 4 12.5 4C12.0667 4 11.7083 4.14167 11.425 4.425C11.1417 4.70833 11 5.06667 11 5.5C11 5.93333 11.1417 6.29167 11.425 6.575C11.7083 6.85833 12.0667 7 12.5 7ZM15.5 11C15.9333 11 16.2917 10.8583 16.575 10.575C16.8583 10.2917 17 9.93333 17 9.5C17 9.06667 16.8583 8.70833 16.575 8.425C16.2917 8.14167 15.9333 8 15.5 8C15.0667 8 14.7083 8.14167 14.425 8.425C14.1417 8.70833 14 9.06667 14 9.5C14 9.93333 14.1417 10.2917 14.425 10.575C14.7083 10.8583 15.0667 11 15.5 11ZM10 18C10.15 18 10.2708 17.9583 10.3625 17.875C10.4542 17.7917 10.5 17.6833 10.5 17.55C10.5 17.3167 10.375 17.0417 10.125 16.725C9.875 16.4083 9.75 15.9333 9.75 15.3C9.75 14.6 9.99167 14.0417 10.475 13.625C10.9583 13.2083 11.55 13 12.25 13H14C15.1 13 16.0417 12.6792 16.825 12.0375C17.6083 11.3958 18 10.4 18 9.05C18 7.03333 17.2292 5.35417 15.6875 4.0125C14.1458 2.67083 12.3167 2 10.2 2C7.93333 2 6 2.775 4.4 4.325C2.8 5.875 2 7.76667 2 10C2 12.2167 2.77917 14.1042 4.3375 15.6625C5.89583 17.2208 7.78333 18 10 18Z"
                    fill="#646464"
                  />
                </svg>

                <h1 className="text-lg font-medium tracking-wide text-[#646464] cursor-pointer">
                  Colors
                </h1>
              </div>
              <div className="flex items-center">
                <img
                  className="min-w-[14px] min-h-[14px]"
                  src="\images\auth\candidate\arrow_forward_ios.png"
                  style={{
                    height: "14px",
                    width: "14px",
                    objectFit: "contain",
                  }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {view && (
        <div
          style={{
            // visibility: view ? "visible" : "hidden",
            height: view ? "auto" : "0px",
            opacity: view ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <div className=" flex  gap-2 flex-col">
            <div className=" flex flex-wrap gap-2">
              {THEME_COLORS.map((color, idx) => (
                <div
                  key={idx}
                  className={`${
                    selectedColor === color ? "border" : ""
                  } rounded-[7px] h-[36px] w-[36px]   border-[#06A9EF] p-[2px] transition-transform duration-300 ease-in-out hover:scale-110`}
                >
                  <div
                    className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[5px]  text-sm text-white  `}
                    style={{ backgroundColor: color }}
                    key={idx}
                    onClick={() => handleColorClick(color)}
                  >
                    {selectedColor === color ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <ChromePicker
                color={selectedColor}
                onChange={handleColorChange}
              />
            </div>
          </div>
          <div>
            <div className="mt-2 flex flex-wrap gap-3">
              {fontFamily.map((font, idx) => (
                <div
                  className={`flex h-[40px] w-[110px] cursor-pointer items-center justify-center rounded-md text-sm border transition-transform duration-300 ease-in-out hover:scale-105 ${
                    selectedFont === font ? "text-white" : ""
                  }`}
                  style={{
                    backgroundColor: selectedFont === font ? "#06A9EF" : "",
                    fontFamily: font,
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  key={idx}
                  onClick={() => handleFontClick(font)}
                >
                  {font}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewFont && (
        <div
          style={{
            // visibility: viewFont ? "visible" : "hidden",
            height: viewFont ? "auto" : "0px",
            opacity: viewFont ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          <div className=" flex  gap-2 flex-col">
            <div className="mt-2 flex flex-wrap gap-3">
              {fontFamily.map((font, idx) => (
                <div
                  className={`flex h-[40px] w-[110px] cursor-pointer items-center justify-center rounded-md text-sm border transition-transform duration-300 ease-in-out hover:scale-105 ${
                    selectedFont === font ? "text-white" : ""
                  }`}
                  style={{
                    backgroundColor: selectedFont === font ? "#06A9EF" : "",
                    fontFamily: font,
                    fontWeight: "500",
                    fontSize: "16px",
                  }}
                  key={idx}
                  onClick={() => handleFontClick(font)}
                >
                  {font}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {showColor && (
        <div
          style={{
            // visibility: showColor ? "visible" : "hidden",
            height: showColor ? "auto" : "0px",
            opacity: showColor ? 1 : 0,
            transition: "opacity 0.2s",
          }}
          className="mt-2"
        >
          <div className=" flex  gap-2 flex-col">
            <div className=" flex flex-wrap gap-2">
              {THEME_COLORS.map((color, idx) => (
                <div
                  key={idx}
                  className={`${
                    selectedColor === color ? "border" : ""
                  } rounded-[7px] h-[36px] w-[36px]   border-[#06A9EF] p-[2px] transition-transform duration-300 ease-in-out hover:scale-110`}
                >
                  <div
                    className={`flex h-full w-full cursor-pointer items-center justify-center rounded-[5px]  text-sm text-white  `}
                    style={{ backgroundColor: color }}
                    key={idx}
                    onClick={() => handleColorClick(color)}
                  >
                    {selectedColor === color ? "✓" : ""}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <ChromePicker
                color={selectedColor}
                onChange={handleColorChange}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeForm;
