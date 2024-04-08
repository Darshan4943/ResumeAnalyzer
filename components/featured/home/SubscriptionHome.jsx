import React from "react";
import SubscriptionPlans from "./SubscriptionPlans";

function SubscriptionPlan({ isLogin, fromMain }) {
  return (
    <div className=" bg-subscriptionPlan  bg-cover bg-no-repeat   pb-12 min-h-[95vh]">
      <div className="flex flex-col lg:gap-12 justify-center items-center gap-4 customMargins ">
        <div className="text-center w-[90%] leading-tight">
          <p className="ml:text-[2.5vw] text-[8vw] text-[#333333] font-[700]">
            Choose the <span className="text-[#06A9EF]">Subscription Plan</span> That Fits Your Needs

          </p>
          <p className="ml:text-[1.3vw] text-[4vw] text-[#646464] font-[400]">
            Unlock Premium Features and Enhance Your Experience.
          </p>
        </div>

        <SubscriptionPlans isLogin={isLogin} fromMain={fromMain} />
      </div>
    </div>
  );
}

export default SubscriptionPlan;
