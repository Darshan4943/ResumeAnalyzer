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
        <h6 className="flex font-semibold text-[14px] text-left font-montserrat gap-2">
          Benefits<span className="text-[#C00000]">*</span>
        </h6>
        {/**    <div onClick={handleExpand}>
          {expand ? (
            <svg
              width="16"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.0001 4.27784L2.94467 11.3333C2.67606 11.6019 2.35189 11.7314 1.97217 11.722C1.59272 11.7128 1.2687 11.5739 1.00008 11.3053C0.731473 11.037 0.597168 10.7084 0.597168 10.3195C0.597168 9.93062 0.731473 9.60187 1.00008 9.33325L9.028 1.30534C9.30578 1.02756 9.62981 0.888672 10.0001 0.888672C10.3704 0.888672 10.6944 1.02756 10.9722 1.30534L19.028 9.36117C19.2963 9.62951 19.4305 9.95353 19.4305 10.3333C19.4305 10.713 19.2963 11.037 19.028 11.3053C18.7594 11.5739 18.4306 11.7083 18.0418 11.7083C17.6529 11.7083 17.3241 11.5739 17.0555 11.3053L10.0001 4.27784Z"
                fill="#333333"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="10"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.99988 11.097C9.81461 11.097 9.64336 11.067 9.48614 11.007C9.32864 10.9467 9.17586 10.8426 9.0278 10.6945L0.971967 2.63867C0.703634 2.37034 0.574051 2.04173 0.583218 1.65284C0.592385 1.26395 0.731273 0.935199 0.999885 0.666588C1.2685 0.397977 1.59725 0.263672 1.98614 0.263672C2.37502 0.263672 2.70363 0.397977 2.97197 0.666588L9.99988 7.722L17.0553 0.666588C17.3239 0.397977 17.6481 0.268393 18.0278 0.277837C18.4072 0.287004 18.7313 0.425893 18.9999 0.694504C19.2685 0.962837 19.4028 1.29145 19.4028 1.68034C19.4028 2.06923 19.2685 2.39798 18.9999 2.66659L10.972 10.6945C10.8239 10.8426 10.6711 10.9467 10.5136 11.007C10.3564 11.067 10.1852 11.097 9.99988 11.097Z"
                fill="#333333"
              />
            </svg>
          )}
        </div>*/}
      </div>

      {extratctedData &&
        extratctedData?.benefits.map((benefit, index) => (
          <div
            key={index}
            className="flex flex-col w-[416px] gap-[8px] border-b-[1px] border-solid border-[#DEDEDE]"
          >
            <div className="flex flex-col p-[12px] gap-[6px]">
              <div className="flex flex-col gap-[4px]">
                <div className="flex flex-row justify-between items-center">
                  <h6 className="font-montserrat text-[12px] leading-[14.63px] text-left font-semibold">
                    <span className="font-montserrat text-[12px] font-semibold leading-[14.63px] text-left">
                      {index + 1}
                    </span>
                    {" . "}
                    Type:
                  </h6>
                  <div onClick={() => handleEdit(index)}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="cursor-pointer shadow-custom-sm"
                    >
                      <path
                        d="M12.05 20.9492H13.0064L20.0377 13.918L19.0814 12.9617L12.05 19.993V20.9492ZM10.7002 22.2992V19.4305L20.0377 10.093C20.1752 9.95547 20.3242 9.85547 20.4847 9.79297C20.6451 9.73047 20.8138 9.69922 20.9909 9.69922C21.1679 9.69922 21.3377 9.73047 21.5002 9.79297C21.6627 9.85547 21.8127 9.95547 21.9502 10.093L22.9064 11.0492C23.0439 11.1867 23.1439 11.3367 23.2064 11.4992C23.2689 11.6617 23.3002 11.8276 23.3002 11.9968C23.3002 12.1775 23.2688 12.3496 23.2061 12.5132C23.1433 12.6768 23.0434 12.8263 22.9064 12.9617L13.5689 22.2992H10.7002ZM19.5511 13.4483L19.0814 12.9617L20.0377 13.918L19.5511 13.4483Z"
                        fill="#808080"
                      />
                    </svg>
                  </div>
                </div>

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
        {isEdit && (
          <button
            type="button"
            onClick={() => resetForm()}
            className="py-[8px] px-[24px] border border-solid border-[#06A9EF] rounded-[8px] bg-[#FFFFFF] text-[#33333]"
          >
            Cancel
          </button>
        )}
        <button
          type="button"
          onClick={handleAddOrUpdate}
          className="py-[8px] px-[24px] border border-solid border-[#06A9EF] rounded-[8px] bg-[#FFFFFF] text-[#33333]"
        >
          {isEdit ? "Update" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default Benifits;
