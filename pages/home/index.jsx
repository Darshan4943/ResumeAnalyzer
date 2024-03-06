import React, { useEffect, useRef, useState } from "react";
import Images from "../../components/featured/home/images";
import GenerateAi from "../../components/featured/home/GenerateAi";
import { useRouter } from "next/router";
import ImgCarousel from "../../components/featured/home/ImgCarousel";
import SkillAssessment from "../../components/featured/home/SkillAssessment";
import JdResume from "../../components/featured/home/JdResume";
import ResumeInventory from "../../components/featured/home/ResumeInventory";
import SubscriptionPlan from "../../components/featured/home/SubscriptionHome";
import { popupVisible, reCallUserData } from "../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { recallUser } from "../../Redux/reducers/userReducer";
import MobileView from "../../components/featured/home/mobileView";
import CandidateHome from "../../components/featured/candidate";
import Recruiter_page from "../recruiter";

function BeforeLoginHome() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const userDataGlobal = useSelector((state) => state.userData);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
  }, []);
  const router = useRouter();
  const clickHandler = () => {
    if (isLogin) {
      router.push("/home/BuildResume");
    } else {
      dispatch(popupVisible());
    }
  };
  return (
    <div className="">
      {userDataGlobal.role == "recruiter" ? <Recruiter_page /> : <CandidateHome />}
    </div>
  );
}

export default BeforeLoginHome;
