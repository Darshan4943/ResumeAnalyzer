import React, { useState } from "react";

const Benifits = ({ extratctedData, setExtractedData }) => {
  const [expand, setExpand] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");

  const handleExpand = () => {
    setExpand(!expand);
    resetForm();
  };

  const handleEdit = (index) => {
    const benefit = extratctedData.benefits[index];
    setType(benefit.type);
    setDescription(benefit.description);
    setIsEdit(true);
    setEditIndex(index);
    setExpand(true);
  };

  const handleAddOrUpdate = () => {
    if (type.trim() === "" || description.trim() === "") return;
    const updatedBenefits = [...extratctedData.benefits];
    if (isEdit) {
      updatedBenefits[editIndex] = { type, description };
    } else {
      updatedBenefits.push({ type, description });
    }

    setExtractedData({ ...extratctedData, benefits: updatedBenefits });
    resetForm();
    setExpand(false);
  };

  const resetForm = () => {
    setIsEdit(false);
    setEditIndex(null);
    setType("");
    setDescription("");
  };

  return (
    <div className="flex flex-col w-full gap-[8px]">
      <div className="flex flex-row justify-between w-[416px]">
        <h6 className="flex font-bold text-[14px] text-left font-montserrat gap-2">
          Benefits<span className="text-[#C00000]">*</span>
        </h6>
        <div onClick={handleExpand}>
          {expand ? (
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.288383 1.99126L1.40855 0.871094L7.9999 7.46245L14.5913 0.871094L15.7114 1.99126L7.9999 9.70278L0.288383 1.99126Z"
                fill="#1C1B1F"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="10"
              viewBox="0 0 16 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.288383 1.99126L1.40855 0.871094L7.9999 7.46245L14.5913 0.871094L15.7114 1.99126L7.9999 9.70278L0.288383 1.99126Z"
                fill="#1C1B1F"
              />
            </svg>
          )}
        </div>
      </div>
      {expand && (
        <>
          {extratctedData &&
            extratctedData?.benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col w-[416px] gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"
              >
                <div className="flex flex-row justify-between items-center">
                  <div className="font-montserrat text-[12px] font-semibold leading-[14.63px] text-left">
                    {index + 1}
                  </div>
                  <div onClick={() => handleEdit(index)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer"
                    >
                      <path
                        d="M12.05 20.9492H13.0064L20.0377 13.918L19.0814 12.9617L12.05 19.993V20.9492ZM10.7002 22.2992V19.4305L20.0377 10.093C20.1752 9.95547 20.3242 9.85547 20.4847 9.79297C20.6451 9.73047 20.8138 9.69922 20.9909 9.69922C21.1679 9.69922 21.3377 9.73047 21.5002 9.79297C21.6627 9.85547 21.8127 9.95547 21.9502 10.093L22.9064 11.0492C23.0439 11.1867 23.1439 11.3367 23.2064 11.4992C23.2689 11.6617 23.3002 11.8276 23.3002 11.9968C23.3002 12.1775 23.2688 12.3496 23.2061 12.5132C23.1433 12.6768 23.0434 12.8263 22.9064 12.9617L13.5689 22.2992H10.7002ZM19.5511 13.4483L19.0814 12.9617L20.0377 13.918L19.5511 13.4483Z"
                        fill="#808080"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col p-[12px] gap-[6px]">
                  <div className="flex flex-col gap-[4px]">
                    <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                      Type:
                    </h6>
                    <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                      {benefit.type}
                    </p>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                      Description:
                    </h6>
                    <p className="font-montserrat text-[12px] font-medium leading-[14.63px] text-left">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          <div className="flex flex-col w-[416px] gap-[4px]">
            <label className="flex font-medium text-[14px] text-left font-montserrat gap-2">
              Type<span className="text-[#C00000]"> *</span>
            </label>
            <input
              type="text"
              placeholder="Enter benefit e.g. Remote Work"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]"
            />
          </div>
          <div className="flex flex-col w-[416px] gap-[4px]">
            <label className="flex font-medium text-[14px] text-left font-montserrat gap-2">
              Description<span className="text-[#C00000]"> *</span>
            </label>
            <div className="border-[0.2px] border-[#9D9D9D] rounded-[12px] p-[12px] min-h-[100px] flex items-center justify-center">
              <textarea
                type="text"
                className="w-full text-[14px] font-montserrat font-small min-h-[120px] outline-none py-[11px] px-[16px] rounded-[8px] "
                placeholder="Enter description"
                maxLength={200}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row justify-end gap-[4px] w-[416px]">
            <button
              type="button"
              onClick={handleAddOrUpdate}
              className="py-[8px] px-[16px] border border-solid border-[#06A9EF] rounded-[8px] bg-[#FFFFFF] text-[#33333]"
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
