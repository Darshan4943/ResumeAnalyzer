import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import debounce from 'lodash.debounce';
import { Editor } from "primereact/editor";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const CreateNewRequisition = ({ setToggle }) => {
  const router = useRouter();
  const [successfull, setSuccessfull] = useState(false);
  const [levels, setLevels] = useState([{ id: 1, name: "Level 1" }]);
  const [showApprovalChain, setShowApprovalChain] = useState(false);
  const [approvalChoice, setApprovalChoice] = useState(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    jobTitle: "",
    positions: "",
    isPriority: false,
    budgetFrom: "",
    budgetTo: "",
    experience: "",
    requisitionType: "",
    location: "",
    department: "",
    hiringDate: "",
    jobType: "",
    comments: "",
    description: "",
    RequisitionLevel: [
      {
        id: 1,
        name: "",
        email: "",
      },
    ],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:2000/api/creatrequasetion",
        data
      );

      setSuccessfull(true);
      toast.success("Requisition created successfully", response.data);
    } catch (error) {
      setLoading(false);
      toast.error(`Error creating requisition: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e, name) => {
    const { value, type, checked } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChange1 = useCallback(
    debounce((value) => {
      const plainText = value.replace(/<[^>]*>/g, "");
      setData((prevData) => ({
        ...prevData,
        description: plainText,
      }));
    }, 500),
    []
  );

  const handleChange2 = (e, index, field) => {
    const { value } = e.target;

    setData((prevState) => {
      const updatedLevels = [...prevState.RequisitionLevel];

      if (updatedLevels[index]) {
        updatedLevels[index][field] = value;
      }

      return {
        ...prevState,
        RequisitionLevel: updatedLevels,
      };
    });
  };

  const addLevel = () => {
    const newLevel = {
      id: data.RequisitionLevel.length + 1,
      name: "",
      email: "",
    };
    setData({
      ...data,
      RequisitionLevel: [...data.RequisitionLevel, newLevel],
    });
  };

  const deleteLevel = (id) => {
    if (id === 1) return;
    const updatedLevels = data.RequisitionLevel.filter(
      (level) => level.id !== id
    );
    setData({
      ...data,
      RequisitionLevel: updatedLevels,
    });
  };

  const handleApprovalChoice = (value) => {
    setApprovalChoice(value);
    setShowApprovalChain(value === "yes");
  };
  return (
    <div className="flex ml:flex-row flex-col gap-[20px] ml:max-h-[80vh] pb-[24px] ">
      <div
        className=" ml:w-[60%] w-[100%] flex flex-col gap-4 rounded-[16px] py-2 bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="overflow-y-auto p-4 flex flex-col gap-4 ">
          <div className=" w-[full] text-[24px] font-[500px] flex gap-2 items-center ">
            <img
              onClick={() => setToggle(0)}
              className=" ms:w-[28px] ms:h-[28px] w-[24px] h-[24px] cursor-pointer"
              src="/images/employer/Icon_left.png"
              alt=""
            />
            Create New Requisition
          </div>

          <div className="flex sm:flex-row flex-col gap-4  ">
            <div className="flex flex-col gap-2  sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium">Job Title</p>
              <input
                type="text"
                value={data.jobTitle}
                onChange={(e) => handleChange(e, "jobTitle")}
                placeholder="Eg: Product Manager"
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] placeholder:text-[14px]  font-[400]"
              />
            </div>
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className="  text-[14px]  font-medium">Number of Positions</p>
              <input
                type="text"
                value={data.positions}
                onChange={(e) => handleChange(e, "positions")}
                placeholder="Enter Number"
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] placeholder:text-[14px]  font-[400]"
              />
            </div>
          </div>

          <div className=" flex flex-row gap-2">
            <input
              type="checkbox"
              checked={data.isPriority}
              onChange={(e) => handleChange(e, "isPriority")}
              className="border border-[#06A9EF] text-[14px]  font-medium custom-checkbox"
            />
            <p>Mark as priority</p>
          </div>

          <div className="flex flex-col gap-[8px] justify-between w-full">
            <p className="text-[14px]  font-medium">Budget</p>
            <div className="flex sm:flex-row flex-col gap-4 ">
              <input
                type="text"
                value={data.budgetFrom}
                onChange={(e) => handleChange(e, "budgetFrom")}
                placeholder="From (INR)"
                className="h-[38px]  px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px]  sm:w-[49.01%] w-[100%] placeholder:text-[14px]  font-[400]"
              />
              <input
                type="text"
                value={data.budgetTo}
                onChange={(e) => handleChange(e, "budgetTo")}
                placeholder="To (INR)"
                className="h-[38px]  px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px]  sm:w-[49.01%] w-[100%] placeholder:text-[14px]  font-[400]"
              />
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4">
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className=" text-[14px]  font-medium">Experience</p>
              <input
                type="text"
                value={data.experience}
                onChange={(e) => handleChange(e, "experience")}
                placeholder="Ex: 2 Yrs"
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] placeholder:text-[14px]  font-[400]"
              />
            </div>
            <div className="flex flex-col gap-2 sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium">Requisition Type</p>
              <select
                value={data.requisitionType}
                onChange={(e) => handleChange(e, "requisitionType")}
                className="h-[38px] px-[16px] py-[8px]  border-[1px] border-solid border-[#DEDEDE] text-[14px]  font-[400] rounded-[6px]"
              >
                <option value="" disabled selected className="">
                  Select{" "}
                </option>
                <option value="product manager">Product Manager</option>
                <option value="developer">Developer</option>
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4  ">
            <div className="flex flex-col gap-2  sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium ">Location</p>
              <select
                value={data.location}
                onChange={(e) => handleChange(e, "location")}
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] text-[14px]  font-[400]"
              >
                <option value="" disabled selected>
                  Select{" "}
                </option>
                <option value="Pune">Pune</option>
                <option value="Mumbai">Mumbai</option>
              </select>
            </div>
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className=" text-[14px]  font-medium">Department</p>
              <select
                value={data.department}
                onChange={(e) => handleChange(e, "department")}
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] text-[14px]  font-[400]"
              >
                <option value="" disabled selected>
                  Select{" "}
                </option>
                <option value="It">It</option>
                <option value="Devlopment ">Devlopment</option>
              </select>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col gap-4  ">
            <div className="flex flex-col gap-2 sm:w-[49.01%] w-[100%]">
              <p className=" text-[14px]  font-medium">Target Hiring Date</p>
              <input
                type="date"
                value={data.hiringDate}
                onChange={(e) => handleChange(e, "hiringDate")}
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] text-[14px]  font-[400]"
              ></input>
            </div>
            <div className="flex flex-col gap-[8px] sm:w-[49.01%] w-[100%]">
              <p className="text-[14px]  font-medium">Job Type</p>
              <select
                value={data.jobType}
                onChange={(e) => handleChange(e, "jobType")}
                className="h-[38px] px-[16px] py-[8px] border-[1px] border-solid border-[#DEDEDE] rounded-[6px] text-[14px]  font-[400]"
              >
                <option value="" disabled selected>
                  Select{" "}
                </option>
                <option value="Full Time">Full Time </option>
                <option value="Part Time">Part Time</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col  gap-[8px] ">
            <p className="text-[14px]  font-medium">Additional Comments</p>
            <textarea
              value={data.comments}
              onChange={(e) => handleChange(e, "comments")}
              className="h-[148px] border-[1px] border-solid border-[#DEDEDE] px-[16px] py-[8px] rounded-[6px] placeholder:text-[14px]  font-[400]"
              placeholder="Provide your comment"
            ></textarea>
          </div>

          <div className="text-[14px]  font-medium">
            <p>Job Description</p>
            <Editor
              value={data.description}
              onTextChange={(e) => handleChange1(e.htmlValue)}
              style={{
                border: formError.description
                  ? "2px solid red"
                  : "2px solid #dedede",
                fontSize: "16px",
                color: "#333",
                padding: "10px",
                minHeight: "196px",
              }}
            />
          </div>
        </div>
      </div>
      <div
        className=" ml:w-[40%]  w-[100%] h-[100%] max-h-[80vh]  flex flex-col gap-4 py-2 rounded-[16px]  bg-white"
        style={{ boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)" }}
      >
        <div className="overflow-y-auto p-4 flex flex-col gap-4">
          <p className="text-[24px] font-medium w-full">
            Requisition Approval Chain
          </p>
          <p className="text[14px] w-full font-medium">
            Do you want to enable approval Chain for Requisition?
          </p>
          <div className="flex gap-[8px] items-center">
            <input
              type="radio"
              name="approvalChoice"
              value="yes"
              className="h-[20px] w-[20px] custom-radio"
              onChange={(e) => handleApprovalChoice(e.target.value)}
            />
            <label className="text-[14px] font-medium">Yes</label>
            <input
              type="radio"
              name="approvalChoice"
              value="no"
              className="h-[20px] w-[20px] custom-radio"
              onChange={(e) => handleApprovalChoice(e.target.value)}
            />
            <label className="text-[14px] font-medium">No</label>
          </div>

          <div
            className="flex flex-col gap-4 "
            style={{
              opacity: showApprovalChain ? 1 : 0.5,
              pointerEvents: showApprovalChain ? "auto" : "none",
            }}
          >
            <p className="text-[14px] font-semibold">Approval Chain</p>
            <div className="flex flex-col ">
              <div className="flex gap-4 w-full">
                <div className="order-tracker mt-1">
                  {levels.map((level, index) => (
                    <div key={level.id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        style={{ animationDelay: "1s" }}
                        className="level"
                      >
                        <circle cx="8" cy="8.5" r="8" fill="#CBEFFF" />
                        <circle cx="8" cy="8.5" r="4" fill="#06A9EF" />
                      </svg>
                      {index !== levels.length - 1 && (
                        <div className="connector-line mt-[-2px] mb-[-3px]">
                          <img
                            className="moving-line1"
                            style={{
                              height: "0px",
                              width: "3px",
                              marginLeft: "0.44rem",
                            }}
                            src="/images/employer/tracker_line.png"
                            alt="Line 1"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="w-[91.5%] flex flex-col gap-4">
                  {data.RequisitionLevel.map((level, index) => (
                    <div
                      className="flex flex-col gap-[8px] w-full level"
                      key={level.id}
                    >
                      <div className="flex gap-2 justify-between">
                        <p>{`Level ${level.id}`}</p>
                        {level.id !== 1 && (
                          <svg
                            className="delete-level"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            onClick={() => deleteLevel(level.id)}
                          >
                            <g mask="url(#mask0_4754_63716)">
                              <path
                                d="M5.83203 17.5C5.3737 17.5 4.98134 17.3368 4.65495 17.0104C4.32856 16.684 4.16536 16.2917 4.16536 15.8333V5H3.33203V3.33333H7.4987V2.5H12.4987V3.33333H16.6654V5H15.832V15.8333C15.832 16.2917 15.6688 16.684 15.3424 17.0104C15.0161 17.3368 14.6237 17.5 14.1654 17.5H5.83203ZM14.1654 5H5.83203V15.8333H14.1654V5ZM7.4987 14.1667H9.16536V6.66667H7.4987V14.1667ZM10.832 14.1667H12.4987V6.66667H10.832V14.1667Z"
                                fill="#333333"
                              />
                            </g>
                          </svg>
                        )}
                      </div>
                      <input
                        type="text"
                        value={level.name || ""}
                        onChange={(e) => handleChange2(e, index, "name")}
                        placeholder="Role / Employee"
                        className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] rounded-[6px] placeholder:text-[14px] font-[400]"
                      />
                      <input
                        type="text"
                        value={level.email || ""}
                        onChange={(e) => handleChange2(e, index, "email")}
                        placeholder="Enter Email"
                        className="h-[38px] border-[1px] py-[16px] px-[8px] border-solid border-[#DEDEDE] rounded-[6px] placeholder:text-[14px] font-[400]"
                      />
                    </div>
                  ))}
                  <p
                    className="add-level text-[#06A9EF] text-[14px] font-semibold cursor-pointer"
                    onClick={addLevel}
                  >
                    + Add New Level
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-row justify-between">
              <button
                onClick={() => setToggle(0)}
                className="   border-[1px] border-solid border-[#06A9EF] text-[16px] font-medium px-9 py-3 rounded-[30px] max-scr1100:px-6 "
              >
                Cancel
              </button>
              <button
                className="  text-[#fff] text-[16px] font-semibold px-9 py-3 max-scr1100:px-6  bg-[#06A9EF] rounded-[30px]"
                onClick={handleSubmit}
              >
                Create
              </button>
            </div>
          </div>
        </div>
        {successfull && (
          <>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
            <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center customMargins   ">
              <div
                className="w-[330px] relative rounded-[16px] px-[16px] pt-[60px] pb-[16px] flex flex-col gap-[16px] bg-white"
                style={{
                  boxShadow: "0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                <svg
                  className="absolute top-[-30px]  left-[38%] right-[62%] flex"
                  xmlns="http://www.w3.org/2000/svg"
                  width="85"
                  height="85"
                  viewBox="0 0 85 85"
                  fill="none"
                >
                  <g clip-path="url(#clip0_6622_116765)">
                    <rect width="85" height="85" rx="42.5" fill="#0C8A0A" />
                    <g mask="url(#mask0_6622_116765)">
                      <path
                        d="M34.5 58.1875L20.1562 43.8438L24.0938 39.9062L34.5 50.3125L59.9062 24.9062L63.8438 28.8438L34.5 58.1875Z"
                        fill="white"
                      />
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_6622_116765">
                      <rect width="85" height="85" rx="42.5" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <div className="text-center">
                  <div className="text-[24px] font-[500] text-[#333]">
                    Successfully Updated
                  </div>
                  <div className="text-[16px] font-[500] text-[#333]">
                    Requisition settings updated successfully
                  </div>
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={() => setToggle(0)}
                    className="py-[12px] px-[24px] rounded-[8px] bg-[#06A9EF] text-[#fff] text-[16px] font-[500]"
                  >
                    Done
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CreateNewRequisition;
