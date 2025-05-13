import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const JobPostChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [selected, setSelected] = useState("Daily");

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          `http://192.168.1.208:2000/api/job/getJobStatisticsdata/${userDataGlobal?._id}?filter=${selected}`
        );
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [userDataGlobal?._id, selected]);

  const getChartData = () => {
    if (!chartData) return { labels: [], datasets: [] };

    const labels = chartData.labels || [];
    const jobPostData = chartData.jobPostData || [];
    const jobClosedData = chartData.jobClosedData || [];

    return {
      labels,
      datasets: [
        {
          label: "Job Post",
          data: jobPostData,
          borderColor: "rgba(33, 150, 243, 1)",
          backgroundColor: "rgba(33, 150, 243, 0.2)",
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "white",
          pointBorderColor: "rgba(33, 150, 243, 1)",
          fill: true,
          tension: 0.4, 
        },
        {
          label: "Job Closed",
          data: jobClosedData,
          borderColor: "#2E7D32",
          backgroundColor: "rgba(46, 125, 50, 0.2)",
          borderWidth: 2,
          pointRadius: 5,
          pointBackgroundColor: "white",
          pointBorderColor: "#2E7D32",
          fill: true,
          tension: 0.4, 
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "#E0E0E0" },
      },
    },
    animation: {
      duration: 1000, 
      easing: "easeInOutQuad",
    },
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="p-5 bg-white rounded-xl w-full flex flex-col h-[426px]"
    >
      <div className="flex pb-2 flex-col gap-4 border-b border-[#DEDEDE] mb-[38px]">
        <div className="flex justify-between items-center flex-wrap">
          <div>
            <p className="text-[16px] font-[500]">
              Job Post Overview {""}({selected})
            </p>
          </div>
          <div className="flex gap-2 mt-2 sm:mt-0">
            {["Daily", "Weekly", "Monthly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelected(period)}
                className={`px-2 p-1 border-[0.5px] text-[12px] font-[500] border-[#DEDEDE] rounded-[6px] ${
                  selected === period
                    ? "border-[#06A9EF] bg-[#06A9EF] text-white"
                    : ""
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className="w-full"
        style={{
          height: "240px",
          marginBottom: "30px",
          position: "relative",
          zIndex: 1000,
          overflow: "visible",
        }}
      >
        <Line data={getChartData()} options={options} />
      </div>

      <div className="flex flex-wrap justify-start gap-4 mt-3">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue rounded-[4px] mr-2"></span>
          <span className="text-sm">Total Job Posts</span>
        </div>
        <div className="flex items-center">
          <span className="w-4 h-4 bg-[#0C8A0A] rounded-[4px] mr-2"></span>
          <span className="text-sm">Job Closed</span>
        </div>
      </div>
    </div>
  );
};

export default JobPostChart;
