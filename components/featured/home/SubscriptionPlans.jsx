import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { plans } from "../../../utils/data";
import { popupVisible } from "../../../Redux/actions/user";
function SubscriptionPlans() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);
  const clickHandler = (index) => {
    if (isLogin) {
      router.push(`/purchase/details?id=${index + 1}`);
    } else {
      localStorage.setItem("purchase", JSON.stringify({ status: true, index }));
      dispatch(popupVisible());
    }
  };
  return (
    <>
      <div className="hidden lg:block w-full">
        <div className="flex gap-9 justify-center">
          {plans.map((plan, index) => (
            <div
              key={index}
              className=" relative mt-[40px] bg-white  flex flex-col gap-4 items-center rounded-[16px]"
              style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
            >
              {index === 1 && (
                <div className="absolute left-0 top-[-36px] text-[1.3vw] font-semibold px-4 pt-[4px] pb-[16px] bg-[#06A9EF] text-white rounded-t-[16px]">
                  Recommended
                </div>
              )}
              <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center">
                <div className="flex text-center flex-col gap-3 text-[#333333] w-[80%]">
                  <p className="text-[1.7vw] font-[600]">
                    <span className="text-[#06A9EF]">{plan.duration}</span>{" "}
                    {plan.limit}
                  </p>
                  <p className="text-[2.5vw] font-[700]">{plan.price}</p>
                  <p className="text-[1.1vw] font-[500]">{plan.description}</p>
                  <div className="bg-[#DEDEDE] h-[2px]" />
                </div>
                <div className="flex gap-3 flex-col text-left">
                  {plan.features.map((feature, index) => (
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
                <button
                  onClick={() => clickHandler(index)}
                  className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[1.4vw] font-semibold w-full"
                >
                  Purchase Plan
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="block lg:hidden w-full">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className="mySwiper"
          effect="fade"
        >
          {plans.map((plan, index) => (
            <SwiperSlide
              style={{ display: "flex" }}
              className="justify-center"
              key={index}
            >
              <div
                className=" w-[258px] h-[420px] relative  bg-white  flex flex-col gap-4 items-center rounded-[16px]"
                style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
              >
                {index === 1 && (
                  <div className="absolute left-0 top-[-36px] text-[1.3vw] font-semibold px-4 pt-[4px] pb-[16px] bg-[#06A9EF] text-white rounded-t-[16px]">
                    Recommended
                  </div>
                )}
                <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center w-[258px] h-[420px]">
                  <div className="flex text-center flex-col gap-3 text-[#333333] w-[80%]">
                    <p className="text-[18px] font-[600]">
                      <span className="text-[#06A9EF]">{plan.duration}</span>{" "}
                      {plan.limit}
                    </p>
                    <p className="text-[28px] font-[700]">{plan.price}</p>
                    <p className="text-[12px] font-[500]">{plan.description}</p>
                    <div className="bg-[#DEDEDE] h-[2px]" />
                  </div>
                  <div className="flex gap-3 flex-col text-left">
                    {plan.features.map((feature, index) => (
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
                        <p className="text-[10px] font-[500]">{feature}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    //  onClick={() => isLogin && router.push("/myPurchase/Purchase")}
                    className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[14px] font-semibold w-full"
                  >
                    Purchase Plan
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default SubscriptionPlans;
