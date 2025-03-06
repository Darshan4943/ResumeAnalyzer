import { useRouter } from "next/router";
import React, { useState } from "react";
import MiniLoader from "../../components/common/mini-loader";
import Select from "react-select";

function Index() {
  const router = useRouter();
  const [loadingg, setLoadingg] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: "",
    company: "",
    jobRole: "",
    employmentType: "",
    workArrangement: " ",
    location: "",
    requiredEducation: "",
    requiredExperience: "",
    requiredSkills: "",
    salaryRange: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  const options = [
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
  ];

  const options2 = [
    { value: "Work from home", label: "Work from home" },
    { value: "Hybrid", label: "Hybrid" },
    { value: "On-site", label: "On-site" },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #DEDEDE",
      padding: "0 16px",
      height: "40px",
      borderRadius: "8px",
      fontSize: "14px",
      fontWeight: "400",
      outline: "none",
      boxShadow: "none",
    }),
    placeholder: (provided) => ({
      ...provided,
      fontSize: "14px",
    }),
  };

  const previousPage = () => router.back();
  const resetFormData = () => {
    setFormData({
      jobTitle: "",
      company: "",
      jobRole: "",
      employmentType: "",
      workArrangement: " ",
      location: "",
      requiredEducation: "",
      requiredExperience: "",
      requiredSkills: "",
      salaryRange: "",
    });
  };

  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex gap-3 scr340:text-[16px] text-[16px] font-[600] text-[#333333] items-center">
        <svg
          onClick={previousPage}
          viewBox="0 0 24 24"
          fill="none"
          className="cursor-pointer text-[18px] font-[500]  w-[20px] h-[24px] scr340:w-[24px]"
        >
          <path
            d="M7.371 12.7481L12.5402 17.9174C12.6889 18.066 12.7623 18.24 12.7605 18.4394C12.7585 18.6387 12.68 18.8159 12.525 18.9711C12.3698 19.1159 12.1942 19.1909 11.998 19.1961C11.8018 19.2013 11.6262 19.1263 11.471 18.9711L5.13075 12.6309C5.03708 12.5372 4.97108 12.4384 4.93275 12.3346C4.89425 12.2308 4.875 12.1186 4.875 11.9981C4.875 11.8776 4.89425 11.7654 4.93275 11.6616C4.97108 11.5578 5.03708 11.459 5.13075 11.3654L11.471 5.0251C11.6095 4.8866 11.781 4.81577 11.9855 4.8126C12.19 4.80943 12.3698 4.88027 12.525 5.0251C12.68 5.18027 12.7575 5.35844 12.7575 5.5596C12.7575 5.76094 12.68 5.93918 12.525 6.09435L7.371 11.2481H18.748C18.9608 11.2481 19.139 11.3199 19.2825 11.4636C19.4262 11.6071 19.498 11.7853 19.498 11.9981C19.498 12.2109 19.4262 12.3891 19.2825 12.5326C19.139 12.6763 18.9608 12.7481 18.748 12.7481H7.371Z"
            fill="#1C1B1F"
          />
        </svg>
        JD Creation
      </div>

      <div className=" gap-[32px] bg-[#FFFFFF] rounded-[16px] w-full scr800:p-6 p-3">
        <div>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Job Title</label>
                <input
                  type="text"
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="Enter Job Title"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                />
              </div>
              <div className="flex flex-col">
                <label className=" mb-1">Company</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter Job Role Name"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Job Role</label>
                <input
                  type="text"
                  name="jobRole"
                  value={formData.jobRole}
                  onChange={handleChange}
                  placeholder="Enter Job Role Name"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                />
              </div>

              <div className="flex flex-col">
                <label className="mb-1">Employment Type</label>
                <Select
                  options={options}
                  value={options.find(
                    (option) => option.value === formData.employmentType
                  )}
                  onChange={(selectedOption) =>
                    handleChange({
                      target: {
                        name: "employmentType",
                        value: selectedOption?.value,
                      },
                    })
                  }
                  styles={customStyles}
                  placeholder="Select Employment Type"
                />
              </div>
              <div className="flex flex-col">
                <label className=" mb-1">Specify the work arrangement</label>
                <Select
                  options={options2}
                  value={
                    options2.find(
                      (option) => option.value === formData.workArrangement
                    ) || null
                  }
                  onChange={(selectedOption) =>
                    handleChange({
                      target: {
                        name: "workArrangement",
                        value: selectedOption?.value || "",
                      },
                    })
                  }
                  styles={customStyles}
                  placeholder="Select Work Arrangement"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter Department Name"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Required Education</label>
                <input
                  type="text"
                  name="requiredEducation"
                  value={formData.requiredEducation}
                  onChange={handleChange}
                  placeholder="Enter Required Education"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400] "
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">
                  Required Experience
                </label>
                <input
                  type="text"
                  name="requiredExperience"
                  value={formData.requiredExperience}
                  onChange={handleChange}
                  placeholder="Enter Required Experience"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-600 mb-1">Required Skills</label>
                <input
                  type="text"
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                  placeholder="Enter Required Skills"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                />
              </div>

              <div className="flex flex-col col-span-3 w-[424px]">
                <label className="text-gray-600 mb-1">Salary Range</label>
                <input
                  type="text"
                  name="salaryRange"
                  value={formData.salaryRange}
                  onChange={handleChange}
                  placeholder="Enter Salary Range"
                  className="border border-[#DEDEDE] px-[16px] h-[40px] justify-center rounded-[8px] placeholder:text-[14px] font-[400]"
                />
              </div>
            </div>

            <div className="flex items-center">
              <div className="flex justify-start p-[10px] md:p-4 w-full">
                {" "}
                <button
                  onClick={previousPage}
                  className="text-[12px] text-[#B3261E]  md:text-[14px] items-center cursor-pointer flex justify-start font-semibold px-4 py-1 sm:px-9 sm:py-3 border-2 border-[#B3261E] rounded-full"
                >
                  Cancel
                </button>
              </div>
              <div className="flex justify-end p-[10px] md:p-4 w-full">
                <div className="flex gap-[4px] md:gap-[14px]">
                  <button
                    onClick={resetFormData}
                    className="text-[12px] items-center  md:text-[14px]  cursor-pointer flex justify-start font-semibold px-4 py-1 sm:px-9 sm:py-3 border-2 border-[#06A9EF] rounded-full"
                  >
                    Reset
                  </button>

                  {loadingg ? (
                    <div className="flex justify-center items-center text-sm font-semibold text-white px-6 py-1 sm:px-9 sm:py-3 bg-[#06A9EF] border-[#06A9EF] rounded-full hover:bg-white border-2 border-transparent hover:text-black cursor-pointer transition duration-300 w-[158.25px]">
                      <MiniLoader />
                    </div>
                  ) : (
                    <button
                      // onClick={handleSubmit}
                      className="text-[12px] md:text-[14px] font-semibold text-white px-6 py-1 sm:px-9  bg-[#06A9EF] border-[#06A9EF] rounded-full hover:bg-white border-2 border-transparent hover:text-black cursor-pointer transition duration-300 h-[48.2px]"
                    >
                      Create
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Index;
