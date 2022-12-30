import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Scale = ({ data }) => {
  const datos = {
    labels: data.labels,
    datasets: data.datasets,
  };

  const options = {
    resposive: true,
    scales: {
      y: {
        min: 0,
        max: 30,
      },
    },
  };

  return <Line data={datos} options={options} />;
};

export default Scale;
