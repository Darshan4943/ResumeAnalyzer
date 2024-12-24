import BeforeLoginHome from "./home";
import React, { useEffect, useRef, useState } from "react";
import {  useSelector } from "react-redux";
import ResetPasswordModal from "../components/models/resetPasswordModal";

function Home() {
 const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [loading, setLoading] = useState(true);
  const [visible,setVisible] = useState(false)
  const [isLogin, setIsLogin] = useState(false);
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
