import React from "react";
function Job_card({ jobData }) {
  return (
    <>
      <div
        className="flex bg-[#D6E8FE] rounded-[12px] py-[24px] items-center mt-[24px] ml:px-8 px-2 "
        style={{ boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.25)" }}
      >
        {/* <img
          className="w-[24px] ml-[8px] mr-[4px] items-center"
          src="/images/afterLoginHome/arrow_back_ios_new.png"
          alt=""
        /> */}
        <div className="flex items-start flex-col gap-[16px]  w-[100%]">
          <div className="flex justify-between w-[100%] items-start ">
            <div>
              {" "}
              <p className="font-[600] text-[16px]">Top 10 Recommended jobs</p>
            </div>
            <div>
              {" "}
              {/* <p className="font-[600] text-[16px] text-[#646464]">See all </p> */}
            </div>{" "}
          </div>
          <div className="flex items-start gap-[16px] pb-4 w-[100%] overflow-y-scroll ">
            {jobData?.map((item) => (
              <div className="flex p-[16px] flex-col items-start gap-[8px] rounded-[16px] bg-[#fff] h-[160px]">
                <div className="flex justify-end  items-start w-[16.43rem]">
                  {/* <img
                    className="w-[55px]"
                    src="/images/afterLoginHome/ux_img.png"
                    alt=""
                  /> */}
                  <p className="font-[400] text-[12px] ">{item.postedAt}</p>
                </div>
                <p className="text-[16px] font-[500] text-[#333]">
                  {item.title}
                </p>
                <div className="flex items-center gap-[8px]">
                  <p className="text-[14px] ">{item.company}</p>
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M6 1.30902L7.10932 4.72315L7.16545 4.8959H7.34708H10.9369L8.03268 7.00595L7.88573 7.11271L7.94186 7.28546L9.05118 10.6996L6.14695 8.58954L6 8.48278L5.85305 8.58954L2.94882 10.6996L4.05814 7.28546L4.11426 7.11271L3.96732 7.00595L1.06308 4.8959H4.65292H4.83455L4.89068 4.72315L6 1.30902Z"
                      fill="#FFD500"
                      stroke="#FFCC7E"
                      stroke-width="0.5"
                    />
                  </svg>
                  <p className="text-[10px] font-[400]">3.7</p> */}
                </div>
                <p className="text-[12px] font-[400]">{item.location}</p>
              </div>
            ))}
          </div>
        </div>
        {/* <img
          className="w-[24px] mr-[8px] ml-[4px]  items-center"
          src="/images/afterLoginHome/arrow_forward_ios.png"
          alt=""
        /> */}
      </div>
    </>
  );
}

export default Job_card;
