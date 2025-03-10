import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

Chart.register(ArcElement, Tooltip, Legend);

const AIHitsChart = () => {
  const [jdCountMonthly, setJdCountMonthly] = useState(0);
  const [jdCountMonthlyLimit, setJdCountMonthlyLimit] = useState(0);
  const [selectedRange, setSelectedRange] = useState("Monthly");
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
  };

  return (
    <div
      style={{
        borderRadius: "16px",
        boxShadow: "0px 1px 2px 0px rgba(0, 0, 0, 0.25)",
      }}
      className="w-[420px] h-[430px] p-5 rounded-2xl bg-white flex flex-col"
    >
      <div className="flex flex-col gap-[12px]">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[16px] font-[500]">AI Hits Overview</h2>
            <p className="text-[12px] font-[500] text-gray-500">
              Showing AI Hits statistics
            </p>
            <p className="text-[12px] font-[500] text-gray-500">Jan 2025</p>
          </div>

          <div className="flex space-x-2">
            {["Daily", "Weekly", "Monthly"].map((range) => (
              <button
                key={range}
                className={`px-2 py-1 rounded-[6px] border-[0.5px] border-[#DEDEDE] text-gray-700 text-[12px] font-[500] ${
                  selectedRange === range ? "bg-blue text-white" : "bg-white"
                }`}
                onClick={() => setSelectedRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        <div className="w-full border-[1px] border-[#DEDEDE]"></div>
      </div>

      <div className="flex justify-center mt-6 relative">
        <div className="relative w-[228px] h-[230px]">
          <Doughnut data={data} options={options} />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-gray-600 text-sm">Total AI Hits</p>
            <p className="text-black text-xl font-bold">{totalHits}</p>
            <p className="text-gray-600 text-sm mt-1">
              Remaining: {remainingHits}
            </p>
          </div>
        </div>

        {hoverData && (
          <div className="absolute top-10 bg-white shadow-md p-2 rounded-md text-sm border">
            <p className="text-gray-700 font-semibold">{hoverData.label}</p>
            <p className="text-black">{hoverData.value}</p>
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 mt-6">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#00B9E2] rounded-[4px]"></div>
          <p className="">Used AI Hits</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-[#ADF0FF] rounded-[4px]"></div>
          <p className="">Remaining AI Hits</p>
        </div>
      </div>
    </div>
  );
};

export default AIHitsChart;
