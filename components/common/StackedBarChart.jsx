import React, { useRef } from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const StackedBarChart = ({ analytics, labels }) => {
    const chartRef = useRef(null);
    const cleanedAnalytics = analytics?.filter((item) => item !== null);
    const cleanedLabels = labels?.filter((item) => item !== null);

    const data1 = {
        labels: cleanedLabels,
        datasets: [
            {

                data: cleanedAnalytics,
                backgroundColor: "rgba(62, 107, 126, 1)",
                label: "Job Applied",
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
        <div style={{ width: "100%" }}>
            <Bar ref={chartRef} data={data1} options={options} />
        </div>
    );
};

export default StackedBarChart;
