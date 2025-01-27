import React, { useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = ({ data }) => {
    const { applicantAnalytics, viewsAnalytics, labels } = data;

    const chartRef = useRef(null);

    const cleanedAnalytics = applicantAnalytics?.filter((item) => item !== null);
    const cleanedViews = viewsAnalytics?.filter((item) => item !== null);
    const cleanedLabels = labels?.filter((item) => item !== null);

    const chartData = {
        labels: cleanedLabels,
        datasets: [
            {
                data: cleanedAnalytics,
                backgroundColor: "rgba(62, 107, 126, 1)",
                label: "Job Applied",
            },
            {
                data: cleanedViews,
                backgroundColor: "rgba(234, 214, 117, 1)",
                label: "Views",
            },
        ],
    };

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
        <div style={{ width: "100%", height: "100%" }}>
            <Bar ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default StackedBarChart;
