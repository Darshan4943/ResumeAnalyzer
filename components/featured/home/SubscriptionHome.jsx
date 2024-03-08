import React from "react";
import SubscriptionPlans from "./SubscriptionPlans";

function SubscriptionPlan({ isLogin,fromMain }) {
  return (
    <div className="flex flex-col lg:gap-12  gap-4 bg-subscriptionPlan justify-center items-center bg-cover bg-no-repeat py-12 ">
      <div className="text-center w-[90%]">
        <p className="ml:text-[3vw] text-[5vw] text-[#333333] font-[700]">
        Choose the <span className="text-[#06A9EF]">Subscription Plan</span> That Fits Your Needs
            
        </p>
        <p className="ml:text-[1.71vw] text-[3vw] text-[#646464] font-[400]">
        Unlock Premium Features and Enhance Your Recruiting Experience.
        </p>
      </div>

      <SubscriptionPlans isLogin={isLogin} fromMain={fromMain} />
    </div>
  );
}

export default SubscriptionPlan;
