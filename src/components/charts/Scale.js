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

/* const labels = Utils.months({ count: 7 });
const data = {
  labels: labels,
  datasets: [
    {
      label: "Dataset 1",
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.red,
      backgroundColor: Utils.CHART_COLORS.red,
    },
    {
      label: "Dataset 2",
      data: Utils.numbers(NUMBER_CFG),
      borderColor: Utils.CHART_COLORS.blue,
      backgroundColor: Utils.CHART_COLORS.blue,
    },
  ],
}; */
