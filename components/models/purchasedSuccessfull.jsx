import React from "react";
import MiniLoader from "../common/mini-loader";
import { useRouter } from "next/router";

const PurchasedSuccessful = ({setFreePlanSuccess }) => {
    const router = useRouter();
    const navigate = async () => {
        try {
          await router.push("/purchase/MyPurchase"); 
          setTimeout(() => {
            window.location.reload();
          }, 1000); 
         
        } catch (error) {
          console.error('Error navigating:', error);
        }
      };
      
  return (
    <div className="expiryModel">
      <div className="modal">
        <div className="bg-white p-[16px] rounded-[18px] w-[400px] min-h-[300px] flex flex-col gap-6 items-center justify-center">
         
              <div className="flex flex-col gap-[16px]">
                <div className="flex flex-col gap-[12px]">
                  <img
                    src="/images/check.png"
                    alt=""
                    className="h-[70px] object-contain"
                  />
                  <span className="text-[30px] text-[#333333] font-semibold text-center">
                    Purchased Successful
                  </span>
                </div>
                <span className="text-[16px] text-[#333333] font-medium text-center">
                  Congratulations! Your purchase of the plan was successful.
                </span>
              </div>
              <div className="flex flex-row justify-center items-center gap-[16px] ">
                <button
                  onClick={() => {
                    setFreePlanSuccess(false); navigate()
                  }}
                  className="border-[#06A9EF] py-[12px] px-[24px] border text-[#fff] bg-[#06A9EF] text-[16px] font-semibold rounded-[12px] "
                >
                  Done
                </button>
              </div>
           
        </div>
      </div>
    </div>
  );
};

export default PurchasedSuccessful;


