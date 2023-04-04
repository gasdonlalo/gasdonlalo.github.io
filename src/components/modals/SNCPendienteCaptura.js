import { useState } from "react";
import { Modal } from "react-bootstrap";
import Axios from "../../Caxios/Axios";
import useGetData from "../../hooks/useGetData";
import ErrorHttp from "../assets/ErrorHttp";
import format from "../assets/format";
import ModalConfirmacion from "./ModalConfirmacion";

function SNCPendienteCaptura({
  show,
  handleClose,
  handleIncumplimiento,
  handleEmpleado,
  setDatos,
  actualizar,
  setActualizar,
}) {
  const { data, error, isPending } = useGetData(
    "/salida-no-conforme/pendientes",
    actualizar
  );
  const [showConfirmacion, setShowConfirmacion] = useState(false);
  const [esconder, setEsconder] = useState(null);
  const [id, setId] = useState(null);

  const handle = (e, empleado) => {
    handleIncumplimiento(e.idincumplimiento);
    handleEmpleado({
      nombre: `${empleado.nombre} ${empleado.apellido_paterno} ${empleado.apellido_materno}`,
      id: empleado.idempleado,
    });
    setDatos({
      fecha: format.formatFechaDB(e.fecha),
      idEmpleadoIncumple: e.idempleado,
      idIncumplimiento: e.idincumplimiento,
      accionesCorregir: null,
    });
    handleClose();
  };

  const descartar = (x) => {
    setId(x);
    setEsconder("hidden");
    setShowConfirmacion(true);
  };
  const closeConfirmacion = () => {
    setShowConfirmacion(false);
    setEsconder(null);
  };
  const enviarDescartar = async () => {
    setShowConfirmacion(false);
    closeConfirmacion();
    try {
      await Axios.delete(`/sncacumuladas/eliminar/${id}`);
      setActualizar(!actualizar);
    } catch (err) {}
  };

  return (
    <div>
      <ModalConfirmacion
        show={showConfirmacion}
        handleClose={closeConfirmacion}
        enviar={enviarDescartar}
      />
      {!error && !isPending && (
        <Success
          show={show}
          handleClose={handleClose}
          datos={data.response}
          handle={handle}
          descartar={descartar}
          esconder={esconder}
        />
      )}
    </div>
  );
}

const Success = ({ show, handleClose, datos, handle, descartar, esconder }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      className={`visually-${esconder}`}
    >
      <Modal.Header closeButton>
        <Modal.Title>SNC pendientes de captura</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {datos.length === 0 ? (
          <ErrorHttp msg="No hay registros" />
        ) : (
          datos.map((el, i) => {
            return (
              <Card key={i} el={el} handle={handle} descartar={descartar} />
            );
          })
        )}
      </Modal.Body>
    </Modal>
  );
};
const Card = ({ el, handle, descartar }) => {
  const empleado = useGetData(`/empleado/${el.idempleado}`);
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
              <span className="fw-bold">Descripcion: </span>
              {el.descripcion}
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
              type="button"
              className="btn btn-primary mb-3 "
              onClick={() => handle(el, empleado.data.response[0])}
            >
              Capturar
            </button>
            <button
              type="button"
              className="btn btn-danger mb-3"
              onClick={() => descartar(el.idsncacumuladas)}
            >
              Descartar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SNCPendienteCaptura;
