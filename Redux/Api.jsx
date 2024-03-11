import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";
import { setJob } from "./actions";

export const Api = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const userDataGlobal = useSelector((state) => state.userData);

  const dispatch = useDispatch();
  const reCallUser = useSelector((state) => state.reCallUser);
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = JSON.parse( localStorage.getItem("authToken"));
      if (token && token != "undefined") {
        const decoded = jwtDecode(token.token);
        axios
          .get("https://freedygoservices.in/api/skiloteckuser/user/" + decoded._id)
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
