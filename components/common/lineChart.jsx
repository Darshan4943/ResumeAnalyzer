import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from 'chart.js';

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement
);

const LineChartt = () => {
    const DATA_COUNT = 12;
    const labels = Array.from({ length: DATA_COUNT }, (_, i) => i.toString());

    const datapoints = [0, 20, 20, 60, 60, 120];

    const data = {
        labels,
        datasets: [
            {
                label: 'Views',
                data: datapoints,
                borderColor: '#56CDAD',
                fill: false,
                cubicInterpolationMode: 'monotone',
                tension: 0.4,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            title: {
                display: false,
            },
        },
        interaction: {
            intersect: false,
        },
        scales: {
            x: {
                display: true,
                title: {
                    display: true,
                },
            },
            y: {
                display: true,
                title: {
                    display: true,
                    text: 'Value',
                },
                suggestedMin: -10,
                suggestedMax: 200,
            },
        },
    };

    return (
        <div className='w-full h-full'>
            <Line data={data} options={options} />
        </div>
    );
};

export default LineChartt;
