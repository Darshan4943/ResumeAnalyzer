import React from "react";
import { dateSeter } from "../../../utils/middleware";

const Details = ({ jobPost }) => {
  return (
    <div className="py-[16px] sm:px-[24px] px-2 flex flex-col gap-[24px]  ">
      <div className="w-full">
        <span className="text-[20px] text-[#333333] font-semibold">
          {jobPost?.jobTitle}
        </span>
      </div>
      <div className="flex md:flex-row flex-col flex-wrap justify-between">
        <div className="flex flex-col md:w-[48%] w-full gap-[16px]">
          <div className="flex flex-col gap-[8px] border-b-[1px] border-[#bebebe] pb-[16px]">
            <span className="text-[18px] text-[#333333] font-medium">
              {jobPost?.jobTitle}
            </span>
            <span className="text-[12px] text-[#333333] font-medium">
              {jobPost?.companyName}
            </span>
            <div className="flex flex-row gap-[4px] items-center">
              <svg
                width="10"
                height="13"
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.93699 6.74154C5.25707 6.74154 5.53108 6.6273 5.75902 6.39883C5.98695 6.17036 6.10092 5.8957 6.10092 5.57487C6.10092 5.25404 5.98695 4.97938 5.75902 4.75091C5.53108 4.52244 5.25707 4.4082 4.93699 4.4082C4.61691 4.4082 4.3429 4.52244 4.11496 4.75091C3.88702 4.97938 3.77305 5.25404 3.77305 5.57487C3.77305 5.8957 3.88702 6.17036 4.11496 6.39883C4.3429 6.6273 4.61691 6.74154 4.93699 6.74154ZM4.93699 11.029C6.12032 9.94015 6.99812 8.95091 7.57039 8.06133C8.14266 7.17175 8.42879 6.38181 8.42879 5.69154C8.42879 4.63181 8.09174 3.76411 7.41762 3.08841C6.74351 2.41272 5.91663 2.07487 4.93699 2.07487C3.95734 2.07487 3.13046 2.41272 2.45635 3.08841C1.78224 3.76411 1.44518 4.63181 1.44518 5.69154C1.44518 6.38181 1.73132 7.17175 2.30359 8.06133C2.87585 8.95091 3.75365 9.94015 4.93699 11.029ZM4.93699 12.5749C3.37538 11.2429 2.20902 10.0058 1.43791 8.86341C0.666803 7.72105 0.28125 6.66376 0.28125 5.69154C0.28125 4.2332 0.749249 3.0714 1.68525 2.20612C2.62124 1.34084 3.70516 0.908203 4.93699 0.908203C6.16882 0.908203 7.25273 1.34084 8.18873 2.20612C9.12473 3.0714 9.59273 4.2332 9.59273 5.69154C9.59273 6.66376 9.20717 7.72105 8.43607 8.86341C7.66496 10.0058 6.4986 11.2429 4.93699 12.5749Z"
                  fill="#333333"
                />
              </svg>

              <span className="text-[12px] text-[#333333] font-medium">
                {jobPost?.location?.join(" , ")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[8px] border-b-[1px] border-[#DEDEDE] pb-[16px]">
            <span className="text-[18px] text-[#333333] font-medium">
              Qualifications
            </span>
            <span className="text-[12px] text-[#333333] font-medium">
              {jobPost?.requiredQualification}
            </span>
          </div>
          <div className="flex flex-col gap-[8px] pb-[16px]">
            <span className="text-[18px] text-[#333333] font-medium">
              Full job Description
            </span>
            <div
              className="html-content text-[12px] "
              dangerouslySetInnerHTML={{ __html: jobPost?.description }}
            />
          </div>
        </div>
        <div className="flex flex-col md:w-[48%] w-full gap-[24px]">
          <span className="text-[18px] text-[#333333] font-medium">
            About this role
          </span>
          <div className="flex flex-col gap-[16px]">
            {" "}
            <div className="bg-[#F8F8FD] p-[16px] ">
              <span className="text-[16px] text-[#333333] font-semibold">
                {jobPost?.applications?.length} Applicants
              </span>
            </div>
            <div className="w-full flex flex-row justify-between">
              <span className="text-[16px] text-[#333333] font-normal">
                Apply Before
              </span>
              <span className="text-[16px] text-[#333333] font-semibold">
                {dateSeter(jobPost?.deadLine)}
              </span>
            </div>
            <div className="w-full flex flex-row justify-between">
              <span className="text-[16px] text-[#333333] font-normal">
                Job Posted On
              </span>
              <span className="text-[16px] text-[#333333] font-semibold">
                {dateSeter(jobPost?.createdAt)}
              </span>
            </div>
            <div className="w-full flex flex-row justify-between">
              <span className="text-[16px] text-[#333333] font-normal">
                Salary
              </span>
              <span className="text-[16px] text-[#333333] font-semibold">
                {jobPost?.minSalary} - {jobPost?.maxSalary}
              </span>
            </div>
          </div>
          <div className=" border-b-[1px] border-[#DEDEDE] w-full h-[1px]"></div>
          <div className="flex flex-col gap-[16px]">
            <span className="text-[16px] text-[#333333] font-semibold">
              Required Skills{" "}
            </span>
            <div className="flex flex-row flex-wrap gap-[12px]">
              {jobPost?.skills?.map((item, index) => (
                <div
                  key={index}
                  className="text-[14px] text-[#333333] text-medium py-[8px] rounded-[25px] px-[16px] border border-[#06A9EF]"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
