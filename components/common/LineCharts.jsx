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

const LineCharts = ({ data = [], selectedOption }) => {
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    processChartData();
  }, [data, selectedOption]);

  const processChartData = () => {
    if (!Array.isArray(data) || data?.length === 0) return;

    let labels = [];
    let dataPoints = [];

    const formattedData = data.map((d) => ({
      date: moment(d.createdAt),
      count: 1,
    }));

    if (selectedOption === "Last 7 Days") {
      // Display last 7 days
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
      // Get the current month's details
      const currentMonthStart = moment().startOf('month');
      const currentWeek = Math.ceil(moment().date() / 7);  // Week of the month (1-based)

      
 
      // Get the previous month's details
      const lastMonthStart = moment().subtract(1, 'month').startOf('month');
      const totalWeeksInLastMonth = Math.ceil(moment(lastMonthStart).daysInMonth() / 7); // Weeks in last month
  
      // Define the labels for the current month's week (this will always be last)
      const currentWeekLabel = `Week ${currentWeek} `;
  
      // Select the last 4 weeks from the previous month (Week 5, Week 4, Week 3, Week 2 of Jan)
      const prevWeeks = [];
      for (let i = totalWeeksInLastMonth; i > totalWeeksInLastMonth - 4; i--) {
        if (i > 0) prevWeeks.push(`Week ${i} `); // Dynamically adding Week 5, 4, 3, 2 based on the current date
      }
  
      // Add the current week label at the end (it will always be at the last position)
      labels = [...prevWeeks.reverse(), currentWeekLabel];  // Reverse the previous month's weeks, then add the current week at last
  
      // Initialize dataPoints array with zeros (we have 5 weeks to track)
      dataPoints = Array(5).fill(0);
  
      // Fill in data for the previous month's weeks (Week 5, Week 4, Week 3, Week 2 from Jan)
      formattedData.forEach((d) => {
        const date = moment(d.date);
  
        // For the previous month's weeks (Week 5, Week 4, Week 3, Week 2)
        if (date.isSameOrAfter(lastMonthStart) && date.isBefore(currentMonthStart)) {
          const weekNum = moment(d.date).week() % totalWeeksInLastMonth;
          if (weekNum === totalWeeksInLastMonth - 4) dataPoints[0] += 1; // Week 5 of Jan
          if (weekNum === totalWeeksInLastMonth - 3) dataPoints[1] += 1; // Week 4 of Jan
          if (weekNum === totalWeeksInLastMonth - 2) dataPoints[2] += 1; // Week 3 of Jan
          if (weekNum === totalWeeksInLastMonth - 1) dataPoints[3] += 1; // Week 2 of Jan
        }
  
        // For the current week's data (Week 1 of the current month)
        if (date.isSameOrAfter(currentMonthStart)) {
          dataPoints[4] += 1; // Add data for the current week's data (Week 1 of Feb)
        }
      });
    }
  
    
    if (selectedOption === "This Year") {
      // Show months for the current year
      const months = moment.monthsShort();
      const currentMonthIndex = moment().month();

      labels = [...months.slice(currentMonthIndex + 1), ...months.slice(0, currentMonthIndex + 1)];

      dataPoints = Array(12).fill(0);
      formattedData.forEach((d) => {
        const monthIndex = d.date.month();
        dataPoints[monthIndex] += 1;
      });

      // Reorder months to show current month first
      dataPoints = [
        ...dataPoints.slice(currentMonthIndex + 1),
        ...dataPoints.slice(0, currentMonthIndex + 1),
      ];
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

export default LineCharts;
