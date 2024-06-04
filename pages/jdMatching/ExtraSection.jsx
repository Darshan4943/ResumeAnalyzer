import React, { useState } from "react";

const ExtraSection = ({
  setAddExtraSection,
  extratctedData,
  setExtractedData,
  setIsExtraData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };
  const handleSave = () => {
    const newEntry = { [title]: [description] };
    const extraSection = extratctedData.extra_section || {};
    const updatedExtraSection = { ...extraSection, ...newEntry };

    // Add new key-value pair to extratctedData under "extra_section"
    const newExtractedData = {
      ...extratctedData,
      extra_section: updatedExtraSection,
    };
    setExtractedData(newExtractedData);

    // Clear inputs and close form
    setIsExtraData(true);
    setTitle("");
    setDescription("");
    setAddExtraSection(false);
  };

  return (
    <div>
      <div className="flex flex-col gap-[8px]">
        <input
          type="text"
          name="title"
          placeholder="Enter Header"
          value={title}
          onChange={handleInputChange}
          className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px]"
        />
        <div className="flex flex-col gap-[4px]">
          <div>
            <h6 className="font-montserrat text-[14px] font-medium leading-[17.07px] text-[#333333]">
              Description <span className="text-[#C00000]">*</span>
            </h6>
          </div>
          <div>
            <textarea
              name="description"
              className="w-full text-[12px] font-montserrat font-small outline-none border border-solid border-[#DEDEDE] rounded-[8px] py-[11px] px-[16px]"
              placeholder="Enter text"
              maxLength={400}
              value={description}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex justify-end items-end gap-[10px] bg-[#FFFFF] ">
          <div className="flex rounded-[24px] px-[12px] py-[6px] border border-solid border-[#06A9EF]">
            <p
              onClick={() => setAddExtraSection(false)}
              className="text-[14px] font-semibold text-[#333333] cursor-pointer text-center"
            >
              Cancel
            </p>
          </div>
          <div className="flex rounded-[24px] px-[12px] py-[6px] border border-solid border-[#06A9EF]">
            <p
              onClick={handleSave}
              className="text-[14px] font-semibold text-[#333333] cursor-pointer text-center"
            >
              Save
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExtraSection;
