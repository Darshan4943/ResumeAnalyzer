// import React, { useEffect, useRef, useState } from "react";
// import { useRouter } from "next/router";
// import { popupVisible, reCallUserData } from "../../Redux/actions/user";
// import { useDispatch, useSelector } from "react-redux";
// import CandidateHome from "../../components/featured/candidate";
// import Dashboard from "../dashboard";
// import PlanExpiredModal from "../../components/models/planExpiredModal";
// import AdminDashboard from "../dashboard/adminDashboard";
// import MiniLoader from "../../components/common/miniLoader";
// import ResetPasswordModal from "../../components/models/resetPasswordModal";

// function BeforeLoginHome() {
//   const [isLogin, setIsLogin] = useState(false);
//   const dispatch = useDispatch();
//   const userDataGlobal = useSelector((state) => state.userData);

//   const [visible, setVisible] = useState(false);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     const token = localStorage.getItem("authToken");
//     if (token && token != "undefined") {
//       if (token) {
//         setIsLogin(true);
//       } else {
//         setIsLogin(false);
//       }
//     }

//     const timer = setTimeout(() => {
//       setLoading(false);
//       if (userDataGlobal?.tempPassword?.length > 0) {
//         setVisible(true);
//       }
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const router = useRouter();
//   const clickHandler = () => {
//     if (isLogin) {
//       router.push("/home/BuildResume");
//     } else {
//       dispatch(popupVisible());
//     }
//   };
//   return loading ? (
//     <div className="h-[60vh] w-full flex items-center justify-center">
//       <MiniLoader />
//     </div>
//   ) : (
//     <div className="">
//       <PlanExpiredModal />
//       {isLogin ? (
//         userDataGlobal?.role == "admin" ? (
//           <AdminDashboard />
//         ) : (
//           <Dashboard />
//         )
//       ) : (
//         <CandidateHome />
//       )}
//     </div>
//   );
// }

// export default BeforeLoginHome;


import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { popupVisible } from "../../Redux/actions/user";
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

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showScrollImage, setShowScrollImage] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token && token !== "undefined") {
      setIsLogin(!!token);
    }

    const timer = setTimeout(() => {
      setLoading(false);
      if (userDataGlobal?.tempPassword?.length > 0) {
        setVisible(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const router = useRouter();
  const clickHandler = () => {
    if (isLogin) {
      router.push("/home/BuildResume");
    } else {
      dispatch(popupVisible());
    }
  };

  const handleScrollDown = (scrollingDown) => {
    setShowScrollImage(scrollingDown);
  };

  return loading ? (
    <div className="h-[60vh] w-full flex items-center justify-center">
      <MiniLoader />
    </div>
  ) : (
    <div className="">
      <PlanExpiredModal />
      {isLogin ? (
        userDataGlobal?.role === "admin" ? (
          <AdminDashboard />
        ) : (
          <Dashboard />
        )
      ) : (
        <>
          {showScrollImage && (
            <div className="relative">
              <img
                src="/images/ar.png"
                alt=""
                className="fixed top-[90vh] right-[2vw] z-[300000] h-[52px] w-[52px] cursor-pointer"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              />
            </div>
          )}
          <CandidateHome onScrollToTop={handleScrollDown} />
        </>
      )}
    </div>
  );
}

export default BeforeLoginHome;

