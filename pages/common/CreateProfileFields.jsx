import React, { useState } from "react";
import Select from "react-select";

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: "428px",
    border: "1px solid #AFAFAF",
    borderRadius: "8px",
    padding: "4px",
  }),
  control: (provided) => ({
    ...provided,
    border: "none",
    boxShadow: "none",
    padding: "0",
  }),
  input: (provided) => ({
    ...provided,
    color: "#AFAFAF",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#AFAFAF",
  }),
};

const options = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "1 months", label: "1 months" },
];

function CreateProfileFields() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    contactNumber: "",
    currentCTC: "",
    expectedCTC: "",
    isCommuting: "",
    dateOfBirth: "",
    yearsOfExperience: "",
    noticePeriod: "",

    commute: "",
    resume: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      resume: e.target.files[0],
    });
  };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevData) => ({
      ...prevData,
      noticePeriod: selectedOption.value,
    }));
  };

  return (
    <div className=" rounded-2xl bg-[#FFFFFF] p-3 scr500:p-6 flex flex-col gap-4 w-full ml:w-[90%] scr1024:w-[70.75%]">
      <div className="flex w-full items-center gap-[16px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g mask="url(#mask0_6706_81837)">
            <path
              d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z"
              fill="#1C1B1F"
            />
          </g>
        </svg>
        <div className="text-[14px] scr500:text-[16px] font-[500] text-[#333333]">
          Create Profile Required Fields
        </div>
      </div>
      <div className="w-full flex flex-col gap-4">
        <div className="flex gap-4 text-[14px] scr500:text-[16px] font-[600] items-center justify-between">
          Personal Details
          <div className="w-[50%] scr500:w-[80%] h-[1px] bg-[#DEDEDE]"></div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="flex flex-col scr500:flex-row w-full gap-6">
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              First name *
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter First Name"
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              Last name *
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Last Name"
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
          </div>
          <div className="flex w-full scr500:w-[48%] gap-4 flex-col text-[14px] scr500:text-[16px] font-[500] text-[#333333]">
            Select your Gender
            <div className="w-full flex justify-between items-center">
              <div className="flex gap-2 text-[14px] font-[500] text-[#333333]">
                <input type="radio" name="" id="" />
                Male
              </div>
              <div className="flex gap-2 text-[14px] font-[500] text-[#333333]">
                <input type="radio" name="" id="" />
                female
              </div>
              <div className="flex gap-2 text-[14px] font-[500] text-[#333333]">
                <input type="radio" name="" id="" />
                Others
              </div>
            </div>
          </div>
          <div className="flex flex-col scr500:flex-row w-full gap-6">
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              Email
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Email"
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              Contact number *
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter your contact number "
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
          </div>
          <div className="w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
            Date of Birth *
            <input
              type="date"
              name=""
              id=""
              placeholder="Enter Email"
              className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
            />
          </div>
        </div>
        <div className="flex gap-4 text-[14px] scr500:text-[16px] font-[600] items-center justify-between">
          Upload CV / Resume
          <div className="w-[70%] h-[1px] bg-[#DEDEDE]"></div>
        </div>
        <div className="flex gap-4 text-[12px] scr500:text-[14px] font-[500] text-[#646464] items-center">
          DOC, DOCX, PDF (2 MB)
          <button className="px-2 scr500:px-9 py-1 scr500:py-3 border-solid border-[1px] border-[#06A9EF] text-[12px] scr500:text-[14px] font-[600] text-[#333333] rounded-[30px]">
            Upload Resume
          </button>
        </div>
        <div className="flex gap-4 text-[16px] font-[600] items-center justify-between">
          Professional Details
          <div className="w-[75%] h-[1px] bg-[#DEDEDE]"></div>
        </div>
        <div className="flex gap-4 flex-col">
          <div className="flex w-full flex-col scr500:flex-row gap-6">
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              How many years of experience you have?
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Value"
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              Notice Period
              <select
                name=""
                id=""
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              >
                <option value="">select</option>
                <option value="">select</option>
                <option value="">select</option>
                <option value="">select</option>
              </select>
            </div>
          </div>
          <div className="flex w-full gap-6 flex-col scr500:flex-row ">
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              Current CTC
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Value"
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
            <div className="w-full scr500:w-[48%] flex flex-col gap-2 text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
              Expected CTC
              <input
                type="text"
                name=""
                id=""
                placeholder="Enter Value"
                className="border-[1px] border-solid border-[#AFAFAF] rounded-[8px] px-4 py-3 outline-none"
              />
            </div>
          </div>
          <div className="flex w-full gap-4 flex-col text-[12px] scr500:text-[14px] font-[500] text-[#333333]">
            Are you comfortable commuting to this job&apos;s location?
            <div className="w-full flex gap-6 items-center">
              <div className="flex gap-2 text-[14px] font-[500] text-[#333333]">
                <input type="radio" name="" id="" />
                Yes
              </div>
              <div className="flex gap-2 text-[14px] font-[500] text-[#333333]">
                <input type="radio" name="" id="" />
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProfileFields;
{
  /* <div>
        <div className="flex items-center gap-[16px]">
          <div className="text-[16px] font-[600]">Personal Details</div>
          <div className="w-[720px] border-[1px] border-[#DEDEDE]"></div>
        </div>
        <div className="flex gap-[24px]">
          <div className="flex flex-col gap-[20px]">
            <div className="text-[14px] font-[500]">
              First name <span className="text-red">*</span>
            </div>
            <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
              <input
                placeholder="Enter first name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="text-[14px] font-[500]">
              Last name <span className="text-red">*</span>
            </div>
            <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
              <input
                placeholder="Enter Last name "
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px]  pt-[16px]">
          <div className="text-[16px] font-[500]">Select your Gender</div>
          <div className="flex gap-[78px]">
            <div className="flex gap-[10px]">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleRadioChange}
              />
              <div className="text-[14px] font-[500]">Male</div>
            </div>
            <div className="flex gap-[10px]">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleRadioChange}
              />
              <div className="text-[14px] font-[500]">Female</div>
            </div>
            <div className="flex gap-[10px]">
              <input
                type="radio"
                name="gender"
                value="Others"
                checked={formData.gender === "Others"}
                onChange={handleRadioChange}
              />
              <div className="text-[14px] font-[500]">Others</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col pt-[16px] gap-[16px]">
          <div className="flex gap-[24px]">
            <div className="flex flex-col gap-[20px]">
              <div className="text-[14px] font-[500]">
                Email <span className="text-red">*</span>
              </div>
              <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
                <input
                  placeholder="Enter Email "
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-[20px]">
              <div className="text-[14px] font-[500]">
                Contact number <span className="text-red">*</span>
              </div>
              <div className="flex items-center w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
                <div className="px-[12px] py-[8px] border-r-[1px] border-[#AFAFAF]">
                  <select
                    className="bg-transparent outline-none text-[#AFAFAF] text-[14px] font-[500]"
                    defaultValue="+91"
                    name="contactCode"
                    value={formData.contactCode}
                    onChange={handleInputChange}
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                </div>
                <input
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  placeholder="Enter Contact number"
                  type="text"
                  className="px-[16px] py-[12px] w-full rounded-r-[8px] outline-none text-[#AFAFAF]"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[20px]">
            <div className="text-[14px] font-[500]">
              Date of Birth <span className="text-red">*</span>
            </div>
            <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
              <input
                className="text-[#AFAFAF] justify-between"
                id="date"
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[16px]">
        <div className="flex items-center gap-[16px]">
          <div className="text-[16px] font-[600]">Upload CV / Resume</div>
          <div className="w-[720px] border-[1px] border-[#DEDEDE]"></div>
        </div>
        <div className="flex gap-[10px] items-center">
          <div className="text-[14px] font-[500] text-[#646464]">
            DOC, DOCX, PDF (2 MB)
          </div>
          <button className="text-[14px] font-[600] border-[1px] border-[#06A9EF] py-[12px] px-[36px] rounded-[30px]">
            Upload Resume
          </button>
          <input
            type="file"
            onChange={handleFileChange}
            className="text-[14px] font-[600] border-[1px] border-[#06A9EF] py-[12px] px-[36px] rounded-[30px] hidden"
          />
        </div>
      </div>
      <div>
        <div className="flex items-center gap-[16px]">
          <div className="text-[16px] font-[600]">Professional Details</div>
          <div className="w-[720px] border-[1px] border-[#DEDEDE]"></div>
        </div>

        <div>
          <div className="flex flex-col gap-[16px]">
            <div className="flex gap-[24px]">
              <div className="flex flex-col gap-[20px]">
                <div className="text-[14px] font-[500]">
                  How many years of experience you have?{" "}
                </div>
                <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
                  <input
                    name="yearsOfExperience"
                    placeholder="Enter value"
                    type="text"
                    value={formData.yearsOfExperience}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="text-[14px] font-[500]">Notice Period</div>
                <div className=" w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
                  <Select
                    styles={customStyles}
                    options={options}
                    placeholder="Select an option"
                    onChange={handleSelectChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-[24px]">
              <div className="flex flex-col gap-[20px]">
                <div className="text-[14px] font-[500]">Current CTC</div>
                <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
                  <input
                    className="text-[#AFAFAF] justify-between"
                    placeholder="Enter value"
                    type="text"
                    name="currentCTC"
                    value={formData.currentCTC}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                <div className="text-[14px] font-[500]">Expected CTC</div>
                <div className="px-[16px] py-[12px] w-[428px] border-[1px] border-[#AFAFAF] rounded-[8px]">
                  <input
                    className="text-[#AFAFAF] justify-between"
                    name="expectedCTC"
                    placeholder="Enter value"
                    type="text"
                    value={formData.expectedCTC}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[16px]  pt-[16px]">
          <div className="text-[14px] font-[500]">
            Are you comfortable commuting to this job's location?
          </div>
          <div className="flex gap-[24px]">
            <div className="flex gap-[10px]">
              <input
                type="radio"
                name="commute"
                value="Yes"
                checked={formData.commute === "Yes"}
                onChange={handleRadioChange}
              />
              <div className="text-[14px] font-[500]">Yes</div>
            </div>
            <div className="flex gap-[10px]">
              <input
                type="radio"
                name="commute"
                value="No"
                checked={formData.commute === "No"}
                onChange={handleRadioChange}
              />
              <div className="text-[14px] font-[500]">No</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end gap-[8px]">
        <button className="border-[1px] border-[#06A9EF] texxt-[14px] font-[600] rounded-[30px] py-[12px] px-[36px] ">
          Cancel
        </button>
        <button className=" bg-[#06A9EF] texxt-[14px] font-[600] text-[#ffffff] rounded-[30px] py-[12px] px-[36px] ">
          Create Job Post
        </button>
      </div> */
}
