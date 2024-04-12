import React, { useState } from "react";
import { plans } from "../../../utils/data";
import { useRouter } from "next/router";

const Plans = () => {
  const router = useRouter();
  const { recruiterid,role } = router.query;
  const [selectedPlan, setSelectedPlan] = useState(plans[0]);

  return (
    <div className="flex justify-center pt-4  pb-2">
      <div className="personal_details_form scr1250:w-[60%] sm:w-[80%] w-[95%] education_page min-h-[60vh]  ">
        <div className="flex flex-row w-full gap-[24px]">
          <div className="flex flex-col gap-[24px] justify-between w-[48%]">
            <div className="flex flex-col gap-[24px] w-full">
              <span className="text-[24px] text-[#333333] font-medium">
                Select Plan
              </span>
              <div className="flex flex-col gap-[16px]">
                {plans.slice(0,3).map((item, index) => (
                  <div
                    onClick={() => setSelectedPlan(item)}
                    className={`flex flex-row gap-[16px] px-[24px] py-[12px] w-full h-[76px] items-center rounded-[16px] ${
                      selectedPlan.index == item.index && "bg-[#d7f3ff]"
                    }`}
                    key={index}
                    style={{
                      boxShadow: "0px 1px 2px 0px #00000040",
                    }}
                  >
                    <div className="w-[16%] text-[20px] text-[#333333] border-r-[1px] border-[#bebebe] pr-[8px] h-full flex items-center font-medium">
                      {item.price}
                    </div>
                    <div className="w-[84%] flex flex-col gap-[8px] h-full">
                      <span className="text-[16px] text-[#333333] font-medium">
                        {item.duration} {item.limit}
                      </span>
                      <span className="text-[14px] text-[#333333] font-normal">
                        {item.days} Days Validity
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className=" w-full font-[500] flex flex-row gap-[16px] justify-end ">
              <button
                className="buttons"
                id="border_button"
                onClick={(e) => {
                  e.preventDefault();
                  router.back();
                }}
              >
                Cancel
              </button>
              <button
                className="buttons font-[500] bg-[#06A9EF] text-white"
                id="border_button"
                onClick={() =>
                  router.push(
                    `/purchase/details?id=${selectedPlan.index}&recruiterid=${recruiterid}&role=${role}`
                  )
                }
              >
                Continue
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-[24px] w-[48%] items-center">
            <div
              className={` relative mt-[40px] bg-white  flex flex-col gap-4 items-center rounded-[16px] purchase-plan-card  max-w-[19vw]`}
              style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
            >
              <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center h-full justify-between">
                <div className="flex text-center flex-col gap-3 text-[#333333] ">
                  <p className="text-[1.4vw] font-[600]">
                    <span className="text-[#06A9EF]">
                      {selectedPlan.duration}
                    </span>{" "}
                    {selectedPlan.limit}
                  </p>
                  <p className="text-[2.5vw] font-[700]">
                    {selectedPlan.price}
                  </p>
                  <p
                    className="text-[1vw] font-[500]"
                    style={{ textTransform: "capitalize" }}
                  >
                    {selectedPlan.description}
                  </p>
                  <div className="bg-[#DEDEDE] h-[2px]" />
                </div>
                <div className="flex gap-3 flex-col text-left">
                  {selectedPlan.features.map((feature, index) => (
                    <div key={index} className="flex gap-3 items-start ">
                      <svg
                        className="min-w-[20px]"
                        width="20"
                        height="18"
                        viewBox="0 0 20 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M7.16683 17.75L5.5835 15.0833L2.5835 14.4167L2.87516 11.3333L0.833496 9L2.87516 6.66667L2.5835 3.58333L5.5835 2.91667L7.16683 0.25L10.0002 1.45833L12.8335 0.25L14.4168 2.91667L17.4168 3.58333L17.1252 6.66667L19.1668 9L17.1252 11.3333L17.4168 14.4167L14.4168 15.0833L12.8335 17.75L10.0002 16.5417L7.16683 17.75ZM9.12516 11.9583L13.8335 7.25L12.6668 6.04167L9.12516 9.58333L7.3335 7.83333L6.16683 9L9.12516 11.9583Z"
                          fill="#06A9EF"
                        />
                      </svg>
                      <p className="text-[0.8vw] font-[500]">{feature}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
