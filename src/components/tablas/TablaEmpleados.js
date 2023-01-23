import { Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import ModalAltaBaja from "../modals/ModalAltaBaja";
import ModalConfirmacion from "../modals/ModalConfirmacion";
import ModalSuccess from "../modals/ModalSuccess";
import ModalError from "../modals/ModalError";
import format from "../assets/format";
import Loader from "../assets/Loader";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
    } else if (id === "Practica") {
      return (
        <td>
          <button
            type="button"
            className="btn btn-danger me-3"
            onClick={() => despedir(e.idempleado, e.idsolicitud_empleo)}
          >
            Dar de baja
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => contratar(e.idempleado, e.idsolicitud_empleo)}
          >
            Validar
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
  const navigate = useLocation().pathname; //obtiene la ruta actual para cambiar los encabezados de la tabla
  const [actualizar, setActualizar] = useState(false); //actualiza la informacion XD

  const datos = useGetData(
    !id ? false : `/solicitudes/estatus/${id}`,
    actualizar
  ); //consulta el tipo de empleados
  const datosPract = useGetData("/solicitudes/estatus/2");
  //variables para modales
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
    try {
      const req = await Axios.put(`/solicitudes/control/${idsol}`, motivo);
      console.log(req);
      closeConfirmacion();
      setModalSuccess(true);
      setTimeout(() => {
        cerrarModal();
      }, "1500"); //cierra automaticamente el modal
      setActualizar(!actualizar);
    } catch (err) {
      if (err.hasOwnProperty("response")) {
        closeConfirmacion();
        setModalError({ status: true, msg: err.response.data.msg });
      } else {
        closeConfirmacion();
        setModalError({ status: true, msg: "Error en la conexión" });
      }
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
      {!datos.error && !datos.isPending && (
        <Sucess
          id={id}
          datos={datos}
          navigate={navigate}
          SetBotones={SetBotones}
          actualizar={actualizar}
          setModalError={setModalError}
          datosPract={datosPract}
        />
      )}
      {datos.error && (
        <h4 className="mt-2 fst-italic">{datos.dataError.msg}...</h4>
      )}
      {datos.isPending && <Loader />}
    </div>
  );
}

const Sucess = ({ id, datos, navigate, SetBotones, datosPract }) => {
  const [emp, setEmp] = useState(
    [datos.data.response],
    [datosPract.data.response]
  );
  console.log(emp);
  const datosPracticantes = useGetData(
    id === "1" ? "/solicitudes/estatus/2" : null
  );
  // PARA HACER EL BUSCADOR "SEARCH"
  const filterEmp = (e) => {
    const exp = new RegExp(`${e.target.value}`, "gi");
    const search = datos.data.response.filter((el) => {
      const { nombre, apellido_paterno, apellido_materno } = el;
      return exp.test(`${nombre} ${apellido_paterno} ${apellido_materno}`);
    });
    setEmp(search);
  };

  const sinValidar = !datosPracticantes.data
    ? []
    : datosPracticantes.data.response.map((e) => e.estatus);

  return (
    <div>
      {/* Boton empleados sin validar */}
      {id === "1" ? (
        <div>
          <OverlayTrigger
            key="right"
            placement="right"
            overlay={<Tooltip id="tooltip-right">Haz clic para verlos</Tooltip>}
          >
            <a href="#sinvalidar0" className="btn btn-primary ">
              Empleados sin validar{" "}
              <span className="badge text-bg-secondary">
                {sinValidar.length}
              </span>
            </a>
          </OverlayTrigger>
        </div>
      ) : null}

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

      <table
        className="table align-middle table-bordered mt-2 shadow-sm"
        id="tabla1"
      >
        <thead className="table-light">
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido paterno</th>
            <th scope="col">Apellido Materno</th>
            {/* Muestra el motivo para una solicitud pendiente */}
            {navigate.match("baja-empleados") ? (
              <Fragment>
                <th scope="col">Estatus</th>
                {id === "5" ? (
                  <th scope="col">Motivo de la solicitud</th>
                ) : null}
                <th scope="col">Fecha alta</th>
              </Fragment>
            ) : null}

            {navigate.match("dados-baja") ? (
              <Fragment>
                <th scope="col">Motivo de {id !== "4" ? "baja" : "rechazo"}</th>
                <th scope="col">Fecha de {id !== "4" ? "baja" : "rechazo"}</th>
              </Fragment>
            ) : (
              <th scope="col">Accion(es)</th>
            )}
          </tr>
        </thead>
        <tbody>
          {emp.map((e) => {
            return (
              <tr>
                <td>{e.nombre}</td>
                <td>{e.apellido_paterno}</td>
                <td>{e.apellido_materno}</td>
                {navigate.match("baja-empleados") ? (
                  <Fragment>
                    <td>{e.estatus}</td>
                    {id === "5" ? <td>{e.motivo}</td> : null}
                    <td>{format.formatFechaComplete(e.update_time)}</td>
                  </Fragment>
                ) : null}
                {navigate.match("dados-baja") ? (
                  <Fragment>
                    <td>{e.motivo}</td>
                    <td className="text-danger">
                      {format.formatFechaComplete(e.update_time)}
                    </td>
                  </Fragment>
                ) : (
                  <SetBotones id={id} e={e} />
                )}
              </tr>
            );
          })}
          {/* Mapeo practicantes */}

          {!datosPracticantes.error && !datosPracticantes.isPending
            ? datosPracticantes.data.response.map((e, index) => {
                return (
                  <tr id={`sinvalidar${index}`}>
                    <td>{e.nombre}</td>
                    <td>{e.apellido_paterno}</td>
                    <td>{e.apellido_materno}</td>
                    <td>{e.estatus}</td>
                    <td>{format.formatFechaComplete(e.update_time)}</td>

                    <SetBotones id={e.estatus} e={e} />
                  </tr>
                );
              })
            : null}
        </tbody>
      </table>
    </div>
  );
};

export default TablaEmpleados;
