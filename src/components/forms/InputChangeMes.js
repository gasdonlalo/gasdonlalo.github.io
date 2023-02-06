import React from "react";

const InputChangeMes = ({ handle, name, defaultMes }) => {
  const meses = [
    {
      id: 1,
      mes: "Enero",
    },
    {
      id: 2,
      mes: "Febrero",
    },
    {
      id: 3,
      mes: "Marzo",
    },
    {
      id: 4,
      mes: "Abril",
    },
    {
      id: 5,
      mes: "Mayo",
    },
    {
      id: 6,
      mes: "Junio",
    },
    {
      id: 7,
      mes: "Julio",
    },
    {
      id: 8,
      mes: "Agosto",
    },
    {
      id: 9,
      mes: "Septiembre",
    },
    {
      id: 10,
      mes: "Octubre",
    },
    {
      id: 11,
      mes: "Noviembre",
    },
    {
      id: 12,
      mes: "Diciembre",
    },
  ];
  return (
    <select
      className="form-select"
      aria-label=".form-select-lg example"
      onChange={handle}
      defaultValue={defaultMes}
      name={name}
      required
    >
      {meses.map((el) => (
        <option value={el.id} key={el.id}>
          {el.mes}
        </option>
      ))}
    </select>
  );
};

InputChangeMes.defaultProps = {
  name: "mes",
  defaultMes: 1,
};

export default InputChangeMes;
