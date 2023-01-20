import React from "react";
import ChartDataLabels from "chartjs-plugin-datalabels";
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
  Legend,
  ChartDataLabels
);

const Scale = ({ data, legend, optionsCustom, text }) => {
  const datos = {
    labels: data.labels,
    datasets: data.datasets,
  };

  const options = {
    resposive: true,
    plugins: {
      /* Empieza formato datalabel */
      datalabels: {
        backgroundColor: function (context) {
          return context.dataset.backgroundColor;
        },
        align: "top",
        anchor: "end",
        borderRadius: 25,
        color: "white",
        display: function (context) {
          var dataset = context.dataset;
          var value = dataset.data[context.dataIndex];
          return value;
        },
        font: {
          weight: "bold",
        },
      } /* Termina formato de datalabel */,
      legend: {
        display: legend,
      },
      title: {
        display: true,
        text,
        font: {
          size: "25",
        },
      },
    },
  };

  return <Line data={datos} options={{ ...options, ...optionsCustom }} />;
};

Scale.defaultProps = {
  text: "Gráfica",
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
