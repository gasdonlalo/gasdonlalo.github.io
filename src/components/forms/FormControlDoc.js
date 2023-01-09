import { useState } from "react";
import useGetData from "../../hooks/useGetData";

function FormControlDoc({ handle, enviar, actualizar, handlePut }) {
  const [id, setId] = useState(null);
  const [tipo, setTipo] = useState(null);
  const [peticion, setPeticion] = useState(null);

  const empleados = useGetData("/empleado");
  const documentos = useGetData(`/control-documento/${id}`, actualizar);
  console.log(documentos);

  const obtenerTipoDoc = (e) => {
    setTipo(e.target.value);
    setPeticion(e.target.value);
  };

  const obtenerId = (e) => {
    setId(e.target.value);
    handle(e);
  };
  return (
    <div className="container">
      <form onSubmit={(e) => enviar(e, peticion)}>
        <div className="row">
          <div className="mb-3 col-6">
            <label>Seleccionar empleado</label>
            <select
              className="form-control"
              onChange={(ev) => obtenerId(ev)}
              name="idempleado"
            >
              <option value=" ">--Selecciona un empleado--</option>
              {!empleados.data
                ? false
                : empleados.data.response.map((e) => {
                    return (
                      <option
                        value={e.idempleado}
                      >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                    );
                  })}
            </select>
          </div>
          <div className="mb-3 col-6">
            <label>Tipo de documento:</label>
            <select
              className="form-control"
              onChange={(ev) => obtenerTipoDoc(ev)}
            >
              <option value=" ">--Selecciona un tipo--</option>
              <option value={false}>Por entregar</option>
              <option value={true}>Entregados</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label>Documento a actualizar:</label>
          <select
            className="form-control"
            name={"iddocumento"}
            onChange={handle}
          >
            <option>--Selecciona un documento--</option>
            {id === " " || id === null
              ? null
              : !documentos.data
              ? false
              : documentos.data.response.map((e) => {
                  if (tipo === "true") {
                    //entregados
                    return !e.cumple ? null : (
                      <option
                        value={e.iddocumento}
                        className="text-success fst-italic"
                      >
                        {e.documento}
                      </option>
                    );
                  } else if (tipo === "false") {
                    //por entregar
                    return e.cumple ? null : (
                      <option
                        value={e.iddocumento}
                        className="text-danger fst-italic"
                      >
                        {e.documento}
                      </option>
                    );
                  } else {
                    return null;
                  }
                })}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          {tipo === "true"
            ? "Marcar como faltante"
            : tipo === "false"
            ? "Marcar como entregado"
            : "Selecciona un tipo de documento"}
        </button>
      </form>
    </div>
  );
}

export default FormControlDoc;
