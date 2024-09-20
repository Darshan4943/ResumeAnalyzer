import React, { useEffect, useState } from "react";
import AccountDetails from "../../components/featured/home/AccountDetails";
import { useRouter } from "next/router";
import { plans } from "../../utils/data";
import MiniLoader from "../../components/common/miniLoader";
import axios from "axios";
import PaymentSuccess from "../../components/models/paymentSuccess";
import { useSelector } from "react-redux";
import PaymentCanceled from "../../components/models/paymentCanceled";

function Details() {
  const router = useRouter();
  const { id, recruiterid, role, success, canceled } = router.query;
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [selectedPlan, setSelectedPlan] = useState();
  const [exchangeRate, setexchangeRate] = useState(1);
  const [icon, seticon] = useState("$");
  const [successModel, setSuccessModel] = useState({
    visible: false,
    loading: false,
  });
  const [cancelModel, setCancelModel] = useState(false);
  const [isRetry, setIsRetry] = useState(true);
 
  useEffect(() => {
    const exchangeRate = localStorage.getItem("exchangeRate");
    const icon = localStorage.getItem("icon");
    setexchangeRate(exchangeRate);
    seticon(icon);
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:2000/api/plans/getByIndex/${id}`)
      .then((res) => {

        setSelectedPlan(res.data.data[0])
        setLoading(false);

      })
      .catch((err) => {
        console.log(err);
      });

  }, [id]);

  // useEffect(() => {
  //   if (canceled == "true") {
  //     const timer = setTimeout(() => {
  //       setCancelModel(true);
  //     }, 2000);
  //   }
  // }, [success, canceled]);
  const navigate = async () => {
    try {
      await router.push("/purchase/MyPurchase"); 
      setTimeout(() => {
        window.location.reload();
      }, 1000); 
      localStorage.removeItem("purchaseCount");
    } catch (error) {
      console.error('Error navigating:', error);
    }
  };
  
  return (
    <div className=" flex flex-col gap-9">
      <div className="flex flex-col justify-center items-center bg-blue h-[89px]  py-3">
        <div className=" font-semibold text-[30px] text-white leading-tight">
          Purchase
        </div>
        <div className=" font-medium text-[16px] text-white">
          Purchase plan and make payment
        </div>
      </div>
      {successModel.visible && (
        <PaymentSuccess
          successFunction={navigate}
          loading={successModel.loading}
        />
      )}
      {cancelModel && (
        <PaymentCanceled
          setCancelModel={setCancelModel}
          canceled={canceled}
          setIsRetry={setIsRetry}
          isRetry={isRetry}
        />
      )}
      {loading ? (
        <div className="flex w-full items-center justify-center h-[70vh]">
          <MiniLoader />
        </div>
      ) : (
        <div className="flex items-center justify-center pb-12  px-2 customMargins ">
          <div
            style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
            className=" flex scr700:flex-row flex-col scr700:p-6 p-3 rounded-[16px] items-top w-[100%] gap-[32px]"
          >
            <div className="flex flex-col gap-4  plan-container">
              <div className="text-[16px] font-[600]">Subscription Plan</div>
              <div
                className="p-4 z-20 bg-white rounded-[16px] flex flex-col gap-4 items-center w-[90%]  "
                style={{ boxShadow: "0px 0px 6px 0px #00000040" }}
              >
                <div className="flex text-center flex-col gap-3 text-[#333333] w-[90%]">
                  <p className="scr700:text-[1.7vw] text-[5vw] font-[600]">
                    {selectedPlan.type === "candidate" &&
                      <>
                        <span className="text-[#06A9EF]">{selectedPlan?.days} Days</span>{" "}
                      </>
                    }

                    <span className={`${selectedPlan.type === "recruiter" && "text-[#06A9EF]"}`}> {selectedPlan?.name}</span>

                    {selectedPlan.type === "recruiter" &&
                      <span > Plan</span>
                    }
                  </p>
                  <div className="flex flex-row gap-2 w-full items-center justify-center">
                    <p className="ml:text-[2.5vw] text-[24px] font-[700]">
                      {icon}
                    </p>
                    <p className="ml:text-[2.5vw] text-[24px] font-[700]">
                      {Math.ceil(selectedPlan?.amount * exchangeRate)}
                    </p>
                  </div>
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

            <AccountDetails
              selectedPlan={selectedPlan}
              recruiterid={recruiterid}
              role={role}
              setSuccessModel={setSuccessModel}
              success={success}
              canceled={canceled}
              setCancelModel={setCancelModel}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
