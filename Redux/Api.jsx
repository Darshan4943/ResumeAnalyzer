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
            "http://localhost:2000/api/skiloteckuser/user/" + decoded._id
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
    const resumeUploadCoount = localStorage.getItem("uploadCount");

    if (!resumeUploadCoount) {
      localStorage.setItem("uploadCount", 2);
    }
    // if (userDataGlobal) {
    //   axios
    //     .get(
    //       "http://localhost:2000/api/subscription/" + userDataGlobal._id
    //     )
    //     .then((res) => {
    //       console.log(res.data)
    //       // localStorage.setItem("uploadCount", res.data.data.resumeUpladed);
    //       console.log(new Date(moment().format()) > new Date(res.data.data.endDate))
    //       if (new Date(moment().format()) > new Date(res.data.data.endDate)) {
    //         axios
    //           .get(
    //             "http://localhost:2000/api/subscription/update/" +
    //               userDataGlobal._id
    //           )
    //           .then((res) => {
    //             console.log(res.data);
    //           })
    //           .catch((err) => {
    //             console.log(err);
    //           });
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    if (userDataGlobal?.skills) {
      axios
        .post("http://localhost:2000/api/job/getAll", {
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
