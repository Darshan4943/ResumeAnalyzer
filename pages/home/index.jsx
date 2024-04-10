import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { popupVisible, reCallUserData } from "../../Redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import CandidateHome from "../../components/featured/candidate";
import Dashboard from "../dashboard";
import PlanExpiredModal from "../../components/models/planExpiredModal";
import AdminDashboard from "../dashboard/adminDashboard";
import MiniLoader from "../../components/common/miniLoader";

function BeforeLoginHome() {
  const [isLogin, setIsLogin] = useState(false);
  const dispatch = useDispatch();
  const userDataGlobal = useSelector((state) => state.userData);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem("authToken");
    if (token && token != "undefined") {
      if (token) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  const router = useRouter();
  const clickHandler = () => {
    if (isLogin) {
      router.push("/home/BuildResume");
    } else {
      dispatch(popupVisible());
    }
  };
  return loading ? (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <MiniLoader />
    </div>
  ) : (
    <div className="">
      <PlanExpiredModal />
      {isLogin ? (
        userDataGlobal?.role == "admin" ? (
          <AdminDashboard />
        ) : (
          <Dashboard />
        )
      ) : (
        <CandidateHome />
      )}
    </div>
  );
}

export default BeforeLoginHome;
