import React from 'react';
import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
);

const StackedBarChart = () => {
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri','Sat','Sun'],
    datasets: [
      {
        label: 'Job View',
        data: [80, 50, 30, 40, 50,30,10],
        backgroundColor: '#3E6B7E',
      },
      {
        label: 'Job Applied',
        data: [15, 25, 35, 45, 55,44,20],
        backgroundColor: '#EAD675',
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
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
    layout:{
        padding: {
            top: 0, 
          }, 
    },
    barThickness: 30, 
    maintainAspectRatio: false, 
    aspectRatio: 2,

  };

  return (
   
    <div>
    <Bar
      data={data}
      options={options}
      style={{ width: '100%', height: '264px' }} 
      className="custom-chart" 
    />
  </div>
  );
};

export default StackedBarChart;
