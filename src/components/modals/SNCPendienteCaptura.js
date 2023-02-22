import React from "react";
import { Modal } from "react-bootstrap";
import useGetData from "../../hooks/useGetData";
import ErrorHttp from "../assets/ErrorHttp";
import format from "../assets/format";

function SNCPendienteCaptura({
  show,
  handleClose,
  handleIncumplimiento,
  handleEmpleado,
  handleFecha,
  setDatos,
  actualizar,
}) {
  const { data, error, isPending } = useGetData(
    "/salida-no-conforme/pendientes",
    actualizar
  );
  const handle = (e, empleado) => {
    handleIncumplimiento(e.idincumplimiento);
    handleEmpleado({
      nombre: `${empleado.nombre} ${empleado.apellido_paterno} ${empleado.apellido_materno}`,
      id: empleado.idempleado,
    });
    handleFecha(format.formatFechaDB(e.fecha));
    setDatos({
      fecha: format.formatFechaDB(e.fecha),
      idEmpleadoIncumple: e.idempleado,
      idIncumplimiento: e.idincumplimiento,
      accionesCorregir: null,
    });
    handleClose();
  };
  return (
    <div>
      {!error && !isPending && (
        <Success
          show={show}
          handleClose={handleClose}
          datos={data.response}
          handle={handle}
        />
      )}
    </div>
  );
}

const Success = ({ show, handleClose, datos, handle }) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>SNC pendientes de captura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {datos.length === 0 ? (
          <ErrorHttp msg="No hay registros" />
        ) : (
          datos.map((el) => {
            return <Card el={el} handle={handle} />;
          })
        )}
      </Modal.Body>
    </Modal>
  );
};
const Card = ({ el, handle }) => {
  const empleado = useGetData(`/empleado/${el.idempleado}`);
  console.log(empleado);
  return (
    <div>
      {!empleado.error && !empleado.isPending && (
        <div
          className="m-2 rounded d-flex p-2"
          style={{ backgroundColor: "#dadada" }}
        >
          <div className="w-100">
            <p>
              <span className="fw-bold">Incumplimiento: </span>
              {format.formatTextoMayusPrimeraLetra(el.incumplimiento)}
            </p>
            <p>
              <span className="fw-bold">Fecha: </span>
              {format.formatFechaComplete(el.fecha)}
            </p>
            <p>
              <span className="fw-bold">Empleado que incumple: </span>
              {format.formatTextoMayusPrimeraLetra(
                `${empleado.data.response[0].nombre} ${empleado.data.response[0].apellido_paterno} ${empleado.data.response[0].apellido_materno}`
              )}
            </p>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <button
              className="btn btn-primary mb-3 "
              onClick={() => handle(el, empleado.data.response[0])}
            >
              Capturar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SNCPendienteCaptura;
