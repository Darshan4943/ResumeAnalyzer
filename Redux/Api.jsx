import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";
import { setJob } from "./actions";
import { plans } from "../utils/data";
import ResetPasswordModal from "../components/models/resetPasswordModal";
import moment from "moment";

export const Api = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();

  let timezone = moment().format("YYYY-MM-DD");

  const reCallUser = useSelector((state) => state.reCallUser);
  useEffect(() => {
    if (userDataGlobal?.tempPassword?.length > 0) {
      const timer = setTimeout(() => {
        setLoading(false);
        setVisible(true);
      }, 3400);

      return () => clearTimeout(timer);
    }
  }, [userDataGlobal]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse(localStorage.getItem("authToken"));
      if (token && token != "undefined") {
        const decoded = jwtDecode(token.token);
        axios
          .get("https://jamblix.com/api/skiloteckuser/user/" + decoded._id)
          .then((res) => {
            const decode = jwtDecode(res.data.data);
            dispatch(
              userAction({
                ...decode._doc,
                profileScore: res.data.profileScore,
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, [reCallUser]);

  useEffect(() => {
    const planActive =
      localStorage.getItem("planActive") == true ? true : false;
    const uploadCount = localStorage.getItem("uploadCount");

    if (userDataGlobal) {
      axios
        .get("https://jamblix.com/api/subscription/" + userDataGlobal._id)
        .then((res) => {
          const result = res.data.findIsActive;

          if (result.isActive == true) {
            const selectedPlan = plans.find(
              (item) => item.duration + " " + item.limit == result.plan
            );
            localStorage.setItem("activePlan", selectedPlan.index);
            localStorage.setItem("uploadCount", result.resumeUpladed);
            localStorage.setItem("planActive", result.isActive);
            localStorage.setItem("downloadCount", result.resumeDownloads);
            localStorage.setItem("saveCount", result.resumeSaves.num);
            localStorage.setItem("clientCount", result.clientStored);
            localStorage.setItem("planAvailable", true);
            let newEnddate = moment(result.endDate).format("YYYY-MM-DD");
            // { console.log(999, timezone >= newEnddate ? "active" : "inactive") }
            if (timezone >= newEnddate && result.isActive) {
              axios
                .put(
                  "https://jamblix.com/api/subscription/update/" +
                    userDataGlobal._id
                )
                .then((res) => {
                  if (res.data.success) {
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }

            // console.log(33333,moment(result.endDate).format('YYYY-MM-DD'))
            // console.log(44444,moment(timezone).format('YYYY-MM-DD'))
            // console.log(55555,moment(result.endDate).isBefore(moment(timezone).format('YYYY-MM-DD')))
          } else {
            if (!planActive && uploadCount == 0) {
              localStorage.setItem("uploadCount", 0);
            } else {
              localStorage.setItem("uploadCount", 1);
            }

            localStorage.setItem("planActive", false);
            localStorage.setItem("planAvailable", false);

            localStorage.setItem("downloadCount", 0);
            localStorage.setItem("saveCount", 0);
            localStorage.setItem("clientCount", 0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal, reCallUser]);

  // console.log(123,visible && loading == false);
  return <>{visible && loading == false ? <ResetPasswordModal /> : null}</>;
};
