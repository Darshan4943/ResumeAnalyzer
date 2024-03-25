import React, { useEffect, useState } from "react";
import { plans } from "../../utils/data";
import { useRouter } from "next/router";
import axios from "axios";
import { useSelector } from "react-redux";
import { dateFormatter } from "../../utils/middleware";
import SubscriptionPlans from "../../components/featured/home/SubscriptionPlans";
import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";

function MyPurchase() {
  const [plan, setPlan] = useState({});

  const [subscription, setSubscription] = useState(null);
  const userDataGlobal = useSelector((state) => state.userData);
  useEffect(() => {
    axios
      .get("https://freedygoservices.in/api/subscription/" + userDataGlobal._id)
      .then((res) => {
        setSubscription(res.data.data);
        setPlan(
          plans.find(
            (item) => item.duration + " " + item.limit == res.data.data.plan
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userDataGlobal]);
  return (
    <div className="flex flex-col gap-8  min-h-[60vh]">
      {subscription ? (
        <>
          <div className="flex flex-col justify-center items-center text-center bg-blue pt-[34px]   py-3">
            <div className=" font-semibold text-[30px] text-white">
              My Purchase
            </div>
            <div className=" font-medium text-[16px] text-white">
              Manage your account and subscription
            </div>
          </div>
          <div className="ml:px-6 px-2 pb-12 w-[100%]">
            <div
              style={{ boxShadow: "0px 1px 6px 0px #00000040" }}
              className=" flex flex-col gap-10 ml:p-6 p-3 rounded-[16px] "
            >
              {" "}
              <div className=" flex gap-4  border border-[#06A9EF] rounded-[16px] scr1200:p-6 p-3 ">
                <div className="flex scr1100:flex-row flex-col scr1200:gap-12 gap-4 w-[100%] justify-center ">
                  <div className="flex md:flex-row flex-col gap-6  scr1100:w-[60%] w-[100%] items-center justify-between ">
                    <div className="flex flex-col gap-6  md:w-[40%] w-[100%] items-center justify-between">
                      <div className="flex text-center flex-col gap-3 text-[#333333] w-[100%] p-4">
                        <p className="text-[22px] font-[600]">
                          <span className="text-[#06A9EF]">
                            {plan.duration}
                          </span>{" "}
                          {plan.limit}
                        </p>
                        <p className="text-[36px] font-[700]">{plan.price}</p>
                        <p className="text-[14px] font-[500]">
                          Your Plan Validity is {plan.days} days
                        </p>
                        <div className="bg-[#DEDEDE] h-[2px]" />
                      </div>
                      {subscription?.isActive ? (
                        <button className="px-9 py-3 bg-[#DEDEDE] rounded-[12px] text-[16px] font-[600] text-white w-[60%] min-w-[160px]">
                          Purchased
                        </button>
                      ) : (
                        <button className="px-9 py-3 bg-[#DEDEDE] rounded-[12px] text-[16px] font-[600] text-white w-[60%] min-w-[160px]">
                          In Review
                        </button>
                      )}
                    </div>
                    <div className="flex flex-col gap-6  md:w-[60%] w-[100%]  ml:pl-4">
                      <div className="text-[20px] font-[600]">
                        {" "}
                        Plan summary
                      </div>
                      <div className="flex flex-col gap-9 w-[100%] ">
                        <div className="flex  gap-4">
                          <div className="flex  gap-4 font-[700] justify-between w-[40%]">
                            <p>Plan Name</p>
                            <div>:</div>
                          </div>
                          <div className="text-[16px] font-[500]">
                            {plan.duration} plan
                            {/* {"("}
                            {plan.limit}
                            {")"} */}
                          </div>
                        </div>
                        <div className="flex  gap-4">
                          <div className="flex  gap-4 justify-between font-[700] w-[40%]">
                            <p className="">Status</p>
                            <div className="">:</div>
                          </div>
                          <div
                            className={`text-[16px] font-[500] ${
                              subscription?.isActive
                                ? "text-[#0C8A0A]"
                                : "text-red"
                            }`}
                          >
                            {subscription?.isActive ? "Active" : "Inactive"}
                          </div>
                        </div>
                        {subscription?.isActive && (
                          <>
                            <div className="flex gap-4">
                              <div className="flex  gap-4 justify-between font-[700] w-[40%]">
                                <p>Date of Purchase</p>
                                <div>:</div>
                              </div>
                              <div className="text-[16px] font-[500]">
                                {dateFormatter(subscription?.startDate)}
                              </div>
                            </div>
                            <div className="flex  gap-4">
                              <div className="flex  gap-4 justify-between font-[700] w-[40%]">
                                <p>Date of Renewal</p>
                                <div>:</div>
                              </div>
                              <div className="text-[16px] font-[500]">
                                {" "}
                                {dateFormatter(subscription?.endDate)}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#DEDEDE] w-[1px] h-[100%]"></div>
                  <div className="flex gap-3 flex-col text-left">
                    <div className="text-[20px] font-[600]">
                      {" "}
                      Available Services
                    </div>
                    {plan?.features?.map((feature, index) => (
                      <div key={index} className="flex gap-4 items-center ">
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
                        <p className="text-[16px] font-[500]">{feature}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-6  w-[100%] ml:pl-4">
                <div className="text-[20px] font-[600]"> Account Details</div>
                <div className="flex ml:flex-row flex-col gap-12 w-[100%] ">
                  <div className="flex flex-col gap-6 scr1200:min-w-[30%] min-w-[35%] ">
                    <div className="flex  gap-4">
                      <div className="flex  gap-4 font-[700] justify-between w-[40%]">
                        <p>User Name </p>
                        <div>:</div>
                      </div>
                      <div className="text-[16px] font-[500] capitalize break-all">
                        {subscription?.firstName} {subscription?.lastName}
                      </div>
                    </div>
                    <div className="flex  gap-4">
                      <div className="flex  gap-4 justify-between font-[700] w-[40%]">
                        <p>User ID</p>
                        <div>:</div>
                      </div>
                      <div className="text-[16px] font-[500] break-all">01</div>
                    </div>
                    {subscription?.isActive && (
                      <div className="flex gap-4">
                        <div className="flex  gap-4 justify-between font-[700] w-[40%]">
                          <p>Activated on </p>
                          <div>:</div>
                        </div>
                        <div className="text-[16px] font-[500] break-all">
                          {dateFormatter(subscription?.startDate)}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="bg-[#DEDEDE] min-w-[1px] ml:h-[120px] h-[1px]"></div>
                  <div className="flex flex-col gap-6 min-w-[55%] scr1200:min-w-[40%] ">
                    <div className="flex  gap-4">
                      <div className="flex  gap-4 font-[700] justify-between w-[30%] ">
                        <p>Email Id </p>
                        <div>:</div>
                      </div>
                      <div className="text-[16px] flex font-[500] break-all">
                        {subscription?.email}
                      </div>
                    </div>
                    <div className="flex  gap-4">
                      <div className="flex  gap-4 justify-between font-[700] w-[30%]">
                        <p>Contact No</p>
                        <div>:</div>
                      </div>
                      <div className="text-[16px] font-[500] break-all ">
                        {" "}
                        {subscription?.mobileNo}
                      </div>
                    </div>
                    {subscription?.isActive && (
                      <div className="flex gap-4">
                        <div className="flex  gap-4 justify-between font-[700] w-[30%]">
                          <p>Date Of Renewal </p>
                          <div>:</div>
                        </div>
                        <div className="text-[16px] font-[500] break-all">
                          {" "}
                          {dateFormatter(subscription?.endDate)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full ">
          <SubscriptionPlan subscription={subscription} />
        </div>
      )}
    </div>
  );
}

export default MyPurchase;
