// import React, { useState } from "react";
// import CandidateHome from "../candidate";
// import { useSelector } from "react-redux";
// import Dashboard from "../dashboard";
// import AdminDashboard from "../dashboard/adminDashboard";
// import ResumePage from "../auth/resume";
// import { useRouter } from "next/router";

// function Home() {
//   const router = useRouter();
//   const { userDataGlobal } = useSelector((state) => state.user.userData);
//   const isLogin = useSelector((state) => state.auth.isLogin);
//   const { signIn } = router.query;
//   const parsedResume = localStorage.getItem("parsedResume");

//   return (
//     <div>
//       {userDataGlobal?.role === "user" ? (
//         (parsedResume && signIn ==="false") ? (
//           <ResumePage />
//         ) : (
//           <CandidateHome />
//         )
//       ) : userDataGlobal?.role === "admin" ? (
//         <AdminDashboard />
//       ) : (
//         <Dashboard />
//       )}
//     </div>
//   );
// }

// export default Home;

// import React from "react";
// import CandidateHome from "../candidate";

// import { useSelector } from "react-redux";
// import Dashboard from "../dashboard";
// import AdminDashboard from "../dashboard/adminDashboard";

// function Home() {
//   const { userDataGlobal } = useSelector((state) => state.user.userData);
//   const isLogin = useSelector((state) => state.auth.isLogin);
//   return (
//     <div>
//       {userDataGlobal?.role === "user" ? (
//         <CandidateHome />
//       ) : userDataGlobal?.role === "admin" ? (
//         <AdminDashboard />
//       ) : (
//         <Dashboard />
//       )}
//     </div>
//   );
// }

// export default Home;

import React from "react";
import CandidateHome from "../candidate";

import { useSelector } from "react-redux";
import Dashboard from "../dashboard";
import AdminDashboard from "../dashboard/adminDashboard";
import BpoDashboard from "../dashboard/BpoDashboard";

function Home() {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <div>
      {userDataGlobal?.role === "user" ? (
        <CandidateHome />
      ) : userDataGlobal?.role === "admin" ? (
        <AdminDashboard />
      ) : userDataGlobal?.role === "bpo" ? (
        <BpoDashboard />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default Home;
