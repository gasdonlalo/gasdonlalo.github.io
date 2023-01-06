import { Fragment, useState } from "react";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import ModalAltaBaja from "../assets/ModalAltaBaja";

function TablaEmpleados({ id }) {
  const datos = useGetData(!id ? false : `/solicitudes/estatus/${id}`); //consulta el tipo de empleados
  console.log(datos.dataError);
  //variables para modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [encabezado, setEncabezado] = useState("");
  //variable actualizar motivo
  const [motivo, setMotivo] = useState([]);
  const [idsol, setIdsol] = useState(); //idsolicitud relativa a la tabla
  const enviar = (e) => {
    e.preventDefault();
    enviarDatos();
    handleClose();
  };

  const enviarDatos = async () => {
    const req = await Axios.put(`/solicitudes/control/${idsol}`, motivo);
    console.log(req);
  };
  const changeMotivo = (e) => {
    setMotivo({ ...motivo, [e.target.name]: e.target.value });
  };

  const despedir = (idempleado, idsolicitud) => {
    setMotivo({ ...motivo, estatus: 3, idEmpleado: idempleado });
    setIdsol(idsolicitud);
    setEncabezado("Dar de baja empleado/practicante");
    handleShow();
  };

  const contratar = (idempleado, idsolicitud) => {
    setMotivo({ ...motivo, estatus: 1, idEmpleado: idempleado });
    setIdsol(idsolicitud);
    setEncabezado("Dar de alta practicante");
    handleShow();
  };

  return (
    <div>
      <table className="table align-middle">
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
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() =>
                            despedir(e.idempleado, e.idsolicitud_empleo)
                          }
                        >
                          Dar de baja
                        </button>
                      ) : (
                        <Fragment>
                          <button
                            type="button"
                            className="btn btn-danger me-2"
                            onClick={() =>
                              despedir(e.idempleado, e.idsolicitud_empleo)
                            }
                          >
                            Dar de baja
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            onClick={() =>
                              contratar(e.idempleado, e.idsolicitud_empleo)
                            }
                          >
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
      <ModalAltaBaja
        show={show}
        handleClose={handleClose}
        enviar={enviar}
        changeMotivo={changeMotivo}
        tipo={encabezado}
      />
    </div>
  );
}

export default TablaEmpleados;
