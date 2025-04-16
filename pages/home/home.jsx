import React, { useState } from "react";
import CandidateHome from "../candidate";
import { useSelector } from "react-redux";
import Dashboard from "../dashboard";
import AdminDashboard from "../dashboard/adminDashboard";
import ResumePage from "../auth/resume";


function Home() {
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const isLogin = useSelector((state) => state.auth.isLogin);

  const [showResumePage, setShowResumePage] = useState(false);

  const parsedResume = localStorage.getItem("parsedResume");

  const handleCloseResumePage = () => {
    setShowResumePage(false); 
  };

  return (
    <div>
      {userDataGlobal?.role === "user" ? (
        showResumePage || parsedResume ? (
          <ResumePage onClose={handleCloseResumePage} />
        ) : (
          <CandidateHome />
        )
      ) : userDataGlobal?.role === "admin" ? (
        <AdminDashboard />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default Home;
