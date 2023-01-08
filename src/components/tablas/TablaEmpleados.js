import { useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import ModalAltaBaja from "../assets/ModalAltaBaja";
import ModalConfirmacion from "../assets/ModalConfirmacion";
import ModalSuccess from "../assets/ModalSuccess";
import ModalError from "../assets/ModalError";

function TablaEmpleados({ id }) {
  //setea los botones de acuerdo al tipo de empleados mostrados
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
            Contratar
          </button>
        </td>
      );
    } else {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() => rechazar(e.idempleado, e.idsolicitud_empleo)}
          >
            Rechazar
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => alta(e.idempleado, e.idsolicitud_empleo)}
          >
            Dar de alta
          </button>
        </td>
      );
    }
  }

  const navigate = useLocation().pathname;
  const datos = useGetData(!id ? false : `/solicitudes/estatus/${id}`); //consulta el tipo de empleados
  //variables para modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setMostrarIdForm(false);
  }; //cierra y limpia la opcion de id en el modal
  const handleShow = () => setShow(true);
  const [encabezado, setEncabezado] = useState("");
  const [mostrarIdForm, setMostrarIdForm] = useState(false);
  //modal confirmacion
  const [confirmacion, setConfirmacion] = useState(false);
  const showConfirmacion = () => setConfirmacion(true);
  const closeConfirmacion = () => setConfirmacion(false);
  //modal correcto e incorrecto
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const cerrarModal = () => {
    setModalError(false);
    setModalSuccess(false);
  };
  //variable actualizar motivo
  const [motivo, setMotivo] = useState([]);
  const [idsol, setIdsol] = useState(); //idsolicitud relativa a la tabla

  const enviar = (e) => {
    e.preventDefault();
    handleClose();
    showConfirmacion();
  };

  const enviarDatos = async () => {
    console.log(motivo);
    try {
      const req = await Axios.put(`/solicitudes/control/${idsol}`, motivo);
      console.log(req);
      closeConfirmacion();
      setModalSuccess(true);
      setTimeout(() => {
        cerrarModal();
      }, "1500"); //cierra automaticamente el modal
    } catch (err) {
      closeConfirmacion();
      setModalError({ status: true, msg: err.response.data.msg });
    }
  };
  const changeMotivo = (e) => {
    setMotivo({ ...motivo, [e.target.name]: e.target.value });
  };
  //funciones para acciones
  const despedir = (idempleado, idsolicitud) => {
    setMotivo({ ...motivo, estatus: 3, idEmpleado: idempleado });
    setIdsol(idsolicitud);
    setEncabezado("Dar de baja empleado/practicante");
    handleShow();
  };

  const contratar = (idempleado, idsolicitud) => {
    setMotivo({ ...motivo, estatus: 1, idEmpleado: idempleado });
    setIdsol(idsolicitud);
    setEncabezado("Contratar practicante");
    handleShow();
  };

  const rechazar = (idempleado, idsolicitud) => {
    setMotivo({ ...motivo, estatus: 4, idEmpleado: idempleado });
    setIdsol(idsolicitud);
    setEncabezado("Rechazar solicitud");
    handleShow();
  };

  const alta = (idempleado, idsolicitud) => {
    setMotivo({ ...motivo, idEmpleado: idempleado });
    setIdsol(idsolicitud);
    setEncabezado("Dar de alta empleado");
    setMostrarIdForm(true);
    handleShow();
  };

  return (
    <div>
      <ModalSuccess show={modalSuccess} close={cerrarModal} />
      <ModalError
        show={modalError.status}
        close={cerrarModal}
        text={modalError.msg}
      />
      <ModalConfirmacion
        handleClose={closeConfirmacion}
        show={confirmacion}
        enviar={enviarDatos}
      />
      <ModalAltaBaja
        show={show}
        handleClose={handleClose}
        enviar={enviar}
        changeMotivo={changeMotivo}
        encabezado={encabezado}
        mostrarId={mostrarIdForm}
      />
      <table className="table align-middle">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido paterno</th>
            <th scope="col">Apellido Materno</th>
            {/* Muestra el motivo para una solicitud pendiente */}
            {id === "5" ? <th scope="col">Motivo de la solicitud</th> : null}

            {navigate.match("dados-baja") ? (
              <th>Motivo de {id !== "4" ? "baja" : "rechazo"}</th>
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
    </div>
  );
}

export default TablaEmpleados;
