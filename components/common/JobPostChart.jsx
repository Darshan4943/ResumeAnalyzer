import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
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
  const [selected, setSelected] = useState("Monthly");

  useEffect(() => {
    const fetchChartData = async () => {
      if (!userDataGlobal?._id) {
        setError("User ID is missing");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:2000/api/job/getJobStatisticsdata/${userDataGlobal._id}`);
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError(error.response?.data?.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [userDataGlobal?._id]);
  const getChartData = () => {
    if (!chartData) return { labels: [], datasets: [] };

    const labels = chartData[selected]?.labels || [];
    const jobPostData = chartData[selected]?.jobPostData || [];
    const jobClosedData = chartData[selected]?.jobClosedData || [];

    return {
      labels,
      datasets: [
        {
          type: "bar",
          label: "Job Post",
          data: jobPostData,
          backgroundColor: "rgba(144, 202, 249, 0.6)",
          borderRadius: 4,
          barThickness: 24,
          barPercentage: 0.6,
          categoryPercentage: 0.8,
          order: 1,
          yAxisID: "y",
        },
        {
          type: "line",
          label: "Job Closed",
          data: jobClosedData,
          borderColor: "#2E7D32",
          borderWidth: 2,
          pointStyle: "circle",
          pointRadius: 6,
          pointHoverRadius: 6,
          pointBackgroundColor: "white",
          pointBorderColor: "#2E7D32",
          pointBorderWidth: 4,
          order: 99,
          fill: false,
          clip: false,
          yAxisID: "y",
        },
      ],
    };
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        grid: { color: "#E0E0E0" },
      },
    },
  };

  return (
    <div className="p-5 bg-white rounded-xl w-[880px] flex flex-col">
      <div className="flex pb-2 flex-col gap-4 border-b border-gray mb-[38px]">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[16px] font-[500]">Job Statistics</p>
            <p className="text-[12px] font-[500]">
              Job Post Overview ({selected})
            </p>
          </div>
          <div className="flex gap-2">
            {["Daily", "Weekly", "Monthly"].map((period) => (
              <button
                key={period}
                onClick={() => setSelected(period)}
                className={`px-2 p-1 border-[0.5px] text-[12px] font-[500] border-[#DEDEDE] rounded-[6px] ${
                  selected === period ? "border-[#06A9EF] bg-[#06A9EF] text-white" : ""
                }`}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div style={{ height: "240px", marginBottom: "30px", position: "relative", zIndex: 1000, overflow: "visible" }}>
        {chartData ? <Bar data={getChartData()} options={options} /> : <p>Loading...</p>}
      </div>
      <div className="flex space-x-4 mt-3">
        <div className="flex items-center">
          <span className="w-4 h-4 bg-blue rounded-[4px] mr-2"></span>
          <span className="text-sm">Job Post</span>
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
