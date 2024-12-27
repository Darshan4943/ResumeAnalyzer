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
//  const { profileData } = useSelector((state) => state.profile.profileData);         const { userDataGlobal } = useSelector((state) => state.user.userData);

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

import PlanExpiredModal from "../../components/models/planExpiredModal";

import CandidateHome from "../candidate";
import WithoutLogin from "../withoutLogin";
import { useSelector } from "react-redux";


function BeforeLoginHome() {

  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const isLogin = useSelector((state) => state.auth.isLogin);



  return (

    <div className="">
      <PlanExpiredModal />
      {isLogin ?
        <CandidateHome />
        :
        <WithoutLogin />
      }
    </div>
  );
}

export default BeforeLoginHome;

