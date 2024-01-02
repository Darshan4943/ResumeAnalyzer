import React from "react";

function AddCertificate({ setAddCertificate }) {
  return (
    <div
      className="flex flex-col gap-4 p-6 bg-[#fff] rounded-[16px]"
      style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4 justify-between">
          <p className="text-[#25324B] text-[24px] font-[500] leading-[160%]">
            Add Certification
          </p>

          <div className="h-[1px] bg-[#DEDEDE] flex items-center w-[60%]"></div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
          >
            <g mask="url(#mask0_5716_140784)">
              <path
                d="M10.5251 30.9486L9.05078 29.4743L18.5251 19.9999L9.05078 10.5256L10.5251 9.05127L19.9994 18.5256L29.4738 9.05127L30.9481 10.5256L21.4738 19.9999L30.9481 29.4743L29.4738 30.9486L19.9994 21.4743L10.5251 30.9486Z"
                fill="#646464"
              />
            </g>
          </svg>
        </div>
        <p className="text-[#646464] text-[14px] font-[400]">
          Add details of Certifications you have completed
        </p>
      </div>

      <div className="flex flex-col gap-2 items-start">
        <p className="text-[#333] text-[16px] font-[500] ">
          Certification Name<span className="text-[#C00000]">*</span>
        </p>
        <input
          type="text"
          className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
          placeholder="Enter certification name here"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <p className="text-[#333] text-[16px] font-[500] ">
          Certification Provider
        </p>
        <input
          type="text"
          className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
          placeholder="Enter your certification provider"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <p className="text-[#333] text-[16px] font-[500] ">Certification ID</p>
        <input
          type="text"
          className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
          placeholder="Enter your course completion ID"
        />
      </div>

      <div className="flex flex-col gap-2 items-start">
        <p className="text-[#333] text-[16px] font-[500] ">Certification URL</p>
        <input
          type="text"
          className="flex py-[8px] px-[16px] items-center rounded-[8px] bg-[#fff] border-[1px] border-solid border-[#DEDEDE] w-[100%]"
          placeholder="Enter your certification URL"
        />
      </div>

      <div className="flex items-start gap-[16px] justify-between">
        <div className="flex gap-[8px] flex-col">
          <p className="text-[16px] text-[#333] font-[500] leading-normal">
            Issued On
          </p>

          <div className="flex items-start gap-[16px]">
            <label for="cars"></label>
            <select
              name="cars"
              className="flex py-[8px] px-[16px] items-center rounded-[8px]  bg-[#fff] border-[1px] border-solid border-[#DEDEDE]"
              id="cars"
            >
              <option value="volvo">Month</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <label for="cars"></label>
            <select
              name="cars"
              className="flex py-[8px] px-[16px] items-center rounded-[8px]  bg-[#fff] border-[1px] border-solid border-[#DEDEDE]"
              id="cars"
            >
              <option value="volvo">Month</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>

        <div className="flex gap-[8px] flex-col">
          <p className="text-[16px] text-[#333] font-[500] leading-normal">
            Issued On
          </p>
          <div className="flex items-start gap-[16px]">
            <label for="cars"></label>
            <select
              name="cars"
              className="flex py-[8px] px-[16px] items-center rounded-[8px]  bg-[#fff] border-[1px] border-solid border-[#DEDEDE]"
              id="cars"
            >
              <option value="volvo">Month</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
            <label for="cars"></label>
            <select
              name="cars"
              className="flex py-[8px] px-[16px] items-center rounded-[8px]  bg-[#fff] border-[1px] border-solid border-[#DEDEDE]"
              id="cars"
            >
              <option value="volvo">Month</option>
              <option value="saab">Saab</option>
              <option value="mercedes">Mercedes</option>
              <option value="audi">Audi</option>
            </select>
          </div>
        </div>
      </div>
      <div className="flex justify-end items-start self-stretch gap-[12px]">
        <button className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px]    text-[16px] font-[500] border-[1px] border-solid border-[#06A9EF]">
          Cancel
        </button>
        <button className="flex py-[8px] px-[16px] justify-center items-center rounded-[8px] bg-[#06A9EF] text-[#fff]  text-[16px] font-[500] border-[1px] border-solid border-[#06A9EF]">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default AddCertificate;
