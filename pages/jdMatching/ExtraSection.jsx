import React from "react";

const ExtraSection = ({setAddExtraSection}) => {
  return (
    <div>
      <div className="flex flex-col gap-[8px]">
        <input
          type="text"
          //   name={item.name}
          placeholder="Enter Header"
          // className="w-full text-[14px] "
          // value={profileData[item.name]}
          // onChange={handleInputChange}
          // disabled={!isChecked}

          class="w-full py-[11px] px-[16px] gap-[10px] border border-solid border-[#DEDEDE] rounded-[8px] "
        />
        <div className="flex flex-col gap-[4px]">
          <div>
            <h6 class="font-montserrat text-[14px] font-medium leading-[17.07px] text-[#333333]">
              Description <span className="text-[#C00000]">*</span>
            </h6>
          </div>
          <div>
            <textarea
              type="text"
              name=""
              className="w-full text-[12px] font-montserrat font-small outline-none border border-solid border-[#DEDEDE] rounded-[8px] py-[11px] px-[16px]"
              placeholder="Enter text"
              maxLength={400} // Set maximum length
              // onChange={(e) => {
              //   setText(e.target.value.slice(0, 400)); // Limit input to 400 characters
              // }}
            />
          </div>
        </div>

        <div className="flex justify-end items-end gap-[10px] bg-[#FFFFF] ">
          <div className="flex rounded-[24px] px-[12px] py-[6px] border border-solid border-[#06A9EF]">
            <p
              onClick={() => setAddExtraSection(false)}
              className="text-[14px] font-semibold text-[#333333] cursor-pointer text-center"
              // disabled={!isChecked}
            >
              Cancel
            </p>
          </div>
          <div className="flex rounded-[24px] px-[12px] py-[6px] border border-solid border-[#06A9EF]">
            <p
              // onClick={() => setView(true)}
              className="text-[14px] font-semibold text-[#333333] cursor-pointer text-center"
              // disabled={!isChecked}
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
