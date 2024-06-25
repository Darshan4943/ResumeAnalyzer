import React, { useState, useEffect } from "react";

const KeyResponsibility = ({
  ShowForm,
  setShowForm,
  extratctedData,
  setExtractedData,
  setEditId,
  handleEdit,
  setIsEdit,
}) => {
  const [keyResponsibilities, setKeyResponsibilities] = useState([]);
  const [newResponsibility, setNewResponsibility] = useState({
    action: "",
    objective: "",
    frequency: "",
    collaboration: [],
    required_skill: [],
  });

  // Initialize the state with extratctedData.key_responsibilities
  useEffect(() => {
    if (extratctedData && extratctedData.key_responsibilities) {
      setKeyResponsibilities(extratctedData.key_responsibilities);
    }
  }, [extratctedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewResponsibility({ ...newResponsibility, [name]: value });
  };

  const handleId = (index) => {
    setEditId(index);
    setIsEdit(true);
  };

  const handleClick = () => {
    setShowForm(true);
  };

  const handleDelete = (index) => {
    
    if (keyResponsibilities?.length > 0 && index >= 0) {
      const filteredBenefits = keyResponsibilities.filter(
        (_, i) => i !== index
      );

      setExtractedData({
        ...extratctedData,
        benefits: filteredBenefits,
      });
    }
  };

  return (
    <div className="flex flex-col gap-[16px] w-[416px]">
      <div className="flex flex-row justify-between items-center  ">
        <div className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
          Key Responsibility <span className="text-[#e74c3c]">*</span>
        </div>
        <div>
          <div
            className="flex gap-1 bg-[#06A9EF] rounded-[24px] p-[4px] px-[12px] pl-[6px] cursor-pointer items-center justify-center"
            onClick={handleClick}
          >
            <svg
              className="min-w-[20px] min-h-[20px]"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g mask="url(#mask0_5716_136351)">
                <path
                  d="M11 13H5V11H11V5H13V11H19V13H13V19H11V13Z"
                  fill="#FFFFFF"
                />
              </g>
            </svg>
            <p className="flex items-center text-[14px] font-semibold text-[#FFFFFF] leading-[17.07px]">
              Add
            </p>
          </div>
        </div>
      </div>

      {keyResponsibilities.map((responsibility, index) => (
        <div
          key={index}
          className="flex flex-col gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"
        >
          <div className="flex flex-row justify-between items-center">
            <div className="font-montserrat text-[12px] font-semibold leading-[14.63px] text-left">
              Entry {index + 1}
            </div>
            <div className="flex flex-row justify-end items-center gap-[8px]">
              <div
                onClick={() => handleId(index)}
                className="flex  justify-center items-center shadow-custom-md p-[6px] rounded-[24px] bg-[#F4F4F4] h-[30px] w-[30px]"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.16477 13.8317H3.21604L11.7465 5.30121L10.6953 4.24994L2.16477 12.7804V13.8317ZM0.914795 15.0817V12.2612L11.9068 1.27402C12.0328 1.15956 12.1719 1.07112 12.3242 1.00868C12.4765 0.946254 12.6362 0.915039 12.8032 0.915039C12.9703 0.915039 13.1322 0.944692 13.2888 1.004C13.4454 1.06329 13.5841 1.15757 13.7048 1.28683L14.7224 2.31727C14.8517 2.43799 14.9439 2.57691 14.9989 2.73402C15.0539 2.89112 15.0814 3.04821 15.0814 3.20531C15.0814 3.37288 15.0528 3.5328 14.9956 3.68506C14.9383 3.83734 14.8473 3.97648 14.7224 4.1025L3.73527 15.0817H0.914795ZM11.2117 4.78479L10.6953 4.24994L11.7465 5.30121L11.2117 4.78479Z"
                    fill="#646464"
                  />
                </svg>
              </div>
              <div
                onClick={() => handleDelete(index)}
                className="flex  justify-center items-center shadow-custom-md p-[6px] rounded-[24px] bg-[#F4F4F4] h-[30px] w-[30px]"
              >
                <svg
                  width="14"
                  height="16"
                  viewBox="0 0 14 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.83325 15.5C2.37492 15.5 1.98256 15.3368 1.65617 15.0104C1.32978 14.684 1.16659 14.2917 1.16659 13.8333V3H0.333252V1.33333H4.49992V0.5H9.49992V1.33333H13.6666V3H12.8333V13.8333C12.8333 14.2917 12.6701 14.684 12.3437 15.0104C12.0173 15.3368 11.6249 15.5 11.1666 15.5H2.83325ZM11.1666 3H2.83325V13.8333H11.1666V3ZM4.49992 12.1667H6.16658V4.66667H4.49992V12.1667ZM7.83325 12.1667H9.49992V4.66667H7.83325V12.1667Z"
                    fill="#646464"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex flex-col p-[12px] gap-[6px]">
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Action:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.action}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Objective:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.objective}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Collaboration:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.collaboration.join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Required skills:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.required_skill.join(", ")}
              </p>
            </div>
            <div className="flex flex-col gap-[4px]">
              <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                Frequency:
              </h6>
              <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                {responsibility.frequency}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KeyResponsibility;
