import React, { useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = ({ data }) => {
    // Access the analytics data from props
    const { applicantAnalytics, viewsAnalytics, labels } = data;

    const chartRef = useRef(null);

    // Clean the analytics data by removing null or undefined values
    const cleanedAnalytics = applicantAnalytics?.filter((item) => item !== null);
    const cleanedViews = viewsAnalytics?.filter((item) => item !== null);
    const cleanedLabels = labels?.filter((item) => item !== null);

    // Prepare the data for the chart with two datasets
    const chartData = {
        labels: cleanedLabels,
        datasets: [
            {
                data: cleanedAnalytics,
                backgroundColor: "rgba(62, 107, 126, 1)", // Color for applicant analytics
                label: "Job Applied",
            },
            {
                data: cleanedViews,
                backgroundColor: "rgba(234, 214, 117, 1)", // Color for views analytics
                label: "Views",
            },
        ],
    };

    // Chart options for stacked bars
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
                stacked: true, // Enable stacking on the x-axis
            },
            y: {
                stacked: true, // Enable stacking on the y-axis
            },
        },
    };

    return (
        <div style={{ width: "100%" }}>
            <Bar ref={chartRef} data={chartData} options={options} />
        </div>
    );
};

export default StackedBarChart;
