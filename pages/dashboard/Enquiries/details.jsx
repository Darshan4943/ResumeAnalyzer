import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MiniLoader from "../../../components/common/miniLoader";
import axios from "axios";
import { plans } from "../../../utils/data";
import { dateSeter } from "../../../utils/middleware";

function Details() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [subscription, setSubscription] = useState(null);
  const [userData, setuserData] = useState(null);
  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get("https://freedygoservices.in/api/subscription/byId/" + id)
        .then((res) => {
          setSubscription(res.data.data);
          setuserData(res.data.userData);
          console.log(res.data);
          setSelectedPlan(
            plans.find(
              (item) => item.duration + " " + item.limit == res.data.data?.plan
            )
          );
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [id]);
  const [popUp, setPopUp] = useState(false);

  const activePlanHandler = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    axios
      .put(
        "https://freedygoservices.in/api/subscription/active/" +
          subscription.email
      )
      .then((res) => {
        setBtnLoading(false);
        setPopUp(true);
        // setSuccessModel(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className=" flex flex-col gap-9  pt-4  pb-2">
      {popUp && (
        <>
          <div className="fixed z-[2000] top-0 left-0 right-0 bottom-0 bg-black opacity-60"></div>
          <div className="fixed z-[2000] top-[40%] left-0 right-0  flex items-center justify-center  ">
            <div className=" absolute rounded-[16px] bg-white shadow-lg  p-6 flex flex-col gap-4 w-[22%] sm:min-w-[366px]  min-w-[260px] justify-center  items-center ">
              <div className="flex items-center justify-center h-[80px] w-[80px] bg-[#0C8A0A] rounded-[50%]">
                <svg
                  width="45"
                  height="35"
                  viewBox="0 0 45 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 34.1878L0.65625 19.8441L4.59375 15.9066L15 26.3128L40.4062 0.90657L44.3438 4.84407L15 34.1878Z"
                    fill="white"
                  />
                </svg>
              </div>

              <div className="flex flex-col gap-2 text-center">
                <text className="text-[24px] font-medium">
                  Plan Activated Successfully
                </text>
              </div>
              <button
                onClick={() => router.back()}
                className="px-9 py-3 bg-blue text-white rounded-[8px] w-[117px] text-[16px] font-medium"
              >
                Done
              </button>
            </div>
          </div>
        </>
      )}
      {loading ? (
        <div className="flex w-full items-center justify-center h-[70vh]">
          <MiniLoader />
        </div>
      ) : (
        <div className="flex items-center justify-center pb-12  px-2 customMargins  ">
          <div
            style={{ boxShadow: "0px 0px 6px 0px #00000020" }}
            className=" flex scr700:flex-row flex-col scr700:p-6 p-3 rounded-[16px] items-top w-[100%] gap-[32px] h-[70vh] min-w-[50vw]"
          >
            <div className="flex flex-col gap-4  plan-container">
              <div className="text-[20px] font-[600]">Subscription Plan</div>
              <div
                className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center w-[90%]  "
                style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
              >
                <div className="flex text-center flex-col gap-3 text-[#333333] w-[80%]">
                  <p className="scr700:text-[1.7vw] text-[5vw] font-[600]">
                    <span className="text-[#06A9EF]">
                      {selectedPlan?.duration}
                    </span>{" "}
                    {selectedPlan?.limit}
                  </p>
                  <p className="scr700:text-[2.5vw] text-[7vw] font-[700]">
                    {selectedPlan?.price}
                  </p>
                  <p className="scr700:text-[1.1vw] text-[4vw] font-[500]">
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
                      <p className="scr700:text-[0.9vw] text-[3vw] font-[500] w-[80%]">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className={" w-[60%] plan-container  "}>
              <div className="flex flex-col gap-6 w-[100%] justify-between h-full">
                <div className=" flex flex-col gap-[24px] justify-center w-[100%] ">
                  <div className="text-[18px] font-[600] ">Account Details</div>
                  <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                    <div className="w-[30%]">Enquiry At :</div>
                    <div className="w-[70%]">
                      {dateSeter(subscription?.createdAt)}
                    </div>
                  </div>
                  {userData?.role == "user" ? (
                    <div className="flex flex-col gap-[16px]">
                      <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                        <div className="w-[30%]">Email :</div>
                        <div className="w-[70%]">{userData?.email}</div>
                      </div>
                      <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                        <div className="w-[30%]">Role :</div>
                        <div className="w-[30%]">Candidate</div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-[16px]">
                      <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                        <div className="w-[30%]">Name :</div>
                        <div className="w-[70%]">
                          {userData?.firstName} {userData?.lastName}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                        <div className="w-[30%]">Email :</div>
                        <div className="w-[70%]">{userData?.email}</div>
                      </div>
                      <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                        <div className="w-[30%]">Mobile No :</div>
                        <div className="w-[70%]">
                          {userData?.dial_code} {userData?.mobileNo}
                        </div>
                      </div>
                      <div className="flex flex-row gap-2 text-[16px] text-[#333333] font-medium">
                        <div className="w-[30%]">Role :</div>
                        <div className="w-[30%]">Recruiter</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className=" w-full font-[500] flex flex-row gap-[16px] justify-between ">
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
                    className="buttons font-[500] bg-[#06A9EF] text-white min-w-[190px]"
                    id="border_button"
                    onClick={activePlanHandler}
                  >
                    {btnloading ? (
                      <svg
                        aria-hidden="true"
                        role="status"
                        className="inline w-4 h-4  text-white animate-spin"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="#E5E7EB"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      " Active Plan"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
