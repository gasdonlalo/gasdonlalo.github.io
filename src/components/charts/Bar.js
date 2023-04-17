import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Bar } from "react-chartjs-2";

function Grafica({ datos, text, legend, optionsCustom }) {
  //configuraciones de grafica de barra
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartDataLabels
  );

  const options = {
    animation: true,
    plugins: {
      /* Empieza formato datalabel */
      datalabels: {
        /*         backgroundColor: function (context) {
          return context.dataset.backgroundColor;
        }, */
        clamp: true,
        anchor: "end",
        align: "top",
        color: "dark",
        display: function (context) {
          var dataset = context.dataset;
          var value = dataset.data[context.dataIndex];
          return value;
        },
        font: {
          weight: "bold",
        },
        padding: 6,
      } /* Termina formato de datalabel */,
      legend: {
        display: legend,
        position: "right",
        scale: "",
        CategoryScale: "3",
        labels: {
          filter: (el) => el.text !== "N/A",
        },
      },
      title: {
        display: true,
        text,
        font: {
          size: "25",
        },
        padding: {
          bottom: 50,
        },
      },
    },
  };

  const customOption = { ...options, ...optionsCustom };

  const background = [
    "rgba(5,64,237,1)",
    "rgba(237,50,5,1)",
    "rgba(5,237,78,1)",
    "rgba(146,0,63,1)",
    "rgba(143,49,12,1)",
  ];

  const data = {
    labels: datos.labels,
    datasets: datos.dataset,
  };

  if (!datos.dataset[0].hasOwnProperty("backgroundColor")) {
    data.datasets = data.datasets.map((el, i) => ({
      ...el,
      backgroundColor: background[i],
    }));
  }

  return <Bar options={customOption} data={data} className=" m-4" />;
}

Grafica.defaultProps = {
  text: "Gráfica",
  legend: true,
  customObj: {},
};

export default Grafica;
