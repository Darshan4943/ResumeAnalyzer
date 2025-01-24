import React, { useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = ({ analytics, labels }) => {
    const chartRef = useRef(null);

    // Clean the data: Remove null values from analytics and labels
    const cleanedAnalytics = analytics?.filter((item) => item !== null);
    const cleanedLabels = labels?.filter((item) => item !== null);

    // Data structure for the chart
    const data1 = {
        labels: cleanedLabels, // Cleaned labels
        datasets: [
            {

                data: cleanedAnalytics, // Cleaned analytics data
                backgroundColor: "rgba(62, 107, 126, 1)", // Color for the bars
                label: "Job Applied",
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
                text: "",
            },
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
    };

    return (
        <div style={{ width: "100%" }}>
            <Bar ref={chartRef} data={data1} options={options} />
        </div>
    );
};

export default StackedBarChart;
