import { Close_svg } from "@/utils/svg";
import React, { useState } from "react";

const AboutModal = ({ handleImageClick }) => {
  const [text, setText] = useState("Hello");
  console.log(text);
  
  return (
    <>
      <div id="demo-modal" class="modal ">
        <div class="modal__content w-[56%] gap-4 flex flex-col p-6 rounded-xl">
          <div className="flex items-center gap-4 self-stretch w-full">
            <div className="w-[23.24%] text-[#25324B] font-Montserrat font-medium text-base lg:text-xl leading-160">
              Edit About me
            </div>
            <div className="bg-[#DEDEDE] h-[1px] w-[68.45%]"></div>

            <Close_svg handleImageClick={handleImageClick} />
          </div>
          <div className="flex w-full  px-4 py-3 rounded-md border border-gray-300 bg-white">
            <textarea
              className="text-[#333] font-Montserrat text-base font-normal leading-170 w-full focus:outline-none"
              name=""
              id=""
              cols="30"
              rows="10"
              onChange={(e) => setText(e.target.value)}
              value={text}
            ></textarea>
          </div>
          <div className="w-full flex justify-between items-start self-stretch">
            <div className=" flex px-4 py-2 justify-center items-center gap-2 rounded-md border border-primary bg-white">
              <img
                src="/images/jobs/strs.png"
                alt=""
                className="w-[20px] h-[20px]"
              />
              <p className="text-[14px]  text-[#333] font-Montserrat text-14 font-semibold leading-normal">
                Generate with AI
              </p>
            </div>
            <p className="text-Text-Secondary text-right font-Montserrat text-14 font-normal leading-170]">
              250 characters left
            </p>
          </div>
          <div className="w-full flex items-end justify-end self-stretch">
            <button
              className="flex items-center justify-center px-4 py-2 font-Montserrat text-16 font-medium leading-normal rounded-md border-[#06A9EF]  bg-white "
              onClick={handleImageClick}
            >
              Cancel
            </button>
            <button className="flex items-center justify-center px-4 py-2 font-Montserrat text-16 font-medium leading-normal text-[#fff]  border-[#06A9EF]  bg-[#06A9EF] rounded-md border border-border-color bg-primary">
              On click
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutModal;
