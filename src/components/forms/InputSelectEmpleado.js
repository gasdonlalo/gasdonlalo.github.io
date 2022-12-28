import React from "react";

const InputSelectEmpleado = ({ handle, empleados, name }) => {
  return (
    <select
      className="form-select form-select"
      defaultValue={0}
      onChange={handle}
      name={name}
      required
    >
      <option value={0}>-- Seleccionar despachador --</option>
      {empleados.map((el) => (
        <option value={el.idempleado} key={el.idempleado}>
          {el.nombre} {el.apellido_paterno} {el.apellido_materno}
        </option>
      ))}
    </select>
  );
};

export default InputSelectEmpleado;
