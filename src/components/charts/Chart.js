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

function Chart({ datos }) {
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
    ...datos.map((e) => {
      return [e.nombre_completo];
    }),
  ];
  console.log(labels);
  const data = {
    labels,
    datasets: [
      {
        label: datos.semana,
        data: datos.map((e) => e.total),
        backgroundColor: "rgba(12, 162, 115, 0.5)",
      },
    ],
  };
  console.log(datos);
  return <Bar options={options} data={data} className=" m-4" />;
}

export default Chart;
