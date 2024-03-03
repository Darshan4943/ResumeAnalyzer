import React, { useState } from "react";

const FileNameModel = ({ setNamePreview, setFunction, data }) => {
  const [name, setName] = useState(data.firstName + "_resume");

  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
        <div className=" absolute bg-white  px-4 py-2 rounded-lg shadow-lg h-[167px] flex flex-col gap-2 items-end w-[486px]">
          <div className="text-[20px] text-[#333333] font-500 w-full">
            Enter File Name
          </div>
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter File Name"
              value={name}
              className="py-[12px] px-[16px] text-[14px] w-full border rounded-[8px] border-[#DEDEDE] h-[48px]"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="flex justify-between  py-2 gap-2">
            <button
              className=" font-montserrat text-xs font-semibold px-[12px] rounded-[8px] border border-[#06A9EF] w-[83px] h-[32px]"
              onClick={() => setNamePreview(false)}
            >
              Cancle
            </button>
            <button
              className={` font-montserrat text-white font-medium text-[12px] px-[12px] rounded-[8px]  bg-[#06A9EF] w-[60px] h-[32px]`}
              onClick={() => {
                setFunction(name);
                setName("");
                setNamePreview(false);
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileNameModel;
