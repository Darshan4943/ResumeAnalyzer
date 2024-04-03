import React from "react";
import ReactSelect from "react-select";
import { camelCase } from "../../../utils/middleware";
import { SkillList } from "../../../utils/data";
import Editor from "../../../components/editor/Editor";

const Rightform = () => {
  return (
    <div className="flex flex-col w-[50%] gap-[24px]">
      <div className="flex flex-col w-full gap-[16px]">
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Job Title
          </label>
          <input
            type="text"
            placeholder="Add job title / role"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Job Description
          </label>
          <Editor/>
        </div>
      </div>
      <div className="flex flex-col w-full gap-[16px]">
        <span className="text-[18px] text-[#333333] font-medium">Salary</span>
        <div className="flex flex-row justify-between">
          <div className=" w-[31%] flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Job Title
            </label>
            <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] overflow-hidden h-[48px]">
              <select
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  position: "relative",
                  zIndex: 1,
                  background: " transparent",
                }}
                className="w-outline-none focus-visible:outline-none  p-2 w-full h-[48px] "
              >
                <option value="">Select</option>
                <option value="">Annual</option>
                <option value="">Monthly</option>
              </select>

              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px] absolute right-[4px]"
                alt=""
              />
            </div>
          </div>
          <div className=" w-[31%] flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Min Salary
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-[#DEDEDE] rounded-[6px] py-[8px] px-[16px] "
            />
          </div>
          <div className=" w-[31%] flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Max Salary
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-[#DEDEDE] rounded-[6px] py-[8px] px-[16px] "
            />
          </div>
        </div>
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Required Qualtification
          </label>
          <input
            type="text"
            placeholder="Required Qualtification"
            className="input"
          />
        </div>
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Required Skills
          </label>
          <ReactSelect
            options={SkillList.map((item) => ({
              value: item,
              label: camelCase(item),
            }))}
            className="w-full"
            // onChange={handleChange}
            // value={isClearable}
          />
        </div>
        <div className="flex flex-row justify-between">
          <div className=" w-[48%] flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Application Deadline
            </label>
            <input
              type="date"
              placeholder="Required Qualtification"
              className="border border-[#DEDEDE] rounded-[6px] py-[8px] px-[16px]"
            />
          </div>
          <div className=" w-[48%] flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Experience
            </label>
            <div className="flex items-center rounded-lg border border-[#DEDEDE] bg-white text-[14px]  font-montserrat font-small relative min-w-[100px] overflow-hidden h-[48px]">
              <select
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                  position: "relative",
                  background: " transparent",
                }}
                className="w-outline-none focus-visible:outline-none  p-2 w-full h-[48px] "
              >
                <option value="">Select</option>
                <option value="">Annual</option>
                <option value="">Monthly</option>
              </select>

              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px] absolute right-[4px]"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rightform;
