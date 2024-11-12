import React, { useState } from "react";

const Benifits = ({ extratctedData, setExtractedData }) => {
  const [expand, setExpand] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [showFrom, setShowForm] = useState(false);

  const handleExpand = () => {
    setExpand(!expand);
    resetForm();
  };

  const handleEdit = (index) => {
    setShowForm(true);
    const benefit = extratctedData?.benefits[index];
    setType(benefit.type);
    setDescription(benefit.description);
    setIsEdit(true);
    setEditIndex(index);
    setExpand(true);
  };

  const handleDelete = (index) => {
    if (extratctedData?.benefits?.length > 0 && index >= 0) {
      const filteredBenefits = extratctedData.benefits.filter(
        (_, i) => i !== index
      );

      setExtractedData({
        ...extratctedData,
        benefits: filteredBenefits,
      });
    }
  };

  const handleAddOrUpdate = () => {
    if (type.trim() === "" || description.trim() === "") return;
    const updatedBenefits = [...extratctedData?.benefits];
    if (isEdit) {
      updatedBenefits[editIndex] = { type, description };
    } else {
      updatedBenefits.push({ type, description });
    }
    setExtractedData({ ...extratctedData, benefits: updatedBenefits });
    resetForm();
  };

  const resetForm = () => {
    setIsEdit(false);
    setEditIndex(null);
    setType("");
    setDescription("");
  };

  return (
    <div className="flex flex-col w-full gap-[8px]">
      <div className="flex flex-row justify-between items-center  ">
        <div className="font-montserrat text-[14px] font-medium leading-[17.07px] text-left">
          Benefits<span className="text-[#C00000]">*</span>
        </div>
        <div>
          <div
            className="flex gap-1 bg-[#06A9EF] rounded-[24px] p-[4px] px-[12px] pl-[6px] cursor-pointer items-center justify-center"
            // onClick={handleClick}
            onClick={() => setShowForm(!showFrom)}
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

      {extratctedData &&
        extratctedData?.benefits?.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col  gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"
          >
            <div className="flex flex-col p-[12px] gap-[6px]">
              <div className="flex flex-col gap-[4px]">
                <div className="flex flex-row justify-between items-center">
                  <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                    <span className="font-montserrat text-[12px] text-left leading-[14.63px] font-[600]">
                      {index + 1}
                    </span>
                    {" . "}
                    Type:
                  </h6>
                  <div className="flex flex-row items-center justify-end gap-[8px]">
                    <div
                      onClick={() => handleEdit(index)}
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

                <p className="font-montserrat text-[12px] font-[400] leading-[14.63px] text-left">
                  {benefit.type}
                </p>
              </div>
              <div className="flex flex-col gap-[4px]">
                <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-[600]">
                  Description:
                </h6>
                <p className="font-montserrat text-[12px] font-[400] leading-[14.63px] text-left">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}

      {showFrom && (
        <>
          <div className="flex flex-col  gap-[4px]">
            <label className="flex font-[500] text-[14px] text-left font-montserrat gap-2">
              Type<span className="text-[#C00000]"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter benefit e.g. Remote Work"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            />
          </div>
          <div className="flex flex-col  gap-[4px]">
            <label className="flex font-[500] text-[14px] text-left font-montserrat gap-2">
              Description<span className="text-[#C00000]"> *</span>
            </label>
            <div className="border-[0.2px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[100px] flex items-center justify-center">
              <textarea
                type="text"
                className="w-full text-[12px] font-montserrat font-[400] min-h-[120px] outline-none py-[11px] px-[16px] rounded-[8px] "
                placeholder="Enter description"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-[4px] ">
            {isEdit && (
              <button
                type="button"
                onClick={() => {
                  resetForm(), setShowForm(false);
                }}
                className="py-[4px] px-[8px] border border-solid border-[#06A9EF] rounded-[8px] bg-[#FFFFFF] text-[#33333] text-[14px]"
              >
                Cancel
              </button>
            )}
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className="py-[4px] px-[8px] border border-solid border-[#06A9EF] rounded-[8px] bg-[#FFFFFF] text-[#33333] text-[14px]"
            >
              {isEdit ? "Update" : "Add"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Benifits;
