import React, { useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, Tooltip);

const JobPostingChart = () => {
  const [view, setView] = useState("monthly");

  const chartData = {
    daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      data: [20, 30, 25, 35, 40, 50, 45],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
      data: [100, 120, 90, 130, 110],
    },
    monthly: {
      labels: [
        "JAN",
        "FEB",
        "MAR",
        "APR",
        "MAY",
        "JUN",
        "JUL",
        "AUG",
        "SEP",
        "OCT",
        "NOV",
        "DEC",
      ],
      data: [90, 40, 150, 100, 110, 60, 30, 35, 90, 10, 70, 80],
    },
  };

  const barColor = "rgba(0, 160, 255, 0.4)";
  const dotColor = "rgba(0, 160, 255, 1)";

  const data = {
    labels: chartData[view].labels,
    datasets: [
      {
        type: "bar",
        label: "Job Postings",
        data: chartData[view].data,
        backgroundColor: barColor,
        borderColor: barColor,
        borderWidth: 1,
        barPercentage: 0.5, // Reduce bar width
        categoryPercentage: 0.5, // Adjust spacing
      },
      {
        type: "scatter", // Dots without connecting lines
        label: "Job Postings Points",
        data: chartData[view].data,
        backgroundColor: dotColor,
        borderColor: barColor, // Matches bar border
        borderWidth: 1, // Make dots blend with bars
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleColor: "#fff",
        bodyColor: "#fff",
        cornerRadius: 8,
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#444", font: { size: 12 } },
      },
      y: {
        grid: {
          color: "rgba(200, 200, 200, 0.3)",
          borderDash: [5, 5],
        },
        ticks: { color: "#666", font: { size: 12 } },
      },
    },
  };

  return (
    <div  style={{
        borderRadius: "16px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="w-[420px] h-[430px] p-5 rounded-2xl bg-white gap-[68px] flex flex-col">
      <div className="flex flex-col w-full items-center gap-[14px] ">
        <div className="flex items-center">
          <div className="w-[197px]">
            <h3 className="text-[16px] font-[600] text-gray-800">
              Job Postings Overview
            </h3>
            <p className="text-[12px] font-[500]">
              Showing Job Posting statistics <br /> Nov 19-25
            </p>
          </div>
          <div className="flex gap-[6px] w-[187px]">
            {["daily", "weekly", "monthly"].map((item) => (
              <button
                key={item}
                className={`px-[8px] py-1 text-[12px] font-[500] rounded-[6px] border-[0.5px] border-[#DEDEDE]  ${
                  view === item ? "bg-blue text-white " : ""
                }`}
                onClick={() => setView(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            ))}
          </div>
        </div>
        <div className=" w-full border-[1px] border-[#DEDEDE]"></div>
      </div>

      <div className="w-full h-[241px]">
        <Bar
          data={data}
          options={{
            ...options,
            maintainAspectRatio: false,
            responsive: true,
          }}
        />
      </div>
    </div>
  );
};

export default JobPostingChart;
