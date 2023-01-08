import { useState } from "react";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import ModalAltaBaja from "../assets/ModalAltaBaja";
import { useLocation } from "react-router-dom";

function TablaEmpleados({ id }) {
  function SetBotones({ id, e }) {
    if (id === "1") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => despedir(e.idempleado, e.idsolicitud_empleo)}
          >
            Dar de baja
          </button>
        </td>
      );
    } else if (id === "2") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => despedir(e.idempleado, e.idsolicitud_empleo)}
          >
            Dar de baja
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => contratar(e.idempleado, e.idsolicitud_empleo)}
          >
            Dar de alta
          </button>
        </td>
      );
    } else {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => despedir(e.idempleado, e.idsolicitud_empleo)}
          >
            Rechazar
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => contratar(e.idempleado, e.idsolicitud_empleo)}
          >
            Contratar
          </button>
        </td>
      );
    }
  }

  const navigate = useLocation().pathname;
  const datos = useGetData(!id ? false : `/solicitudes/estatus/${id}`); //consulta el tipo de empleados
  console.log(!datos.dataError ? false : datos.dataError.msg);
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
            {/* Muestra el motivo para una solicitud pendiente */}
            {id === "5" ? <th scope="col">Motivo de la solicitud</th> : null}

            {navigate.match("dados-baja") ? (
              <th>Motivo de baja</th>
            ) : (
              <th scope="col">Accion(es)</th>
            )}
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
                    {id === "5" ? <td>{e.motivo}</td> : null}
                    {navigate.match("dados-baja") ? (
                      <td>{e.motivo}</td>
                    ) : (
                      <SetBotones id={id} e={e} />
                    )}
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
