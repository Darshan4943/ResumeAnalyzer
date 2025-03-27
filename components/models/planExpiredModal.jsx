import axios from "axios";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PlanExpiredModal = () => {
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (userDataGlobal) {
      const isExpired =
        localStorage.getItem("planExpired") == true ? true : false;
      if (!isExpired) {
        setVisible(false);
        return;
      }
      axios
        .get("https://jamblix.com/api/subscription/" + userDataGlobal?._id)
        .then((res) => {
          if (res.data.success) {
            if (
              new Date(moment().format()) >
              new Date(res.data.findIsActive.endDate)
            ) {
              axios
                .put(
                  "https://jamblix.com/api/subscription/update/" +
                    userDataGlobal?._id
                )
                .then((res) => {
                  setVisible(true);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } else if (res.data.planFound) {
            setVisible(true);
          } else {
            localStorage.setItem("planExpired", false);
            setVisible(false);
          }
        })
        .catch((err) => {
          setVisible(false);
          console.log(err);
        });
    }
  }, [userDataGlobal]);
  return (
    visible && (
      <div className="expiryModel">
        <div className="modal">
          <div className="container">
            <div className="flex flex-col gap-[16px]">
              <div className="flex flex-col gap-[12px]">
                <img
                  src="/images/OBJECTS.png"
                  alt=""
                  className="h-[168px] object-contain"
                />
                <span className="text-[30px] text-[#C00000] font-semibold text-center">
                  Subscription Expired!
                </span>
              </div>
              <span className="text-[16px] text-[#333333] font-medium text-center">
                Please Upgrade your Subscription Plan and continue using our
                best Ai powered services.
              </span>
            </div>
            <div className="flex flex-row justify-center items-center gap-[16px] ">
              <button
                className="border-[#C00000] py-[12px] px-[24px] border text-[#C00000] text-[16px] font-semibold rounded-[12px] "
                onClick={() => {
                  setVisible(false);
                  localStorage.setItem("planExpired", false);
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => router.push("/purchase/plans")}
                className="border-[#06A9EF] py-[12px] px-[24px] border text-[#fff] bg-[#06A9EF] text-[16px] font-semibold rounded-[12px] "
              >
                Purchase Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PlanExpiredModal;
