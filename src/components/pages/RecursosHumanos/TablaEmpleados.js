import { Fragment } from "react";
import useGetData from "../../../hooks/useGetData";

function TablaEmpleados({ id }) {
  const datos = useGetData(`/solicitudes/estatus/${id}`);
  console.log(id);
  return (
    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido paterno</th>
            <th scope="col">Apellido Materno</th>
            <th scope="col">Accion(es)</th>
          </tr>
        </thead>
        <tbody>
          {!datos.data
            ? false
            : datos.data.response.map((e) => {
                return (
                  <tr>
                    <td>{e.nombre}</td>
                    <td>{e.apellido_paterno}</td>
                    <td>{e.apellido_materno}</td>
                    <td>
                      {id === "1" ? (
                        <button type="button" className="btn btn-danger">
                          Dar de baja
                        </button>
                      ) : (
                        <Fragment>
                          <button type="button" className="btn btn-danger me-2">
                            Dar de baja
                          </button>
                          <button type="button" className="btn btn-success">
                            Dar de alta
                          </button>
                        </Fragment>
                      )}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}

export default TablaEmpleados;
