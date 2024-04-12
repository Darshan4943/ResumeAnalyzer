import BeforeLoginHome from "./home";
import React, { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import ResetPasswordModal from "../components/models/resetPasswordModal";

function Home() {
  const userDataGlobal = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(true);
  const [visible,setVisible] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
    const timer = setTimeout(() => {
      setLoading(false);
      if(userDataGlobal?.tempPassword?.length>0){
        setVisible(true)
      }
    }, 1000);

    return () => clearTimeout(timer);

  }, []);
  return (
    <>

        <BeforeLoginHome />
    </>
  );
}

export default Home;
