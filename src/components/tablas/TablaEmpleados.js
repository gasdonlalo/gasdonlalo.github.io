import { useState } from "react";
import useGetData from "../../hooks/useGetData";
import format from "../assets/format";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ModalAltaBaja from "../modals/ModalAltaBaja";
import ModalConfirmacion from "../modals/ModalConfirmacion";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
import Axios from "../../Caxios/Axios";

const TablaEmpleados = ({ id }) => {
  const [show, setShow] = useState(false);
  const [encabezado, setEncabezado] = useState("");
  const [confirmacion, setConfirmacion] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalError, setModalError] = useState({ status: false, msg: "" });
  const [mostrarIdForm, setMostrarIdForm] = useState(false);
  const [idsol, setIdsol] = useState(); //idsolicitud relativa a la tabla
  const [motivo, setMotivo] = useState([]);
  const [actualizar, setActualizar] = useState(false); //actualiza la informacion
  const { data, error, isPending } = useGetData(
    `/solicitudes/estatus/${id}`,
    actualizar
  );

  const cerrarModal = () => {
    setModalError(false);
    setModalSuccess(false);
  };

  const handleClose = () => {
    setShow(false);
    setMostrarIdForm(false);
  };

  const changeMotivo = (e) => {
    setMotivo({ ...motivo, [e.target.name]: e.target.value });
  };

  //funcion para acciones
  const action = (idempleado, idsolicitud, encabezado, estatus) => {
    setMotivo({ ...motivo, idEmpleado: idempleado, estatus: Number(estatus) });
    setIdsol(idsolicitud);
    setEncabezado(encabezado);
    if (estatus === 1 && !idempleado) setMostrarIdForm(true);
    setShow(true);
  };

  const enviar = async (e) => {
    e.preventDefault();
    handleClose();
    setConfirmacion(true);
    try {
      await Axios.put(`/solicitudes/control/${idsol}`, motivo);
      setConfirmacion(false);
      setModalSuccess(true);
      setTimeout(() => {
        cerrarModal();
      }, 1500); //cierra automaticamente el modal
      setActualizar(!actualizar);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        setConfirmacion(false);
        setModalError({ status: true, msg: err.response.data.msg });
      } else {
        setConfirmacion(false);
        setModalError({ status: true, msg: "Error en la conexión" });
      }
    }
  };

  return (
    <div className="">
      {!error && !isPending && (
        <Success solicitud={data.response} estatus={id} action={action} />
      )}
      <ModalSuccess show={modalSuccess} close={cerrarModal} />
      <ModalError
        show={modalError.status}
        close={cerrarModal}
        text={modalError.msg}
      />
      <ModalConfirmacion
        handleClose={() => setConfirmacion(false)}
        show={confirmacion}
        enviar={enviar}
      />
      <ModalAltaBaja
        show={show}
        handleClose={handleClose}
        enviar={enviar}
        changeMotivo={changeMotivo}
        encabezado={encabezado}
        mostrarId={mostrarIdForm}
      />
    </div>
  );
};

const Success = ({ solicitud, estatus, action }) => {
  const [solicitudes, setSolicitudes] = useState(solicitud);

  const filterEmp = (e) => {
    const exp = new RegExp(`${e.target.value}`, "gi");
    const search = solicitud.filter((el) => {
      const { nombre, apellido_paterno, apellido_materno } = el;
      return exp.test(`${nombre} ${apellido_paterno} ${apellido_materno}`);
    });
    setSolicitudes(search);
  };

  const practicantes = solicitud.filter((el) => el.estatus === "Practica");

  return (
    <div>
      {estatus === "6" && practicantes.length > 0 && (
        <div>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={<Tooltip id="asd">Haz Click para verlos</Tooltip>}
          >
            <a
              href={`#sinvalidar${practicantes[0].idsolicitud_empleo}`}
              className="btn btn-primary"
            >
              Empleados sin validar{" "}
              <span className="badge text-bg-secondary">
                {practicantes.length}
              </span>
            </a>
          </OverlayTrigger>
        </div>
      )}
      {/* Buscador */}
      <div className="pt-0">
        <div className="row">
          <div className="offset-md-6 col-md-6">
            <input
              type="text"
              className="form-control"
              name="buscador"
              id="buscador"
              onChange={filterEmp}
              placeholder="Buscar un empleado..."
            ></input>
          </div>
        </div>
      </div>
      {/* Tabla */}
      <div>
        <table className="table align-middle table-bordered mt-2 shadow-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido Paterno</th>
              <th>Apellido Materno</th>
              <th>Estatus</th>
              {(estatus === "5" || estatus === "4" || estatus === "3") && (
                <th>Motivo de la solicitud</th>
              )}
              {estatus === "6" && <th>Fecha Alta</th>}
              {(estatus === "3" || estatus === "4") && <th>Fecha Baja</th>}
              {(estatus === "5" || estatus === "6") && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((el) => (
              <tr
                key={el.idsolicitud_empleo}
                id={`sinvalidar${el.idsolicitud_empleo}`}
              >
                <td>{el.idempleado || "--"}</td>
                <td>{el.nombre}</td>
                <td>{el.apellido_paterno}</td>
                <td>{el.apellido_materno}</td>
                <td>{el.estatus}</td>
                {(estatus === "5" || estatus === "4" || estatus === "3") && (
                  <td>{el.motivo}</td>
                )}
                {estatus === "6" && (
                  <td>{format.formatFechaComplete(el.fecha_registro)}</td>
                )}
                {(estatus === "3" || estatus === "4") && (
                  <td>{format.formatFechaComplete(el.update_time)}</td>
                )}
                <SetBotones estatus={el.estatus} element={el} action={action} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function SetBotones({ estatus, element, action }) {
  switch (estatus) {
    case "Practica":
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger me-3"
            onClick={() =>
              action(
                element.idempleado,
                element.idsolicitud_empleo,
                "Dar de baja empleado/practicante",
                3
              )
            }
          >
            Dar de baja
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() =>
              action(
                element.idempleado,
                element.idsolicitud_empleo,
                "Contratar practicante",
                1
              )
            }
          >
            Validar
          </button>
        </td>
      );
    case "Contrato":
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() =>
              action(
                element.idempleado,
                element.idsolicitud_empleo,
                "Dar de baja empleado/practicante",
                3
              )
            }
          >
            Dar de baja
          </button>
        </td>
      );
    case "Pendiente":
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger me-2"
            onClick={() =>
              action(
                element.idempleado,
                element.idsolicitud_empleo,
                "Rechazar solicitud",
                4
              )
            }
          >
            Rechazar
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() =>
              action(
                element.idempleado,
                element.idsolicitud_empleo,
                "Dar de alta empleado",
                1
              )
            }
          >
            Dar de alta
          </button>
        </td>
      );

    default:
      return;
  }
}

export default TablaEmpleados;
