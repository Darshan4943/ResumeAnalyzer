import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

Chart.register(ArcElement, Tooltip, Legend);

const AIHitsChart = () => {
  const [jdCountMonthly, setJdCountMonthly] = useState(0);
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const [hoverData, setHoverData] = useState(null);

  const router = useRouter();
  const { recallData } = useSelector((state) => state.recall);

  const getLimits = () => {
    const jdCount = JSON.parse(localStorage.getItem("aiHitsMonthly")) || 0;
    setJdCountMonthly(jdCount);

    const jdLimit = JSON.parse(localStorage.getItem("aiHitsMonthlyLimit")) || 0;
    setJdCountMonthlyLimit(jdLimit);
  };

  useEffect(() => {
    setTimeout(() => {
      getLimits();
    }, 500);
  }, [recallData]);

  const totalHits = jdCountMonthlyLimit;
  const remainingHits = totalHits - jdCountMonthly;

  const data = {
    labels: ["Used AI Hits", "Remaining AI Hits"],
    datasets: [
      {
        data: [jdCountMonthly, remainingHits],
        backgroundColor: ["#00B9E2", "#ADF0FF"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    cutout: "70%",
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external: (context) => {
          if (context.tooltip.opacity === 0) {
            setHoverData(null);
            return;
          }
          const index = context.tooltip.dataPoints[0].dataIndex;
          const label = data.labels[index];
          const value = data.datasets[0].data[index];
          setHoverData({ label, value });
        },
      },
    },
    maintainAspectRatio: false,
  };

  const currentMonthYear = new Date().toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        borderRadius: "16px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="w-full max-w-[420px] p-4 md:p-5 rounded-2xl bg-white flex flex-col"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[14px] md:text-[16px] font-medium">
              AI Hits Overview
            </h2>
            <p className="text-[10px] md:text-[12px] text-gray-500">
              {currentMonthYear}
            </p>
          </div>
        </div>
        <div className="w-full border-t border-gray-300"></div>
      </div>

      <div className="flex justify-center mt-4 relative">
        <div className="relative w-[180px] h-[180px] md:w-[228px] md:h-[230px]">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-[12px] md:text-[14px]">
              Total AI Hits
            </p>
            <p className="text-black text-lg md:text-xl font-bold">
              {totalHits}
            </p>
            <p className=" text-[0px] md:text-[12px] mt-1 items-center justify-center flex flex-col">
              Remaining AI Hits <p className="text-black text-lg md:text-xl font-bold"> {remainingHits}</p>
            </p>
          </div>
        </div>

        {hoverData && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white shadow-md p-2 rounded-md text-[10px] md:text-sm border">
            <p className="text-gray-700 font-semibold">{hoverData.label}</p>
            <p className="text-black">{hoverData.value}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#00B9E2] rounded"></div>
          <p className="text-[10px] md:text-[12px]">Used AI Hits</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-[#ADF0FF] rounded"></div>
          <p className="text-[10px] md:text-[12px]">Remaining AI Hits</p>
        </div>
      </div>
    </div>
  );
};

export default AIHitsChart;
