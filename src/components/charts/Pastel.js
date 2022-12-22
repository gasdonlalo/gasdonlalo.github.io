import React from "react";
import { Chart as Chartjs, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

const Pastel = ({ data }) => {
  Chartjs.register(ArcElement, Tooltip, Legend);

  let backgroundColor = [
    "rgba(29, 213, 35, 0.9)",
    "rgba(29, 213, 204, 0.9)",
    "rgba(213, 29, 29, 0.9)",
    "rgba(212, 37, 183, 0.9)",
    "rgba(212, 185, 37, 0.9)",
    "rgba(124, 88, 66, 0.9)",
    "rgba(201, 93, 8, 0.9)",
    "rgba(162, 8, 201, 0.9)",
  ];

  let borderColor = [
    "rgba(29, 213, 35, 1)",
    "rgba(29, 213, 204, 1)",
    "rgba(213, 29, 29, 1)",
    "rgba(212, 37, 183, 1)",
    "rgba(212, 185, 37, 1)",
    "rgba(124, 88, 66, 1)",
    "rgba(201, 93, 8, 1)",
    "rgba(162, 8, 201, 1)",
  ];

  const datos = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor,
        borderColor,
        borderWidth: 1,
      },
    ],
  };

  return <Pie data={datos}></Pie>;
};

export default Pastel;
