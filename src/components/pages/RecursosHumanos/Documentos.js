import React, { Fragment, useState } from "react";
import useGetData from "../../../hooks/useGetData";
import HeaderComponents from "../../../GUI/HeaderComponents";

function Documentos() {
  const empleado = useGetData("/empleado");

  const [id, setId] = useState(null);

  const documentos = useGetData(!id ? false : `/control-documento/${id}`);

  console.log(documentos);

  return (
    <div>
      <HeaderComponents
        title="Documentos empleados"
        urlBack="/recursos-humanos"
        textUrlback="Volver a recursos humanos"
      ></HeaderComponents>
      <form className="container mb-3 col-6">
        <label className="mb-1">Consulta un empleado</label>
        <select
          className="form-control"
          onChange={(e) => setId(e.target.value)}
        >
          <option> --selecciona un empleado-- </option>
          {!empleado.data
            ? false
            : empleado.data.response.map((e) => {
                return (
                  <option
                    value={e.idempleado}
                  >{`${e.nombre} ${e.apellido_paterno} ${e.apellido_materno}`}</option>
                );
              })}
        </select>
      </form>

      <div>
        {documentos.error ? (
          id === "" || id === null ? (
            <h4 className="text-center mt-2 fst-italic">
              Por favor, selecciona un empleado para visualizar su documentación
            </h4>
          ) : (
            <h4 className="text-center mt-2 fst-italic">
              {documentos.dataError.msg + "..."}
            </h4>
          ) // para avisar que no hay datos
        ) : (
          <table className="container table table-bordered mt-2 shadow-sm">
            <thead className="table-light">
              <tr>
                <th scope="col">Nombre del empleado</th>
                <th scope="col">Solicitud de Empleo</th>
                <th scope="col">Acta de Nacimiento</th>
                <th scope="col">Identifiacion</th>
                <th scope="col">Comprobante de Domicilio</th>
                <th scope="col">2 Fotos tamaño infantil</th>
                <th scope="col">Comprobante de ultimo grado de estudio</th>
                <th scope="col">Carta de recomendación</th>
                <th scope="col">Seguro Social</th>
                <th scope="col">R.F.C</th>
                <th scope="col">C.U.R.P</th>
                <th scope="col">Tarjeta bancaria</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {!documentos.data
                    ? false
                    : `${documentos.data.response[0].nombre}`}
                </td>
                {!documentos.data
                  ? false
                  : documentos.data.response.map((e) => {
                      return (
                        <Fragment>
                          {e.cumple ? (
                            <td>
                              <i
                                className="text-success fa-solid fa-check"
                                style={{ fontSize: "72 pt" }}
                              ></i>
                            </td>
                          ) : (
                            <td>
                              <i
                                className="text-danger fa-solid fa-xmark"
                                style={{ fontSize: "72 pt" }}
                              ></i>
                            </td>
                          )}
                        </Fragment>
                      );
                    })}
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Documentos;
