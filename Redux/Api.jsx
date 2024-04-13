import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";
import { setJob } from "./actions";
import moment from "moment";
import { plans } from "../utils/data";
import ResetPasswordModal from "../components/models/resetPasswordModal";

export const Api = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);
  const [visible, setVisible] = useState(false);

  const dispatch = useDispatch();
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
          .get(
            "https://freedygoservices.in/api/skiloteckuser/user/" + decoded._id
          )
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
        .get(
          "https://freedygoservices.in/api/subscription/" + userDataGlobal._id
        )
        .then((res) => {
          const result = res.data.data;

          if (result) {
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
