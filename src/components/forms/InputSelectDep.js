import React from "react";
import useGetData from "../../hooks/useGetData";

const InputSelectDep = ({ name, handle, value }) => {
  const dept = useGetData("/departamento");

  return (
    <>
      {!dept.error && !dept.isPending && (
        <select
          className="form-control"
          name={name}
          onChange={handle}
          required
          value={value}
        >
          <option value="">--Selecciona un departamento--</option>
          {dept.data.response.map((e) => {
            return (
              <option
                key={e.iddepartamento}
                value={e.iddepartamento}
              >{`${e.departamento}`}</option>
            );
          })}
        </select>
      )}
    </>
  );
};

InputSelectDep.defaulProps = {
  name: "idDepartamento",
};

export default InputSelectDep;
