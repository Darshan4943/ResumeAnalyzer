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

  useLayoutEffect(() => {
    const handleRouteChange = () => {
      sessionStorage.setItem("scrollPosition", window.pageYOffset.toString());
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events]);
  useLayoutEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));
    const addressToken = JSON.parse(localStorage.getItem("address"));
    const address = jwt.decode(addressToken);

    if (userData) {
      const id = userData.user._id;
      axios
        .get(`https://jamblix.in/api/wallet/getByUserId/${userData.user._id}`)
        .then((res) => {
          const response = res.data.data;
          dispatch(setWalletPoints(response.reverse()));
        })
        .catch((err) => console.log(err));
      axios
        .get(`https://jamblix.in/api/address/getByUserId/${id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`, // Set the Authorization header with the token
          },
        })
        .then((response) => {
          dispatch(setAddress(response.data.data));
        })
        .catch((err) => console.log(68, err));
      axios
        .get("https://jamblix.in/api/order/getAll")
        .then((response) => {
          const filter = response.data.filter(
            (item) => item.userDetails.userId === userData.user._id
          );
          console.log(83, filter);
          dispatch(setOrder(filter.reverse()));
        })
        .catch((err) => console.log(err));
    }
  }, [myState]);
  useLayoutEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userResponse"));

    if (userData) {
      const id = userData.user._id;
      axios
        .get(`https://jamblix.in/api/carts/getById/${id}`, {
          headers: {
            Authorization: `Bearer ${userData.token}`, // Set the Authorization header with the token
          },
        })
        .then((res) => {
          const cartResponse = res.data.data;
            dispatch(setCart(cartResponse));
        })
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong Please Refresh the page");
        });
    }else{
      const localCart = JSON.parse(localStorage.getItem("localCart"));
      if(localCart){
        dispatch(setCart(localCart));
      }else{
        dispatch(setCart([]));
      }
    }
  }, [reCallCart]);

  useLayoutEffect(() => {
    axios
      .get("https://jamblix.in/api/category/getAll")
      .then((response) => {
        const res = response.data.categoryList;
        dispatch(setCategory(res));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    axios
      .get("https://freedygoservices.in/api/carousel/getAll")
      .then((res) => {
        dispatch(setBanners(res.data));
      })
      .catch((err) => console.log(err));
    axios
      .get("https://jamblix.in/api/product/getAll")
      .then(async (response) => {
        const res = response.data.products;
        dispatch(setAllProducts(res));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <></>;
};
