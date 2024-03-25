import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";
import { setJob } from "./actions";
import moment from "moment";

export const Api = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const reCallUser = useSelector((state) => state.reCallUser);

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
    if (userDataGlobal) {
      axios
        .get(
          "https://freedygoservices.in/api/subscription/" + userDataGlobal._id
        )
        .then((res) => {
          localStorage.setItem("uploadCount", res.data.data.resumeUpladed);
          if (new Date(moment().format()) > new Date(res.data.data.endDate)) {
            axios
              .get(
                "https://freedygoservices.in/api/subscription/update/" +
                  userDataGlobal._id
              )
              .then((res) => {
                console.log(res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (userDataGlobal?.skills) {
      axios
        .post("https://freedygoservices.in/api/job/getAll", {
          requiredSkills: userDataGlobal.skills?.map((item) => item.value),
        })
        .then((res) => {
          dispatch(setJob(res.data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userDataGlobal, reCallUser]);

  return <></>;
};
