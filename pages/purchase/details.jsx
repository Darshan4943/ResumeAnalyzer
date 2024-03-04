import React, { useEffect, useState } from "react";
import AccountDetails from "../../components/featured/home/AccountDetails";
import { useRouter } from "next/router";
import { plans } from "../../utils/data";

function Details() {
  const router = useRouter();
  const { id } = router.query;

  const [selectedPlan, setSelectedPlan] = useState({});
  useEffect(() => {
    setSelectedPlan(plans.find((item, index) => index == id - 1));
  }, [id]);

  return (
    <div className="pt-2 flex flex-col gap-9">
      <div className="flex flex-col justify-center items-center bg-blue h-[89px]  py-3">
        <div className=" font-semibold text-[30px] text-white">Purchase</div>
        <div className=" font-medium text-[16px] text-white">
          Purchase plan and make payment here to start using Skilotech
        </div>
      </div>
      <div className="flex items-center justify-center pb-12 scr1100:px-[100px] px-6">
        <div
          style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
          className=" flex gap-12 p-6 rounded-[16px] w-[100%]"
        >
          <div className="flex flex-col gap-4 justify-between w-[40%]">
            <div className="flex flex-col gap-4 ">
              <div className="text-[24px] font-[600]">Subscription Plan</div>

              <div className=" relative bg-white  flex flex-col gap-4 items-center rounded-[16px] ">
                <div
                  className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center"
                  style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
                >
                  <div className="flex text-center flex-col gap-3 text-[#333333] w-[80%]">
                    <p className="text-[1.7vw] font-[600]">
                      <span className="text-[#06A9EF]">
                        {selectedPlan?.duration}
                      </span>{" "}
                      {selectedPlan?.limit}
                    </p>
                    <p className="text-[2.5vw] font-[700]">
                      {selectedPlan?.price}
                    </p>
                    <p className="text-[1.1vw] font-[500]">
                      {selectedPlan?.description}
                    </p>
                    <div className="bg-[#DEDEDE] h-[2px]" />
                  </div>
                  <div className="flex gap-3 flex-col text-left">
                    {selectedPlan?.features?.map((feature, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <svg
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
                        <p className="text-[0.9vw] font-[500]">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => router.push("/myPurchase/MyPurchase")}
              className="px-9 py-3 border border-[#06A9EF] w-[150px] rounded-[12px] text-[16px] font-medium "
            >
              Go Back
            </button>
          </div>

          <AccountDetails selectedPlan={selectedPlan} />
        </div>
      </div>
    </div>
  );
}

export default Details;
