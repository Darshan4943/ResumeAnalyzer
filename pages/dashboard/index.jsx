import React, { useEffect, useRef, useState } from "react";
import StackedBarChart from "../../components/common/StackedBarChart";
import { useSelector } from "react-redux";
import { camelCase } from "../../utils/middleware";
import { useRouter } from "next/router";
import SubscriptionPlans from "../../components/featured/home/SubscriptionPlans";
import axios from "axios";
import { AnimatePresence } from "framer-motion";
import TopSection from "../../components/featured/dashboard/TopSection";
import JobStatistics from "../../components/featured/dashboard/JobStatistics";
import RecentApplications from "../../components/featured/dashboard/RecentApplications";
import CountUp from "react-countup";
import Services from "../../components/featured/candidate/createResume/components/services";
import RecentJobs from "../../components/featured/dashboard/RecentJobs";
import JobPostingChart from "../../components/common/JobPostingChart";
import CandidateOverviewChart from "../../components/common/CandidateOverviewChart";
import JobPostChart from "../../components/common/JobPostChart";
import AIHitsChart from "../../components/common/AIHitsChart";

function Dashboard({ toggleContentt }) {
  const { profileData } = useSelector((state) => state.profile.profileData);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState("Daily");
  const [isPending, setIsPending] = useState("");
  const router = useRouter();
  const pendingJobsRef = useRef(null);

  const scrollToPendingJobs = () => {
    if (pendingJobsRef.current) {
      const offset = 64;
      const elementPosition = pendingJobsRef.current.offsetTop;
      setIsPending("Pending");
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };
  const scrollToInterviewJobs = () => {
    if (pendingJobsRef.current) {
      const offset = 64;
      const elementPosition = pendingJobsRef.current.offsetTop;
      setIsPending("Interview");
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  const fetchJobStatistics = async () => {
    try {
      const response = await axios.get(
        `https://dev.api.skilotech.com/api/job/getJobStatistics/${userDataGlobal?._id}`
      );
      setStatistics(response.data);
    } catch (err) {
      setError("Failed to fetch job statistics");
    }
  };

  useEffect(() => {
    fetchJobStatistics();
  }, [userDataGlobal?._id]);

  const fetchJobAnalytics = async () => {
    try {
      const response = await axios.get(
        `https://dev.api.skilotech.com/api/job/getJobAnalytics/${userDataGlobal?._id}`,
        { params: { selected } }
      );
      setData(response.data);
    } catch (error) {
      console.error(
        "Error fetching job statistics:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    if (userDataGlobal?._id && selected) fetchJobAnalytics();
  }, [userDataGlobal?._id, selected]);

  return (
    <div
      className=" flex flex-col gap-[24px]  w-[100%]  overflow-y-auto "
      style={{ scrollbarWidth: "none" }}
    >
      <TopSection
        statistics={statistics}
        scrollToInterviewJobs={scrollToInterviewJobs}
        scrollToPendingJobs={scrollToPendingJobs}
      />
      <div className="scr1300:flex scr1300:flex-row flex flex-col w-full  scr1300:justify-between gap-4">
        <>
          <AIHitsChart />
        </>

        <JobStatistics
          statistics={statistics}
          setSelected={setSelected}
          selected={selected}
          data={data}
        />
      </div>

      <div className="grid scr1300:grid-cols-[1fr,2fr] grid-cols-1 w-full  scr1300:justify-between gap-4">
        <div>
          <CandidateOverviewChart statistics={statistics} />
        </div>
        <div>
          <JobPostChart />
        </div>
      </div>

      <div ref={pendingJobsRef}>
        {/* {userDataGlobal?.role === "employer" ? (
          <RecentApplications isPending={isPending} />
        ) : ( */}
          <RecentJobs />
        {/* )} */}
      </div>

      <Services />
      <div className="py-6  flex flex-col gap-6">
        <p className="text-[20px] font-semibold text-[#333333]">
          Purchase Plans
        </p>
        <SubscriptionPlans />
      </div>
    </div>
  );
}

export default Dashboard;
