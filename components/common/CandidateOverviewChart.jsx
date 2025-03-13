import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
import axios from "axios";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const getFirstDayOfMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const getCurrentDate = () => {
  return new Date();
};

const CandidateOverviewChart = () => {
  const [startDate, setStartDate] = useState(getFirstDayOfMonth());
  const [endDate, setEndDate] = useState(getCurrentDate());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { userDataGlobal } = useSelector((state) => state.user.userData);
  const [error, setError] = useState(null);
  const [statistics, setStatistics] = useState([]);
  const [chartData, setChartData] = useState({
    jobPost: 0,
    apply: 0,
    shortlist: 0,
    rejected: 0,
  });
  const chartRef = useRef(null);

  const fetchJobStatistics = async () => {
    if (!startDate || !endDate) return;

    try {
      const response = await axios.get(
        `http://192.168.1.161:2000/api/job/getJobStatisticsDateRange/${userDataGlobal?._id}`,
        {
          params: {
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
          },
        }
      );
      setStatistics(response.data);
    } catch (err) {
      setError("Failed to fetch job statistics");
      console.error("Error fetching statistics:", err);
    }
  };

  useEffect(() => {
    if (userDataGlobal?._id) {
      fetchJobStatistics();
    }
  }, [userDataGlobal?._id, startDate, endDate]);

  useEffect(() => {
    if (statistics) {
      setChartData({
        jobPost: statistics.totalJobs || 0,
        apply: statistics.totalApplications || 0,
        shortlist: statistics.shortlisted || 0,
        rejected: statistics.rejected || 0,
      });
    }
  }, [statistics]);

  const data = {
    labels: ["Job Post", "Apply", "Shortlist", "Rejected"],
    datasets: [
      {
        data: [
          chartData.jobPost,
          chartData.apply,
          chartData.shortlist,
          chartData.rejected,
        ],
        backgroundColor: ["#1E88E5", "#64B5F6", "#90CAF9", "#BBDEFB"],
        barThickness: 25,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.raw;
            return ` ${value}`;
          },
        },
      },
    },
    scales: {
      x: {
        min: 0,
        max: Math.max(10, Math.ceil(Math.max(...data.datasets[0].data) / 10) * 10),
        ticks: {
          color: "#888",
          stepSize:
            Math.max(...data.datasets[0].data) > 10 ? 10 : 2,
          callback: (value) => (value % 2 === 0 ? value : ""),
        },
        grid: {
          drawTicks: true,
          borderDash: [4, 4],
          color: "#CCCCCC",
          drawOnChartArea: true,
          drawBorder: false,
        },
      },
      y: {
        ticks: {
          color: "#888",
        },
        grid: {
          drawTicks: false,
          drawOnChartArea: false,
          drawBorder: false,
        },
      },
    },
  };

  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center">
      <div
        style={{
          borderRadius: "16px",
          boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
          // width: "100%",
          // maxWidth: "420px",
          minWidth:"420px"
        }}
        className="p-4 bg-white rounded-[16px] h-[426px] gap-[30px] flex flex-col"
      >
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-[16px] font-[500]">Candidate Overview</h2>
              <p className="text-[12px] font-[500]">
                {startDate?.toLocaleDateString()} - {endDate?.toLocaleDateString()}
              </p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="flex items-center border-[#DEDEDE] border-[0.5px] gap-[10px] p-[8px] rounded-[6px] text-[12px] font-[500]"
              >
                Select Date Range <FaCalendarAlt />
              </button>
              {showDatePicker && (
                <div className="absolute top-10 left-0 bg-white shadow-md p-2 rounded-md z-10">
                  <DatePicker
                    selectsRange
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setStartDate(start);
                      setEndDate(end);
                      if (start && end) setShowDatePicker(false);
                    }}
                    inline
                  />
                </div>
              )}
            </div>
          </div>
          <div className="w-full border-[1px] border-[#DEDEDE]" />
        </div>

        <div className="h-[256px] w-full">
          <Bar ref={chartRef} data={data} options={options} />
        </div>

        <div className="flex items-center gap-4 mt-2 text-[12px] flex-wrap">
          {[
            ["#1E88E5", "Job Posts"],
            ["#64B5F6", "Job Applied"],
            ["#90CAF9", "Shortlisted"],
            ["#BBDEFB", "Rejected"],
          ].map(([color, label]) => (
            <div key={label} className="flex items-center">
              <span
                className="w-3 h-3 rounded-[4px] inline-block mr-1"
                style={{ backgroundColor: color }}
              />
              {label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CandidateOverviewChart;
