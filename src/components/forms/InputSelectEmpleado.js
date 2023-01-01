import React from "react";

const InputSelectEmpleado = ({ handle, empleados, name, defaultValue }) => {
  return (
    <select
      className="form-select form-select"
      defaultValue={defaultValue || 0}
      onChange={handle}
      name={name}
      required
    >
      <option value="">-- Seleccionar despachador --</option>
      {empleados.map((el) => (
        <option value={el.idempleado} key={el.idempleado}>
          {el.nombre} {el.apellido_paterno} {el.apellido_materno}
        </option>
      ))}
    </select>
  );
};

export default InputSelectEmpleado;
