import React, { useState } from "react";
import Select from "react-select";
import ReactSelect from "react-select";
import { telCode, SkillList } from "../../utils/data";
import { camelCase } from "../../utils/middleware";
function ManualForm({
  setResumeCount,
  resumeCount,
  JobMatchforSkilotechCollection,
  data,
  setData,
}) {
  const [loactionText, setLoactionText] = useState("");
  const [skills, setSkills] = useState(SkillList);
  const [formError, setFormError] = useState({});

  const countryOptions = telCode.map((country) => ({
    value: country.name,
    label: country.name,
  }));
  const handleCountryChange = (selectedCountries) => {
    setFormError((prevErrors) => ({
      ...prevErrors,
      country: "",
    }));
    setData({
      ...data,
      country: selectedCountries
        ? selectedCountries.map((country) => country.value)
        : [],
    });
  };

  const customStylesss = {
    control: (provided, state) => ({
      ...provided,
      border: formError.country ? "1px solid red" : "1px solid #DEDEDE",
      borderRadius: "8px",
      padding: "2px 8px",
      flexWrap: "wrap",
      overflowX: "auto",
      boxShadow: state.isFocused ? "0 0 0 1px #DEDEDE" : "none",
    }),
    valueContainer: (base) => ({
      ...base,
      display: "flex",
      flexWrap: "nowrap",
      overflowX: "auto",
      gap: "4px",
      padding: "2px 4px",
      scrollbarWidth: "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#767676",
      fontSize: "12px",
      fontWeight: "400",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 10,
      scrollbarWidth: "none",
      "-ms-overflow-style": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#EFFAFF",
      borderRadius: "4px",
      minWidth: "90px",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#06A9EF",
      fontWeight: "500",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#9A4545",
      "&:hover": {
        backgroundColor: "transparent",
      },
    }),
  };
  return (
    <div className="flex flex-col gap-4">
      <div className="text-[16px] font-semibold">
        Please fill out the form to request a CV from Skilotech
      </div>
      <div className=" grid grid-cols-12 gap-4">
        <div className="flex flex-col gap-2 text-[14px] font-medium scr1300:col-span-6 scr1024:col-span-6 col-span-12">
          <div className="text-[14px] font-[500]">
            Designation
          </div>
          <input
            type="text"
            value={data.jobTitle}
            placeholder="Add job title / role"
            onChange={(e) => setData({ ...data, jobTitle: e.target.value })}
            className="border rounded-[8px] p-2 border-[#DEDEDE] placeholder:text-[12px] font-normal h-[41.6px] "
          />
        </div>
        <div className="flex flex-col gap-[8px] scr1300:col-span-6 scr1024:col-span-6 col-span-12 ">
          <div className="text-sm font-medium">
            Key Skills
            <span className="text-[red]">*</span>
          </div>
          <ReactSelect
            isMulti
            onInputChange={(data) => {}}
            options={skills
              .filter((item) => item.trim() !== "")
              .map((item) => ({
                value: item,
                label: camelCase(item),
              }))}
            className={`w-full withoutBorder ${
              formError.mustSkills ? "border-red" : "border-[#DEDEDE]"
            }`}
            value={
              data.mustSkills
                ? data.mustSkills.map((skill) => ({
                    value: skill,
                    label: camelCase(skill),
                  }))
                : []
            }
            onChange={(selectedOptions) => {
              const newMustSkills = selectedOptions
                ? selectedOptions.map((option) => option.value)
                : [];

              if (newMustSkills.length > data?.mustSkills?.length) {
                setFormError((prevErrors) => ({
                  ...prevErrors,
                  mustSkills: "",
                }));
              }

              setData({
                ...data,
                mustSkills: newMustSkills,
              });
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && event.target.value.trim()) {
                const newSkill = event.target.value.trim();

                if (!skills.includes(newSkill)) {
                  setSkills((prevSkills) => [...prevSkills, newSkill]);
                }

                event.target.value = "";
              }
            }}
            styles={{
              control: (provided, state) => ({
                ...provided,
                border: formError.mustSkills
                  ? "1px solid red"
                  : "1px solid #DEDEDE",
                borderRadius: "8px",
                padding: "2px 8px",
                flexWrap: "wrap",
                boxShadow: state.isFocused ? "0 0 0 1px #DEDEDE" : "none",
              }),
              valueContainer: (base) => ({
                ...base,
                display: "flex",
                flexWrap: "nowrap",
                gap: "4px",
                padding: "2px 4px",
                overflowX: "auto",
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }),
              placeholder: (provided) => ({
                ...provided,
                color: "#767676",
                fontSize: "12px",
                fontWeight: "400",
              }),
              menu: (provided) => ({
                ...provided,
                zIndex: 10,
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }),
              multiValue: (provided) => ({
                ...provided,
                backgroundColor: "#EFFAFF",
                borderRadius: "4px",
                minWidth: "90px",
              }),
              multiValueLabel: (provided) => ({
                ...provided,
                color: "#06A9EF",
                fontWeight: "500",
              }),
              multiValueRemove: (provided) => ({
                ...provided,
                color: "#9A4545",
                "&:hover": {
                  backgroundColor: "transparent",
                },
              }),
            }}
          />
        </div>
        <div className="flex flex-col gap-2 text-[14px] font-medium scr1300:col-span-6 scr1024:col-span-6 col-span-12">
          <div className="text-[14px] font-[500]">
            Year of Experience 
          </div>
          <input
            type="text"
            value={data.totalExperience}
            placeholder="Enter a year of experience"
            onChange={(e) =>
              setData({ ...data, totalExperience: e.target.value })
            }
            className="border rounded-[8px] p-2 border-[#DEDEDE] placeholder:text-[12px] font-normal h-[41.6px] "
          />
        </div>

        <div className="flex flex-col gap-[8px] scr1300:col-span-6 scr1024:col-span-6 col-span-12 ">
          <div className="text-[14px] font-[500]">
            Country
          </div>

          <Select
            isMulti
            options={countryOptions}
            onChange={handleCountryChange}
            value={countryOptions.filter((country) =>
              data?.country?.includes(country.value)
            )}
            placeholder="Select countries"
            styles={customStylesss}
            className={`border rounded-[8px] h-[41.6px]  withoutBorder ${
              formError.country ? "border-red" : "border-[#DEDEDE]"
            }`}
            classNamePrefix="select"
            onMenuClose={() => {
              setTimeout(() => {
                const scrollDiv = document.getElementById("scroll");
                if (scrollDiv) {
                  scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                }
              }, 100);
            }}
          />
        </div>
        {/* <div className="flex flex-col gap-[8px] scr1300:col-span-4 scr1024:col-span-6 col-span-12">
          <div className="text-[14px] font-[500]">
            Location 
          </div>
          <div
            className={`w-full flex gap-2  items-center border h-[41.6px]  rounded-[8px] px-2  ${
              formError.location ? "border-red" : "border-[#DEDEDE]"
            }`}
          >
            <div className="flex gap-4 w-[90%] items-center">
              {data?.location.length > 0 && (
                <div
                  id="scroll1"
                  className="flex flex-row  overflow-x-auto  [&::-webkit-scrollbar]:hidden scrollbar-none gap-2 "
                >
                  {data?.location?.map((item, index) => (
                    <div
                      key={index}
                      className=" h-[28px] py-[2px] px-[8px] bg-[#EFFAFF] rounded-[4px] flex flex-row gap-[12px] items-center text-[14px] "
                    >
                      <span className="text-[#06A9EF]">{item}</span>
                      <span
                        className="text-[14px]  cursor-pointer font-medium "
                        onClick={() =>
                          setData({
                            ...data,
                            location: data.location.filter(
                              (data) => data != item
                            ),
                          })
                        }
                      >
                        <svg
                          width="11"
                          height="10"
                          viewBox="0 0 11 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M0.773292 0.435637C0.923314 0.28566 1.12676 0.201408 1.33889 0.201408C1.55102 0.201408 1.75447 0.28566 1.90449 0.435637L5.33889 3.87004L8.77329 0.435637C8.84709 0.359229 8.93536 0.298283 9.03297 0.256356C9.13057 0.214429 9.23555 0.19236 9.34177 0.191436C9.44799 0.190513 9.55334 0.210755 9.65165 0.250979C9.74997 0.291204 9.83929 0.350607 9.91441 0.425721C9.98952 0.500835 10.0489 0.590157 10.0891 0.688474C10.1294 0.786791 10.1496 0.892135 10.1487 0.998358C10.1478 1.10458 10.1257 1.20956 10.0838 1.30716C10.0418 1.40476 9.9809 1.49304 9.90449 1.56684L6.47009 5.00124L9.90449 8.43564C10.0502 8.58652 10.1309 8.7886 10.129 8.99836C10.1272 9.20812 10.0431 9.40877 9.89475 9.55709C9.74642 9.70542 9.54577 9.78955 9.33601 9.79138C9.12625 9.7932 8.92417 9.71256 8.77329 9.56684L5.33889 6.13244L1.90449 9.56684C1.75361 9.71256 1.55153 9.7932 1.34177 9.79138C1.13201 9.78955 0.931363 9.70542 0.783037 9.55709C0.63471 9.40877 0.550575 9.20812 0.548752 8.99836C0.546929 8.7886 0.627565 8.58652 0.773292 8.43564L4.20769 5.00124L0.773292 1.56684C0.623315 1.41681 0.539062 1.21337 0.539062 1.00124C0.539062 0.789106 0.623315 0.585659 0.773292 0.435637V0.435637Z"
                            fill="#9A4545"
                          />
                        </svg>
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder="Location"
                className="input w-[55px] placeholder:text-[12px] placeholder:font-[400] outline-none "
                value={loactionText}
                onChange={(e) => {
                  setLoactionText(e.target.value);
                }}
              />
            </div>
            <button
              className="  bg-[#FFFFFF] "
              disabled={loactionText?.length == 0}
              onClick={() => {
                setData({
                  ...data,
                  location: [...data.location, loactionText],
                });
                setLoactionText("");
                setTimeout(() => {
                  const scrollDiv = document.getElementById("scroll1");
                  if (scrollDiv) {
                    scrollDiv.scrollLeft = scrollDiv.scrollWidth;
                  }
                }, 100);
                setFormError((prevErrors) => ({
                  ...prevErrors,
                  location: "",
                }));
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.14286 6.85714H0V5.14286H5.14286V0H6.85714V5.14286H12V6.85714H6.85714V12H5.14286V6.85714Z"
                  fill="#333333"
                />
              </svg>
            </button>
          </div>
        </div> */}
        {/* <div className="flex flex-col gap-2 text-[14px] font-medium scr1300:col-span-4 scr1024:col-span-6 col-span-12">
          <div className="text-[14px] font-[500]">
            Set Filter Limit <span className="text-[red]">*</span>
          </div>
          <input
            type="text"
            value={resumeCount}
            placeholder="Set Filter Limit"
            onChange={(e) => setResumeCount(e.target.value)}
            className="border rounded-[8px] p-2 border-[#DEDEDE] placeholder:text-[12px] font-normal h-[41.6px] "
          />
        </div> */}
      </div>
      <div className="flex justify-end">
        <button
          onClick={() => JobMatchforSkilotechCollection()}
          className="h-[38px] px-6 bg_Button rounded-[30px]"
        >
          Request CV from Skilotech
        </button>
      </div>
    </div>
  );
}

export default ManualForm;
