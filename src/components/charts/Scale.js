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

const Scale = ({ data, y, legend }) => {
  const datos = {
    labels: data.labels,
    datasets: data.datasets,
  };

  const options = {
    resposive: true,
    scales: {
      y: {
        min: y[0],
        max: y[1],
      },
    },
  };

  return <Line data={datos} options={options} />;
};

Scale.defaultProps = {
  y: [0, 30],
  legend: true,
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
