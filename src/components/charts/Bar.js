import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

function Grafica({ datos, text, y, legend }) {
  //configuraciones de grafica de barra
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    animation: false,
    plugins: {
      legend: {
        display: legend,
        position: "right",
        scale: "",
        CategoryScale: "3",
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

  if (y) {
    options.scales = {
      y: {
        min: y[0],
        max: y[1],
      },
    };
  }

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

  return <Bar options={options} data={data} className=" m-4" />;
}

Grafica.defaultProps = {
  text: "Gráfica",
  legend: true,
};

export default Grafica;
