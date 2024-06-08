import React, { useState, useEffect } from "react";
import { Close_svg } from "../../utils/svg";

const ExtraSectionForm = ({
  isEdit,
  setShowForm,
  extratctedData,
  setExtractedData,
  editId,
  setEditId,
  setIsEdit,
}) => {
  const [formData, setFormData] = useState({
    action: "",
    objective: "",
    collaboration: "",
    frequency: "",
    required_skill: [],
  });
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (isEdit && editId !== null) {
      const editData = extratctedData?.key_responsibilities?.find(
        (item, index) => index === editId
      );
      if (editData) {
        setFormData({
          action: editData.action,
          objective: editData.objective,
          collaboration: editData.collaboration.join(", "),
          frequency: editData.frequency,
          required_skill: editData.required_skill,
        });
      }
    } else {
      setFormData({
        action: "",
        objective: "",
        collaboration: "",
        frequency: "",
        required_skill: [],
      });
    }
  }, [isEdit, editId, extratctedData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      required_skill: value.split(",").map((skill) => skill.trim()),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      action: formData.action,
      objective: formData.objective,
      collaboration: formData.collaboration
        .split(",")
        .map((collab) => collab.trim()),
      frequency: formData.frequency,
      required_skill: formData.required_skill,
    };

    if (isEdit) {
      const updatedKeyResponsibilities =
        extratctedData.key_responsibilities.map((item, index) =>
          index === editId ? { ...item, ...updatedFormData } : item
        );
      setExtractedData({
        ...extratctedData,
        key_responsibilities: updatedKeyResponsibilities,
      });
    } else {
      setExtractedData({
        ...extratctedData,
        key_responsibilities: [
          ...extratctedData.key_responsibilities,
          updatedFormData,
        ],
      });
    }

    setShowForm(false);
    setIsEdit(false);
  };

  return (
    <div className="flex items-center ml:pt-[16vh] pt-[32vh]">
      <div className="ml:hidden block absolute top-0 left-0 right-0 bottom-0 bg-[#FFFFFF] bg-opacity-70"></div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col ml:w-[448px] w-[400px] gap-[16px] p-[24px_16px] h-fit border border-solid  border-[#DEDEDE] rounded-[8px]  ml:relative absolute ml:top-0 top-[62px] left-0 bg-[#FFFFFF]  z-[6]  ml:z-[10] ml-[18px] "
      >
        <div className="flex flex-col gap-[8px]">
          <label className="font-montserrat text-[14px] font-medium">
            Action
          </label>
          <input
            type="text"
            name="action"
            value={formData.action}
            onChange={handleInputChange}
            className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            placeholder="Enter Actions"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-montserrat text-[14px] font-medium">
            Objective
          </label>
          <input
            type="text"
            name="objective"
            value={formData.objective}
            onChange={handleInputChange}
            className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            placeholder="Enter Objectives"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-montserrat text-[14px] font-medium">
            Collaboration
          </label>
          <input
            type="text"
            name="collaboration"
            value={formData.collaboration}
            onChange={handleInputChange}
            className="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            placeholder="Enter Collaborations"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-montserrat text-[14px] font-medium">
            Frequency
          </label>
          <input
            type="text"
            name="frequency"
            value={formData.frequency}
            onChange={handleInputChange}
            className="w-full py-[11px] px-[16px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            placeholder="Enter Frequency"
          />
        </div>
        <div className="flex flex-col gap-[8px]">
          <label className="font-montserrat text-[14px] font-medium">
            Required Skills
          </label>
          <input
            type="text"
            name="required_skill"
            value={formData.required_skill.join(", ")}
            onChange={handleSkillChange}
            className="w-full py-[11px] px-[16px] border border-solid border-[#DEDEDE] rounded-[8px] text-[12px]"
            placeholder="e.g., JavaScript, React"
          />
        </div>
        <div className="flex flex-row justify-end gap-[8px]">
          <button
            type="button"
            onClick={() => {
              setShowForm(false);
              setIsEdit(false);
            }}
            className="py-[8px] px-[16px] border border-solid border-[#06A9EF] rounded-[8px] bg-gray-200 text-[12px]"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="py-[8px] px-[16px] border border-solid border-[#06A9EF] rounded-[8px] bg-[#06A9EF] text-white text-[12px]"
          >
            {isEdit === true ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExtraSectionForm;
