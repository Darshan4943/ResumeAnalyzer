import React from "react";

const InterviewQues = () => {
  return (
    <>
      <div
        class="  p-[16px] flex flex-col gap-[12px] h-[482px] rounded-lg "
        style={{
          boxShadow: " 0px 0.5px 3px 0px rgba(0, 0, 0, 0.25)",
        }}
      >
        <p class="w-full text-[20px] font-[500]">Tell me about yourself.</p>
        <p className="w-full text-[14px] font-[600]">Answer:</p>
        <textarea
          placeholder="Type here"
          class=" h-[126px] my-[12px] rounded-lg border-[#646464] border-[0.7px] border-solid px-4 py-3 "
        >

        </textarea>
        <button class="rounded-[8px] border-[0.7px] w-[125px] h-[41px] border-[#06A9EF] ">
          Submit
        </button>
      </div>
    </>
  );
};

export default InterviewQues;
