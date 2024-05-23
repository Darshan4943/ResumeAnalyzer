import React from "react";

function Certificate() {
  return (
    <div className="w-[1056px] h-[746px] relative">
      <div
        style={{
          backgroundImage: `url(${"/images/skilltest.png"})`,
          height: "100%",
          width: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="gap-6 flex flex-col  items-center top-[20px] justify-center absolute "
      >
        <div className=" w-[100%] h-[10%] flex flex-col justify-center items-center ">
          <img
            src="/images/logo_skilotech.png"
            className="w-[322px] h-[100px]"
          />
        </div>
        <div className=" w-[100%] h-[10%] flex flex-col justify-center items-center ">
          <span className="font-Montserrat text-[42px] font-semibold text-[ #333333] uppercase">
            Certificate of Completion
          </span>
        </div>
        <div className="w-[463px] h-[300px] gap-2 flex flex-col justify-center items-center">
          <span className="font-Montserrat text-[26px] font-[500] text-[ #333333]">
            This is to certify that
          </span>

          <div className="w-[100%]  gap-2 flex flex-col justify-center items-center">
            <span className="font-Montserrat text-[32px] font-[600] text-[ #333333]">
              Samrangan Bhanuse
            </span>
            <div className="w-[453px] bg-[#FFD500] h-[2px]"></div>
          </div>
          <span className="font-Montserrat text-[18px] font-[500] text-[ #333333]">
            has succesfully completed the Skill Assessment on
          </span>
          <div className="w-[100%]  gap-2 flex flex-col justify-center items-center">
            <span className="font-Montserrat text-[28px] font-[500] text-[ #333333]">
              Python (Advanced)
            </span>
            <div className="w-[453px] bg-[#FFD500] h-[2px]"></div>
          </div>
          <div className="w-[100%]  gap-2 flex flex-col justify-center items-center">
            <span className="font-Montserrat text-[16px] font-[500] text-[ #333333]">
              Issued on :
            </span>
            <span className="font-Montserrat text-[24px] font-[500] text-[ #333333]">
              May 23 2024
            </span>
            <div className="w-[248px] bg-[#FFD500] h-[2px]"></div>
          </div>
        </div>

        <div className="w-[136px] h-[136px]  flex flex-col justify-center  absolute top-[550px] left-[100px]">
          <img src="/images/Group.png" className="w-[100%] h-[100%]" />
        </div>
        <div className="w-[189px] h-[75px]  flex flex-col justify-end items-end  absolute top-[600px] right-[100px]">
          <span className="font-Montserrat text-[14px] font-[400] text-[ #333333]">
            REACH US AT
          </span>
          <span className="font-Montserrat text-[14px] font-[400] text-[ #333333]">
            www.skilotech.com
          </span>
          <span className="font-Montserrat text-[14px] font-[400] text-[ #333333]">
            operations@skilotech.com
          </span>
        </div>
      </div>
    </div>
  );
}

export default Certificate;
