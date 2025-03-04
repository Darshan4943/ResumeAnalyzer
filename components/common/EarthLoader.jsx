import React from "react";

const EarthLoader = () => {
  return (
    <>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
      <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 flex items-center justify-center  ">
        <div className="relative earth_loader flex flex-col items-center justify-center gap-[24px]">
            <div>
            <img src="/images/loader/earth.png" alt="" className="h-[100px] w-[100px]" />
            <img src="/images/loader/glass.png" alt="" className="h-[126px] w-[117px] object-contain glass" />
            </div>
            <div className="flex flex-col items-center justify-center relative z-100">
            <span className="text-center text-[#fff] text-[14px]">Analyzing Data </span>
            <span className="text-left text-[#fff] text-[14px] loading_dots">Please wait </span>
            </div>
        </div>
      </div>
    </>
  );
};

export default EarthLoader;
