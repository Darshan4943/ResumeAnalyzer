import { Delete_icon, Edit_icon, PlusAddLogo } from "@/utils/svg";
import React, { useState } from "react";

const ListItem = ({ item }) => {
  const [editMode, setEditMode] = useState(true);
  const handleEditClick = () => {
    setEditMode(!editMode);
  };
  const [toggle, setToggle] = useState(0);
  console.log(10, toggle);
  const handleSelectChange = (e) => {
    setToggle(parseInt(e.target.value, 10));
  };
  const [selectedDocuments, setSelectedDocuments] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    if (selectedDocuments.includes(value)) {
      setSelectedDocuments(selectedDocuments.filter((doc) => doc !== value));
    } else {
      setSelectedDocuments([...selectedDocuments, value]);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Selected Documents:", selectedDocuments);
    // Add logic to handle the form submission (e.g., send data to a server)
  };
  return (
    <>
      <div className="flex flex-col gap-1">
        <div>
          {editMode ? (
            <>
              {item.title}
              <div
                key={item.title}
                className=" flex justify-between p-[12px] ml:p-[16px] rounded-[8px] ml:rounded-[12px] bg-[#fff] border-solid border-[1px] border-[#AFAFAF]"
                style={{
                  boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder={item.placeholder}
                  className="w-[75%]"
                />
                <div className="flex items-center justify-end  gap-[12px] font-[500] w-[45%] ml:w-[35%]">
                  <div className="flex gap-[3px] items-center text-[10px] ml:text-[14px]">
                    {item.Required}
                    <label
                      className="flex items-center"
                      style={{ display: "inline-block", padding: "5px" }}
                    >
                      <input
                        className="flex items-center"
                        type="checkbox"
                        style={{
                          appearance: "none",
                          WebkitAppearance: "none",
                          MozAppearance: "none",
                          border: "1px solid #06A9EF",
                          width: "16px",
                          height: "16px",
                          borderRadius: "3px",
                          margin: "0",
                          cursor: "pointer",
                        }}
                      />
                    </label>
                  </div>
                  <div className=" flex items-center gap-[12px]">
                    <div
                      onClick={handleEditClick}
                      className="w-[20px] ml:w-[24px]"
                    >
                      {item.edit}
                    </div>
                    <div className="w-[20px] ml:w-[24px]">{item.delete}</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div
              className="flex flex-col ml:flex-row bg-[#fff] p-[12px] ml:p-[16px] rounded-[16px] gap-[8px] justify-between"
              style={{
                boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <div>{item.title}</div>
              <div className="p-[12px] bg-[#fff] w-full ml:w-[85.20%]  ml:w-full rounded-[12px] border-solid border-[0.5px] border-[#06A9EF] flex flex-col gap-[12px]">
                <div className="flex flex-col ml:flex-row gap-[12px]">
                  <input
                    type="text"
                    name=""
                    id=""
                    className="py-[12px] px-[16px] rounded-[6px] border-[1px] border-solid border-[#646464] w-full"
                  />
                  <div className="w-[222px] py-[8px] px-[16px] flex justify-between gap-[8px] border-solid border-[1px] border-[#333] rounded-[6px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g mask="url(#mask0_7931_58508)">
                        <path
                          d="M4.5 14.75V13.25H13.5V14.75H4.5ZM4.5 10.75V9.25H19.5V10.75H4.5Z"
                          fill="#333333"
                        />
                      </g>
                    </svg>
                    <select
                      name=""
                      id=""
                      className="flex justify-between"
                      onChange={handleSelectChange}
                    >
                      <option value="0">Short Answer</option>
                      <option value="1">Long Answer</option>
                      <option value="2">Multiple choice</option>
                      <option value="3">Checkbox</option>
                      <option value="4">Dropdowns</option>
                      <option value="5">File Upload</option>
                      <option value="6">Date</option>
                    </select>
                  </div>
                </div>
                <div className="flex flex-col gap-[8px] w-full">
                  <div className="flex flex-col gap-[8px] w-full">
                    {toggle == 0 && (
                      <div className="py-[12px] px-[16px] border-b  border-[#646464]">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="Short answer text"
                        />
                      </div>
                    )}
                    {toggle == 1 && (
                      <div className="py-[12px] px-[16px] border-b  border-[#646464]">
                        <input
                          type="text"
                          name=""
                          id=""
                          placeholder="long answer text"
                        />
                      </div>
                    )}
                    {toggle == 2 && (
                      <div className="py-[8px] px-[16px] flex gap-[8px] w-[70%] flex-col">
                        <div className="flex gap-[8px] items-center ">
                          <input
                            className="w-[24px] h-[24px]"
                            type="radio"
                            name=""
                            id=""
                            placeholder="Option 1"
                          />
                          <div className="border-b w-full border-[#646464]">
                            <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Option 1"
                            />
                          </div>
                        </div>
                        <PlusAddLogo />
                      </div>
                    )}
                    {toggle == 3 && (
                      <div className="py-[8px] px-[16px] flex gap-[8px] w-[70%] flex-col">
                        <div className="flex gap-[8px] items-center ">
                          <input
                            className="w-[24px] h-[24px]"
                            type="checkbox"
                            name=""
                            id=""
                            placeholder="Option 1"
                          />
                          <div className="border-b w-full border-[#646464]">
                            <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Option 1"
                            />
                          </div>
                        </div>
                        <PlusAddLogo />
                      </div>
                    )}
                    {toggle == 4 && (
                      <div className="py-[8px] px-[16px] flex gap-[8px] w-[70%] flex-col">
                        <div className="flex gap-[8px] items-center ">
                          1.
                          <div className="border-b w-full border-[#646464]">
                            <input
                              type="text"
                              name=""
                              id=""
                              placeholder="Option 1"
                            />
                          </div>
                        </div>
                        <PlusAddLogo />
                      </div>
                    )}
                    {toggle == 5 && (
                      <div className="w-full flex flex-col justify-between ml:flex-row gap-[12px] ">
                        <div className="w-full ml:w-[40%] flex flex-col gap-[12px]">
                          <div className="text-[14px] font-[400] text-[#333] flex justify-between items-center">
                            Allow only specific file types{" "}
                            <label className="switch">
                              <input type="" checked="" onChange="" />
                              <span className="slider round"></span>
                            </label>
                          </div>
                          <form
                            onSubmit={handleSubmit}
                            className="flex flex-wrap justify-between gap-[8px]"
                          >
                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                              <input
                                type="checkbox"
                                name="document"
                                value="document"
                                onChange={handleCheckboxChange}
                              />
                              Document
                            </label>

                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                              <input
                                type="checkbox"
                                name="document"
                                value="excel"
                                onChange={handleCheckboxChange}
                              />
                              Excel File
                            </label>

                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                              <input
                                type="checkbox"
                                name="document"
                                value="pdf"
                                onChange={handleCheckboxChange}
                              />
                              PDF
                            </label>

                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                              <input
                                type="checkbox"
                                name="document"
                                value="audio"
                                onChange={handleCheckboxChange}
                              />
                              Audio
                            </label>

                            <label className="flex gap-[8px] text-[12px] ml:text-[14px] font-[400] text-[#333] items-center">
                              <input
                                type="checkbox"
                                name="document"
                                value="jpg"
                                onChange={handleCheckboxChange}
                              />
                              JPG
                            </label>
                          </form>
                        </div>
                        <div className="flex ml:w-[40%] w-full flex-col gap-[16px]">
                          <div className="flex justify-between text-[14px] font-[400] text-[#333]">
                            Maximum number of files{" "}
                            <select name="" id="">
                              <option value="1">1</option>
                              <option value="5">5</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                          <div className="flex justify-between text-[14px] font-[400] text-[#333]">
                            Maximum file size{" "}
                            <select name="" id="">
                              <option value="1">1mb</option>
                              <option value="5">5mb</option>
                              <option value="10">10mb</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    )}
                    {toggle == 6 && (
                      <div className="py-[8px] px-[16px] border-b w-[100%] ml:w-[60%] border-[#646464]">
                        <input
                          type="date"
                          name=""
                          id=""
                          className="flex justify-between"
                          placeholder="Short answer text"
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between">
                    <div className="flex gap-[8px]  items-center">
                      <div className="flex gap-[8px] text-[14px]">
                        Required{" "}
                      </div>
                      <label className="switch ">
                        <input type="" checked="" onChange="" />
                        <span className="slider round"></span>
                      </label>
                      <Delete_icon />
                    </div>

                    <div className="flex justify-end ml:items-end">
                      <button
                        onClick={handleEditClick}
                        className="py-[8px] ml:py-[12px] px-[20px] ml:px-[24px] ml:px-[36px] rounded-[12px] border-solid border-[1px] border-[#06A9EF] bg-[#06A9EF] text-[#fff] text-[14px] ml:text-[16px] font-[600]"
                      >
                        save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
function PersonalDetails({ setToggle }) {
  const PersonalDetails = [
    {
      title: "First name",
      placeholder: "Enter your first name",
      Required: "Required",
      edit: <Edit_icon />,
      delete: <Delete_icon />,
    },
    {
      title: "Last Name",
      placeholder: "Enter your last name",
      Required: "Required",
      edit: <Edit_icon />,
      delete: <Delete_icon />,
    },
    {
      title: "Gender",
      placeholder: "Your Gender",
      Required: "Required",
      edit: <Edit_icon />,
      delete: <Delete_icon />,
    },
    {
      title: "Email",
      placeholder: "Enter your email",
      Required: "Required",
      edit: <Edit_icon />,
      delete: <Delete_icon />,
    },
    {
      title: "Contact Number",
      placeholder: "Enter your contact number",
      Required: "Required",
      edit: <Edit_icon />,
      delete: <Delete_icon />,
    },
    {
      title: "Date of Birth",
      placeholder: "Enter your birth date",
      Required: "Required",
      edit: <Edit_icon />,
      delete: <Delete_icon />,
    },
  ];
  return (
    <div className="flex flex-col gap-[8px] ">
      <div className="flex flex-col text-[16px] ml:text-[20px] gap-[8px] bg-[#E0F6FF] ml:px-4 px-[8px]">
        {PersonalDetails.map((item, index) => (
          <>
            <ListItem item={item} />
          </>
        ))}
      </div>

      <div className="flex justify-end text-[#333] text-[14px] font-[600] px-[8px] ml:px-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <g mask="url(#mask0_6622_123567)">
            <path
              d="M11.25 12.75H5.5V11.25H11.25V5.5H12.7499V11.25H18.5V12.75H12.7499V18.5H11.25V12.75Z"
              fill="#333333"
            />
          </g>
        </svg>
        Add Section
      </div>

      <div className="flex flex-row bg-white pt-[12px] px-[12px] ml:p-4 gap-[4px] justify-between ">
        <button className="border-[1px] border-solid border-[#06A9EF] text-[14px] ml:text-[16px] font-medium py-[12px] px-[16px] ml:px-[36px] rounded-[12px] ">
          Back
        </button>
        <button
          onClick={() => setToggle(1)}
          className="text-[#fff] text-[14px] ml:text-[16px] font-semibold py-[12px] px-[16px] ml:px-[36px] bg-[#06A9EF] rounded-[12px]"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

export default PersonalDetails;
