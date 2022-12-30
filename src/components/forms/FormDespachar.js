import { useState } from "react";
import InputFecha from "./InputFecha";
function FormDespachar({}) {
  const [body, setBody] = useState(null);

  const handle = (e) => {
    setBody(e.target.value);
  };

  const enviar = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={enviar} className="row">
        <div className="col-md-5">
          <label>Fecha</label>
          <InputFecha handle={handle} />
        </div>
        {/* <div>
          <label>Empleado</label>
          <select className="form-control" name="empleado" onChange={handle}>
            <option value="0"> Selecciona un empleado...</option>
            {!datos.data
              ? false
              : datos.data.response.map((e) => {
                  return (
                    <option
                      value={e.idempleado}
                    >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                  );
                })}
          </select>
        </div>
        <div>
          Pasos para despachar
          {!pasos.data
            ? false
            : pasos.data.response.map((e) => {
                return (
                  <div>
                    <label>{e.paso}</label>
                    <select
                      className="form-control"
                      name={e.idpaso_despachar}
                      onChange={handleEval}
                    >
                      <option value={null}>Selecciona una opcion</option>
                      <option value="1">Cumple</option>
                      <option value="0">No cumple</option>
                    </select>
                  </div>
                );
              })}
        </div> */}
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default FormDespachar;
