import React, { useEffect, useState } from "react";
import { camelCase } from "../../../../../utils/middleware";
import { useSelector } from "react-redux";
import ReactSelect from "react-select";
import { telCode } from "../../../../../utils/data";
import { Delete_icon, Edit_icon } from "../../../../../utils/svg";

const Reference = ({ setData, data }) => {
  const userDataGlobal = useSelector((state) => state.userData);
  const [view, setView] = useState(false);
  const [isChecked, setIsChecked] = useState(true);
  const [isModified, setIsModified] = useState({ status: false, index: 0 });
  const [filteredTelCode, setFilteredTelCode] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const handleSwitchChange = () => {
    setIsChecked(!isChecked);
    setData({ ...data, showExperience: !isChecked });
  };
  const [referenceData, setReferenceData] = useState({
    referantName: "",
    designation: "",
    organization: "",
    email: "",
  });

  const handleDeleteReference = (index) => {
    setData({
      ...data,
      reference: data?.reference?.filter((item, i) => i !== index),
    });
  };

  useEffect(() => {
    const filterLogic = (item) =>
      item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.dial_code.includes(searchTerm);

    const filteredCodes = telCode.filter(filterLogic);
    setFilteredTelCode(filteredCodes);
  }, [telCode, searchTerm]);

  const inputFields = [
    {
      label: "Referent’s Name",
      type: "text",
      name: "referantName",
      placeholder: "Type here",
      value: referenceData.referantName,
      className: " col-span-2 ",
    },
    {
      label: "Designation",
      type: "text",
      name: "designation",
      placeholder: "Type here",
      value: referenceData.designation,
      className: " ",
    },

    {
      label: "Organization Name",
      type: "text",
      name: "organization",
      placeholder: "Type here",
      value: referenceData.organization,
      className: " ",
    },
    {
      label: "Email ID",
      type: "email",
      name: "email",
      placeholder: "Type here",
      value: referenceData.email,
      className: " col-span-2",
    },
  ];

  const [formErrors, setFormErrors] = useState({
    referantName: false,
    designation: false,
    organization: false,
    email: false,
  });

  const validateFields = () => {
    const newErrors = {};
    let allFieldsValid = true;

    inputFields.forEach((field) => {
      const { name } = field;
      const value = referenceData[name];

      if (typeof value === "string" && value.trim() === "") {
        newErrors[name] = true;
        allFieldsValid = false;
      } else {
        newErrors[name] = false;
      }
    });

    // setFormErrors({ ...newErrors });
    return allFieldsValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setReferenceData({
      ...referenceData,
      [name]: value,
    });
    // setIsModified({ status: false, index: 0 });
    setFormErrors({ ...formErrors, [name]: value.trim() === "" });
  };

  const isDisabled = () => {
    if (!isChecked || !isModified) return true;

    const isAnyFieldEmpty = Object.values(referenceData).some((value) => {
      if (typeof value === "string") {
        return value.trim() === "";
      }

      if (typeof value === "number") {
        return value.toString().trim() === "";
      }
      return true;
    });

    return isAnyFieldEmpty;
  };

  const saveData = () => {
    if (validateFields()) {
      if (isModified.status === true) {
        const dummyData = data.reference;
        const index = isModified.index;

        dummyData.splice(index, 1, referenceData);

        setData({ ...data, reference: dummyData });
        setView(false);
      } else {
        setData({
          ...data,
          reference: [referenceData, ...data?.reference],
        });
        {
          validateFields ? setView(false) : setView(true);
        }
      }
      setIsModified({ status: false, index: 0 });
      setReferenceData({
        referantName: "",
        designation: "",
        organization: "",
        email: "",
      });
      setView(false);
    } else {
      setView(true);
    }
  };

  useEffect(() => {
    const allFieldsValid = validateFields();
    if (allFieldsValid && isModified.status) {
      setIsModified({ status: true, index: 0 });
    }
  }, [referenceData]);

  useEffect(() => {
    const { referantName, designation, email, organization } = data;

    setReferenceData({
      ...referenceData,
      referantName,
      designation,
      email,
      organization,
    });
  }, [data]);

  const [toggleOn, setToggleOn] = useState(true);

  const handleEditReference = (index) => {
    const dataToEdit = data.reference[index];

    if (dataToEdit) {
      setView(true);

      setReferenceData({ ...dataToEdit });
      setIsModified({ status: true, index });
    }
  };

  return (
    <>
      <div
        className="flex flex-col sm:p-4 p-2 gap-2 rounded-lg bg-white"
        style={{
          opacity: isChecked ? 1 : 0.5,
        }}
      >
        <div className="w-full flex justify-between text-[20px] font-montserrat font-medium">
          <p> References </p>
          <label className="switch">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleSwitchChange}
            />
            <span className="slider round"></span>
          </label>
        </div>

        {!view &&
          data?.reference?.length > 0 &&
          data?.reference?.map((exp, index) => (
            <div
              key={index}
              className={`flex flex-col gap-1 py-[12px] px-[16px] rounded-[6px]  border break-all ${
                editingIndex === index
                  ? "border-[#06A9EF] border-[2px]"
                  : "border-[#DEDEDE]"
              }`}
            >
              <div className="flex justify-between">
                <p className="text-[14px]">{exp?.referantName}</p>

                <div className="flex gap-2">
                  <div onClick={() => handleEditReference(index)}>
                    <Edit_icon />
                  </div>
                  <div onClick={() => handleDeleteReference(index)}>
                    <Delete_icon />
                  </div>
                </div>
              </div>
              <p className="text-[14px]">{exp?.organization}</p>
              <p className="text-[12px]">{exp.email}</p>
            </div>
          ))}
        {view && (
          <>
            <div className="grid grid-cols-2 gap-4">
              {inputFields.map((item, index) => (
                <div
                  className={`flex flex-col gap-2 w-full ${item.className}`}
                  key={index}
                >
                  <div className=" text-[14px] font-montserrat  font-medium">
                    {item.label}
                  </div>

                  <div
                    className={`border-[1px] rounded-[8px] px-[16px] py-[12px] ${
                      formErrors[item.name]
                        ? "border-[#C00000]"
                        : "border-[#9D9D9D]"
                    } `}
                  >
                    <input
                      type={item.type}
                      name={item.name}
                      placeholder={item.placeholder}
                      className="w-full text-[14px] font-montserrat font-small"
                      value={referenceData[item.name]}
                      onChange={handleInputChange}
                      disabled={!isChecked}
                    />
                  </div>

                  {formErrors[item.name] && (
                    <span className="text-[#C00000] text-[12px]">
                      Field is required
                    </span>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end ">
              <div className="flex justify-between  py-2 gap-2">
                <button
                  className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[80px] h-[32px]"
                  onClick={() => {
                    setReferenceData({
                      referantName: "",
                      designation: "",
                      organization: "",
                      email: "",
                    });
                    setView(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  className=" font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]"
                  //   style={{ opacity: isDisabled() ? 0.5 : 1 }}
                  onClick={saveData}
                  //   disabled={isDisabled() || !isChecked}
                >
                  Save
                </button>
              </div>
            </div>
          </>
        )}

        {!view && (
          <div
            className="flex gap-1"
            onClick={() => isChecked && setView(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_5716_136351)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#06A9EF"
                />
              </g>
            </svg>
            <p
              // onClick={() => setView(true)}
              className="text-[16px] font-semibold text-[#06A9EF] cursor-pointer"
              disabled={!isChecked}
            >
              Add Section
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default Reference;
