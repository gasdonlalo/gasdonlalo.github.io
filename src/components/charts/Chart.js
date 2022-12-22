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
  const datosCont = datos.response;
  const val = [
    ...datosCont.map((e) =>
      e.semanas.map((el) => {
        return el.cantidad;
      })
    ),
  ];
  let valFormat = [];
  //reestructurador de datos
  let contador = 0;
  let paso = 0;
  while (contador < datos.totalSemanas) {
    if (paso <= datos.totalSemanas) {
      valFormat.push(val.map((e) => e[paso]));
      paso = paso + 1;
      contador = contador + 1;
      console.log(valFormat);
    }
  }
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
        position: "right",
        scale: "",
        CategoryScale: "3",
      },
      title: {
        display: true,
        text: "Grafica semanal de monto faltante de despachador",
        font: {
          size: "25",
        },
      },
    },
  };
  const labels = [
    ...datosCont.map((e) => {
      return e.nombre_completo;
    }),
  ];
  const dataSet = [
    ...valFormat.map((e) => {
      return {
        label: "Semana",
        data: e,
        backgroundColor: "rgba(12, 162, 115, 0.5)",
      };
    }),
  ];

  const data = {
    labels,
    datasets: [...dataSet],

    /* datasets: [
      {
        label: "semana 1",
        data: valFormat[0],
        backgroundColor: "rgba(12, 162, 115, 0.5)",
      },
    ], */
  };

  return <Bar options={options} data={data} className=" m-4" />;
}

export default Chart;
