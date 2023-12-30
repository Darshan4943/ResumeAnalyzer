import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { userAction } from "./actions/user";
import { jwtDecode } from "jwt-decode";

export const Api = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.changeNumber);
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
      const token = localStorage.getItem("authToken");
      if (token && token != "undefined") {
        const decoded = jwtDecode(token);

        axios
          .post("http://localhost:2000/api/candidate/" + decoded._id)
          .then((res) => {
            const decode = jwtDecode(res.data.data);
            dispatch(userAction({ ...decode._doc, profileScore: res.data.profileScore
            }));
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }, []);

  return <></>;
};
