import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import axios from "axios";
function SubscriptionPlansAdmin({ toggle }) {
    const router = useRouter();
 const { profileData } = useSelector((state) => state.profile.profileData);      
    const { userDataGlobal } = useSelector((state) => state.user.userData);
    // const showPlan = useSelector((state) => state.showPlan.show);

    const [subPlans, setPlans] = useState([]);
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);

    const [isInInquiry, setIsInInquiry] = useState(false);
    const [exchangeRate, setexchangeRate] = useState(1);
    const [icon, seticon] = useState("$");
    const [showPlan, setShowPlans] = useState(false);
    const [allPlans, setAllPlans] = useState([])
    useEffect(() => {
        const exchangeRate = localStorage.getItem("exchangeRate");
        const icon = localStorage.getItem("icon");

        setexchangeRate(exchangeRate);
        seticon(icon);


        const filtered = allPlans.filter((plan) =>
            toggle ? plan.type === "candidate" : plan.type === "recruiter"
        );
        setPlans(filtered.sort((a, b) => a.amount - b.amount));




        const token = localStorage.getItem("authToken");
        if (token && token != "undefined") {
            if (token) {
                setIsLogin(true);
            } else {
                setIsLogin(false);
            }
        }
    }, [userDataGlobal, showPlan, toggle, allPlans]);
    const [subscription, setSubscription] = useState(null);

    useEffect(() => {
        axios
            .get("http://localhost:2000/api/subscription/" + userDataGlobal._id)
            .then((res) => {
                setSubscription(res.data.findIsActive);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [userDataGlobal, showPlan]);



    useEffect(() => {
        axios
            .get("http://localhost:2000/api/plans/getAllPlans")
            .then((res) => {

                setAllPlans(res.data.data)


            })
            .catch((err) => {
                console.log(err);
            });


    }, [userDataGlobal]);


    return (
        <>

            <div className="hidden lg:block w-full ">
                <div className="flex gap-9 justify-center">
                    {subPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`group relative mt-[40px] bg-white  flex flex-col gap-4 items-center rounded-[16px] purchase-plan-card max-w-[22vw] "
                                } `}
                            style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
                        >


                            <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center h-full justify-between">
                                <div className="flex text-center flex-col gap-3 text-[#333333] ">
                                    <p className="text-[1.4vw] font-[600]">
                                        {plan.type === "candidate" &&
                                            <>
                                                <span className="text-[#06A9EF]">{plan?.days} Days</span>{" "}
                                            </>
                                        }

                                        <span className={`${plan.type === "recruiter" && "text-[#06A9EF]"}`}> {plan?.name}</span>

                                        {plan.type === "recruiter" &&
                                            <span > Plan</span>
                                        }
                                    </p>
                                    <div className="flex flex-row gap-2 w-full items-end justify-center leading-tight ">
                                        {/* <div className={`flex flex-row ${(plan.isFree) ? "gap-0 line-through" : "gap-2"}  `}>

                                            <p className={` font-[700] ${(plan.isFree) ? "text-[#666666] text-[1.5vw] pb-1  " : "text-[2.5vw]"}`}>{icon}</p>
                                            <p className={` font-[700] ${(plan.isFree) ? "text-[#666666] text-[1.5vw] pb-1" : "text-[2.5vw]"}`}>
                                                {Math.ceil(plan?.amount * exchangeRate)}
                                            </p>
                                        </div>
                                        {(plan.isFree) &&
                                            <p className="text-[2.5vw] font-[700]">
                                                Free
                                            </p>
                                        } */}
                                        {plan.isFree ?
                                            <p className="text-[2.5vw] font-[700]">
                                                Free
                                            </p>
                                            :
                                            <div className={`flex flex-row  gap-2  `}>

                                                <p className={` font-[700] text-[2.5vw]`}>{icon}</p>
                                                <p className={` font-[700] text-[2.5vw]`}>
                                                    {Math.ceil(plan?.amount * exchangeRate)}
                                                </p>
                                            </div>
                                        }
                                    </div>

                                    <p
                                        className="text-[1vw] font-[500]"
                                        style={{ textTransform: "capitalize" }}
                                    >
                                        {plan?.description}
                                    </p>
                                    <div className="bg-[#DEDEDE] h-[2px]" />
                                </div>
                                <div className="flex gap-3 flex-col text-left">
                                    {plan.features.map((feature, index) => (
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
                                <button
                                    onClick={() => router.push(`/dashboard/modifyPlans?id=${plan.index}`)}
                                    className="px-6 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[1.2vw] font-semibold w-full group-hover:bg-[#ffda1d] group-hover:text-[#333] transition-all "
                                >
                                    Modify
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <div className="block lg:hidden w-full ">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    centeredSlides={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper "
                    effect="fade"
                >
                    {subPlans.map((plan, index) => (
                        <SwiperSlide
                            style={{ display: "flex" }}
                            className="justify-center pt-6 gap-4 "
                            key={index}
                        >
                            <div
                                className=" w-[300px] h-[420px] relative  bg-white  flex flex-col gap-4 items-center rounded-[16px] mt-[8px] mb-4"
                                style={{ boxShadow: "0px 2px 15px 0px #00000033" }}
                            >
                                {index === 1 && (
                                    <div className="absolute left-0 top-[-24px] ml:text-[1.3vw] text-[14px] font-semibold px-4 pt-[4px] pb-[110px] bg-[#06A9EF] text-white rounded-t-[16px]">
                                        Recommended
                                    </div>
                                )}

                                <div className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center w-[300px] h-[420px]">
                                    <div className="flex text-center flex-col gap-3 text-[#333333] w-[80%]">
                                        <p className="text-[18px] font-[600]">
                                            <span className="text-[#06A9EF]">{plan?.duration}</span>{" "}
                                            {plan?.limit}
                                        </p>
                                        <div className="flex flex-row gap-2 w-full items-center justify-center">
                                            <p className="text-[28px] font-[700]">{icon}</p>
                                            <p className="text-[28px] font-[700]">
                                                {Math.ceil(plan?.amount * exchangeRate)}
                                            </p>
                                        </div>

                                        <p className="text-[12px] font-[500]">
                                            {plan?.description}
                                        </p>
                                        <div className="bg-[#DEDEDE] h-[2px]" />
                                    </div>
                                    <div className="flex gap-3 flex-col text-left">
                                        {plan.features.map((feature, index) => (
                                            <div key={index} className="flex gap-3 items-start">
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
                                                <p className="text-[10px] font-[500]">{feature}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <button
                                        onClick={() => router.push(`/dashboard/modifyPlans?id=${plan.index}`)}
                                        //  onClick={() => isLogin && router.push("/myPurchase/Purchase")}
                                        className="px-9 py-3 bg-[#06A9EF] text-white rounded-[12px] text-[14px] font-semibold w-full"
                                    >
                                        Modify
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

export default SubscriptionPlansAdmin;
