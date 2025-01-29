import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend);

const LineChartt = ({ data = [], selectedOption }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    if (!Array.isArray(data)) {
      console.error("Expected an array but got:", data);
      return;
    }
    processChartData();
  }, [data, selectedOption]);

  const processChartData = () => {
    if (!Array.isArray(data) || data?.length === 0) return;

    let labels = [];
    let dataPoints = [];

    const formattedData = data?.map((d) => ({
      date: moment(d.createdAt),
      count: 1,
    }));

    if (selectedOption === "Last 7 Days") {
      const today = moment().format("dddd");
      labels = Array.from({ length: 6 }, (_, i) =>
        moment().subtract(6 - i, "days").format("dddd")
      );
      labels.push(today);

      dataPoints = labels.map((day) =>
        formattedData.filter((d) => d.date.format("dddd") === day).length
      );
    }

    if (selectedOption === "This Month") {
      const totalWeeks = Math.ceil(moment().date() / 7);
      labels = Array.from({ length: totalWeeks }, (_, i) => `Week ${i + 1}`);

      const weeksData = Array(totalWeeks).fill(0);
      formattedData.forEach((d) => {
        const weekNumber = Math.ceil(d.date.date() / 7);
        weeksData[weekNumber - 1] += 1;
      });

      const currentWeek = moment().week() % totalWeeks; // Get current week index
      labels = [...labels.slice(currentWeek), ...labels.slice(0, currentWeek)]; // Reorder weeks
      dataPoints = [...weeksData.slice(currentWeek), ...weeksData.slice(0, currentWeek)]; // Reorder data
    }

    if (selectedOption === "This Year") {
        const currentMonthIndex = moment().month();
        const months = moment.monthsShort();
  
        labels = [...months.slice(currentMonthIndex + 1), ...months.slice(0, currentMonthIndex + 1)];
  
        dataPoints = Array(12).fill(0);
        formattedData.forEach((d) => {
          const monthIndex = d.date.month();
          dataPoints[monthIndex] += 1;
        });
  
        dataPoints = [...dataPoints.slice(currentMonthIndex + 1), ...dataPoints.slice(0, currentMonthIndex + 1)];
      }

    setChartData({
      labels,
      datasets: [
        {
          label: "View Count",
          data: dataPoints,
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
          fill: true,
          tension: 0.4,
        },
      ],
    });
  };

  return data?.length > 0 ? <Line data={chartData} /> : <p>No data available</p>;
};

export default LineChartt;
