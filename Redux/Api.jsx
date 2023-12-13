import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector, useStore } from "react-redux";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";
import {
  setAddress,
  setAllProducts,
  setBanners,
  setCart,
  setCategory,
  setIsServisable,
  setLoactionAllowed,
  setLoactionDenied,
  setNonServisable,
  setOrder,
  setTag,
  setWalletPoints,
} from "./actions";

export const Api = () => {
  const store = useStore();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const myState = useSelector((state) => state.changeNumber);
  const reCallCart = useSelector((state) => state.reCallCart);

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }
  const state = useSelector((state) => state);
  const router = useRouter();
  const [locationBlocked, setLocationBlocked] = useState(false);


  return <></>;
};
