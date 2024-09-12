import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Legend,
  Title,
  Tooltip,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Chart as ChartJS,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PopulationChart = ({ data }) => {
  const years = data.map((item) => item.year);
  const values = data.map((item) => item.value);

  const chartData = {
    labels: years,
    datasets: [
      {
        label: 'Population Over Time',
        data: values,
        fill: false,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(75,192,192,1)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Population Over Time',
      },
    },
  };

  return <Line data={chartData} options={chartOptions} />;
};

export default PopulationChart;
