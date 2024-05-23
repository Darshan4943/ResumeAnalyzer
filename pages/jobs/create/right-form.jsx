import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";
import { camelCase } from "../../../utils/middleware";
import { SkillList } from "../../../utils/data";
import Tiptap from "../../../components/editor/Tiptap";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const Rightform = ({
  data,
  setData,
  file,
  croppedImage,
  isEditable,
  id,
  validateInput,
  formError,
  setFormError,
}) => {
  const [loading, setLoading] = useState(false);
  const userDataGlobal = useSelector((state) => state.userData);
  const router = useRouter();
  const [skills, setSkills] = useState(SkillList);
  const [skillText, setSkillText] = useState("");


  const postJob = () => {
    let hasError = false;

    if (!data.mustSkills || data.mustSkills.length === 0) {
      setFormError((formError) => ({
        ...formError,
        mustSkills: "Must have Skills are required",
      }));
      hasError = true;
    }

    if (!data.goodSkills || data.goodSkills.length === 0) {
      setFormError((formError) => ({
        ...formError,
        goodSkills: " Good to have Skills are required",
      }));
      hasError = true;
    }

    if (!data.location || data.location.length === 0) {
      setFormError((formError) => ({
        ...formError,
        location: "Location is required",
      }));
      hasError = true;
    }

    const requiredFields = ["companyName", "jobTitle"];
    const emptyFields = requiredFields.filter((field) => !data[field]);

    if (emptyFields.length > 0) {
      toast.error("Please fill in all required fields");
      emptyFields.forEach((field) => {
        setFormError((formError) => ({
          ...formError,
          [field]: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } is required`,
        }));
      });
      hasError = true;
    }

    if (hasError) {
      return;
    }

    setLoading(true);
    const formData = new FormData();
    if (Object.keys(data).length > 0) {
      Object.keys(data).forEach((key) => {
        if (Array.isArray(data[key]) && data[key].length > 0) {
          formData.append(key, JSON.stringify(data[key]));
        } else {
          formData.append(key, data[key]);
        }
      });
    }
    if (croppedImage) {
      formData.append("logo", croppedImage.blob);
      formData.append("fileName", file.name);
    }
    formData.append("createdBy", userDataGlobal._id);
    axios
      .post("https://freedygoservices.in/api/job/add/" + id, formData)
      .then((res) => {
        if (id) {
          toast.success("Job Post Updated Successfully");
        } else {
          toast.success("Job Post Created Successfully");
        }
        setLoading(false);
        router.push("/jobs/list");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="flex flex-col md:w-[50%] w-full gap-[24px] ml:pt-0 pt-6">
      <div className="flex flex-col w-full gap-[16px]">
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Job Title <span className="text-red">*</span>
          </label>
          <input
            type="text"
            placeholder="Add job title / role"
            className="input"
            value={data?.jobTitle}
            onChange={(e) => {
              setData({ ...data, jobTitle: e.target.value });
              validateInput("jobTitle", e.target.value);
            }}
          />
          {formError && (
            <p className="text-[12px] text-[red] font-[500]">
              {formError.jobTitle}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col w-full gap-[16px]">
        <span className="text-[18px] text-[#333333] font-medium">Salary</span>
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between">
          <div className=" sm:w-[31%] w-full flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Salary Type
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
                value={data?.salaryType}
                onChange={(e) => {
                  setData({ ...data, salaryType: e.target.value });
                }}
                className="w-outline-none focus-visible:outline-none  p-2 w-full h-[48px] "
              >
                <option value="Select">Select</option>
                <option value="Annual">Annual</option>
                <option value="Monthly">Monthly</option>
              </select>

              <img
                src="/images/down_arrow.png"
                className="h-[20px] w-[20px] absolute right-[4px]"
                alt=""
              />
            </div>
          </div>
          <div className=" sm:w-[31%] w-full flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Min Salary
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-[#DEDEDE] rounded-[6px] py-[8px] px-[16px] "
              value={data?.minSalary}
              onChange={(e) => {
                setData({ ...data, minSalary: e.target.value });
              }}
            />
          </div>
          <div className="sm:w-[31%] w-full flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Max Salary
            </label>
            <input
              type="text"
              placeholder=""
              className="border border-[#DEDEDE] rounded-[6px] py-[8px] px-[16px] "
              value={data?.maxSalary}
              onChange={(e) => {
                setData({ ...data, maxSalary: e.target.value });
              }}
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
            value={data?.requiredQualification}
            onChange={(e) => {
              setData({ ...data, requiredQualification: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label className="text-[#333333] text-[14px] font-medium">
            Must have Skills <span className="text-red">*</span>
          </label>
          <ReactSelect
            onInputChange={(data) => {
              setSkills([data, ...skills]);
            }}
            options={skills.map((item) => ({
              value: item,
              label: camelCase(item),
            }))}
            className="w-full"
            onChange={(mustSkill) => {
              setData({
                ...data,
                mustSkills: [...data.mustSkills, mustSkill.value],
              });

              setFormError({});
            }}
          />
          {formError && (
            <p className="text-[12px] text-[red] font-[500]">
              {formError.mustSkills}
            </p>
          )}
          <div className="flex flex-row flex-wrap gap-3">
            {data?.mustSkills?.map((item, index) => (
              <div
                key={index}
                className="py-[4px] px-[8px] bg-[#effaff] rounded-[8px] flex flex-row gap-3 items-center "
              >
                <span> {item}</span>
                <span
                  className="text-[14px]  cursor-pointer font-medium "
                  onClick={() =>
                    setData({
                      ...data,
                      mustSkills: data.mustSkills.filter(
                        (data) => data != item
                      ),
                    })
                  }
                >
                  X
                </span>
              </div>
            ))}
          </div>

          <label className="text-[#333333] text-[14px] font-medium mt-[12px]">
            Good to have Skills <span className="text-red">*</span>
          </label>
          <ReactSelect
            options={SkillList.map((item) => ({
              value: item,
              label: camelCase(item),
            }))}
            onInputChange={(data) => {
              setSkills([data, ...skills]);
            }}
            className="w-full"
            onChange={(goodSkill) => {
              setData({
                ...data,
                goodSkills: [...data.goodSkills, goodSkill.value],
              });

              setFormError({});
            }}
          />
          {formError && (
            <p className="text-[12px] text-[red] font-[500]">
              {formError.goodSkills}
            </p>
          )}

          <div className="flex flex-row flex-wrap gap-3">
            {data?.goodSkills?.map((item, index) => (
              <div
                key={index}
                className="py-[4px] px-[8px] bg-[#effaff] rounded-[8px] flex flex-row gap-3 items-center "
              >
                <span> {item}</span>
                <span
                  className="text-[14px]  cursor-pointer font-medium "
                  onClick={() =>
                    setData({
                      ...data,
                      goodSkills: data.goodSkills.filter(
                        (data) => data != item
                      ),
                    })
                  }
                >
                  X
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex sm:flex-row flex-col sm:gap-0 gap-4 justify-between">
          <div className=" sm:w-[48%] w-full flex flex-col gap-[8px] ">
            <label className="text-[#333333] text-[14px] font-medium">
              Application Deadline
            </label>
            <input
              type="date"
              placeholder="Required Qualtification"
              className="border border-[#DEDEDE] rounded-[6px] py-[8px] px-[16px]"
              value={data?.deadLine}
              onChange={(e) => {
                setData({ ...data, deadLine: e.target.value });
              }}
            />
          </div>
          <div className=" sm:w-[48%] w-full flex flex-col gap-[8px] ">
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
                value={data?.experiance}
                onChange={(e) => {
                  setData({ ...data, experiance: e.target.value });
                }}
                className="w-outline-none focus-visible:outline-none  p-2 w-full h-[48px] "
              >
                <option value="">Select</option>
                <option value="0-2 years">0-2 years </option>
                <option value="2-5 years">2-5 years </option>
                <option value="5-10 years">5-10 years</option>
                <option value="10-20 years">10-20 years</option>
                <option value="20 +">20 +</option>
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
      <div className="flex flex-row justify-between">
        <button className="rounded-[12px] py-[12px] px-[24px] border border-[#06A9EF] text-[16px] font-medium text-[#333333]">
          Cancel
        </button>
        <button
          className="rounded-[12px] py-[12px] px-[24px] border bg-[#06A9EF] border-[#06A9EF] text-[16px] font-medium text-[#ffffff] w-[190px]"
          onClick={postJob}
        >
          {loading ? (
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 me-3  animate-spin"
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
          ) : id ? (
            "Update Job Post"
          ) : (
            " Create Job Post"
          )}
        </button>
      </div>
    </div>
  );
};

export default Rightform;
