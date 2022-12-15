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
import Dataprueba from "../Dataprueba.json";

function Chartprueba() {
  const datos = Dataprueba;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  const options = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        position: "right",
        scale: "",
      },
      title: {
        display: true,
        text: "Grafica diaria de monto faltante de despachador",
        font: {
          size: "25",
        },
      },
    },
  };
  const labels = [
    "JESUS MANUEL ALEGRIA JIMENEZ",
    "JAYRO LOIDE HERNANDEZ",
    "DAVID ALONSO CENTENO",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: datos[0].fecha,
        data: datos.map((e) => e.cantidad),
        backgroundColor: "rgba(12, 162, 115, 0.5)",
      },
      /* {
        label: "Dataset 1",
        data: [1, 4, 10],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [0, 3, 5],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 3",
        data: [1, 3, 5],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 4",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 5",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 6",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 7",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 8",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 9",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Dataset 10",
        data: [1, 3, 5, 2],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      }, */
    ],
  };
  console.log(datos);
  return <Bar options={options} data={data} className=" m-4" />;
}

export default Chartprueba;
